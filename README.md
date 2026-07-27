# KFZ Service Akkus

Vue-3-Website für KFZ Service Akkus mit einer geschützten Terminverwaltung.

## Entwicklung

- `npm install`
- `npm run dev`
- `npm run build`

## Terminverwaltung

- Die Website wird über Vercel bereitgestellt.
- Supabase verwaltet Termine, Authentifizierung und die geschützte interne Terminansicht.
- Neue Termin-Anfragen reservieren den gewählten Zeitraum sofort.
- Bestätigte Termine bleiben blockiert; abgelehnte oder stornierte Termine geben den Zeitraum frei.
- Die Edge Function `send-appointment-status` verschickt Status-E-Mails über Resend.

Weitere Einrichtungsschritte stehen in `PRODUCTION_SETUP.md`.
