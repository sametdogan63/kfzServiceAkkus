export const businessInfo = {
  name: 'KFZ Service Akkus',
  telephone: '+49 176 23141582',
  telephoneHref: 'tel:+4917623141582',
  email: 'service@kfz-akkus.de',
  street: 'Germaniastraße 160',
  postalCode: '45355',
  city: 'Essen',
  country: 'DE',
  openingHours: [
    { label: 'Mo–Fr', time: '08:00–18:00 Uhr', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
    { label: 'Sa', time: '08:00–13:00 Uhr', days: ['Saturday'], opens: '08:00', closes: '13:00' }
  ]
}

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${businessInfo.street}, ${businessInfo.postalCode} ${businessInfo.city}`)}`