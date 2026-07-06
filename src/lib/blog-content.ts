export type BlogSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  sections: BlogSection[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "fuite-encastree-que-faire",
    title: "Fuite encastrée : que faire ?",
    excerpt:
      "Les bons réflexes avant l'arrivée du plombier pour limiter les dégâts des eaux et préserver vos murs.",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop",
    sections: [
      {
        heading: "Les signes qui doivent alerter",
        paragraphs: [
          "Une fuite encastrée se cache dans une cloison, une chape ou un plafond, ce qui la rend difficile à repérer avant qu'elle ne cause de vrais dégâts. Certains signes ne trompent pourtant pas :",
        ],
        list: [
          "Une facture d'eau anormalement élevée sans changement d'usage",
          "Une tache d'humidité qui apparaît sur un mur ou un plafond",
          "Un bruit d'écoulement continu derrière une cloison",
          "Une odeur de moisi persistante dans une pièce",
          "Le compteur d'eau qui continue de tourner alors qu'aucun robinet n'est ouvert",
        ],
      },
      {
        heading: "La détection par caméra thermique",
        paragraphs: [
          "La caméra thermique repère les variations de température provoquées par l'humidité et par la circulation de l'eau dans une canalisation. Une zone anormalement froide (ou chaude, sur un circuit d'eau chaude) trahit le trajet de la fuite sans qu'il soit nécessaire d'ouvrir le mur.",
          "Cette méthode non destructive permet à nos techniciens de cibler la zone à traiter avec une précision de quelques centimètres, avant toute intervention.",
        ],
      },
      {
        heading: "La recherche par gaz traceur",
        paragraphs: [
          "Quand la fuite est plus profonde ou sur une canalisation difficile d'accès, nous utilisons un gaz traceur : un mélange inerte (hydrogène et azote), non toxique et non inflammable aux concentrations utilisées, injecté dans la canalisation vidée.",
          "Ce gaz s'échappe par la moindre fissure et remonte à travers le carrelage, la chape ou le mur jusqu'à la surface, où un détecteur électronique très sensible le repère avec précision. C'est la méthode de référence pour les fuites les plus discrètes.",
        ],
      },
      {
        heading: "Que faire en attendant l'intervention",
        paragraphs: [
          "En attendant l'arrivée de notre équipe, quelques gestes simples limitent l'aggravation des dégâts :",
        ],
        list: [
          "Couper l'arrivée d'eau générale si cela est possible",
          "Couper l'électricité de la zone si l'humidité s'approche d'une installation électrique",
          "Ne jamais percer ou casser le mur soi-même",
          "Prendre des photos des dégâts pour votre assurance",
          "Contacter un plombier certifié rapidement pour limiter les dégâts des eaux",
        ],
      },
    ],
  },
  {
    slug: "serrure-a2p-guide-complet",
    title: "Serrure A2P : le guide complet",
    excerpt:
      "Comprendre les certifications A2P (1, 2 ou 3 étoiles) pour choisir une serrure réellement adaptée à votre logement.",
    image:
      "https://images.unsplash.com/photo-1622372738946-62e02505feb3?q=80&w=800&auto=format&fit=crop",
    sections: [
      {
        heading: "Qu'est-ce que la certification A2P",
        paragraphs: [
          "A2P signifie « Assurance Prévention Protection ». C'est un label français délivré par le CNPP (Centre National de Prévention et de Protection), qui certifie la résistance à l'effraction d'une serrure, d'un verrou ou d'un bloc-porte.",
          "Contrairement à un simple argument commercial, il s'agit d'un test normé réalisé en laboratoire indépendant : seule une serrure ayant réellement résisté aux essais peut porter ce label.",
        ],
      },
      {
        heading: "La norme CNPP et les 3 niveaux d'étoiles",
        paragraphs: [
          "La certification distingue trois niveaux de résistance, exprimés en étoiles :",
        ],
        list: [
          "A2P 1 étoile : résiste au moins 5 minutes à une tentative d'effraction avec un outillage standard",
          "A2P 2 étoiles : résiste au moins 10 minutes face à des outils plus variés (pied-de-biche, perceuse...)",
          "A2P 3 étoiles : résiste au moins 15 minutes face à un outillage complet, y compris électroportatif",
        ],
      },
      {
        heading: "Résistance et temps d'effraction",
        paragraphs: [
          "Ces durées correspondent au temps moyen qu'un cambrioleur est prêt à consacrer avant d'abandonner : chaque minute de résistance supplémentaire dissuade. En laboratoire, les serrures sont soumises à des essais d'arrachement, de perçage, de sciage et de crochetage avant l'attribution du label.",
          "C'est cette rigueur qui distingue une serrure réellement certifiée d'une serrure simplement présentée comme « haute sécurité » sans preuve indépendante.",
        ],
      },
      {
        heading: "Incidence sur votre assurance habitation",
        paragraphs: [
          "De nombreux contrats d'assurance habitation exigent ou recommandent une serrure A2P — souvent 2 étoiles minimum — pour certains logements ou certaines zones. Certains assureurs accordent même une réduction de prime en présence d'une serrure A2P certifiée.",
          "Il est essentiel de vérifier les clauses de son contrat : en cas de cambriolage sans serrure conforme aux exigences, l'indemnisation peut être réduite, voire refusée.",
        ],
      },
    ],
  },
  {
    slug: "porte-claquee-bons-reflexes",
    title: "Porte claquée : les bons réflexes",
    excerpt:
      "Comment réagir face à une porte qui claque sans dégrader la serrure avant l'arrivée du serrurier.",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop",
    sections: [
      {
        heading: "Comprendre pourquoi une porte claque",
        paragraphs: [
          "Un courant d'air, un pêne demi-tour qui se verrouille automatiquement en claquant, ou tout simplement un oubli de clé à l'intérieur : les portes claquées sont l'une des urgences les plus fréquentes que nos serruriers traitent, à toute heure du jour ou de la nuit.",
        ],
      },
      {
        heading: "La technique dite « de la radiographie » et ses limites",
        paragraphs: [
          "Sur certaines serrures simples, un pêne demi-tour non verrouillé peut être repoussé à l'aide d'une carte rigide et fine glissée entre la porte et le dormant — une technique historiquement surnommée « technique de la radio », du nom des films radiographiques rigides autrefois utilisés à cet effet.",
          "Cette méthode ne fonctionne que sur un pêne demi-tour simple, non verrouillé : elle est inopérante sur une serrure multipoint, un pêne dormant engagé, ou une porte blindée certifiée A2P, conçue précisément pour y résister. Tentée sans expérience, elle risque surtout d'endommager le dormant ou le mécanisme de la serrure, transformant un simple incident en réparation coûteuse.",
        ],
      },
      {
        heading: "Pourquoi préserver le cylindre",
        paragraphs: [
          "Forcer ou percer une serrure est toujours la solution de dernier recours : elle détruit le cylindre, qui doit ensuite être intégralement remplacé. Nos serruriers privilégient systématiquement les méthodes non destructives — crochetage professionnel, décoffrage ou technique adaptée au modèle exact de la serrure — pour préserver votre cylindre existant et limiter le coût de l'intervention.",
        ],
      },
      {
        heading: "Quand appeler un serrurier professionnel",
        paragraphs: [
          "Certaines situations ne doivent jamais être tentées seul :",
        ],
        list: [
          "Porte équipée d'une serrure multipoint ou d'un blindage",
          "Clé cassée dans le cylindre",
          "Porte claquée avec le pêne dormant engagé",
          "Toute tentative infructueuse ayant déjà endommagé la porte",
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
