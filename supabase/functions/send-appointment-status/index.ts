import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authorization = request.headers.get('Authorization')
    if (!authorization) {
      return new Response(JSON.stringify({ error: 'Nicht angemeldet.' }), { status: 401, headers: corsHeaders })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const resendApiKey = Deno.env.get('RESEND_API_KEY')!
    const senderAddress = Deno.env.get('APPOINTMENT_SENDER_EMAIL')!
    const client = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authorization } }
    })

    const { data: userData } = await client.auth.getUser()
    if (!userData.user) {
      return new Response(JSON.stringify({ error: 'Nicht angemeldet.' }), { status: 401, headers: corsHeaders })
    }

    const { data: adminRecord } = await client
      .from('admin_users')
      .select('user_id')
      .eq('user_id', userData.user.id)
      .maybeSingle()

    if (!adminRecord) {
      return new Response(JSON.stringify({ error: 'Keine Berechtigung.' }), { status: 403, headers: corsHeaders })
    }

    const { appointmentId, message, notificationType } = await request.json()
    const { data: appointment, error: appointmentError } = await client
      .from('appointments')
      .select('name, email, service, appointment_date, slot, status')
      .eq('id', appointmentId)
      .single()

    if (appointmentError || !appointment) {
      throw new Error('Termin nicht gefunden.')
    }

    const templates = {
      confirmed: {
        status: 'bestaetigt',
        subject: `Ihr Termin bei KfzServiceAkkus am ${appointment.appointment_date}`,
        fallback: `Ihr Termin fuer ${appointment.service} am ${appointment.appointment_date} um ${appointment.slot} Uhr wurde bestaetigt.`
      },
      declined: {
        status: 'abgelehnt',
        subject: 'Rueckmeldung zu Ihrer Terminanfrage bei KfzServiceAkkus',
        fallback: `Leider kann Ihre Anfrage fuer ${appointment.service} am ${appointment.appointment_date} um ${appointment.slot} Uhr nicht bestaetigt werden.`
      },
      cancelled: {
        status: 'storniert',
        subject: 'Ihr Termin bei KfzServiceAkkus wurde storniert',
        fallback: `Ihr Termin fuer ${appointment.service} am ${appointment.appointment_date} um ${appointment.slot} Uhr wurde storniert.`
      },
      rescheduled: {
        status: 'verschoben',
        subject: `Ihr Termin bei KfzServiceAkkus wurde verschoben`,
        fallback: `Ihr Termin fuer ${appointment.service} findet neu am ${appointment.appointment_date} um ${appointment.slot} Uhr statt.`
      }
    }
    const template = templates[notificationType] || templates.confirmed

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: senderAddress,
        to: [appointment.email],
        subject: template.subject,
        text: `Hallo ${appointment.name},\n\n${message || template.fallback}\n\nStatus: ${template.status}\n\nWenn der neue Termin nicht passt oder Sie ihn vollstaendig absagen moechten, antworten Sie bitte auf diese E-Mail.\n\nKfzServiceAkkus\nGermaniastraße 160, 45355 Essen\nTelefon: 01577 7533784`
      })
    })

    if (!resendResponse.ok) {
      throw new Error('E-Mail konnte nicht versendet werden.')
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unbekannter Fehler.'
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
