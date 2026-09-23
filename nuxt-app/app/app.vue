<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'
    import { SplitText } from 'gsap/SplitText'
    import OnboardingModal from './components/onboarding/OnboardingModal.vue'
    import { useUserProfileStore } from './stores/userProfile'
    import { useAdaptiveUI } from './composables/useAdaptiveUI'
    import { useUIAdaptationsStore } from '~/stores/uiAdaptations';
    import AdaptUiChat from './components/chat/adaptUiChat.vue'
    import { useTranslations } from './composables/useTranslations'

    gsap.registerPlugin(ScrollTrigger)
    gsap.registerPlugin(SplitText)

    const container = ref(null)
    const canvas = ref(null)
    const frames = []
    const frameCount = 120
    const ultra = ref(null)
    const splitUltra = ref(null)
    const subUltra = ref(null)
    const splitSubUltra = ref(null)
    const buy = ref(null)
    const more = ref(null)
    const adaptiveDisplay = ref(null)
    const designContainer = ref(null)
    const gesundheitsKI = ref(null)
    const akku72 = ref(null)
    const profileStore = useUserProfileStore()
    const uiStore = useUIAdaptationsStore();
    const {text, color, layout, motion} = useAdaptiveUI();
    const { t } = useTranslations();

    // Dunkler Seitenhintergrund, damit unter dem Canvas nie Weiß durchscheint
    useHead({ bodyAttrs: { class: 'bg-[#151110]' } })

    onMounted(async () => {
        if(profileStore.onboardingComplete) {
            uiStore.applyProfile(profileStore.$state)
        }

        const ctx = canvas.value.getContext('2d')

        const promises = Array.from({ length: frameCount }, (_, i) => {
            return new Promise((resolve) => {
            const img = new Image()
            img.src = `/Uhr/frame${String(i + 1).padStart(4, '0')}.jpg`
            img.onload = () => resolve(img)
            img.onerror = () => resolve(null)
            frames.push(img)
            })
        })

        await Promise.all(promises)
        ctx.drawImage(frames[0], 0, 0)

        const obj = { frame: 0 }

        gsap.to(obj, {
            frame: frameCount - 1,
            ease: 'none',
            scrollTrigger: {
            trigger: container.value,
            start: 'top top',
            end: '+=1500px',
            scrub: 0.8,
            },
            onUpdate: () => {
            const img = frames[Math.round(obj.frame)]
            if (img) ctx.drawImage(img, 0, 0)
            },
        })

        

        splitUltra.value = SplitText.create(ultra.value, {type: "chars"});
        splitSubUltra.value = SplitText.create(subUltra.value, {type: "words"});

        gsap.from(splitUltra.value.chars, {
            duration: 0.5,
            y: 250,
            stagger: 0.1,
            ease: "power2.out"
        })

        gsap.from(splitSubUltra.value.words, {
            duration: 0.5,
            y: 250,
            stagger: 0.1,
            delay: 0.5,
            ease: "power2.out"
        })

        gsap.from(buy.value, {
            duration: 0.5,
            y: 250,
            stagger: 0.1,
            delay: 0.8,
            ease: "power2.out"
        })

        gsap.from(more.value,{
            duration: 0.5,
            y: 250,
            stagger: 0.1,
            delay: 0.9,
            ease: "power2.out"
        })

        gsap.from(adaptiveDisplay.value, {
            duration: 1,
            y: 250,
            ease: "power2.out",
            scrollTrigger: {
                trigger: designContainer.value,
                start: "top center",
            },  
            opacity: 0,
        })

        gsap.from(gesundheitsKI.value, {
            duration: 1,
            y: 250,
            delay: 0.25,
            ease: "power2.out",
            scrollTrigger: {
                trigger: designContainer.value,
                start: "top center",
            },  
            opacity: 0,
        }) 
        
        gsap.from(akku72.value, {
            duration: 1,
            y: 250,
            delay: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: designContainer.value,
                start: "top center",
            },  
            opacity: 0,
        }) 

    })

    onUnmounted(() => {
    ScrollTrigger.getAll().forEach(t => t.kill())
    })
