<script setup>

    import { useAdaptiveUI } from '~/composables/useAdaptiveUI';

    const {text, color} = useAdaptiveUI();

    const props = defineProps({
        name: String,
        spec: String
    })

</script>

<template>
    <ExplainTarget :label="props.name" :context="`Technische Spezifikation der ULTRA Smartwatch: ${props.name} = ${props.spec}.`">
        <div class="w-full lg:w-[25vw] lg:min-w-[20rem] gap-[0.75rem] flex flex-col mb-[1rem]">
            <div class="text-[#656565] flex flex-row justify-between gap-[1rem] w-full">
                <div :class="[text.spec, color.muted]">{{props.name}}</div>
                <div :class="[text.subline, color.body, 'text-right']">{{ props.spec }}</div>
            </div>
            <div class="bg-[#656565] h-[1px]"></div>
        </div>
    </ExplainTarget>
</template>