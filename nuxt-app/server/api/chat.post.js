import Groq from 'groq-sdk'
import aiPersonality from '../../app/config/aiPersonality.json'

const MUTATION_SCHEMA = `
Wenn deine Antwort eine UI-Anpassung impliziert oder der Nutzer darum bittet,
gib ZUSÄTZLICH zu deiner Antwort ein JSON-Objekt mit UI-Mutationen zurück.

Format deiner Antwort (immer exakt so, kein Markdown, kein Prefix):
{
  "message": "Deine normale Antwort an den Nutzer hier.",
  "uiMutations": {
    "fontSize": "base|large|xl",
    "lineHeight": "normal|relaxed|loose",
    "spacing": "normal|spacious",
    "contrast": "normal|high",
    "motion": "full|reduced"
  }
}

Regeln für uiMutations:
- Gib NUR die Felder an, die sich tatsächlich ändern sollen.
- Wenn keine Änderung sinnvoll ist, gib ein leeres Objekt zurück: "uiMutations": {}
- Ändere fontSize auf "xl" bei explizitem Wunsch nach größerer Schrift oder bei Altersgruppe "Über 60".
- Ändere motion auf "reduced" wenn der Nutzer Animationen störend findet.
- Ändere contrast auf "high" bei Leseproblemen oder Barrierefreiheits-Wunsch.
- Erkläre in "message" kurz, was du geändert hast und warum.
`

function buildSystemPrompt(profile) {
    const p = aiPersonality
    const sections = []

    sections.push(`# Deine Identität\n${p.systemIdentity.concept}\n\n${p.systemIdentity.mission}`)

    const demo = p.demoContext
    const specs = Object.entries(demo.product.specs)
        .map(([k, v]) => `  - ${k}: ${v}`)
        .join('\n')

    sections.push(`# Demo-Kontext\n${demo.note}\nProdukt: ${demo.product.name} | ${demo.product.price}€\nFeatures: ${demo.product.features.join(', ')}\nSpezifikationen:\n${specs}`)

    const langCode = profile?.language?.value ?? 'de'
    sections.push(`# Sprache\n${p.languages[langCode] ?? p.languages['de']}`)

    const adaptations = []
    const tone = p.tones[profile?.tone ?? 'normal']
    if (tone) adaptations.push(`**Ton:** ${tone.instruction}\nBeispiel: "${tone.example}"`)
    if (profile?.alter && p.ageAdaptations[profile.alter])
        adaptations.push(`**Altersgruppe (${profile.alter}):** ${p.ageAdaptations[profile.alter].communicationStyle}`)
    if (profile?.technik && p.techLevelAdaptations[profile.technik])
        adaptations.push(`**Tech-Level (${profile.technik}):** ${p.techLevelAdaptations[profile.technik].communicationStyle}`)

    if (adaptations.length > 0)
        sections.push(`# Aktive Anpassungen\n${adaptations.join('\n\n')}`)

    sections.push(`# Verhaltensregeln\n${p.behaviorRules.map((r, i) => `${i + 1}. ${r}`).join('\n')}`)
    sections.push(`# Antwortformat (PFLICHT)\n${MUTATION_SCHEMA}`)

    return sections.join('\n\n---\n\n')
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { messages, profile } = body

    if (!messages || !Array.isArray(messages)) {
        throw createError({ statusCode: 400, message: 'messages array is required' })
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
            { role: 'system', content: buildSystemPrompt(profile) },
            ...messages.slice(-20),
        ],
        max_tokens: 600,
        temperature: 0.7,
        response_format: { type: 'json_object' },
    })

    const raw = completion.choices[0]?.message?.content ?? '{}'
    let parsed
    try {
        parsed = JSON.parse(raw)
    } catch {
        parsed = { message: raw, uiMutations: {} }
    }

    return {
        message: parsed.message ?? '',
        uiMutations: parsed.uiMutations ?? {},
        usage: completion.usage,
    }
})