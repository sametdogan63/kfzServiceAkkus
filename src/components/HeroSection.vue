<template>
  <section class="relative overflow-hidden bg-gradient-hero">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl"></div>
      <div class="absolute bottom-0 -left-20 h-80 w-80 rounded-full bg-brand-600/5 blur-3xl"></div>
      <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"></div>
    </div>

    <div class="relative">
      <div class="section-container section-spacing">
        <div class="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div class="space-y-8 fade-in">
            <div class="flex flex-wrap items-center gap-3">
              <span class="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-200">
                <span class="h-2 w-2 rounded-full bg-brand-500"></span>
                Premium Werkstatt-Partner
              </span>
              <span class="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-300">
                24/7 Beratung
              </span>
            </div>

            <div class="space-y-5">
              <h1 class="max-w-3xl text-5xl font-bold tracking-tight text-white lg:text-6xl">
                Werkstattkompetenz,
                <br />
                <span class="text-gradient">die Ihr Fahrzeug wirklich schützt</span>
              </h1>
              <p class="max-w-2xl text-lg leading-relaxed text-slate-300 lg:text-xl">
                Von der schnellen Diagnose bis zur professionellen Instandsetzung – wir verbinden hochwertige Technik, klare Kommunikation und moderne Service-Qualität in einem Erlebnis.
              </p>
            </div>

            <div class="flex flex-col gap-4 pt-2 sm:flex-row">
              <RouterLink to="/termin" class="btn-primary">
                <span>Termin vereinbaren</span>
                <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </RouterLink>
              <a href="tel:+49123456789" class="btn-secondary">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 11c-.54-3.56-2.85-6.55-5.80-8.07-3.06-1.63-6.94-1.63-10 0-2.95 1.52-5.26 4.51-5.80 8.07-.07.47-.07.93 0 1.4.54 3.56 2.85 6.55 5.80 8.07 1.53.82 3.25 1.23 5 1.23s3.47-.41 5-1.23c2.95-1.52 5.26-4.51 5.80-8.07.07-.47.07-.93 0-1.4zM13 16h-2v-2h2v2zm0-4h-2V8h2v4z"></path></svg>
                <span class="ml-2">Jetzt anrufen</span>
              </a>
            </div>

            <div class="grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
              <div>
                <p class="text-3xl font-bold text-white">20+</p>
                <p class="mt-1 text-sm text-slate-400">Jahre Erfahrung</p>
              </div>
              <div>
                <p class="text-3xl font-bold text-white">95%</p>
                <p class="mt-1 text-sm text-slate-400">Zufriedenheit</p>
              </div>
              <div>
                <p class="text-3xl font-bold text-white">24h</p>
                <p class="mt-1 text-sm text-slate-400">Kurzantwort</p>
              </div>
            </div>
          </div>

          <div class="relative fade-in-up" style="animation-delay: 0.15s">
            <div class="glass-card relative overflow-hidden rounded-[32px] p-8 lg:p-10">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-600/20 via-transparent to-brand-500/10"></div>
              <div class="relative space-y-6">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="section-subtitle mb-2">Heute verfügbar</p>
                    <h3 class="text-2xl font-semibold text-white">Schnell, präzise, transparent</h3>
                  </div>
                  <div class="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-500/30 bg-brand-500/15 text-brand-300">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                </div>

                <div class="grid gap-3 sm:grid-cols-2">
                  <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p class="text-sm font-semibold text-white">Batterie-Service</p>
                    <p class="mt-1 text-sm text-slate-400">Schnell geprüft und sicher ersetzt</p>
                  </div>
                  <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p class="text-sm font-semibold text-white">Diagnose</p>
                    <p class="mt-1 text-sm text-slate-400">Moderne Fehlersuche inkl. Auswertung</p>
                  </div>
                </div>

                <div class="rounded-[28px] border border-brand-500/20 bg-brand-500/10 p-5">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/20 text-brand-300">
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <p class="font-semibold text-white">Garantierte Qualität</p>
                      <p class="text-sm text-slate-300">Saubere Arbeit, klare Preise und zuverlässige Abwicklung.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
