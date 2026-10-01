import { NextResponse } from "next/server";
import { getSupabase, isConfigured } from "@/lib/server/supabase";

export const dynamic = "force-dynamic";

/**
 * Setup diagnostic: says whether the database is wired up and the tables
 * exist, so there's no guessing after setting environment variables.
 *
 * Returns booleans only — never error text, row counts, or anything about
 * the credentials themselves.
 */
export async function GET() {
  const configured = isConfigured();

  if (!configured) {
    return NextResponse.json({
      configured: false,
      tables: { questions: false, songs: false, submission_log: false },
      adminPasswordSet: Boolean(process.env.ADMIN_PASSWORD),
      appSecretSet: Boolean(process.env.APP_SECRET),
      hint: "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, then redeploy.",
    });
  }

  const supabase = getSupabase();
  const names = ["questions", "songs", "submission_log"] as const;

  const results = await Promise.all(
    names.map(async (table) => {
      if (!supabase) return [table, false] as const;
      const { error } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true });
      return [table, !error] as const;
    })
  );

  const tables = Object.fromEntries(results) as Record<
    (typeof names)[number],
    boolean
  >;
  const allReady = Object.values(tables).every(Boolean);

  return NextResponse.json({
    configured: true,
    tables,
    adminPasswordSet: Boolean(process.env.ADMIN_PASSWORD),
    appSecretSet: Boolean(process.env.APP_SECRET),
    hint: allReady
      ? "Database is ready."
      : "Connected, but some tables are missing — run supabase/schema.sql.",
  });
}
