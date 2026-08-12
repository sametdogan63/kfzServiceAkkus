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
  Activity,
  Wrench
} from 'lucide-vue-next'

const services = [
  { title: 'Inspektion', description: 'Sorgfältige Prüfung sicherheitsrelevanter Komponenten.', icon: ShieldCheck },
  { title: 'Wartung und Reparatur', description: 'Werkstattarbeiten für verschiedene Fahrzeugmarken.', icon: Wrench },
  { title: 'Fahrzeugdiagnose', description: 'Fehlersuche und Auswertung von Fahrzeugsystemen.', icon: Activity },
  { title: 'Elektronikdiagnose', description: 'Diagnose elektronischer Komponenten und Steuergeräte.', icon: Zap },
  { title: 'Ölwechsel', description: 'Fachgerechter Ölwechsel nach Herstellervorgaben.', icon: Droplet },
  { title: 'Reifenservice', description: 'Reifenwechsel und saisonaler Reifenservice.', icon: Circle },
  { title: 'Klimaservice', description: 'Wartung und Prüfung der Klimaanlage.', icon: ThermometerSnowflake },
  { title: 'Abgasuntersuchung', description: 'Vorbereitung und Durchführung der Abgasprüfung.', icon: Clock }
]
</script>
