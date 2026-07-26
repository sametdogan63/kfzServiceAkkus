import { appointmentPlannerConfig } from '../config/appointmentPlannerConfig'
import { queueAppointmentNotification } from './notificationService'

const STORAGE_KEY = 'kfz_appointments_bookings_v1'
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

function readBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeBookings(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}

function getBlockingBookings(allBookings) {
  return allBookings.filter((entry) => entry.status === APPOINTMENT_STATUS.CONFIRMED)
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
  const slotInterval = appointmentPlannerConfig.slotIntervalMinutes
  return Math.ceil(getServiceDurationMinutes(serviceName) / slotInterval)
}

function getScheduleForWeekday(weekday) {
  return appointmentPlannerConfig.weeklySchedule[weekday] || { windows: [] }
}

function generateDaySlots(weekday) {
  const schedule = getScheduleForWeekday(weekday)
  const slotInterval = appointmentPlannerConfig.slotIntervalMinutes
  const result = []

  schedule.windows.forEach((window) => {
    const startMinutes = timeToMinutes(window.start)
    const endMinutes = timeToMinutes(window.end)

    for (let minute = startMinutes; minute + slotInterval <= endMinutes; minute += slotInterval) {
      result.push(minutesToTime(minute))
    }
  })

  return result
}

function isContinuousWindow(slots, startIndex, durationSlots) {
  const slotInterval = appointmentPlannerConfig.slotIntervalMinutes

  for (let offset = 0; offset < durationSlots - 1; offset += 1) {
    const current = timeToMinutes(slots[startIndex + offset])
    const next = timeToMinutes(slots[startIndex + offset + 1])

    if (next - current !== slotInterval) {
      return false
    }
  }

  return true
}

function buildOccupiedIntervals(dayBookings, allSlots) {
  const slotIndexMap = new Map(allSlots.map((slot, index) => [slot, index]))
  const occupied = new Set()
  const defaultDurationSlots = getDurationSlotCount('')

  dayBookings.forEach((booking) => {
    const startIndex = slotIndexMap.get(booking.slot)
    if (startIndex === undefined) {
      return
    }

    const bookedDurationSlots = Math.max(
      1,
      Math.ceil((booking.durationMinutes || appointmentPlannerConfig.defaultServiceDurationMinutes)
      / appointmentPlannerConfig.slotIntervalMinutes)
    )

    const durationSlots = Number.isFinite(bookedDurationSlots) ? bookedDurationSlots : defaultDurationSlots

    for (let offset = 0; offset < durationSlots; offset += 1) {
      const targetIndex = startIndex + offset
      if (targetIndex < allSlots.length) {
        occupied.add(allSlots[targetIndex])
      }
    }
  })

  return occupied
}

function calculateStartSlotAvailability(allSlots, occupiedIntervals, durationSlots) {
  return allSlots.map((slot, index) => {
    if (index + durationSlots > allSlots.length) {
      return { value: slot, available: false }
    }

    if (!isContinuousWindow(allSlots, index, durationSlots)) {
      return { value: slot, available: false }
    }

    for (let offset = 0; offset < durationSlots; offset += 1) {
      const slotValue = allSlots[index + offset]
      if (occupiedIntervals.has(slotValue)) {
        return { value: slot, available: false }
      }
    }

    return { value: slot, available: true }
  })
}

function countMaximumStartSlots(allSlots, durationSlots) {
  let count = 0
  for (let index = 0; index + durationSlots <= allSlots.length; index += 1) {
    if (isContinuousWindow(allSlots, index, durationSlots)) {
      count += 1
    }
  }
  return count
}

function getStatusForDay(used, remaining) {
  if (remaining <= 0) {
    return 'red'
  }
  if (used === 0) {
    return 'green'
  }
  return 'yellow'
}

