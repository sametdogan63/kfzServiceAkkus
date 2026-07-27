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
    question: 'Wie funktioniert die Termin-Anfrage?',
    answer: 'Wählen Sie online eine Leistung, einen Tag und eine Uhrzeit aus. Mit dem Absenden wird der Zeitraum reserviert. Der Betrieb prüft Ihre Anfrage und informiert Sie anschließend per E-Mail über die Bestätigung, eine Verschiebung oder eine Ablehnung.'
  },
  {
    question: 'Welche Werkstattleistungen bieten Sie an?',
    answer: 'Zum Angebot gehören Inspektionen, Wartungen, Reparaturen, Fahrzeug- und Elektronikdiagnosen, Reifenwechsel, Klima- und Ölservice, Abgasuntersuchungen, Karosserieinstandsetzung, Fahrzeugpflege, Flottenbetreuung und Mobilitätsservices.'
  },
  {
    question: 'Bieten Sie auch Tuning an?',
    answer: 'Ja. Zum Tuning-Angebot gehören Chiptuning, Softwareoptimierungen und Motor-Tuning-Module. Vor jeder Leistung erfolgt eine individuelle Prüfung des Fahrzeugs und des rechtlich zulässigen Einsatzbereichs.'
  },
  {
    question: 'Ist meine Anfrage sofort verbindlich?',
    answer: 'Der gewählte Zeitraum wird nach dem Absenden reserviert. Verbindlich wird der Termin erst, wenn der Betrieb ihn bestätigt. Sie erhalten dazu eine Rückmeldung per E-Mail.'
  },
  {
    question: 'Was passiert, wenn ein Termin nicht bestätigt werden kann?',
    answer: 'Der Betrieb kann die Anfrage ablehnen oder einen anderen Termin vorschlagen. In beiden Fällen erhalten Sie eine Nachricht per E-Mail. Bei einer Ablehnung wird der reservierte Zeitraum wieder freigegeben.'
  },
  {
    question: 'Kann ein bestätigter Termin verschoben oder storniert werden?',
    answer: 'Ja. Falls eine Änderung erforderlich ist, informiert der Betrieb Sie per E-Mail über einen neuen Termin oder eine Stornierung. Wenn ein vorgeschlagener Termin nicht passt, können Sie auf die E-Mail antworten.'
  },
  {
    question: 'Wie kann ich Kontakt aufnehmen?',
    answer: 'Sie erreichen KFZ Service Akkus telefonisch unter +49 176 23141582 oder per E-Mail an service@kfz-akkus.de. Für Terminwünsche steht die Online-Termin-Anfrage zur Verfügung.'
  }
]
</script>
