"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COLORS, COLOR_KEYS, type ColorKey } from "@/lib/blocks";

type Spark = { id: number; x: number; y: number; color: ColorKey };

export default function CursorTrail() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const last = useRef(0);
  const counter = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    function onMove(event: MouseEvent) {
      const now = performance.now();
      if (now - last.current < 70) return;
      last.current = now;

      const spark: Spark = {
        id: counter.current++,
        x: event.clientX,
        y: event.clientY,
        color: COLOR_KEYS[counter.current % COLOR_KEYS.length],
      };
      setSparks((prev) => [...prev.slice(-10), spark]);
    }

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.span
            key={spark.id}
            initial={{ opacity: 0.85, scale: 1, rotate: 0 }}
            animate={{ opacity: 0, scale: 0.2, rotate: 90 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onAnimationComplete={() =>
              setSparks((prev) => prev.filter((s) => s.id !== spark.id))
            }
            className="absolute rounded-[4px]"
            style={{
              left: spark.x - 5,
              top: spark.y - 5,
              width: 10,
              height: 10,
              background: COLORS[spark.color].bg,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
