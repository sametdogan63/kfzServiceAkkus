<template>
  <nav ref="navigationRef" aria-label="Hauptnavigation" @keydown.esc.stop.prevent="closeMenu()" @focusout="handleFocusOut" class="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/95 backdrop-blur-xl">
    <div class="section-container">
      <div class="flex h-16 items-center justify-between lg:h-20">
        <RouterLink to="/" aria-label="KFZ Service Akkus – Startseite" class="flex shrink-0 items-center transition hover:opacity-80">
          <span class="inline-flex h-10 w-36 items-center justify-center overflow-hidden rounded-lg border border-brand-400/40 bg-white shadow-card sm:h-12 sm:w-44">
            <img :src="logo" alt="KFZ Service Akkus Meisterbetrieb" width="398" height="393" class="h-full w-full object-cover object-center" />
          </span>
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
          <RouterLink to="/termin" class="hidden gap-2 btn-primary px-4 py-2.5 text-xs lg:flex">
            <CalendarDays class="h-4 w-4" aria-hidden="true" />
            <span>Termin anfragen</span>
          </RouterLink>
          <button ref="menuButtonRef" type="button" @click="toggleMenu" class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-slate-200 transition hover:border-brand-400 hover:text-white lg:hidden" :aria-label="isOpen ? 'Menü schließen' : 'Menü öffnen'" :aria-expanded="isOpen" aria-controls="mobile-navigation">
            <X v-if="isOpen" class="h-5 w-5" aria-hidden="true" />
            <Menu v-else class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <transition name="slide-down">
        <div v-show="isOpen" id="mobile-navigation" ref="menuRef" class="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-t border-white/10 bg-neutral-950 shadow-xl lg:hidden">
          <div class="space-y-1 px-3 py-4">
            <RouterLink v-for="item in navItems" :key="item.path" :to="item.path" @click="closeMenu(false)" class="flex min-h-11 w-full rounded-lg px-4 py-3 text-sm transition" :class="isActive(item.path) ? 'bg-white/10 text-white' : 'text-slate-200 hover:bg-white/5'">
              {{ item.label }}
            </RouterLink>
            <RouterLink to="/termin" @click="closeMenu(false)" class="mt-2 flex min-h-11 w-full items-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-bold text-slate-950">
              <CalendarDays class="h-4 w-4" aria-hidden="true" />
              <span>Termin anfragen</span>
            </RouterLink>
            <a href="tel:+4917623141582" class="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5">
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
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { CalendarDays, Menu, Phone, X } from 'lucide-vue-next'
import logo from '../assets/kfz-service-akkus-logo.png'

const route = useRoute()
const isOpen = ref(false)
const navigationRef = ref(null)
const menuRef = ref(null)
const menuButtonRef = ref(null)

const navItems = [
  { path: '/', label: 'Startseite' },
  { path: '/leistungen', label: 'Leistungen' },
  { path: '/ueber-uns', label: 'Über uns' },
  { path: '/termin', label: 'Termin' },
  { path: '/kontakt', label: 'Kontakt' }
]

const isActive = (path) => route.path === path

const toggleMenu = async () => {
  if (isOpen.value) {
    closeMenu()
    return
  }
  isOpen.value = true
  await nextTick()
  menuRef.value?.querySelector('a')?.focus()
}

const closeMenu = (restoreFocus = true) => {
  if (!isOpen.value) return
  isOpen.value = false
  if (restoreFocus) menuButtonRef.value?.focus()
}

const handleOutsideClick = (event) => {
  if (!navigationRef.value?.contains(event.target)) closeMenu(false)
}

const handleFocusOut = (event) => {
  if (event.relatedTarget && !navigationRef.value?.contains(event.relatedTarget)) closeMenu(false)
}

const handleResize = () => {
  if (window.innerWidth >= 1024) closeMenu(false)
}

watch(() => route.fullPath, () => closeMenu(false))
onMounted(() => {
  document.addEventListener('pointerdown', handleOutsideClick)
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  document.removeEventListener('pointerdown', handleOutsideClick)
  window.removeEventListener('resize', handleResize)
})
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
