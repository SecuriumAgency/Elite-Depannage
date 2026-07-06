export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const INTERVENTION_CITIES = [
  { name: "Montpellier", postalCode: "34000" },
  { name: "Béziers", postalCode: "34500" },
  { name: "Sète", postalCode: "34200" },
  { name: "Agde", postalCode: "34300" },
  { name: "Lunel", postalCode: "34400" },
  { name: "Castelnau-le-Lez", postalCode: "34170" },
  { name: "Frontignan", postalCode: "34110" },
  { name: "Lattes", postalCode: "34970" },
  { name: "Mauguio", postalCode: "34130" },
  { name: "Juvignac", postalCode: "34990" },
  { name: "Mèze", postalCode: "34140" },
  { name: "Saint-Jean-de-Védas", postalCode: "34430" },
  { name: "Villeneuve-lès-Maguelone", postalCode: "34750" },
  { name: "Clermont-l'Hérault", postalCode: "34800" },
  { name: "Pérols", postalCode: "34470" },
  { name: "Pézenas", postalCode: "34120" },
  { name: "Jacou", postalCode: "34830" },
].map((city) => ({ ...city, slug: slugify(city.name) }));

/** The 28 cities covered by the local SEO grid + statically generated pages. */
export const SEO_CITIES = [
  "Montpellier",
  "Béziers",
  "Sète",
  "Agde",
  "Lunel",
  "Frontignan",
  "Castelnau-le-Lez",
  "Lattes",
  "Mauguio",
  "Mèze",
  "Villeneuve-lès-Maguelone",
  "Pérols",
  "Saint-Jean-de-Védas",
  "La Grande-Motte",
  "Baillargues",
  "Pignan",
  "Palavas-les-Flots",
  "Fabrègues",
  "Vendargues",
  "Clapiers",
  "Jacou",
  "Le Crès",
  "Saint-Gély-du-Fesc",
  "Prades-le-Lez",
  "Cournonterral",
  "Gigean",
  "Balaruc-les-Bains",
  "Pézenas",
].map((name) => ({ name, slug: slugify(name) }));

/** Union of every known city (SEO grid ∪ footer list), deduped by slug. */
const ALL_CITIES = [...INTERVENTION_CITIES, ...SEO_CITIES].reduce<
  Array<{ name: string; slug: string; postalCode?: string }>
>((acc, city) => {
  if (!acc.some((existing) => existing.slug === city.slug)) acc.push(city);
  return acc;
}, []);

export const METIERS = [
  { slug: "plombier", label: "Plombier" },
  { slug: "serrurier", label: "Serrurier" },
] as const;

export type Metier = (typeof METIERS)[number]["slug"];

export function getCityBySlug(slug: string) {
  return ALL_CITIES.find((city) => city.slug === slug);
}

export function getCityLabel(slug: string) {
  return (
    getCityBySlug(slug)?.name ??
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export function getMetierLabel(slug: string) {
  return (
    METIERS.find((metier) => metier.slug === slug)?.label ??
    slug.charAt(0).toUpperCase() + slug.slice(1)
  );
}
