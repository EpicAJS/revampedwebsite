"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { blockColors } from "@/lib/blockColors";

const COLS = 10;
const ROWS = 5;

function emptyBoard() {
  return Array.from({ length: COLS * ROWS }, () => -1);
}

function randomBoard() {
  return Array.from({ length: COLS * ROWS }, () =>
    Math.random() < 0.35 ? Math.floor(Math.random() * blockColors.length) : -1
  );
}

export default function MiniBoard() {
  const [cells, setCells] = useState<number[]>(emptyBoard);

  useEffect(() => {
    setCells(randomBoard());
  }, []);

  function handleClick(i: number) {
    setCells((prev) => {
      const next = [...prev];
      next[i] = next[i] >= blockColors.length - 1 ? -1 : next[i] + 1;
      return next;
    });
  }

  return (
    <div
      className="grid gap-1.5 select-none"
      style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      aria-hidden
    >
      {cells.map((value, i) => {
        const color = value >= 0 ? blockColors[value] : null;
        return (
          <motion.button
            key={i}
            type="button"
            onClick={() => handleClick(i)}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="aspect-square rounded-md"
            style={{
              background: color ? color.bg : "var(--board)",
              border: color
                ? "2px solid rgba(0,0,0,0.35)"
                : "2px solid var(--board-line)",
              boxShadow: color
                ? "inset 0 2px 0 rgba(255,255,255,0.35), inset 0 -2px 0 rgba(0,0,0,0.2)"
                : "none",
            }}
            tabIndex={-1}
          />
        );
      })}
    </div>
  );
}
