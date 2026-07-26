<template>
  <div class="space-y-0">
    <!-- Header Section -->
    <section class="section-container section-spacing py-16 lg:py-24">
      <div class="max-w-4xl">
        <p class="section-subtitle mb-4">Online Buchung</p>
        <h1 class="text-5xl lg:text-6xl font-bold mb-6">Termin vereinbaren</h1>
        <p class="text-xl text-slate-300 leading-relaxed">Buchen Sie schnell und unkompliziert einen Termin für Inspektion, Reparatur oder Batterie-Check. Wir bestätigen Ihren Wunschtermin innerhalb eines Werktages.</p>
      </div>
    </section>

    <!-- Appointment Form -->
    <section class="section-container section-spacing">
      <div class="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <AppointmentForm />
        <div class="space-y-8">
          <div class="card-base card-hover p-10 lg:p-12">
            <h3 class="text-2xl font-bold text-white mb-6">Terminbuchung erklärt</h3>
            <div class="space-y-5">
              <div class="flex gap-4">
                <div class="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-400 font-semibold text-sm">1</div>
                <div>
                  <p class="font-semibold text-white">Formular ausfüllen</p>
                  <p class="text-sm text-slate-400 mt-1">Geben Sie Fahrzeugdaten und Anliegen an</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-400 font-semibold text-sm">2</div>
                <div>
                  <p class="font-semibold text-white">Bestätigung per E-Mail</p>
                  <p class="text-sm text-slate-400 mt-1">Sie erhalten eine sofortige Buchungsbestätigung</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-400 font-semibold text-sm">3</div>
                <div>
                  <p class="font-semibold text-white">Wir melden uns</p>
                  <p class="text-sm text-slate-400 mt-1">Telefonische Bestätigung und zeitliche Abstimmung</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-400 font-semibold text-sm">4</div>
                <div>
                  <p class="font-semibold text-white">Termin wahrgenommen</p>
                  <p class="text-sm text-slate-400 mt-1">Schnelle, professionelle Werkstattarbeit</p>
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
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import AppointmentForm from '../components/AppointmentForm.vue'
</script>
