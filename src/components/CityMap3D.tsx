export default function CityMap3D({ villeLabel }: { villeLabel: string }) {
  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.15)] border border-white/10">
      <iframe
        title={`Carte ${villeLabel}`}
        src={`https://maps.google.com/maps?q=${encodeURIComponent(villeLabel)}+France&t=m&z=13&output=embed`}
        className="absolute inset-0 w-full h-full invert hue-rotate-180 contrast-90"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
      />

      <p className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-cyan-400/30 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-sm">
        Intervention en cours à {villeLabel}
      </p>
    </div>
  );
}
