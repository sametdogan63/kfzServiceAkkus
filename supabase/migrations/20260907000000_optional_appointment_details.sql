alter table public.appointments
  alter column phone drop not null,
  alter column model drop not null,
  alter column year drop not null;