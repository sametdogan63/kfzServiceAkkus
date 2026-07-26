-- In Supabase: SQL Editor > New query > gesamtes Skript ausfuehren.
-- Danach unter Authentication > Users den Betriebszugang anlegen und dessen UUID
-- in public.admin_users eintragen.

create extension if not exists btree_gist;

create type public.appointment_status as enum ('pending', 'confirmed', 'declined');

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status public.appointment_status not null default 'pending',
  name text not null check (char_length(name) between 2 and 120),
  phone text not null check (char_length(phone) between 5 and 50),
  email text not null check (char_length(email) between 5 and 255),
  vehicle text not null check (char_length(vehicle) between 2 and 120),
  model text not null check (char_length(model) between 1 and 120),
  year integer not null check (year between 1900 and 2100),
  license text,
  service text not null check (char_length(service) between 2 and 80),
  appointment_date date not null,
  slot time not null,
  duration_minutes integer not null check (duration_minutes between 30 and 480),
  starts_at timestamp not null,
  ends_at timestamp not null,
  message text,
  admin_message text,
  decided_at timestamptz,
  decided_by uuid references auth.users(id),
  constraint appointment_end_after_start check (ends_at > starts_at)
);

-- Zwei bestaetigte Werkstatttermine duerfen sich zeitlich nicht ueberlappen.
alter table public.appointments
  add constraint confirmed_appointments_must_not_overlap
  exclude using gist (tsrange(starts_at, ends_at, '[)') with &&)
  where (status = 'confirmed');

create index appointments_date_status_idx on public.appointments (appointment_date, status);
create index appointments_status_created_idx on public.appointments (status, created_at desc);

create or replace function public.set_appointment_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger appointments_set_updated_at
before update on public.appointments
for each row execute function public.set_appointment_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  );
$$;

alter table public.admin_users enable row level security;
alter table public.appointments enable row level security;

create policy "admins can read their own admin record"
on public.admin_users for select
using (user_id = auth.uid());

create policy "admins can read appointments"
on public.appointments for select
to authenticated
using (public.is_admin());

create policy "admins can update appointments"
on public.appointments for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Die oeffentliche Website bekommt nur bestätigte Blockzeiten, nie Kundendaten.
create or replace function public.get_calendar_bookings(p_start date, p_end date)
returns table (appointment_date date, slot time, duration_minutes integer)
language sql
security definer
set search_path = public
stable
as $$
  select a.appointment_date, a.slot, a.duration_minutes
  from public.appointments a
  where a.status = 'confirmed'
    and a.appointment_date >= p_start
    and a.appointment_date <= p_end;
$$;

grant execute on function public.get_calendar_bookings(date, date) to anon, authenticated;

-- Oeffentliche Anfragen werden ausschliesslich ueber diese Funktion angelegt.
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
    raise exception 'Ungültige Termindauer.';
  end if;

  start_value := p_appointment_date + p_slot;

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

grant execute on function public.submit_appointment(text, text, text, text, text, integer, text, text, date, time, integer, text) to anon, authenticated;

-- Nach dem Anlegen eines Auth-Users dessen UUID hier einsetzen:
-- insert into public.admin_users (user_id) values ('UUID-DES-BETRIEBSZUGANGS');
