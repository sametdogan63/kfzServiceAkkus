<template>
  <form @submit.prevent="submitForm" class="space-y-6 rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-5 shadow-panel backdrop-blur-xl sm:rounded-[32px] sm:p-8">
    <div class="rounded-2xl border border-brand-500/20 bg-brand-500/10 p-4 sm:rounded-3xl">
      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200 sm:text-sm sm:tracking-[0.28em]">Termin anfragen</p>
      <p class="mt-1 text-sm text-slate-300">Bitte teilen Sie uns Ihr Anliegen mit – wir melden uns innerhalb eines Werktages zurück.</p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2">
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">Name</span>
        <input v-model="form.name" type="text" required class="input-field" placeholder="Max Mustermann" />
      </label>
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">Telefon</span>
        <input v-model="form.phone" type="tel" required class="input-field" placeholder="01234 567890" />
      </label>
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">E-Mail</span>
        <input v-model="form.email" type="email" required class="input-field" placeholder="mail@domain.de" />
      </label>
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">Marke</span>
        <input v-model="form.vehicle" type="text" required class="input-field" placeholder="z. B. Volkswagen (VW)" />
      </label>
    </div>

    <div class="grid gap-6 sm:grid-cols-2">
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">Modell</span>
        <input v-model="form.model" type="text" required class="input-field" placeholder="z. B. Golf GTI" />
      </label>
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">Baujahr</span>
        <input v-model="form.year" type="number" min="1900" max="2099" required class="input-field" placeholder="2021" />
      </label>
    </div>

    <div class="grid gap-6 sm:grid-cols-2">
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">Kennzeichen</span>
        <input v-model="form.license" type="text" class="input-field" placeholder="B XY 1234" />
      </label>
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">Leistung</span>
        <select v-model="form.service" required class="input-field appearance-none">
          <option value="">Bitte wählen</option>
          <option>Inspektion</option>
          <option>Wartung und Reparatur</option>
          <option>Fahrzeugdiagnose</option>
          <option>Elektronikdiagnose</option>
          <option>Ölwechsel</option>
          <option>Reifenwechsel</option>
          <option>Klimaservice</option>
          <option>Abgasuntersuchung</option>
          <option>Karosserieinstandsetzung</option>
          <option>Fahrzeugpflege</option>
          <option>Fahrzeuge und Ersatzteile</option>
          <option>Flottenbetreuung</option>
          <option>Mobilitätsservices</option>
          <option>Tuning-Beratung</option>
        </select>
      </label>
    </div>

    <div class="space-y-3">
      <p class="text-sm font-medium text-slate-200">Wunschtermin wählen</p>
      <AppointmentCapacityCalendar
        ref="calendarRef"
        v-model:selected-date="form.date"
        v-model:selected-slot="form.slot"
        :selected-service="form.service"
      />
      <p v-if="slotError" class="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">
        {{ slotError }}
      </p>
      <p v-if="form.date && form.slot" class="text-sm text-slate-300">
        Ausgewählt: {{ formatSelectedDate(form.date) }} um {{ form.slot }} Uhr
      </p>
    </div>

    <label class="space-y-2 text-sm text-slate-200">
      <span class="font-medium">Nachricht</span>
      <textarea v-model="form.message" rows="4" class="input-field" placeholder="Beschreiben Sie kurz Ihr Anliegen"></textarea>
    </label>

    <label class="flex items-start gap-3 text-sm text-slate-300">
      <input v-model="form.agree" type="checkbox" required class="mt-1 h-4 w-4 rounded border-white/10 bg-slate-950 text-brand-500" />
      <span>Ich stimme der Verarbeitung meiner Daten gemäß Datenschutzvereinbarung zu.</span>
    </label>

    <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
      <button type="submit" class="btn-primary w-full sm:w-auto">Anfrage absenden</button>
      <p class="text-sm text-slate-400">Wir melden uns innerhalb eines Werktages zurück.</p>
    </div>

    <p v-if="successMessage" class="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
      {{ successMessage }}
      <span v-if="requestId" class="mt-2 block text-emerald-200">Ihre Anfrage-ID: {{ requestId }}</span>
    </p>
  </form>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import AppointmentCapacityCalendar from './AppointmentCapacityCalendar.vue'
import { submitAppointment } from '../services/appointmentProductionService'

const form = reactive({
  name: '',
  phone: '',
  email: '',
  vehicle: '',
  model: '',
  year: '',
  license: '',
  service: '',
  date: '',
  slot: '',
  message: '',
  agree: false
})

const successMessage = ref('')
const slotError = ref('')
const calendarRef = ref(null)
const requestId = ref('')

const formatSelectedDate = (isoDate) => {
  return new Date(isoDate).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const submitForm = async () => {
  slotError.value = ''

  if (!form.date || !form.slot) {
    slotError.value = 'Bitte wählen Sie zuerst einen verfügbaren Tag und Zeit-Slot aus.'
    return
  }

  const result = await submitAppointment({ ...form })

  if (!result.success) {
    slotError.value = result.error?.message || 'Termin konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.'
    await calendarRef.value?.refreshDays()
    return
  }

  requestId.value = result.appointment?.id || ''
  successMessage.value = 'Ihre Anfrage wurde gesendet. Der gewählte Zeitraum ist bis zu unserer Rückmeldung für Sie reserviert.'

  Object.keys(form).forEach((key) => {
    if (typeof form[key] === 'boolean') {
      form[key] = false
    } else {
      form[key] = ''
    }
  })

  await calendarRef.value?.refreshDays()
}

watch(
  () => form.service,
  async () => {
    form.date = ''
    form.slot = ''
    slotError.value = ''
    await calendarRef.value?.refreshDays()
  }
)
</script>
