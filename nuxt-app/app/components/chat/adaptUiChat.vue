<script setup>
import { useGroq } from '~/composables/useGroq'
import { ref } from 'vue'
import { useAdaptiveUI } from '~/composables/useAdaptiveUI'
import { useAutoAnimate } from '@formkit/auto-animate/vue'

const [chatContainer] = useAutoAnimate()

const { visibleMessages, isLoading, send, greet } = useGroq()
const input = ref('')
const messagesEnd = ref(null)
const show = ref(false);
const {text, color} = useAdaptiveUI();

onMounted(() => {
    greet()
})

const handleSend = async () => {
    if (!input.value.trim()) return
    const msg = input.value
    input.value = ''
    await send(msg)
    messagesEnd.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
    <div ref="chatContainer"  class="fixed bottom-4 right-4 z-50 w-[30rem] bg-white rounded-2xl group flex flex-col p-[1rem] border-neutral-500 border-[2px] duration-150 hover:border-primary">
        <div v-if="!show" @click="show = !show">
            <div class="p-[0.5rem] ">
                <div class="flex flex-row-reverse justify-between">
                    <div>
                        <Icon name="material-symbols:chat-rounded" class="text-neutral-400 w-[1.5rem] h-[1.5rem] duration-150 group-hover:bg-primary"/>
                    </div>
                    <div :class="[text.subline,'text-neutral-500']">AdaptUI...</div>
                </div>
            </div>
        </div>
        <div v-if="show">
            <!-- Header -->
            <div @click="show = false" :class="['absolute p-[0.5rem] cursor-pointer duration-150 justify-center items-center bg-primary rounded-full group-hover:opacity-100 opacity-0 text-[0.75rem] -top-4 right-4 text-white']">schließen</div>
            <div class=" p-[1rem] flex items-center gap-[0.5rem]">
                <div class="w-[2rem] h-[2rem] rounded-full  flex items-center justify-center bg-primary">
                    <Icon name="material-symbols:chat-rounded" class="text-white w-[1.2rem] h-[1.2rem]"/>
                </div>
                <div class="text-headline font-bold">AdaptUI</div>
            </div>

            <!-- Nachrichten -->
            <div class="flex flex-col gap-[0.5rem] p-[1rem] h-[20rem] overflow-y-auto bg-neutral-100 rounded-xl">
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
                    placeholder="Nachricht..."
                    class="flex-1 bg-neutral-100 text-neutral-900 text-sm rounded-full px-[1rem] py-[0.5rem] outline-none placeholder:text-[#656565]"
                />
                <button @click="handleSend" class="bg-primary w-[2.2rem] h-[2.2rem] rounded-full flex items-center justify-center shrink-0">
                    <Icon name="material-symbols:send-rounded" class="text-white w-[1rem] h-[1rem]"/>
                </button>
            </div>
        </div>
        
    </div>
</template>