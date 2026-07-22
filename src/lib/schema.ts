import { SEO_CITIES, type Metier } from "@/lib/cities";
import { SITE_DESCRIPTION, SITE_URL as BASE_URL } from "@/lib/site";
import { TESTIMONIALS } from "@/lib/testimonials";

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
    description: SITE_DESCRIPTION,
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
    // Sourced from the testimonials visibly displayed in the #avis section on
    // the home page — Google requires review markup to reflect on-page content.
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (
        TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length
      ).toFixed(1),
      reviewCount: TESTIMONIALS.length,
    },
    review: TESTIMONIALS.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewBody: t.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
      },
    })),
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
