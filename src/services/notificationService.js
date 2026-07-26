const OUTBOX_STORAGE_KEY = 'kfz_appointments_notifications_outbox_v1'

function readOutbox() {
  try {
    const raw = localStorage.getItem(OUTBOX_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeOutbox(items) {
  localStorage.setItem(OUTBOX_STORAGE_KEY, JSON.stringify(items))
}

export function queueAppointmentNotification({ appointmentId, toEmail, customerName, status, message }) {
  const notification = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    appointmentId,
    toEmail,
    customerName,
    status,
    message,
    queuedAt: new Date().toISOString(),
    channel: 'email',
    deliveryState: 'queued'
  }

  const outbox = readOutbox()
  outbox.push(notification)
  writeOutbox(outbox)

  // Placeholder for real backend mail delivery.
  console.log('Notification queued:', notification)
  return notification
}

export function listQueuedNotifications() {
  return readOutbox().sort((a, b) => new Date(b.queuedAt) - new Date(a.queuedAt))
}
