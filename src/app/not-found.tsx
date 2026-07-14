import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">Erreur 404</p>
      <h1 className="mt-4 max-w-xl text-3xl font-extrabold text-white sm:text-4xl">
        Cette zone n&apos;est pas couverte
      </h1>
      <p className="mt-4 max-w-md text-slate-400">
        La page que vous cherchez n&apos;existe pas ou a été déplacée. Nos plombiers et
        serruriers, eux, interviennent bien dans tout l&apos;Hérault.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-8 py-4 text-base font-bold text-slate-950 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
      >
        <Home className="h-5 w-5" aria-hidden="true" />
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
