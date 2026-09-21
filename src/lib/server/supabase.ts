import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role client. This must never be imported into a client component —
 * "server-only" makes that a build error rather than a silent key leak.
 *
 * The tables have RLS enabled with no public policies, so even the anon key
 * cannot read or write them. All access goes through this module.
 */
let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Missing config is a valid state: the site still builds and the playlists
  // render an empty state instead of crashing.
  if (!url || !key) return null;

  if (!cached) {
    cached = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}

export function isConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export type Question = {
  id: string;
  question: string;
  asked_by: string | null;
  answer: string | null;
  status: "pending" | "published" | "rejected";
  created_at: string;
  answered_at: string | null;
};

export type SongSubmission = {
  id: string;
  title: string;
  artist: string;
  note: string | null;
  submitted_by: string | null;
  status: "pending" | "published" | "rejected";
  created_at: string;
};
