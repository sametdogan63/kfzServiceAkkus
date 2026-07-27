<template>
  <div class="space-y-0">
    <!-- Header Section -->
    <section class="section-container section-spacing py-16 lg:py-24">
      <div class="max-w-4xl">
        <p class="section-subtitle mb-4">Kundenfeedback</p>
        <h1 class="text-5xl lg:text-6xl font-bold text-white mb-6">Ihre Erfahrung ist uns wichtig</h1>
        <p class="text-lg lg:text-xl text-slate-300 leading-relaxed">Wir veröffentlichen nur Rückmeldungen, die uns tatsächlich vorliegen und dafür freigegeben wurden.</p>
      </div>
    </section>

    <!-- Reviews Grid Section -->
    <section class="section-container section-spacing">
      <div class="border-t-2 border-brand-500 bg-brand-500/10 p-8 lg:p-10">
        <h2 class="text-2xl font-semibold text-white">Feedback geben</h2>
        <p class="mt-3 max-w-2xl leading-7 text-slate-300">Haben Sie unseren Service genutzt? Senden Sie uns Ihre Rückmeldung per E-Mail. So helfen Sie uns, unseren Service weiterzuentwickeln.</p>
        <a href="mailto:service@kfz-akkus.de?subject=R%C3%BCckmeldung%20zu%20KFZ%20Service%20Akkus" class="btn-primary mt-6">Feedback per E-Mail senden</a>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-container section-spacing">
      <div class="rounded-3xl bg-gradient-to-r from-brand-600/15 to-brand-500/10 border border-brand-500/30 p-12 lg:p-16 text-center">
        <h2 class="text-4xl lg:text-5xl font-bold text-white mb-4">Einen Termin anfragen</h2>
        <p class="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">Wählen Sie online eine Leistung und einen passenden Terminwunsch aus.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/termin" class="btn-primary">Termin buchen</RouterLink>
          <RouterLink to="/kontakt" class="btn-secondary">Kontakt aufnehmen</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
