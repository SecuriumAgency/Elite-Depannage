import type { Metadata } from "next";
import {
  getCityLabel,
  getMetierLabel,
  METIERS,
  SEO_CITIES,
  type Metier,
} from "@/lib/cities";
import { generateCityContent, getCityImage, SECTIONS } from "@/lib/seo-content";
import CityViewClient from "@/components/CityViewClient";

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

  return {
    title: `Dépannage ${metierLabel.toLowerCase()} à ${villeLabel} (34) | Urgence 30 min`,
    description: `Intervention rapide 7j/7 pour tous vos besoins en ${metierLabel.toLowerCase()} à ${villeLabel}. Devis gratuit, artisans certifiés, disponibles en moins de 30 minutes.`,
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

  const mapsLabel = `${metierLabel} ${villeLabel}`;

  return (
    <CityViewClient
      metier={metier}
      metierLabel={metierLabel}
      villeLabel={villeLabel}
      sections={sections}
      mapsQuery={encodeURIComponent(mapsLabel)}
      mapsLabel={mapsLabel}
    />
  );
}
