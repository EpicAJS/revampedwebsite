"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePlayer, type NowPlaying } from "@/lib/player";

/** Roughly how long one line holds the highlight. */
const SECONDS_PER_LINE = 7;

/**
 * Spotify-style synced lyrics. Lines are given time slots weighted by their
 * length, so longer lines hold the highlight longer. Clicking a line seeks to
 * it, the way tapping a lyric does in Spotify.
 */
export default function LyricsPanel({
  lines,
  track,
  art,
}: {
  lines: string[];
  track: NowPlaying;
  art: [string, string];
}) {
  const { current, progress, play, seek } = usePlayer();
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const isCurrentTrack = current?.id === track.id;

  const ranges = useMemo(() => {
    const weights = lines.map((line) => Math.max(24, line.length));
    const total = weights.reduce((sum, w) => sum + w, 0);

    // Track "durations" are months-as-minutes, so spreading a handful of lines
    // across all of Waresport's 16:03 would hold each one for minutes. Lines
    // instead run at a singable pace up front; the last one carries the outro.
    const window = Math.min(track.duration, lines.length * SECONDS_PER_LINE);

    // Running totals, so line N starts where line N-1 ended.
    const offsets = weights.reduce<number[]>(
      (acc, weight) => [...acc, acc[acc.length - 1] + weight],
      [0]
    );

    return weights.map((_, i) => ({
      start: (offsets[i] / total) * window,
      end:
        i === weights.length - 1
          ? track.duration
          : (offsets[i + 1] / total) * window,
    }));
  }, [lines, track.duration]);

  // -1 means "not playing this track", which renders every line fully legible
  // so the page still reads as a portfolio rather than a dimmed lyric sheet.
  const activeIndex = useMemo(() => {
    if (!isCurrentTrack) return -1;
    if (progress >= track.duration) return lines.length - 1;
    const found = ranges.findIndex(
      (range) => progress >= range.start && progress < range.end
    );
    return found === -1 ? 0 : found;
  }, [isCurrentTrack, progress, ranges, track.duration, lines.length]);

  // Keep the active line centred, scrolling only this panel and never the page.
  useEffect(() => {
    if (activeIndex < 0) return;
    const container = containerRef.current;
    const line = lineRefs.current[activeIndex];
    if (!container || !line) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    container.scrollTo({
      top: line.offsetTop - container.clientHeight / 2 + line.clientHeight / 2,
      behavior: calm ? "auto" : "smooth",
    });
  }, [activeIndex]);

  function jumpTo(index: number) {
    if (!isCurrentTrack) play(track);
    seek(ranges[index].start);
  }

  return (
    <section
      className="rounded-lg p-6 sm:p-8"
      style={{
        background: `linear-gradient(160deg, ${art[0]} 0%, ${art[1]} 130%)`,
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-extrabold">Lyrics</h2>
        {isCurrentTrack && (
          <span className="text-xs font-bold uppercase tracking-wide text-white/60">
            Synced
          </span>
        )}
      </div>

      <div
        ref={containerRef}
        className="scroll-area flex flex-col gap-5 max-h-[60vh] overflow-y-auto pr-1"
      >
        {lines.map((line, index) => {
          const isActive = index === activeIndex;
          const dimmed = activeIndex >= 0 && !isActive;

          return (
            <button
              key={line}
              type="button"
              ref={(el) => {
                lineRefs.current[index] = el;
              }}
              onClick={() => jumpTo(index)}
              aria-current={isActive ? "true" : undefined}
              className={`text-left text-xl sm:text-2xl font-bold leading-snug transition-all duration-300 origin-left hover:text-white ${
                isActive
                  ? "text-white scale-[1.02]"
                  : dimmed
                    ? "text-white/40"
                    : "text-white/85"
              }`}
            >
              {line}
            </button>
          );
        })}
      </div>
    </section>
  );
}
