<template>
  <div class="space-y-0">
    <HeroSection />

    <section class="section-container section-spacing">
      <div class="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div class="space-y-6 fade-in">
          <div class="section-title">
            <p class="section-subtitle">Über Unsere Werkstatt</p>
            <h2 class="text-4xl font-bold lg:text-5xl">Meisterservice fuer Ihr Fahrzeug</h2>
          </div>
          <p class="text-lg leading-relaxed text-slate-300">
            KFZ Service Akkus ist ein Meisterbetrieb in Essen. Wir bieten Inspektionen, Wartungen, Reparaturen, Elektronikdiagnosen und Tuning-Leistungen.
          </p>
          <p class="text-lg leading-relaxed text-slate-300">
            Sefkan Akkus führt den Betrieb seit Anfang 2022 als selbstständiger Kfz-Meister. Saubere und gewissenhafte Arbeiten stehen dabei im Fokus.
          </p>

          <div class="grid gap-4 sm:grid-cols-3">
            <div class="rounded-2xl border border-brand-500/20 bg-brand-500/10 p-4">
              <p class="text-sm font-semibold text-white">Meisterbetrieb</p>
              <p class="mt-1 text-sm text-slate-400">Meistertitel der Handwerkskammer Düsseldorf</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p class="text-sm font-semibold text-white">Diagnose</p>
              <p class="mt-1 text-sm text-slate-400">Elektronikdiagnosen fuer Ihr Fahrzeug</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p class="text-sm font-semibold text-white">Tuning</p>
              <p class="mt-1 text-sm text-slate-400">Spezialisierte Tuning-Leistungen</p>
            </div>
          </div>

          <div class="pt-2">
            <RouterLink to="/ueber-uns" class="btn-primary">Mehr über uns erfahren</RouterLink>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6 lg:gap-8 fade-in-up">
          <div class="card-hover p-8 lg:p-10">
            <div class="mb-3 text-4xl font-bold text-brand-500">Meister</div>
            <p class="mb-2 font-semibold text-white">Kfz-Meisterbetrieb</p>
            <p class="text-slate-400">Geführt von Sefkan Akkus</p>
          </div>
          <div class="card-hover p-8 lg:p-10">
            <div class="mb-3 text-4xl font-bold text-brand-500">2022</div>
            <p class="mb-2 font-semibold text-white">Selbstständig</p>
            <p class="text-slate-400">Als Kfz-Meister in Essen</p>
          </div>
          <div class="card-hover p-8 lg:p-10">
            <div class="mb-3 text-4xl font-bold text-brand-500">Kfz</div>
            <p class="mb-2 font-semibold text-white">Diagnose</p>
            <p class="text-slate-400">Elektronikdiagnosen im Betrieb</p>
          </div>
          <div class="card-hover p-8 lg:p-10">
            <div class="mb-3 text-4xl font-bold text-brand-500">Tuning</div>
            <p class="mb-2 font-semibold text-white">Spezialleistung</p>
            <p class="text-slate-400">Ergänzend zum Werkstattservice</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-container section-spacing">
      <div class="section-title mb-12 max-w-2xl">
        <p class="section-subtitle">Unser Leistungsangebot</p>
        <h2 class="text-4xl font-bold lg:text-5xl">Alles aus einer Hand</h2>
        <p class="mt-4 text-lg text-slate-300">Von Batterie-Check bis Unfallreparatur – wir bieten die komplette Werkstatt-Expertise.</p>
      </div>
      <ServiceGrid />
    </section>

    <section class="section-container section-spacing">
      <div class="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div class="space-y-8">
          <div class="section-title">
            <p class="section-subtitle">Kundenbewertungen</p>
            <h2 class="text-4xl font-bold lg:text-5xl">Vertrauen durch Qualität</h2>
            <p class="mt-4 text-lg text-slate-300">Hunderte zufriedene Kunden vertrauen uns mit ihren Fahrzeugen.</p>
          </div>
          <div class="space-y-6">
            <ReviewCard
              name="Anna K."
              role="Privatkunde"
              rating="5"
              quote="Top Service und sehr freundliches Team. Meine Batterie wurde schnell geprüft und das Fahrzeug war am selben Tag wieder einsatzbereit." />
            <ReviewCard
              name="Flottenmanager"
              role="Autohaus Schmidt"
              rating="4.8"
              quote="Verlässliche Werkstattarbeit, professionelle Diagnose und transparente Preise. Sehr empfehlenswert für unsere Fahrzeugflotte." />
          </div>
          <RouterLink to="/bewertungen" class="btn-secondary inline-flex">
            <span>Alle Bewertungen ansehen</span>
            <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </RouterLink>
        </div>

        <div class="card-base card-hover space-y-8 p-8 lg:p-10">
          <div>
            <p class="section-subtitle mb-3">Partnerschaften</p>
            <p class="text-3xl font-bold text-white">Werkstatt-Partner internationaler Marken</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5 text-center font-semibold text-white transition hover:border-brand-500/30">Michelin</div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5 text-center font-semibold text-white transition hover:border-brand-500/30">Bosch</div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5 text-center font-semibold text-white transition hover:border-brand-500/30">ZF</div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5 text-center font-semibold text-white transition hover:border-brand-500/30">Mahle</div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5 text-center font-semibold text-white transition hover:border-brand-500/30">Castrol</div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-5 text-center font-semibold text-white transition hover:border-brand-500/30">Liqui Moly</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-container section-spacing">
      <div class="relative overflow-hidden rounded-[36px] border border-brand-500/30 bg-gradient-to-br from-brand-600/15 to-brand-500/10 p-12 lg:p-16">
        <div class="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.05)_0%,_transparent_50%)]"></div>
        <div class="relative space-y-8 text-center">
          <div class="space-y-4">
            <h2 class="text-4xl font-bold lg:text-5xl">Bereit für einen Termin?</h2>
            <p class="mx-auto max-w-2xl text-lg text-slate-300">Vereinbaren Sie schnell und einfach einen Termin für Inspektion, Reparatur oder Batterie-Check.</p>
          </div>
          <div class="flex flex-col justify-center gap-4 sm:flex-row">
            <RouterLink to="/termin" class="btn-primary">Termin buchen</RouterLink>
            <RouterLink to="/kontakt" class="btn-secondary">Kontakt aufnehmen</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import HeroSection from '../components/HeroSection.vue'
import ServiceGrid from '../components/ServiceGrid.vue'
import ReviewCard from '../components/ReviewCard.vue'
</script>