export async function getAvailabilityWindow({ startDate = new Date(), days, selectedService = '' } = {}) {
  const allBookings = readBookings()
  const bookings = getBlockingBookings(allBookings)
  const normalizedStart = typeof startDate === 'string' ? fromIsoDate(startDate) : new Date(startDate)
  const windowDays = []
  const rangeDays = days || appointmentPlannerConfig.bookingWindowDays
  const durationSlots = getDurationSlotCount(selectedService)

  for (let i = 0; i < rangeDays; i += 1) {
    const current = new Date(normalizedStart)
    current.setHours(0, 0, 0, 0)
    current.setDate(normalizedStart.getDate() + i)

    const weekday = current.getDay()
    const date = toIsoDate(current)
    const allSlots = generateDaySlots(weekday)

    const dayBookings = bookings.filter((entry) => entry.date === date)
    const occupiedIntervals = buildOccupiedIntervals(dayBookings, allSlots)
    const slotAvailability = calculateStartSlotAvailability(allSlots, occupiedIntervals, durationSlots)
    const capacity = countMaximumStartSlots(allSlots, durationSlots)
    const remaining = slotAvailability.filter((slot) => slot.available).length
    const used = Math.max(capacity - remaining, 0)

    windowDays.push({
      date,
      weekday,
      capacity,
      used,
      remaining,
      status: getStatusForDay(used, remaining),
      slots: slotAvailability
    })
  }

  await new Promise((resolve) => setTimeout(resolve, 220))
  return windowDays
}

export async function submitAppointment(data) {
  try {
    const bookings = readBookings()
    const durationMinutes = getServiceDurationMinutes(data.service)

    if (data.date && data.slot) {
      const [day] = await getAvailabilityWindow({
        startDate: data.date,
        days: 1,
        selectedService: data.service
      })

      const requestedSlot = day?.slots?.find((slot) => slot.value === data.slot)
      if (!requestedSlot || !requestedSlot.available) {
        return {
          success: false,
          error: new Error('Dieser Slot wurde gerade vergeben. Bitte waehlen Sie einen anderen Termin.')
        }
      }
    }

    const appointmentRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      status: APPOINTMENT_STATUS.PENDING,
      durationMinutes,
      ...data
    }

    bookings.push(appointmentRecord)
    writeBookings(bookings)

    console.log('Appointment request:', appointmentRecord)
    await new Promise((resolve) => setTimeout(resolve, 400))
    return { success: true, appointment: appointmentRecord }
  } catch (error) {
    console.error('Failed to submit appointment', error)
    return { success: false, error }
  }
}

export function getPlannerConfig() {
  return appointmentPlannerConfig
}

export function getAppointmentStatuses() {
  return APPOINTMENT_STATUS
}

export function listAppointments() {
  return readBookings().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function updateAppointmentStatus(appointmentId, status) {
  const bookings = readBookings()
  const index = bookings.findIndex((entry) => entry.id === appointmentId)

  if (index === -1) {
    return { success: false, error: new Error('Termin nicht gefunden.') }
  }

  if (!Object.values(APPOINTMENT_STATUS).includes(status)) {
    return { success: false, error: new Error('Ungueltiger Status.') }
  }

  bookings[index] = {
    ...bookings[index],
    status,
    updatedAt: new Date().toISOString()
  }

  writeBookings(bookings)
  return { success: true, appointment: bookings[index] }
}

export function confirmAppointment(appointmentId, message) {
  const result = updateAppointmentStatus(appointmentId, APPOINTMENT_STATUS.CONFIRMED)
  if (!result.success) {
    return result
  }

  queueAppointmentNotification({
    appointmentId: result.appointment.id,
    toEmail: result.appointment.email,
    customerName: result.appointment.name,
    status: APPOINTMENT_STATUS.CONFIRMED,
    message
  })

  return result
}

export function declineAppointment(appointmentId, message) {
  const result = updateAppointmentStatus(appointmentId, APPOINTMENT_STATUS.DECLINED)
  if (!result.success) {
    return result
  }

  queueAppointmentNotification({
    appointmentId: result.appointment.id,
    toEmail: result.appointment.email,
    customerName: result.appointment.name,
    status: APPOINTMENT_STATUS.DECLINED,
    message
  })

  return result
}
