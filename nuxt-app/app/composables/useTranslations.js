import { computed } from 'vue'
import { useUserProfileStore } from '~/stores/userProfile'
import translations from '~/config/translations.json'

export function useTranslations() {
    const profileStore = useUserProfileStore()

    const t = computed(() => {
        const lang = profileStore.language?.value ?? 'de'
        return translations[lang] ?? translations['de']
    })

    return { t }
}
