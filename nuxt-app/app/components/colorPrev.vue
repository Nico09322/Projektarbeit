<script setup>
    import { useAdaptiveUI } from '~/composables/useAdaptiveUI';

    const {text, color, layout} = useAdaptiveUI();

    const props = defineProps({
        color: String,
        name: String,
        desc: String
    })
</script>

<template>
    <div :class="[text.body,'flex flex-col justify-center items-center font-barlow w-[15rem] gap-[0.25rem] hover:bg-[rgba(255,255,255,0.1)] duration-75 cursor-pointer rounded-md p-[0.5rem] text-center']">
        <div class="w-[5rem] h-[5rem] rounded-full rotate-45 mb-[0.5rem]" :style="{backgroundImage: props.color}"></div>
        <div class="text-white">{{ props.name }}</div>
        <div class="text-[#969696]">{{ props.desc }}</div>
    </div>
</template>