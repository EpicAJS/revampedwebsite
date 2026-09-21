import Link from "next/link";
import { notFound } from "next/navigation";
import { tracks, getTrack, trackDuration } from "@/content/tracks";
import { albumForTrack } from "@/content/albums";
import { profile } from "@/content/profile";
import { parseDuration } from "@/lib/time";
import AlbumArt from "@/components/AlbumArt";
import PlayButton from "@/components/PlayButton";
import TrackRow from "@/components/TrackRow";
import TrackActions from "@/components/TrackActions";

export function generateStaticParams() {
  return tracks.map((track) => ({ id: track.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const track = getTrack(id);
  return {
    title: track ? `${track.title} — ${track.org}` : "Track",
    description: track?.summary,
  };
}

const kindLabel = {
  experience: "Song",
  project: "Song",
  research: "Song",
} as const;

export default async function TrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const track = getTrack(id);
  if (!track) notFound();

  const album = albumForTrack(track.kind);
  const year = track.start.slice(0, 4);
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

  const alsoOnAlbum =
    album?.tracks.filter((item) => item.id !== track.id).slice(0, 5) ?? [];

  return (
    <div>
      <header
        className="px-4 sm:px-6 pt-4 pb-8"
        style={{
          background: `linear-gradient(180deg, ${track.art[0]} 0%, rgba(18,18,18,0.55) 70%, rgba(18,18,18,1) 100%)`,
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 pt-8">
          <AlbumArt
            art={track.art}
            image={track.image}
            label={track.title}
            priority
            sizes="(max-width: 640px) 60vw, 232px"
            className="w-44 h-44 sm:w-58 sm:h-58 shrink-0 shadow-2xl"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide mb-2">
              {kindLabel[track.kind]}
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-5 leading-[1.05]">
              {track.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <AlbumArt
                art={["#3f3f46", "#18181b"]}
                image={profile.photo || undefined}
                label={profile.name}
                rounded="rounded-full"
                sizes="24px"
                className="w-6 h-6 shrink-0"
              />
              <Link href="/artist" className="font-bold hover:underline">
                {profile.name}
              </Link>
              {album && (
                <>
                  <Dot />
                  <Link
                    href={`/album/${album.id}`}
                    className="text-white/75 hover:underline"
                  >
                    {album.title}
                  </Link>
                </>
              )}
              <Dot />
              <span className="text-white/75">{year}</span>
              <Dot />
              <span className="text-white/75">{duration}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6">
        <div className="flex items-center gap-6 py-6">
          <PlayButton size={56} track={nowPlaying} />
          <TrackActions title={track.title} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] pb-8">
          <section
            className="rounded-lg p-6 sm:p-8"
            style={{
              background: `linear-gradient(160deg, ${track.art[0]} 0%, ${track.art[1]} 130%)`,
            }}
          >
            <h2 className="text-lg font-extrabold mb-6">Lyrics</h2>
            <div className="flex flex-col gap-5">
              <p className="text-xl sm:text-2xl font-bold leading-snug text-white">
                {track.summary}
              </p>
              {track.highlights.map((line) => (
                <p
                  key={line}
                  className="text-xl sm:text-2xl font-bold leading-snug text-white/55"
                >
                  {line}
                </p>
              ))}
            </div>

            {track.award && (
              <p className="mt-8 inline-block rounded-full bg-black/35 px-4 py-2 text-sm font-bold">
                🏆 {track.award}
              </p>
            )}
          </section>

          <div className="flex flex-col gap-6">
            <section className="rounded-lg bg-elevated p-6">
              <h2 className="text-lg font-extrabold mb-4">About the artist</h2>
              <Link href="/artist" className="flex items-center gap-3 mb-4">
                <AlbumArt
                  art={["#3f3f46", "#18181b"]}
                  image={profile.photo || undefined}
                  label={profile.name}
                  rounded="rounded-full"
                  sizes="56px"
                  className="w-14 h-14 shrink-0"
                />
                <span>
                  <span className="block font-bold hover:underline">
                    {profile.name}
                  </span>
                  <span className="block text-sm text-muted">
                    {profile.location}
                  </span>
                </span>
              </Link>
              <p className="text-sm text-muted leading-relaxed">
                {profile.intro}
              </p>
            </section>

            <section className="rounded-lg bg-elevated p-6">
              <h2 className="text-lg font-extrabold mb-4">Credits</h2>
              <dl className="flex flex-col gap-3 text-sm">
                <Credit label="Performed by" value={profile.name} />
                <Credit label="Role" value={track.role} />
                <Credit label="Organization" value={track.org} />
                <Credit label="Released" value={track.dates} />
              </dl>

              <h3 className="text-xs font-bold uppercase tracking-wide text-muted mt-6 mb-3">
                Instruments
              </h3>
              <div className="flex flex-wrap gap-2">
                {track.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {track.links && track.links.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {track.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold hover:border-white hover:bg-white/5 transition-colors"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>

        {album && alsoOnAlbum.length > 0 && (
          <section className="pb-10">
            <h2 className="text-xl font-extrabold mb-1">
              More from {album.title}
            </h2>
            <Link
              href={`/album/${album.id}`}
              className="text-sm text-muted hover:text-white transition-colors"
            >
              Show all
            </Link>
            <div className="flex flex-col mt-4">
              {alsoOnAlbum.map((item, index) => (
                <TrackRow key={item.id} track={item} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function Dot() {
  return <span className="text-white/60">•</span>;
}

function Credit({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted text-xs">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
