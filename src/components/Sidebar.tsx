"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { albums, playlists } from "@/content/albums";
import { profile } from "@/content/profile";
import AlbumArt from "./AlbumArt";

const primary = [
  {
    href: "/",
    label: "Home",
    icon: (
      <path d="M12 3.1 2 11v10h7v-6h6v6h7V11L12 3.1z" />
    ),
  },
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

export default function Sidebar() {
  const pathname = usePathname();

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
          {primary.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 px-2 py-2.5 rounded-md text-sm font-bold transition-colors ${
                    active
                      ? "text-white"
                      : "text-muted hover:text-white"
                  }`}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {item.icon}
                  </svg>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="bg-elevated rounded-lg flex-1 min-h-0 flex flex-col">
        <p className="px-5 pt-4 pb-3 text-sm font-bold text-muted">
          Your Library
        </p>
        <div className="scroll-area overflow-y-auto px-2 pb-3 flex flex-col gap-1">
          {albums.map((item) => (
            <LibraryRow
              key={item.id}
              href={`/album/${item.id}`}
              art={item.art}
              image={item.image}
              title={item.title}
              meta={`Album · ${item.tracks.length} tracks`}
              active={pathname === `/album/${item.id}`}
            />
          ))}
          {playlists.map((item) => (
            <LibraryRow
              key={item.id}
              href={item.href}
              art={item.art}
              image={item.image}
              title={item.title}
              meta="Playlist"
              active={pathname === item.href}
            />
          ))}
          <LibraryRow
            href="/artist"
            art={["#3f3f46", "#18181b"]}
            image={profile.photo || undefined}
            title={profile.name}
            meta="Artist"
            active={pathname === "/artist"}
            round
          />
        </div>
      </div>
    </aside>
  );
}

function LibraryRow({
  href,
  art,
  image,
  title,
  meta,
  active,
  round,
}: {
  href: string;
  art: [string, string];
  image?: string;
  title: string;
  meta: string;
  active?: boolean;
  round?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
        active ? "bg-hover" : "hover:bg-hover"
      }`}
    >
      <AlbumArt
        art={art}
        image={image}
        label={title}
        sizes="48px"
        className="w-12 h-12 shrink-0"
        rounded={round ? "rounded-full" : "rounded"}
      />
      <span className="min-w-0">
        <span className="block text-sm font-semibold truncate">{title}</span>
        <span className="block text-xs text-muted truncate">{meta}</span>
      </span>
    </Link>
  );
}
