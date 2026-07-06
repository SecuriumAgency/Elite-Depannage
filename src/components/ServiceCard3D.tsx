"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export default function ServiceCard3D({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 1], [-10, 10]);
  const glareX = useTransform(mouseX, (v) => `${v * 100}%`);
  const glareY = useTransform(mouseY, (v) => `${v * 100}%`);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-2xl transition-colors hover:border-cyan-400/50 hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.1), transparent 60%)`,
        }}
      />

      <div style={{ transform: "translateZ(40px)" }}>
        <Icon className="h-8 w-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.7)]" />
        <h3 className="mt-4 text-xl font-bold text-slate-50">{title}</h3>
        <p className="mt-2 text-sm text-slate-400">{description}</p>
      </div>
    </motion.div>
  );
}
