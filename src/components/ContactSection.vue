<template>
  <section class="space-y-10 rounded-[28px] border border-white/10 bg-slate-950/80 p-5 shadow-panel backdrop-blur-xl sm:rounded-[40px] sm:p-8 lg:p-12">
    <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div class="space-y-6">
        <div class="inline-flex items-center gap-3 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-200 sm:text-sm sm:tracking-[0.35em]">
          Kontakt
        </div>
        <div class="space-y-4">
          <h2 class="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">Schnell, transparent und persönlich.</h2>
          <p class="max-w-2xl text-sm text-slate-300 sm:text-base">Nutzen Sie unseren direkten Kontaktkanal für Terminwünsche, Rückfragen zum Service oder eine individuelle Beratung rund um Ihr Fahrzeug.</p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div class="rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-5 sm:rounded-[28px] sm:p-6">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-300">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><circle cx="12" cy="11" r="3" stroke-width="2"></circle></svg>
            </div>
            <h3 class="text-base font-semibold text-white">Standort</h3>
            <p class="mt-4 text-sm leading-7 text-slate-300">Germaniastraße 160<br />45355 Essen</p>
          </div>
          <div class="rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-5 sm:rounded-[28px] sm:p-6">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-300">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="text-base font-semibold text-white">Öffnungszeiten</h3>
            <p class="mt-4 text-sm leading-7 text-slate-300">Mo–Fr: 08:00–18:00 Uhr<br />Sa: 08:00–13:00 Uhr<br />So: geschlossen</p>
          </div>
          <div class="rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-5 sm:rounded-[28px] sm:p-6">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-300">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.684l1.1 3.3a1 1 0 01-.24 1.02L7.7 9.3a16 16 0 007 7l1.296-1.39a1 1 0 011.02-.24l3.3 1.1a1 1 0 01.684.95V19a2 2 0 01-2 2h-1C8.716 21 3 15.284 3 8V5z"></path></svg>
            </div>
            <h3 class="text-base font-semibold text-white">Telefon</h3>
            <a href="tel:+4917623141582" class="mt-4 block text-sm leading-7 text-brand-300">+49 176 23141582</a>
          </div>
          <div class="rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-5 sm:rounded-[28px] sm:p-6">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-300">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 8l-10 6L2 8"></path></svg>
            </div>
            <h3 class="text-base font-semibold text-white">E-Mail</h3>
            <a href="mailto:service@kfz-akkus.de" class="mt-4 block break-all text-sm leading-7 text-brand-300">service@kfz-akkus.de</a>
          </div>
        </div>
      </div>

      <aside class="border-t-2 border-brand-500 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/30 sm:p-8 lg:sticky lg:top-28">
        <div class="space-y-5">
          <p class="text-sm uppercase tracking-[0.2em] text-brand-300">Direkter Weg</p>
          <h3 class="text-2xl font-semibold text-white">Wann passt es Ihnen?</h3>
            <p class="text-sm leading-7 text-slate-400">Wählen Sie online Leistung und Wunschtermin. Der Betrieb prüft die Anfrage und bestätigt sie per E-Mail.</p>
          <RouterLink to="/termin" class="btn-primary w-full">Termin anfragen</RouterLink>
          <a href="tel:+4917623141582" class="btn-secondary w-full">Direkt anrufen</a>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
