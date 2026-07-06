"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32">
      <motion.div
        aria-hidden
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/40 via-slate-950 to-slate-950"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center" style={{ perspective: "1000px" }}>
        <motion.h1
          initial={{ opacity: 0, y: 20, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-black text-6xl md:text-8xl tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-100 to-slate-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
        >
          Une urgence dans l&apos;Hérault ?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mt-6 text-lg text-slate-300"
        >
          Plombiers et serruriers certifiés, disponibles 7j/7 partout dans l&apos;Hérault.
          Diagnostic clair, tarifs affichés, intervention rapide en 30 minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1.02, 1] }}
          transition={{
            opacity: { duration: 0.7, delay: 0.3, ease: "easeOut" },
            y: { duration: 0.7, delay: 0.3, ease: "easeOut" },
            scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
          className="mt-10 inline-block"
        >
          <a
            href="tel:+33400000000"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-8 py-4 text-base font-bold text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.8)]"
          >
            Intervention Immédiate
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
