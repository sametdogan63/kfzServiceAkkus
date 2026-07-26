<template>
  <nav class="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
    <div class="section-container">
      <div class="flex h-16 items-center justify-between lg:h-20">
        <RouterLink to="/" class="flex shrink-0 items-center gap-3 text-white transition hover:opacity-80">
          <div class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-lg font-bold text-white shadow-card">
            A
          </div>
          <div class="hidden sm:block">
            <p class="text-[10px] uppercase tracking-[0.35em] text-slate-400">KFZ Service</p>
            <p class="font-semibold text-white">Akkus</p>
          </div>
        </RouterLink>

        <div class="hidden items-center gap-1 lg:flex">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="group relative px-4 py-2 text-sm font-medium transition"
            :class="isActive(item.path) ? 'text-white' : 'text-slate-300 hover:text-white'"
          >
            <span>{{ item.label }}</span>
            <span class="absolute bottom-0 left-2 right-2 h-0.5 origin-left scale-x-0 rounded-full bg-brand-500 transition-transform duration-300 group-hover:scale-x-100" :class="isActive(item.path) ? 'scale-x-100' : ''"></span>
          </RouterLink>
        </div>

        <div class="flex shrink-0 items-center gap-3">
          <a href="tel:+49123456789" class="hidden gap-2 btn-primary py-2.5 px-5 text-xs lg:flex">
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 11c-.54-3.56-2.85-6.55-5.80-8.07-3.06-1.63-6.94-1.63-10 0-2.95 1.52-5.26 4.51-5.80 8.07-.07.47-.07.93 0 1.4.54 3.56 2.85 6.55 5.80 8.07 1.53.82 3.25 1.23 5 1.23s3.47-.41 5-1.23c2.95-1.52 5.26-4.51 5.80-8.07.07-.47.07-.93 0-1.4zM13 16h-2v-2h2v2zm0-4h-2V8h2v4z"></path></svg>
            <span>Anrufen</span>
          </a>
          <button @click="toggleMenu" class="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 p-2.5 text-slate-200 transition hover:border-brand-500 hover:text-white lg:hidden" aria-label="Menü öffnen">
            <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="isOpen" class="fixed inset-0 z-40 bg-neutral-950/70 backdrop-blur-sm lg:hidden" @click="closeMenu"></div>

      <transition name="slide-down">
        <div v-if="isOpen" class="relative z-50 border-t border-white/10 bg-neutral-950/95 backdrop-blur-xl lg:hidden">
          <div class="space-y-1 px-3 py-4">
            <RouterLink v-for="item in navItems" :key="item.path" :to="item.path" @click="closeMenu" class="flex rounded-2xl px-4 py-3 text-sm transition" :class="isActive(item.path) ? 'bg-white/10 text-white' : 'text-slate-200 hover:bg-white/5'">
              {{ item.label }}
            </RouterLink>
            <a href="tel:+49123456789" class="mt-2 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-white transition hover:bg-white/5">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 11c-.54-3.56-2.85-6.55-5.80-8.07-3.06-1.63-6.94-1.63-10 0-2.95 1.52-5.26 4.51-5.80 8.07-.07.47-.07.93 0 1.4.54 3.56 2.85 6.55 5.80 8.07 1.53.82 3.25 1.23 5 1.23s3.47-.41 5-1.23c2.95-1.52 5.26-4.51 5.80-8.07.07-.47.07-.93 0-1.4zM13 16h-2v-2h2v2zm0-4h-2V8h2v4z"></path></svg>
              <span>Jetzt anrufen</span>
            </a>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isOpen = ref(false)

const navItems = [
  { path: '/', label: 'Startseite' },
  { path: '/leistungen', label: 'Leistungen' },
  { path: '/ueber-uns', label: 'Über uns' },
  { path: '/termin', label: 'Termin' },
  { path: '/kontakt', label: 'Kontakt' }
]

const isActive = (path) => route.path === path

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
