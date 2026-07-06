import Link from "next/link";
import Logo3D from "@/components/Logo3D";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 h-20 flex items-center justify-between">
        <Link href="/" aria-label="Élite Dépannage - Accueil">
          <Logo3D />
        </Link>
        <a
          href="tel:+33400000000"
          className="hidden sm:inline-flex items-center rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
        >
          Urgence 30 min
        </a>
      </div>
    </header>
  );
}
