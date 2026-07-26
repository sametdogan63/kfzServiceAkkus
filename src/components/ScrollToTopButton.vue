<template>
  <button v-if="visible" @click="scrollTop" class="fixed bottom-6 left-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/95 text-white shadow-2xl shadow-slate-950/40 transition hover:bg-brand-500">
    <svg viewBox="0 0 24 24" class="h-6 w-6"><path fill="currentColor" d="m12 5-8 8h5v6h6v-6h5l-8-8Z"/></svg>
  </button>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
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
