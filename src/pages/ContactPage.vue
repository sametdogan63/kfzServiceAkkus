<template>
  <div class="space-y-0">
    <!-- Header Section -->
    <section class="section-container pb-8 pt-10 sm:pt-12 lg:pt-16">
      <div class="max-w-4xl">
        <p class="section-subtitle mb-4">Kontaktmöglichkeiten</p>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Kontakt und Anfahrt</h1>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed">Erreichen Sie uns telefonisch oder per E-Mail. Für Terminwünsche nutzen Sie unsere Online-Terminanfrage.</p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="section-container pb-16 pt-6 lg:pb-20">
      <ContactSection />
    </section>
  </div>
</template>

<script setup>
import ContactSection from '../components/ContactSection.vue'
</script>
