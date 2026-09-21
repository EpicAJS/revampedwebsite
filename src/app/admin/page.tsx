import { isConfigured } from "@/lib/server/supabase";
import { getAllQuestions, getAllSongs } from "@/lib/server/queries";
import {
  answerQuestion,
  deleteItem,
  isAuthed,
  logout,
  setQuestionStatus,
  setSongStatus,
} from "./actions";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin", robots: { index: false } };

export default async function AdminPage() {
  if (!(await isAuthed())) return <LoginForm />;

  if (!isConfigured()) {
    return (
      <div className="mx-auto max-w-2xl p-8">
        <h1 className="text-2xl font-extrabold mb-2">Admin</h1>
        <p className="text-muted">
          Supabase isn&apos;t configured. Add SUPABASE_URL and
          SUPABASE_SERVICE_ROLE_KEY, then redeploy.
        </p>
      </div>
    );
  }

  const [questions, songs] = await Promise.all([
    getAllQuestions(),
    getAllSongs(),
  ]);

  const pendingQuestions = questions.filter((q) => q.status === "pending");
  const otherQuestions = questions.filter((q) => q.status !== "pending");
  const pendingSongs = songs.filter((s) => s.status === "pending");
  const otherSongs = songs.filter((s) => s.status !== "pending");

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold">Admin</h1>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm font-bold text-muted hover:text-white transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>

      <Section
        title="Questions awaiting an answer"
        count={pendingQuestions.length}
      >
        {pendingQuestions.map((item) => (
          <article key={item.id} className="rounded-lg bg-elevated p-5">
            <p className="font-bold mb-1">{item.question}</p>
            <p className="text-xs text-muted mb-4">
              {item.asked_by || "Anonymous"} ·{" "}
              {new Date(item.created_at).toLocaleDateString()}
            </p>
            <form action={answerQuestion} className="flex flex-col gap-3">
              <input type="hidden" name="id" value={item.id} />
              <textarea
                name="answer"
                required
                maxLength={2000}
                rows={3}
                placeholder="Your answer…"
                className="rounded-md bg-black/40 border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-accent resize-y"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-black"
                >
                  Answer &amp; publish
                </button>
              </div>
            </form>
            <div className="mt-2 flex gap-2">
              <StatusButton
                action={setQuestionStatus}
                id={item.id}
                status="rejected"
                label="Reject"
              />
              <DeleteButton id={item.id} table="questions" />
            </div>
          </article>
        ))}
      </Section>

      <Section title="Answered & rejected" count={otherQuestions.length}>
        {otherQuestions.map((item) => (
          <article key={item.id} className="rounded-lg bg-elevated p-5">
            <div className="flex items-start justify-between gap-4 mb-1">
              <p className="font-bold">{item.question}</p>
              <span className="text-xs text-muted shrink-0">{item.status}</span>
            </div>
            {item.answer && (
              <p className="text-sm text-white/80 whitespace-pre-line mb-3">
                {item.answer}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {item.status !== "published" && item.answer && (
                <StatusButton
                  action={setQuestionStatus}
                  id={item.id}
                  status="published"
                  label="Publish"
                />
              )}
              {item.status === "published" && (
                <StatusButton
                  action={setQuestionStatus}
                  id={item.id}
                  status="pending"
                  label="Unpublish"
                />
              )}
              <DeleteButton id={item.id} table="questions" />
            </div>
          </article>
        ))}
      </Section>

      <Section title="Song submissions" count={pendingSongs.length}>
        {pendingSongs.map((song) => (
          <article
            key={song.id}
            className="rounded-lg bg-elevated p-5 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <p className="font-bold">
                {song.title} — {song.artist}
              </p>
              {song.note && (
                <p className="text-sm text-muted">“{song.note}”</p>
              )}
              <p className="text-xs text-muted mt-1">
                {song.submitted_by || "Anonymous"}
              </p>
            </div>
            <div className="flex gap-2">
              <StatusButton
                action={setSongStatus}
                id={song.id}
                status="published"
                label="Add to playlist"
                primary
              />
              <StatusButton
                action={setSongStatus}
                id={song.id}
                status="rejected"
                label="Skip"
              />
              <DeleteButton id={song.id} table="songs" />
            </div>
          </article>
        ))}
      </Section>

      <Section title="Reviewed songs" count={otherSongs.length}>
        {otherSongs.map((song) => (
          <article
            key={song.id}
            className="rounded-lg bg-elevated p-4 flex flex-wrap items-center justify-between gap-3"
          >
            <p className="text-sm">
              <span className="font-bold">{song.title}</span> — {song.artist}{" "}
              <span className="text-muted">({song.status})</span>
            </p>
            <div className="flex gap-2">
              {song.status !== "published" && (
                <StatusButton
                  action={setSongStatus}
                  id={song.id}
                  status="published"
                  label="Publish"
                />
              )}
              {song.status === "published" && (
                <StatusButton
                  action={setSongStatus}
                  id={song.id}
                  status="rejected"
                  label="Remove"
                />
              )}
              <DeleteButton id={song.id} table="songs" />
            </div>
          </article>
        ))}
      </Section>
    </div>
  );
}

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-extrabold mb-3">
        {title} <span className="text-muted font-normal">({count})</span>
      </h2>
      {count === 0 ? (
        <p className="text-sm text-muted">Nothing here.</p>
      ) : (
        <div className="flex flex-col gap-3">{children}</div>
      )}
    </section>
  );
}

function StatusButton({
  action,
  id,
  status,
  label,
  primary,
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
  status: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        className={`rounded-full px-4 py-2 text-sm font-bold transition ${
          primary
            ? "bg-accent text-black hover:bg-[var(--accent-hover)]"
            : "border border-white/20 hover:border-white"
        }`}
      >
        {label}
      </button>
    </form>
  );
}

function DeleteButton({ id, table }: { id: string; table: string }) {
  return (
    <form action={deleteItem}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="table" value={table} />
      <button
        type="submit"
        className="rounded-full border border-red-500/40 px-4 py-2 text-sm font-bold text-red-400 hover:border-red-400 transition"
      >
        Delete
      </button>
    </form>
  );
}
