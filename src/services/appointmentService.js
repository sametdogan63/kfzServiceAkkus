export async function submitAppointment(data) {
  try {
    console.log('Appointment request:', data)
    await new Promise((resolve) => setTimeout(resolve, 600))
    return { success: true }
  } catch (error) {
    console.error('Failed to submit appointment', error)
    return { success: false, error }
  }
}
