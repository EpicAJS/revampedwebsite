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
        className="inline-block mb-10 text-sm tracked uppercase opacity-70 hover:opacity-100"
        style={{ color: "var(--accent)" }}
      >
        ← Back to logbook
      </Link>
      <div className="border-t hairline pt-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm tracked uppercase opacity-50 mb-10">
          {post.date}
        </p>
        <div
          className="prose prose-invert max-w-none prose-headings:uppercase prose-headings:tracking-wide prose-a:text-[var(--accent)]"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </article>
  );
}
