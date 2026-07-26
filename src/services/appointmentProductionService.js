import { appointmentPlannerConfig } from '../config/appointmentPlannerConfig'
import { requireSupabase } from './supabaseClient'

const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  DECLINED: 'declined'
}

function toIsoDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function fromIsoDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function timeToMinutes(value) {
  const [hour, minute] = value.split(':').map(Number)
  return hour * 60 + minute
}

function minutesToTime(totalMinutes) {
  const hour = String(Math.floor(totalMinutes / 60)).padStart(2, '0')
  const minute = String(totalMinutes % 60).padStart(2, '0')
  return `${hour}:${minute}`
}

function getServiceDurationMinutes(serviceName) {
  return appointmentPlannerConfig.serviceDurationsMinutes[serviceName]
    || appointmentPlannerConfig.defaultServiceDurationMinutes
}

function getDurationSlotCount(serviceName) {
  return Math.ceil(getServiceDurationMinutes(serviceName) / appointmentPlannerConfig.slotIntervalMinutes)
}

function generateDaySlots(weekday) {
  const schedule = appointmentPlannerConfig.weeklySchedule[weekday] || { windows: [] }
  const result = []

  schedule.windows.forEach((window) => {
    const startMinutes = timeToMinutes(window.start)
    const endMinutes = timeToMinutes(window.end)

    for (let minute = startMinutes; minute + appointmentPlannerConfig.slotIntervalMinutes <= endMinutes; minute += appointmentPlannerConfig.slotIntervalMinutes) {
      result.push(minutesToTime(minute))
    }
  })

  return result
}

function isContinuousWindow(slots, startIndex, durationSlots) {
  for (let offset = 0; offset < durationSlots - 1; offset += 1) {
    if (timeToMinutes(slots[startIndex + offset + 1]) - timeToMinutes(slots[startIndex + offset]) !== appointmentPlannerConfig.slotIntervalMinutes) {
      return false
    }
  }
  return true
}

function buildOccupiedIntervals(bookings, allSlots) {
  const slotIndexMap = new Map(allSlots.map((slot, index) => [slot, index]))
  const occupied = new Set()

  bookings.forEach((booking) => {
    const startIndex = slotIndexMap.get(booking.slot)
    if (startIndex === undefined) return

    const bookingSlots = Math.ceil(booking.duration_minutes / appointmentPlannerConfig.slotIntervalMinutes)
    for (let offset = 0; offset < bookingSlots; offset += 1) {
      const slot = allSlots[startIndex + offset]
      if (slot) occupied.add(slot)
    }
  })

  return occupied
}

function mapAppointment(record) {
  if (!record) return record

  return {
    ...record,
    date: record.appointment_date,
    durationMinutes: record.duration_minutes,
    adminMessage: record.admin_message,
    createdAt: record.created_at,
    updatedAt: record.updated_at
  }
}

function createError(error, fallback) {
  return new Error(error?.message || fallback)
}

export async function getAvailabilityWindow({ startDate = new Date(), days, selectedService = '' } = {}) {
  const client = requireSupabase()
  const normalizedStart = typeof startDate === 'string' ? fromIsoDate(startDate) : new Date(startDate)
  const rangeDays = days || appointmentPlannerConfig.bookingWindowDays
  const endDate = new Date(normalizedStart)
  endDate.setDate(endDate.getDate() + rangeDays - 1)

  const { data: bookings, error } = await client.rpc('get_calendar_bookings', {
    p_start: toIsoDate(normalizedStart),
    p_end: toIsoDate(endDate)
  })

  if (error) throw createError(error, 'Kalender konnte nicht geladen werden.')

  const durationSlots = getDurationSlotCount(selectedService)
  const windowDays = []

  for (let index = 0; index < rangeDays; index += 1) {
    const current = new Date(normalizedStart)
    current.setHours(0, 0, 0, 0)
    current.setDate(normalizedStart.getDate() + index)

    const date = toIsoDate(current)
    const allSlots = generateDaySlots(current.getDay())
    const dayBookings = bookings.filter((booking) => booking.appointment_date === date)
    const occupied = buildOccupiedIntervals(dayBookings, allSlots)
    const slots = allSlots.map((slot, slotIndex) => {
      const available = slotIndex + durationSlots <= allSlots.length
        && isContinuousWindow(allSlots, slotIndex, durationSlots)
        && allSlots.slice(slotIndex, slotIndex + durationSlots).every((slotValue) => !occupied.has(slotValue))
      return { value: slot, available }
    })
    const capacity = allSlots.reduce((count, _, slotIndex) => count + Number(
      slotIndex + durationSlots <= allSlots.length && isContinuousWindow(allSlots, slotIndex, durationSlots)
    ), 0)
    const remaining = slots.filter((slot) => slot.available).length
    const used = Math.max(capacity - remaining, 0)

    windowDays.push({
      date,
      weekday: current.getDay(),
      capacity,
      used,
      remaining,
      status: remaining === 0 ? 'red' : used === 0 ? 'green' : 'yellow',
      slots
    })
  }

  return windowDays
}

