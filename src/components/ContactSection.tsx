"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const inputClass = cn(
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100",
  "shadow-inner shadow-black/40 outline-none placeholder:text-slate-500",
  "focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500 transition-all"
);

export default function ContactSection() {
  return (
    <section id="contact" className="relative px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:p-10"
      >
        <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Contact rapide
        </span>
        <h2 className="mt-3 text-3xl font-bold text-white">Une urgence ? Écrivez-nous.</h2>
        <p className="mt-2 text-sm text-slate-400">
          Réponse sous 30 minutes, 7j/7, partout dans l&apos;Hérault.
        </p>

        <form className="mt-8 flex flex-col gap-4">
          <input type="text" placeholder="Nom" className={inputClass} />
          <input type="tel" placeholder="Téléphone" className={inputClass} />
          <textarea placeholder="Décrivez votre urgence" rows={4} className={inputClass} />
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-cyan-500 px-8 py-3.5 text-base font-bold text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.8)]"
          >
            Envoyer ma demande
          </button>
        </form>
      </motion.div>
    </section>
  );
}
