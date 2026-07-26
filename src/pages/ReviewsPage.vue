<template>
  <div class="space-y-0">
    <!-- Header Section -->
    <section class="section-container section-spacing py-16 lg:py-24">
      <div class="max-w-4xl">
        <p class="section-subtitle mb-4">Kundenfeedback</p>
        <h1 class="text-5xl lg:text-6xl font-bold text-white mb-6">Was unsere Kunden sagen</h1>
        <p class="text-lg lg:text-xl text-slate-300 leading-relaxed">Echte Rückmeldungen von Kunden, die unseren Werkstattservice bereits erlebt haben und das volle Vertrauen in unsere Arbeit haben.</p>
      </div>
    </section>

    <!-- Reviews Grid Section -->
    <section class="section-container section-spacing">
      <div class="grid gap-8 lg:grid-cols-2">
        <ReviewCard
          name="Sven R."
          role="Firmenwagen"
          :rating="5"
          quote="Die Werkstatt hat sofort erkannt, was meine Batterie braucht. Professionell, pünktlich und sehr freundlich." />
        <ReviewCard
          name="Mara D."
          role="Privatfahrzeug"
          :rating="4.9"
          quote="Sehr angenehme Service-Erfahrung. Transparente Kostenaufstellung und schneller Termin." />
        <ReviewCard
          name="Klaus T."
          role="Sportwagen"
          :rating="5"
          quote="Top Beratung, hochwertige Reparatur und moderne Ausstattung. Hier stimmt einfach alles." />
        <ReviewCard
          name="Lisa F."
          role="Familienauto"
          :rating="4.8"
          quote="Schnelle Hilfe bei meinem Reifenwechsel und sehr nette Mitarbeiter. Empfehlenswert für alle, die Wert auf Qualität legen." />
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-container section-spacing">
      <div class="rounded-3xl bg-gradient-to-r from-brand-600/15 to-brand-500/10 border border-brand-500/30 p-12 lg:p-16 text-center">
        <h2 class="text-4xl lg:text-5xl font-bold text-white mb-4">Bereit für erstklassigen Service?</h2>
        <p class="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">Machen Sie jetzt einen Termin bei uns und erleben Sie den Unterschied hochwertigen Werkstattservices.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/termin" class="btn-primary">Termin buchen</RouterLink>
          <RouterLink to="/kontakt" class="btn-secondary">Kontakt aufnehmen</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ReviewCard from '../components/ReviewCard.vue'
</script>
