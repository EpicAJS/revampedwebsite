"use client";

import { useEffect, useState } from "react";
import { COLORS, type ColorKey } from "@/lib/blocks";

export default function LevelHUD({
  sections,
}: {
  sections: { id: string; label: string; color: ColorKey }[];
}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0.1, 0.5, 1] }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Section progress"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
    >
      {sections.map(({ id, label, color }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            className="group flex items-center gap-3 justify-end"
          >
            <span
              className={`text-xs font-extrabold tracking-wider transition-all ${
                isActive
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-60 translate-x-2 group-hover:translate-x-0"
              }`}
              style={{ color: COLORS[color].bg }}
            >
              {label.toUpperCase()}
            </span>
            <span
              className="tile transition-all"
              style={{
                ["--tile" as string]: COLORS[color].bg,
                ["--tile-radius" as string]: "5px",
                width: isActive ? 22 : 14,
                height: isActive ? 22 : 14,
                opacity: isActive ? 1 : 0.35,
              }}
            />
          </a>
        );
      })}
    </nav>
  );
}
