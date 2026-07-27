-- Offene Anfragen reservieren den Zeitraum bis zur Entscheidung des Betriebs.
create or replace function public.get_calendar_bookings(p_start date, p_end date)
returns table (appointment_date date, slot time, duration_minutes integer)
language sql
security definer
set search_path = public
stable
as $$
  select a.appointment_date, a.slot, a.duration_minutes
  from public.appointments a
  where a.status in ('pending', 'confirmed')
    and a.appointment_date >= p_start
    and a.appointment_date <= p_end;
$$;

create or replace function public.submit_appointment(
  p_name text,
  p_phone text,
  p_email text,
  p_vehicle text,
  p_model text,
  p_year integer,
  p_license text,
  p_service text,
  p_appointment_date date,
  p_slot time,
  p_duration_minutes integer,
  p_message text
)
returns public.appointments
language plpgsql
security definer
set search_path = public
as $$
declare
  new_appointment public.appointments;
  start_value timestamp;
begin
  if p_appointment_date < current_date then
    raise exception 'Termin darf nicht in der Vergangenheit liegen.';
  end if;

  if p_duration_minutes < 30 or p_duration_minutes > 480 then
    raise exception 'Ungueltige Termindauer.';
  end if;

  start_value := p_appointment_date + p_slot;

  -- Serialisiert Anfragen eines Tages, damit zeitgleiche Buchungen nicht beide angenommen werden.
  perform pg_advisory_xact_lock(hashtext(p_appointment_date::text));

  if exists (
    select 1
    from public.appointments a
    where a.status in ('pending', 'confirmed')
      and tsrange(a.starts_at, a.ends_at, '[)') && tsrange(
        start_value,
        start_value + make_interval(mins => p_duration_minutes),
        '[)'
      )
  ) then
    raise exception 'Der gewaehlte Zeitraum wurde inzwischen reserviert. Bitte waehlen Sie einen anderen Slot.'
      using errcode = '23P01';
  end if;

  insert into public.appointments (
    name, phone, email, vehicle, model, year, license, service,
    appointment_date, slot, duration_minutes, starts_at, ends_at, message
  ) values (
    trim(p_name), trim(p_phone), lower(trim(p_email)), trim(p_vehicle), trim(p_model), p_year,
    nullif(trim(coalesce(p_license, '')), ''), trim(p_service), p_appointment_date, p_slot,
    p_duration_minutes, start_value, start_value + make_interval(mins => p_duration_minutes),
    nullif(trim(coalesce(p_message, '')), '')
  ) returning * into new_appointment;

  return new_appointment;
end;
$$;