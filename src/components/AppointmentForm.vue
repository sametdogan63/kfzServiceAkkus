<template>
  <form @submit.prevent="submitForm" class="space-y-6 rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8 shadow-panel backdrop-blur-xl">
    <div class="rounded-3xl border border-brand-500/20 bg-brand-500/10 p-4">
      <p class="text-sm font-semibold uppercase tracking-[0.28em] text-brand-200">Termin anfragen</p>
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
        <span class="font-medium">Fahrzeug</span>
        <input v-model="form.vehicle" type="text" required class="input-field" placeholder="z. B. VW Golf" />
      </label>
    </div>

    <div class="grid gap-6 sm:grid-cols-2">
      <label class="space-y-2 text-sm text-slate-200">
        <span class="font-medium">Modell</span>
        <input v-model="form.model" type="text" required class="input-field" placeholder="Baujahr / Motor" />
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
          <option>Ölwechsel</option>
          <option>Reifenservice</option>
          <option>Bremsenservice</option>
          <option>Klimaservice</option>
          <option>TÜV / AU</option>
          <option>Diagnose</option>
          <option>Batterie</option>
          <option>Fahrwerk</option>
          <option>Auspuff</option>
          <option>Kupplung</option>
          <option>Zahnriemen</option>
          <option>Unfallreparatur</option>
        </select>
      </label>
    </div>

    <label class="space-y-2 text-sm text-slate-200">
      <span class="font-medium">Wunschdatum</span>
      <input v-model="form.date" type="date" required class="input-field" />
    </label>

    <label class="space-y-2 text-sm text-slate-200">
      <span class="font-medium">Nachricht</span>
      <textarea v-model="form.message" rows="4" class="input-field" placeholder="Beschreiben Sie kurz Ihr Anliegen"></textarea>
    </label>

    <label class="flex items-start gap-3 text-sm text-slate-300">
      <input v-model="form.agree" type="checkbox" required class="mt-1 h-4 w-4 rounded border-white/10 bg-slate-950 text-brand-500" />
      <span>Ich stimme der Verarbeitung meiner Daten gemäß Datenschutzvereinbarung zu.</span>
    </label>

    <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
      <button type="submit" class="btn-primary">Anfrage absenden</button>
      <p class="text-sm text-slate-400">Wir melden uns innerhalb eines Werktages zurück.</p>
    </div>

    <p v-if="successMessage" class="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
      {{ successMessage }}
    </p>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { submitAppointment } from '../services/appointmentService'

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
  message: '',
  agree: false
})

const successMessage = ref('')

const submitForm = async () => {
  await submitAppointment({ ...form })
  successMessage.value = 'Ihre Anfrage wurde erfolgreich gesendet. Wir kontaktieren Sie schnellstmöglich.'
  Object.keys(form).forEach((key) => {
    if (typeof form[key] === 'boolean') {
      form[key] = false
    } else {
      form[key] = ''
    }
  })
}
</script>
