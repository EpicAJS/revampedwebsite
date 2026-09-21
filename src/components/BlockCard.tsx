"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function BlockCard({
  color,
  children,
  className = "",
}: {
  color: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -4, rotate: -0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`rounded-2xl border-[3px] border-black/30 bg-board p-5 ${className}`}
      style={{
        boxShadow: `inset 0 0 0 3px rgba(255,255,255,0.03), 0 6px 0 rgba(0,0,0,0.25)`,
      }}
    >
      <div
        className="h-2 w-14 rounded-full mb-4"
        style={{ background: color }}
      />
      {children}
    </motion.div>
  );
}
