import Link from "next/link";
import { site, projects, skills } from "@/content/site";
import { COLORS, COLOR_KEYS, SECTION_COLOR } from "@/lib/blocks";
import BlockCard from "@/components/BlockCard";
import BlockTag from "@/components/BlockTag";
import SectionHeader from "@/components/SectionHeader";
import PlayableBoard from "@/components/PlayableBoard";
import DropTitle from "@/components/DropTitle";
import LevelHUD from "@/components/LevelHUD";
import { tileStyle } from "@/components/Tile";

const hudSections = [
  { id: "about", label: "About", color: SECTION_COLOR.about },
  { id: "projects", label: "Projects", color: SECTION_COLOR.projects },
  { id: "skills", label: "Skills", color: SECTION_COLOR.skills },
  { id: "contact", label: "Contact", color: SECTION_COLOR.contact },
];

export default function Home() {
  return (
    <>
      <LevelHUD sections={hudSections} />

      <section
        id="about"
        className="px-6 pt-14 pb-28 max-w-6xl mx-auto grid gap-14 lg:grid-cols-[1.05fr_minmax(0,460px)] items-center"
      >
        <div>
          <span
            className="tile inline-block px-3 py-1 text-xs font-extrabold tracking-wider mb-6"
            style={{
              ...tileStyle(SECTION_COLOR.about),
              color: COLORS[SECTION_COLOR.about].text,
            }}
          >
            LVL 01 — PLAYER PROFILE
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Hi, I&apos;m
          </h1>
          <div className="mb-8">
            <DropTitle text={site.name} />
          </div>

          <p className="text-lg opacity-80 mb-5 max-w-lg">{site.tagline}</p>
          <p className="opacity-70 max-w-lg mb-8">{site.bio}</p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="tile tile-lg px-5 py-2.5 font-extrabold transition-transform hover:-translate-y-1 active:translate-y-0.5"
              style={{
                ...tileStyle(SECTION_COLOR.projects),
                color: COLORS[SECTION_COLOR.projects].text,
              }}
            >
              See my work
            </a>
            <a
              href="#contact"
              className="tile tile-lg px-5 py-2.5 font-extrabold transition-transform hover:-translate-y-1 active:translate-y-0.5"
              style={{
                ...tileStyle(SECTION_COLOR.contact),
                color: COLORS[SECTION_COLOR.contact].text,
              }}
            >
              Get in touch
            </a>
          </div>
        </div>

        <PlayableBoard />
      </section>

      <section id="projects" className="px-6 py-24 max-w-6xl mx-auto">
        <SectionHeader
          level={2}
          title="Projects"
          color={SECTION_COLOR.projects}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <BlockCard
              key={project.slug}
              color={SECTION_COLOR.projects}
              index={i}
            >
              <h3 className="font-extrabold text-xl mb-2">{project.title}</h3>
              <p className="text-sm opacity-75 mb-5">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag, ti) => (
                  <BlockTag
                    key={tag}
                    label={tag}
                    color={COLOR_KEYS[(ti + i) % COLOR_KEYS.length]}
                  />
                ))}
              </div>
              <div className="flex gap-4 text-sm font-extrabold">
                {project.link && (
                  <a
                    href={project.link}
                    className="hover:opacity-70"
                    style={{ color: COLORS[SECTION_COLOR.projects].bg }}
                  >
                    Live ↗
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} className="opacity-60 hover:opacity-100">
                    Repo ↗
                  </a>
                )}
              </div>
            </BlockCard>
          ))}
        </div>
      </section>

      <section id="skills" className="px-6 py-24 max-w-6xl mx-auto">
        <SectionHeader level={3} title="Skills" color={SECTION_COLOR.skills} />
        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((group, gi) => (
            <BlockCard key={group.category} color={SECTION_COLOR.skills} index={gi}>
              <h3 className="font-extrabold text-lg mb-4">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, ii) => (
                  <BlockTag
                    key={item}
                    label={item}
                    color={COLOR_KEYS[(ii + gi) % COLOR_KEYS.length]}
                  />
                ))}
              </div>
            </BlockCard>
          ))}
        </div>
      </section>

      <section id="blog-teaser" className="px-6 py-24 max-w-6xl mx-auto">
        <SectionHeader level={4} title="Blog" color={SECTION_COLOR.blog} />
        <BlockCard color={SECTION_COLOR.blog}>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="font-extrabold text-xl mb-2">
                Build logs & writeups
              </h3>
              <p className="opacity-70 max-w-md">
                Notes on what I&apos;m building, breaking, and figuring out.
              </p>
            </div>
            <Link
              href="/blog"
              className="tile tile-lg px-5 py-2.5 font-extrabold transition-transform hover:-translate-y-1 active:translate-y-0.5"
              style={{
                ...tileStyle(SECTION_COLOR.blog),
                color: COLORS[SECTION_COLOR.blog].text,
              }}
            >
              Read posts →
            </Link>
          </div>
        </BlockCard>
      </section>

      <section id="contact" className="px-6 py-24 pb-32 max-w-6xl mx-auto">
        <SectionHeader level={5} title="Contact" color={SECTION_COLOR.contact} />
        <BlockCard color={SECTION_COLOR.contact}>
          <div className="text-center py-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Let&apos;s connect
            </h3>
            <p className="opacity-70 mb-8">
              Got a project, an opportunity, or just want to say hi?
            </p>
            <a
              href={`mailto:${site.email}`}
              className="tile tile-lg inline-block px-6 py-3 font-extrabold mb-8 transition-transform hover:-translate-y-1 active:translate-y-0.5"
              style={{
                ...tileStyle(SECTION_COLOR.contact),
                color: COLORS[SECTION_COLOR.contact].text,
              }}
            >
              {site.email}
            </a>
            <div className="flex justify-center flex-wrap gap-3">
              {[
                { href: site.socials.github, label: "GitHub" },
                { href: site.socials.linkedin, label: "LinkedIn" },
                { href: site.socials.twitter, label: "X" },
              ].map((social, i) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="tile px-4 py-2 text-sm font-extrabold transition-transform hover:-translate-y-1"
                  style={{
                    ...tileStyle(COLOR_KEYS[i % COLOR_KEYS.length]),
                    color: COLORS[COLOR_KEYS[i % COLOR_KEYS.length]].text,
                  }}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </BlockCard>
      </section>
    </>
  );
}
