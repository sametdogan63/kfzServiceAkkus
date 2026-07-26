<template>
  <section class="relative overflow-hidden bg-gradient-hero">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"></div>
      <div class="absolute inset-y-0 right-[14%] hidden w-px bg-white/[0.05] lg:block"></div>
    </div>

    <div class="relative">
      <div class="section-container section-spacing">
        <div class="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div class="space-y-8 fade-in">
            <div class="flex flex-wrap items-center gap-3">
              <span class="inline-flex items-center gap-2 rounded-lg border border-brand-500/20 bg-brand-500/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-200">
                <span class="h-2 w-2 rounded-full bg-brand-500"></span>
                Meisterbetrieb
              </span>
              <span class="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-300">
                Transparente Planung
              </span>
            </div>

            <div class="space-y-5">
              <h1 class="max-w-3xl text-5xl text-white lg:text-6xl">
                Die Werkstatt fuer
                <br />
                <span class="text-gradient">klare Entscheidungen.</span>
              </h1>
              <p class="max-w-2xl text-lg leading-relaxed text-slate-300 lg:text-xl">
                Wartung, Diagnose und Reparatur mit nachvollziehbarer Beratung, verbindlichen Abläufen und moderner Fahrzeugtechnik.
              </p>
            </div>

            <div class="flex flex-col gap-4 pt-2 sm:flex-row">
              <RouterLink to="/termin" class="btn-primary">
                <CalendarDays class="h-4 w-4" aria-hidden="true" />
                <span>Termin vereinbaren</span>
                <ArrowRight class="h-4 w-4" aria-hidden="true" />
              </RouterLink>
              <a href="tel:+49123456789" class="btn-secondary">
                <Phone class="h-4 w-4" aria-hidden="true" />
                <span>Jetzt anrufen</span>
              </a>
            </div>

            <div class="grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
              <div>
                <p class="text-2xl font-bold text-white">20+</p>
                <p class="mt-1 text-sm text-slate-400">Jahre Erfahrung</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-white">Digital</p>
                <p class="mt-1 text-sm text-slate-400">Termin-Anfrage</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-white">Klar</p>
                <p class="mt-1 text-sm text-slate-400">Serviceablauf</p>
              </div>
            </div>
          </div>

          <div class="relative fade-in-up" style="animation-delay: 0.15s">
            <div class="glass-card relative overflow-hidden p-8 lg:p-10">
              <div class="absolute inset-x-0 top-0 h-1 bg-brand-500"></div>
              <div class="relative space-y-6">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="section-subtitle mb-2">Heute verfügbar</p>
                    <h3 class="text-2xl font-semibold text-white">Schnell, präzise, transparent</h3>
                  </div>
                  <div class="flex h-12 w-12 items-center justify-center rounded-lg border border-brand-500/30 bg-brand-500/15 text-brand-300">
                    <BadgeCheck class="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>

                <div class="grid gap-3 sm:grid-cols-2">
                  <div class="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-sm font-semibold text-white">Batterie-Service</p>
                    <p class="mt-1 text-sm text-slate-400">Schnell geprüft und sicher ersetzt</p>
                  </div>
                  <div class="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-sm font-semibold text-white">Diagnose</p>
                    <p class="mt-1 text-sm text-slate-400">Moderne Fehlersuche inkl. Auswertung</p>
                  </div>
                </div>

                <div class="border-l-2 border-brand-400 bg-brand-500/10 p-5">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/20 text-brand-300">
                      <Check class="h-5 w-5" aria-hidden="true" />
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
import { ArrowRight, BadgeCheck, CalendarDays, Check, Phone } from 'lucide-vue-next'
</script>
