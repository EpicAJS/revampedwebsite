"use client";

import { motion } from "framer-motion";
import { COLORS, type ColorKey } from "@/lib/blocks";
import { Tile } from "./Tile";

export default function SectionHeader({
  level,
  title,
  color,
}: {
  level: number;
  title: string;
  color: ColorKey;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 380, damping: 20 }}
      className="flex items-center gap-4 mb-10"
    >
      <span
        className="tile tile-lg px-3 py-1 text-xs font-extrabold tracking-[0.15em] shrink-0"
        style={{
          ["--tile" as string]: COLORS[color].bg,
          color: COLORS[color].text,
        }}
      >
        LVL {String(level).padStart(2, "0")}
      </span>
      <h2 className="text-3xl sm:text-4xl font-extrabold">{title}</h2>
      <div className="hidden sm:flex gap-1.5 flex-1 justify-end">
        {Array.from({ length: 4 }, (_, i) => (
          <Tile
            key={i}
            color={color}
            className="w-3.5 h-3.5"
            style={{
              opacity: 0.25 + i * 0.25,
              ["--tile-radius" as string]: "4px",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
