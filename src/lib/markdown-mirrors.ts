import {
  getCityLabel,
  getMetierLabel,
  METIERS,
  SEO_CITIES,
  type Metier,
} from "@/lib/cities";
import { generateCityContent, getVilleMeta, SECTIONS } from "@/lib/seo-content";
import { getBlogPostBySlug } from "@/lib/blog-content";
import { getLegalPageBySlug } from "@/lib/legal-content";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";

function renderSections(sections: { heading: string; paragraphs: string[]; list?: string[] }[]) {
  return sections.map((section) => {
    const paragraphs = section.paragraphs.join("\n\n");
    const list = section.list?.map((item) => `- ${item}`).join("\n");
    return `## ${section.heading}\n\n${paragraphs}${list ? `\n\n${list}` : ""}`;
  });
}

export function getHomeMarkdown(): string {
  const villeLines = METIERS.flatMap((metier) =>
    SEO_CITIES.map(
      (city) =>
        `- [${metier.label} à ${city.name}](${SITE_URL}/${metier.slug}/${city.slug})`
    )
  );

  return `# ${SITE_TITLE}

${SITE_DESCRIPTION}

## Téléphone

04 11 93 96 74 — intervention en 30 minutes, 7j/7.

## Métiers

${METIERS.map((metier) => `- ${metier.label}`).join("\n")}

## Zone d'intervention (Hérault, 34)

${villeLines.join("\n")}
`;
}

export function getVilleMarkdown(metierSlug: string, villeSlug: string): string {
  const safeMetier: Metier = metierSlug === "serrurier" ? "serrurier" : "plombier";
  const metierLabel = getMetierLabel(metierSlug);
  const villeLabel = getCityLabel(villeSlug);
  const { keyword, title, description } = getVilleMeta(metierLabel, villeLabel);

  const content = generateCityContent(villeLabel, safeMetier);
  const sections = SECTIONS.map(
    (key) => `## ${content[key].title}\n\n${content[key].paragraph}`
  );

  return `# ${keyword}

## ${title}

${description}

${sections.join("\n\n")}
`;
}

export function getBlogMarkdown(slug: string): string | null {
  const post = getBlogPostBySlug(slug);
  if (!post) return null;

  const title = `${post.title} | Élite Dépannage 34`;

  return `# ${post.title}

## ${title}

${post.excerpt}

${renderSections(post.sections).join("\n\n")}
`;
}

export function getLegalMarkdown(slug: string): string | null {
  const page = getLegalPageBySlug(slug);
  if (!page) return null;

  const title = `${page.title} | Élite Dépannage 34`;

  return `# ${page.title}

## ${title}

${renderSections(page.sections).join("\n\n")}
`;
}
