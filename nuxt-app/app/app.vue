<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'
    import { SplitText } from 'gsap/SplitText'

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

    
    


    onMounted(async () => {
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
  <navbar class="fixed top-0 z-50 w-full"/>
  <div class="absolute -z-50 top-0">
    <div ref="container" class="h-[280vh]">
        <div class="sticky top-0 w-[100vw] h-[100vh]">
        <canvas
            ref="canvas"
            width="1920"
            height="1080"
            class="w-full h-full object-cover -z-50"
        />
        </div>
    </div>
  </div>
  <div class="mt-[35rem] ml-[10vw]">
    <div class="text-[8rem] z-10 text-[#F27127]  font-black h-[10rem] overflow-hidden font-barlowC" ref="ultra">
        ULTRA
    </div>
    <div class="text-white text-[1.5rem] font-light ml-[0.25rem] overflow-hidden font-barlow" ref="subUltra">Built to perform.</div>
    <div class="flex flex-row gap-[1.5rem] mt-[2rem] overflow-hidden h-[3rem] font-barlow">
        <div class="h-[2.5rem] bg-[#F27127] p-[0.5rem] pl-[1.5rem] pr-[1.5rem] rounded-[100rem] text-white cursor-pointer" ref="buy">Kaufen - 899€</div>
        <div class="h-[2.5rem] text-[#656565] p-[0.5rem] pl-[1.5rem] pr-[1.5rem] border border-[#656565] rounded-[100rem] cursor-pointer" ref="more">mehr erfahren</div>
    </div>
  </div>
  <div class="h-[149vh] mt-[18rem] mb-[14rem] font-barlow">
    <div class="mt-[7rem] sticky top-[20rem]" ref="designContainer"> 
        <div class="ml-[10vw] flex flex-row items-center gap-[1rem]" ref="adaptiveDisplay">
            <div>
                <div class="text-white flex flex-row gap-[0.5rem] font-bold text-[1.25rem]">
                    <div>01</div>
                    <div class="text-[#F27127]">Adaptive Display</div>
                </div>
                <div class="text-[#B3B3B3] w-[15rem]">Das Always-On-Display passt Helligkeit, Schriftgröße und Informationsdichte automatisch an Licht und Situation an</div>
            </div>
            <div class="w-[13rem] h-[0.1rem] bg-gradient-to-r from-[#FFFFFF] to-transparent"></div>
        </div>
        <div class="ml-[65vw] flex flex-row items-center gap-[1rem]" ref="gesundheitsKI">
            <div class="w-[13rem] h-[0.1rem] bg-gradient-to-r from-transparent to-[#FFFFFF]"></div>
            <div>
                <div class="text-white flex flex-row gap-[0.5rem] font-bold text-[1.25rem]">
                    <div>02</div>
                    <div class="text-[#F27127]">Gesundheits-KI</div>
                </div>
                <div class="text-[#B3B3B3] w-[15rem]">Kontinuierliche EKG, SpO2 und Stressmessung. Interpretiert von einer persönlichen KI, die deine Muster versteht</div>
            </div>
        </div>    
        <div class="mt-[6rem] ml-[15vw] flex flex-row items-center gap-[1rem]" ref="akku72">

            <div>
                <div class="text-white flex flex-row gap-[0.5rem] font-bold text-[1.25rem]">
                    <div>03</div>
                    <div class="text-[#F27127]">72h Akkulaufzeit</div>
                </div>
                <div class="text-[#B3B3B3] w-[14rem]">Intelligentes Energiemanagement verlängert die Laufzeit auf bis zu 72 Stunden</div>
            </div>
            <div class="w-[13rem] h-[0.1rem] bg-gradient-to-r from-[#FFFFFF] to-transparent"></div>        
        </div>       
    </div>
  </div>
  <div class="font-barlow flex flex-row bg-[#151110] p-[10vw] pr-[10vw] pb-[20rem] justify-between w-[100vw]">
    <div class="mt-[5rem] flex flex-col relative w-[70rem]">
        <div class="flex flex-row items-center gap-[1rem] ">
            <div class="text-[#F27127]">technische Daten</div>
            <div class="h-[0.1rem] w-[10rem] bg-gradient-to-r from-[#F27127] to-transparent"></div>
        </div>
        <div class="text-white font-bold text-[4.5rem] w-[20rem]">Kompromisslose Präzision.</div>
        <div class="text-[#656565] text-[1.1rem] w-[40rem]">Gebaut aus Materialien, die Jahrzehnte überdauern. Ausgestattet mit Sensoren, die nichts verpassen</div>
        <img src="./assets/pictures/exploded.png" class="absolute top-[15rem] -left-[8rem]  w-[70rem]" alt="exploded"/>
    </div>
    <div class="mt-[8rem] text-[1.1rem]">
        <spec :name="'Gehäuse'" :spec="'Titan (Grade 5)'"/>
        <spec :name="'Glass'" :spec="'Saphirglas, 1.2mm'"/>
        <spec :name="'Display'" :spec="'LTPO AMOLED 2.1'"/>            
        <spec :name="'Auflösung'" :spec="'510 x 512px, 326ppi'"/>        
        <spec :name="'Prozessor'" :spec="'Ultra A2 Neural Chip'"/>        
        <spec :name="'Akku'" :spec="'72h, 520mAh'"/>        
        <spec :name="'Wasserdicht'" :spec="'100m / 10 ATM'"/>               
        <spec :name="'Sensoren'" :spec="'EKG, SpO2, Temp, Gyro'"/>       
        <spec :name="'Konnektivität'" :spec="'GPS, LTE, BT 5.3, NFC'"/>                                          
    </div>
  </div>

</template>