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
    <header className="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-white/10">
      <Link href="/" className="font-semibold">
        {site.shortName}
      </Link>
      <nav className="flex gap-5 text-sm">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:underline">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
