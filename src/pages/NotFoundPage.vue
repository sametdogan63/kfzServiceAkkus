<template>
  <section class="section-container section-spacing">
    <p class="section-subtitle">404</p>
    <h1 class="mt-4 text-3xl sm:text-5xl">Seite nicht gefunden</h1>
    <p class="mt-5 max-w-xl text-slate-300">Die aufgerufene Adresse ist nicht verfügbar. Unsere Werkstatt und die Terminanfrage erreichen Sie hier:</p>
    <div class="mt-8 flex flex-wrap gap-4">
      <RouterLink to="/" class="btn-secondary"><Home class="h-4 w-4" aria-hidden="true" />Zur Startseite</RouterLink>
      <RouterLink to="/termin" class="btn-primary"><CalendarDays class="h-4 w-4" aria-hidden="true" />Termin anfragen</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { CalendarDays, Home } from 'lucide-vue-next'
</script>