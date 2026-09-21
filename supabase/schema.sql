-- Schema for abhijaysalvi.com submissions.
-- Run this once in the Supabase SQL editor.
--
-- Security model: RLS is ON for every table and NO policies are created.
-- That means the anon/public key can do nothing at all — not read, not write.
-- The app reaches these tables only from server code using the service role
-- key, which bypasses RLS. If the public key ever leaked, these stay sealed.

-- ---------------------------------------------------------------- AMA
create table if not exists questions (
  id          uuid primary key default gen_random_uuid(),
  question    text not null check (char_length(question) between 3 and 500),
  asked_by    text check (asked_by is null or char_length(asked_by) <= 60),
  answer      text check (answer is null or char_length(answer) <= 2000),
  status      text not null default 'pending'
              check (status in ('pending', 'published', 'rejected')),
  created_at  timestamptz not null default now(),
  answered_at timestamptz
);

create index if not exists questions_status_idx
  on questions (status, answered_at desc);

-- ------------------------------------------------------- Song recommendations
create table if not exists songs (
  id           uuid primary key default gen_random_uuid(),
  title        text not null check (char_length(title) between 1 and 120),
  artist       text not null check (char_length(artist) between 1 and 120),
  note         text check (note is null or char_length(note) <= 280),
  submitted_by text check (submitted_by is null or char_length(submitted_by) <= 60),
  status       text not null default 'pending'
               check (status in ('pending', 'published', 'rejected')),
  created_at   timestamptz not null default now()
);

create index if not exists songs_status_idx
  on songs (status, created_at desc);

-- ------------------------------------------------------------- Rate limiting
-- Stores an HMAC of the client IP, never the address itself.
create table if not exists submission_log (
  id         bigserial primary key,
  ip_hash    text not null,
  created_at timestamptz not null default now()
);

create index if not exists submission_log_lookup_idx
  on submission_log (ip_hash, created_at desc);

-- ------------------------------------------------------------------- Lock down
alter table questions      enable row level security;
alter table songs          enable row level security;
alter table submission_log enable row level security;

-- Deliberately no policies. Service role bypasses RLS; everyone else is denied.

-- Optional housekeeping: drop rate-limit rows older than a day.
-- Schedule with pg_cron if you want it automatic.
-- delete from submission_log where created_at < now() - interval '1 day';
