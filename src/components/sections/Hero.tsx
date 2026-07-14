"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Phone, ShieldCheck, Zap } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import PhoneLink from "@/components/ui/PhoneLink";
import { cn } from "@/lib/utils";

const EMERGENCY_PHONE_DISPLAY = "04 11 93 96 74";

// Self-contained fractal-noise SVG (no extra asset/request) used to break up
// the flat gradient background and give it a textured, premium finish.
const NOISE_BACKGROUND =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Faint dot grid, pure CSS (repeating radial-gradient) — no image asset.
const DOT_GRID_BACKGROUND = "radial-gradient(circle, rgba(148,163,184,0.35) 1px, transparent 1.5px)";

const BADGES = [
  { icon: Zap, label: "Intervention 30 min", position: "left-[4%] top-[20%] lg:left-[10%]" },
  { icon: ShieldCheck, label: "Artisans Certifiés", position: "right-[4%] bottom-[16%] lg:right-[12%]" },
] as const;

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
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

      {/* Vignette : assombrit les bords/coins pour donner de la profondeur */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_50%,transparent_45%,rgba(2,6,23,0.65)_100%)]"
      />

      {/* Grain granuleux, aspect texturé premium */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-[0.05]"
        style={{ backgroundImage: NOISE_BACKGROUND }}
      />

      {BADGES.map(({ icon: Icon, label, position }, i) => (
        <motion.div
          key={label}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.5 + i * 0.15 }}
          className={cn(
            "absolute z-10 hidden items-center gap-2 rounded-2xl border border-slate-600/50 bg-slate-800/30 px-4 py-3 shadow-xl backdrop-blur-md lg:flex",
            position
          )}
        >
          <Icon className="h-5 w-5 text-cyan-400" />
          <span className="text-sm font-semibold text-white">{label}</span>
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col items-center text-center pt-24">
        <motion.h1
          {...fadeUp(0)}
          className="max-w-4xl text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_0_30px_rgba(34,211,238,0.25)] md:text-6xl lg:text-7xl"
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
            <PhoneLink
              aria-label={`Appel d'urgence immédiat au ${EMERGENCY_PHONE_DISPLAY}`}
              className="inline-flex min-h-[64px] items-center gap-3 rounded-full bg-cyan-500 px-10 py-5 text-lg font-bold text-slate-950 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
            >
              <Phone className="h-6 w-6" />
              Appel d&apos;Urgence Immédiat
            </PhoneLink>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
