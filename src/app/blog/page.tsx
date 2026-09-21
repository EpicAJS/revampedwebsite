import Link from "next/link";
import { getSortedPostsMeta } from "@/lib/posts";
import SpecTag from "@/components/SpecTag";

export const metadata = {
  title: "Blog",
};

export default function BlogIndex() {
  const posts = getSortedPostsMeta();

  return (
    <section className="px-6 py-24 max-w-4xl mx-auto">
      <div className="flex items-baseline gap-4 mb-12">
        <h1 className="text-3xl font-bold">Logbook</h1>
        <div className="h-px flex-1 hairline border-t" />
      </div>
      <div className="border-t hairline">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="grid gap-2 sm:grid-cols-[140px_1fr] py-8 border-b hairline group"
          >
            <p
              className="text-sm tracked uppercase opacity-50"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {post.date}
            </p>
            <div>
              <h2 className="font-bold text-xl mb-2 group-hover:opacity-80">
                {post.title}
              </h2>
              <p className="opacity-70 mb-4">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <SpecTag key={tag} label={tag} />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
