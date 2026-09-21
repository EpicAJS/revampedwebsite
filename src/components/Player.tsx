"use client";

import Link from "next/link";
import { usePlayer } from "@/lib/player";
import { formatTime } from "@/lib/time";
import AlbumArt from "./AlbumArt";
import { PauseIcon, PlayIcon } from "./PlayButton";

export default function Player() {
  const { current, isPlaying, progress, toggle, seek } = usePlayer();

  const pct = current ? Math.min(100, (progress / current.duration) * 100) : 0;

  return (
    <footer
      className="shrink-0 border-t border-[var(--border)] bg-black px-4 flex items-center gap-4"
      style={{ height: "var(--player-height)" }}
    >
      <div className="flex items-center gap-3 min-w-0 w-[30%]">
        {current ? (
          <>
            <AlbumArt
              art={current.art}
              image={current.image}
              label={current.title}
              sizes="48px"
              className="w-12 h-12 shrink-0"
            />
            <div className="min-w-0">
              <Link
                href={current.href}
                className="block text-sm font-semibold truncate hover:underline"
              >
                {current.title}
              </Link>
              <p className="text-xs text-muted truncate">{current.subtitle}</p>
            </div>
          </>
        ) : (
          <p className="text-xs text-faint truncate">
            Pick a track to start listening
          </p>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center gap-1.5 max-w-2xl">
        <button
          type="button"
          onClick={toggle}
          disabled={!current}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="grid place-items-center w-9 h-9 rounded-full bg-white text-black transition hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
        >
          <span className={isPlaying ? "" : "translate-x-[1px]"}>
            {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
          </span>
        </button>

        <div className="hidden sm:flex items-center gap-2 w-full">
          <span className="text-[11px] text-faint tabular-nums w-9 text-right">
            {formatTime(progress)}
          </span>
          <input
            type="range"
            min={0}
            max={current?.duration ?? 100}
            value={progress}
            disabled={!current}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label="Seek"
            className="flex-1 h-1 appearance-none rounded-full bg-[#4d4d4d] accent-white disabled:opacity-40"
            style={{
              background: `linear-gradient(to right, var(--text) ${pct}%, #4d4d4d ${pct}%)`,
            }}
          />
          <span className="text-[11px] text-faint tabular-nums w-9">
            {current ? formatTime(current.duration) : "0:00"}
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-end gap-2 w-[30%] text-xs text-faint">
        {current ? "Now playing" : ""}
      </div>
    </footer>
  );
}
