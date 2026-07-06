"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, Phone } from "lucide-react";
import {
  INTERVENTION_CITIES,
  getCityLabel,
  getMetierLabel,
} from "@/lib/cities";

const SECOND_SECTION_TITLE: Record<string, string> = {
  plombier: "Recherche de fuite / Dépannage avancé",
  serrurier: "Ouverture de porte / Dépannage avancé",
};

const SECOND_SECTION_TEXT: Record<string, string[]> = {
  plombier: [
    "Nos plombiers utilisent des caméras thermiques et des détecteurs acoustiques pour localiser une fuite encastrée sans casser vos murs ou vos sols.",
    "Une fois la fuite localisée avec précision, nous établissons un devis détaillé avant toute ouverture, pour une intervention ciblée et sans surprise.",
    "Canalisations bouchées, chauffe-eau en panne, robinetterie défectueuse : nous intervenons sur toutes les urgences de plomberie avancée.",
  ],
  serrurier: [
    "Nos serruriers maîtrisent les techniques d'ouverture de porte sans dégât, y compris sur les serrures multipoints et les blindages récents.",
    "Avant toute intervention destructive, un diagnostic rapide permet de choisir la méthode la plus adaptée et la moins coûteuse pour vous.",
    "Porte claquée, clé cassée dans le cylindre, serrure grippée : nous traitons chaque urgence avec le même souci de rapidité et de propreté.",
  ],
};

const FIRST_SECTION_TEXT: Record<string, string[]> = {
  plombier: [
    "Une fuite d'eau, une canalisation bouchée ou un chauffe-eau en panne ne préviennent jamais. Notre équipe de plombiers certifiés intervient en 30 minutes pour limiter les dégâts.",
    "Chaque intervention commence par un diagnostic clair et un devis transparent, validé avant tout travaux : aucune surprise sur la facture finale.",
    "Nous n'installons que du matériel de marques reconnues, garantissant fiabilité et durabilité à chaque réparation ou installation.",
  ],
  serrurier: [
    "Porte claquée, serrure bloquée ou effraction : nos serruriers d'élite se déplacent en 30 minutes pour sécuriser votre logement ou local professionnel.",
    "Chaque ouverture de porte est réalisée avec la méthode la moins invasive possible, et un devis clair vous est présenté avant toute intervention.",
    "Nous posons uniquement des serrures certifiées A2P pour garantir un niveau de sécurité optimal après notre passage.",
  ],
};

const THIRD_SECTION_TEXT: Record<string, string[]> = {
  plombier: [
    "Rénovation de salle de bains, remplacement de chauffe-eau, installation de robinetterie : nos artisans réalisent vos projets de plomberie avec précision.",
    "Chaque installation est réalisée dans le respect des normes en vigueur, avec des matériaux durables adaptés à votre logement.",
    "Un devis gratuit est établi avant toute installation pour vous garantir une visibilité totale sur le coût des travaux.",
  ],
  serrurier: [
    "Blindage de porte, installation de serrure A2P, pose de verrou multipoints : nos serruriers renforcent durablement la sécurité de votre logement.",
    "Chaque installation est adaptée à la configuration de votre porte pour garantir une protection optimale contre les tentatives d'effraction.",
    "Un devis gratuit et détaillé est systématiquement proposé avant toute installation professionnelle.",
  ],
};

export default function VillePage({
  params,
}: {
  params: Promise<{ metier: string; ville: string }>;
}) {
  const { metier, ville } = use(params);

  const metierLabel = getMetierLabel(metier);
  const villeLabel = getCityLabel(ville);

  const secondTitle =
    SECOND_SECTION_TITLE[metier] ?? "Dépannage / Intervention avancée";
  const firstTexts = FIRST_SECTION_TEXT[metier] ?? FIRST_SECTION_TEXT.plombier;
  const secondTexts =
    SECOND_SECTION_TEXT[metier] ?? SECOND_SECTION_TEXT.plombier;
  const thirdTexts = THIRD_SECTION_TEXT[metier] ?? THIRD_SECTION_TEXT.plombier;

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
          <span className="text-slate-200">
            {metierLabel} Hérault (34)
          </span>
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

        {/* SECTION 1 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-16"
        >
          <div className="h-64 w-full rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.1)]" />
          <h2 className="mt-8 text-2xl font-bold text-white sm:text-3xl">
            Dépannage {metierLabel.toLowerCase()} à {villeLabel}
          </h2>
          <div className="mt-4 space-y-4 text-slate-400">
            {firstTexts.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </motion.section>

        {/* SECTION 2 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-20"
        >
          <div className="h-64 w-full rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.1)]" />
          <h2 className="mt-8 text-2xl font-bold text-white sm:text-3xl">
            {secondTitle}
          </h2>
          <div className="mt-4 space-y-4 text-slate-400">
            {secondTexts.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </motion.section>

        {/* SECTION 3 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-20"
        >
          <div className="h-64 w-full rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.1)]" />
          <h2 className="mt-8 text-2xl font-bold text-white sm:text-3xl">
            Installation professionnelle à {villeLabel}
          </h2>
          <div className="mt-4 space-y-4 text-slate-400">
            {thirdTexts.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </motion.section>
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
            className="rounded-2xl border border-cyan-500/50 bg-cyan-950/40 p-6 backdrop-blur-xl"
          >
            <h3 className="text-lg font-bold text-white">
              Besoin d&apos;un {metierLabel.toLowerCase()} à {villeLabel} ?
            </h3>
            <a
              href="tel:+33411939674"
              className="mt-4 flex items-center gap-2 text-2xl font-black text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all hover:scale-105"
            >
              <Phone className="h-6 w-6" />
              04 11 93 96 74
            </a>
            <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-cyan-300/80">
              Disponible 24h/7jours
            </p>
          </motion.div>

          {/* MAP CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex h-56 flex-col items-center justify-center gap-2 rounded-2xl border border-cyan-500/20 bg-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
          >
            <MapPin className="h-8 w-8 text-cyan-400" />
            <p className="text-sm font-semibold text-slate-300">
              Zone d&apos;intervention : {villeLabel}
            </p>
          </motion.div>

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
                    <span>{city.name}</span>
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
