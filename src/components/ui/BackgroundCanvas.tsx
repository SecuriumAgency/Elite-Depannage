"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const BackgroundScene = dynamic(() => import("./BackgroundScene"), {
  ssr: false,
});

export default function BackgroundCanvas() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

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
