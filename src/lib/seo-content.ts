import type { Metier } from "@/lib/cities";

/**
 * Deterministic string hash (djb2) — same (ville, metier, section, slot) always
 * resolves to the same phrase, but different cities land on different combos.
 */
function hashString(value: string): number {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 33) ^ value.charCodeAt(i);
  }
  return Math.abs(hash);
}

function pick<T>(items: readonly T[], seed: string): T {
  return items[hashString(seed) % items.length];
}

export const SECTIONS = ["depannage", "avancee", "installation"] as const;
export type Section = (typeof SECTIONS)[number];

export const SECTION_TITLES: Record<Metier, Record<Section, string>> = {
  plombier: {
    depannage: "Dépannage plombier à {ville}",
    avancee: "Recherche de fuite / Dépannage avancé",
    installation: "Installation professionnelle à {ville}",
  },
  serrurier: {
    depannage: "Dépannage serrurier à {ville}",
    avancee: "Ouverture de porte / Dépannage avancé",
    installation: "Installation professionnelle à {ville}",
  },
};

const HOOKS: Record<Metier, readonly string[]> = {
  plombier: [
    "Une fuite ou une panne ne prévient jamais.",
    "Chez Élite Dépannage, chaque urgence de plomberie est traitée avec la même rigueur.",
    "Le confort de votre logement dépend d'une plomberie fiable.",
    "Un problème de plomberie peut vite dégénérer si l'on tarde à réagir.",
  ],
  serrurier: [
    "Une porte claquée ou une serrure bloquée peut arriver à n'importe quel moment.",
    "La sécurité de votre logement ne doit jamais dépendre du hasard.",
    "Chez Élite Dépannage, chaque intervention de serrurerie est réalisée avec précision.",
    "Un incident de serrurerie génère toujours du stress : nous limitons les dégâts et le délai d'attente.",
  ],
};

const PROBLEMS: Record<Metier, Record<Section, readonly string[]>> = {
  plombier: {
    depannage: [
      "À {ville}, nos équipes interviennent aussi bien pour une chasse d'eau qui fuit que pour un chauffe-eau en panne.",
      "Les habitations anciennes du centre de {ville} présentent souvent des canalisations vieillissantes sujettes aux fuites.",
      "Entre les résidences récentes et les bâtiments historiques de {ville}, les besoins en plomberie varient fortement.",
      "De la cuisine à la salle de bains, une urgence plomberie à {ville} peut survenir à tout moment du jour ou de la nuit.",
    ],
    avancee: [
      "Repérer une fuite encastrée dans les murs d'un logement à {ville} demande un matériel de détection adapté.",
      "Nos techniciens à {ville} utilisent des caméras thermiques pour localiser précisément l'origine d'une fuite sans ouvrir tout un mur.",
      "Une canalisation bouchée à {ville} peut être traitée par furet électrique ou hydrocurage selon la nature du bouchon.",
      "Un chauffe-eau qui faiblit à {ville} est souvent le signe d'un entartrage ou d'une résistance à remplacer.",
    ],
    installation: [
      "Rénover une salle de bains à {ville} commence toujours par un diagnostic complet de l'installation existante.",
      "Installer un chauffe-eau neuf à {ville} nécessite de respecter les normes de ventilation et d'évacuation en vigueur.",
      "Poser une robinetterie de qualité à {ville} garantit une meilleure durabilité face au calcaire de l'eau locale.",
      "Un projet de plomberie à {ville}, qu'il soit petit ou grand, mérite un devis détaillé avant toute installation.",
    ],
  },
  serrurier: {
    depannage: [
      "À {ville}, nos serruriers interviennent aussi bien pour une porte claquée que pour une serrure grippée par le temps.",
      "Les immeubles anciens du centre de {ville} sont souvent équipés de serrures qu'il faut manier avec précaution.",
      "Entre logements récents et bâtiments historiques de {ville}, chaque serrure demande une approche différente.",
      "Une porte bloquée à {ville} peut survenir aussi bien à domicile qu'au local professionnel.",
    ],
    avancee: [
      "Ouvrir une porte à {ville} sans l'endommager demande une technique adaptée au type de serrure posée.",
      "Nos serruriers à {ville} interviennent aussi sur les serrures multipoints et les blindages récents.",
      "Une clé cassée dans le cylindre à {ville} peut souvent être retirée sans changer toute la serrure.",
      "Une tentative d'effraction à {ville} nécessite une sécurisation rapide du logement.",
    ],
    installation: [
      "Renforcer la sécurité d'un logement à {ville} commence par un diagnostic de la porte et de son dormant.",
      "Installer une serrure certifiée A2P à {ville} suppose de choisir un niveau adapté au risque du quartier.",
      "Poser un blindage de porte à {ville} renforce la résistance face aux tentatives d'effraction.",
      "Un projet de sécurisation à {ville}, qu'il soit simple ou complet, mérite un devis détaillé avant travaux.",
    ],
  },
};

