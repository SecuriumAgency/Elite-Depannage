"use client";

import { motion } from "framer-motion";

export default function CityMap3D({ villeLabel }: { villeLabel: string }) {
  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.15)] border border-white/10">
      <iframe
        title={`Carte ${villeLabel}`}
        src={`https://maps.google.com/maps?q=${encodeURIComponent(villeLabel)}+France&t=m&z=13&output=embed`}
        className="absolute inset-0 w-full h-full invert hue-rotate-180 contrast-90"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
        <motion.span
          aria-hidden
          animate={{ scale: [1, 2, 2], opacity: [1, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="absolute h-3 w-3 rounded-full bg-cyan-400"
        />
        <motion.span
          aria-hidden
          animate={{ scale: [1, 2.5, 2.5], opacity: [0.6, 0, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.6,
          }}
          className="absolute h-3 w-3 rounded-full bg-cyan-400"
        />
      </div>

      <p className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-cyan-400/30 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-sm">
        Intervention en cours à {villeLabel}
      </p>
    </div>
  );
}
