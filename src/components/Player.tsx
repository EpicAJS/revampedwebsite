"use client";

import Link from "next/link";
import { useState } from "react";
import { usePlayer } from "@/lib/player";
import { formatTime } from "@/lib/time";
import AlbumArt from "./AlbumArt";
import { PauseIcon, PlayIcon } from "./PlayButton";

export default function Player() {
  const { current, isPlaying, progress, toggle, seek } = usePlayer();
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(70);

  const pct = current ? Math.min(100, (progress / current.duration) * 100) : 0;

  return (
    <footer
      className="shrink-0 border-t border-[var(--border)] bg-black px-3 sm:px-4 flex items-center gap-4"
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
        <div className="flex items-center gap-4 sm:gap-5">
          <IconButton
            label="Shuffle"
            active={shuffle}
            onClick={() => setShuffle((v) => !v)}
          >
            <path d="M16 3h5v5h-2V6.4l-4.3 4.3-1.4-1.4L17.6 5H16V3zM3 5h4.6l3 3-1.4 1.4L7 7H3V5zm14 9.6V13h2v5h-5v-2h1.6l-3.3-3.3 1.4-1.4 3.3 3.3zM3 17h4l9-9 1.4 1.4-9.6 9.6H3v-2z" />
          </IconButton>

          <IconButton label="Restart track" onClick={() => seek(0)}>
            <path d="M7 6h2v12H7zM18 6v12l-8-6z" />
          </IconButton>

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

          <IconButton
            label="Skip to end"
            onClick={() => current && seek(current.duration)}
          >
            <path d="M15 6h2v12h-2zM6 6l8 6-8 6z" />
          </IconButton>

          <IconButton
            label="Repeat"
            active={repeat}
            onClick={() => setRepeat((v) => !v)}
          >
            <path d="M7 7h9v2.6L20 6l-4-3.6V5H5v6h2V7zm10 10H8v-2.6L4 18l4 3.6V19h11v-6h-2v4z" />
          </IconButton>
        </div>

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
            className="flex-1 h-1 appearance-none rounded-full accent-white disabled:opacity-40"
            style={{
              background: `linear-gradient(to right, var(--text) ${pct}%, #4d4d4d ${pct}%)`,
            }}
          />
          <span className="text-[11px] text-faint tabular-nums w-9">
            {current ? formatTime(current.duration) : "0:00"}
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-end gap-2 w-[30%]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-muted shrink-0"
          aria-hidden
        >
          <path d="M4 9h3l4-4v14l-4-4H4V9zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" />
        </svg>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
          className="w-24 h-1 appearance-none rounded-full accent-white"
          style={{
            background: `linear-gradient(to right, var(--text) ${volume}%, #4d4d4d ${volume}%)`,
          }}
        />
      </div>
    </footer>
  );
}

function IconButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`transition-colors ${
        active ? "text-accent" : "text-muted hover:text-white"
      }`}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        {children}
      </svg>
    </button>
  );
}
