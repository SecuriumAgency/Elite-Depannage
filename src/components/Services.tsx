"use client";

import { motion } from "framer-motion";
import { Droplets, KeyRound, GlassWater } from "lucide-react";
import ServiceCard3D from "@/components/ServiceCard3D";

const SERVICES = [
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

export default function Services() {
  return (
    <section className="relative px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Nos services
        </span>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Les 3 piliers Élite</h2>
      </motion.div>

      <div className="relative z-10 mx-auto mt-16 grid max-w-5xl gap-6 px-2 sm:grid-cols-3">
        {SERVICES.map(({ icon, title, description }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
          >
            <ServiceCard3D icon={icon} title={title} description={description} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
