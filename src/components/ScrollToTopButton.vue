<template>
  <button v-if="visible" @click="scrollTop" class="fixed bottom-6 left-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-slate-900/95 text-white shadow-2xl shadow-slate-950/40 transition hover:border-brand-400 hover:bg-slate-800" aria-label="Zum Seitenanfang" title="Zum Seitenanfang">
    <ArrowUp class="h-5 w-5" aria-hidden="true" />
  </button>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowUp } from 'lucide-vue-next'
const visible = ref(false)
const updateVisibility = () => {
  visible.value = window.scrollY > 420
}
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

onMounted(() => {
  window.addEventListener('scroll', updateVisibility)
})
onUnmounted(() => {
  window.removeEventListener('scroll', updateVisibility)
})
</script>
