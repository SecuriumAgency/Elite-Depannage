"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { scrollVelocity } from "@/lib/scroll-velocity";

export default function SmoothScroll() {
  useEffect(() => {
    // Touch devices already have native momentum scrolling; Lenis exists to
    // add that inertia to desktop mouse-wheel scroll. Skipping it on coarse
    // pointers avoids shipping/running it on mobile for zero visible benefit
    // (same `pointer: fine` gate as CustomCursor/BackgroundCanvas).
    const canHover = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!canHover || prefersReducedMotion) return;

    const lenis = new Lenis({
      autoRaf: false,
    });

    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      scrollVelocity.current = velocity;
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
