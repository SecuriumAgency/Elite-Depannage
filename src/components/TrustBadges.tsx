"use client";

import { motion } from "framer-motion";

const BRANDS = ["Fichet", "Vachette", "Bricard", "Grohe", "Atlantic"];

export default function TrustBadges() {
  return (
    <section className="relative px-6 py-16">
      <p className="mx-auto max-w-2xl text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
        Nous intervenons sur toutes les marques
      </p>
      <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-6">
        {BRANDS.map((brand, i) => (
          <motion.div
            key={brand}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className="rounded-xl border border-white/10 bg-slate-800/50 px-6 py-3 text-sm font-bold tracking-wide text-slate-200 shadow-inner"
          >
            {brand}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
