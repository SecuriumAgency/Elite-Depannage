"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "30 min", label: "Délai d'intervention moyen", z: 30, blur: "backdrop-blur-sm" },
  { value: "100%", label: "Devis gratuit avant travaux", z: 20, blur: "backdrop-blur-md" },
  { value: "7j/7", label: "Agréé toutes assurances", z: 10, blur: "backdrop-blur-lg" },
];

export default function WhyUs() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Pourquoi nous choisir
          </span>
          <h2 className="mt-4 font-black text-4xl leading-tight tracking-tight text-white sm:text-5xl">
            Intervention
            <br />
            en 30 min.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-cyan-500">
              Devis Gratuit.
            </span>
            <br />
            Agréé Assurances.
          </h2>
        </motion.div>

        <div className="relative flex flex-col gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              style={{ zIndex: stat.z, marginLeft: i * 16 }}
              className={`rounded-2xl border border-white/10 bg-slate-900/50 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] ${stat.blur}`}
            >
              <p className="text-3xl font-black text-cyan-400">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
