import type { Metadata } from "next";
import {
  getCityLabel,
  getMetierLabel,
  METIERS,
  SEO_CITIES,
  type Metier,
} from "@/lib/cities";
import {
  generateCityContent,
  getCityImage,
  getVilleMeta,
  SECTIONS,
} from "@/lib/seo-content";
import CityViewClient from "@/components/CityViewClient";
import { getBreadcrumbSchema, getServiceSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return METIERS.flatMap((metier) =>
    SEO_CITIES.map((city) => ({ metier: metier.slug, ville: city.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ metier: string; ville: string }>;
}): Promise<Metadata> {
  const { metier, ville } = await params;
  const metierLabel = getMetierLabel(metier);
  const villeLabel = getCityLabel(ville);
  const { title, description } = getVilleMeta(metierLabel, villeLabel);

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${metier}/${ville}`,
      types: { "text/markdown": `${SITE_URL}/${metier}/${ville}/markdown` },
    },
    openGraph: { title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function VillePage({
  params,
}: {
  params: Promise<{ metier: string; ville: string }>;
}) {
  const { metier, ville } = await params;

  const safeMetier: Metier = metier === "serrurier" ? "serrurier" : "plombier";
  const metierLabel = getMetierLabel(metier);
  const villeLabel = getCityLabel(ville);

  const content = generateCityContent(villeLabel, safeMetier);
  const sections = SECTIONS.map((key, i) => ({
    key,
    title: content[key].title,
    paragraph: content[key].paragraph,
    image: getCityImage(villeLabel, safeMetier, i),
  }));

  const serviceSchema = getServiceSchema(metierLabel, safeMetier, villeLabel, ville);
  const breadcrumbSchema = getBreadcrumbSchema(
    `${metierLabel} à ${villeLabel}`,
    `/${metier}/${ville}`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CityViewClient
        metier={metier}
        metierLabel={metierLabel}
        villeLabel={villeLabel}
        sections={sections}
      />
    </>
  );
}
