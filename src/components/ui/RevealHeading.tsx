"use client";

import { useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { scrollVelocity } from "@/lib/scroll-velocity";

export default function RevealHeading({
  as = "h2",
  children,
  className,
}: {
  as?: "h2" | "h3";
  children: string;
  className?: string;
}) {
  const Tag = as;
  const controls = useAnimationControls();
  const triggered = useRef(false);

  function handleEnter() {
    if (triggered.current) return;
    triggered.current = true;

    const velocity = Math.min(Math.abs(scrollVelocity.current), 60);
    const duration = Math.max(0.5, 0.9 - velocity / 120);

    controls.start({
      y: "0%",
      skewY: 0,
      filter: "blur(0px)",
      transition: { duration, ease: [0.16, 1, 0.3, 1] },
    });
  }

  return (
    <Tag className={className}>
      <span className="block overflow-hidden">
        <motion.span
          className="block"
          initial={{ y: "100%", skewY: 6, filter: "blur(6px)" }}
          animate={controls}
          onViewportEnter={handleEnter}
          viewport={{ once: true, margin: "-100px" }}
        >
          {children}
        </motion.span>
      </span>
    </Tag>
  );
}
