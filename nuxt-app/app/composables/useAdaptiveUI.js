import { computed } from 'vue'
import { useUIAdaptationsStore } from '~/stores/uiAdaptations'

/**
 * Gibt reaktive Klassen-Objekte zurück.
 * Jede Komponente importiert nur was sie braucht.
 *
 * Beispiel:
 *   const { text, layout, motion } = useAdaptiveUI()
 *   <div :class="[text.body, text.lineHeight]">...</div>
 */
export function useAdaptiveUI() {
    const store = useUIAdaptationsStore()

    const cls = computed(() => store.classes)

    /**
     * Text-Klassen
     */
    const text = computed(() => ({
        body: `${cls.value.body} ${cls.value.lineHeight}`,
        lead: `${cls.value.lead} ${cls.value.lineHeight}`,
        headline: `${cls.value.headline} font-black ${cls.value.lineHeight}`,
        subline: `${cls.value.subline} ${cls.value.lineHeight}`,
        spec: `${cls.value.spec}`,
        btn: `${cls.value.btn}`,
        hero: `${cls.value.hero}`,
        section: `${cls.value.sectionHead}`
    }))

    /**
     * Farb-Klassen (Kontrast-adaptiv)
     */
    const color = computed(() => ({
        body: cls.value.bodyColor,
        muted: cls.value.mutedColor,
        heading: cls.value.headingColor,
    }))

    /**
     * Layout / Spacing-Klassen
     */
    const layout = computed(() => ({
        section: cls.value.section,
        card: cls.value.card,
        gap: cls.value.gap,
    }))

    /**
     * Motion-Klasse – auf den Root-Wrapper setzen.
     * Wenn 'adapt-reduced-motion' aktiv ist, greifen die globalen CSS-Regeln.
     */
    const motion = computed(() => cls.value.motionClass)

    return { text, color, layout, motion, raw: cls }
}