import Link from "next/link";
import { profile, skills } from "@/content/profile";
import { featuredTracks, tracks, trackDuration } from "@/content/tracks";
import { parseDuration } from "@/lib/time";
import AlbumArt from "@/components/AlbumArt";
import PlayButton from "@/components/PlayButton";
import TrackRow from "@/components/TrackRow";

export const metadata = {
  title: "About Me",
  description: profile.intro,
};

export default function ArtistPage() {
  const top = featuredTracks.slice(0, 5);
  const first = top[0];

  return (
    <div>
      <header
        className="px-4 sm:px-6 pt-4 pb-8"
        style={{
          background:
            "linear-gradient(180deg, #1f6f4a 0%, rgba(18,18,18,0.65) 72%, rgba(18,18,18,1) 100%)",
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 pt-8">
          <AlbumArt
            art={["#3f3f46", "#18181b"]}
            image={profile.photo || undefined}
            label={profile.name}
            priority
            sizes="(max-width: 640px) 40vw, 192px"
            className="w-36 h-36 sm:w-48 sm:h-48 shrink-0 shadow-2xl"
            rounded="rounded-full"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide mb-2">
              ✓ Verified human
            </p>
            <h1 className="text-4xl sm:text-7xl font-black tracking-tight mb-4">
              {profile.name}
            </h1>
            <p className="text-sm text-white/80">
              {profile.taglines.join(" · ")}
            </p>
            <p className="text-sm text-white/70 mt-1">
              {profile.education.school} · {profile.location}
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6">
        <div className="flex items-center gap-5 py-6">
          {first && (
            <PlayButton
              size={56}
              track={{
                id: first.id,
                title: first.title,
                subtitle: first.org,
                href: `/track/${first.id}`,
                art: first.art,
                image: first.image,
                duration: parseDuration(trackDuration(first)),
              }}
            />
          )}
          <a
            href={profile.socials.email}
            className="rounded-full border border-white/25 px-5 py-2 text-sm font-bold hover:border-white transition-colors"
          >
            Get in touch
          </a>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-extrabold mb-4">Popular</h2>
          <div className="flex flex-col">
            {top.map((track, index) => (
              <TrackRow key={track.id} track={track} index={index} />
            ))}
          </div>
        </section>

        <section className="mb-12 max-w-3xl">
          <h2 className="text-2xl font-extrabold mb-4">About</h2>
          <div className="flex flex-col gap-4 text-white/85 leading-relaxed">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-extrabold mb-4">Education</h2>
          <div className="rounded-lg bg-elevated p-6 max-w-3xl">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
              <h3 className="text-lg font-bold">
                {profile.education.school}
              </h3>
              <span className="text-sm text-muted">
                {profile.education.dates}
              </span>
            </div>
            <p className="text-muted mb-4">
              {profile.education.degree} · GPA {profile.education.gpa} ·{" "}
              {profile.education.honors}
            </p>
            <p className="text-xs font-bold uppercase tracking-wide text-muted mb-2">
              Coursework
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {profile.education.coursework.map((course) => (
                <span
                  key={course}
                  className="rounded-full bg-white/10 px-3 py-1 text-sm"
                >
                  {course}
                </span>
              ))}
            </div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted mb-2">
              Involvement
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.education.involvement.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/10 px-3 py-1 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-extrabold mb-4">Skills</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {skills.map((group) => (
              <div key={group.category} className="rounded-lg bg-elevated p-5">
                <h3 className="font-bold mb-3 text-sm">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/10 px-2.5 py-1 text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-extrabold mb-4">Off the clock</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoCard title="Into" items={profile.interests} />
            <InfoCard title="Building toward" items={profile.passions} />
            <InfoCard title="Leadership" items={profile.leadership} />
          </div>
          <div className="mt-4 rounded-lg bg-elevated p-5">
            <h3 className="font-bold mb-3 text-sm">Three true things</h3>
            <ul className="flex flex-col gap-2 text-sm text-white/85">
              {profile.funFacts.map((fact) => (
                <li key={fact} className="flex gap-2">
                  <span className="text-accent">♪</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-extrabold mb-4">Everything else</h2>
          <p className="text-muted mb-4">
            {tracks.length} tracks across experience, projects, and research.
          </p>
          <Link
            href="/album/experience"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-black hover:bg-[var(--accent-hover)] transition-colors"
          >
            Browse the catalog
          </Link>
        </section>
      </div>
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg bg-elevated p-5">
      <h3 className="font-bold mb-3 text-sm">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-white/10 px-2.5 py-1 text-xs"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
