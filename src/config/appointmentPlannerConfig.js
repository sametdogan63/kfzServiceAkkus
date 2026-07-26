export const appointmentPlannerConfig = {
  bookingWindowDays: 28,
  slotIntervalMinutes: 30,
  defaultServiceDurationMinutes: 60,
  weeklySchedule: {
    0: {
      windows: []
    },
    1: {
      windows: [
        { start: '08:00', end: '18:00' }
      ]
    },
    2: {
      windows: [
        { start: '08:00', end: '18:00' }
      ]
    },
    3: {
      windows: [
        { start: '08:00', end: '18:00' }
      ]
    },
    4: {
      windows: [
        { start: '08:00', end: '18:00' }
      ]
    },
    5: {
      windows: [
        { start: '08:00', end: '18:00' }
      ]
    },
    6: {
      windows: [
        { start: '08:00', end: '13:00' }
      ]
    }
  },
  serviceDurationsMinutes: {
    Inspektion: 120,
    'Ölwechsel': 60,
    Reifenservice: 60,
    Bremsenservice: 120,
    Klimaservice: 90,
    'TÜV / AU': 90,
    Diagnose: 90,
    Batterie: 45,
    Fahrwerk: 150,
    Auspuff: 90,
    Kupplung: 240,
    Zahnriemen: 240,
    Unfallreparatur: 180
  }
}
