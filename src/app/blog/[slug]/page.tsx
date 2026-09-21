import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { COLORS, SECTION_COLOR } from "@/lib/blocks";
import { tileStyle } from "@/components/Tile";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!getAllPostSlugs().includes(slug)) {
    notFound();
  }

  const post = await getPostBySlug(slug);

  return (
    <article className="px-6 py-20 max-w-3xl mx-auto">
      <Link
        href="/blog"
        className="tile inline-block mb-8 px-3.5 py-2 text-sm font-extrabold transition-transform hover:-translate-y-0.5"
        style={{
          ...tileStyle(SECTION_COLOR.blog),
          color: COLORS[SECTION_COLOR.blog].text,
        }}
      >
        ← Back to blog
      </Link>

      <div className="panel p-8 sm:p-10 relative overflow-hidden">
        <div
          className="absolute -top-px left-0 h-1.5 w-full"
          style={{ background: COLORS[SECTION_COLOR.blog].bg }}
        />
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
          {post.title}
        </h1>
        <p className="text-xs font-extrabold opacity-45 mb-8 tracking-[0.15em]">
          {post.date}
        </p>
        <div
          className="prose prose-invert max-w-none prose-headings:font-extrabold prose-a:text-[var(--block-green)]"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </article>
  );
}
