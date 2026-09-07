<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <a href="#main-content" @click.prevent="skipToContent" class="sr-only z-[100] rounded-lg bg-brand-300 px-4 py-3 font-bold text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Zum Inhalt springen</a>
    <Navbar />

    <main id="main-content" ref="mainRef" class="relative" tabindex="-1">
      <router-view />
    </main>

    <FooterSection />
    <ScrollToTopButton />
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import FooterSection from './components/FooterSection.vue'
import ScrollToTopButton from './components/ScrollToTopButton.vue'

const mainRef = ref(null)
const route = useRoute()
const skipToContent = () => {
  mainRef.value?.focus({ preventScroll: true })
  mainRef.value?.scrollIntoView({ behavior: 'instant' })
}

watch(() => route.fullPath, async () => {
  await nextTick()
  mainRef.value?.focus({ preventScroll: true })
})
</script>
