"use client";

import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <motion.div
        aria-hidden
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 h-[36rem] w-[36rem] rounded-full bg-cyan-500/30 blur-[150px]"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -right-32 h-[36rem] w-[36rem] rounded-full bg-blue-600/30 blur-[150px]"
      />
    </div>
  );
}
