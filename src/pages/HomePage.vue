<template>
  <div class="space-y-0">
    <HeroSection />

    <section class="section-container section-spacing">
      <div class="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div class="space-y-6 fade-in">
          <div class="section-title">
            <p class="section-subtitle">Über Unsere Werkstatt</p>
            <h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">Warum Kunden uns als zuverlässige Werkstatt wählen</h2>
          </div>
          <p class="text-base leading-relaxed text-slate-300 sm:text-lg">
            KFZ Service Akkus ist ein Meisterbetrieb in Essen mit Fokus auf transparente Kommunikation, saubere Ausführung und einen klaren nächsten Schritt.
          </p>
          <p class="text-base leading-relaxed text-slate-300 sm:text-lg">
            Sie erhalten eine verständliche Einschätzung zu Aufwand, Termin und Reparaturbedarf – ohne unnötige Hürden und ohne übertriebene Versprechen.
          </p>

          <div class="flex flex-wrap gap-3">
            <span class="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-2 text-sm text-brand-100">Schnelle Rückmeldung</span>
            <span class="rounded-full border border-white/15 bg-white/[0.03] px-3 py-2 text-sm text-slate-300">Saubere Arbeitsweise</span>
            <span class="rounded-full border border-white/15 bg-white/[0.03] px-3 py-2 text-sm text-slate-300">Klare Terminplanung</span>
          </div>

          <div class="flex flex-col gap-3 pt-2 sm:flex-row">
            <RouterLink to="/termin" class="btn-primary w-full sm:w-auto">Jetzt Termin anfragen</RouterLink>
            <RouterLink to="/ueber-uns" class="btn-secondary w-full sm:w-auto">Mehr über uns</RouterLink>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 fade-in-up">
          <div class="card-hover p-6 sm:p-8 lg:p-10">
            <div class="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-200">Betrieb</div>
            <div class="mb-3 text-4xl font-bold text-brand-400">Meister</div>
            <p class="mb-2 font-semibold text-white">Kfz-Meisterbetrieb</p>
            <p class="text-slate-400">Geführt von Sefkan Akkus</p>
          </div>
          <div class="card-hover p-6 sm:p-8 lg:p-10">
            <div class="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-200">Seit</div>
            <div class="mb-3 text-4xl font-bold text-brand-400">2022</div>
            <p class="mb-2 font-semibold text-white">Selbstständig</p>
            <p class="text-slate-400">Als Kfz-Meister in Essen</p>
          </div>
          <div class="card-hover p-6 sm:p-8 lg:p-10">
            <div class="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-200">Schwerpunkt</div>
            <div class="mb-3 text-4xl font-bold text-brand-400">Kfz</div>
            <p class="mb-2 font-semibold text-white">Diagnose</p>
            <p class="text-slate-400">Elektronikdiagnosen im Betrieb</p>
          </div>
          <div class="card-hover p-6 sm:p-8 lg:p-10">
            <div class="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-200">Leistung</div>
            <div class="mb-3 text-4xl font-bold text-brand-400">Tuning</div>
            <p class="mb-2 font-semibold text-white">Spezialleistung</p>
            <p class="text-slate-400">Ergänzend zum Werkstattservice</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-container section-spacing">
      <div class="rounded-sm border border-white/15 bg-slate-900/70 p-6 sm:p-8">
        <div class="grid gap-4 lg:grid-cols-4">
          <div class="rounded-sm border border-white/10 bg-white/[0.03] p-5">
            <p class="text-sm font-semibold text-white">Schnelle Rückmeldung</p>
            <p class="mt-2 text-sm leading-relaxed text-slate-400">Anfragen werden zeitnah bearbeitet und verständlich begleitet.</p>
          </div>
          <div class="rounded-sm border border-white/10 bg-white/[0.03] p-5">
            <p class="text-sm font-semibold text-white">Klare Kommunikation</p>
            <p class="mt-2 text-sm leading-relaxed text-slate-400">Sie erhalten einen festen Überblick über Aufwand, Termin und nächsten Schritt.</p>
          </div>
          <div class="rounded-sm border border-white/10 bg-white/[0.03] p-5">
            <p class="text-sm font-semibold text-white">Meisterbetrieb</p>
            <p class="mt-2 text-sm leading-relaxed text-slate-400">Professionelle Werkstattarbeit mit Fokus auf Qualität und Sauberkeit.</p>
          </div>
          <div class="rounded-sm border border-white/10 bg-white/[0.03] p-5">
            <p class="text-sm font-semibold text-white">Pünktliche Umsetzung</p>
            <p class="mt-2 text-sm leading-relaxed text-slate-400">Termine werden zuverlässig geplant und sauber umgesetzt.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-container section-spacing">
      <div class="section-title mb-12 max-w-2xl">
        <p class="section-subtitle">Unser Leistungsangebot</p>
        <h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">Alles aus einer Hand</h2>
        <p class="mt-4 text-base text-slate-300 sm:text-lg">Von Batterie-Check bis Unfallreparatur – wir bieten die komplette Werkstatt-Expertise.</p>
      </div>
      <ServiceGrid />
    </section>

    <section class="section-container section-spacing">
      <div class="rounded-sm border border-white/15 bg-slate-900/70 p-8 sm:p-10 lg:p-12">
        <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div class="space-y-4">
            <p class="section-subtitle">So funktioniert es</p>
            <h2 class="text-3xl font-bold sm:text-4xl">Von der Anfrage bis zur Werkstatt</h2>
            <p class="text-base leading-relaxed text-slate-300 sm:text-lg">
              Wir machen den Weg zu Ihrer Werkstattreise einfach: schnell anfragen, klar beraten und zuverlässig umsetzen.
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-3">
            <div class="rounded-sm border border-brand-500/20 bg-brand-500/10 p-5">
              <p class="text-3xl font-bold text-brand-300">01</p>
              <p class="mt-3 font-semibold text-white">Anfrage senden</p>
              <p class="mt-2 text-sm leading-relaxed text-slate-400">Sie teilen uns Anliegen, Fahrzeug und Wunschzeitpunkt mit.</p>
            </div>
            <div class="rounded-sm border border-white/15 bg-white/[0.03] p-5">
              <p class="text-3xl font-bold text-brand-300">02</p>
              <p class="mt-3 font-semibold text-white">Termin prüfen</p>
              <p class="mt-2 text-sm leading-relaxed text-slate-400">Wir prüfen die Verfügbarkeit und sprechen mit Ihnen die nächsten Schritte ab.</p>
            </div>
            <div class="rounded-sm border border-white/15 bg-white/[0.03] p-5">
              <p class="text-3xl font-bold text-brand-300">03</p>
              <p class="mt-3 font-semibold text-white">Werkstattbesuch</p>
              <p class="mt-2 text-sm leading-relaxed text-slate-400">Ihre Werkstattarbeit wird sauber, klar und termingerecht umgesetzt.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-container section-spacing">
      <div class="rounded-sm border border-white/15 bg-gradient-to-br from-brand-500/10 via-slate-900/70 to-slate-900/90 p-8 sm:p-10 lg:p-12">
        <div class="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div class="space-y-4">
            <p class="section-subtitle">Lokaler Vertrauensfaktor</p>
            <h2 class="text-3xl font-bold sm:text-4xl">Warum Kunden in Essen auf uns vertrauen</h2>
            <p class="text-base leading-relaxed text-slate-300 sm:text-lg">
              Als lokaler Meisterbetrieb verbinden wir regionale Nähe mit professioneller Werkstattarbeit, schneller Kommunikation und klaren Abläufen.
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-sm border border-white/10 bg-slate-950/55 p-5">
              <p class="text-sm font-semibold uppercase tracking-[0.12em] text-brand-200">Regional</p>
              <p class="mt-3 text-lg font-semibold text-white">Vor Ort in Essen</p>
              <p class="mt-2 text-sm leading-relaxed text-slate-400">Nahe an Ihnen, mit persönlicher Beratung und direkter Ansprechpartnerstruktur.</p>
            </div>
            <div class="rounded-sm border border-white/10 bg-slate-950/55 p-5">
              <p class="text-sm font-semibold uppercase tracking-[0.12em] text-brand-200">Qualität</p>
              <p class="mt-3 text-lg font-semibold text-white">Saubere Ausführung</p>
              <p class="mt-2 text-sm leading-relaxed text-slate-400">Jede Arbeit wird sorgfältig, nachvollziehbar und mit Blick auf langfristige Qualität umgesetzt.</p>
            </div>
            <div class="rounded-sm border border-white/10 bg-slate-950/55 p-5">
              <p class="text-sm font-semibold uppercase tracking-[0.12em] text-brand-200">Kommunikation</p>
              <p class="mt-3 text-lg font-semibold text-white">Transparent</p>
              <p class="mt-2 text-sm leading-relaxed text-slate-400">Sie erhalten eine verständliche Einschätzung zu Aufwand, Termin und nächsten Schritten.</p>
            </div>
            <div class="rounded-sm border border-white/10 bg-slate-950/55 p-5">
              <p class="text-sm font-semibold uppercase tracking-[0.12em] text-brand-200">Service</p>
              <p class="mt-3 text-lg font-semibold text-white">Verlässlich</p>
              <p class="mt-2 text-sm leading-relaxed text-slate-400">Wir arbeiten termingerecht und bleiben auch bei Anliegen und Rückfragen ansprechbar.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <TestimonialSection />

    <section class="section-container section-spacing">
      <div class="cta-panel">
        <div class="relative space-y-8 text-center">
          <div class="space-y-4">
            <h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">Jetzt Termin anfragen</h2>
            <p class="mx-auto max-w-2xl text-base text-slate-300 sm:text-lg">Senden Sie Ihre Anfrage mit Wunschtermin. Wir prüfen die Verfügbarkeit und melden uns verbindlich zurück – schnell, transparent und unkompliziert.</p>
          </div>
          <div class="flex flex-col justify-center gap-4 sm:flex-row">
            <RouterLink to="/termin" class="btn-primary w-full sm:w-auto">Termin buchen</RouterLink>
            <a href="tel:+4917623141582" class="btn-secondary w-full sm:w-auto">Jetzt anrufen</a>
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
import TestimonialSection from '../components/TestimonialSection.vue'
</script>
