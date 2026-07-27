<template>
  <div class="space-y-6">
    <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:rounded-3xl sm:p-5">
      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200 sm:text-sm sm:tracking-[0.28em]">Kalender Auslastung</p>
      <p class="mt-2 text-sm text-slate-300">
        Grün: komplett frei, Gelb: Platz verfügbar, Rot: ausgebucht.
      </p>
      <p class="mt-2 text-xs text-slate-400">
        Hinweis: Offene Anfragen und bestätigte Termine reservieren den jeweiligen Zeitraum.
      </p>
      <p v-if="!props.selectedService" class="mt-2 text-xs text-amber-300">
        Bitte zuerst eine Leistung wählen, damit passende Slots angezeigt werden.
      </p>
      <div class="mt-4 flex flex-wrap gap-3 text-xs text-slate-300">
        <span class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1">
          <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
          Frei
        </span>
        <span class="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-1">
          <span class="h-2 w-2 rounded-full bg-amber-400"></span>
          Teilweise frei
        </span>
        <span class="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/15 px-3 py-1">
          <span class="h-2 w-2 rounded-full bg-rose-400"></span>
          Kein Platz
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
      <button
        v-for="day in days"
        :key="day.date"
        type="button"
        :disabled="day.remaining === 0"
        class="rounded-2xl border p-3 text-left transition-all duration-200"
        :class="dayButtonClass(day)"
        @click="selectDay(day)"
      >
        <p class="text-xs uppercase tracking-[0.18em] text-slate-300">{{ weekdayLabel(day.date) }}</p>
        <p class="mt-1 text-base font-semibold text-white">{{ dateLabel(day.date) }}</p>
        <p class="mt-2 text-xs" :class="dayStatusTextClass(day.status)">
          {{ statusLabel(day.status) }}
        </p>
        <p class="mt-1 text-xs text-slate-400">{{ day.remaining }} freie Zeitblöcke</p>
      </button>
    </div>

    <p v-if="loadError" class="border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
      {{ loadError }}
    </p>

    <div v-if="selectedDay" class="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:rounded-3xl sm:p-5">
      <p class="text-sm font-semibold text-white">
        Verfügbare Slots für {{ weekdayLabel(selectedDay.date) }}, {{ dateLabel(selectedDay.date) }}
      </p>
      <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <button
          v-for="slot in selectedDay.slots"
          :key="slot.value"
          type="button"
          :disabled="!slot.available"
          class="rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-200"
          :class="slotButtonClass(slot.value, slot.available)"
          @click="selectSlot(slot.value)"
        >
          {{ slot.value }}
        </button>
      </div>
      <p v-if="!hasAvailableSlot" class="mt-4 text-sm text-rose-300">
        Für diesen Tag ist aktuell kein Slot verfügbar.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { getAvailabilityWindow } from '../services/appointmentProductionService'

const props = defineProps({
  selectedDate: {
    type: String,
    default: ''
  },
  selectedSlot: {
    type: String,
    default: ''
  },
  selectedService: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:selectedDate', 'update:selectedSlot'])

const days = ref([])
const selectedDay = ref(null)
const loadError = ref('')

const hasAvailableSlot = computed(() => {
  if (!selectedDay.value) {
    return false
  }
  return selectedDay.value.slots.some((slot) => slot.available)
})

const statusLabel = (status) => {
  if (status === 'green') return 'Komplett frei'
  if (status === 'yellow') return 'Platz vorhanden'
  return 'Ausgebucht'
}

const dayStatusTextClass = (status) => {
  if (status === 'green') return 'text-emerald-300'
  if (status === 'yellow') return 'text-amber-300'
  return 'text-rose-300'
}

const dayButtonClass = (day) => {
  const base = ['bg-white/[0.03]', 'border-white/10']

  if (day.status === 'green') {
    base.push('hover:border-emerald-400/50')
  } else if (day.status === 'yellow') {
    base.push('hover:border-amber-400/50')
  } else {
    base.push('hover:border-rose-400/50')
  }

  if (props.selectedDate === day.date) {
    base.push('ring-2', 'ring-brand-500/60')
  }

  if (day.remaining === 0) {
    base.push('cursor-not-allowed', 'opacity-55')
  }

  return base
}

const slotButtonClass = (slotValue, available) => {
  if (!available) {
    return ['border-rose-500/30', 'bg-rose-500/10', 'text-rose-300', 'cursor-not-allowed']
  }

  if (props.selectedSlot === slotValue) {
    return ['border-brand-400/60', 'bg-brand-500/20', 'text-brand-100']
  }

  return ['border-white/10', 'bg-white/[0.03]', 'text-slate-200', 'hover:border-brand-400/40']
}

const weekdayLabel = (isoDate) => {
  return new Date(isoDate).toLocaleDateString('de-DE', { weekday: 'short' })
}

const dateLabel = (isoDate) => {
  return new Date(isoDate).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit'
  })
}

const selectDay = (day) => {
  if (day.remaining === 0) {
    return
  }

  selectedDay.value = day
  emit('update:selectedDate', day.date)

  if (!day.slots.some((slot) => slot.value === props.selectedSlot && slot.available)) {
    emit('update:selectedSlot', '')
  }
}

const selectSlot = (slot) => {
  emit('update:selectedSlot', slot)
}

const refreshDays = async () => {
  loadError.value = ''

  try {
    days.value = await getAvailabilityWindow({ days: 21, selectedService: props.selectedService })
  } catch (error) {
    days.value = []
    selectedDay.value = null
    loadError.value = error.message || 'Der Kalender konnte nicht geladen werden.'
    return
  }

  if (props.selectedDate) {
    const match = days.value.find((entry) => entry.date === props.selectedDate) || null
    selectedDay.value = match

    if (!match || !match.slots.some((slot) => slot.value === props.selectedSlot && slot.available)) {
      emit('update:selectedSlot', '')
    }
  }
}

watch(
  () => props.selectedDate,
  (newDate) => {
    selectedDay.value = days.value.find((entry) => entry.date === newDate) || null
  }
)

watch(
  () => props.selectedService,
  () => {
    refreshDays()
  }
)

onMounted(() => {
  refreshDays()
})

defineExpose({
  refreshDays
})
</script>
