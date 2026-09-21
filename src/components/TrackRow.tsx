"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePlayer } from "@/lib/player";
import { parseDuration } from "@/lib/time";
import { trackDuration, type Track } from "@/content/tracks";
import { EqualizerBars, PlayIcon } from "./PlayButton";

export default function TrackRow({
  track,
  index,
}: {
  track: Track;
  index: number;
}) {
  const router = useRouter();
  const { play, isCurrent } = usePlayer();
  const playing = isCurrent(track.id);
  const duration = trackDuration(track);

  const nowPlaying = {
    id: track.id,
    title: track.title,
    subtitle: track.org,
    href: `/track/${track.id}`,
    art: track.art,
    image: track.image,
    duration: parseDuration(duration),
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/track/${track.id}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter") router.push(`/track/${track.id}`);
      }}
      className="group grid grid-cols-[28px_1fr_auto] sm:grid-cols-[28px_1fr_minmax(0,22%)_56px] items-center gap-4 px-4 py-2.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
    >
      <div className="grid place-items-center text-sm text-muted tabular-nums">
        <span className="group-hover:hidden">
          {playing ? <EqualizerBars /> : index + 1}
        </span>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            play(nowPlaying);
          }}
          aria-label={`Play ${track.title}`}
          className="hidden group-hover:grid place-items-center text-white"
        >
          <PlayIcon size={14} />
        </button>
      </div>

      <div className="min-w-0">
        <p
          className={`text-sm font-semibold truncate ${
            playing ? "text-accent" : "text-white"
          }`}
        >
          {track.title}
        </p>
        <p className="text-xs text-muted truncate">
          {track.role} · {track.org}
        </p>
      </div>

      <p className="hidden sm:block text-xs text-muted truncate">
        {track.dates}
      </p>

      <div className="flex items-center justify-end gap-3">
        <Link
          href={`/track/${track.id}`}
          onClick={(event) => event.stopPropagation()}
          className="hidden group-hover:inline text-xs text-muted hover:text-white"
          aria-label={`Open ${track.title}`}
        >
          →
        </Link>
        <span className="text-xs text-muted tabular-nums">{duration}</span>
      </div>
    </div>
  );
}
