"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, { error: null });

  return (
    <form
      action={formAction}
      className="mx-auto mt-24 w-full max-w-sm rounded-lg bg-elevated p-8"
    >
      <h1 className="text-2xl font-extrabold mb-1">Admin</h1>
      <p className="text-sm text-muted mb-6">
        Moderate questions and song submissions.
      </p>
      <label className="flex flex-col gap-1.5 mb-4">
        <span className="text-sm font-semibold">Password</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="rounded-md bg-black/40 border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </label>
      {state?.error && (
        <p className="mb-4 text-sm text-red-400">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-accent py-2.5 text-sm font-bold text-black transition hover:bg-[var(--accent-hover)] disabled:opacity-50"
      >
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
