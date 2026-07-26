<template>
  <div class="space-y-0">
    <!-- Header Section -->
    <section class="section-container section-spacing py-16 lg:py-24">
      <div class="max-w-4xl">
        <p class="section-subtitle mb-4">Unser Portfolio</p>
        <h1 class="text-5xl lg:text-6xl font-bold mb-6">Alle Werkstatt-Services aus einer Hand</h1>
        <p class="text-xl text-slate-300 leading-relaxed">Von Batterie-Check bis Unfallreparatur: Wir bieten umfassende Leistungen für alle Fahrzeugtypen mit Meisterqualität und modernem Service-Erlebnis.</p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section-container section-spacing">
      <ServiceGrid />
    </section>

    <!-- CTA Section -->
    <section class="section-container section-spacing">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600/15 to-brand-500/10 border border-brand-500/30 p-12 lg:p-16">
        <div class="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.05)_0%,_transparent_50%)]"></div>
        <div class="relative text-center space-y-8">
          <div class="space-y-4">
            <h2 class="text-4xl lg:text-5xl font-bold">Haben Sie Fragen zur Leistung?</h2>
            <p class="text-lg text-slate-300 max-w-2xl mx-auto">Wir beraten Sie gerne zu den einzelnen Services und erstellen ein individuelles Angebot für Ihr Fahrzeug.</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink to="/kontakt" class="btn-primary">Jetzt kontaktieren</RouterLink>
            <RouterLink to="/termin" class="btn-secondary">Termin buchen</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ServiceGrid from '../components/ServiceGrid.vue'
</script>
