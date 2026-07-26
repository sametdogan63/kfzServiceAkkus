<template>
  <section v-if="session" class="section-container section-spacing py-12 lg:py-16 space-y-8">
    <div class="flex flex-wrap items-end justify-between gap-5">
      <p class="section-subtitle mb-4">Interne Verwaltung</p>
      <div>
        <h1 class="text-4xl lg:text-5xl font-bold mb-4">Termin-Dashboard</h1>
        <p class="max-w-2xl text-slate-300">
          Neue Anfragen pruefen, Termine bestaetigen und den aktuellen Werkstattplan im Blick behalten.
        </p>
      </div>
      <div class="flex flex-wrap gap-3">
        <button type="button" class="btn-secondary" :disabled="isLoading" @click="refreshData">
          <RefreshCw class="h-4 w-4" :class="isLoading ? 'animate-spin' : ''" aria-hidden="true" />
          Aktualisieren
        </button>
        <button type="button" class="btn-ghost" @click="logout">Abmelden</button>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <div class="border-l-2 border-amber-400 bg-amber-500/10 p-5">
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-amber-200">Offene Anfragen</p>
        <p class="mt-2 text-3xl font-bold text-white">{{ pendingAppointments.length }}</p>
        <p class="mt-1 text-sm text-amber-100/80">Brauchen eine Entscheidung</p>
      </div>
      <div class="border-l-2 border-emerald-400 bg-emerald-500/10 p-5">
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">Bestaetigt</p>
        <p class="mt-2 text-3xl font-bold text-white">{{ confirmedAppointments.length }}</p>
        <p class="mt-1 text-sm text-emerald-100/80">Blockieren die Kalenderzeit</p>
      </div>
      <div class="border-l-2 border-rose-400 bg-rose-500/10 p-5">
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-rose-200">Abgelehnt</p>
        <p class="mt-2 text-3xl font-bold text-white">{{ declinedAppointments.length }}</p>
        <p class="mt-1 text-sm text-rose-100/80">Kunde wurde informiert</p>
      </div>
    </div>

    <div class="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div class="card-base p-6 lg:p-8 space-y-6">
        <p v-if="loadError" class="border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">{{ loadError }}</p>
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-semibold text-white">Terminliste</h2>
            <p class="mt-1 text-sm text-slate-400">{{ visibleAppointments.length }} Eintraege in dieser Ansicht</p>
          </div>
          <div class="flex flex-wrap gap-2" aria-label="Terminstatus filtern">
            <button
              v-for="view in views"
              :key="view.value"
              type="button"
              class="rounded-lg border px-3 py-2 text-sm font-bold transition"
              :class="activeView === view.value ? 'border-brand-400 bg-brand-500/15 text-brand-100' : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25'"
              @click="activeView = view.value"
            >
              {{ view.label }}
            </button>
          </div>
        </div>

        <div v-if="visibleAppointments.length === 0" class="border border-dashed border-white/15 bg-white/[0.02] p-6 text-sm text-slate-300">
          In dieser Ansicht liegen aktuell keine Termine vor.
        </div>

        <div class="space-y-4">
        <article v-for="appointment in visibleAppointments" :key="appointment.id" class="border border-white/10 bg-white/[0.03] p-5 space-y-4">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p class="text-sm text-slate-400">Anfrage-ID: {{ appointment.id }}</p>
              <p class="text-lg font-semibold text-white mt-1">{{ appointment.name }} | {{ appointment.service }}</p>
              <p class="text-sm text-slate-300 mt-1">{{ appointment.date }} um {{ appointment.slot }} Uhr</p>
              <p class="text-sm text-slate-400 mt-1">{{ appointment.email }} | {{ appointment.phone }}</p>
            </div>
            <div class="text-right">
              <span class="inline-flex rounded-full border px-3 py-1 text-xs font-bold" :class="statusClass(appointment.status)">{{ statusLabel(appointment.status) }}</span>
              <p class="mt-2 text-xs text-slate-400">eingegangen: {{ formatDateTime(appointment.createdAt) }}</p>
            </div>
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

          <label v-if="appointment.status === statuses.PENDING" class="space-y-2 text-sm text-slate-200 block">
            <span class="font-medium">Antwort an Kunden</span>
            <textarea
              v-model="responseText[appointment.id]"
              rows="3"
              class="input-field"
              placeholder="z. B. Ihr Termin wurde bestaetigt. Bitte bringen Sie Fahrzeugschein mit."
            ></textarea>
          </label>

          <div v-if="appointment.status === statuses.PENDING" class="flex flex-wrap gap-3">
            <button type="button" class="btn-primary" :disabled="isSaving" @click="confirm(appointment)">Bestaetigen</button>
            <button type="button" class="btn-secondary" :disabled="isSaving" @click="decline(appointment)">Ablehnen</button>
          </div>
          <p v-else class="text-sm text-slate-400">
            {{ appointment.status === statuses.CONFIRMED ? 'Der Termin blockiert die entsprechende Zeit im Kundenkalender.' : 'Dieser Wunschslot ist wieder fuer weitere Kunden anfragbar.' }}
          </p>
        </article>
        </div>
      </div>

      <aside class="space-y-6 xl:sticky xl:top-28 xl:self-start">
        <div class="card-base p-6">
          <div class="flex items-center gap-3">
            <CalendarClock class="h-5 w-5 text-brand-300" aria-hidden="true" />
            <h2 class="text-xl font-semibold text-white">Naechste Termine</h2>
          </div>
          <div v-if="upcomingConfirmed.length === 0" class="mt-5 text-sm text-slate-400">Noch keine zukuenftigen, bestaetigten Termine.</div>
          <div v-else class="mt-5 space-y-4">
            <div v-for="appointment in upcomingConfirmed" :key="appointment.id" class="border-l-2 border-emerald-400 pl-3">
              <p class="font-semibold text-white">{{ appointment.date }} | {{ appointment.slot }} Uhr</p>
              <p class="mt-1 text-sm text-slate-300">{{ appointment.name }} - {{ appointment.service }}</p>
              <p class="mt-1 text-xs text-slate-400">{{ formatDuration(appointment.durationMinutes) }}</p>
            </div>
          </div>
        </div>

      <div class="card-base space-y-4 p-6">
        <h2 class="text-xl font-semibold text-white">Kundenantwort</h2>
        <p class="text-sm leading-6 text-slate-300">
          Bei Bestaetigung oder Ablehnung versendet die geschuetzte Server-Funktion die hinterlegte Antwort per E-Mail an den Kunden.
        </p>
        <p class="text-xs leading-5 text-slate-500">
          Der Versand wird erst aktiv, nachdem die Supabase Edge Function und Resend konfiguriert wurden.
        </p>
      </div>
      </aside>
    </div>
  </section>

  <section v-else class="section-container section-spacing py-16 lg:py-24">
    <div class="mx-auto max-w-md border-t-2 border-brand-500 bg-slate-900/80 p-7 shadow-panel sm:p-9">
      <p class="section-subtitle">Geschuetzter Bereich</p>
      <h1 class="mt-3 text-3xl text-white">Termin-Dashboard</h1>
      <p class="mt-3 text-sm leading-6 text-slate-400">Melden Sie sich mit dem fuer den Betrieb eingerichteten Zugang an.</p>

      <form class="mt-7 space-y-5" @submit.prevent="login">
        <label class="block space-y-2 text-sm font-medium text-slate-200">
          E-Mail-Adresse
          <input v-model="loginEmail" class="input-field" type="email" required autocomplete="email" />
        </label>
        <label class="block space-y-2 text-sm font-medium text-slate-200">
          Passwort
          <input v-model="loginPassword" class="input-field" type="password" required autocomplete="current-password" />
        </label>
        <p v-if="loginError" class="border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">{{ loginError }}</p>
        <p v-if="!isConfigured" class="border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-100">Supabase ist noch nicht konfiguriert. Hinterlegen Sie zuerst die Vercel-Umgebungsvariablen.</p>
        <button type="submit" class="btn-primary w-full" :disabled="isLoading || !isConfigured">
          {{ isLoading ? 'Anmeldung wird geprueft ...' : 'Anmelden' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { CalendarClock, RefreshCw } from 'lucide-vue-next'
import {
  confirmAppointment,
  declineAppointment,
  getAdminSession,
  getAppointmentStatuses,
  listAppointments,
  signInAdmin,
  signOutAdmin
} from '../services/appointmentProductionService'
import { isSupabaseConfigured } from '../services/supabaseClient'

const responseText = reactive({})
const appointments = ref([])
const statuses = getAppointmentStatuses()
const activeView = ref('pending')
const session = ref(null)
const loginEmail = ref('')
const loginPassword = ref('')
const loginError = ref('')
const loadError = ref('')
const isLoading = ref(false)
const isSaving = ref(false)
const isConfigured = isSupabaseConfigured
const views = [
  { value: 'pending', label: 'Offen' },
  { value: 'confirmed', label: 'Bestaetigt' },
  { value: 'declined', label: 'Abgelehnt' },
  { value: 'all', label: 'Alle' }
]

const pendingAppointments = computed(() => appointments.value.filter((entry) => entry.status === statuses.PENDING))
const confirmedAppointments = computed(() => appointments.value.filter((entry) => entry.status === statuses.CONFIRMED))
const declinedAppointments = computed(() => appointments.value.filter((entry) => entry.status === statuses.DECLINED))
const visibleAppointments = computed(() => {
  if (activeView.value === 'all') {
    return appointments.value
  }
  return appointments.value.filter((entry) => entry.status === activeView.value)
})
const upcomingConfirmed = computed(() => {
  const today = new Date().toLocaleDateString('en-CA')
  return confirmedAppointments.value
    .filter((entry) => entry.date >= today)
    .sort((first, second) => `${first.date}${first.slot}`.localeCompare(`${second.date}${second.slot}`))
    .slice(0, 5)
})

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

const statusLabel = (status) => {
  if (status === statuses.CONFIRMED) return 'Bestaetigt'
  if (status === statuses.DECLINED) return 'Abgelehnt'
  return 'Offen'
}

const statusClass = (status) => {
  if (status === statuses.CONFIRMED) return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
  if (status === statuses.DECLINED) return 'border-rose-500/30 bg-rose-500/10 text-rose-200'
  return 'border-amber-500/30 bg-amber-500/10 text-amber-200'
}

const refreshData = async () => {
  loadError.value = ''
  isLoading.value = true
  try {
    appointments.value = await listAppointments()
  } catch (error) {
    loadError.value = error.message || 'Termine konnten nicht geladen werden.'
  } finally {
    isLoading.value = false
  }
}

const confirm = async (appointment) => {
  const fallback = 'Ihr Termin wurde bestaetigt. Vielen Dank fuer Ihre Anfrage.'
  isSaving.value = true
  loadError.value = ''
  try {
    await confirmAppointment(appointment.id, responseText[appointment.id] || fallback)
    await refreshData()
  } catch (error) {
    loadError.value = error.message || 'Termin konnte nicht bestaetigt werden.'
  } finally {
    isSaving.value = false
  }
}

const decline = async (appointment) => {
  const fallback = 'Leider koennen wir den gewuenschten Termin nicht bestaetigen. Bitte waehlen Sie einen anderen Slot.'
  isSaving.value = true
  loadError.value = ''
  try {
    await declineAppointment(appointment.id, responseText[appointment.id] || fallback)
    await refreshData()
  } catch (error) {
    loadError.value = error.message || 'Termin konnte nicht abgelehnt werden.'
  } finally {
    isSaving.value = false
  }
}

const login = async () => {
  loginError.value = ''
  isLoading.value = true
  try {
    session.value = await signInAdmin(loginEmail.value, loginPassword.value)
    await refreshData()
  } catch (error) {
    loginError.value = error.message || 'Anmeldung fehlgeschlagen.'
  } finally {
    isLoading.value = false
  }
}

const logout = async () => {
  await signOutAdmin()
  session.value = null
  appointments.value = []
}

onMounted(async () => {
  if (!isConfigured) return
  try {
    session.value = await getAdminSession()
    if (session.value) await refreshData()
  } catch (error) {
    loginError.value = error.message || 'Sitzung konnte nicht geladen werden.'
  }
})
</script>
