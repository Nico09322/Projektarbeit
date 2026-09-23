<script setup>

    import { gsap } from 'gsap'
    import { useAdaptiveUI } from '~/composables/useAdaptiveUI';
    import { useTranslations } from '~/composables/useTranslations';

    const designLine = ref(null);
    const techLine = ref(null);
    const healthLine = ref(null);
    const buy = ref(null);
    const menuOpen = ref(false);
    const {text} = useAdaptiveUI();
    const { t } = useTranslations();

    onMounted(async () => {
            gsap.to(designLine.value, {
                x:-100
            })

            gsap.to(techLine.value, {
                x:-100
            })
            gsap.to(healthLine.value, {
                x:-100
            })
        }
    )


    const hover = (line) => {
        gsap.to(line, {
            x: 0,
            duration: 0.3,
            ease: "power2.inOut",
        })
    }

    const leave = (line) => {
        gsap.to(line, {
            x: -100,
            duration: 0.15,
            ease: "power2.inOut"
        })
    }

    const buyHover = () => {
        gsap.to(buy.value, {
            scale:1.1,
            duration: 0.2,
            ease: "power2.inOut"
        })
    }

    const buyLeave = () => {
        gsap.to(buy.value, {
            scale:1,
            duration: 0.1,
            ease: "power2.inOut"
        })
    }


</script>

<template>
    <div :class="[text.body,'font-barlow border border-b-1 border-t-0 border-r-0 border-l-0 pb-[1rem] border-white border-opacity-30 backdrop-blur-md']">
        <div class="h-[4rem] w-full flex flex-row z-100 gap-[2rem] lg:gap-[4rem] justify-between md:justify-center pt-[1rem] px-[1rem] items-center text-[#656565]">
            <div class="md:hidden text-white cursor-pointer flex items-center" @click="menuOpen = !menuOpen">
                <Icon :name="menuOpen ? 'material-symbols:close-rounded' : 'material-symbols:menu-rounded'" class="w-[1.75rem] h-[1.75rem]"/>
            </div>
            <div class="hidden md:block hover:text-white duration-75 cursor-pointer overflow-hidden justify-center" @mouseenter="hover(designLine)" @mouseleave="leave(designLine)">
                <div class="">{{ t.nav.design }}</div>
                <div class="bg-[#F27127] h-[0.1rem]" ref="designLine"></div>
            </div>
            <div class="hidden md:block hover:text-white duration-75 cursor-pointer overflow-hidden justify-center" @mouseenter="hover(techLine)" @mouseleave="leave(techLine)">
                <div class="">{{ t.nav.technologie }}</div>
                <div class="bg-[#F27127] h-[0.1rem]" ref="techLine"></div>
            </div>
            <div class="hidden md:block hover:text-white duration-75 cursor-pointer overflow-hidden justify-center" @mouseenter="hover(healthLine)" @mouseleave="leave(healthLine)">
                <div class="">{{ t.nav.gesundheit }}</div>
                <div class="bg-[#F27127] h-[0.1rem]" ref="healthLine"></div>
            </div>
            <div class="md:absolute md:right-[1rem] bg-[#F27127] p-[0.5rem] pl-[1.5rem] pr-[1.5rem] text-white rounded-[100rem] cursor-pointer whitespace-nowrap" ref="buy" @mouseenter="buyHover" @mouseleave="buyLeave">{{ t.nav.bestellen }}</div>
        </div>
        <!-- Mobiles Menü -->
        <div v-if="menuOpen" class="md:hidden flex flex-col px-[1rem] pt-[1rem] gap-[0.75rem] text-[#B3B3B3]">
            <div class="cursor-pointer hover:text-white" @click="menuOpen = false">{{ t.nav.design }}</div>
            <div class="cursor-pointer hover:text-white" @click="menuOpen = false">{{ t.nav.technologie }}</div>
            <div class="cursor-pointer hover:text-white" @click="menuOpen = false">{{ t.nav.gesundheit }}</div>
        </div>
    </div>
</template>

