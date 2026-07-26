<template>
  <section id="services" class="section services-section reveal">
    <div class="section-heading">
      <p class="eyebrow">Leistungen</p>
      <h2>Unser Service für Ihre Mobilität</h2>
    </div>
    <p class="section-intro">KFZ Service Akkus bietet serviceorientierte Lösungen für Batterie, Elektrik und Fahrzeugtechnik. Unser Team kümmert sich um schnelle Prüfungen, sichere Reparaturen und moderne Diagnosen.</p>
    <div class="services-grid">
      <article v-for="service in services" :key="service.title" class="service-card reveal">
        <h3>{{ service.title }}</h3>
        <p>{{ service.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    title: 'Batterieprüfung & Austausch',
    description: 'Schnelle Diagnose und fachgerechter Wechsel für Starter-, AGM- und EFB-Batterien.'
  },
  {
    title: 'Fahrzeugelektrik & Diagnose',
    description: 'Fehleranalyse, Sensorprüfung und geprüfte Reparatur von Bordnetz und Steuergeräten.'
  },
  {
    title: 'Meisterbetrieb Service',
    description: 'Zuverlässige Werkstattarbeiten und transparente Beratung mit echter Meisterqualität.'
  }
]
</script>
