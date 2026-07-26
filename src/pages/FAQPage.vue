<template>
  <div class="space-y-0">
    <!-- Header Section -->
    <section class="section-container section-spacing py-16 lg:py-24">
      <div class="max-w-4xl">
        <p class="section-subtitle mb-4">Häufig gestellte Fragen</p>
        <h1 class="text-5xl lg:text-6xl font-bold mb-6">Antworten auf Ihre Fragen</h1>
        <p class="text-xl text-slate-300 leading-relaxed">Wir beantworten hier die häufigsten Fragen zu Abläufen, Leistungen und Service. Für weitere Informationen kontaktieren Sie uns gerne direkt.</p>
      </div>
    </section>

    <!-- FAQ Accordion -->
    <section class="section-container section-spacing max-w-4xl">
      <FAQAccordion :items="faqItems" />
    </section>

    <!-- CTA Section -->
    <section class="section-container section-spacing">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600/15 to-brand-500/10 border border-brand-500/30 p-12 lg:p-16">
        <div class="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.05)_0%,_transparent_50%)]"></div>
        <div class="relative text-center space-y-8">
          <div class="space-y-4">
            <h2 class="text-4xl lg:text-5xl font-bold">Fragen, die wir nicht beantwortet haben?</h2>
            <p class="text-lg text-slate-300 max-w-2xl mx-auto">Kontaktieren Sie uns direkt – wir helfen schnell und zuverlässig weiter.</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink to="/kontakt" class="btn-primary">Kontakt aufnehmen</RouterLink>
            <RouterLink to="/termin" class="btn-secondary">Termin vereinbaren</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import FAQAccordion from '../components/FAQAccordion.vue'

const faqItems = [
  {
    question: 'Wie schnell kann ich einen Termin bekommen?',
    answer: 'Wir bieten in der Regel Termine innerhalb weniger Tage an. Bei dringenden Fällen helfen wir nach Verfügbarkeit schneller weiter. Nutzen Sie unsere Online-Terminbuchung oder rufen Sie uns direkt an.'
  },
  {
    question: 'Welche Leistungen bieten Sie für den Reifenwechsel an?',
    answer: 'Neben dem Reifenwechsel führen wir Reifenmontage, Auswuchten und Einlagerung durch. Ihr Fahrzeug wird auf Wunsch komplett geprüft. Wir arbeiten mit hochwertigen Reifen namhafter Hersteller.'
  },
  {
    question: 'Bieten Sie eine Mobilitätsgarantie oder Pannenservice an?',
    answer: 'Ja, wir unterstützen Sie bei Mobilitätslösungen und können bei Bedarf auch einen Leihwagen oder Pannenservice vermitteln. Sprechen Sie uns auf diese Services an.'
  },
  {
    question: 'Wie läuft der Batterie-Service ab?',
    answer: 'Wir prüfen Batterie, Lichtmaschine und Starter, entfernen Fehlerquellen und empfehlen bei Bedarf den passenden Austausch. Neue Batterien werden professionell installed.'
  },
  {
    question: 'Wie wird mein Fahrzeug nach der Reparatur geprüft?',
    answer: 'Nach jeder Reparatur führen wir eine umfassende Qualitätskontrolle durch, damit Ihr Fahrzeug sicher und einsatzbereit zurückkommt. Alle arbeiten sind garantiert.'
  },
  {
    question: 'Wie lange dauert eine typische Inspektion?',
    answer: 'Eine Standard-Inspektion dauert ca. 1-2 Stunden. Größere Reparaturen können länger dauern. Wir informieren Sie immer vorher über den zeitlichen Rahmen.'
  },
  {
    question: 'Akzeptieren Sie auch online Terminbuchung?',
    answer: 'Ja, Sie können Termine jederzeit über unsere Website buchen. Sie erhalten sofort eine Bestätigung, und wir melden uns innerhalb eines Werktages telefonisch bei Ihnen.'
  },
  {
    question: 'Welche Zahlungsarten akzeptieren Sie?',
    answer: 'Wir akzeptieren Bargeld, Überweisung, EC-Karte und Kreditkarte. Sprechen Sie uns am besten vor der Reparatur an, wenn Sie eine spezielle Zahlungsart benötigen.'
  }
]
</script>
