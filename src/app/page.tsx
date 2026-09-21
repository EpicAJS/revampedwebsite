import { site, projects, skills } from "@/content/site";
import SpecCard from "@/components/SpecCard";
import SpecTag from "@/components/SpecTag";
import RevGauge from "@/components/RevGauge";

export default function Home() {
  return (
    <>
      <section
        id="about"
        className="px-6 pt-20 pb-28 max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center"
      >
        <div>
          <p
            className="text-sm tracked uppercase mb-4"
            style={{ color: "var(--accent)" }}
          >
            Portfolio — Performance Edition
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold leading-[1.05] mb-6">
            {site.name}
          </h1>
          <p className="text-lg opacity-70 mb-8 max-w-lg">{site.tagline}</p>
          <p className="opacity-80 max-w-lg mb-10">{site.bio}</p>
          <div className="flex flex-wrap gap-8 text-sm tracked uppercase">
            <div>
              <p className="opacity-50 mb-1">Based in</p>
              <p className="font-semibold">{site.location}</p>
            </div>
            <div>
              <p className="opacity-50 mb-1">Status</p>
              <p className="font-semibold" style={{ color: "var(--accent)" }}>
                Open to work
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <RevGauge />
        </div>
      </section>

      <section id="projects" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="flex items-baseline gap-4 mb-12">
          <h2 className="text-3xl font-bold">Projects</h2>
          <div className="h-px flex-1 hairline border-t" />
          <span className="text-sm tracked opacity-50">
            {String(projects.length).padStart(2, "0")} builds
          </span>
        </div>
        <div className="grid gap-px sm:grid-cols-2 bg-[var(--surface-line)] border hairline">
          {projects.map((project, i) => (
            <SpecCard key={project.slug} index={i} className="bg-background">
              <h3 className="font-bold text-xl mb-2 pr-8">{project.title}</h3>
              <p className="text-sm opacity-70 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <SpecTag key={tag} label={tag} />
                ))}
              </div>
              <div className="flex gap-6 text-sm tracked uppercase font-semibold">
                {project.link && (
                  <a
                    href={project.link}
                    style={{ color: "var(--accent)" }}
                    className="hover:opacity-80"
                  >
                    Live →
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} className="opacity-70 hover:opacity-100">
                    Repo →
                  </a>
                )}
              </div>
            </SpecCard>
          ))}
        </div>
      </section>

      <section id="skills" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="flex items-baseline gap-4 mb-12">
          <h2 className="text-3xl font-bold">Skills</h2>
          <div className="h-px flex-1 hairline border-t" />
        </div>
        <div className="border-t hairline">
          {skills.map((group) => (
            <div
              key={group.category}
              className="grid gap-4 sm:grid-cols-[220px_1fr] py-6 border-b hairline"
            >
              <h3 className="tracked uppercase text-sm opacity-60 pt-1">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <SpecTag key={item} label={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="border hairline p-12 text-center relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-[3px] w-full"
            style={{ background: "var(--accent)" }}
          />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start the conversation
          </h2>
          <p className="opacity-70 mb-8">
            Got a project, an opportunity, or just want to talk shop?
          </p>
          <a
            href={`mailto:${site.email}`}
            className="inline-block px-8 py-4 font-bold tracked uppercase text-sm mb-8"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            {site.email}
          </a>
          <div className="flex justify-center gap-8 text-sm tracked uppercase opacity-70">
            <a href={site.socials.github} className="hover:opacity-100">
              GitHub
            </a>
            <a href={site.socials.linkedin} className="hover:opacity-100">
              LinkedIn
            </a>
            <a href={site.socials.twitter} className="hover:opacity-100">
              X
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
