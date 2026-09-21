import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabase } from "@/lib/server/supabase";
import { checkRateLimit, hashIp, isBot } from "@/lib/server/guard";

const schema = z.object({
  question: z.string().trim().min(3).max(500),
  askedBy: z.string().trim().max(60).optional().or(z.literal("")),
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
      { error: "Questions need to be between 3 and 500 characters." },
      { status: 400 }
    );
  }

  // Silently accept bot submissions so they don't learn what tripped them.
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

  const { error } = await supabase.from("questions").insert({
    question: parsed.data.question,
    asked_by: parsed.data.askedBy?.trim() || null,
  });

  if (error) {
    // Never surface the database error text to the client.
    return NextResponse.json(
      { error: "Could not save that question. Try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
