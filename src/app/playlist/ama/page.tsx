import { getPublishedQuestions } from "@/lib/server/queries";
import { playlists } from "@/content/albums";
import { profile } from "@/content/profile";
import AlbumArt from "@/components/AlbumArt";
import SubmitForm from "@/components/SubmitForm";

export const metadata = { title: "Ask Me Anything" };
export const revalidate = 60;

const meta = playlists.find((p) => p.id === "ama")!;

export default async function AmaPage() {
  const questions = await getPublishedQuestions();

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
            image={meta.image}
            label={meta.title}
            priority
            sizes="(max-width: 640px) 55vw, 208px"
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
                · {questions.length}{" "}
                {questions.length === 1 ? "answer" : "answers"}
              </span>
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 py-8 max-w-3xl">
        <section className="mb-10">
          <h2 className="text-lg font-extrabold mb-3">Ask me something</h2>
          <SubmitForm
            endpoint="/api/ama"
            submitLabel="Send question"
            successMessage="I'll answer it and it'll show up in this playlist."
            fields={[
              {
                name: "question",
                label: "Your question",
                placeholder: "What's the hardest bug you've ever shipped?",
                required: true,
                multiline: true,
                maxLength: 500,
              },
              {
                name: "askedBy",
                label: "Your name",
                placeholder: "Anonymous",
                maxLength: 60,
              },
            ]}
          />
        </section>

        <section>
          <h2 className="text-lg font-extrabold mb-4">Answered</h2>
          {questions.length === 0 ? (
            <div className="rounded-lg bg-elevated p-8 text-center">
              <p className="font-bold mb-1">No tracks yet</p>
              <p className="text-sm text-muted">
                Be the first to ask — answered questions land here.
              </p>
            </div>
          ) : (
            <ol className="flex flex-col gap-3">
              {questions.map((item, index) => (
                <li
                  key={item.id}
                  className="rounded-lg bg-elevated p-5 hover:bg-hover transition-colors"
                >
                  <div className="flex gap-4">
                    <span className="text-sm text-muted tabular-nums pt-1">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold mb-1">{item.question}</p>
                      <p className="text-xs text-muted mb-3">
                        asked by {item.asked_by || "Anonymous"}
                      </p>
                      <p className="text-white/85 whitespace-pre-line">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </div>
  );
}
