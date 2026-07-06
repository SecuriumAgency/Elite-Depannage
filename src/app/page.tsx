"use client";

import { motion } from "framer-motion";
import { Droplets, KeyRound, GlassWater, ArrowRight } from "lucide-react";
import AmbientBackground from "@/components/AmbientBackground";
import ServiceCard3D from "@/components/ServiceCard3D";

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
      <AmbientBackground />

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
            className="font-black text-6xl md:text-8xl tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-500 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
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

        <div className="relative z-10 mx-auto mt-24 grid max-w-5xl gap-6 px-2 sm:grid-cols-3">
          {services.map(({ icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
            >
              <ServiceCard3D icon={icon} title={title} description={description} />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
