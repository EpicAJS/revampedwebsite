"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { COLORS, type ColorKey } from "@/lib/blocks";

export default function BlockCard({
  color,
  index = 0,
  children,
  className = "",
}: {
  color: ColorKey;
  index?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 18,
        delay: index * 0.07,
      }}
      whileHover={{ y: -5, transition: { type: "spring", stiffness: 400 } }}
      className={`relative panel p-6 overflow-hidden h-full ${className}`}
    >
      <div
        className="absolute -top-px left-0 h-1.5 w-full"
        style={{ background: COLORS[color].bg }}
      />
      <div
        className="absolute -right-6 -bottom-6 w-24 h-24 rounded-2xl opacity-[0.07] rotate-12"
        style={{ background: COLORS[color].bg }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
