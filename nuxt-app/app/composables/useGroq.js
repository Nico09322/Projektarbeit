import { ref, computed } from 'vue'
import { useUserProfileStore } from '~/stores/userProfile'
import { useUIAdaptationsStore } from '~/stores/uiAdaptations'

export function useGroq() {
    const profileStore = useUserProfileStore()
    const uiStore = useUIAdaptationsStore()

    const messages = ref([])
    const isLoading = ref(false)
    const error = ref(null)
    // Letzte tatsächlich angewendete UI-Änderungen (für Debug/Display)
    const lastMutations = ref([])

    const send = async (userMessage) => {
        if (!userMessage?.trim()) return
        error.value = null
        messages.value.push({ role: 'user', content: userMessage })
        isLoading.value = true

        try {
            const data = await $fetch('/api/chat', {
                method: 'POST',
                body: {
                    messages: messages.value.slice(-20),
                    profile: {
                        alter: profileStore.alter,
                        technik: profileStore.technik,
                        language: profileStore.language,
                        tone: profileStore.tone,
                    },
                },
            })

            messages.value.push({ role: 'assistant', content: data.message })

            // UI-Mutationen anwenden falls vorhanden
            if (data.uiMutations && Object.keys(data.uiMutations).length > 0) {
                lastMutations.value = uiStore.applyMutations(data.uiMutations)
            } else {
                lastMutations.value = []
            }
        } catch (err) {
            error.value = err?.data?.message ?? 'Ein Fehler ist aufgetreten.'
            messages.value.push({
                role: 'assistant',
                content: 'Ich konnte gerade nicht antworten. Bitte versuche es erneut.',
            })
        } finally {
            isLoading.value = false
        }
    }

    const greet = async () => {
        const toneMap = {
            easy: 'Begrüße den Nutzer sehr herzlich und sag ihm in 1-2 kurzen Sätzen, was du als AdaptUI für ihn angepasst hast.',
            tech: 'Initiiere die Session. Beschreibe in 1-2 Sätzen präzise, welche UI-Parameter du basierend auf dem Profil gesetzt hast.',
            normal: 'Begrüße den Nutzer freundlich und erkläre kurz in 1-2 Sätzen, wie du die Website für ihn angepasst hast.',
        }
        const prompt = toneMap[profileStore.tone] ?? toneMap.normal
        await send(prompt)

        // Grußnachricht aus sichtbarem Verlauf ausblenden
        const idx = messages.value.findLastIndex(m => m.role === 'user')
        if (idx !== -1) messages.value[idx] = { ...messages.value[idx], hidden: true }
    }

    const clearMessages = () => {
        messages.value = []
        lastMutations.value = []
    }

    const visibleMessages = computed(() => messages.value.filter(m => !m.hidden))

    return { messages, visibleMessages, isLoading, error, lastMutations, send, greet, clearMessages }
}