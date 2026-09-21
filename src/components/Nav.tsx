import Link from "next/link";
import { site } from "@/content/site";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="border-b hairline">
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <Link
          href="/"
          className="font-semibold tracked text-lg"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {site.shortName}
          <span style={{ color: "var(--accent)" }}>.</span>
        </Link>
        <nav className="flex gap-6 text-sm tracked uppercase">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="opacity-80 hover:opacity-100 underline decoration-2 underline-offset-8 decoration-transparent hover:decoration-[var(--accent)] transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
