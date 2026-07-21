import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import Logo3D from "@/components/Logo3D";
import PhoneLink from "@/components/ui/PhoneLink";
import { SEO_CITIES } from "@/lib/cities";
import { LEGAL_PAGES } from "@/lib/legal-content";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Notre Expertise", href: "#expertise" },
  { label: "Avis Clients", href: "#avis" },
  { label: "Zones d'Intervention", href: "#villes" },
  { label: "Blog Sécurité", href: "#blog" },
];

const linkClass =
  "text-sm text-slate-400 transition-all hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* INFOS */}
          <div>
            <div className="flex items-center gap-3">
              <Logo3D size="md" />
              <span className="text-xl font-black text-white tracking-wide uppercase">
                Élite Dépannage 34
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              Plombiers et serruriers d&apos;élite dans l&apos;Hérault (34). Intervention
              d&apos;urgence en 30 minutes, 7j/7, devis clair avant travaux.
            </p>
            <PhoneLink
              source="footer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/40 px-4 py-2.5 text-base font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)] transition-all hover:scale-105 hover:bg-cyan-500/20"
            >
              <Phone className="h-4 w-4" />
              04 11 93 96 74
            </PhoneLink>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin className="h-3.5 w-3.5" /> Intervention dans tout l&apos;Hérault
            </p>
          </div>

          {/* PLOMBIER */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-200">
              Plombier Hérault (34)
            </h3>
            <ul className="mt-5 space-y-3">
              {SEO_CITIES.map((city) => (
                <li key={`plombier-${city.slug}`}>
                  <Link href={`/plombier/${city.slug}`} className={linkClass}>
                    Plombier {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERRURIER */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-200">
              Serrurier Hérault (34)
            </h3>
            <ul className="mt-5 space-y-3">
              {SEO_CITIES.map((city) => (
                <li key={`serrurier-${city.slug}`}>
                  <Link href={`/serrurier/${city.slug}`} className={linkClass}>
                    Serrurier {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-200">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-8 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <p>© {new Date().getFullYear()} Élite Dépannage 34. Tous droits réservés.</p>
            <p>Artisans certifiés — Devis gratuit avant travaux</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {LEGAL_PAGES.map((page) => (
              <Link key={page.slug} href={`/legal/${page.slug}`} className="hover:text-cyan-400">
                {page.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
