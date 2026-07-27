<template>
  <div class="space-y-0">
    <!-- Header Section -->
    <section class="section-container section-spacing py-16 lg:py-24">
      <div class="max-w-4xl">
        <p class="section-subtitle mb-4">Online Buchung</p>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Termin vereinbaren</h1>
        <p class="text-base sm:text-xl text-slate-300 leading-relaxed">Senden Sie Ihre Anfrage mit Leistung und Wunschtermin. Der Betrieb prüft die Verfügbarkeit und bestätigt Ihren Termin per E-Mail.</p>
      </div>
    </section>

    <!-- Appointment Form -->
    <section class="section-container section-spacing">
      <div class="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <AppointmentForm />
        <aside class="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <div class="card-base p-6 sm:p-8 lg:p-10">
            <h3 class="text-xl sm:text-2xl font-bold text-white mb-6">So funktioniert die Anfrage</h3>
            <div class="space-y-5">
              <div class="flex gap-4">
                <div class="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-400 font-semibold text-sm">1</div>
                <div>
                  <p class="font-semibold text-white">Leistung und Slot auswaehlen</p>
                  <p class="text-sm text-slate-400 mt-1">Geben Sie Fahrzeugdaten und Ihr Anliegen an</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-400 font-semibold text-sm">2</div>
                <div>
                  <p class="font-semibold text-white">Anfrage absenden</p>
                  <p class="text-sm text-slate-400 mt-1">Ihr Wunschtermin ist noch nicht verbindlich</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-400 font-semibold text-sm">3</div>
                <div>
                  <p class="font-semibold text-white">Betrieb prueft die Anfrage</p>
                  <p class="text-sm text-slate-400 mt-1">Wir bestätigen oder schlagen eine Alternative vor</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-400 font-semibold text-sm">4</div>
                <div>
                  <p class="font-semibold text-white">Bestätigung per E-Mail</p>
                  <p class="text-sm text-slate-400 mt-1">Danach ist Ihr Termin verbindlich</p>
                </div>
              </div>
            </div>

            <div class="mt-8 pt-8 border-t border-white/10 space-y-4">
              <p class="section-subtitle">Unser Versprechen</p>
              <ul class="space-y-2 text-slate-300">
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  <span>Termin innerhalb weniger Tage</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  <span>Transparent und verlässlich</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  <span>Meisterqualität garantiert</span>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup>
import AppointmentForm from '../components/AppointmentForm.vue'
</script>
