<template>
  <div class="space-y-0">
    <!-- Header Section -->
    <section class="section-container section-spacing py-16 lg:py-24">
      <div class="max-w-4xl">
        <p class="section-subtitle mb-4">Kontaktmöglichkeiten</p>
        <h1 class="text-5xl lg:text-6xl font-bold mb-6">Wir sind gerne für Sie da</h1>
        <p class="text-xl text-slate-300 leading-relaxed">Erreichen Sie uns telefonisch oder per E-Mail. Für Terminwünsche nutzen Sie direkt unsere Online-Termin-Anfrage.</p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="section-container section-spacing">
      <ContactSection />
    </section>
  </div>
</template>

<script setup>
import ContactSection from '../components/ContactSection.vue'
</script>
