"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { albums, playlists, BLOG_ART } from "@/content/albums";
import { favoritePlaylists, podcasts } from "@/content/media";
import { profile } from "@/content/profile";
import AlbumArt from "./AlbumArt";

type LibraryItem = {
  id: string;
  href: string;
  title: string;
  meta: string;
  art: [string, string];
  image?: string;
  filter: "Albums" | "Playlists" | "Blog" | "Podcasts";
  round?: boolean;
  external?: boolean;
};

const primary = [
  { href: "/", label: "Home", icon: <path d="M12 3.1 2 11v10h7v-6h6v6h7V11L12 3.1z" /> },
  {
    href: "/search",
    label: "Search",
    icon: (
      <path d="M10.5 3a7.5 7.5 0 1 1-4.74 13.32l-3.3 3.3a1 1 0 0 1-1.42-1.42l3.3-3.3A7.5 7.5 0 0 1 10.5 3zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z" />
    ),
  },
  {
    href: "/artist",
    label: "About Me",
    icon: (
      <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0 2c-4.2 0-7.5 2.3-7.5 5.2V21h15v-1.8c0-2.9-3.3-5.2-7.5-5.2z" />
    ),
  },
];

export default function Sidebar({ hasPosts }: { hasPosts: boolean }) {
  const pathname = usePathname();
  const [filter, setFilter] = useState<string | null>(null);

  const items = useMemo<LibraryItem[]>(() => {
    const list: LibraryItem[] = albums.map((a) => ({
      id: a.id,
      href: `/album/${a.id}`,
      title: a.title,
      meta: `Album · ${a.tracks.length} tracks`,
      art: a.art,
      image: a.image,
      filter: "Albums",
    }));

    if (hasPosts) {
      list.push({
        id: "blog",
        href: "/blog",
        title: "Blog",
        meta: "Album · Writing",
        art: BLOG_ART,
        filter: "Blog",
      });
    }

    playlists.forEach((p) =>
      list.push({
        id: p.id,
        href: p.href,
        title: p.title,
        meta: "Playlist",
        art: p.art,
        image: p.image,
        filter: "Playlists",
      })
    );

    favoritePlaylists.forEach((p) =>
      list.push({
        id: p.id,
        href: p.url,
        title: p.title,
        meta: `Playlist · ${p.creator}`,
        art: p.art,
        image: p.image,
        filter: "Playlists",
        external: true,
      })
    );

    podcasts.forEach((p) =>
      list.push({
        id: p.id,
        href: p.url,
        title: p.title,
        meta: `Podcast · ${p.creator}`,
        art: p.art,
        image: p.image,
        filter: "Podcasts",
        external: true,
      })
    );

    return list;
  }, [hasPosts]);

  const chips = useMemo(
    () => [...new Set(items.map((item) => item.filter))],
    [items]
  );

  const visible = filter ? items.filter((i) => i.filter === filter) : items;

  return (
    <aside className="hidden md:flex flex-col gap-2 w-[var(--sidebar-width)] shrink-0 p-2">
      <nav className="bg-elevated rounded-lg p-3">
        <Link
          href="/"
          className="flex items-center gap-2 px-2 py-3 mb-1 font-extrabold text-lg tracking-tight"
        >
          <span
            className="grid place-items-center w-8 h-8 rounded-full text-black text-sm font-black"
            style={{ background: "var(--accent)" }}
          >
            {profile.shortName}
          </span>
          {profile.name.split(" ")[0]}
        </Link>

        <ul className="flex flex-col">
          {primary.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-4 px-2 py-2.5 rounded-md text-sm font-bold transition-colors ${
                  pathname === item.href ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  {item.icon}
                </svg>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-elevated rounded-lg flex-1 min-h-0 flex flex-col">
        <div className="flex items-center gap-2 px-5 pt-4 pb-3 text-sm font-bold text-muted">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 4h2v16H3zM7 4h2v16H7zM12.6 4.2l1.9-.5 4.1 15.4-1.9.5z" />
          </svg>
          Your Library
        </div>

        {chips.length > 1 && (
          <div className="flex flex-wrap gap-2 px-3 pb-3">
            {filter && (
              <button
                type="button"
                onClick={() => setFilter(null)}
                aria-label="Clear filter"
                className="grid place-items-center w-7 h-7 rounded-full bg-hover text-white hover:bg-white/25 transition-colors"
              >
                ✕
              </button>
            )}
            {chips
              .filter((chip) => !filter || chip === filter)
              .map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setFilter(filter === chip ? null : chip)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    filter === chip
                      ? "bg-white text-black"
                      : "bg-hover text-white hover:bg-white/25"
                  }`}
                >
                  {chip}
                </button>
              ))}
          </div>
        )}

        <div className="scroll-area overflow-y-auto px-2 pb-3 flex flex-col gap-1">
          {visible.map((item) => (
            <LibraryRow
              key={item.id}
              item={item}
              active={pathname === item.href}
            />
          ))}
          {!filter && (
            <LibraryRow
              item={{
                id: "artist",
                href: "/artist",
                title: profile.name,
                meta: "Artist",
                art: ["#3f3f46", "#18181b"],
                image: profile.photo || undefined,
                filter: "Albums",
                round: true,
              }}
              active={pathname === "/artist"}
            />
          )}
        </div>
      </div>
    </aside>
  );
}

function LibraryRow({ item, active }: { item: LibraryItem; active: boolean }) {
  const inner = (
    <>
      <AlbumArt
        art={item.art}
        image={item.image}
        label={item.title}
        sizes="48px"
        className="w-12 h-12 shrink-0"
        rounded={item.round ? "rounded-full" : "rounded"}
      />
      <span className="min-w-0">
        <span className="block text-sm font-semibold truncate">
          {item.title}
          {item.external && <span className="text-muted"> ↗</span>}
        </span>
        <span className="block text-xs text-muted truncate">{item.meta}</span>
      </span>
    </>
  );

  const className = `flex items-center gap-3 p-2 rounded-md transition-colors ${
    active ? "bg-hover" : "hover:bg-hover"
  }`;

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {inner}
    </Link>
  );
}
