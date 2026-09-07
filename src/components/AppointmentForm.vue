<template>
  <form @submit.prevent="submitForm" class="space-y-6" :aria-busy="isSubmitting">
    <div class="border-l-2 border-brand-400 pl-4">
      <h2 class="text-xl text-white">Ihre Terminanfrage</h2>
      <p class="mt-2 text-sm text-slate-300">Der Betrieb prüft Ihren Wunschtermin und bestätigt ihn per E-Mail.</p>
      <p class="mt-2 text-sm text-slate-400">Mit * gekennzeichnete Felder sind Pflichtfelder.</p>
    </div>

    <fieldset :disabled="isSubmitting" class="min-w-0 space-y-6">
      <legend class="sr-only">Kontakt, Fahrzeug und Wunschtermin</legend>
    <div class="grid gap-6 sm:grid-cols-2">
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">Name *</span>
        <input v-model.trim="form.name" name="name" autocomplete="name" type="text" minlength="2" maxlength="120" required class="input-field" placeholder="Max Mustermann" />
      </label>
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">Telefon (optional)</span>
        <input v-model.trim="form.phone" name="tel" autocomplete="tel" type="tel" minlength="5" maxlength="50" class="input-field" placeholder="01234 567890" />
      </label>
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">E-Mail *</span>
        <input v-model.trim="form.email" name="email" autocomplete="email" type="email" maxlength="255" required class="input-field" placeholder="mail@domain.de" />
      </label>
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">Fahrzeugmarke *</span>
        <input v-model.trim="form.vehicle" name="vehicle" type="text" minlength="2" maxlength="120" required class="input-field" placeholder="z. B. Volkswagen (VW)" />
      </label>
    </div>

    <div class="grid gap-6 sm:grid-cols-2">
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">Modell (optional)</span>
        <input v-model.trim="form.model" name="model" type="text" maxlength="120" class="input-field" placeholder="z. B. Golf GTI" />
      </label>
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">Baujahr (optional)</span>
        <input v-model="form.year" name="year" type="number" min="1900" :max="new Date().getFullYear() + 1" class="input-field" placeholder="2021" />
      </label>
    </div>

    <div class="grid gap-6 sm:grid-cols-2">
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">Kennzeichen (optional)</span>
        <input v-model.trim="form.license" name="license" type="text" maxlength="20" class="input-field" placeholder="E AB 1234" />
      </label>
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">Leistung *</span>
        <select v-model="form.service" name="service" required class="input-field">
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

    <div class="space-y-3" role="group" aria-labelledby="appointment-date-label" :aria-describedby="slotError ? 'appointment-slot-error' : undefined">
      <p id="appointment-date-label" class="text-sm font-medium text-slate-200">Wunschtermin *</p>
      <AppointmentCapacityCalendar
        ref="calendarRef"
        v-model:selected-date="form.date"
        v-model:selected-slot="form.slot"
        :selected-service="form.service"
      />
      <p v-if="slotError" id="appointment-slot-error" ref="slotErrorRef" tabindex="-1" role="alert" class="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">
        {{ slotError }}
      </p>
      <p v-if="form.date && form.slot" role="status" class="text-sm text-slate-300">
        Ausgewählt: {{ formatSelectedDate(form.date) }} um {{ form.slot }} Uhr
      </p>
    </div>

    <label class="space-y-2 text-sm text-slate-200">
      <span class="font-medium">Nachricht (optional)</span>
      <textarea v-model.trim="form.message" name="message" rows="4" maxlength="3000" class="input-field" placeholder="Beschreiben Sie kurz Ihr Anliegen"></textarea>
    </label>

    <p class="text-sm text-slate-300">Wir verwenden Ihre Angaben zur Bearbeitung Ihrer Anfrage. Informationen zur Verarbeitung und Ihren Rechten finden Sie in der <RouterLink to="/datenschutz" class="text-brand-300 underline underline-offset-4">Datenschutzerklärung</RouterLink>.</p>

    <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
      <button type="submit" :disabled="isSubmitting" class="btn-primary w-full gap-2 disabled:cursor-wait disabled:opacity-70 sm:w-auto">
        <Loader2 v-if="isSubmitting" class="h-4 w-4 animate-spin" aria-hidden="true" />
        <Send v-else class="h-4 w-4" aria-hidden="true" />
        {{ isSubmitting ? 'Wird gesendet …' : 'Anfrage absenden' }}
      </button>
      <p class="text-sm text-slate-400">Noch keine verbindliche Terminbestätigung.</p>
    </div>
    </fieldset>

    <div role="alert" aria-atomic="true">
      <p v-if="submitError" ref="submitErrorRef" tabindex="-1" class="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">{{ submitError }} Ihre Angaben bleiben erhalten. Sie erreichen uns auch unter <a href="tel:+4917623141582" class="underline">+49 176 23141582</a>.</p>
    </div>
    <div role="status" aria-atomic="true">
      <p v-if="successMessage" ref="successRef" tabindex="-1" class="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
        {{ successMessage }}
        <span v-if="requestId" class="mt-2 block break-all text-emerald-200">Ihre Anfrage-ID: {{ requestId }}</span>
      </p>
    </div>
  </form>
</template>

<script setup>
import { nextTick, reactive, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { Loader2, Send } from 'lucide-vue-next'
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
  message: ''
})

const successMessage = ref('')
const slotError = ref('')
const calendarRef = ref(null)
const requestId = ref('')
const isSubmitting = ref(false)
const submitError = ref('')
const submitErrorRef = ref(null)
const slotErrorRef = ref(null)
const successRef = ref(null)

const formatSelectedDate = (isoDate) => {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const submitForm = async () => {
  if (isSubmitting.value) return

  slotError.value = ''
  submitError.value = ''
  successMessage.value = ''
  requestId.value = ''

  if (!form.date || !form.slot) {
    slotError.value = 'Bitte wählen Sie zuerst einen verfügbaren Tag und Zeit-Slot aus.'
    await nextTick()
    slotErrorRef.value?.focus()
    return
  }

  isSubmitting.value = true
  try {
    const result = await submitAppointment({ ...form })
    if (!result.success) {
      submitError.value = result.error?.message || 'Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.'
      await calendarRef.value?.refreshDays()
      await nextTick()
      submitErrorRef.value?.focus()
      return
    }

    requestId.value = result.appointment?.id || ''
    successMessage.value = 'Ihre Anfrage wurde gesendet. Der Zeitraum ist bis zu unserer Rückmeldung reserviert. Sie erhalten die Entscheidung per E-Mail.'
    Object.keys(form).forEach((key) => { form[key] = '' })
    await nextTick()
    await calendarRef.value?.refreshDays()
    successRef.value?.focus()
  } catch {
    submitError.value = 'Die Anfrage konnte nicht abgeschlossen werden. Bitte prüfen Sie Ihre Verbindung.'
    await nextTick()
    submitErrorRef.value?.focus()
  } finally {
    isSubmitting.value = false
  }
}

watch(
  () => form.service,
  () => {
    form.date = ''
    form.slot = ''
    slotError.value = ''
  }
)
</script>
