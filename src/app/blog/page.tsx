import Link from "next/link";
import { getSortedPostsMeta } from "@/lib/posts";
import { colorForIndex } from "@/lib/blockColors";
import BlockCard from "@/components/BlockCard";
import BlockTag from "@/components/BlockTag";

export const metadata = {
  title: "Blog",
};

export default function BlogIndex() {
  const posts = getSortedPostsMeta();

  return (
    <section className="px-6 py-24 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <h1 className="text-3xl font-extrabold">Blog</h1>
        <div
          className="h-3 flex-1 max-w-24 rounded-full"
          style={{ background: "var(--block-green)" }}
        />
      </div>
      <div className="flex flex-col gap-6">
        {posts.map((post, i) => {
          const color = colorForIndex(i);
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <BlockCard color={color.bg}>
                <h2 className="font-extrabold text-xl mb-1">{post.title}</h2>
                <p className="text-xs font-bold opacity-50 mb-3 uppercase tracking-wide">
                  {post.date}
                </p>
                <p className="opacity-80 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, ti) => {
                    const tagColor = colorForIndex(ti + i + 1);
                    return (
                      <BlockTag
                        key={tag}
                        label={tag}
                        color={tagColor.bg}
                        textColor={tagColor.text}
                      />
                    );
                  })}
                </div>
              </BlockCard>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
