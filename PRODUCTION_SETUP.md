# Produktionssetup: Vercel + Supabase

Die Website wird bei Vercel ausgeliefert. Supabase speichert Termine zentral, schützt das Dashboard und liefert die Kalenderauslastung. Kunden sehen dabei nur bestätigte, anonymisierte Zeitblöcke.

## 1. Supabase-Projekt anlegen

1. Ein neues Projekt unter https://supabase.com anlegen.
2. Unter **SQL Editor** eine neue Abfrage oeffnen.
3. Den gesamten Inhalt von `supabase/schema.sql` ausfuehren.
4. Unter **Project Settings > API** die Project URL und den `anon public` Key kopieren.

Der `service_role` Key darf niemals in Vercel oder im Frontend hinterlegt werden.

## 2. Betriebszugang einrichten

1. Unter **Authentication > Users** den Benutzer fuer den Betrieb anlegen, zum Beispiel mit einer separaten Betriebs-E-Mail-Adresse.
2. Die User UUID kopieren.
3. Im SQL Editor ausfuehren:

```sql
insert into public.admin_users (user_id) values ('HIER-UUID-EINFUEGEN');
```

Danach kann sich dieser Benutzer unter `#/intern/termine` anmelden. Jeder andere Supabase-Benutzer bleibt durch die Row-Level-Security von Kundendaten ausgeschlossen.

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
5. Unter **Settings > Environment Variables** fuer Production und Preview hinterlegen:

```text
VITE_SUPABASE_URL=https://DEIN-PROJEKT.supabase.co
VITE_SUPABASE_ANON_KEY=DEIN_ANON_PUBLIC_KEY
```

6. Neu deployen.

Die Werte mit `VITE_` werden in den Browser-Build eingebettet. Das ist fuer Project URL und `anon public` Key vorgesehen. Keine privaten Keys dort eintragen.

## 5. Finale Checks vor dem Livegang

- Testanfrage auf der Live-Domain absenden.
- Im Dashboard mit dem Betriebszugang anmelden.
- Anfrage bestaetigen und pruefen, ob sie im Kalender blockiert wird.
- E-Mail-Bestaetigung und Ablehnung an eine Testadresse pruefen.
- Unter **Authentication > URL Configuration** die Vercel-Domain als Site URL und Redirect URL hinterlegen.
- Rechtliche Texte mit der echten E-Mail-Adresse, Steuer-/Registerdaten und Hosting-Angaben vervollstaendigen.

## Sicherheitsmodell

- Besucher duerfen nur eine Termin-Anfrage anlegen und anonymisierte, bestätigte Zeitblöcke abfragen.
- Das Dashboard liest und bearbeitet Kundendaten nur nach Login und nur bei Eintrag in `admin_users`.
- Die Datenbank verhindert zeitliche Überschneidungen bei bestätigten Terminen direkt per Exclusion Constraint.
- E-Mail-Zugangsdaten liegen nur als Supabase Secrets auf dem Server.
