import Link from "next/link";
import { Phone } from "lucide-react";
import Logo3D from "@/components/Logo3D";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Notre Expertise", href: "#expertise" },
  { label: "Avis Clients", href: "#avis" },
  { label: "Zones d'Intervention", href: "#villes" },
  { label: "Blog Sécurité", href: "#blog" },
];

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between w-full px-4 py-3 md:px-8">
        <Link
          href="/"
          aria-label="Élite Dépannage - Accueil"
          className="flex shrink-0 items-center gap-3"
        >
          <Logo3D size="lg" />
          <span className="text-xl font-black text-white tracking-wide uppercase">
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

        <a
          href="tel:0411939674"
          aria-label="Urgence 30 min - Appeler le 04 11 93 96 74"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-full bg-cyan-500 text-sm font-bold text-slate-950 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] sm:h-auto sm:w-auto sm:px-5 sm:py-2.5"
        >
          <Phone className="h-5 w-5 sm:hidden" />
          <span className="hidden sm:inline">Urgence 30 min</span>
        </a>
      </div>
    </header>
  );
}
