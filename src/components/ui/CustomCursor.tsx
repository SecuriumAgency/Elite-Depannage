"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HOVER_SELECTOR =
  'a, button, [role="button"], input, select, textarea, [data-cursor="hover"]';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    const canHover = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!canHover || prefersReducedMotion) return;

    // One-time client-only capability gate: window/matchMedia don't exist
    // during SSR, so this can only be resolved post-mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.body.style.cursor = "none";

    function handleMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }

    function handleOver(e: PointerEvent) {
      if ((e.target as Element)?.closest?.(HOVER_SELECTOR)) {
        setIsHovering(true);
      }
    }

    function handleOut(e: PointerEvent) {
      if ((e.target as Element)?.closest?.(HOVER_SELECTOR)) {
        setIsHovering(false);
      }
    }

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerover", handleOver);
    document.addEventListener("pointerout", handleOut);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerout", handleOut);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full bg-white mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: isHovering ? 56 : 16, height: isHovering ? 56 : 16 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    />
  );
}
