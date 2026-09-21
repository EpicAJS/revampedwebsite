import "server-only";

import { getSupabase, type Question, type SongSubmission } from "./supabase";

/** Only ever returns rows Abhijay has explicitly published. */
export async function getPublishedQuestions(): Promise<Question[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("status", "published")
    .not("answer", "is", null)
    .order("answered_at", { ascending: false })
    .limit(100);

  if (error) return [];
  return (data as Question[]) ?? [];
}

export async function getPublishedSongs(): Promise<SongSubmission[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) return [];
  return (data as SongSubmission[]) ?? [];
}

/** Admin-only: everything, including the pending queue. */
export async function getAllQuestions(): Promise<Question[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(300);

  return (data as Question[]) ?? [];
}

export async function getAllSongs(): Promise<SongSubmission[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(300);

  return (data as SongSubmission[]) ?? [];
}
