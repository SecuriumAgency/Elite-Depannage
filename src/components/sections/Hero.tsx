"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileText, Phone, ShieldCheck, Umbrella, Zap } from "lucide-react";
import Canvas3D from "@/components/sections/Canvas3D";
import MagneticButton from "@/components/ui/MagneticButton";
import PhoneLink from "@/components/ui/PhoneLink";

const EMERGENCY_PHONE_DISPLAY = "04 11 93 96 74";

// Self-contained fractal-noise SVG (no extra asset/request) used to break up
// the flat gradient background and give it a textured, premium finish.
const NOISE_BACKGROUND =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Faint dot grid, pure CSS (repeating radial-gradient) — no image asset.
const DOT_GRID_BACKGROUND = "radial-gradient(circle, rgba(148,163,184,0.35) 1px, transparent 1.5px)";

// Single source of truth for the reassurance badges — one unified cluster,
// same markup and classes on every viewport. No `absolute` positioning, no
// separate mobile/desktop variants to keep in sync.
const REASSURANCES = [
  { icon: Zap, label: "Intervention 30 min" },
  { icon: ShieldCheck, label: "Artisans Certifiés" },
  { icon: Umbrella, label: "Agréé Assurances" },
  { icon: FileText, label: "Devis Gratuit" },
] as const;

const BADGE_CLASS =
  "flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-full border border-cyan-500/30 bg-slate-900/40 px-3 py-2 text-[11px] text-cyan-50 backdrop-blur-md sm:px-4 sm:text-sm";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  // No `opacity` here on purpose: Framer Motion renders its `initial` state
  // inline in the SSR/SSG HTML itself, so an opacity:0 start hides the H1
  // (the page's LCP element) until React hydrates and the animation runs —
  // measured as a ~1.8s "element render delay" gating LCP on throttled
  // mobile. Animating only `y` keeps the text fully painted from first
  // render while still sliding elegantly into place.
  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? false : { y: 30 },
    animate: { y: 0 },
    transition: { type: "spring" as const, stiffness: 120, damping: 18, mass: 0.9, delay },
  });

  return (
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-6">
      {/* Halo cyan imposant en haut de section, façon éclairage de studio */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(22,78,99,0.35),rgba(15,23,42,0.08)_45%,transparent_75%)]"
      />

      {/* Second halo, plus concentré, directement derrière le bloc de texte */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.14),transparent_60%)]"
      />

      {/* Trame de points très subtile pour casser le côté plat du fond */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: DOT_GRID_BACKGROUND, backgroundSize: "28px 28px" }}
      />

      {/* Vignette : assombrit les bords/coins en douceur, aucun bord net */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_50%,transparent_45%,rgba(2,6,23,0.65)_100%)] blur-3xl"
      />

      {/* Grain granuleux, très adouci pour éviter l'effet "glace brisée" */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-5 blur-3xl"
        style={{ backgroundImage: NOISE_BACKGROUND }}
      />

      {/* Glow doux façon ombre portée derrière le texte : jamais de bord net */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[8%] h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-500/25 blur-[100px]"
      />

      {/* Scène 3D premium (desktop uniquement) : recouvre naturellement les
          calques CSS ci-dessus une fois montée ; ceux-ci restent le rendu
          final sur mobile et l'état affiché le temps du chargement idle. */}
      <Canvas3D />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center pt-24 text-center">
        <motion.h1
          {...fadeUp(0)}
          className="max-w-4xl text-balance text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_0_30px_rgba(34,211,238,0.25)] md:text-6xl lg:text-7xl"
        >
          Intervention d&apos;Urgence dans l&apos;Hérault (34){" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Élite Dépannage
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.15)}
          className="mt-6 max-w-2xl text-lg text-slate-300"
        >
          Plombiers et serruriers certifiés, disponibles 24h/24 et 7j/7. Intervention
          garantie en 30 minutes chez vous.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="mt-10">
          <MagneticButton>
            <div className="group relative">
              <span
                aria-hidden
                className="absolute inset-0 rounded-full bg-cyan-400 opacity-0 blur-xl transition-opacity duration-300 group-hover:animate-pulse group-hover:opacity-70"
              />
              <PhoneLink
                aria-label={`Appel d'urgence immédiat au ${EMERGENCY_PHONE_DISPLAY}`}
                className="relative inline-flex min-h-[64px] items-center gap-3 rounded-full bg-cyan-500 px-10 py-5 text-lg font-bold text-slate-950 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
              >
                <Phone className="h-6 w-6" />
                Appel d&apos;Urgence Immédiat
              </PhoneLink>
            </div>
          </MagneticButton>
        </motion.div>

        {/* Grappe de réassurances unifiée : un seul conteneur, un seul jeu
            de badges, strictement sous le CTA sur tous les viewports. */}
        <motion.div
          {...fadeUp(0.4)}
          className="mx-auto mt-6 flex w-full max-w-3xl flex-wrap items-center justify-center gap-2 sm:mt-8 sm:gap-4"
        >
          {REASSURANCES.map(({ icon: Icon, label }) => (
            <span key={label} className={BADGE_CLASS}>
              <Icon className="h-4 w-4 shrink-0 text-cyan-300" />
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
