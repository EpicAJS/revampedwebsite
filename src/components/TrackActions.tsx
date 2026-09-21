"use client";

import { useState } from "react";

export default function TrackActions({ title }: { title: string }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked — the URL bar still works.
    }
  }

  return (
    <div className="flex items-center gap-5">
      <button
        type="button"
        onClick={() => setSaved((value) => !value)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${title} from Liked` : `Save ${title}`}
        className={`transition-colors ${
          saved ? "text-accent" : "text-muted hover:text-white"
        }`}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          {saved ? (
            <path d="M12 21s-7.5-4.6-9.5-9A5.3 5.3 0 0 1 12 6.6 5.3 5.3 0 0 1 21.5 12c-2 4.4-9.5 9-9.5 9z" />
          ) : (
            <path d="M12 20.3 10.9 19.3C6 14.9 3 12.2 3 8.9 3 6.3 5 4.3 7.6 4.3c1.5 0 2.9.7 3.8 1.8l.6.8.6-.8c.9-1.1 2.3-1.8 3.8-1.8C19 4.3 21 6.3 21 8.9c0 3.3-3 6-7.9 10.4L12 20.3zm0-2.7c4.3-3.9 6.8-6.2 6.8-8.7 0-1.6-1.2-2.8-2.8-2.8-1 0-2 .5-2.6 1.3L12 9.2l-1.4-1.8c-.6-.8-1.6-1.3-2.6-1.3-1.6 0-2.8 1.2-2.8 2.8 0 2.5 2.5 4.8 6.8 8.7z" />
          )}
        </svg>
      </button>

      <button
        type="button"
        onClick={copyLink}
        aria-label={`Copy link to ${title}`}
        className="text-muted hover:text-white transition-colors text-sm font-bold"
      >
        {copied ? (
          "Link copied"
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="19" cy="12" r="1.8" />
          </svg>
        )}
      </button>
    </div>
  );
}
