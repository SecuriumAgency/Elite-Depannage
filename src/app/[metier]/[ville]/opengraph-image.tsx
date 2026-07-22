import { ImageResponse } from "next/og";
import {
  getCityLabel,
  getMetierLabel,
  METIERS,
  SEO_CITIES,
} from "@/lib/cities";

export const alt = "Élite Dépannage 34 — Plomberie & Serrurerie d'Urgence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return METIERS.flatMap((metier) =>
    SEO_CITIES.map((city) => ({ metier: metier.slug, ville: city.slug }))
  );
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ metier: string; ville: string }>;
}) {
  const { metier, ville } = await params;
  const metierLabel = getMetierLabel(metier);
  const villeLabel = getCityLabel(ville);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#020617",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(6,182,212,0.35), transparent 55%), radial-gradient(circle at 85% 85%, rgba(37,99,235,0.35), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#22d3ee",
              boxShadow: "0 0 40px 12px rgba(34,211,238,0.7)",
            }}
          />
          <span
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#67e8f9",
            }}
          >
            Urgence 30 min · 7j/7
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 36,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#f8fafc",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {metierLabel} à {villeLabel}
          </span>
          <span
            style={{
              fontSize: 34,
              fontWeight: 600,
              color: "#94a3b8",
              marginTop: 20,
            }}
          >
            Élite Dépannage 34 — Intervention 30 min dans l&apos;Hérault
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 56,
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "16px 32px",
              borderRadius: 999,
              backgroundColor: "#22d3ee",
              color: "#020617",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            04 11 93 96 74
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
