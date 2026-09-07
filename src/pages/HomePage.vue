<template>
  <div class="space-y-0">
    <HeroSection />

    <section class="section-container section-spacing">
      <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div class="space-y-6 fade-in">
          <div class="section-title">
            <p class="section-subtitle">Persönlich vor Ort</p>
            <h2 class="text-3xl font-bold sm:text-4xl">Sefkan Akkus, Ihr Kfz-Meister</h2>
          </div>
          <p class="text-base leading-relaxed text-slate-300 sm:text-lg">
            Seit Anfang 2022 führt Sefkan Akkus die Werkstatt in Essen. Seinen Meistertitel erwarb er bei der Handwerkskammer Düsseldorf.
          </p>
          <p class="text-base leading-relaxed text-slate-300 sm:text-lg">
            Ob Wartung, eine Warnleuchte oder eine anstehende Reparatur: Teilen Sie uns Fahrzeugmarke und Anliegen mit. Für Rückfragen erreichen Sie uns auch direkt telefonisch.
          </p>

          <div class="pt-2">
            <RouterLink to="/ueber-uns" class="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-300">Unsere Werkstatt kennenlernen<ArrowRight class="h-4 w-4" aria-hidden="true" /></RouterLink>
          </div>
        </div>

        <aside class="border-t-2 border-brand-400 pt-6">
          <h2 class="text-xl">Von der Anfrage zum Termin</h2>
          <ol class="mt-5 space-y-5">
            <li><p class="font-semibold text-white">1. Anliegen und Wunschtermin</p><p class="mt-1 text-sm text-slate-300">Leistung, Fahrzeugmarke und Kontaktdaten genügen für den ersten Kontakt.</p></li>
            <li><p class="font-semibold text-white">2. Prüfung durch die Werkstatt</p><p class="mt-1 text-sm text-slate-300">Eine eingegangene Anfrage reserviert den gewählten Zeitraum bis zur Rückmeldung.</p></li>
            <li><p class="font-semibold text-white">3. Entscheidung per E-Mail</p><p class="mt-1 text-sm text-slate-300">Erst die Bestätigung durch den Betrieb macht Ihren Termin verbindlich.</p></li>
          </ol>
        </aside>
      </div>
    </section>

    <section class="section-container section-spacing">
      <div class="section-title mb-12 max-w-2xl">
        <p class="section-subtitle">Unser Leistungsangebot</p>
        <h2 class="text-3xl font-bold sm:text-4xl">Wartung, Reparatur und Diagnose</h2>
        <p class="mt-4 text-base text-slate-300 sm:text-lg">Die wichtigsten Werkstattleistungen auf einen Blick.</p>
      </div>
      <ServiceGrid :limit="6" />
      <RouterLink to="/leistungen" class="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-300">Alle Leistungen ansehen<ArrowRight class="h-4 w-4" aria-hidden="true" /></RouterLink>
    </section>

    <section class="section-container section-spacing">
      <div class="border-t border-white/10 pt-10">
        <div class="space-y-6">
          <div class="space-y-4">
            <h2 class="text-3xl font-bold sm:text-4xl">Ihr nächster Werkstatttermin</h2>
            <p class="max-w-2xl text-base text-slate-300 sm:text-lg">Senden Sie uns Ihren Terminwunsch oder besprechen Sie Ihr Anliegen telefonisch.</p>
          </div>
          <div class="flex flex-col gap-4 sm:flex-row">
            <RouterLink to="/termin" class="btn-primary w-full sm:w-auto"><CalendarDays class="h-4 w-4" aria-hidden="true" />Termin anfragen</RouterLink>
            <a href="tel:+4917623141582" class="btn-secondary w-full sm:w-auto"><Phone class="h-4 w-4" aria-hidden="true" />Jetzt anrufen</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ArrowRight, CalendarDays, Phone } from 'lucide-vue-next'
import HeroSection from '../components/HeroSection.vue'
import ServiceGrid from '../components/ServiceGrid.vue'
</script>
