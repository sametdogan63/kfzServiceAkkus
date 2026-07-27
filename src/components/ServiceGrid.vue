<template>
  <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    <ServiceCard
      v-for="service in services"
      :key="service.title"
      :title="service.title"
      :description="service.description"
      :icon="service.icon" />
  </div>
</template>

<script setup>
import ServiceCard from './ServiceCard.vue'
import {
  ShieldCheck,
  Droplet,
  Circle,
  ThermometerSnowflake,
  Zap,
  Clock,
  Battery,
  Hammer,
  Activity,
  Wrench,
  Sparkles
} from 'lucide-vue-next'

const services = [
  { title: 'Inspektion', description: 'Sorgfältige Prüfung aller sicherheitsrelevanten Komponenten.', icon: ShieldCheck },
  { title: 'Wartung und Reparatur', description: 'Wartungen und Reparaturen für verschiedene Fahrzeugmarken.', icon: Wrench },
  { title: 'Fahrzeugdiagnose', description: 'Pruefung und Fehlersuche an Fahrzeugsystemen.', icon: Activity },
  { title: 'Elektronikdiagnose', description: 'Diagnose elektronischer Fahrzeugkomponenten.', icon: Zap },
  { title: 'Ölwechsel', description: 'Fachgerechter Ölwechsel für Ihr Fahrzeug.', icon: Droplet },
  { title: 'Reifenwechsel', description: 'Reifenwechsel als Teil unseres Werkstattservices.', icon: Circle },
  { title: 'Klimaservice', description: 'Service rund um die Klimaanlage Ihres Fahrzeugs.', icon: ThermometerSnowflake },
  { title: 'Abgasuntersuchung', description: 'Abgasuntersuchungen für Ihr Fahrzeug.', icon: Clock },
  { title: 'Karosserieinstandsetzung', description: 'Instandsetzung von Karosseriearbeiten.', icon: Hammer },
  { title: 'Fahrzeugpflege', description: 'Pflegeleistungen für Ihr Fahrzeug.', icon: Sparkles },
  { title: 'Fahrzeuge und Ersatzteile', description: 'Verkauf von Fahrzeugen und Ersatzteilen.', icon: Battery },
  { title: 'Flottenbetreuung', description: 'Werkstattservice für Fahrzeugflotten.', icon: ShieldCheck },
  { title: 'Mobilitätsservices', description: 'Unterstuetzung rund um Ihre Mobilitaet.', icon: Activity }
]
</script>
