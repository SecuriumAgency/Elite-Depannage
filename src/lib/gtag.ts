export const GOOGLE_ADS_ID = "AW-18192943335";

const PHONE_CALL_CONVERSION_LABEL = "qsaaCJ2nn88cEOeRieND";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function reportPhoneCallConversion() {
  window.gtag?.("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${PHONE_CALL_CONVERSION_LABEL}`,
    value: 1.0,
    currency: "EUR",
  });
}
