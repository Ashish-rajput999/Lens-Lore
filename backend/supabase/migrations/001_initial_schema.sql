create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  username text unique,
  avatar_url text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.lookbooks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  description text,
  is_public boolean not null default false,
  canvas_data jsonb not null default '{}'::jsonb,
  thumbnail_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.lookbook_items (
  id uuid primary key default gen_random_uuid(),
  lookbook_id uuid not null references public.lookbooks (id) on delete cascade,
  product_sanity_id text not null,
  x numeric(10, 2) not null,
  y numeric(10, 2) not null,
  width numeric(10, 2) not null,
  height numeric(10, 2) not null,
  z_index integer not null default 0
);

create table if not exists public.saved_articles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  article_sanity_id text not null,
  saved_at timestamptz not null default timezone('utc', now()),
  unique (user_id, article_sanity_id)
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  product_sanity_id text not null,
  quantity integer not null default 1 check (quantity > 0),
  added_at timestamptz not null default timezone('utc', now()),
  unique (user_id, product_sanity_id)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  stripe_session_id text not null unique,
  items jsonb not null default '[]'::jsonb,
  total numeric(10, 2) not null default 0,
  status text not null default 'pending',
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_lookbooks_updated_at on public.lookbooks;
create trigger set_lookbooks_updated_at
before update on public.lookbooks
for each row
execute function public.set_updated_at();

alter table public.users enable row level security;
alter table public.lookbooks enable row level security;
alter table public.lookbook_items enable row level security;
alter table public.saved_articles enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;

drop policy if exists "users_manage_own_profile" on public.users;
create policy "users_manage_own_profile"
on public.users
for all
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "public_read_lookbooks" on public.lookbooks;
create policy "public_read_lookbooks"
on public.lookbooks
for select
using (is_public = true or auth.uid() = user_id);

drop policy if exists "owners_manage_lookbooks" on public.lookbooks;
create policy "owners_manage_lookbooks"
on public.lookbooks
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "public_read_lookbook_items" on public.lookbook_items;
create policy "public_read_lookbook_items"
on public.lookbook_items
for select
using (
  exists (
    select 1
    from public.lookbooks
    where lookbooks.id = lookbook_items.lookbook_id
      and (lookbooks.is_public = true or lookbooks.user_id = auth.uid())
  )
);

drop policy if exists "owners_manage_lookbook_items" on public.lookbook_items;
create policy "owners_manage_lookbook_items"
on public.lookbook_items
for all
using (
  exists (
    select 1
    from public.lookbooks
    where lookbooks.id = lookbook_items.lookbook_id
      and lookbooks.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.lookbooks
    where lookbooks.id = lookbook_items.lookbook_id
      and lookbooks.user_id = auth.uid()
  )
);

drop policy if exists "owners_manage_saved_articles" on public.saved_articles;
create policy "owners_manage_saved_articles"
on public.saved_articles
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "owners_manage_cart" on public.cart_items;
create policy "owners_manage_cart"
on public.cart_items
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "owners_read_orders" on public.orders;
create policy "owners_read_orders"
on public.orders
for select
using (auth.uid() = user_id);

drop policy if exists "service_role_manage_orders" on public.orders;
create policy "service_role_manage_orders"
on public.orders
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
