import type { NextConfig } from "next";
import withBundleAnalyzerInit from "@next/bundle-analyzer";

const withBundleAnalyzer = withBundleAnalyzerInit({
  enabled: process.env.ANALYZE === "true",
});

// Nonce-based CSP (Next's recommended strict approach) would force every
// page to render dynamically, which throws away the static generation this
// site relies on (56 [metier]/[ville] pages, ISR blog/expertise pages) — see
// node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md.
// This is the static-header alternative instead: 'unsafe-inline' is required
// for the GTM bootstrap/gtag inline scripts and the JSON-LD blocks (all of
// which are now escaped against script-tag breakout in src/lib/schema.ts),
// but every origin is explicitly allowlisted to what this codebase actually
// loads (grep for googletagmanager/doubleclick/maps.google/unsplash/pexels).
// If the GTM container gets a new non-Google tag (Facebook Pixel, Hotjar,
// etc.) added later, its domain will need to be added here too.
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://*.doubleclick.net;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://images.unsplash.com https://images.pexels.com https://www.googletagmanager.com https://www.google.com https://*.doubleclick.net https://*.google-analytics.com;
  font-src 'self' data:;
  connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://www.google.com https://*.doubleclick.net;
  frame-src https://www.googletagmanager.com https://maps.google.com https://www.google.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Content-Security-Policy", value: cspHeader },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
