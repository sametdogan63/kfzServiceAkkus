<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <Navbar />

    <div class="relative">
      <transition name="page-fade" mode="out-in">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </transition>
    </div>

    <CTASection />
    <FooterSection />
    <FloatingWhatsAppButton />
    <ScrollToTopButton />
    <CookieBanner />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import CTASection from './components/CTASection.vue'
import FooterSection from './components/FooterSection.vue'
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton.vue'
import ScrollToTopButton from './components/ScrollToTopButton.vue'
import CookieBanner from './components/CookieBanner.vue'
</script>
