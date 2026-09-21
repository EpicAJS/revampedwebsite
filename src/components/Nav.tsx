import Link from "next/link";
import { site } from "@/content/site";
import { COLORS, SECTION_COLOR } from "@/lib/blocks";
import { tileStyle } from "./Tile";

const links = [
  { href: "/#about", label: "About", color: SECTION_COLOR.about },
  { href: "/#projects", label: "Projects", color: SECTION_COLOR.projects },
  { href: "/#skills", label: "Skills", color: SECTION_COLOR.skills },
  { href: "/blog", label: "Blog", color: SECTION_COLOR.blog },
  { href: "/#contact", label: "Contact", color: SECTION_COLOR.contact },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[rgba(16,19,43,0.72)] border-b border-white/5">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 max-w-6xl mx-auto">
        <Link
          href="/"
          className="tile tile-lg px-3.5 py-1.5 font-extrabold text-lg leading-none transition-transform hover:-translate-y-0.5"
          style={{ ...tileStyle("red"), color: COLORS.red.text }}
        >
          {site.shortName}
        </Link>
        <nav className="flex flex-wrap gap-2 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="tile px-3 py-1.5 font-extrabold transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
              style={{
                ...tileStyle(link.color),
                color: COLORS[link.color].text,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
