<script setup>
    import { gsap } from 'gsap'

    const checkmark = ref(null);
    const checkmarkBorder = ref(null);

    onMounted(() => {
        const tl = gsap.timeline()

        tl.fromTo(checkmarkBorder.value,
            { scale: 0 },
            { scale: 1, duration: 0.5, ease: "elastic", delay: 0.3 },
        ).fromTo(checkmark.value,
            { scale: 0 },
            { scale: 1, duration: 0.5, ease: "elastic" },
            "-=0.3"
        )
    })
</script>

<template>
    <div class="flex flex-col justify-center items-center p-[1rem]">
        <div ref="checkmarkBorder" class="rounded-full bg-primary w-[8rem] h-[8rem] flex justify-center items-center">
            <div ref="checkmark">
                <Icon name="material-symbols:check-rounded" class="bg-white h-[3rem] w-[3rem] mt-[0.3rem]"/>
            </div>
        </div>
        <div class="text-headline font-bold text-[1.5rem] mt-[1rem]">Dein Profil ist bereit!</div>
        <div class="text-desctext">AdaptUI hat eine persönliche Oberfläche für dich konfiguriert.</div>
        <div class="text-desctext">Du kannst sie jederzeit über den Chat anpassen!</div>
    </div>
</template> 