</script>

<template>
    <onboarding-modal v-if="!profileStore.onboardingComplete" class=""/>
    <adaptUiChat v-if="profileStore.onboardingComplete"/>
    <navbar class="fixed top-0 z-50 w-full"/>
    <!--Hero-->
    <div class="absolute -z-50 top-0 w-full">
        <div ref="container" class="h-[280vh] lg:h-[calc(360vh+30rem)]">
            <div class="sticky top-0 w-[100%] h-[100vh] overflow-hidden">
            <canvas
                ref="canvas"
                width="1920"
                height="1080"
                class="w-full h-full object-cover -z-50"
            />
            </div>
        </div>
    </div>
    <div class="mt-[50vh] md:mt-[52vh] px-[6vw] md:px-0 md:ml-[10vw]">
        <div :class="[text.hero, 'z-10 text-[#F27127]  font-black h-[7rem] md:h-[10rem] overflow-hidden font-barlowC']"  ref="ultra">
            ULTRA
        </div>
        <div :class="[text.headline,'text-white text-[1.5rem] font-light ml-[0.25rem] overflow-hidden font-barlow']" ref="subUltra">{{ t.hero.tagline }}</div>
        <div :class="[text.body,'flex flex-row flex-wrap gap-[1rem] md:gap-[1.5rem] mt-[2rem] overflow-hidden font-barlow']">
            <div class="leading-normal bg-[#F27127] p-[0.5rem] pl-[1.5rem] pr-[1.5rem] rounded-[100rem] text-white cursor-pointer whitespace-nowrap" ref="buy">{{ t.hero.buy }}</div>
            <div class="leading-normal text-[#656565] p-[0.5rem] pl-[1.5rem] pr-[1.5rem] border border-[#656565] rounded-[100rem] cursor-pointer whitespace-nowrap" ref="more">{{ t.hero.more }}</div>
        </div>
    </div>
    <!--Design-->
    <div class="lg:h-[200vh] mb-[8rem] font-barlow">
        <div class="mt-[10rem] lg:mt-0 lg:sticky lg:top-0 lg:h-screen flex flex-col gap-[3rem] lg:grid lg:grid-rows-2 lg:gap-0 lg:pt-[max(6rem,12vh)] lg:pb-[8vh]" ref="designContainer"> 
            <div class="px-[6vw] lg:pr-0 lg:pl-[5vw] lg:w-[36vw] lg:row-start-1 lg:col-start-1 lg:self-center flex flex-row items-center gap-[1rem]" ref="adaptiveDisplay">
                <ExplainTarget label="Adaptive Display" context="Ein Kern-Feature der ULTRA Smartwatch. Das Always-On-Display passt Helligkeit, Schriftgröße und Informationsdichte automatisch an Licht und Situation an.">
                    <div class="bg-black/50 backdrop-blur-md rounded-lg p-[0.75rem] lg:bg-transparent lg:backdrop-blur-none lg:p-0">
                        <div :class="[text.subline,'text-white flex flex-row gap-[0.5rem] font-bold']">
                            <div>01</div>
                            <div class="text-[#F27127]">{{ t.features.f1title }}</div>
                        </div>
                        <div :class="[text.body,'text-[#B3B3B3] w-[15rem] lg:w-[13rem] xl:w-[15rem]']">{{ t.features.f1desc }}</div>
                    </div>
                </ExplainTarget>
                <div class="hidden lg:block flex-1 min-w-[1rem] h-[0.1rem] bg-gradient-to-r from-[#FFFFFF] to-transparent"></div>
            </div>
            <div class="px-[6vw] lg:pl-0 lg:pr-[5vw] lg:ml-[64vw] lg:row-start-1 lg:row-span-2 lg:col-start-1 lg:self-center flex flex-row justify-end items-center gap-[1rem]" ref="gesundheitsKI">
                <div class="hidden lg:block flex-1 min-w-[1rem] h-[0.1rem] bg-gradient-to-r from-transparent to-[#FFFFFF]"></div>
                <ExplainTarget label="Gesundheits-KI" context="Ein Kern-Feature der ULTRA. Kontinuierliche EKG-, SpO2- und Stressmessung, interpretiert von einer persönlichen KI, die die Muster des Nutzers versteht.">
                    <div class="bg-black/50 backdrop-blur-md rounded-lg p-[0.75rem] lg:bg-transparent lg:backdrop-blur-none lg:p-0">
                        <div :class="[text.subline,'text-white flex flex-row gap-[0.5rem] font-bold ']">
                            <div>02</div>
                            <div class="text-[#F27127]">{{ t.features.f2title }}</div>
                        </div>
                        <div :class="[text.body,'text-[#B3B3B3] w-[15rem] lg:w-[13rem] xl:w-[15rem]']">{{ t.features.f2desc }}</div>
                    </div>
                </ExplainTarget>
            </div>
            <div class="px-[6vw] lg:pr-0 lg:pl-[10vw] lg:w-[36vw] lg:row-start-2 lg:col-start-1 lg:self-center flex flex-row items-center gap-[1rem]" ref="akku72">
                <ExplainTarget label="72h Akkulaufzeit" context="Ein Kern-Feature der ULTRA. Intelligentes Energiemanagement verlängert die Laufzeit auf bis zu 72 Stunden.">
                    <div class="bg-black/50 backdrop-blur-md rounded-lg p-[0.75rem] lg:bg-transparent lg:backdrop-blur-none lg:p-0">
                        <div :class="[text.subline,'text-white flex flex-row gap-[0.5rem] font-bold'] ">
                            <div>03</div>
                            <div class="text-[#F27127]">{{ t.features.f3title }}</div>
                        </div>
                        <div :class="[text.body,'text-[#B3B3B3] w-[15rem] lg:w-[13rem] xl:w-[15rem]']">{{ t.features.f3desc }}</div>
                    </div>
                </ExplainTarget>
                <div class="hidden lg:block flex-1 min-w-[1rem] h-[0.1rem] bg-gradient-to-r from-[#FFFFFF] to-transparent"></div>
            </div>
        </div>
    </div>
    <!--Technische Daten-->
    <div class="font-barlow flex flex-col lg:flex-row gap-[2rem] bg-[#151110] p-[6vw] lg:p-[10vw] pb-[10rem] lg:pb-[20rem] justify-between w-[100%] overflow-hidden lg:overflow-visible">
        <div class="mt-[2rem] lg:mt-[5rem] flex flex-col relative w-full lg:flex-1 lg:max-w-[70rem]">
            <div class="flex flex-row items-center gap-[1rem] ">
                <div class="text-[#F27127]">{{ t.specs.label }}</div>
                <div class="h-[0.1rem] w-[10rem] bg-gradient-to-r from-[#F27127] to-transparent"></div>
            </div>
            <div :class="[text.section,'text-white font-bold max-w-[20rem]']">{{ t.specs.headline }}</div>
            <div :class="[text.subline,'text-[#656565] max-w-[40rem]']">{{ t.specs.subline }}</div>
            <img src="./assets/pictures/exploded.png" class="w-[160%] max-w-none -ml-[30%] -my-[10%] lg:my-0 lg:ml-0 lg:absolute lg:top-[15rem] lg:-left-[8rem] lg:w-[calc(100%+8rem)] lg:max-w-none" alt="exploded"/>
        </div>
        <div class="lg:mt-[8rem] w-full lg:w-auto">
            <spec :name="t.specs.case" spec="Titan (Grade 5)"/>
            <spec :name="t.specs.glass" spec="Saphirglas, 1.2mm"/>
            <spec :name="t.specs.display" spec="LTPO AMOLED 2.1"/>
            <spec :name="t.specs.resolution" spec="510 x 512px, 326ppi"/>
            <spec :name="t.specs.processor" spec="Ultra A2 Neural Chip"/>
            <spec :name="t.specs.battery" spec="72h, 520mAh"/>
            <spec :name="t.specs.waterResistance" spec="100m / 10 ATM"/>
            <spec :name="t.specs.sensors" spec="EKG, SpO2, Temp, Gyro"/>
            <spec :name="t.specs.connectivity" spec="GPS, LTE, BT 5.3, NFC"/>
        </div>
    </div>
    <!--Color-->
    <div class="font-barlow flex flex-col bg-[#151110] p-[6vw] lg:p-[10vw] pb-[12rem] lg:pb-[20rem] justify-between w-[100%]">
        <div class="flex flex-col md:flex-row items-center md:items-stretch gap-[1rem] justify-center -mt-[6rem] lg:-mt-[15rem]">
            <colorPrev class="w-full max-w-[20rem] md:flex-1 md:min-w-0 md:max-w-[15rem]" color="linear-gradient(90deg,rgba(184, 134, 11, 1) 0%, rgba(204, 170, 106, 1) 49%, rgba(184, 134, 11, 1) 100%);" name="Desert Gold" :desc="t.colors.desertGoldDesc"/>
            <div class="w-[60%] h-[1px] md:w-[1px] md:h-auto bg-[#656565]"></div>
            <colorPrev class="w-full max-w-[20rem] md:flex-1 md:min-w-0 md:max-w-[15rem]" color="linear-gradient(90deg,rgba(145, 145, 145, 1) 1%, rgba(219, 219, 219, 1) 49%, rgba(133, 133, 133, 1) 100%);" name="Titan Silber" :desc="t.colors.titanSilberDesc"/>
            <div class="w-[60%] h-[1px] md:w-[1px] md:h-auto bg-[#656565]"></div>
            <colorPrev class="w-full max-w-[20rem] md:flex-1 md:min-w-0 md:max-w-[15rem]" color="linear-gradient(90deg,rgba(20, 20, 20, 1) 1%, rgba(51, 51, 51, 1) 49%, rgba(20, 20, 20, 1) 100%);" name="Space Black" :desc="t.colors.spaceBlackDesc"/>
        </div>
    </div>
    <!--CTA-->
    <div class="h-[2px] bg-gradient-to-r from-transparent via-[#4a4a4a] to-transparent w-[70%] mx-auto -mt-[6rem] lg:-mt-[10rem] mb-[3rem] lg:mb-[5rem]"></div>
    <div class="items-center flex flex-col font-barlow bg-[#151110] pb-[12rem] md:pb-[10rem] ">
        <div :class="[text.body,'text-[#656565] flex flex-row flex-wrap justify-center gap-[0.5rem] items-center px-[6vw] text-center']">
            <div>{{ t.cta.price }}</div>
            <div class="bg-[#656565] w-[0.3rem] h-[0.3rem] rounded-full"></div>
            <div>{{ t.cta.shipping }}</div>
            <div class="bg-[#656565] w-[0.3rem] h-[0.3rem] rounded-full"></div>
            <div>{{ t.cta.returns }}</div>
        </div>
        <div :class="[text.headline ,'font-black mt-[1rem] text-center px-[6vw]']">
            <div class="text-white">{{ t.cta.headline1 }}</div>
            <div class="text-[#F27127] text-[2.5rem] md:text-[3.5rem] -mt-[0.5rem] md:-mt-[1rem]">{{ t.cta.headline2 }}</div>
        </div>
        <div :class="[text.body,'flex flex-row flex-wrap justify-center gap-[1rem] mt-[2rem] px-[6vw]']">
            <div class="leading-normal bg-[#F27127] p-[0.5rem] pl-[1.5rem] pr-[1.5rem] rounded-[100rem] text-white cursor-pointer whitespace-nowrap">{{ t.cta.configure }}</div>
            <div class="leading-normal text-[#656565] p-[0.5rem] pl-[1.5rem] pr-[1.5rem] border border-[#656565] rounded-[100rem] cursor-pointer whitespace-nowrap">{{ t.cta.dealer }}</div>
        </div>
    </div>
</template>