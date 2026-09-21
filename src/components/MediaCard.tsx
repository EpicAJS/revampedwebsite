"use client";

import Link from "next/link";
import AlbumArt from "./AlbumArt";
import PlayButton from "./PlayButton";
import type { NowPlaying } from "@/lib/player";

export default function MediaCard({
  href,
  title,
  subtitle,
  art,
  round,
  track,
}: {
  href: string;
  title: string;
  subtitle: string;
  art: [string, string];
  round?: boolean;
  track?: NowPlaying;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-3 rounded-lg bg-card p-4 transition-colors hover:bg-hover"
    >
      <div className="relative">
        <AlbumArt
          art={art}
          label={title}
          className="w-full aspect-square shadow-lg"
          rounded={round ? "rounded-full" : "rounded-md"}
        />
        {track && (
          <div className="absolute bottom-2 right-2 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <PlayButton track={track} size={44} />
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="font-bold truncate">{title}</p>
        <p className="text-sm text-muted clamp-2">{subtitle}</p>
      </div>
    </Link>
  );
}
