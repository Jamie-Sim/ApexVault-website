-- Apex Vault — signups table
-- Tracks founding-member signups + public-launch waitlist overflow.
-- Run in Supabase SQL editor when provisioning the project.

create extension if not exists "pgcrypto";

create table if not exists public.signups (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  first_name     text not null,
  last_name      text not null,
  email          text not null unique,
  status         text not null default 'pending_payment'
                   check (status in ('pending_payment', 'waitlist', 'paid', 'refunded')),
  phone          text,
  tier_interest  text,
  notes          text
);

create index if not exists signups_status_idx on public.signups (status);
create index if not exists signups_created_at_idx on public.signups (created_at desc);

-- Service-role key bypasses RLS, but enable it so the anon key can never read
-- the table directly from a browser.
alter table public.signups enable row level security;
