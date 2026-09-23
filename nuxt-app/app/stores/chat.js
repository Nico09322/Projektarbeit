import { defineStore } from 'pinia'
import { useUserProfileStore } from '~/stores/userProfile'
import { useUIAdaptationsStore } from '~/stores/uiAdaptations'

const LANGUAGE_LABELS = {
    de: 'Deutsch', en: 'Englisch', fr: 'Français', es: 'Español',
    it: 'Italiano', tr: 'Türkçe', ar: 'العربية', ru: 'Русский',
    zh: '中文', ja: '日本語',
}

const TONE_GREETINGS = {
    easy: 'Begrüße den Nutzer sehr herzlich und sag ihm in 1-2 kurzen Sätzen, was du als AdaptUI für ihn angepasst hast.',
    tech: 'Initiiere die Session. Beschreibe in 1-2 Sätzen präzise, welche UI-Parameter du basierend auf dem Profil gesetzt hast.',
    normal: 'Begrüße den Nutzer freundlich und erkläre kurz in 1-2 Sätzen, wie du die Website für ihn angepasst hast.',
}

/**
 * Zentraler Chat-Store für AdaptUI.
 *
 * Hält den gesamten Gesprächs-State sowie das Öffnen/Schließen des Chatfensters.
 * Bewusst als Pinia-Store (statt Modul-Singleton im Composable) umgesetzt, damit
 * der State unter SSR pro Request isoliert ist und nicht zwischen Nutzern leakt.
 */
export const useChatStore = defineStore('chat', {
    state: () => ({
        messages: [],
        isLoading: false,
        error: null,
        // Letzte tatsächlich angewendete UI-Änderungen (für Debug/Display)
        lastMutations: [],
        // Ob das AdaptUI-Chatfenster gerade geöffnet ist – steuert auch die Erklär-Funktion
        isOpen: false,
    }),

    getters: {
        // Nachrichten ohne intern versteckte Steuer-Prompts (Greeting, Erklär-Anfragen)
        visibleMessages: (state) => state.messages.filter((m) => !m.hidden),
    },

    actions: {
        /**
         * Schickt eine Nutzernachricht an die KI und wendet zurückgelieferte
         * UI-/Sprach-Mutationen an.
         * @param {string} userMessage
         * @param {{ hidden?: boolean }} [opts] hidden = interner Steuer-Prompt, im Verlauf unsichtbar
         */
        async send(userMessage, { hidden = false } = {}) {
            if (!userMessage?.trim()) return

            const profileStore = useUserProfileStore()
            const uiStore = useUIAdaptationsStore()

            this.error = null
            this.messages.push({ role: 'user', content: userMessage, hidden })
            this.isLoading = true

            try {
                const data = await $fetch('/api/chat', {
                    method: 'POST',
                    body: {
                        messages: this.messages.slice(-20).map(({ role, content }) => ({ role, content })),
                        profile: {
                            alter: profileStore.alter,
                            technik: profileStore.technik,
                            language: profileStore.language,
                            tone: profileStore.tone,
                        },
                    },
                })

                this.messages.push({ role: 'assistant', content: data.message })

                // UI-Mutationen anwenden falls vorhanden
                if (data.uiMutations && Object.keys(data.uiMutations).length > 0) {
                    this.lastMutations = uiStore.applyMutations(data.uiMutations)
                } else {
                    this.lastMutations = []
                }

                // Sprachmutation anwenden falls vorhanden
                if (data.language && LANGUAGE_LABELS[data.language]) {
                    profileStore.language = { label: LANGUAGE_LABELS[data.language], value: data.language }
                }
            } catch (err) {
                this.error = err?.data?.message ?? 'Ein Fehler ist aufgetreten.'
                this.messages.push({
                    role: 'assistant',
                    content: 'Ich konnte gerade nicht antworten. Bitte versuche es erneut.',
                })
            } finally {
                this.isLoading = false
            }
        },

        /**
         * Begrüßt den Nutzer beim ersten Öffnen – Prompt bleibt im Verlauf unsichtbar.
         */
        async greet() {
            if (this.messages.length > 0) return
            const profileStore = useUserProfileStore()
            const prompt = TONE_GREETINGS[profileStore.tone] ?? TONE_GREETINGS.normal
            await this.send(prompt, { hidden: true })
        },

        /**
         * Lässt AdaptUI ein konkretes UI-Element im Chat erklären.
         * Öffnet dabei den Chat und schickt einen versteckten Steuer-Prompt – die
         * Antwort respektiert Sprache, Ton, Alter & Tech-Level über den System-Prompt.
         * @param {{ label: string, context: string }} target
         */
        async explain({ label, context }) {
            if (this.isLoading) return
            this.isOpen = true
            const prompt =
                `Der Nutzer hat auf der ULTRA-Website auf "erklären" geklickt – bei diesem Element: "${label}". ` +
                `Kontext (nur zur Orientierung für dich, nicht wörtlich wiederholen): ${context}. ` +
                `Erkläre dem Nutzer in 2-3 kurzen, hilfreichen Sätzen, was dieses Element bedeutet bzw. welchen Nutzen es ihm bietet. ` +
                `Sprich ihn direkt an. Eine UI-Anpassung ist nicht nötig ("uiMutations": {}).`
            await this.send(prompt, { hidden: true })
        },

        clear() {
            this.messages = []
            this.lastMutations = []
        },
    },
})
