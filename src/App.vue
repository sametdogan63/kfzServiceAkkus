<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <a href="#main-content" class="sr-only z-[100] rounded-lg bg-brand-300 px-4 py-3 font-bold text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Zum Inhalt springen</a>
    <Navbar />

    <main id="main-content" class="relative" tabindex="-1">
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
import Navbar from './components/Navbar.vue'
import FooterSection from './components/FooterSection.vue'
import ScrollToTopButton from './components/ScrollToTopButton.vue'
import CookieBanner from './components/CookieBanner.vue'
</script>
