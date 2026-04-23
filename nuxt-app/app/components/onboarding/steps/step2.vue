<script setup>
const open = ref(false)
const dropdownRef = ref(null)
const darkMode = ref(false)
const reducedMotion = ref(false)

const languages = [
    { label: 'Deutsch', value: 'de' },
    { label: 'Englisch', value: 'en' },
    { label: 'Französisch', value: 'fr' },
    { label: 'Spanisch', value: 'es' },
    { label: 'Italienisch', value: 'it' },
    { label: 'Türkisch', value: 'tr' },
    { label: 'Arabisch', value: 'ar' },
    { label: 'Russisch', value: 'ru' },
    { label: 'Chinesisch', value: 'zh' },
    { label: 'Japanisch', value: 'ja' },
]

const selected = ref(languages[0])

const select = (lang) => {
    selected.value = lang
    open.value = false
}

onMounted(() => {
    document.addEventListener('click', (e) => {
        if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
            open.value = false
        }
    })
})
</script>

<template>
    <div>
        <h2 class="text-headline font-bold text-[1.5rem] mt-[1rem]">Deine <span class="text-primary">Umgebung.</span></h2>
        <p class="text-secondarytext">Ich passe mein Erscheinungsbild an deine Situation an.</p>
    </div>
    <div class="gap-[0.5rem] flex flex-col mt-[1.5rem]">
        <h3 class="text-primarytext">DARSTELLUNG</h3>
        <div class="w-full flex flex-col justify-between gap-[1rem] text-[1.15rem] font-light">
            <div
                @click="darkMode = !darkMode"
                class="flex cursor-pointer flex-row justify-between pr-[1rem] pl-[1rem] p-[0.5rem] w-full rounded-lg border items-center gap-[2rem] bg-neutral-200 duration-100"
                :class="darkMode ? 'border-primary' : 'border-secondarytext hover:border-primary'"
            >
                <div class="text-secondarytext">Dunklen Modus bevorzugen</div>
                <div
                    class="rounded-full w-[3.5rem] h-[1.5rem] relative p-[0.25rem] duration-200 flex items-center"
                    :class="darkMode ? 'bg-primary' : 'bg-primarytext/50'"
                >
                    <div
                        class="bg-white w-[1rem] h-[1rem] rounded-full absolute duration-200"
                        :class="darkMode ? 'left-[calc(100%-1.25rem)]' : 'left-[0.25rem]'"
                    ></div>
                </div>
            </div>
            <div
                @click="reducedMotion = !reducedMotion"
                class="flex cursor-pointer flex-row justify-between pr-[1rem] pl-[1rem] p-[0.5rem] w-full rounded-lg border items-center gap-[2rem] bg-neutral-200 duration-100"
                :class="reducedMotion ? 'border-primary' : 'border-secondarytext hover:border-primary'"
            >
                <div class="text-secondarytext">Weniger Animationen</div>
                <div
                    class="rounded-full w-[3.5rem] h-[1.5rem] relative p-[0.25rem] duration-200 flex items-center"
                    :class="reducedMotion ? 'bg-primary' : 'bg-primarytext/50'"
                >
                    <div
                        class="bg-white w-[1rem] h-[1rem] rounded-full absolute duration-200"
                        :class="reducedMotion ? 'left-[calc(100%-1.25rem)]' : 'left-[0.25rem]'"
                    ></div>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-[2rem] gap-[0.5rem] flex flex-col">
        <h3 class="text-primarytext">BEVORZUGTE SPRACHE</h3>
        <div class="relative w-full text-[1.15rem] font-light" ref="dropdownRef">
            <div
                @click="open = !open"
                class="flex cursor-pointer flex-row justify-between pr-[1rem] pl-[1rem] p-[0.5rem] w-full rounded-lg border bg-neutral-200 items-center duration-100"
                :class="open ? 'border-primary' : 'border-secondarytext hover:border-primary'"
            >
                <div class="text-secondarytext">{{ selected.label }}</div>
                <Icon
                    name="material-symbols:keyboard-arrow-down-rounded"
                    class="text-secondarytext w-[1.5rem] h-[1.5rem] duration-200"
                    :class="open ? 'rotate-180' : ''"
                />
            </div>
            <div
                v-if="open"
                class="absolute z-50 mt-[0.25rem] w-full bg-neutral-200 border border-secondarytext rounded-lg shadow-lg max-h-[12rem] overflow-y-auto"
            >
                <div
                    v-for="lang in languages"
                    :key="lang.value"
                    @click="select(lang)"
                    class="flex flex-row items-center px-[1rem] py-[0.5rem] cursor-pointer hover:bg-neutral-300 duration-100"
                    :class="selected.value === lang.value ? 'text-primary font-medium' : 'text-secondarytext'"
                >
                    {{ lang.label }}
                </div>
            </div>
        </div>
    </div>
</template>