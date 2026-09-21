import { notFound } from "next/navigation";
import { albums, getAlbum } from "@/content/albums";
import { trackDuration } from "@/content/tracks";
import { profile } from "@/content/profile";
import { parseDuration } from "@/lib/time";
import AlbumArt from "@/components/AlbumArt";
import PlayButton from "@/components/PlayButton";
import TrackRow from "@/components/TrackRow";

export function generateStaticParams() {
  return albums.map((album) => ({ id: album.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const album = getAlbum(id);
  return { title: album ? album.title : "Album" };
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const album = getAlbum(id);
  if (!album) notFound();

  const totalMonths = album.tracks.reduce((sum, t) => sum + t.months, 0);
  const first = album.tracks[0];

  return (
    <div>
      <header
        className="px-4 sm:px-6 pt-4 pb-6"
        style={{
          background: `linear-gradient(180deg, ${album.art[0]} 0%, rgba(18,18,18,0.6) 75%, rgba(18,18,18,1) 100%)`,
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 pt-6">
          <AlbumArt
            art={album.art}
            image={album.image}
            label={album.title}
            priority
            sizes="(max-width: 640px) 60vw, 224px"
            className="w-40 h-40 sm:w-56 sm:h-56 shrink-0 shadow-2xl"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide mb-2">
              Album
            </p>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4">
              {album.title}
            </h1>
            <p className="text-sm text-white/80 max-w-2xl mb-3">
              {album.description}
            </p>
            <p className="text-sm">
              <span className="font-bold">{profile.name}</span>
              <span className="text-white/70">
                {" "}
                · {album.year} · {album.tracks.length} tracks ·{" "}
                {totalMonths} months
              </span>
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6">
        {first && (
          <div className="flex items-center gap-6 py-6">
            <PlayButton
              size={56}
              track={{
                id: first.id,
                title: first.title,
                subtitle: first.org,
                href: `/track/${first.id}`,
                art: first.art,
                image: first.image,
                duration: parseDuration(trackDuration(first)),
              }}
            />
          </div>
        )}

        <div className="grid grid-cols-[28px_1fr_auto] sm:grid-cols-[28px_1fr_minmax(0,22%)_56px] gap-4 px-4 pb-2 mb-2 border-b border-[var(--border)] text-xs uppercase tracking-wide text-muted">
          <span className="text-center">#</span>
          <span>Title</span>
          <span className="hidden sm:block">Dates</span>
          <span className="text-right">Time</span>
        </div>

        <div className="flex flex-col">
          {album.tracks.map((track, index) => (
            <TrackRow key={track.id} track={track} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
