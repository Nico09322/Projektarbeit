<script setup>

    const props = defineProps({
        name: String,
        spec: String
    })

</script>

<template>
        <div class="w-[25vw] gap-[0.75rem] flex flex-col mb-[1rem]">
            <div class="text-[#656565] flex flex-row justify-between w-[25vw]">
                <div>{{props.name}}</div>
                <div class="text-white">{{ props.spec }}</div>
            </div>
            <div class="bg-[#656565] h-[1px]"></div>
        </div> 
</template>