<script setup>

    import { gsap } from 'gsap'

    const designLine = ref(null);
    const techLine = ref(null);
    const healthLine = ref(null);
    const buy = ref(null);

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
    <div class="font-barlow text-[1.15rem] border border-b-1 border-t-0 border-r-0 border-l-0 pb-[1rem] border-white border-opacity-30 backdrop-blur-md">
        <div class="h-[4rem] w-full flex flex-row z-100 gap-[4rem] justify-center pt-[1rem] items-center text-[#656565]">
            <div class="hover:text-white duration-75 cursor-pointer overflow-hidden justify-center" @mouseenter="hover(designLine)" @mouseleave="leave(designLine)">
                <div class="">Design</div>
                <div class="bg-[#F27127] h-[0.1rem]" ref="designLine"></div>
            </div>
            <div class="hover:text-white duration-75 cursor-pointer overflow-hidden justify-center" @mouseenter="hover(techLine)" @mouseleave="leave(techLine)">
                <div class="">Technologie</div>
                <div class="bg-[#F27127] h-[0.1rem]" ref="techLine"></div>
            </div>
            <div class="hover:text-white duration-75 cursor-pointer overflow-hidden justify-center" @mouseenter="hover(healthLine)" @mouseleave="leave(healthLine)">
                <div class="">Gesundheit</div>
                <div class="bg-[#F27127] h-[0.1rem]" ref="healthLine"></div>
            </div>
            <div class="absolute right-[1rem] bg-[#F27127] p-[0.5rem] pl-[1.5rem] pr-[1.5rem] text-white rounded-[100rem] cursor-pointer" ref="buy" @mouseenter="buyHover" @mouseleave="buyLeave">Bestellen</div>     
        </div>
    </div>
</template>

