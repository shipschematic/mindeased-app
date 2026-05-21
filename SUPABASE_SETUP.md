# Supabase Configuration for Mental Health App

## Setup Instructions

1. Create a new Supabase project at https://supabase.com
2. Copy your project URL and anon key
3. Update `src/execute/env.ts` with your credentials:

```typescript
export const ENV = {
  SUPABASE_URL: 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: 'your-anon-key',
}
```

## Database Schema

Run this SQL in your Supabase SQL Editor:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth)
create table profiles (
  id uuid references auth.users not null primary key,
  name text,
  avatar text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Mood logs table
create table mood_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  mood text not null,
  reasons text[] default '{}',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Challenges table
create table challenges (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id),
  title text not null,
  description text not null,
  type text not null,
  category text not null,
  steps jsonb not null,
  current_step integer default 0,
  status text default 'not_started',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone
);

-- Journals table
create table journals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  type text not null,
  title text not null,
  content text not null,
  mood text,
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Therapists table
create table therapists (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  specialty text[] not null,
  avatar text,
  bio text,
  available boolean default true,
  rating numeric default 0,
  reviews integer default 0
);

-- Appointments table
create table appointments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  therapist_id uuid references therapists(id) not null,
  date timestamp with time zone not null,
  time text not null,
  status text default 'pending',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Community posts table
create table posts (
  id uuid default uuid_generate_v4() primary key,
  author_id uuid references profiles(id) not null,
  content text not null,
  images text[] default '{}',
  video text,
  likes integer default 0,
  comments integer default 0,
  channel text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Community channels table
create table channels (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  members integer default 0,
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Achievements table
create table achievements (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  title text not null,
  description text not null,
  icon text,
  unlocked boolean default false,
  unlocked_at timestamp with time zone
);

-- Indexes for performance
create index mood_logs_user_id_idx on mood_logs(user_id);
create index mood_logs_created_at_idx on mood_logs(created_at);
create index challenges_user_id_idx on challenges(user_id);
create index journals_user_id_idx on journals(user_id);
create index posts_author_id_idx on posts(author_id);
create index appointments_user_id_idx on appointments(user_id);

-- Row Level Security (RLS) Policies
alter table profiles enable row level security;
alter table mood_logs enable row level security;
alter table challenges enable row level security;
alter table journals enable row level security;
alter table appointments enable row level security;
alter table posts enable row level security;
alter table achievements enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Mood logs policies
create policy "Users can view their own mood logs"
  on mood_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert their own mood logs"
  on mood_logs for insert
  with check (auth.uid() = user_id);

-- Challenges policies
create policy "Users can view their own challenges"
  on challenges for select
  using (auth.uid() = user_id or user_id is null);

create policy "Users can manage their own challenges"
  on challenges for all
  using (auth.uid() = user_id);

-- Journals policies
create policy "Users can view their own journals"
  on journals for select
  using (auth.uid() = user_id);

create policy "Users can manage their own journals"
  on journals for all
  using (auth.uid() = user_id);

-- Appointments policies
create policy "Users can view their own appointments"
  on appointments for select
  using (auth.uid() = user_id);

create policy "Users can create appointments"
  on appointments for insert
  with check (auth.uid() = user_id);

-- Posts policies
create policy "Anyone can view posts"
  on posts for select
  using (true);

create policy "Authenticated users can create posts"
  on posts for insert
  with check (auth.uid() = author_id);

-- Achievements policies
create policy "Users can view their own achievements"
  on achievements for select
  using (auth.uid() = user_id);

-- Functions and Triggers

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger update_profiles_updated_at before update on profiles
  for each row execute procedure update_updated_at_column();

create trigger update_journals_updated_at before update on journals
  for each row execute procedure update_updated_at_column();

-- Function to create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, avatar)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'avatar'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Seed data for therapists
insert into therapists (name, specialty, avatar, bio, available, rating, reviews) values
('Dr. Sarah Johnson', '["Anxiety", "Depression", "Trauma"]', null, 'Licensed clinical psychologist with 10+ years of experience', true, 4.9, 127),
('Dr. Michael Chen', '["Relationships", "Family Therapy"]', null, 'Marriage and family therapist specializing in couples counseling', true, 4.8, 95),
('Dr. Emily Rodriguez', '["Stress Management", "Mindfulness"]', null, 'Clinical psychologist focused on stress reduction and mindfulness-based therapies', true, 4.9, 143),
('Dr. James Wilson', '["PTSD", "Anxiety", "Depression"]', null, 'Trauma specialist with EMDR certification', false, 4.7, 89);

-- Seed data for channels
insert into channels (name, description, members, icon) values
('Mental Wellness', 'General discussion about mental health and wellness', 1250, null),
('Support Group', 'Peer support and encouragement', 890, null),
('Meditation', 'Meditation techniques and experiences', 670, null),
('Therapy Discussion', 'Discuss therapy approaches and experiences', 540, null);
```

## Environment Variables

After setting up Supabase, update these files:

1. **src/execute/env.ts** - Add your Supabase credentials
2. **.env** (create this file) - For local development:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Testing

After setup, test the connection:

```bash
cd mental-health-app
npm start
```

The app will connect to Supabase and authenticate users.
