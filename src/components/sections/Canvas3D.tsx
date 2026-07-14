"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Hero3DScene = dynamic(() => import("./Hero3DScene"), { ssr: false });

export default function Canvas3D() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Desktop-only, premium ambiance: a full react-three-fiber scene with
    // PBR materials + bloom post-processing is expensive to init/parse on a
    // throttled mobile CPU (measured elsewhere on this site: WebGL init was
    // the single largest contributor to mobile TBT/LCP regressions). Scope
    // it to fine pointers only — same convention as CustomCursor/SmoothScroll
    // — and defer the mount until the browser is idle so it never competes
    // with the Hero's own LCP text for main-thread time.
    const canHover = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!canHover || prefersReducedMotion) return;

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setReady(true));
      return () => window.cancelIdleCallback(id);
    }

    const timeoutId = window.setTimeout(() => setReady(true), 300);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!ready) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Hero3DScene />
    </div>
  );
}
