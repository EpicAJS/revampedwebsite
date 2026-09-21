"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { tracks } from "@/content/tracks";
import { albums, playlists } from "@/content/albums";
import AlbumArt from "@/components/AlbumArt";
import MediaCard from "@/components/MediaCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return tracks.filter((track) =>
      [track.title, track.org, track.role, track.summary, ...track.tech]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [q]);

  const browse = [
    ...albums.map((a) => ({
      href: `/album/${a.id}`,
      title: a.title,
      subtitle: `${a.tracks.length} tracks`,
      art: a.art,
    })),
    ...playlists.map((p) => ({
      href: p.href,
      title: p.title,
      subtitle: "Playlist",
      art: p.art,
    })),
  ];

  return (
    <div className="px-4 sm:px-6 pt-2 pb-10">
      <label className="relative block max-w-md mb-8">
        <span className="sr-only">Search</span>
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-black/60"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M10.5 3a7.5 7.5 0 1 1-4.74 13.32l-3.3 3.3a1 1 0 0 1-1.42-1.42l3.3-3.3A7.5 7.5 0 0 1 10.5 3zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z" />
        </svg>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="What do you want to look at?"
          className="w-full rounded-full bg-white py-3 pl-11 pr-4 text-black placeholder:text-black/50 font-medium"
        />
      </label>

      {q ? (
        <section>
          <h2 className="text-2xl font-extrabold mb-4">
            {results.length} result{results.length === 1 ? "" : "s"}
          </h2>
          {results.length === 0 ? (
            <p className="text-muted">
              Nothing matched “{query}”. Try a language, a company, or a
              technology.
            </p>
          ) : (
            <div className="flex flex-col">
              {results.map((track) => (
                <Link
                  key={track.id}
                  href={`/track/${track.id}`}
                  className="flex items-center gap-4 rounded-md p-2 hover:bg-white/10 transition-colors"
                >
                  <AlbumArt
                    art={track.art}
                    label={track.title}
                    className="w-12 h-12 shrink-0"
                  />
                  <span className="min-w-0">
                    <span className="block font-semibold truncate">
                      {track.title}
                    </span>
                    <span className="block text-sm text-muted truncate">
                      {track.role} · {track.org}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      ) : (
        <section>
          <h2 className="text-2xl font-extrabold mb-4">Browse all</h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {browse.map((item) => (
              <MediaCard key={item.href} {...item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