const SOLUTIONS: Record<Metier, Record<Section, readonly string[]>> = {
  plombier: {
    depannage: [
      "Nos plombiers certifiés se déplacent en 30 minutes pour stopper les dégâts et sécuriser votre logement.",
      "Un devis clair vous est présenté avant toute intervention, sans mauvaise surprise sur la facture.",
      "Nous intervenons 7j/7, y compris les soirs et week-ends, pour répondre à votre urgence.",
      "Chaque réparation est réalisée avec du matériel de marques reconnues pour garantir sa durabilité.",
    ],
    avancee: [
      "Cette approche non destructive limite les travaux de réfection et réduit le coût final de l'intervention.",
      "Un rapport détaillé de la recherche de fuite vous est remis, utile notamment pour votre assurance.",
      "Nous traitons ensuite la réparation dans la foulée pour éviter un second déplacement.",
      "Cette méthode garantit un diagnostic fiable avant toute décision de travaux.",
    ],
    installation: [
      "Nous vous accompagnons du diagnostic jusqu'à la mise en service, avec une garantie sur pièces et main d'œuvre.",
      "Le devis gratuit détaille chaque poste pour une visibilité totale sur le budget de votre projet.",
      "Nos artisans respectent les normes en vigueur pour une installation conforme et pérenne.",
      "Un contrôle final est systématiquement réalisé pour valider l'étanchéité et le bon fonctionnement de l'installation.",
    ],
  },
  serrurier: {
    depannage: [
      "Nos serruriers certifiés se déplacent en 30 minutes pour vous permettre d'accéder à nouveau à votre logement.",
      "Un devis clair vous est présenté avant toute intervention, sans mauvaise surprise sur la facture.",
      "Nous intervenons 7j/7, y compris les soirs et week-ends, pour répondre à votre urgence.",
      "Chaque intervention est réalisée avec le souci de préserver votre serrure et votre porte autant que possible.",
    ],
    avancee: [
      "Cette méthode non destructive évite de remplacer inutilement une serrure encore fonctionnelle.",
      "Un rapport de l'intervention vous est remis, utile notamment pour votre assurance en cas d'effraction.",
      "Nous traitons la réparation ou le remplacement dans la foulée pour éviter un second déplacement.",
      "Cette approche garantit une ouverture fiable avant toute décision de remplacement.",
    ],
    installation: [
      "Nous vous accompagnons du diagnostic jusqu'à la pose, avec une garantie sur pièces et main d'œuvre.",
      "Le devis gratuit détaille chaque poste pour une visibilité totale sur le budget de votre projet.",
      "Nos artisans posent uniquement des serrures et blindages certifiés pour une sécurité durable.",
      "Un contrôle final est systématiquement réalisé pour valider le bon fonctionnement de la nouvelle installation.",
    ],
  },
};

export function getVilleMeta(metierLabel: string, villeLabel: string) {
  const keyword = `${metierLabel} à ${villeLabel}`;
  const title = `Dépannage ${metierLabel.toLowerCase()} à ${villeLabel} (34) | Urgence 30 min`;
  const description = `Intervention rapide 7j/7 pour tous vos besoins en ${metierLabel.toLowerCase()} à ${villeLabel}. Devis gratuit, artisans certifiés, disponibles en moins de 30 minutes.`;

  return { keyword, title, description };
}

export type CityContent = Record<Section, { title: string; paragraph: string }>;

export function generateCityContent(ville: string, metier: Metier): CityContent {
  const content = {} as CityContent;

  for (const section of SECTIONS) {
    const hook = pick(HOOKS[metier], `${ville}|${metier}|${section}|hook`);
    const problem = pick(
      PROBLEMS[metier][section],
      `${ville}|${metier}|${section}|problem`
    ).replaceAll("{ville}", ville);
    const solution = pick(
      SOLUTIONS[metier][section],
      `${ville}|${metier}|${section}|solution`
    );

    content[section] = {
      title: SECTION_TITLES[metier][section].replaceAll("{ville}", ville),
      paragraph: `${hook} ${problem} ${solution}`,
    };
  }

  return content;
}

const PLOMBIER_IMAGES = [
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1200&auto=format&fit=crop",
] as const;

const SERRURIER_IMAGES = [
  "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622372738946-62e02505feb3?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524293581917-878a6d017c71?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518481852452-9415b262eba4?q=80&w=1200&auto=format&fit=crop",
] as const;

/**
 * Picks an image per content block from the ville's string length (not a
 * random draw) — the same city always shows the same image, but the offset
 * per block index keeps the 3 blocks on one page visually distinct.
 */
export function getCityImage(ville: string, metier: Metier, blockIndex: number) {
  const images = metier === "serrurier" ? SERRURIER_IMAGES : PLOMBIER_IMAGES;
  const index = (ville.length * 7 + blockIndex * 3) % images.length;
  return images[index];
}
