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
  { title: 'Ölwechsel', description: 'Hochwertige Öle und fachgerechter Austausch für maximale Motorleistung.', icon: Droplet },
  { title: 'Reifenservice', description: 'Reifenwechsel, Auswuchten und Einlagerung mit Präzision.', icon: Circle },
  { title: 'Bremsenservice', description: 'Bremsflüssigkeit, Beläge und Scheiben werden geprüft und gewartet.', icon: Activity },
  { title: 'Klimaservice', description: 'Effiziente Klima-Inspektion und Auffrischung für saubere Luft.', icon: ThermometerSnowflake },
  { title: 'TÜV / AU', description: 'Vorbereitung und Prüfung für reibungslose Abnahmetermine.', icon: Clock },
  { title: 'Diagnose', description: 'Moderne Fehlersuche für Elektronik, Motor und Fahrwerk.', icon: Wrench },
  { title: 'Batterie', description: 'Leistungscheck, Erhaltung und Austausch von Starterbatterien.', icon: Battery },
  { title: 'Fahrwerk', description: 'Fahrwerksprüfung und Einstellung für sicheren Fahrkomfort.', icon: Sparkles },
  { title: 'Auspuff', description: 'Auspuff- und Abgasanlagen-Service für leisen, sauberen Betrieb.', icon: Sparkles },
  { title: 'Kupplung', description: 'Kupplungscheck und Reparatur für ein sanftes Ansprechverhalten.', icon: Hammer },
  { title: 'Zahnriemen', description: 'Zahnriemenprüfung und Wechsel gemäß Herstellervorgaben.', icon: Zap }
]
</script>
