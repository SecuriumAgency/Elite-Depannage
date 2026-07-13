import { SEO_CITIES, type Metier } from "@/lib/cities";

const BASE_URL = "https://www.elite-depannage-34.fr";
const PHONE = "+33411939674";
const NAME = "Élite Dépannage 34";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@id": `${BASE_URL}/#business`,
    "@type": ["Plumber", "Locksmith"],
    name: NAME,
    url: BASE_URL,
    image: `${BASE_URL}/opengraph-image`,
    telephone: PHONE,
    priceRange: "€€",
    // NOTE: no `address` field — no verified street address (SIRET/siège social)
    // exists in the codebase yet (see legal-content.ts "[à compléter]"). Adding a
    // fabricated one would create NAP inconsistency and actively hurt local SEO.
    // Add it here once the real registered address is available.
    areaServed: SEO_CITIES.map((city) => ({
      "@type": "City",
      name: city.name,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAYS_OF_WEEK,
      opens: "00:00",
      closes: "23:59",
    },
  };
}

export function getServiceSchema(
  metierLabel: string,
  metierSlug: Metier,
  villeLabel: string,
  villeSlug: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: metierLabel,
    provider: {
      "@type": ["Plumber", "Locksmith"],
      name: NAME,
      telephone: PHONE,
    },
    areaServed: {
      "@type": "City",
      name: villeLabel,
    },
    url: `${BASE_URL}/${metierSlug}/${villeSlug}`,
  };
}

export function getBreadcrumbSchema(pageName: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: `${BASE_URL}${path}`,
      },
    ],
  };
}
