"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TopBar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = document.getElementById("main-scroll");
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 flex items-center justify-between gap-4 px-4 sm:px-6 py-3 transition-colors ${
        scrolled ? "bg-[rgba(18,18,18,0.92)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-2">
        <NavArrow direction="back" onClick={() => router.back()} />
        <NavArrow direction="forward" onClick={() => router.forward()} />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <a
          href="/Abhijay_Salvi_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline text-sm font-bold text-muted hover:text-white transition-colors"
        >
          Résumé
        </a>
        <Link
          href="/recruiter"
          className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black transition hover:scale-105"
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
