export const pageMetadata = {
  '/': { title: 'KFZ Service Akkus in Essen | Kfz-Meisterbetrieb', description: 'KFZ Service Akkus in Essen: Wartung, Reparatur und Fahrzeugdiagnose vom Meisterbetrieb. Germaniastraße 160. Jetzt Werkstatttermin anfragen.' },
  '/leistungen': { title: 'Werkstattleistungen in Essen', description: 'Inspektion, Wartung, Reparatur, Diagnose, Reifenwechsel und Klimaservice bei KFZ Service Akkus in Essen. Entdecken Sie unsere Werkstattleistungen.' },
  '/ueber-uns': { title: 'Sefkan Akkus und unsere Werkstatt', description: 'Lernen Sie KFZ Service Akkus in Essen kennen: Inhaber Sefkan Akkus, Kfz-Meister der Handwerkskammer Düsseldorf und seit 2022 selbstständig.' },
  '/termin': { title: 'Werkstatttermin in Essen anfragen', description: 'Fragen Sie Ihren Wunschtermin bei KFZ Service Akkus an. Leistung und Zeitpunkt auswählen; die Werkstatt bestätigt Ihren Termin per E-Mail.' },
  '/kontakt': { title: 'Kontakt, Anfahrt und Öffnungszeiten', description: 'KFZ Service Akkus, Germaniastraße 160, 45355 Essen. Telefon +49 176 23141582. Mo–Fr 08–18 Uhr, Sa 08–13 Uhr. Kontakt und Anfahrt.' },
  '/bewertungen': { title: 'Kundenbewertungen', description: 'Informationen zu Kundenbewertungen von KFZ Service Akkus in Essen und Kontaktmöglichkeiten für Ihre Erfahrungen mit unserer Werkstatt.' },
  '/faq': { title: 'Häufige Fragen zum Werkstattbesuch', description: 'Antworten auf häufige Fragen zu Terminanfragen und Werkstattleistungen bei KFZ Service Akkus in Essen.' },
  '/impressum': { title: 'Impressum', description: 'Anbieterkennzeichnung und Kontaktdaten von KFZ Service Akkus, Inhaber Sefkan Akkus, in Essen.' },
  '/datenschutz': { title: 'Datenschutzerklärung', description: 'Informationen zur Verarbeitung Ihrer Daten, zu Terminanfragen, eingesetzten Dienstleistern und Ihren Datenschutzrechten.' },
  '/cookies': { title: 'Cookies und lokale Speicherung', description: 'Informationen zu lokal gespeicherten Anmeldedaten und dem Verzicht auf Analyse- und Marketingdienste bei KFZ Service Akkus.' },
  '/intern/termine': { title: 'Interne Terminverwaltung', description: 'Geschützter Betriebszugang für die Terminverwaltung.', noindex: true }
}

export const publicPaths = Object.keys(pageMetadata).filter((path) => !pageMetadata[path].noindex)