<template>
  <section class="space-y-10">
    <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div class="space-y-6">
        <div class="space-y-4">
          <h2 class="text-2xl font-semibold text-white sm:text-3xl">KFZ Service Akkus in Essen</h2>
          <p class="max-w-2xl text-base text-slate-300">Für Rückfragen zu Ihrem Fahrzeug oder einem Termin erreichen Sie uns telefonisch und per E-Mail.</p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div class="border-t border-white/10 py-5">
            <MapPin class="mb-4 h-6 w-6 text-brand-300" aria-hidden="true" />
            <h3 class="text-base font-semibold text-white">Standort</h3>
            <address class="mt-3 text-base not-italic leading-7 text-slate-300">{{ businessInfo.street }}<br />{{ businessInfo.postalCode }} {{ businessInfo.city }}</address>
            <a :href="directionsUrl" class="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-300 underline underline-offset-4"><Navigation class="h-4 w-4" aria-hidden="true" />Route planen</a>
          </div>
          <div class="border-t border-white/10 py-5">
            <Clock class="mb-4 h-6 w-6 text-brand-300" aria-hidden="true" />
            <h3 class="text-base font-semibold text-white">Öffnungszeiten</h3>
            <dl class="mt-3 space-y-2 text-sm text-slate-300"><div v-for="hours in businessInfo.openingHours" :key="hours.label" class="flex flex-wrap justify-between gap-x-4"><dt>{{ hours.label }}</dt><dd>{{ hours.time }}</dd></div><div class="flex flex-wrap justify-between gap-x-4"><dt>So</dt><dd>geschlossen</dd></div></dl>
          </div>
          <div class="border-t border-white/10 py-5">
            <Phone class="mb-4 h-6 w-6 text-brand-300" aria-hidden="true" />
            <h3 class="text-base font-semibold text-white">Telefon</h3>
            <a :href="businessInfo.telephoneHref" class="mt-2 inline-flex min-h-11 items-center text-base text-brand-300 underline underline-offset-4">{{ businessInfo.telephone }}</a>
          </div>
          <div class="border-t border-white/10 py-5">
            <Mail class="mb-4 h-6 w-6 text-brand-300" aria-hidden="true" />
            <h3 class="text-base font-semibold text-white">E-Mail</h3>
            <a :href="`mailto:${businessInfo.email}`" class="mt-2 inline-flex min-h-11 items-center break-all text-base text-brand-300 underline underline-offset-4">{{ businessInfo.email }}</a>
          </div>
        </div>
      </div>

      <aside class="border-t-2 border-brand-500 pt-6 lg:sticky lg:top-28">
        <div class="space-y-5">
          <p class="text-sm uppercase tracking-[0.2em] text-brand-300">Direkter Weg</p>
          <h3 class="text-2xl font-semibold text-white">Wann passt es Ihnen?</h3>
            <p class="text-sm leading-7 text-slate-400">Wählen Sie online Leistung und Wunschtermin. Der Betrieb prüft die Anfrage und bestätigt sie per E-Mail.</p>
          <RouterLink to="/termin" class="btn-primary w-full"><CalendarDays class="h-4 w-4" aria-hidden="true" />Termin anfragen</RouterLink>
          <a :href="businessInfo.telephoneHref" class="btn-secondary w-full"><Phone class="h-4 w-4" aria-hidden="true" />Direkt anrufen</a>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { CalendarDays, Clock, Mail, MapPin, Navigation, Phone } from 'lucide-vue-next'
import { businessInfo, directionsUrl } from '../config/businessInfo'
</script>
