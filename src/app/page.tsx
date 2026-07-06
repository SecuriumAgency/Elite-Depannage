"use client";

import { motion } from "framer-motion";
import { Droplets, KeyRound, GlassWater, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Droplets,
    title: "Plomberie",
    description: "Fuites, canalisations bouchées, chauffe-eau : intervention immédiate.",
  },
  {
    icon: KeyRound,
    title: "Serrurerie",
    description: "Porte claquée, serrure bloquée, ouverture sans casse garantie.",
  },
  {
    icon: GlassWater,
    title: "Vitrerie",
    description: "Vitrage cassé ou fissuré, remplacement rapide et sécurisé.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(6,182,212,0.15), transparent 60%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl font-black tracking-tight sm:text-6xl"
          >
            Une urgence dans l&apos;Hérault ?{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-cyan-500">
              Nous intervenons en 30 minutes.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="mt-6 text-lg text-slate-300"
          >
            Plombiers et serruriers certifiés, disponibles 7j/7 partout dans l&apos;Hérault.
            Diagnostic clair, tarifs affichés, intervention rapide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-10"
          >
            <a
              href="tel:+33400000000"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-8 py-4 text-base font-bold text-slate-950 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
            >
              Demander une Intervention
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto mt-24 grid max-w-5xl gap-6 px-2 sm:grid-cols-3">
          {services.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            >
              <Icon className="h-8 w-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.7)]" />
              <h3 className="mt-4 text-xl font-bold text-slate-50">{title}</h3>
              <p className="mt-2 text-sm text-slate-400">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
