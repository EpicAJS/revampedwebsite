"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { AMBIENT_SHAPES, COLOR_KEYS } from "@/lib/blocks";
import { PieceView } from "./Tile";

/** Deterministic pseudo-random so server and client render identically. */
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const PIECES = Array.from({ length: 14 }, (_, i) => ({
  shape: AMBIENT_SHAPES[Math.floor(rand(i + 1) * AMBIENT_SHAPES.length)],
  color: COLOR_KEYS[Math.floor(rand(i + 7) * COLOR_KEYS.length)],
  left: rand(i + 3) * 92,
  top: rand(i + 11) * 300,
  depth: rand(i + 5),
  duration: 14 + rand(i + 13) * 14,
  delay: rand(i + 17) * -20,
}));

export default function BlockBackground() {
  const { scrollYProgress } = useScroll();
  const slow = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const fast = useTransform(scrollYProgress, [0, 1], [0, -620]);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "var(--background)",
          backgroundImage:
            "linear-gradient(var(--board-line) 1px, transparent 1px), linear-gradient(90deg, var(--board-line) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 0%, rgba(77,166,255,0.16), transparent 70%), radial-gradient(60% 50% at 85% 60%, rgba(176,107,255,0.13), transparent 70%), radial-gradient(55% 45% at 10% 85%, rgba(92,225,138,0.10), transparent 70%)",
        }}
      />

      {PIECES.map((piece, i) => (
        <motion.div
          key={i}
          className="absolute animate-drift"
          style={{
            left: `${piece.left}%`,
            top: `${piece.top}vh`,
            y: piece.depth > 0.5 ? fast : slow,
            opacity: 0.07 + piece.depth * 0.06,
            scale: 0.7 + piece.depth * 0.9,
            ["--drift-duration" as string]: `${piece.duration}s`,
            ["--drift-delay" as string]: `${piece.delay}s`,
          }}
        >
          <PieceView shape={piece.shape} color={piece.color} cell={26} gap={4} />
        </motion.div>
      ))}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 50%, transparent 40%, rgba(8,10,24,0.75) 100%)",
        }}
      />
    </div>
  );
}
