"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Menu, Phone, X } from "lucide-react";
import Logo3D from "@/components/Logo3D";
import MagneticButton from "@/components/ui/MagneticButton";
import PhoneLink from "@/components/ui/PhoneLink";

// Ambient, non-critical globals: excluded from SSR entirely and code-split
// into their own client chunks so they never delay the initial HTML/LCP.
// The site-wide WebGL ambiance canvas has been replaced by a Hero-scoped
// scene (see components/sections/Canvas3D.tsx) to avoid running two WebGL
// contexts at once.
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Notre Expertise", href: "#expertise" },
  { label: "Avis Clients", href: "#avis" },
  { label: "Zones d'Intervention", href: "#villes" },
  { label: "Blog Sécurité", href: "#blog" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between w-full px-4 py-3 md:px-8">
          <Link
            href="/"
            aria-label="Élite Dépannage - Accueil"
            className="flex min-w-0 shrink items-center gap-2 sm:gap-3"
          >
            <Logo3D size="lg" />
            <span className="truncate text-base font-black text-white tracking-wide uppercase sm:text-xl">
              Élite Dépannage 34
            </span>
          </Link>

          <nav
            aria-label="Navigation principale"
            className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-md"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-200 transition-all hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <MagneticButton>
              <PhoneLink
                aria-label="Urgence 30 min - Appeler le 04 11 93 96 74"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-full bg-cyan-500 text-sm font-bold text-slate-950 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] sm:h-auto sm:w-auto sm:px-5 sm:py-2.5"
              >
                <Phone className="h-5 w-5 sm:hidden" />
                <span className="hidden sm:inline">Urgence 30 min</span>
              </PhoneLink>
            </MagneticButton>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMobileMenuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-cyan-400/50 hover:text-cyan-400 lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav
            aria-label="Navigation mobile"
            className="absolute top-full left-0 flex h-screen w-full flex-col items-center space-y-8 border-t border-white/10 bg-slate-950/95 pt-12 backdrop-blur-3xl lg:hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-semibold text-slate-300 transition-colors hover:text-cyan-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
