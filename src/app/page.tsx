import { site, projects, skills } from "@/content/site";
import { colorForIndex } from "@/lib/blockColors";
import BlockCard from "@/components/BlockCard";
import BlockTag from "@/components/BlockTag";
import MiniBoard from "@/components/MiniBoard";

export default function Home() {
  return (
    <>
      <section
        id="about"
        className="px-6 pt-16 pb-24 max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center"
      >
        <div>
          <span
            className="inline-block px-3 py-1 rounded-lg text-xs font-bold border-2 border-black/30 mb-5"
            style={{ background: "var(--block-green)", color: "#0f3a20" }}
          >
            new high score
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
            Hi, I&apos;m{" "}
            <span
              className="inline-block px-3 py-1 rounded-2xl border-[3px] border-black/30 rotate-[-1deg]"
              style={{
                background: "var(--block-blue)",
                color: "#0f2540",
                boxShadow: "inset 0 3px 0 rgba(255,255,255,0.35)",
              }}
            >
              {site.name}
            </span>
          </h1>
          <p className="text-lg opacity-80 mb-6">{site.tagline}</p>
          <p className="opacity-90 max-w-lg">{site.bio}</p>
        </div>
        <div className="p-4 rounded-3xl border-[3px] border-black/30 bg-board">
          <p className="text-xs font-bold opacity-60 mb-3 uppercase tracking-wide">
            click a tile
          </p>
          <MiniBoard />
        </div>
      </section>

      <section id="projects" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl font-extrabold">Projects</h2>
          <div
            className="h-3 flex-1 max-w-24 rounded-full"
            style={{ background: "var(--block-orange)" }}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => {
            const color = colorForIndex(i);
            return (
              <BlockCard key={project.slug} color={color.bg}>
                <h3 className="font-extrabold text-lg mb-2">
                  {project.title}
                </h3>
                <p className="text-sm opacity-80 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, ti) => {
                    const tagColor = colorForIndex(ti + i);
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
                <div className="flex gap-4 text-sm font-bold">
                  {project.link && (
                    <a href={project.link} className="underline">
                      Live ↗
                    </a>
                  )}
                  {project.repo && (
                    <a href={project.repo} className="underline">
                      Repo ↗
                    </a>
                  )}
                </div>
              </BlockCard>
            );
          })}
        </div>
      </section>

      <section id="skills" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl font-extrabold">Skills</h2>
          <div
            className="h-3 flex-1 max-w-24 rounded-full"
            style={{ background: "var(--block-purple)" }}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((group, gi) => (
            <BlockCard key={group.category} color={colorForIndex(gi + 2).bg}>
              <h3 className="font-extrabold mb-3">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, ii) => {
                  const color = colorForIndex(ii + gi);
                  return (
                    <BlockTag
                      key={item}
                      label={item}
                      color={color.bg}
                      textColor={color.text}
                    />
                  );
                })}
              </div>
            </BlockCard>
          ))}
        </div>
      </section>

      <section id="contact" className="px-6 py-24 max-w-6xl mx-auto">
        <div
          className="rounded-3xl border-[3px] border-black/30 p-10 text-center"
          style={{
            background: "var(--block-yellow)",
            color: "#3a2c00",
            boxShadow: "inset 0 4px 0 rgba(255,255,255,0.4)",
          }}
        >
          <h2 className="text-3xl font-extrabold mb-4">Let&apos;s connect</h2>
          <p className="mb-6 opacity-80">
            Got a project, an opportunity, or just want to say hi?
          </p>
          <a
            href={`mailto:${site.email}`}
            className="inline-block px-6 py-3 rounded-xl font-extrabold border-[3px] border-black/30 bg-white mb-6"
          >
            {site.email}
          </a>
          <div className="flex justify-center gap-4 font-bold">
            <a href={site.socials.github} className="underline">
              GitHub
            </a>
            <a href={site.socials.linkedin} className="underline">
              LinkedIn
            </a>
            <a href={site.socials.twitter} className="underline">
              X
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
