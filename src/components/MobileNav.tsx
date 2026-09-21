"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: <path d="M12 3.1 2 11v10h7v-6h6v6h7V11L12 3.1z" /> },
  {
    href: "/search",
    label: "Search",
    icon: (
      <path d="M10.5 3a7.5 7.5 0 1 1-4.74 13.32l-3.3 3.3a1 1 0 0 1-1.42-1.42l3.3-3.3A7.5 7.5 0 0 1 10.5 3zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z" />
    ),
  },
  {
    href: "/artist",
    label: "About",
    icon: (
      <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0 2c-4.2 0-7.5 2.3-7.5 5.2V21h15v-1.8c0-2.9-3.3-5.2-7.5-5.2z" />
    ),
  },
  {
    href: "/recruiter",
    label: "Recruiter",
    icon: <path d="M4 5h16v3H4zm0 5h16v3H4zm0 5h10v3H4z" />,
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden shrink-0 flex items-stretch border-t border-[var(--border)] bg-black">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold transition-colors ${
              active ? "text-white" : "text-faint"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              {item.icon}
            </svg>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
