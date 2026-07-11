import { ImageResponse } from "next/og";

// No per-request data — stays on the Node runtime so this prerenders once at
// build time (static, cached by Vercel) instead of running as an edge function.
export const alt = "Élite Dépannage 34 — Plomberie & Serrurerie d'Urgence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
              fontSize: 84,
              fontWeight: 900,
              color: "#f8fafc",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Élite Dépannage 34
          </span>
          <span
            style={{
              fontSize: 38,
              fontWeight: 600,
              color: "#94a3b8",
              marginTop: 20,
            }}
          >
            Plomberie &amp; Serrurerie d&apos;urgence dans l&apos;Hérault
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
