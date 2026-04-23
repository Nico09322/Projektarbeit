<script setup>
    const selectedAlter = ref(null)
    const selectedTechnik = ref(null)

    const alterOptionen = ['Unter 25', '25 - 40', '40 - 60', 'Über 60']
    const technikOptionen = [
        { label: 'Einsteiger', icon: 'mingcute:baby-line' },
        { label: 'Alltäglich', icon: 'ic:baseline-laptop' },
        { label: 'Profi', icon: 'mingcute:code-line' },
    ]
</script>

<template>
    <div>
        <h2 class="text-headline font-bold text-[1.5rem] mt-[1rem]">Hi! <span class="text-primary">Wer bist du?</span></h2>
        <p class="text-secondarytext">Damit ich mich richtig auf dich einstellen kann, brauchst du nur 60 Sekunden.</p>
    </div>
    <div class="gap-[0.5rem] flex flex-col mt-[1.5rem]">
        <h3 class="text-primarytext">DEIN ALTER</h3>
        <div class="w-full flex flex-row justify-between gap-[1rem] text-[1.15rem] font-light">
            <div
                v-for="option in alterOptionen"
                :key="option"
                @click="selectedAlter = option"
                class="flex cursor-pointer flex-row justify-center pr-[1rem] pl-[1rem] p-[0.5rem] w-full rounded-full border items-center gap-[2rem] bg-neutral-200 duration-100"
                :class="selectedAlter === option ? 'border-primary' : 'border-secondarytext hover:border-primary'"
            >
                <div class="w-[0.5rem] h-[0.5rem] rounded-full duration-100" :class="selectedAlter === option ? 'bg-primary' : 'bg-secondarytext'"></div>
                <div class="duration-100" :class="selectedAlter === option ? 'text-primary font-medium' : 'text-secondarytext'">{{ option }}</div>
            </div>
        </div>
    </div>
    <div class="mt-[2rem]">
        <h3 class="text-primarytext">DEINE TECHNIK-ERFAHRUNG</h3>
        <div class="w-full flex flex-row justify-between mt-[0.5rem] gap-[1rem] text-[1.15rem] font-light">
            <div
                v-for="option in technikOptionen"
                :key="option.label"
                @click="selectedTechnik = option.label"
                class="flex cursor-pointer flex-col items-center justify-center pr-[1rem] pl-[1rem] p-[1rem] w-full rounded-lg border bg-neutral-200 duration-100"
                :class="selectedTechnik === option.label ? 'border-primary' : 'border-secondarytext hover:border-primary'"
            >
                <Icon :name="option.icon" class="w-[2rem] h-[2rem] duration-100" :class="selectedTechnik === option.label ? 'text-primary' : 'text-secondarytext'"/>
                <div class="duration-100" :class="selectedTechnik === option.label ? 'text-primary font-medium' : 'text-secondarytext'">{{ option.label }}</div>
            </div>
        </div>
    </div>
</template>