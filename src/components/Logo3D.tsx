"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Logo3D({
  className,
  size = "md",
}: {
  className?: string;
  size?: "md" | "lg";
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn("flex items-center gap-3 select-none", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        viewBox="0 0 200 200"
        className={cn(
          "h-auto shrink-0 overflow-visible",
          size === "lg" ? "w-14 md:w-24" : "w-10 md:w-11"
        )}
      >
        <defs>
          <linearGradient id="chromePipeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="32%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="68%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="keyNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <filter id="pipeSpecular" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feSpecularLighting
              in="blur"
              surfaceScale="4"
              specularConstant="0.9"
              specularExponent="18"
              lightingColor="#ffffff"
              result="specular"
            >
              <fePointLight x="60" y="20" z="60" />
            </feSpecularLighting>
            <feComposite
              in="specular"
              in2="SourceAlpha"
              operator="in"
              result="specularClipped"
            />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="specularClipped" />
            </feMerge>
          </filter>
          <filter id="keyDropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="3"
              dy="4"
              stdDeviation="3"
              floodColor="#020617"
              floodOpacity="0.55"
            />
          </filter>
        </defs>

        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Tuyau chrome liquide en arriere-plan */}
          <g filter="url(#pipeSpecular)">
            <line
              x1="35"
              y1="165"
              x2="165"
              y2="35"
              stroke="url(#chromePipeGrad)"
              strokeWidth="22"
              strokeLinecap="round"
            />
            {/* Brides de fixation */}
            <circle cx="35" cy="165" r="15" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="165" cy="35" r="15" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="79" cy="121" r="12" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
            <circle cx="121" cy="79" r="12" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
          </g>

          {/* Cle de serrurier croisee, neon cyber */}
          <motion.g
            filter="url(#keyDropShadow)"
            style={{ transformOrigin: "100px 100px" }}
            animate={{ rotate: isHovered ? -5 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <line
              x1="52"
              y1="52"
              x2="140"
              y2="140"
              stroke="url(#keyNeonGrad)"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Tete hexagonale premium */}
            <g transform="translate(50,50) rotate(45)">
              <polygon
                points="0,-17 14.7,-8.5 14.7,8.5 0,17 -14.7,8.5 -14.7,-8.5"
                fill="url(#keyNeonGrad)"
                stroke="#083344"
                strokeWidth="1.5"
              />
              <circle cx="0" cy="0" r="6" fill="#020617" />
            </g>
            {/* Panneton (dents) */}
            <g transform="translate(142,142) rotate(45)">
              <rect x="-3" y="0" width="16" height="7" fill="url(#keyNeonGrad)" />
              <rect x="-3" y="10" width="10" height="7" fill="url(#keyNeonGrad)" />
            </g>
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
