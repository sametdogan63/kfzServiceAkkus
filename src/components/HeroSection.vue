<template>
  <section class="relative overflow-hidden bg-gradient-hero">
    <div class="section-container section-spacing">
      <div class="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div class="space-y-7 fade-in">
          <div class="inline-flex w-fit items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-2 text-sm font-semibold text-brand-100">
            <BadgeCheck class="h-4 w-4" aria-hidden="true" />
            <span>Meisterbetrieb in Essen</span>
          </div>

          <h1 class="max-w-3xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Werkstattservice mit
            <span class="text-brand-300">klaren Abläufen</span>
            und schneller Hilfe.
          </h1>

          <p class="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
            Inspektion, Wartung, Diagnose und Reparatur – mit transparenter Einschätzung, verlässlicher Kommunikation und einem klaren nächsten Schritt.
          </p>

          <div class="flex flex-col gap-3 pt-1 sm:flex-row">
            <RouterLink to="/termin" class="btn-primary w-full sm:w-auto">
              <CalendarDays class="h-4 w-4" aria-hidden="true" />
              <span>Termin anfragen</span>
              <ArrowRight class="h-4 w-4" aria-hidden="true" />
            </RouterLink>
            <a href="tel:+4917623141582" class="btn-secondary w-full sm:w-auto">
              <Phone class="h-4 w-4" aria-hidden="true" />
              <span>Anrufen</span>
            </a>
          </div>

          <div class="grid gap-3 sm:grid-cols-3">
            <div class="rounded-sm border border-brand-500/35 bg-brand-500/10 p-4">
              <p class="text-sm font-semibold text-white">Schnell erreichbar</p>
              <p class="mt-1 text-sm text-slate-400">Rückmeldung meist innerhalb eines Werktags</p>
            </div>
            <div class="rounded-sm border border-white/15 bg-white/[0.03] p-4">
              <p class="text-sm font-semibold text-white">Meisterbetrieb</p>
              <p class="mt-1 text-sm text-slate-400">Handwerkskammer Düsseldorf</p>
            </div>
            <div class="rounded-sm border border-white/15 bg-white/[0.03] p-4">
              <p class="text-sm font-semibold text-white">Vor Ort in Essen</p>
              <p class="mt-1 text-sm text-slate-400">Klare Terminplanung und Beratung</p>
            </div>
          </div>
        </div>

        <aside class="glass-card fade-in-up p-6 sm:p-8 lg:p-9" style="animation-delay: 0.1s">
          <div class="flex items-center justify-between">
            <h2 class="text-xl text-white sm:text-2xl">So läuft es bei uns</h2>
            <div class="rounded-full border border-brand-400/20 bg-brand-500/10 p-2">
              <BadgeCheck class="h-5 w-5 text-brand-300" aria-hidden="true" />
            </div>
          </div>

          <div class="mt-6 space-y-3">
            <div class="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p class="text-sm font-semibold text-white">1. Anfrage und Termin</p>
              <p class="mt-1 text-sm text-slate-400">Sie senden Ihren Wunschtermin und wir prüfen die Verfügbarkeit.</p>
            </div>
            <div class="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p class="text-sm font-semibold text-white">2. Klare Einschätzung</p>
              <p class="mt-1 text-sm text-slate-400">Sie erhalten eine verständliche Einschätzung von Aufwand und nächsten Schritten.</p>
            </div>
            <div class="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p class="text-sm font-semibold text-white">3. Verlässliche Ausführung</p>
              <p class="mt-1 text-sm text-slate-400">Ihre Werkstattarbeit wird sauber, nachvollziehbar und termingerecht umgesetzt.</p>
            </div>
          </div>

          <div class="mt-6 rounded-lg border-l-2 border-brand-500 bg-brand-500/10 p-4 text-sm text-slate-200">
            Öffnungszeiten: Mo–Fr 08:00–18:00 · Sa 08:00–13:00
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ArrowRight, BadgeCheck, CalendarDays, Phone } from 'lucide-vue-next'
</script>
