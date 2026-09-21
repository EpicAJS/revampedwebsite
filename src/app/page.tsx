import Link from "next/link";
import { albums, playlists } from "@/content/albums";
import { featuredTracks, trackDuration } from "@/content/tracks";
import { profile } from "@/content/profile";
import { parseDuration } from "@/lib/time";
import AlbumArt from "@/components/AlbumArt";
import MediaCard from "@/components/MediaCard";
import Greeting from "@/components/Greeting";

export default function Home() {
  const quickPicks = [
    ...albums.map((a) => ({
      href: `/album/${a.id}`,
      title: a.title,
      art: a.art,
      image: a.image,
    })),
    ...playlists.map((p) => ({
      href: p.href,
      title: p.title,
      art: p.art,
      image: p.image,
    })),
    {
      href: "/artist",
      title: "About Me",
      art: ["#3f3f46", "#18181b"] as [string, string],
      image: profile.photo || undefined,
    },
  ];

  return (
    <div
      className="min-h-full"
      style={{
        background:
          "linear-gradient(180deg, rgba(29,215,95,0.16) 0%, rgba(18,18,18,0) 340px)",
      }}
    >
      <div className="px-4 sm:px-6 pt-2 pb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-1">
          <Greeting />
        </h1>
        <p className="text-muted mb-7">
          {profile.role} — here&apos;s everything I&apos;ve been building.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {quickPicks.map((pick) => (
            <Link
              key={pick.href}
              href={pick.href}
              className="group flex items-center gap-4 rounded-md bg-white/10 hover:bg-white/20 transition-colors overflow-hidden"
            >
              <AlbumArt
                art={pick.art}
                image={pick.image}
                label={pick.title}
                sizes="80px"
                className="w-16 h-16 sm:w-20 sm:h-20 shrink-0"
                rounded="rounded-none"
              />
              <span className="font-bold text-sm sm:text-base pr-3 truncate">
                {pick.title}
              </span>
            </Link>
          ))}
        </div>

        <Shelf title="Featured this year" subtitle="The work I'd lead with">
          {featuredTracks.map((track) => (
            <MediaCard
              key={track.id}
              href={`/track/${track.id}`}
              title={track.title}
              subtitle={track.org}
              art={track.art}
              image={track.image}
              track={{
                id: track.id,
                title: track.title,
                subtitle: track.org,
                href: `/track/${track.id}`,
                art: track.art,
                image: track.image,
                duration: parseDuration(trackDuration(track)),
              }}
            />
          ))}
        </Shelf>

        <Shelf title="Albums" subtitle="Experience, projects, and research">
          {albums.map((album) => (
            <MediaCard
              key={album.id}
              href={`/album/${album.id}`}
              title={album.title}
              subtitle={`${album.year} · ${album.tracks.length} tracks`}
              art={album.art}
              image={album.image}
            />
          ))}
        </Shelf>

        <Shelf title="Playlists" subtitle="These ones need you">
          {playlists.map((playlist) => (
            <MediaCard
              key={playlist.id}
              href={playlist.href}
              title={playlist.title}
              subtitle={playlist.description}
              art={playlist.art}
              image={playlist.image}
            />
          ))}
          <MediaCard
            href="/artist"
            title={profile.name}
            subtitle="Artist · The person behind all this"
            art={["#3f3f46", "#18181b"]}
            image={profile.photo || undefined}
            round
          />
        </Shelf>
      </div>
    </div>
  );
}

function Shelf({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="mb-4">
        <h2 className="text-2xl font-extrabold">{title}</h2>
        <p className="text-sm text-muted">{subtitle}</p>
      </div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {children}
      </div>
    </section>
  );
}
