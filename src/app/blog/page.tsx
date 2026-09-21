import Link from "next/link";
import { getSortedPostsMeta } from "@/lib/posts";

export const metadata = {
  title: "Blog",
};

export default function BlogIndex() {
  const posts = getSortedPostsMeta();

  return (
    <section className="px-6 py-20 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Blog</h1>
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="font-semibold text-lg hover:underline">
              {post.title}
            </Link>
            <p className="text-sm text-black/50 dark:text-white/50 mb-2">
              {post.date}
            </p>
            <p className="text-black/70 dark:text-white/70">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
