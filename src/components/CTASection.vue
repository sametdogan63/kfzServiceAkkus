<template>
  <section class="section-container px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
    <div class="relative overflow-hidden rounded-[36px] border border-brand-500/30 bg-gradient-to-br from-brand-600/15 via-slate-900/80 to-brand-500/10 p-8 shadow-panel sm:p-10 lg:p-12">
      <div class="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.06)_0%,_transparent_55%)]"></div>
      <div class="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div class="max-w-2xl space-y-4 text-center lg:text-left">
          <p class="text-sm uppercase tracking-[0.35em] text-brand-200/80">Bereit für sorgenfreie Mobilität?</p>
          <h2 class="text-3xl font-semibold leading-tight text-white sm:text-4xl">Jetzt Premium-Service anfragen</h2>
          <p class="text-sm leading-7 text-slate-300 sm:text-base">Buchen Sie schnell und einfach Ihren Termin für Inspektion, Reparatur oder Batteriecheck – mit klarer Kommunikation und modernem Serviceverständnis.</p>
        </div>
        <div class="flex flex-col gap-4 sm:min-w-[260px] sm:flex-row lg:flex-col lg:items-stretch">
          <RouterLink to="/termin" class="btn-primary">Termin vereinbaren</RouterLink>
          <RouterLink to="/kontakt" class="btn-secondary">Kontakt aufnehmen</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
