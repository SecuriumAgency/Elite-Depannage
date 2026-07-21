"use client";

import type { AnchorHTMLAttributes } from "react";
import { reportPhoneCallConversion } from "@/lib/gtag";
import { pushDataLayerEvent } from "@/lib/dataLayer";

const PHONE_HREF = "tel:+33411939674";

type PhoneLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  // Which CTA placement this is (e.g. "sticky_bar", "hero", "header"). Every
  // phone CTA site-wide goes through this one component specifically so the
  // generate_lead push can't be forgotten at a call site — `source` is what
  // lets GTM/GA4 tell which placement actually drives the calls.
  source: string;
};

export default function PhoneLink({ onClick, source, ...props }: PhoneLinkProps) {
  return (
    <a
      href={PHONE_HREF}
      onClick={(event) => {
        reportPhoneCallConversion();
        pushDataLayerEvent({
          event: "generate_lead",
          lead_type: "phone_call",
          tenant: "elite-depannage",
          source,
        });
        onClick?.(event);
      }}
      {...props}
    />
  );
}
