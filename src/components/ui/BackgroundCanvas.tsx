"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const BackgroundScene = dynamic(() => import("./BackgroundScene"), {
  ssr: false,
});

export default function BackgroundCanvas() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Desktop-only ambiance: this mounts a full react-three-fiber/Three.js
    // canvas purely for decoration. On touch devices it sits mostly hidden
    // behind opaque section backgrounds anyway, but the WebGL init + shader
    // compile cost multiple seconds of main-thread JS on a throttled mobile
    // CPU (measured: it's the single largest script-evaluation chunk on the
    // page, and a major contributor to mobile TBT/LCP). Gate it out entirely
    // where there's no fine pointer, same convention as CustomCursor.
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
    <div className="pointer-events-none fixed inset-0 -z-[1]" aria-hidden>
      <BackgroundScene />
    </div>
  );
}
