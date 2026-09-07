<template>
  <section class="section-container section-spacing py-16 lg:py-24">
    <div class="max-w-4xl space-y-10">
      <div>
        <p class="section-subtitle mb-4">Datenschutz</p>
        <h1 class="text-4xl lg:text-5xl font-bold">Cookies und lokale Speicherung</h1>
      </div>

      <div class="space-y-8 text-slate-300">
        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-white">Welche Technologien verwenden wir?</h2>
          <p>
            Diese Website bindet keine Analyse-, Werbe- oder Social-Media-Trackingdienste ein. Schriftarten werden von derselben Website geladen, nicht von Google Fonts. Deshalb gibt es keinen Auswahl-Dialog für Marketing- oder Analyse-Cookies.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-white">Anmeldung für den Betrieb</h2>
          <p>Nach einer Anmeldung in der internen Terminverwaltung speichert Supabase die Sitzung im lokalen Browserspeicher. Diese Speicherung dient der Authentifizierung und wird nicht für Werbung verwendet. Für eine öffentliche Terminanfrage ist kein Kundenkonto erforderlich.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-white">Speicherdauer</h2>
          <p>Die Anmeldedaten im Browser werden bei der Abmeldung entfernt. Sie können sie auch über die Website-Daten Ihres Browsers löschen. Ein möglicherweise noch vorhandener Eintrag „kfz-cookies-accepted“ aus einer älteren Website-Version wird nicht mehr ausgewertet und kann ebenfalls gelöscht werden.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-xl font-semibold text-white">Weitere Informationen</h2>
          <p>Informationen zu Hosting, Termindaten und Ihren Rechten finden Sie in unserer <RouterLink to="/datenschutz" class="text-brand-300 underline underline-offset-4">Datenschutzerklärung</RouterLink>.</p>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
