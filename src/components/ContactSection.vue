<template>
  <section class="space-y-10 rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-panel backdrop-blur-xl sm:p-12">
    <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div class="space-y-6">
        <div class="inline-flex items-center gap-3 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-brand-200">
          Kontakt
        </div>
        <div class="space-y-4">
          <h2 class="text-3xl font-semibold text-white sm:text-4xl">Schnell, transparent und persönlich.</h2>
          <p class="max-w-2xl text-slate-300">Nutzen Sie unseren direkten Kontaktkanal für Terminwünsche, Rückfragen zum Service oder eine individuelle Beratung rund um Ihr Fahrzeug.</p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div class="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-300">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 12.414m0 0L9.172 8.172m4.242 4.242L9.172 16.657m4.242-4.242L17.657 8.172"></path></svg>
            </div>
            <h3 class="text-base font-semibold text-white">Standort</h3>
            <p class="mt-4 text-sm leading-7 text-slate-300">Musterstraße 12<br />12345 Musterstadt</p>
          </div>
          <div class="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-300">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="text-base font-semibold text-white">Öffnungszeiten</h3>
            <p class="mt-4 text-sm leading-7 text-slate-300">Mo–Fr: 08:00–18:00 Uhr<br />Sa: 09:00–13:00 Uhr</p>
          </div>
          <div class="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-300">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h2l3 7-1 2a1 1 0 001 1h10a1 1 0 001-1l-1-2 3-7h-2"></path></svg>
            </div>
            <h3 class="text-base font-semibold text-white">Telefon</h3>
            <a href="tel:+490123456789" class="mt-4 block text-sm leading-7 text-brand-300">01234 567 890</a>
          </div>
          <div class="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-300">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l9 6 9-6"></path></svg>
            </div>
            <h3 class="text-base font-semibold text-white">E-Mail</h3>
            <a href="mailto:info@kfzserviceakkus.de" class="mt-4 block text-sm leading-7 text-brand-300">info@kfzserviceakkus.de</a>
          </div>
        </div>
      </div>

      <div class="rounded-[32px] border border-white/10 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/30">
        <div class="space-y-4">
          <p class="text-sm uppercase tracking-[0.28em] text-brand-300">Anfrage</p>
          <h3 class="text-2xl font-semibold text-white">Termin anfragen</h3>
          <p class="text-sm leading-7 text-slate-400">Teilen Sie uns Ihr Anliegen mit. Unser Team kümmert sich um ein individuelles Angebot.</p>
        </div>
        <AppointmentForm />
      </div>
    </div>
  </section>
</template>

<script setup>
import AppointmentForm from './AppointmentForm.vue'
</script>
