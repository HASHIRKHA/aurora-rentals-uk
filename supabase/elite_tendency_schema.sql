-- Elite Tendency: single-run schema (Supabase/Postgres)
create extension if not exists "uuid-ossp";
create extension if not exists pg_trgm;
create extension if not exists cube;
create extension if not exists earthdistance;

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email varchar(255) unique not null,
  full_name varchar(255) not null,
  user_type varchar(50) not null check (user_type in ('landlord','tenant','admin','corporate')),
  phone varchar(20),
  city varchar(100),
  postcode varchar(10),
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists properties (
  id uuid primary key default uuid_generate_v4(),
  landlord_id uuid not null references users(id) on delete cascade,
  title varchar(255) not null,
  slug varchar(255) unique,
  description text,
  price_pcm numeric(10,2) not null check(price_pcm > 0),
  bedrooms int not null check (bedrooms > 0),
  bathrooms numeric(3,1) not null,
  address text not null,
  city varchar(100),
  postcode varchar(10) not null,
  latitude numeric(10,8),
  longitude numeric(11,8),
  total_sqft int,
  images jsonb default '[]'::jsonb,
  amenities jsonb default '[]'::jsonb,
  pet_friendly boolean default false,
  furnished varchar(50) default 'unfurnished' check (furnished in ('furnished','unfurnished','part-furnished')),
  status varchar(50) default 'draft' check (status in ('draft','published','occupied','archived','pending_approval')),
  featured boolean default false,
  view_count int default 0,
  application_count int default 0,
  average_rating numeric(3,2),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  published_at timestamptz
);

create table if not exists viewing_requests (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references properties(id) on delete cascade,
  user_id uuid references users(id) on delete set null,
  visitor_name varchar(255) not null,
  visitor_email varchar(255) not null,
  visitor_phone varchar(20) not null,
  requested_date date not null,
  requested_time time,
  status varchar(50) default 'pending' check (status in ('pending','confirmed','completed','cancelled','no_show')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists applications (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references properties(id) on delete cascade,
  applicant_id uuid not null references users(id) on delete cascade,
  landlord_id uuid not null references users(id) on delete cascade,
  status varchar(50) default 'draft' check (status in ('draft','submitted','reviewing','approved','rejected','withdrawn')),
  annual_income numeric(12,2),
  aros_qualification_score numeric(5,2),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists inquiries (
  id uuid primary key default uuid_generate_v4(),
  inquiry_type varchar(50) not null,
  full_name varchar(255) not null,
  email varchar(255) not null,
  phone varchar(20),
  message text,
  aros_lead_score numeric(5,2),
  status varchar(50) default 'new' check (status in ('new','contacted','qualified','converted','archived','spam')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  author_name varchar(255) not null,
  author_type varchar(50) not null check (author_type in ('landlord','tenant','investor')),
  content text not null,
  rating int check (rating between 1 and 5),
  status varchar(50) default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title varchar(255) not null,
  slug varchar(255) unique not null,
  content text not null,
  author_id uuid not null references users(id) on delete cascade,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists analytics_events (
  id uuid primary key default uuid_generate_v4(),
  event_type varchar(100) not null,
  event_name varchar(100),
  event_data jsonb default '{}'::jsonb,
  user_id uuid references users(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, property_id)
);

create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references properties(id) on delete cascade,
  tenant_id uuid not null references users(id) on delete cascade,
  landlord_id uuid not null references users(id) on delete cascade,
  amount numeric(12,2) not null,
  payment_type varchar(50) not null,
  status varchar(50) default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  sender_id uuid not null references users(id) on delete cascade,
  recipient_id uuid not null references users(id) on delete cascade,
  content text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

create table if not exists leases (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references properties(id) on delete cascade,
  tenant_id uuid not null references users(id) on delete cascade,
  landlord_id uuid not null references users(id) on delete cascade,
  lease_term_start_date date not null,
  lease_term_end_date date not null,
  monthly_rent numeric(10,2) not null,
  status varchar(50) default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists activity_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  action_type varchar(100) not null,
  resource_type varchar(50),
  resource_id varchar(255),
  description text,
  created_at timestamptz default now()
);

create index if not exists idx_properties_status on properties(status);
create index if not exists idx_properties_city on properties(city);
create index if not exists idx_properties_price on properties(price_pcm);
create index if not exists idx_properties_search on properties using gin(to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,'')));
create index if not exists idx_properties_geo on properties using gist(ll_to_earth(latitude, longitude));
create index if not exists idx_inquiries_status on inquiries(status);
create index if not exists idx_apps_status on applications(status);
create index if not exists idx_viewing_date on viewing_requests(requested_date);

create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_users_updated before update on users for each row execute function set_updated_at();
create trigger trg_properties_updated before update on properties for each row execute function set_updated_at();
create trigger trg_viewing_updated before update on viewing_requests for each row execute function set_updated_at();
create trigger trg_apps_updated before update on applications for each row execute function set_updated_at();
create trigger trg_inquiries_updated before update on inquiries for each row execute function set_updated_at();
create trigger trg_testimonials_updated before update on testimonials for each row execute function set_updated_at();
create trigger trg_blog_updated before update on blog_posts for each row execute function set_updated_at();
create trigger trg_payments_updated before update on payments for each row execute function set_updated_at();
create trigger trg_leases_updated before update on leases for each row execute function set_updated_at();

alter table users enable row level security;
alter table properties enable row level security;
alter table inquiries enable row level security;

drop policy if exists "published properties visible" on properties;
create policy "published properties visible" on properties for select using (status = 'published' or auth.uid() = landlord_id);

drop policy if exists "landlord manage own properties" on properties;
create policy "landlord manage own properties" on properties for all using (auth.uid() = landlord_id);

insert into users (email, full_name, user_type) values ('admin@elitetendency.co.uk','Elite Tendency Admin','admin') on conflict (email) do nothing;

-- end
