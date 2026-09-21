"use client";

import { motion } from "framer-motion";
import { COLORS, COLOR_KEYS } from "@/lib/blocks";
import { tileStyle } from "./Tile";

export default function DropTitle({ text }: { text: string }) {
  const words = text.split(" ");
  let letterIndex = 0;

  return (
    <span className="inline-flex flex-wrap gap-x-4 gap-y-2">
      {words.map((word) => (
        // Each word stays on one line so names never split across a break.
        <span key={word} className="inline-flex gap-1.5 sm:gap-2">
          {word.split("").map((char) => {
            const i = letterIndex++;
            const color = COLOR_KEYS[i % COLOR_KEYS.length];

            return (
              <motion.span
                key={`${char}-${i}`}
                initial={{ y: -160, opacity: 0, rotate: -12 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 16,
                  delay: 0.15 + i * 0.05,
                }}
                whileHover={{ y: -8, rotate: -4 }}
                className="tile tile-lg inline-flex items-center justify-center w-9 h-11 sm:w-14 sm:h-16 text-xl sm:text-4xl font-extrabold leading-none select-none uppercase"
                style={{
                  ...tileStyle(color),
                  color: COLORS[color].text,
                  ["--tile-radius" as string]: "0.65rem",
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
