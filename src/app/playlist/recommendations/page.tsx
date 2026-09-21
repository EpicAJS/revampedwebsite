import { getPublishedSongs } from "@/lib/server/queries";
import { playlists } from "@/content/albums";
import { profile } from "@/content/profile";
import AlbumArt from "@/components/AlbumArt";
import SubmitForm from "@/components/SubmitForm";

export const metadata = { title: "Song Recommendations" };
export const revalidate = 60;

const meta = playlists.find((p) => p.id === "recommendations")!;

export default async function RecommendationsPage() {
  const songs = await getPublishedSongs();

  return (
    <div>
      <header
        className="px-4 sm:px-6 pt-4 pb-6"
        style={{
          background: `linear-gradient(180deg, ${meta.art[0]} 0%, rgba(18,18,18,0.6) 75%, rgba(18,18,18,1) 100%)`,
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 pt-6">
          <AlbumArt
            art={meta.art}
            label={meta.title}
            className="w-40 h-40 sm:w-52 sm:h-52 shrink-0 shadow-2xl"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide mb-2">
              Playlist
            </p>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4">
              {meta.title}
            </h1>
            <p className="text-sm text-white/80 max-w-xl mb-3">
              {meta.description}
            </p>
            <p className="text-sm">
              <span className="font-bold">{profile.name}</span>
              <span className="text-white/70">
                {" "}
                · {songs.length} {songs.length === 1 ? "song" : "songs"}
              </span>
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 py-8 max-w-3xl">
        <section className="mb-10">
          <h2 className="text-lg font-extrabold mb-3">Recommend me a song</h2>
          <SubmitForm
            endpoint="/api/songs"
            submitLabel="Add to the queue"
            successMessage="If it's good, it's going in the rotation."
            fields={[
              {
                name: "title",
                label: "Song title",
                placeholder: "Redbone",
                required: true,
                maxLength: 120,
              },
              {
                name: "artist",
                label: "Artist",
                placeholder: "Childish Gambino",
                required: true,
                maxLength: 120,
              },
              {
                name: "note",
                label: "Why this one",
                placeholder: "Trust me on this",
                multiline: true,
                maxLength: 280,
              },
              {
                name: "submittedBy",
                label: "Your name",
                placeholder: "Anonymous",
                maxLength: 60,
              },
            ]}
          />
        </section>

        <section>
          <h2 className="text-lg font-extrabold mb-4">In rotation</h2>
          {songs.length === 0 ? (
            <div className="rounded-lg bg-elevated p-8 text-center">
              <p className="font-bold mb-1">Empty playlist</p>
              <p className="text-sm text-muted">
                Recommend something and it could be the first track.
              </p>
            </div>
          ) : (
            <ol className="flex flex-col">
              {songs.map((song, index) => (
                <li
                  key={song.id}
                  className="flex items-center gap-4 rounded-md px-3 py-2.5 hover:bg-white/10 transition-colors"
                >
                  <span className="text-sm text-muted tabular-nums w-5 text-right">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{song.title}</p>
                    <p className="text-sm text-muted truncate">
                      {song.artist}
                      {song.note ? ` — “${song.note}”` : ""}
                    </p>
                  </div>
                  <span className="hidden sm:block text-xs text-muted shrink-0">
                    {song.submitted_by || "Anonymous"}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </div>
  );
}
