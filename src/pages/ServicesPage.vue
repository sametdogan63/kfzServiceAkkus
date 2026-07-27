<template>
  <div class="space-y-0">
    <section class="section-container section-spacing py-16 lg:py-24">
      <div class="max-w-4xl">
        <p class="section-subtitle mb-4">Unser Portfolio</p>
        <h1 class="text-5xl lg:text-6xl font-bold mb-6">Meisterservice und Tuning</h1>
        <p class="text-xl text-slate-300 leading-relaxed">KFZ Service Akkus in Essen bietet Werkstattservice und Tuning-Leistungen für Fahrzeuge verschiedener Marken. Wir verbinden Wartung, Reparatur und Diagnose mit sorgfältiger Arbeit im Meisterbetrieb.</p>
      </div>
    </section>

    <section class="section-container section-spacing">
      <div class="mb-10 max-w-3xl">
        <p class="section-subtitle mb-3">Unsere Werkstatt</p>
        <h2 class="text-4xl font-bold text-white lg:text-5xl">Werkstattservice</h2>
        <p class="mt-4 text-lg leading-relaxed text-slate-300">Unser Werkstattservice umfasst Inspektionen, Wartungen, Reparaturen, Fahrzeug- und Elektronikdiagnosen, Reifenwechsel, Klimaservice, Ölwechsel und Abgasuntersuchungen. Ergänzend bieten wir Karosserieinstandsetzung, Fahrzeugpflege, den Verkauf von Fahrzeugen und Ersatzteilen sowie Flottenbetreuung und Mobilitätsservices an.</p>
      </div>
      <ServiceGrid />
    </section>

    <section class="section-container section-spacing">
      <div class="mb-10 max-w-3xl">
        <p class="section-subtitle mb-3">Unsere Spezialleistung</p>
        <h2 class="text-4xl font-bold text-white lg:text-5xl">Tuning</h2>
        <p class="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">Unser Tuning-Angebot umfasst Chiptuning, Softwareoptimierungen und Motor-Tuning-Module. Je nach Fahrzeug und Zulassung beraten wir auch zu Launch-Control-Systemen sowie Einstellungen von Drehmoment, Ladedruck und Geschwindigkeitsbegrenzung.</p>
      </div>
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div class="border border-white/10 bg-slate-900/70 p-7 lg:p-8">
          <p class="text-xl font-bold text-white">Softwareoptimierung</p>
          <p class="mt-3 leading-relaxed text-slate-300">Individuelle Abstimmung nach Fahrzeug, Motorisierung und zulässigem Einsatzbereich.</p>
        </div>
        <div class="border border-white/10 bg-slate-900/70 p-7 lg:p-8">
          <p class="text-xl font-bold text-white">Motor-Tuning-Module</p>
          <p class="mt-3 leading-relaxed text-slate-300">Beratung zu passenden Modulen und deren Einsatz am jeweiligen Fahrzeug.</p>
        </div>
        <div class="border border-white/10 bg-slate-900/70 p-7 lg:p-8">
          <p class="text-xl font-bold text-white">Fahrzeugabstimmung</p>
          <p class="mt-3 leading-relaxed text-slate-300">Prüfung möglicher Einstellungen für Drehmoment, Ladedruck und Fahrfunktionen.</p>
        </div>
      </div>
      <p class="mt-6 border-l-2 border-amber-400 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">Tuning-Leistungen erfolgen nur nach individueller Prüfung und im rechtlich zulässigen Rahmen. Emissions- oder sicherheitsrelevante Systeme werden nicht für den öffentlichen Straßenverkehr deaktiviert oder umgangen.</p>
    </section>

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
