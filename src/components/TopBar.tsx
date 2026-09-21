"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TopBar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const el = document.getElementById("main-scroll");
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  function onSearch(event: React.FormEvent) {
    event.preventDefault();
    router.push(query.trim() ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <header
      className={`sticky top-0 z-30 flex items-center gap-3 px-4 sm:px-6 py-3 transition-colors ${
        scrolled ? "bg-[rgba(18,18,18,0.92)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="hidden sm:flex items-center gap-2 shrink-0">
        <NavArrow direction="back" onClick={() => router.back()} />
        <NavArrow direction="forward" onClick={() => router.forward()} />
      </div>

      <div className="flex flex-1 items-center justify-center gap-2 min-w-0">
        <Link
          href="/"
          aria-label="Home"
          className="grid place-items-center w-10 h-10 shrink-0 rounded-full bg-[#1f1f1f] text-white/90 hover:text-white hover:scale-105 transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3.1 2 11v10h7v-6h6v6h7V11L12 3.1z" />
          </svg>
        </Link>

        <form onSubmit={onSearch} className="w-full max-w-[420px] min-w-0">
          <label className="relative flex items-center">
            <span className="sr-only">Search</span>
            <svg
              className="absolute left-3.5 text-white/60"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M10.5 3a7.5 7.5 0 1 1-4.74 13.32l-3.3 3.3a1 1 0 0 1-1.42-1.42l3.3-3.3A7.5 7.5 0 0 1 10.5 3zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you want to play?"
              className="w-full rounded-full bg-[#1f1f1f] border border-transparent hover:border-white/20 focus:border-white/40 py-2.5 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-white/50"
            />
          </label>
        </form>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <Link
          href="/recruiter"
          className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black whitespace-nowrap transition hover:scale-105"
        >
          Recruiter mode
        </Link>
      </div>
    </header>
  );
}

function NavArrow({
  direction,
  onClick,
}: {
  direction: "back" | "forward";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "back" ? "Go back" : "Go forward"}
      className="grid place-items-center w-8 h-8 rounded-full bg-black/60 text-white/80 hover:text-white transition-colors"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        {direction === "back" ? (
          <path d="M15.5 4.5 7 12l8.5 7.5V4.5z" />
        ) : (
          <path d="M8.5 4.5 17 12l-8.5 7.5V4.5z" />
        )}
      </svg>
    </button>
  );
}
