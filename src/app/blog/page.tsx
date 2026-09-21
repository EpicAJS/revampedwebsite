import Link from "next/link";
import { getSortedPostsMeta } from "@/lib/posts";
import { profile } from "@/content/profile";
import { BLOG_ART } from "@/content/albums";
import AlbumArt from "@/components/AlbumArt";

export const metadata = { title: "Blog" };

export default function BlogIndex() {
  const posts = getSortedPostsMeta();
  const totalMinutes = posts.reduce((sum, post) => sum + post.minutes, 0);

  return (
    <div>
      <header
        className="px-4 sm:px-6 pt-4 pb-6"
        style={{
          background: `linear-gradient(180deg, ${BLOG_ART[0]} 0%, rgba(18,18,18,0.6) 75%, rgba(18,18,18,1) 100%)`,
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 pt-6">
          <AlbumArt
            art={BLOG_ART}
            label="Blog"
            priority
            sizes="(max-width: 640px) 55vw, 208px"
            className="w-40 h-40 sm:w-52 sm:h-52 shrink-0 shadow-2xl"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide mb-2">
              Album
            </p>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4">
              Blog
            </h1>
            <p className="text-sm text-white/80 max-w-xl mb-3">
              Writing about what I&apos;m building, breaking, and figuring out.
            </p>
            <p className="text-sm">
              <span className="font-bold">{profile.name}</span>
              <span className="text-white/70">
                {" "}
                · {posts.length} {posts.length === 1 ? "post" : "posts"}
                {totalMinutes > 0 && ` · ${totalMinutes} min`}
              </span>
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 py-8">
        {posts.length === 0 ? (
          <div className="rounded-lg bg-elevated p-10 text-center max-w-xl">
            <p className="font-bold mb-1">No posts yet</p>
            <p className="text-sm text-muted">
              Drop a Markdown file in <code>content/blog/</code> and it shows up
              here as a track.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[28px_1fr_auto] sm:grid-cols-[28px_1fr_minmax(0,22%)_64px] gap-4 px-4 pb-2 mb-2 border-b border-[var(--border)] text-xs uppercase tracking-wide text-muted">
              <span className="text-center">#</span>
              <span>Title</span>
              <span className="hidden sm:block">Published</span>
              <span className="text-right">Read</span>
            </div>
            <div className="flex flex-col">
              {posts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group grid grid-cols-[28px_1fr_auto] sm:grid-cols-[28px_1fr_minmax(0,22%)_64px] items-center gap-4 px-4 py-2.5 rounded-md hover:bg-white/10 transition-colors"
                >
                  <span className="text-center text-sm text-muted tabular-nums">
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold truncate">
                      {post.title}
                    </span>
                    <span className="block text-xs text-muted truncate">
                      {post.excerpt}
                    </span>
                  </span>
                  <span className="hidden sm:block text-xs text-muted truncate">
                    {post.date}
                  </span>
                  <span className="text-right text-xs text-muted">
                    {post.minutes} min
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
