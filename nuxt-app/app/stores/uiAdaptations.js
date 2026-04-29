import { defineStore } from 'pinia'
import adaptiveClasses from '~/config/adaptiveClasses.json'

const DEFAULT_TOKENS = {
    fontSize: 'base',
    lineHeight: 'normal',
    spacing: 'normal',
    contrast: 'normal',
    motion: 'full',
}

export const useUIAdaptationsStore = defineStore('uiAdaptations', {
    state: () => ({
        tokens: { ...DEFAULT_TOKENS },
        // Log der Änderungen – nützlich um im Chat zu erklären was geändert wurde
        changeLog: [],
    }),

    getters: {
        /**
         * Gibt aufgelöste Tailwind-Klassen zurück, die Komponenten direkt binden können.
         * Struktur: { body, lead, headline, subline, spec, btn, lineHeight,
         *             section, card, gap, bodyColor, mutedColor, headingColor, motionClass }
         */
        classes(state) {
            const t = state.tokens
            const map = adaptiveClasses.tokens

            return {
                // Typografie
                ...map.fontSize[t.fontSize],
                lineHeight: map.lineHeight[t.lineHeight],

                // Spacing
                ...map.spacing[t.spacing],

                // Farben / Kontrast
                bodyColor: map.contrast[t.contrast].body,
                mutedColor: map.contrast[t.contrast].muted,
                headingColor: map.contrast[t.contrast].heading,

                // Motion – wird als Wrapper-Klasse auf root gesetzt
                motionClass: map.motion[t.motion],
            }
        },
    },

    actions: {
        /**
         * Wendet ein vollständiges Nutzerprofil an (nach Onboarding).
         * Wählt das passende Token-Set aus profiles[alter] und überschreibt
         * alles mit den manuellen Präferenzen (reducedMotion, darkMode).
         */
        applyProfile(profile) {
            const preset = adaptiveClasses.profiles[profile.alter] ?? DEFAULT_TOKENS

            this.tokens = {
                ...preset,
                // Manuelle Overrides aus dem Onboarding
                motion: profile.reducedMotion ? 'reduced' : preset.motion,
            }

            this.changeLog = []
            this._logChange('Profil angelegt', this.tokens)
        },

        /**
         * Wendet partielle Mutationen an – kommt aus der KI-Antwort.
         * Nur übergebene Felder werden geändert.
         */
        applyMutations(mutations) {
            const changed = []

            for (const [key, value] of Object.entries(mutations)) {
                if (this.tokens[key] !== undefined && this.tokens[key] !== value) {
                    changed.push({ key, from: this.tokens[key], to: value })
                    this.tokens[key] = value
                }
            }

            if (changed.length > 0) {
                this._logChange('KI-Mutation', changed)
            }

            return changed // gibt zurück was sich tatsächlich geändert hat
        },

        reset() {
            this.tokens = { ...DEFAULT_TOKENS }
            this.changeLog = []
        },

        _logChange(source, detail) {
            this.changeLog.push({
                source,
                detail,
                timestamp: new Date().toISOString(),
            })
        },
    },
})