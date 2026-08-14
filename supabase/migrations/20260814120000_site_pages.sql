-- Apply in a dedicated O360 Supabase project (not Orbit101 / Dental Country).
-- Homepage content currently lives in content/home.ts; this table is the CMS path.

create table if not exists public.site_pages (
  slug text primary key,
  title text not null,
  description text,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_pages enable row level security;

create policy "Public can read pages"
  on public.site_pages
  for select
  to anon, authenticated
  using (true);
