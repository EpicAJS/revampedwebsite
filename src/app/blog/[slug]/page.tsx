import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

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
    <article className="px-6 py-24 max-w-3xl mx-auto">
      <Link
        href="/blog"
        className="inline-block mb-8 px-3 py-1.5 rounded-lg text-sm font-bold border-2 border-black/30"
        style={{ background: "var(--block-blue)", color: "#0f2540" }}
      >
        ← back to blog
      </Link>
      <div
        className="rounded-3xl border-[3px] border-black/30 bg-board p-8"
        style={{ boxShadow: "0 6px 0 rgba(0,0,0,0.25)" }}
      >
        <h1 className="text-3xl font-extrabold mb-2">{post.title}</h1>
        <p className="text-xs font-bold opacity-50 mb-8 uppercase tracking-wide">
          {post.date}
        </p>
        <div
          className="prose prose-invert max-w-none prose-headings:font-extrabold"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </article>
  );
}
