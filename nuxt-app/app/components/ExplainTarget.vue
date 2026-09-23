<script setup>
    import { useGroq } from '~/composables/useGroq'
    import { useTranslations } from '~/composables/useTranslations'

    const props = defineProps({
        // Kurzbezeichnung des Elements (wird der KI als "worauf wurde geklickt" übergeben)
        label: { type: String, required: true },
        // Kontext für die KI – was das Element bedeutet / welchen Nutzen es hat
        context: { type: String, required: true },
    })

    const { isOpen, isLoading, explain } = useGroq()
    const { t } = useTranslations()

    const onExplain = () => {
        // Nur aktiv wenn der AdaptUI-Chat geöffnet ist
        if (!isOpen.value || isLoading.value) return
        explain({ label: props.label, context: props.context })
    }
</script>

<template>
    <div
        :class="[
            'relative rounded-lg transition-shadow duration-150',
            isOpen ? 'group/explain cursor-help hover:ring-2 hover:ring-primary hover:bg-primary/5' : '',
        ]"
        @click="onExplain"
    >
        <!-- "erklären"-Pill – nur bei geöffnetem Chat und beim Hovern sichtbar -->
        <div
            v-if="isOpen"
            class="pointer-events-none absolute -top-3 left-2 z-40 flex items-center gap-[0.25rem] whitespace-nowrap rounded-full bg-primary px-[0.6rem] py-[0.3rem] text-[0.7rem] leading-none text-white shadow-lg opacity-0 -translate-y-1 transition-all duration-150 group-hover/explain:opacity-100 group-hover/explain:translate-y-0"
        >
            <Icon name="material-symbols:help-rounded" class="h-[0.8rem] w-[0.8rem]" />
            {{ t.explain.label }}
        </div>
        <slot />
    </div>
</template>
