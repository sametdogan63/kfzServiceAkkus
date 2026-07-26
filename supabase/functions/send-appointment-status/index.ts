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

    const { appointmentId, message } = await request.json()
    const { data: appointment, error: appointmentError } = await client
      .from('appointments')
      .select('name, email, service, appointment_date, slot, status')
      .eq('id', appointmentId)
      .single()

    if (appointmentError || !appointment) {
      throw new Error('Termin nicht gefunden.')
    }

    const statusText = appointment.status === 'confirmed' ? 'bestaetigt' : 'abgelehnt'
    const subject = appointment.status === 'confirmed'
      ? `Ihr Termin bei KfzServiceAkkus am ${appointment.appointment_date}`
      : `Rueckmeldung zu Ihrer Terminanfrage bei KfzServiceAkkus`
    const fallback = appointment.status === 'confirmed'
      ? `Ihr Termin fuer ${appointment.service} am ${appointment.appointment_date} um ${appointment.slot} Uhr wurde bestaetigt.`
      : `Leider kann Ihre Anfrage fuer ${appointment.service} am ${appointment.appointment_date} um ${appointment.slot} Uhr nicht bestaetigt werden.`

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: senderAddress,
        to: [appointment.email],
        subject,
        text: `Hallo ${appointment.name},\n\n${message || fallback}\n\nStatus: ${statusText}\n\nKfzServiceAkkus\nGermaniastraße 160, 45355 Essen\nTelefon: 01577 7533784`
      })
    })

    if (!resendResponse.ok) {
      throw new Error('E-Mail konnte nicht versendet werden.')
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || 'Unbekannter Fehler.' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
