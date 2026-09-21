import Link from "next/link";
import { getSortedPostsMeta } from "@/lib/posts";
import { COLOR_KEYS, SECTION_COLOR } from "@/lib/blocks";
import BlockCard from "@/components/BlockCard";
import BlockTag from "@/components/BlockTag";
import SectionHeader from "@/components/SectionHeader";

export const metadata = {
  title: "Blog",
};

export default function BlogIndex() {
  const posts = getSortedPostsMeta();

  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <SectionHeader level={4} title="Blog" color={SECTION_COLOR.blog} />
      <div className="flex flex-col gap-6">
        {posts.map((post, i) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <BlockCard color={SECTION_COLOR.blog} index={i}>
              <h2 className="font-extrabold text-xl mb-1">{post.title}</h2>
              <p className="text-xs font-extrabold opacity-45 mb-3 tracking-[0.15em]">
                {post.date}
              </p>
              <p className="opacity-75 mb-5">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, ti) => (
                  <BlockTag
                    key={tag}
                    label={tag}
                    color={COLOR_KEYS[(ti + i) % COLOR_KEYS.length]}
                  />
                ))}
              </div>
            </BlockCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
