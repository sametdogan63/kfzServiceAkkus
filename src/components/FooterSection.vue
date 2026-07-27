<template>
  <footer class="border-t border-white/10 bg-slate-950/90 px-6 py-16 text-slate-300 sm:px-12">
    <div class="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[1.2fr_1fr_1fr_1fr]">
      <div class="space-y-5">
        <div class="inline-flex items-center gap-3 rounded-3xl border border-brand-500/20 bg-brand-600/10 px-4 py-2 text-sm font-semibold text-brand-100">
          <span class="h-2.5 w-2.5 rounded-full bg-brand-500"></span>
          KFZ Service Akkus
        </div>
        <p class="max-w-sm leading-7 text-slate-400">Meisterservice, Wartung, Reparatur, Diagnose und Tuning-Leistungen in Essen.</p>
      </div>

      <div>
        <h3 class="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Leistungen</h3>
        <ul class="mt-6 space-y-3 text-sm leading-7 text-slate-300">
          <li>Inspektion &amp; Wartung</li>
          <li>Reparatur &amp; Diagnose</li>
          <li>Reifen- &amp; Klimaservice</li>
          <li>Tuning-Beratung</li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Kontakt</h3>
        <ul class="mt-6 space-y-3 text-sm leading-7 text-slate-300">
          <li>Tel: <a href="tel:+4917623141582" class="text-white transition hover:text-brand-400">+49 176 23141582</a></li>
          <li><a href="mailto:service@kfz-akkus.de" class="text-white transition hover:text-brand-400">service@kfz-akkus.de</a></li>
          <li>Germaniastraße 160<br />45355 Essen</li>
          <li>Mo–Fr 08:00–18:00<br />Sa 08:00–13:00</li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Schnelle Links</h3>
        <ul class="mt-6 space-y-3 text-sm leading-7 text-slate-300">
          <li><RouterLink to="/leistungen" class="transition hover:text-brand-400">Unsere Leistungen</RouterLink></li>
          <li><RouterLink to="/ueber-uns" class="transition hover:text-brand-400">Über uns</RouterLink></li>
          <li><RouterLink to="/termin" class="transition hover:text-brand-400">Termin buchen</RouterLink></li>
          <li><RouterLink to="/kontakt" class="transition hover:text-brand-400">Kontakt</RouterLink></li>
        </ul>
      </div>
    </div>

    <div class="mt-12 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex sm:items-center sm:justify-between">
      <p>© 2026 Kfz-Service Akkus. Alle Rechte vorbehalten.</p>
      <div class="mt-4 flex flex-wrap gap-x-5 gap-y-2 sm:mt-0">
        <RouterLink to="/impressum" class="transition hover:text-brand-400">Impressum</RouterLink>
        <RouterLink to="/datenschutz" class="transition hover:text-brand-400">Datenschutz</RouterLink>
        <RouterLink to="/cookies" class="transition hover:text-brand-400">Cookies</RouterLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
