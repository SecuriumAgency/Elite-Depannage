export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type LegalPage = {
  slug: string;
  title: string;
  sections: LegalSection[];
};

export const LEGAL_PAGES: LegalPage[] = [
  {
    slug: "mentions-legales",
    title: "Mentions légales",
    sections: [
      {
        heading: "Éditeur du site",
        paragraphs: [
          "Le site www.elite-depannage-34.fr est édité par Élite Dépannage 34.",
        ],
        list: [
          "Forme juridique : [à compléter]",
          "Siège social : [à compléter]",
          "SIRET : [à compléter]",
          "Téléphone : 04 11 93 96 74",
          "Directeur de la publication : [à compléter]",
        ],
      },
      {
        heading: "Hébergement",
        paragraphs: ["Ce site est hébergé par :"],
        list: [
          "IONOS SARL",
          "7 place de la Gare, 57200 Sarreguemines, France",
          "Site web : ionos.fr",
        ],
      },
      {
        heading: "Propriété intellectuelle",
        paragraphs: [
          "L'ensemble des contenus présents sur ce site (textes, images, logo, charte graphique) est la propriété exclusive d'Élite Dépannage 34, sauf mention contraire. Toute reproduction, même partielle, est soumise à autorisation préalable.",
        ],
      },
      {
        heading: "Limitation de responsabilité",
        paragraphs: [
          "Élite Dépannage 34 s'efforce de fournir des informations aussi précises que possible sur ce site. Elle ne pourra toutefois être tenue responsable des omissions, inexactitudes ou carences dans la mise à jour, qu'elles soient de son fait ou du fait de tiers partenaires.",
        ],
      },
    ],
  },
  {
    slug: "politique-confidentialite",
    title: "Politique de confidentialité",
    sections: [
      {
        heading: "Données collectées",
        paragraphs: [
          "Dans le cadre de nos formulaires de contact et de demande de rappel, nous collectons : nom, numéro de téléphone, code postal, et le type d'urgence signalée.",
        ],
      },
      {
        heading: "Finalité du traitement",
        paragraphs: [
          "Ces données sont utilisées exclusivement pour traiter votre demande d'intervention et vous recontacter dans les meilleurs délais.",
        ],
      },
      {
        heading: "Durée de conservation",
        paragraphs: [
          "Les données collectées via nos formulaires sont conservées pendant une durée de 3 ans à compter du dernier contact, conformément aux recommandations de la CNIL en matière de prospection commerciale. Passé ce délai, elles sont supprimées ou anonymisées.",
        ],
      },
      {
        heading: "Destinataires des données",
        paragraphs: [
          "Vos données ne sont ni vendues, ni louées, ni cédées à des tiers à des fins commerciales. Elles sont uniquement accessibles à notre équipe d'intervention.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "Ce site peut utiliser des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire tiers n'est déposé sans consentement préalable.",
        ],
      },
    ],
  },
  {
    slug: "rgpd",
    title: "RGPD — Conformité CNIL",
    sections: [
      {
        heading: "Vos droits",
        paragraphs: [
          "Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos données personnelles :",
        ],
        list: [
          "Droit d'accès",
          "Droit de rectification",
          "Droit à l'effacement (« droit à l'oubli »)",
          "Droit à la limitation du traitement",
          "Droit d'opposition",
          "Droit à la portabilité des données",
        ],
      },
      {
        heading: "Comment exercer vos droits",
        paragraphs: [
          "Pour exercer l'un de ces droits, vous pouvez nous contacter par téléphone au 04 11 93 96 74 ou par voie postale à l'adresse de notre siège social. Une réponse vous sera apportée dans un délai maximum d'un mois.",
        ],
      },
      {
        heading: "Réclamation auprès de la CNIL",
        paragraphs: [
          "Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) : www.cnil.fr.",
        ],
      },
      {
        heading: "Sécurité des données",
        paragraphs: [
          "Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour garantir la sécurité et la confidentialité de vos données personnelles contre tout accès non autorisé, perte ou divulgation.",
        ],
      },
    ],
  },
];

export function getLegalPageBySlug(slug: string) {
  return LEGAL_PAGES.find((page) => page.slug === slug);
}
