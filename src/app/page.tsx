"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  Key,
  ShieldCheck,
  Clock,
  ThumbsUp,
  Star,
  Phone,
  Droplet,
} from "lucide-react";
import Logo3D from "@/components/Logo3D";
import ServiceCard3D from "@/components/ServiceCard3D";

const SERVICES = [
  {
    icon: Droplet,
    title: "Plomberie",
    description: "Fuites, canalisations bouchées, chauffe-eau.",
  },
  {
    icon: Key,
    title: "Serrurerie",
    description: "Porte claquée, serrure bloquée, blindage.",
  },
  {
    icon: ShieldCheck,
    title: "Vitrerie",
    description: "Bris de glace, mise en sécurité.",
  },
];

const TRUST_ITEMS = [
  "Agréé Assurances",
  "Devis Gratuit Avant Travaux",
  "Tarifs Transparents",
  "Garantie Pièces et Main d'Œuvre",
];

const KPIS = [
  { value: "+ de 500", label: "interventions", z: 30, offset: 0 },
  { value: "100%", label: "satisfaction", z: 20, offset: 16 },
  { value: "< 30 min", label: "intervention", z: 10, offset: 32 },
];

const TESTIMONIALS = [
  {
    name: "Sophie M.",
    city: "Montpellier",
    text: "Intervention en moins de 30 minutes pour une fuite qui inondait ma cuisine. Travail propre et tarif annoncé respecté.",
  },
  {
    name: "Karim B.",
    city: "Béziers",
    text: "Porte claquée un dimanche soir, le serrurier était sur place très rapidement et sans dégâts sur la serrure.",
  },
  {
    name: "Laurence T.",
    city: "Sète",
    text: "Vitre brisée sécurisée le soir même. Équipe sérieuse, devis gratuit et clair avant toute intervention.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* 1. HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
        <motion.div
          aria-hidden
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-cyan-900/20 blur-[150px]"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -bottom-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-blue-900/20 blur-[150px]"
        />

        <div className="relative z-10 flex flex-col items-center text-center pt-24">
          <div className="scale-150 md:scale-200 mb-12 relative z-10">
            <Logo3D size="lg" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 font-bold tracking-[0.3em] text-sm md:text-base mb-6 uppercase"
          >
            L&apos;excellence de l&apos;artisanat. L&apos;urgence maîtrisée.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-white font-black text-5xl md:text-7xl tracking-tight drop-shadow-[0_0_20px_rgba(34,211,238,0.5)] max-w-4xl"
          >
            Intervention d&apos;Urgence dans l&apos;Hérault
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-6 max-w-2xl text-lg text-slate-300"
          >
            Plombiers et Serruriers certifiés. Disponibles 7j/7. Arrivée sur site en 30
            minutes garanties.
          </motion.p>

          <motion.a
            href="tel:+33400000000"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-cyan-500 px-10 py-5 text-lg font-bold text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_40px_rgba(6,182,212,0.5)] transition-shadow hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_0_60px_rgba(6,182,212,0.8)]"
          >
            <Phone className="h-5 w-5" />
            Intervention Immédiate
          </motion.a>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="relative border-y border-white/10 bg-white/5 py-6 backdrop-blur-md">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 text-center sm:grid-cols-4">
          {TRUST_ITEMS.map((item, i) => (
            <motion.p
              key={item}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="text-sm font-semibold text-slate-200"
            >
              {item}
            </motion.p>
          ))}
        </div>
      </section>

      {/* 3. SERVICES */}
      <section className="relative px-6 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center font-black text-3xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-500"
        >
          Nos Expertises d&apos;Élite
        </motion.h2>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 px-2 sm:grid-cols-3">
          {SERVICES.map(({ icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <ServiceCard3D icon={icon} title={title} description={description} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. EXPERTISE & VALEURS */}
      <section className="relative px-6 py-24">
        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Expertise &amp; valeurs
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Des matériaux de premier choix, des prix transparents.
            </h2>
            <p className="mt-6 text-slate-400">
              Nous n&apos;installons que des équipements de marques reconnues —{" "}
              <span className="text-slate-200 font-semibold">Fichet</span>,{" "}
              <span className="text-slate-200 font-semibold">Vachette</span> et{" "}
              <span className="text-slate-200 font-semibold">Grohe</span> — pour garantir
              une sécurité et une durabilité à la hauteur de nos interventions. Chaque
              devis est détaillé et validé avant tout travaux : aucune surprise sur la
              facture finale.
            </p>
          </motion.div>

          <div className="relative flex flex-col gap-6">
            {KPIS.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                style={{ zIndex: kpi.z, marginLeft: kpi.offset }}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-xl"
              >
                <p className="text-3xl font-black text-cyan-400">{kpi.value}</p>
                <p className="mt-1 text-sm text-slate-400">{kpi.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AVIS CLIENTS */}
      <section className="relative px-6 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center text-3xl font-bold text-white sm:text-4xl"
        >
          Ils nous font confiance
        </motion.h2>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
              className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-300">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-slate-100">
                {t.name} <span className="text-slate-500 font-normal">— {t.city}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. CONTACT / LEAD GEN */}
      <section className="relative overflow-hidden px-6 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_60%)]"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-xl rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-[0_0_80px_rgba(6,182,212,0.2)] sm:p-10"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Demande de rappel d&apos;urgence
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white">
            Un problème maintenant ? On vous rappelle.
          </h2>

          <form className="mt-8 grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Nom"
              className="rounded-xl border border-white/20 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            <input
              type="tel"
              placeholder="Téléphone"
              className="rounded-xl border border-white/20 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            <input
              type="text"
              placeholder="Code Postal"
              className="rounded-xl border border-white/20 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            <select
              className="rounded-xl border border-white/20 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              defaultValue=""
            >
              <option value="" disabled>
                Type d&apos;urgence
              </option>
              <option value="plomberie">Plomberie</option>
              <option value="serrurerie">Serrurerie</option>
              <option value="vitrerie">Vitrerie</option>
            </select>
            <button
              type="submit"
              className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-8 py-3.5 text-base font-bold text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.8)]"
            >
              <Wrench className="h-4 w-4" />
              Demander un rappel
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Réponse sous 30 min
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ThumbsUp className="h-3.5 w-3.5" /> Satisfaction garantie
            </span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
