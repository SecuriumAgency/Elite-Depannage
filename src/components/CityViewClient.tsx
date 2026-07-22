"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, Phone } from "lucide-react";
import PhoneLink from "@/components/ui/PhoneLink";
import { INTERVENTION_CITIES } from "@/lib/cities";
import type { Section } from "@/lib/seo-content";

const CityMap3D = dynamic(() => import("@/components/CityMap3D"), {
  ssr: false,
  loading: () => (
    <div className="h-56 animate-pulse rounded-2xl border border-cyan-500/20 bg-slate-900" />
  ),
});

export type CitySectionView = {
  key: Section;
  title: string;
  paragraph: string;
  image: string;
};

export default function CityViewClient({
  metier,
  metierLabel,
  villeLabel,
  sections,
}: {
  metier: string;
  metierLabel: string;
  villeLabel: string;
  sections: CitySectionView[];
}) {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-24 lg:flex-row">
      {/* COLONNE PRINCIPALE */}
      <div className="lg:w-2/3">
        {/* Breadcrumb */}
        <nav
          aria-label="Fil d'Ariane"
          className="flex items-center gap-1.5 text-sm text-slate-400"
        >
          <Link href="/" className="hover:text-cyan-400">
            Accueil
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-200">{metierLabel} Hérault (34)</span>
        </nav>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-4xl font-black tracking-tight text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.35)] sm:text-6xl"
        >
          {metierLabel} {villeLabel} (34)
        </motion.h1>

        {sections.map((section, i) => (
          <motion.section
            key={section.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={i === 0 ? "mt-16" : "mt-20"}
          >
            <div className="relative h-64 w-full overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <Image
                src={section.image}
                alt={`${metierLabel} à ${villeLabel} — ${section.title}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>
            <h2 className="mt-8 text-2xl font-bold text-white sm:text-3xl">
              {section.title}
            </h2>
            <p className="mt-4 text-slate-400">{section.paragraph}</p>
          </motion.section>
        ))}
      </div>

      {/* SIDEBAR STICKY */}
      <div className="lg:w-1/3">
        <div className="sticky top-32 space-y-8">
          {/* CTA CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-800 p-6 shadow-[0_0_40px_rgba(34,211,238,0.3)]"
          >
            <h3 className="text-lg font-bold text-white">
              Besoin d&apos;un {metierLabel.toLowerCase()} à {villeLabel} ?
            </h3>
            <PhoneLink className="mt-4 flex items-center gap-2 text-2xl font-black text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all hover:scale-105">
              <Phone className="h-6 w-6" />
              04 11 93 96 74
            </PhoneLink>
            <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-cyan-100/90">
              Disponible 24h/7jours
            </p>
          </motion.div>

          {/* MAP 3D IMMERSIF (client-only, code-split) */}
          <CityMap3D villeLabel={villeLabel} />

          {/* LINKS CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl"
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-200">
              Nous intervenons à
            </h3>
            <ul className="mt-4 space-y-1">
              {INTERVENTION_CITIES.map((city) => (
                <li key={city.slug}>
                  <motion.a
                    href={`/${metier}/${city.slug}`}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-slate-400 transition-colors hover:text-cyan-400"
                  >
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {city.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      ({city.postalCode})
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
