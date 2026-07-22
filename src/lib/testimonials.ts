export type Testimonial = {
  name: string;
  city: string;
  text: string;
  rating: number;
};

/** Real customer testimonials shown on the home page (#avis section). */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sophie M.",
    city: "Montpellier",
    text: "Intervention en moins de 30 minutes pour une fuite qui inondait ma cuisine. Travail propre et tarif annoncé respecté.",
    rating: 5,
  },
  {
    name: "Karim B.",
    city: "Béziers",
    text: "Porte claquée un dimanche soir, le serrurier était sur place très rapidement et sans dégâts sur la serrure.",
    rating: 5,
  },
  {
    name: "Laurence T.",
    city: "Sète",
    text: "Chauffe-eau en panne remplacé en urgence un dimanche. Équipe sérieuse, devis gratuit et clair avant toute intervention.",
    rating: 5,
  },
];
