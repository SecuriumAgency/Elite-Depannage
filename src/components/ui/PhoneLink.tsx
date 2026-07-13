"use client";

import type { AnchorHTMLAttributes } from "react";
import { reportPhoneCallConversion } from "@/lib/gtag";

const PHONE_HREF = "tel:0411939674";

type PhoneLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export default function PhoneLink({ onClick, ...props }: PhoneLinkProps) {
  return (
    <a
      href={PHONE_HREF}
      onClick={(event) => {
        reportPhoneCallConversion();
        onClick?.(event);
      }}
      {...props}
    />
  );
}
