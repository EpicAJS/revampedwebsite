"use client";

import { useState } from "react";

type Field = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  maxLength: number;
};

export default function SubmitForm({
  endpoint,
  fields,
  submitLabel,
  successMessage,
}: {
  endpoint: string;
  fields: Field[];
  submitLabel: string;
  successMessage: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Something went wrong.");
        setStatus("idle");
        return;
      }

      setValues({});
      setStatus("done");
    } catch {
      setError("Network error. Try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-lg bg-elevated p-6">
        <p className="font-bold mb-1">Sent ✓</p>
        <p className="text-sm text-muted mb-4">{successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-bold text-accent hover:underline"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg bg-elevated p-6">
      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <label key={field.name} className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold">
              {field.label}
              {!field.required && (
                <span className="text-muted font-normal"> (optional)</span>
              )}
            </span>
            {field.multiline ? (
              <textarea
                required={field.required}
                maxLength={field.maxLength}
                rows={3}
                placeholder={field.placeholder}
                value={values[field.name] ?? ""}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [field.name]: e.target.value }))
                }
                className="rounded-md bg-black/40 border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-accent resize-y"
              />
            ) : (
              <input
                required={field.required}
                maxLength={field.maxLength}
                placeholder={field.placeholder}
                value={values[field.name] ?? ""}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [field.name]: e.target.value }))
                }
                className="rounded-md bg-black/40 border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-accent"
              />
            )}
          </label>
        ))}

        {/* Honeypot: hidden from people, irresistible to bots. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={values.website ?? ""}
          onChange={(e) =>
            setValues((v) => ({ ...v, website: e.target.value }))
          }
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-black transition hover:bg-[var(--accent-hover)] disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : submitLabel}
          </button>
          <p className="text-xs text-muted">Reviewed before it appears.</p>
        </div>
      </div>
    </form>
  );
}
