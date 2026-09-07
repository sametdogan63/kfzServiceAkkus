# Produktionssetup: Vercel + Supabase

Die Website wird bei Vercel ausgeliefert. Supabase speichert Termine zentral, schützt das Dashboard und liefert reservierte und bestätigte Zeitblöcke ohne Kundendaten. Node.js 22 ist für Build und CI vorgesehen.

## Bestehendes Projekt aktualisieren

1. Vor dem Frontend-Deployment die Migration `supabase/migrations/20260907000000_optional_appointment_details.sql` über den SQL Editor oder den etablierten Supabase-Migrationsworkflow ausführen. Sie macht Telefon, Modell und Baujahr optional und löscht keine Daten. Vorhandene Buchungen bleiben unverändert. Das vollständige Schema nicht erneut auf eine bestehende Datenbank anwenden.
2. Auf Vercel Node.js 22 und `VITE_SITE_URL` auf die endgültige HTTPS-Domain ohne Pfad einstellen. Dieser öffentliche Wert ist kein Geheimnis. Ohne ihn bricht der Produktionsbuild ab; lokale Builds bleiben `noindex`.
3. `npm ci`, `npm test`, `npm run build` und `npm run test:browser` ausführen. Für den ersten Browserlauf `npx playwright install chromium` ausführen.
4. Nach dem Deployment direkte Aufrufe von `/kontakt`, `/termin` und `/intern/termine` sowie eine unbekannte URL prüfen. Die unbekannte URL muss HTTP 404 liefern. Alte Links mit `/#/termin` werden im Browser auf `/termin` umgestellt.
5. Eine Testanfrage ohne Telefon, Modell und Baujahr im Staging-System speichern und die Status-E-Mail prüfen. Erst danach das Frontend für Kunden freigeben.

## 1. Supabase-Projekt anlegen

1. Ein neues Projekt unter https://supabase.com anlegen.
2. Unter **SQL Editor** eine neue Abfrage öffnen.
3. Den gesamten Inhalt von `supabase/schema.sql` ausführen.
4. Unter **Project Settings > API** die Project URL und den `anon public` Key kopieren.

Der `service_role` Key darf niemals in Vercel oder im Frontend hinterlegt werden.

## 2. Betriebszugang einrichten

1. Unter **Authentication > Users** den Benutzer für den Betrieb anlegen, zum Beispiel mit einer separaten Betriebs-E-Mail-Adresse.
2. Die User UUID kopieren.
3. Im SQL Editor ausfuehren:

```sql
insert into public.admin_users (user_id) values ('HIER-UUID-EINFUEGEN');
```

Danach kann sich dieser Benutzer unter `/intern/termine` anmelden. Jeder andere Supabase-Benutzer bleibt durch die Row-Level-Security von Kundendaten ausgeschlossen.

## 3. E-Mail-Versand aktivieren

Der E-Mail-Versand verwendet eine Supabase Edge Function und Resend.

1. Bei https://resend.com ein Konto und eine verifizierte Absender-Domain einrichten.
2. Supabase CLI installieren und im Projekt bei Supabase anmelden.
3. Die Funktion deployen:

```bash
supabase functions deploy send-appointment-status
```

4. Die Secrets im Supabase-Projekt hinterlegen:

```bash
supabase secrets set RESEND_API_KEY=DEIN_RESEND_KEY
supabase secrets set APPOINTMENT_SENDER_EMAIL="KfzServiceAkkus <termine@deine-domain.de>"
```

Ohne diese Einrichtung werden Termine trotzdem zentral gespeichert. Bei einer Entscheidung zeigt das Dashboard dann an, dass der E-Mail-Versand fehlgeschlagen ist.

## 4. Vercel verbinden

1. Repository in Vercel importieren.
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Unter **Settings > Environment Variables** für Production und Preview hinterlegen:

```text
VITE_SUPABASE_URL=https://DEIN-PROJEKT.supabase.co
VITE_SUPABASE_ANON_KEY=DEIN_ANON_PUBLIC_KEY
VITE_SITE_URL=https://DEINE-ECHTE-DOMAIN.de
```

6. Neu deployen.

Die mitgelieferte `vercel.json` nutzt `cleanUrls` für vorgerenderte HTML-Seiten. Keine pauschale Weiterleitung aller URLs auf `index.html` ergänzen: Dadurch würden falsche Inhalte bzw. Soft-404-Seiten ausgeliefert. `dist/404.html` ist die Fehlerseite. Der Build erstellt eine Sitemap, sobald `VITE_SITE_URL` gesetzt ist. Vercel-Previews sind unabhängig davon `noindex`; für andere Staging-Hoster `VITE_NOINDEX=true` setzen.

Die Werte mit `VITE_` werden in den Browser-Build eingebettet. Das ist für Project URL und `anon public` Key vorgesehen. Keine privaten Keys dort eintragen.

## 5. Finale Checks vor dem Livegang

- Testanfrage auf der Live-Domain absenden.
- Im Dashboard mit dem Betriebszugang anmelden.
- Anfrage bestätigen und prüfen, ob sie im Kalender blockiert wird.
- E-Mail-Bestätigung und Ablehnung an eine Testadresse prüfen.
- Unter **Authentication > URL Configuration** die Vercel-Domain als Site URL und Redirect URL hinterlegen.
- Rechtliche Texte mit der echten E-Mail-Adresse, Steuer-/Registerdaten und Hosting-Angaben vervollstaendigen.
- Öffnungszeiten und Kontaktdaten mit dem Google-Unternehmensprofil abgleichen. Canonicals, Social-Vorschau und `AutoRepair`-Daten auf der echten Domain prüfen und die Sitemap in der Search Console einreichen.
- Datenschutzverträge, Hostingregion, Aufbewahrung und Rechtsgrundlagen fachkundig freigeben lassen. Externe Schriftabrufe und der alte Cookie-Dialog wurden entfernt; Auth-Sitzungen des Betriebs werden weiterhin lokal gespeichert.
- Reale Fotos und konkrete Angaben zu Einfahrt, unterstützten Fahrzeugen und Reparaturfreigabe erst nach Freigabe des Betriebs ergänzen.
- Lighthouse auf dem Produktionshosting messen: Zielwerte LCP <= 2,5 s, INP <= 200 ms, CLS <= 0,1; reale Nutzungsdaten am 75. Perzentil auswerten. Lokale Tests sind kein Nachweis dieser Feldwerte.

## Sicherheitsmodell

- Besucher duerfen nur eine Termin-Anfrage anlegen und reservierte bzw. bestätigte Zeitblöcke ohne Kundendaten abfragen.
- Das Dashboard liest und bearbeitet Kundendaten nur nach Login und nur bei Eintrag in `admin_users`.
- Die Datenbank verhindert Überschneidungen bestätigter Termine per Exclusion Constraint; neue Anfragen reservieren Zeiträume atomar im RPC. Konkurrenzfälle und administrative Verschiebungen zusätzlich im Staging-System prüfen.
- E-Mail-Zugangsdaten liegen nur als Supabase Secrets auf dem Server.
