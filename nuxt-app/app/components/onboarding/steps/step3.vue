<script setup>

    const props = defineProps({
        tone: String,
    })

    const easy = ref(false);
    const normal = ref(false);
    const tech = ref(false);

    const emit = defineEmits(['update:tone']);

    const select = (value) => {
        emit('update:tone', value)
    }

</script>

<template>
    <div>
        <h2 class="text-headline font-bold text-[1.5rem] mt-[1rem]">Deine <span class="text-primary">Umgebung.</span></h2>
        <p class="text-secondarytext">Ich passe mein Erscheinungsbild an deine Situation an.</p>
    </div>
    <div class="gap-[0.5rem] flex flex-col mt-[1.5rem]">
        <div class="w-full flex flex-col justify-between gap-[1rem] text-[1.15rem] font-light">
            <div
                @click="select('easy')"
                class="flex cursor-pointer flex-row justify-start pr-[1rem] pl-[1rem] p-[0.5rem] w-full rounded-lg border items-center gap-[2rem] bg-neutral-200 duration-100"
                :class="props.tone === 'easy' ? 'border-primary' : 'border-secondarytext hover:border-primary'"
            >
                <div class="w-[1.5rem] h-[1.5rem] flex justify-center items-center bg-neutral-400 rounded-full" :class="props.tone === 'easy' ? 'bg-primary' : ''">
                    <div class="w-[0.75rem] h-[0.75rem] bg-white rounded-full"></div>
                </div>
                <div>
                    <div class="text-secondarytext">Einfach & klar</div>   
                    <div class="text-desctext">"Drück auf den großen Knopf unten, dann geht´s los!"</div>                
                </div>    

                
            </div>
        </div>
        <div class="w-full flex flex-col justify-between gap-[1rem] text-[1.15rem] font-light">
            <div
                @click="select('normal')"
                class="flex cursor-pointer flex-row justify-start pr-[1rem] pl-[1rem] p-[0.5rem] w-full rounded-lg border items-center gap-[2rem] bg-neutral-200 duration-100"
                :class="props.tone === 'normal' ? 'border-primary' : 'border-secondarytext hover:border-primary'"
            >
                <div class="w-[1.5rem] h-[1.5rem] flex justify-center items-center bg-neutral-400 rounded-full" :class="props.tone === 'normal' ? 'bg-primary' : ''">
                    <div class="w-[0.75rem] h-[0.75rem] bg-white rounded-full"></div>
                </div>
                <div>
                    <div class="text-secondarytext">Natürlich und freundlich</div>   
                    <div class="text-desctext">"Klick auf den Button unten rechts, um fortzufahren."</div>                
                </div>    
            </div>
        </div>
        <div class="w-full flex flex-col justify-between gap-[1rem] text-[1.15rem] font-light">
            <div
                @click="select('tech')"
                class="flex cursor-pointer flex-row justify-start pr-[1rem] pl-[1rem] p-[0.5rem] w-full rounded-lg border items-center gap-[2rem] bg-neutral-200 duration-100"
                :class="props.tone === 'tech' ? 'border-primary' : 'border-secondarytext hover:border-primary'"
            >
                <div class="w-[1.5rem] h-[1.5rem] flex justify-center items-center bg-neutral-400 rounded-full" :class="props.tone === 'tech' ? 'bg-primary' : ''">
                    <div class="w-[0.75rem] h-[0.75rem] bg-white rounded-full"></div>
                </div>
                <div>
                    <div class="text-secondarytext">Technisch und präzise</div>   
                    <div class="text-desctext">"Initiere den prozess via CTA-Element unten rechts."</div>                
                </div>    
            </div>
        </div>        
    </div>
</template>