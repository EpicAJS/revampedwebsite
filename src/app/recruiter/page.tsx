import Link from "next/link";
import { profile, skills } from "@/content/profile";
import { tracksOfKind } from "@/content/tracks";
import PrintButton from "@/components/PrintButton";

export const metadata = {
  title: "Résumé",
  description: `${profile.name} — ${profile.role}`,
};

export default function RecruiterPage() {
  const experience = tracksOfKind("experience");
  const projects = tracksOfKind("project");
  const research = tracksOfKind("research");

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 text-neutral-900">
      <div className="mb-10 flex flex-wrap items-start justify-between gap-4 print:hidden">
        <Link
          href="/"
          className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          ← Back to the full site
        </Link>
        <PrintButton />
      </div>

      <header className="mb-10 border-b border-neutral-200 pb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {profile.name}
        </h1>
        <p className="text-lg text-neutral-600 mb-4">{profile.role}</p>
        <p className="max-w-2xl text-neutral-700 leading-relaxed mb-5">
          {profile.intro}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a
            href={profile.socials.email}
            className="font-medium text-neutral-900 underline underline-offset-4"
          >
            {profile.email}
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-900 underline underline-offset-4"
          >
            GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-900 underline underline-offset-4"
          >
            LinkedIn
          </a>
          <span className="text-neutral-500">{profile.location}</span>
        </div>
      </header>

      <Section title="Education">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-semibold">{profile.education.school}</h3>
          <span className="text-sm text-neutral-500">
            {profile.education.dates}
          </span>
        </div>
        <p className="text-neutral-700">
          {profile.education.degree} · GPA {profile.education.gpa}
        </p>
        <p className="mt-1 text-sm text-neutral-600">
          {profile.education.honors}. Coursework:{" "}
          {profile.education.coursework.join(", ")}.
        </p>
      </Section>

      <Section title="Experience">
        <div className="flex flex-col gap-7">
          {experience.map((role) => (
            <Entry
              key={role.id}
              heading={`${role.role} — ${role.org}`}
              sub={role.title}
              dates={role.dates}
              bullets={role.highlights}
              tech={role.tech}
            />
          ))}
        </div>
      </Section>

      <Section title="Projects">
        <div className="flex flex-col gap-7">
          {projects.map((project) => (
            <Entry
              key={project.id}
              heading={project.title}
              sub={project.award ? `${project.org} — ${project.award}` : project.org}
              dates={project.dates}
              bullets={project.highlights}
              tech={project.tech}
              links={project.links}
            />
          ))}
        </div>
      </Section>

      <Section title="Research">
        <div className="flex flex-col gap-7">
          {research.map((item) => (
            <Entry
              key={item.id}
              heading={item.title}
              sub={`${item.role} — ${item.org}`}
              dates={item.dates}
              bullets={item.highlights}
              tech={item.tech}
            />
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <div className="flex flex-col gap-2 text-sm">
          {skills.map((group) => (
            <p key={group.category}>
              <span className="font-semibold">{group.category}:</span>{" "}
              <span className="text-neutral-700">
                {group.items.join(", ")}
              </span>
            </p>
          ))}
        </div>
      </Section>

      <footer className="mt-12 border-t border-neutral-200 pt-6 text-sm text-neutral-500 print:hidden">
        Prefer the scenic route?{" "}
        <Link href="/" className="underline underline-offset-4">
          The full site is built like a music player.
        </Link>
      </footer>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-neutral-500">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Entry({
  heading,
  sub,
  dates,
  bullets,
  tech,
  links,
}: {
  heading: string;
  sub: string;
  dates: string;
  bullets: string[];
  tech: string[];
  links?: { label: string; href: string }[];
}) {
  return (
    <article>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-semibold">{heading}</h3>
        <span className="text-sm text-neutral-500">{dates}</span>
      </div>
      <p className="mb-2 text-sm text-neutral-600">{sub}</p>
      <ul className="mb-2 flex flex-col gap-1.5">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2 text-sm text-neutral-700">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-neutral-500">{tech.join(" · ")}</p>
      {links && links.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-neutral-900 underline underline-offset-4"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
