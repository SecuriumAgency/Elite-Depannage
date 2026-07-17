"use client";

import { Phone } from "lucide-react";
import PhoneLink from "@/components/ui/PhoneLink";

/**
 * Persistent thumb-zone CTA for mobile. Complements the header's compact
 * call icon (which sits behind a `fixed top-0` bar) with a full-width,
 * high-contrast bar in the zone users actually reach while scrolling.
 * Hidden on lg+ where the sidebar CTA (see CityViewClient) already covers this.
 */
export default function StickyCallButton() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-red-400/30 bg-red-600 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.35)] lg:hidden">
      <PhoneLink
        aria-label="Urgence 24h/7j - Appeler le 04 11 93 96 74"
        className="flex w-full items-center justify-center gap-2 py-3.5 text-base font-black text-white uppercase tracking-wide"
      >
        <Phone className="h-5 w-5 shrink-0" />
        Urgence 24h/7j — Appeler maintenant
      </PhoneLink>
    </div>
  );
}
