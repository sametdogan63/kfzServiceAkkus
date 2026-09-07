<template>
  <section class="relative overflow-hidden border-b border-white/10">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"></div>
      <div class="absolute inset-y-0 right-[14%] hidden w-px bg-white/[0.05] lg:block"></div>
    </div>

    <div class="relative">
      <div class="section-container py-10 sm:py-12 lg:py-16">
        <div class="max-w-4xl">
          <div class="space-y-6 fade-in">
            <div class="flex flex-wrap items-center gap-3">
              <span class="inline-flex items-center gap-2 rounded-lg border border-brand-500/20 bg-brand-500/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-200 sm:text-[11px] sm:tracking-[0.2em]">
                <span class="h-2 w-2 rounded-full bg-brand-500"></span>
                Meisterbetrieb
              </span>
              <span class="text-sm text-slate-300">Essen · Germaniastraße 160</span>
            </div>

            <div class="space-y-5">
              <h1 class="max-w-3xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                KFZ Service Akkus<span class="block text-brand-300">in Essen</span>
              </h1>
              <p class="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
                Ihr Meisterbetrieb für Wartung, Diagnose und Reparatur. Geführt von Kfz-Meister Sefkan Akkus.
              </p>
            </div>

            <div class="flex flex-col gap-4 pt-2 sm:flex-row">
              <RouterLink to="/termin" class="btn-primary w-full sm:w-auto">
                <CalendarDays class="h-4 w-4" aria-hidden="true" />
                <span>Termin anfragen</span>
                <ArrowRight class="h-4 w-4" aria-hidden="true" />
              </RouterLink>
              <a href="tel:+4917623141582" class="btn-secondary w-full sm:w-auto">
                <Phone class="h-4 w-4" aria-hidden="true" />
                <span>Jetzt anrufen</span>
              </a>
            </div>

            <div class="grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div>
                <p class="font-semibold text-white">Montag bis Freitag</p>
                <p class="mt-1 text-sm text-slate-300">08:00–18:00 Uhr</p>
              </div>
              <div>
                <p class="font-semibold text-white">Samstag</p>
                <p class="mt-1 text-sm text-slate-300">08:00–13:00 Uhr</p>
              </div>
              <div>
                <a :href="directionsUrl" class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-300 underline underline-offset-4"><MapPin class="h-4 w-4" aria-hidden="true" />Route planen</a>
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
import { ArrowRight, CalendarDays, MapPin, Phone } from 'lucide-vue-next'
import { directionsUrl } from '../config/businessInfo'
</script>
