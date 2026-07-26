<template>
  <div v-if="visible" class="fixed bottom-6 left-6 right-6 z-50 rounded-[28px] border border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl sm:left-auto sm:right-6 sm:w-[420px]">
    <div class="space-y-3 text-sm leading-6 text-slate-300">
      <p><strong>Cookie-Hinweis:</strong> Diese Website verwendet notwendige Cookies, um die Navigation und Funktionalität zu verbessern.</p>
      <p class="text-slate-500">Ihre Daten werden nicht für Marketingzwecke verwendet.</p>
    </div>
    <div class="mt-4 flex flex-wrap justify-end gap-3">
      <button @click="accept" class="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-400">Akzeptieren</button>
      <button @click="decline" class="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-300 transition hover:bg-white/10">Ablehnen</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const visible = ref(false)
const storageKey = 'kfz-cookies-accepted'
const accept = () => {
  localStorage.setItem(storageKey, 'true')
  visible.value = false
}
const decline = () => {
  localStorage.setItem(storageKey, 'false')
  visible.value = false
}
onMounted(() => {
  visible.value = localStorage.getItem(storageKey) !== 'true'
})
</script>