export async function submitAppointment(data) {
  try {
    const client = requireSupabase()
    const durationMinutes = getServiceDurationMinutes(data.service)
    const { data: appointment, error } = await client.rpc('submit_appointment', {
      p_name: data.name,
      p_phone: data.phone,
      p_email: data.email,
      p_vehicle: data.vehicle,
      p_model: data.model,
      p_year: Number(data.year),
      p_license: data.license || null,
      p_service: data.service,
      p_appointment_date: data.date,
      p_slot: data.slot,
      p_duration_minutes: durationMinutes,
      p_message: data.message || null
    })

    if (error) throw error
    const createdAppointment = Array.isArray(appointment) ? appointment[0] : appointment
    return { success: true, appointment: mapAppointment(createdAppointment) }
  } catch (error) {
    return { success: false, error: createError(error, 'Termin-Anfrage konnte nicht gesendet werden.') }
  }
}

export function getAppointmentStatuses() {
  return APPOINTMENT_STATUS
}

export async function listAppointments() {
  const client = requireSupabase()
  const { data, error } = await client
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw createError(error, 'Termine konnten nicht geladen werden.')
  return data.map(mapAppointment)
}

export async function updateAppointmentStatus(appointmentId, status, message = '') {
  const client = requireSupabase()
  const { data, error } = await client
    .from('appointments')
    .update({
      status,
      admin_message: message || null,
      decided_at: new Date().toISOString(),
      decided_by: (await client.auth.getUser()).data.user?.id
    })
    .eq('id', appointmentId)
    .select()
    .single()

  if (error) throw createError(error, 'Terminstatus konnte nicht gespeichert werden.')
  return mapAppointment(data)
}

async function notifyCustomer(appointmentId, message) {
  const client = requireSupabase()
  const { error } = await client.functions.invoke('send-appointment-status', {
    body: { appointmentId, message }
  })

  if (error) throw createError(error, 'Status wurde gespeichert, aber die E-Mail konnte nicht versendet werden.')
}

export async function confirmAppointment(appointmentId, message) {
  const appointment = await updateAppointmentStatus(appointmentId, APPOINTMENT_STATUS.CONFIRMED, message)
  await notifyCustomer(appointment.id, message)
  return appointment
}

export async function declineAppointment(appointmentId, message) {
  const appointment = await updateAppointmentStatus(appointmentId, APPOINTMENT_STATUS.DECLINED, message)
  await notifyCustomer(appointment.id, message)
  return appointment
}

export async function getAdminSession() {
  const client = requireSupabase()
  const { data, error } = await client.auth.getSession()
  if (error) throw createError(error, 'Sitzung konnte nicht geladen werden.')
  return data.session
}

export async function signInAdmin(email, password) {
  const client = requireSupabase()
  const { data, error } = await client.auth.signInWithPassword({ email, password })
  if (error) throw createError(error, 'Anmeldung fehlgeschlagen.')
  return data.session
}

export async function signOutAdmin() {
  const client = requireSupabase()
  const { error } = await client.auth.signOut()
  if (error) throw createError(error, 'Abmeldung fehlgeschlagen.')
}
