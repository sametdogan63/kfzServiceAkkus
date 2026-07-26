<template>
  <section class="section-container section-spacing py-16 lg:py-24 space-y-8">
    <div class="max-w-4xl">
      <p class="section-subtitle mb-4">Interne Verwaltung</p>
      <h1 class="text-4xl lg:text-5xl font-bold mb-4">Termin-Anfragen</h1>
      <p class="text-slate-300">
        Hier bestaetigt oder lehnt der Betrieb Termin-Anfragen ab. Bei jeder Entscheidung wird eine Kundenantwort in die Versandwarteschlange gelegt.
      </p>
    </div>

    <div class="card-base p-6 lg:p-8 space-y-6">
      <div class="flex flex-wrap gap-3 text-sm">
        <span class="rounded-full border border-amber-500/30 bg-amber-500/15 px-4 py-1 text-amber-200">Offen: {{ pendingAppointments.length }}</span>
        <span class="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-4 py-1 text-emerald-200">Bestaetigt: {{ confirmedAppointments.length }}</span>
        <span class="rounded-full border border-rose-500/30 bg-rose-500/15 px-4 py-1 text-rose-200">Abgelehnt: {{ declinedAppointments.length }}</span>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold text-white">Offene Anfragen</h2>

        <div v-if="pendingAppointments.length === 0" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
          Aktuell liegen keine offenen Termin-Anfragen vor.
        </div>

        <article v-for="appointment in pendingAppointments" :key="appointment.id" class="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p class="text-sm text-slate-400">Anfrage-ID: {{ appointment.id }}</p>
              <p class="text-lg font-semibold text-white mt-1">{{ appointment.name }} | {{ appointment.service }}</p>
              <p class="text-sm text-slate-300 mt-1">{{ appointment.date }} um {{ appointment.slot }} Uhr</p>
              <p class="text-sm text-slate-400 mt-1">{{ appointment.email }} | {{ appointment.phone }}</p>
            </div>
            <p class="text-xs text-slate-400">eingegangen: {{ formatDateTime(appointment.createdAt) }}</p>
          </div>

          <div class="grid gap-3 text-sm sm:grid-cols-2">
            <div class="rounded-xl border border-brand-500/20 bg-brand-500/10 p-3">
              <p class="text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">Geplante Arbeit</p>
              <p class="mt-1 font-medium text-white">{{ appointment.service }}</p>
              <p class="mt-1 text-slate-300">Voraussichtlich {{ formatDuration(appointment.durationMinutes) }}</p>
            </div>
            <div class="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Fahrzeug</p>
              <p class="mt-1 font-medium text-white">{{ appointment.vehicle }} {{ appointment.model }}</p>
              <p class="mt-1 text-slate-300">Baujahr: {{ appointment.year }} | Kennzeichen: {{ appointment.license || '-' }}</p>
            </div>
          </div>

          <div v-if="appointment.message" class="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Kundenanliegen</p>
            <p class="mt-1 text-slate-200 whitespace-pre-line">{{ appointment.message }}</p>
          </div>

          <label class="space-y-2 text-sm text-slate-200 block">
            <span class="font-medium">Antwort an Kunden</span>
            <textarea
              v-model="responseText[appointment.id]"
              rows="3"
              class="input-field"
              placeholder="z. B. Ihr Termin wurde bestaetigt. Bitte bringen Sie Fahrzeugschein mit."
            ></textarea>
          </label>

          <div class="flex flex-wrap gap-3">
            <button type="button" class="btn-primary" @click="confirm(appointment)">Bestaetigen</button>
            <button type="button" class="btn-secondary" @click="decline(appointment)">Ablehnen</button>
          </div>
        </article>
      </div>

      <div class="space-y-4 pt-4 border-t border-white/10">
        <h2 class="text-xl font-semibold text-white">Versandwarteschlange Kundenantworten</h2>
        <div v-if="notifications.length === 0" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
          Noch keine Antworten in der Warteschlange.
        </div>

        <div v-for="item in notifications" :key="item.id" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm space-y-1">
          <p class="text-slate-200">{{ item.toEmail }} | Status: {{ item.status }}</p>
          <p class="text-slate-400">{{ formatDateTime(item.queuedAt) }}</p>
          <p class="text-slate-300">{{ item.message }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import {
  confirmAppointment,
  declineAppointment,
  getAppointmentStatuses,
  listAppointments
} from '../services/appointmentService'
import { listQueuedNotifications } from '../services/notificationService'

const responseText = reactive({})
const appointments = ref(listAppointments())
const notifications = ref(listQueuedNotifications())
const statuses = getAppointmentStatuses()

const pendingAppointments = computed(() => appointments.value.filter((entry) => entry.status === statuses.PENDING))
const confirmedAppointments = computed(() => appointments.value.filter((entry) => entry.status === statuses.CONFIRMED))
const declinedAppointments = computed(() => appointments.value.filter((entry) => entry.status === statuses.DECLINED))

const formatDateTime = (value) => {
  if (!value) {
    return '-'
  }
  return new Date(value).toLocaleString('de-DE')
}

const formatDuration = (minutes) => {
  const duration = Number(minutes) || 0
  const hours = Math.floor(duration / 60)
  const remainingMinutes = duration % 60

  if (hours === 0) {
    return `${remainingMinutes} Min.`
  }

  if (remainingMinutes === 0) {
    return `${hours} Std.`
  }

  return `${hours} Std. ${remainingMinutes} Min.`
}

const refreshData = () => {
  appointments.value = listAppointments()
  notifications.value = listQueuedNotifications()
}

const confirm = (appointment) => {
  const fallback = 'Ihr Termin wurde bestaetigt. Vielen Dank fuer Ihre Anfrage.'
  confirmAppointment(appointment.id, responseText[appointment.id] || fallback)
  refreshData()
}

const decline = (appointment) => {
  const fallback = 'Leider koennen wir den gewuenschten Termin nicht bestaetigen. Bitte waehlen Sie einen anderen Slot.'
  declineAppointment(appointment.id, responseText[appointment.id] || fallback)
  refreshData()
}
</script>
