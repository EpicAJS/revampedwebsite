"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function RevGauge() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      pathLength: [0.08, 0.92, 0.3, 0.98, 0.08],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-xs">
      <path
        d="M 20 100 A 80 80 0 0 1 180 100"
        fill="none"
        stroke="var(--surface-line)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M 148 38 A 80 80 0 0 1 180 100"
        fill="none"
        stroke="var(--accent-dim)"
        strokeWidth="10"
        strokeLinecap="round"
        opacity={0.6}
      />
      <motion.path
        d="M 20 100 A 80 80 0 0 1 180 100"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="10"
        strokeLinecap="round"
        pathLength={0.3}
        style={{ pathLength: 0.3 }}
        animate={controls}
      />
      <text
        x="100"
        y="88"
        textAnchor="middle"
        className="tracked"
        fill="var(--foreground)"
        fontFamily="var(--font-display)"
        fontSize="14"
        fontWeight={600}
      >
        ALWAYS REVVING
      </text>
    </svg>
  );
}
