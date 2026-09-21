import Link from "next/link";
import { notFound } from "next/navigation";
import { tracks, getTrack, trackDuration } from "@/content/tracks";
import { albumForTrack } from "@/content/albums";
import { parseDuration } from "@/lib/time";
import AlbumArt from "@/components/AlbumArt";
import PlayButton from "@/components/PlayButton";

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

export default async function TrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const track = getTrack(id);
  if (!track) notFound();

  const album = albumForTrack(track.kind);

  return (
    <div>
      <header
        className="px-4 sm:px-6 pt-4 pb-6"
        style={{
          background: `linear-gradient(180deg, ${track.art[0]} 0%, rgba(18,18,18,0.6) 75%, rgba(18,18,18,1) 100%)`,
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 pt-6">
          <AlbumArt
            art={track.art}
            label={track.title}
            className="w-36 h-36 sm:w-48 sm:h-48 shrink-0 shadow-2xl"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide mb-2">
              {track.kind === "experience"
                ? "Role"
                : track.kind === "research"
                  ? "Research"
                  : "Project"}
            </p>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
              {track.title}
            </h1>
            <p className="text-sm">
              <span className="font-bold">{track.role}</span>
              <span className="text-white/70">
                {" "}
                · {track.org} · {track.dates} · {trackDuration(track)}
              </span>
            </p>
            {track.award && (
              <p className="mt-3 inline-block rounded-full bg-black/40 px-3 py-1 text-xs font-bold">
                🏆 {track.award}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 max-w-4xl">
        <div className="flex items-center gap-5 py-6">
          <PlayButton
            size={56}
            track={{
              id: track.id,
              title: track.title,
              subtitle: track.org,
              href: `/track/${track.id}`,
              art: track.art,
              duration: parseDuration(trackDuration(track)),
            }}
          />
          {album && (
            <Link
              href={`/album/${album.id}`}
              className="text-sm font-bold text-muted hover:text-white transition-colors"
            >
              ← Back to {album.title}
            </Link>
          )}
        </div>

        <p className="text-lg text-white/90 mb-10 leading-relaxed">
          {track.summary}
        </p>

        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted mb-4">
            What I did
          </h2>
          <ul className="flex flex-col gap-3">
            {track.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-white/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted mb-4">
            Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {track.tech.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {track.links && track.links.length > 0 && (
          <section className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-wide text-muted mb-4">
              Links
            </h2>
            <div className="flex flex-wrap gap-3">
              {track.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold hover:border-white hover:bg-white/5 transition-colors"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
