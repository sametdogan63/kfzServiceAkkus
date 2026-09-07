# KFZ Service Akkus

Vue-3-Website für KFZ Service Akkus mit einer geschützten Terminverwaltung.

## Entwicklung

- Node.js 22 oder neuer verwenden; `.nvmrc` legt Node 22 fest.
- `npm ci` installiert die Versionen aus dem eingecheckten Lockfile.
- `npm run dev`
- `npm test` prüft Komponenten und Terminlogik.
- `npm run build` erstellt Client-Assets und vorgerenderte HTML-Seiten in `dist`.
- `npm run preview` zeigt den Produktionsbuild lokal.

Nach der ersten Installation: `npx playwright install chromium`. Danach prüft `npm run test:browser` Desktop, Mobilgeräte, Tastaturbedienung, WCAG-Regeln und simulierte Terminanfragen. Vorher `npm run build` ausführen. Screenshots und Fehler-Traces liegen im ignorierten Ordner `test-results`.

Die Browsertests verwenden einen eigenen lokalen Server und abgefangene Aufrufe an eine Testdomain. Sie schreiben keine Termine in Supabase. Echte Datenbankregeln, E-Mail-Zustellung und die konkrete Hosting-Konfiguration benötigen zusätzlich einen Test im Staging-System.

## Konfiguration und SEO

Die Variablen stehen in `.env.example`. `VITE_SITE_URL` muss die endgültige HTTPS-Domain ohne Unterpfad sein. Ohne diesen Wert werden bewusst keine Canonicals und keine Sitemap erzeugt; die Seiten erhalten `noindex`. Vercel-Produktionsbuilds brechen bei fehlender Domain ab. Preview-Deployments erhalten ebenfalls `noindex`.

Öffentliche Seiten werden vorgerendert und unter echten Pfaden wie `/leistungen` ausgeliefert. Vercel verwendet dafür `cleanUrls`; unbekannte Pfade erhalten die vorgerenderte `404.html`. Andere Hoster müssen die Endung `.html` auflösen können und dieselbe 404-Behandlung einrichten. Ein pauschaler SPA-Fallback ist für diese statischen Seiten nicht nötig.

Seitentexte für Suchmaschinen liegen in `src/config/pageMetadata.js`, die gemeinsamen Kontakt- und Strukturdaten in `src/config/businessInfo.js`. Das vorhandene Logo dient als Social-Vorschaubild. Schriften werden lokal ausgeliefert. Es gibt keine Analyse- oder Marketingintegration und keinen wirkungslosen Cookie-Auswahldialog mehr.

## Terminverwaltung

- Die Website wird über Vercel bereitgestellt.
- Supabase verwaltet Termine, Authentifizierung und die geschützte interne Terminansicht.
- Neue Termin-Anfragen reservieren den gewählten Zeitraum sofort.
- Bestätigte Termine bleiben blockiert; abgelehnte oder stornierte Termine geben den Zeitraum frei.
- Die Edge Function `send-appointment-status` verschickt Status-E-Mails über Resend.

Weitere Einrichtungsschritte stehen in `PRODUCTION_SETUP.md`.

## Noch durch den Betrieb freizugeben

- Endgültige Domain, Öffnungszeiten (einschließlich Feiertagen), Kontakt- und Leistungsangaben mit dem Google-Unternehmensprofil abgleichen.
- Ein echtes, zur Veröffentlichung freigegebenes Werkstatt- oder Inhaberfoto bereitstellen. Es wurde kein fremder Betrieb als eigener dargestellt. Danach AVIF/WebP, passende Auflösungen, Bildmaße und einen sachlichen Alternativtext verwenden; das Hauptbild nicht lazy laden.
- Tatsächliche Fahrzeugmarken, Einfahrts-/Parkhinweise sowie Reparaturfreigabe und Kostenvoranschläge bestätigen, bevor weitere Zusagen veröffentlicht werden.
- Hostingregionen, Auftragsverarbeitungsverträge, Drittlandtransfers, Aufbewahrung und Rechtsgrundlagen fachkundig prüfen lassen. Die Technikprüfung ersetzt keine Rechtsberatung.
- Die automatisierten Accessibility-Checks ergänzen, nicht ersetzen, einen manuellen Screenreader-Test und eine rechtliche Prüfung der Barrierefreiheit.
