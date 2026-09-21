import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { getSupabase } from "./supabase";

/** Per-IP submission caps, enforced in the database. */
const WINDOW_MINUTES = 60;
const MAX_PER_WINDOW = 5;

function secret() {
  // Falls back to a build-time constant only when unset; production sets this.
  return process.env.APP_SECRET || "dev-only-insecure-secret";
}

/**
 * Hashes the client IP so the database never stores a raw address.
 * Keyed with APP_SECRET so hashes aren't reversible via a rainbow table.
 */
export function hashIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  const ip = forwarded.split(",")[0].trim() || "unknown";
  return createHmac("sha256", secret()).update(ip).digest("hex");
}

export type GuardResult = { ok: true } | { ok: false; reason: string };

/**
 * Counts recent submissions from this IP hash and records the new one.
 * Fails closed: if the rate-limit table can't be read, the request is rejected.
 */
export async function checkRateLimit(ipHash: string): Promise<GuardResult> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, reason: "Submissions are not configured yet." };

  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();

  const { count, error } = await supabase
    .from("submission_log")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);

  if (error) {
    return { ok: false, reason: "Could not verify the request. Try again later." };
  }

  if ((count ?? 0) >= MAX_PER_WINDOW) {
    return {
      ok: false,
      reason: "That's a lot of submissions — try again in an hour.",
    };
  }

  await supabase.from("submission_log").insert({ ip_hash: ipHash });
  return { ok: true };
}

/** Bots fill in every field they find; humans never see this one. */
export function isBot(honeypot: unknown) {
  return typeof honeypot === "string" && honeypot.trim().length > 0;
}

// ------------------------------------------------------------------ admin auth

const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

/** Constant-time compare that tolerates differing lengths. */
function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verifyAdminPassword(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Hash both sides first so the compare length never leaks the real length.
  return safeEqual(sign(candidate), sign(expected));
}

export function createSessionToken() {
  const expires = Date.now() + SESSION_TTL_MS;
  return `${expires}.${sign(String(expires))}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (Number(expires) < Date.now()) return false;
  return safeEqual(sign(expires), signature);
}

export const ADMIN_COOKIE = "admin_session";
