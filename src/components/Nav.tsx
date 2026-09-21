import Link from "next/link";
import { site } from "@/content/site";
import { colorForIndex } from "@/lib/blockColors";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
      <Link
        href="/"
        className="font-extrabold text-xl px-4 py-1.5 rounded-xl border-[3px] border-black/30"
        style={{
          background: "var(--block-yellow)",
          color: "#3a2c00",
          boxShadow: "inset 0 2px 0 rgba(255,255,255,0.4)",
        }}
      >
        {site.shortName}
      </Link>
      <nav className="flex flex-wrap gap-2 text-sm">
        {links.map((link, i) => {
          const color = colorForIndex(i);
          return (
            <Link
              key={link.href}
              href={link.href}
              className="font-bold px-3 py-1.5 rounded-xl border-[3px] border-black/30 transition-transform hover:-translate-y-0.5"
              style={{
                background: color.bg,
                color: color.text,
                boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35)",
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
