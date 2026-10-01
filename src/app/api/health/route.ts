import { NextResponse } from "next/server";
import { getSupabase, isConfigured } from "@/lib/server/supabase";

export const dynamic = "force-dynamic";

/**
 * Identifies which kind of Supabase key is configured without revealing it.
 *
 * Using a publishable/anon key here fails silently — RLS blocks every query,
 * so the tables look missing rather than raising an auth error. Naming the
 * key type turns a confusing dead end into an obvious fix.
 */
function classifyKey(key: string | undefined) {
  if (!key) return "missing";
  if (key.startsWith("sb_secret_")) return "secret";
  if (key.startsWith("sb_publishable_")) return "publishable";

  // Legacy keys are JWTs carrying a `role` claim.
  const payload = key.split(".")[1];
  if (payload) {
    try {
      const role = JSON.parse(
        Buffer.from(payload, "base64").toString("utf8")
      )?.role;
      if (role === "service_role") return "service_role";
      if (role === "anon") return "anon";
    } catch {
      // Not a JWT we can read — fall through.
    }
  }
  return "unrecognised";
}

/**
 * Setup diagnostic: says whether the database is wired up and the tables
 * exist, so there's no guessing after setting environment variables.
 *
 * Returns booleans only — never error text, row counts, or anything about
 * the credentials themselves.
 */
export async function GET() {
  const configured = isConfigured();
  const keyType = classifyKey(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!configured) {
    return NextResponse.json({
      configured: false,
      keyType,
      tables: { questions: false, songs: false, submission_log: false },
      adminPasswordSet: Boolean(process.env.ADMIN_PASSWORD),
      appSecretSet: Boolean(process.env.APP_SECRET),
      hint: "Set SUPABASE_URL (https://<project-id>.supabase.co) and SUPABASE_SERVICE_ROLE_KEY, then redeploy.",
    });
  }

  const wrongKey = keyType === "publishable" || keyType === "anon";

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
    keyType,
    tables,
    adminPasswordSet: Boolean(process.env.ADMIN_PASSWORD),
    appSecretSet: Boolean(process.env.APP_SECRET),
    hint: wrongKey
      ? `That's the ${keyType} key — RLS blocks it, so every table reads as missing. Use the secret / service_role key instead.`
      : allReady
        ? "Database is ready."
        : "Connected, but some tables are missing — run supabase/schema.sql.",
  });
}
