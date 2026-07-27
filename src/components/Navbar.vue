<template>
  <nav class="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
    <div class="section-container">
      <div class="flex h-16 items-center justify-between lg:h-20">
        <RouterLink to="/" class="flex shrink-0 items-center transition hover:opacity-80">
          <span class="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-brand-400/40 bg-white shadow-card sm:h-14 sm:w-14">
            <img :src="logo" alt="KFZ Service Akkus Meisterbetrieb" class="h-full w-full scale-[1.75] object-cover object-center" />
          </span>
        </RouterLink>

        <div class="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
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
          <RouterLink to="/termin" class="hidden gap-2 btn-primary px-4 py-2.5 text-xs lg:flex">
            <CalendarDays class="h-4 w-4" aria-hidden="true" />
            <span>Termin anfragen</span>
          </RouterLink>
          <button @click="toggleMenu" class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-slate-200 transition hover:border-brand-400 hover:text-white lg:hidden" :aria-label="isOpen ? 'Menü schließen' : 'Menü öffnen'" :aria-expanded="isOpen" aria-controls="mobile-navigation">
            <X v-if="isOpen" class="h-5 w-5" aria-hidden="true" />
            <Menu v-else class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div v-if="isOpen" class="fixed inset-0 z-40 bg-neutral-950/70 backdrop-blur-sm lg:hidden" @click="closeMenu"></div>

      <transition name="slide-down">
        <div v-if="isOpen" id="mobile-navigation" class="relative z-50 border-t border-white/10 bg-neutral-950/95 backdrop-blur-xl lg:hidden">
          <div class="space-y-1 px-3 py-4">
            <RouterLink v-for="item in navItems" :key="item.path" :to="item.path" @click="closeMenu" class="flex rounded-2xl px-4 py-3 text-sm transition" :class="isActive(item.path) ? 'bg-white/10 text-white' : 'text-slate-200 hover:bg-white/5'">
              {{ item.label }}
            </RouterLink>
            <RouterLink to="/termin" @click="closeMenu" class="mt-2 flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-bold text-slate-950">
              <CalendarDays class="h-4 w-4" aria-hidden="true" />
              <span>Termin anfragen</span>
            </RouterLink>
            <a href="tel:+4917623141582" class="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5">
              <Phone class="h-4 w-4" aria-hidden="true" />
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
import { CalendarDays, Menu, Phone, X } from 'lucide-vue-next'
import logo from '../assets/kfz-service-akkus-logo.png'

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
