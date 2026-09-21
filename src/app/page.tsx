import { site, projects, skills } from "@/content/site";

export default function Home() {
  return (
    <>
      <section id="about" className="px-6 py-20 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{site.name}</h1>
        <p className="text-lg text-black/70 dark:text-white/70 mb-6">
          {site.tagline}
        </p>
        <p>{site.bio}</p>
      </section>

      <section id="projects" className="px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="border border-black/10 dark:border-white/10 rounded-lg p-5"
            >
              <h3 className="font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-black/70 dark:text-white/70 mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 text-xs mb-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 text-sm">
                {project.link && (
                  <a href={project.link} className="underline">
                    Live
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} className="underline">
                    Repo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Skills</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="font-semibold mb-2">{group.category}</h3>
              <ul className="flex flex-wrap gap-2 text-sm">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Contact</h2>
        <p className="mb-4">
          Reach out at{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
        </p>
        <div className="flex gap-4 text-sm">
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
      </section>
    </>
  );
}
