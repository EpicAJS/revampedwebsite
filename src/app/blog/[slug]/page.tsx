import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { profile } from "@/content/profile";
import { BLOG_ART } from "@/content/albums";
import AlbumArt from "@/components/AlbumArt";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getAllPostSlugs().includes(slug)) return { title: "Post" };
  const post = await getPostBySlug(slug);
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getAllPostSlugs().includes(slug)) notFound();

  const post = await getPostBySlug(slug);

  return (
    <div>
      <header
        className="px-4 sm:px-6 pt-4 pb-8"
        style={{
          background: `linear-gradient(180deg, ${BLOG_ART[0]} 0%, rgba(18,18,18,0.55) 70%, rgba(18,18,18,1) 100%)`,
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 pt-8">
          <AlbumArt
            art={BLOG_ART}
            label={post.title}
            priority
            sizes="(max-width: 640px) 50vw, 176px"
            className="w-36 h-36 sm:w-44 sm:h-44 shrink-0 shadow-2xl"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide mb-2">
              Post
            </p>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-[1.08]">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <Link href="/artist" className="font-bold hover:underline">
                {profile.name}
              </Link>
              <span className="text-white/60">•</span>
              <Link href="/blog" className="text-white/75 hover:underline">
                Blog
              </Link>
              {post.date && (
                <>
                  <span className="text-white/60">•</span>
                  <span className="text-white/75">{post.date}</span>
                </>
              )}
              <span className="text-white/60">•</span>
              <span className="text-white/75">{post.minutes} min read</span>
            </div>
          </div>
        </div>
      </header>

      <article className="px-4 sm:px-6 py-8 max-w-3xl">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div
          className="prose prose-invert max-w-none prose-headings:font-extrabold prose-a:text-[var(--accent)]"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <Link
          href="/blog"
          className="inline-block mt-12 text-sm font-bold text-muted hover:text-white transition-colors"
        >
          ← All posts
        </Link>
      </article>
    </div>
  );
}
