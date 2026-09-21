"use client";

import { usePlayer, type NowPlaying } from "@/lib/player";

export function PlayIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" />
    </svg>
  );
}

export function PauseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
    </svg>
  );
}

export default function PlayButton({
  track,
  size = 48,
  className = "",
}: {
  track: NowPlaying;
  size?: number;
  className?: string;
}) {
  const { play, isCurrent } = usePlayer();
  const playing = isCurrent(track.id);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        play(track);
      }}
      aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
      className={`grid place-items-center rounded-full bg-accent text-black shadow-lg transition hover:scale-105 hover:bg-[var(--accent-hover)] active:scale-95 ${className}`}
      style={{ width: size, height: size }}
    >
      <span className={playing ? "" : "translate-x-[1px]"}>
        {playing ? (
          <PauseIcon size={size * 0.42} />
        ) : (
          <PlayIcon size={size * 0.42} />
        )}
      </span>
    </button>
  );
}

export function EqualizerBars({ size = 14 }: { size?: number }) {
  return (
    <span
      className="flex items-end gap-[2px]"
      style={{ height: size }}
      aria-hidden
    >
      {[0, 0.25, 0.5, 0.15].map((delay, i) => (
        <span
          key={i}
          className="eq-bar w-[2px] rounded-full bg-accent"
          style={{ height: "100%", animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}
