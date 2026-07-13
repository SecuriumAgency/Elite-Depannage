import Image from "next/image";
import { Phone } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import PhoneLink from "@/components/ui/PhoneLink";

const EMERGENCY_PHONE_DISPLAY = "04 11 93 96 74";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <Image
        src="/images/vitrine-elite.png"
        alt="Techniciens Élite Dépannage 34 souriants devant leur véhicule d'intervention, prêts à intervenir dans l'Hérault"
        fill
        preload
        sizes="100vw"
        className="absolute inset-0 z-[-1] h-full w-full object-cover"
      />

      {/* Assombrissement pour garantir le contraste WCAG des textes */}
      <div
        aria-hidden
        className="absolute inset-0 z-[-1] bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-950/90"
      />

      <div className="relative z-10 flex flex-col items-center text-center pt-24">
        <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-6xl lg:text-7xl">
          Intervention d&apos;Urgence dans l&apos;Hérault (34) | Élite Dépannage
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
          Plombiers et serruriers certifiés, disponibles 24h/24 et 7j/7. Intervention
          garantie en 30 minutes chez vous.
        </p>

        <MagneticButton className="mt-10">
          <PhoneLink
            aria-label={`Appel d'urgence immédiat au ${EMERGENCY_PHONE_DISPLAY}`}
            className="inline-flex min-h-[64px] items-center gap-3 rounded-full bg-cyan-500 px-10 py-5 text-lg font-bold text-slate-950 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]"
          >
            <Phone className="h-6 w-6" />
            Appel d&apos;Urgence Immédiat
          </PhoneLink>
        </MagneticButton>
      </div>
    </section>
  );
}
