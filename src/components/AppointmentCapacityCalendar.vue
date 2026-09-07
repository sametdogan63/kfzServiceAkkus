<template>
  <div class="space-y-4" :aria-busy="isLoading">
    <div role="status" aria-atomic="true" class="text-sm text-slate-300">
      <p v-if="!props.selectedService">Noch keine Leistung ausgewählt.</p>
      <p v-else-if="isLoading">Verfügbare Termine werden geladen …</p>
      <p v-else-if="days.length">{{ availableDayCount }} Tage mit passenden Terminen in den nächsten 21 Tagen.</p>
    </div>

    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
      <button
        v-for="day in days"
        :key="day.date"
        type="button"
        :disabled="isLoading || !day.slots.some((slot) => slot.available)"
        :aria-pressed="props.selectedDate === day.date"
        class="min-h-24 rounded-lg border p-3 text-left transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
        :class="dayButtonClass(day)"
        @click="selectDay(day)"
      >
        <p class="text-xs uppercase tracking-[0.18em] text-slate-300">{{ weekdayLabel(day.date) }}</p>
        <p class="mt-1 text-base font-semibold text-white">{{ dateLabel(day.date) }}</p>
        <p class="mt-2 text-xs" :class="day.slots.some((slot) => slot.available) ? 'text-emerald-300' : 'text-slate-300'">
          {{ day.slots.some((slot) => slot.available) ? 'Verfügbar' : day.capacity === 0 ? 'Geschlossen' : 'Kein passender Termin' }}
        </p>
      </button>
    </div>

    <div v-if="loadError" role="alert" class="space-y-3 rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
      <p>{{ loadError }}</p>
      <button type="button" @click="refreshDays" class="btn-secondary gap-2"><RefreshCw class="h-4 w-4" aria-hidden="true" />Erneut laden</button>
      <p>Alternativ: <a href="tel:+4917623141582" class="underline">+49 176 23141582</a></p>
    </div>

    <div v-if="selectedDay" class="border-t border-white/10 pt-4" role="group" aria-labelledby="appointment-time-label">
      <p id="appointment-time-label" class="text-sm font-semibold text-white">
        Uhrzeit am {{ weekdayLabel(selectedDay.date) }}, {{ dateLabel(selectedDay.date) }}
      </p>
      <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <button
          v-for="slot in selectedDay.slots"
          :key="slot.value"
          type="button"
          :disabled="isLoading || !slot.available"
          :aria-pressed="props.selectedSlot === slot.value"
          :aria-label="`${slot.value} Uhr${slot.available ? '' : ', nicht verfügbar'}`"
          class="min-h-11 rounded-lg border px-3 py-2 text-sm font-medium transition-colors duration-200"
          :class="slotButtonClass(slot.value, slot.available)"
          @click="selectSlot(slot.value)"
        >
          {{ slot.value }}
        </button>
      </div>
      <p v-if="!hasAvailableSlot" class="mt-4 text-sm text-rose-300">
        Für diesen Tag ist aktuell kein passender Termin verfügbar.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { RefreshCw } from 'lucide-vue-next'
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
const isLoading = ref(false)
let latestRequest = 0
const availableDayCount = computed(() => days.value.filter((day) => day.slots.some((slot) => slot.available)).length)

const hasAvailableSlot = computed(() => {
  if (!selectedDay.value) {
    return false
  }
  return selectedDay.value.slots.some((slot) => slot.available)
})

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
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('de-DE', { weekday: 'short' })
}

const dateLabel = (isoDate) => {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit'
  })
}

const selectDay = (day) => {
  if (isLoading.value || !day.slots.some((slot) => slot.available)) {
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
  const request = ++latestRequest
  loadError.value = ''
  if (!props.selectedService) {
    days.value = []
    selectedDay.value = null
    isLoading.value = false
    return
  }

  isLoading.value = true
  try {
    const result = await getAvailabilityWindow({ days: 21, selectedService: props.selectedService })
    if (request !== latestRequest) return
    days.value = result
    selectedDay.value = days.value.find((entry) => entry.date === props.selectedDate) || null
    if (!selectedDay.value?.slots.some((slot) => slot.value === props.selectedSlot && slot.available)) {
      emit('update:selectedSlot', '')
    }
  } catch (error) {
    if (request !== latestRequest) return
    days.value = []
    selectedDay.value = null
    loadError.value = error.message || 'Der Kalender konnte nicht geladen werden.'
    emit('update:selectedSlot', '')
  } finally {
    if (request === latestRequest) isLoading.value = false
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
    days.value = []
    selectedDay.value = null
    refreshDays()
  },
  { immediate: true }
)

defineExpose({
  refreshDays
})
</script>
