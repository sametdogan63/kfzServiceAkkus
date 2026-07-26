<template>
  <section class="section-container section-spacing py-16 lg:py-24">
    <div class="max-w-4xl space-y-10">
      <div>
        <p class="section-subtitle mb-4">Cookie-Einstellungen</p>
        <h1 class="text-4xl lg:text-5xl font-bold">Cookie-Richtlinie</h1>
      </div>

      <div class="card-base space-y-8 p-6 text-slate-300 lg:p-10">
        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-white">Welche Technologien verwenden wir?</h2>
          <p>
            Aktuell speichert diese Website Ihre Auswahl im Cookie-Hinweis lokal in Ihrem Browser. Es werden derzeit keine Analyse-, Werbe- oder Social-Media-Tracking-Cookies eingebunden.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-white">Ihre Auswahl aendern</h2>
          <p>Sie koennen Ihre gespeicherte Cookie-Entscheidung jederzeit zuruecksetzen. Danach wird der Hinweis erneut angezeigt.</p>
          <button type="button" class="btn-secondary" @click="resetCookieChoice">Cookie-Auswahl zuruecksetzen</button>
          <p v-if="message" class="text-sm text-emerald-300">{{ message }}</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-white">Speicherdauer</h2>
          <p>Die Auswahl bleibt in Ihrem Browser gespeichert, bis Sie sie zuruecksetzen oder die lokalen Browserdaten loeschen.</p>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')

const resetCookieChoice = () => {
  localStorage.removeItem('kfz-cookies-accepted')
  message.value = 'Ihre Cookie-Auswahl wurde zurueckgesetzt.'
}
</script>
