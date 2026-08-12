<template>
  <div class="min-h-screen bg-gradient-dark text-slate-100">
    <a href="#main-content" class="sr-only z-[100] rounded-lg bg-brand-300 px-4 py-3 font-bold text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Zum Inhalt springen</a>
    <Navbar />

    <div class="fixed bottom-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/95 p-2 shadow-[0_16px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:hidden">
      <div class="flex items-center gap-2">
        <RouterLink to="/termin" class="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-500 px-4 py-3 text-sm font-semibold text-white">
          <CalendarDays class="h-4 w-4" aria-hidden="true" />
          <span>Termin</span>
        </RouterLink>
        <a href="tel:+4917623141582" class="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm font-semibold text-slate-200">
          <Phone class="h-4 w-4" aria-hidden="true" />
          <span>Anrufen</span>
        </a>
      </div>
    </div>

    <main id="main-content" class="relative pb-28 lg:pb-0" tabindex="-1">
      <transition name="page-fade" mode="out-in">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </transition>
    </main>

    <FooterSection />
    <ScrollToTopButton />
    <CookieBanner />
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { CalendarDays, Phone } from 'lucide-vue-next'
import Navbar from './components/Navbar.vue'
import FooterSection from './components/FooterSection.vue'
import ScrollToTopButton from './components/ScrollToTopButton.vue'
import CookieBanner from './components/CookieBanner.vue'
</script>
