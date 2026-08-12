<template>
  <section class="section-container section-spacing">
    <div class="rounded-sm border border-white/15 bg-slate-900/70 p-8 sm:p-10 lg:p-12">
      <div class="max-w-3xl space-y-4">
        <p class="section-subtitle">Echte Kundenbewertungen</p>
        <h2 class="text-3xl font-bold sm:text-4xl">Was Kunden uüber uns sagen</h2>
        <p class="text-base text-slate-300 sm:text-lg">
          Echte Rezensionen von Google – ungefiltert und direkt von unseren Kunden.
        </p>
      </div>

      <div class="mt-8 flex flex-col gap-4 sm:flex-row">
        <a
          href="https://www.google.com/search?client=opera-gx&hs=lGN&sca_esv=fd80582d8fba4559&sxsrf=APpeQnuInEUB5mKTvo6TNNaOv9L-yAnPOA:1786099900586&q=Kfz+Service+Akkus+Rezensionen&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2NTc1NjQ1sTA3NzE3NDG3NLU038DI-IpR1jutSiE4tagsMzlVwTE7u7RYISi1KjWvODM_LzVvESt-eQDyFPDVWgAAAA&rldimm=5753154877471479597&tbm=lcl&hl=de-DE&sa=X&ved=2ahUKEwi5_e3QrI6WAxU0RPEDHWemMj0Q9fQKegQILRAG&biw=1878&bih=923&dpr=1"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary w-full sm:w-auto"
        >
          Alle Google-Rezensionen ansehen
        </a>
        <RouterLink to="/termin" class="btn-secondary w-full sm:w-auto">
          Termin anfragen
        </RouterLink>
      </div>

      <div class="mt-8 grid gap-4 lg:grid-cols-3">
        <div class="rounded-sm border border-brand-500/20 bg-brand-500/10 p-5">
          <div class="flex items-center gap-1 text-amber-400">
            <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          </div>
          <p class="mt-3 text-sm leading-relaxed text-slate-300">
            „Ich war heute zum ersten Mal in der Werkstatt und bin wirklich positiv überrascht. Super nettes Team, total ehrlich und hilfsbereit – man fühlt sich direkt gut aufgehoben. Alles wurde ruhig und verständlich erklärt, ohne Druck oder Fachchinesisch. Die Reparatur ging schnell, der Preis war fair. Keine Abzocke, keine leeren Versprechen – einfach ehrliche Arbeit. So eine Werkstatt findet man nicht oft.“
          </p>
          <p class="mt-4 text-xs font-semibold text-slate-500">Google-Rezension</p>
        </div>
        <div class="rounded-sm border border-white/10 bg-white/[0.03] p-5">
          <div class="flex items-center gap-1 text-amber-400">
            <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          </div>
          <p class="mt-3 text-sm leading-relaxed text-slate-300">
            „Ich habe mein Auto bereits mehrmals für sowohl kleinere als auch größere Reparaturen hierhergebracht. Zuletzt war es für den Einbau einer neuen Kupplung. Für eine Beratung nehmen sie sich auch immer Zeit. Die Jungs sind sehr ehrlich & arbeiten sauber und zügig. Ich kann die Werkstatt guten Gewissens jedem weiterempfehlen!“
          </p>
          <p class="mt-4 text-xs font-semibold text-slate-500">Google-Rezension</p>
        </div>
        <div class="rounded-sm border border-white/10 bg-white/[0.03] p-5">
          <div class="flex items-center gap-1 text-amber-400">
            <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          </div>
          <p class="mt-3 text-sm leading-relaxed text-slate-300">
            „Wer eine zuverlässige und preisgünstige Werkstatt sucht, braucht bei Akkus nicht zu zögern. Obwohl es sehr voll war, wurde mein Unfallauto super freundlich entgegengenommen und war in unter zwei Tagen fertiggestellt. Alle Reparaturen wurden sorgfältig durchgeführt – zu einem unschlagbaren Preis.“
          </p>
          <p class="mt-4 text-xs font-semibold text-slate-500">Google-Rezension</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
