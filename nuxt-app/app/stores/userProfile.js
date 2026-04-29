import { defineStore } from 'pinia'

export const useUserProfileStore = defineStore('userProfile', {
    state: () => ({
        alter: null,
        technik: null,
        darkMode: false,
        reducedMotion: false,
        language: { label: 'Deutsch', value: 'de' },
        tone: 'normal',
        onboardingComplete: false,
    }),

    actions: {
        setProfile(profile) {
            this.alter = profile.alter
            this.technik = profile.technik
            this.darkMode = profile.darkMode
            this.reducedMotion = profile.reducedMotion
            this.language = profile.language
            this.tone = profile.tone
            this.onboardingComplete = true
        },

        reset() {
            this.$reset()
        },
    },

    persist: true,
})