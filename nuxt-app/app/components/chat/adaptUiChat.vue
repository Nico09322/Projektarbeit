<script setup>
import { useGroq } from '~/composables/useGroq'
import { ref, watch, nextTick } from 'vue'
import { useAdaptiveUI } from '~/composables/useAdaptiveUI'
import { useTranslations } from '~/composables/useTranslations'
import { useAutoAnimate } from '@formkit/auto-animate/vue'

const [chatContainer] = useAutoAnimate()

const { visibleMessages, isLoading, isOpen, send, greet } = useGroq()
const input = ref('')
const messagesEnd = ref(null)
const {text, color} = useAdaptiveUI();
const { t } = useTranslations();

onMounted(() => {
    greet()
})

const scrollToEnd = () => {
    nextTick(() => messagesEnd.value?.scrollIntoView({ behavior: 'smooth' }))
}


watch(() => visibleMessages.value.length, scrollToEnd)

watch(isOpen, (open) => { if (open) scrollToEnd() })

const handleSend = async () => {
    if (!input.value.trim()) return
    const msg = input.value
    input.value = ''
    await send(msg)
    scrollToEnd()
}
</script>

<template>
    <div ref="chatContainer"  class="fixed bottom-4 right-4 left-4 sm:left-auto z-50 sm:w-[30rem] bg-white rounded-2xl group flex flex-col p-[1rem] border-neutral-500 border-[2px] duration-150 hover:border-primary">
        <div v-if="!isOpen" @click="isOpen = true" class="cursor-pointer">
            <div class="p-[0.5rem] ">
                <div class="flex flex-row-reverse justify-between">
                    <div>
                        <Icon name="material-symbols:chat-rounded" class="text-neutral-400 w-[1.5rem] h-[1.5rem] duration-150 group-hover:bg-primary"/>
                    </div>
                    <div :class="[text.subline,'text-neutral-500']">AdaptUI...</div>
                </div>
            </div>
        </div>
        <div v-if="isOpen">
            <!-- Header -->
            <div @click="isOpen = false" :class="['absolute pr-[0.5rem] pl-[0.5rem] p-[0.25rem] cursor-pointer duration-150 justify-center items-center bg-primary rounded-full sm:opacity-0 group-hover:opacity-100 text-[0.75rem] -top-4 right-4 text-white']">{{ t.chat.close }}</div>
            <div class=" p-[1rem] pb-[0.5rem] flex items-center gap-[0.5rem]">
                <div class="w-[2rem] h-[2rem] rounded-full  flex items-center justify-center bg-primary">
                    <Icon name="material-symbols:chat-rounded" class="text-white w-[1.2rem] h-[1.2rem]"/>
                </div>
                <div class="text-headline font-bold">AdaptUI</div>
            </div>
            <!-- Hinweis auf die Erklär-Funktion -->
            <div class="px-[1rem] pb-[0.75rem] flex items-center gap-[0.4rem] text-[0.7rem] text-neutral-400 leading-tight">
                <Icon name="material-symbols:touch-app-outline-rounded" class="w-[0.9rem] h-[0.9rem] shrink-0"/>
                <span>{{ t.chat.explainHint }}</span>
            </div>

            <!-- Nachrichten -->
            <div class="flex flex-col gap-[0.5rem] p-[1rem] h-[min(20rem,45dvh)] overflow-y-auto bg-neutral-100 rounded-xl">
                <div
                    v-for="(msg, i) in visibleMessages"
                    :key="i"
                    class="max-w-[80%] p-[0.6rem] px-[0.9rem] rounded-2xl text-sm"
                    :class="msg.role === 'user'
                        ? 'bg-primary text-white self-end rounded-br-sm'
                        : 'bg-neutral-300 text-neutral-900 self-start rounded-bl-sm'"
                >
                    {{ msg.content }}
                </div>
                <div v-if="isLoading" class="bg-neutral-300 text-neutral-900 self-start rounded-2xl rounded-bl-sm p-[0.6rem] px-[0.9rem] text-sm">
                    ...
                </div>
                <div ref="messagesEnd"/>
            </div>

            <!-- Input -->
            <div class=" pt-[0.75rem] flex gap-[0.5rem]">
                <input
                    v-model="input"
                    @keydown.enter="handleSend"
                    :placeholder="t.chat.placeholder"
                    class="flex-1 bg-neutral-100 text-neutral-900 text-sm rounded-full px-[1rem] py-[0.5rem] outline-none placeholder:text-[#656565]"
                />
                <button @click="handleSend" class="bg-primary w-[2.2rem] h-[2.2rem] rounded-full flex items-center justify-center shrink-0">
                    <Icon name="material-symbols:send-rounded" class="text-white w-[1rem] h-[1rem]"/>
                </button>
            </div>
        </div>
        
    </div>
</template>