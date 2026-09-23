import { storeToRefs } from 'pinia'
import { useChatStore } from '~/stores/chat'

/**
 * Dünner Wrapper um den zentralen Chat-Store.
 * Hält die bisherige Composable-API bei, teilt den State aber jetzt
 * zwischen Chatfenster und Erklär-Funktion (siehe ExplainTarget.vue).
 */
export function useGroq() {
    const store = useChatStore()
    const { messages, visibleMessages, isLoading, error, lastMutations, isOpen } = storeToRefs(store)

    return {
        messages,
        visibleMessages,
        isLoading,
        error,
        lastMutations,
        isOpen,
        // Pinia bindet Actions automatisch an den Store – Destructuring ist sicher
        send: store.send,
        greet: store.greet,
        explain: store.explain,
        clearMessages: store.clear,
    }
}
