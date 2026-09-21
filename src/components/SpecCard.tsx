"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function SpecCard({
  index,
  children,
  className = "",
}: {
  index: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`relative border hairline bg-surface p-6 ${className}`}
    >
      <div
        className="absolute top-0 left-0 h-[3px] w-full"
        style={{ background: "var(--accent)" }}
      />
      <span
        className="absolute top-3 right-4 text-xs tracked opacity-40"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      {children}
    </motion.div>
  );
}
