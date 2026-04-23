<script setup>
    import Step1 from './steps/step1.vue';
    import Step2 from './steps/step2.vue';
    import { useAutoAnimate } from '@formkit/auto-animate/vue'
    
    const animationParent = ref(null);
    const currentStep = ref(1);
    const totalSteps = 3;
    const next = ref("weiter");

    useAutoAnimate(animationParent)

    onMounted(() => {
    document.body.style.overflow = 'hidden'
    })

    onUnmounted(() => {
    document.body.style.overflow = ''
    })

    const clickNext = () => {
        if (currentStep.value === 3) { 
            finish()
        } else if (currentStep.value === 2) {
            next.value = 'fertigstellen'
            currentStep.value += 1
        } else {
            currentStep.value += 1
        }
    }

    const clickBack = () => {
        if(currentStep.value > 1) {
            currentStep.value -= 1;
            next.value = "weiter"
        } else {
            return
        }
    }

    const finish = () => {

    }

</script>

<template>
    <div class="bg-black/50 w-full h-full absolute top-0 z-50 flex justify-center items-center" ref="animationParent">
        <div class=" bg-white p-[2rem] rounded-lg flex flex-col justify-start gap-[1rem]">
            <div class="w-[50rem] h-[0.2rem] bg-neutral-200 rounded-lg">
                <div class="h-full bg-primary rounded-lg duration-300" :style="{ width: `${(currentStep / totalSteps) * 100}%` }"/>
            </div>
            <div class="flex flex-row justify-between items-center">
                <div class="flex flex-row items-center gap-[0.5rem]">
                    <div class="w-[3.5rem] h-[3.5rem] rounded-full bg-primary flex justify-center items-center">
                        <Icon  name="material-symbols:chat-rounded" class="bg-white w-[2rem] h-[2rem]"/>
                    </div>
                    <h1 class="text-headline font-black text-[1.5rem]">AdaptUI</h1>
                </div>
                <div>
                    <div class="text-secondarytext">Schritt {{ currentStep }} von 3</div>
                </div>
            </div>
            <div >
                <Step1 v-if="currentStep === 1"/>
                <Step2 v-if="currentStep === 2"/>
            </div>
            <div :class="currentStep > 1 ? 'w-full justify-between flex mt-[2rem]' : 'w-full justify-end flex mt-[2rem]'">
                <div class="bg-secondarytext cursor-pointer hover:bg-secondarytext/75 duration-100 text-white rounded-full p-[0.5rem] pr-[1rem] pl-[1rem] w-fit" v-if="currentStep > 1" @click="clickBack">zurück</div>
                <div class="bg-primary cursor-pointer hover:bg-primary/75 duration-100 text-white rounded-full p-[0.5rem] pr-[1rem] pl-[1rem] w-fit" @click="clickNext">{{next}}</div>
            </div>
        </div>
    </div>
</template>