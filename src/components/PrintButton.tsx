"use client";

/**
 * Prints the recruiter view itself. Deliberately not a link to a PDF — the
 * uploaded résumé carries a phone number and isn't published on the site.
 */
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-700 transition-colors"
    >
      Print / Save as PDF
    </button>
  );
}
