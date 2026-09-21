"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  ADMIN_COOKIE,
  createSessionToken,
  verifyAdminPassword,
  verifySessionToken,
} from "@/lib/server/guard";
import { getSupabase } from "@/lib/server/supabase";

/** Every mutation calls this first. No session, no write. */
async function requireAdmin() {
  const store = await cookies();
  if (!verifySessionToken(store.get(ADMIN_COOKIE)?.value)) {
    throw new Error("Not authorised");
  }
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database not configured");
  return supabase;
}

export async function isAuthed() {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}

export async function login(_prev: unknown, formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!process.env.ADMIN_PASSWORD) {
    return { error: "Admin password is not configured on the server." };
  }

  if (!verifyAdminPassword(password)) {
    // Blunt the brute-force rate a little without a full lockout table.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { error: "Incorrect password." };
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 12 * 60 * 60,
  });

  revalidatePath("/admin");
  return { error: null };
}

export async function logout() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  revalidatePath("/admin");
}

const answerSchema = z.object({
  id: z.string().uuid(),
  answer: z.string().trim().min(1).max(2000),
});

export async function answerQuestion(formData: FormData) {
  const supabase = await requireAdmin();

  const parsed = answerSchema.safeParse({
    id: formData.get("id"),
    answer: formData.get("answer"),
  });
  if (!parsed.success) return;

  await supabase
    .from("questions")
    .update({
      answer: parsed.data.answer,
      status: "published",
      answered_at: new Date().toISOString(),
    })
    .eq("id", parsed.data.id);

  revalidatePath("/admin");
  revalidatePath("/playlist/ama");
}

const statusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["pending", "published", "rejected"]),
});

export async function setQuestionStatus(formData: FormData) {
  const supabase = await requireAdmin();
  const parsed = statusSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) return;

  await supabase
    .from("questions")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.id);

  revalidatePath("/admin");
  revalidatePath("/playlist/ama");
}

export async function setSongStatus(formData: FormData) {
  const supabase = await requireAdmin();
  const parsed = statusSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) return;

  await supabase
    .from("songs")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.id);

  revalidatePath("/admin");
  revalidatePath("/playlist/recommendations");
}

const deleteSchema = z.object({
  id: z.string().uuid(),
  table: z.enum(["questions", "songs"]),
});

export async function deleteItem(formData: FormData) {
  const supabase = await requireAdmin();
  const parsed = deleteSchema.safeParse({
    id: formData.get("id"),
    table: formData.get("table"),
  });
  if (!parsed.success) return;

  await supabase.from(parsed.data.table).delete().eq("id", parsed.data.id);

  revalidatePath("/admin");
  revalidatePath("/playlist/ama");
  revalidatePath("/playlist/recommendations");
}
