import Link from "next/link";
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
    <header className="fixed top-0 inset-x-0 z-50 border-b border-cyan-500/30 bg-slate-900/40 backdrop-blur-3xl shadow-[0_10px_40px_rgba(6,182,212,0.15)]">
      <div className="mx-auto max-w-6xl px-6 h-24 flex items-center justify-between gap-6">
        <Link href="/" aria-label="Élite Dépannage - Accueil" className="shrink-0">
          <Logo3D size="lg" showText={false} />
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
          className="hidden sm:inline-flex shrink-0 items-center rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
        >
          Urgence 30 min
        </a>
      </div>
    </header>
  );
}
