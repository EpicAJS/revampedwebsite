import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabase } from "@/lib/server/supabase";
import { checkRateLimit, hashIp, isBot } from "@/lib/server/guard";

const schema = z.object({
  title: z.string().trim().min(1).max(120),
  artist: z.string().trim().min(1).max(120),
  note: z.string().trim().max(280).optional().or(z.literal("")),
  submittedBy: z.string().trim().max(60).optional().or(z.literal("")),
  website: z.string().optional(), // honeypot
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "A song needs both a title and an artist." },
      { status: 400 }
    );
  }

  if (isBot(parsed.data.website)) {
    return NextResponse.json({ ok: true });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Submissions aren't switched on yet. Check back soon." },
      { status: 503 }
    );
  }

  const limit = await checkRateLimit(hashIp(request));
  if (!limit.ok) {
    return NextResponse.json({ error: limit.reason }, { status: 429 });
  }

  const { error } = await supabase.from("songs").insert({
    title: parsed.data.title,
    artist: parsed.data.artist,
    note: parsed.data.note?.trim() || null,
    submitted_by: parsed.data.submittedBy?.trim() || null,
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not save that song. Try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
