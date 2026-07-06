"use client";

import { motion } from "framer-motion";

export default function CityMap3D({
  villeLabel,
  mapsQuery,
  mapsLabel,
}: {
  villeLabel: string;
  mapsQuery: string;
  mapsLabel: string;
}) {
  return (
    <div className="relative h-56 overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
      <iframe
        title={`Carte ${mapsLabel}`}
        src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full border-0 opacity-40 grayscale invert-[.9] contrast-[.85] hue-rotate-180"
      />

      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <p className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-cyan-400/30 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-sm">
        Intervention en cours à {villeLabel}
      </p>

      <div className="absolute inset-0 flex items-center justify-center">
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

      <a
        href={`https://www.google.com/maps/search/${mapsQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ouvrir ${mapsLabel} dans Google Maps`}
        className="absolute inset-0"
      />
    </div>
  );
}
