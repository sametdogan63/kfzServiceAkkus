-- Fuege die Stornierung eines bereits bestaetigten Termins als eigenen Status hinzu.
alter type public.appointment_status add value if not exists 'cancelled';
