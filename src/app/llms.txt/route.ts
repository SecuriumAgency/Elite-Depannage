import { METIERS, SEO_CITIES, getCityLabel, getMetierLabel } from "@/lib/cities";
import { BLOG_POSTS } from "@/lib/blog-content";
import { LEGAL_PAGES } from "@/lib/legal-content";
import { SITE_URL as BASE_URL } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const villeLines = METIERS.flatMap((metier) =>
    SEO_CITIES.map((city) => {
      const metierLabel = getMetierLabel(metier.slug);
      const villeLabel = getCityLabel(city.slug);
      const url = `${BASE_URL}/${metier.slug}/${city.slug}`;
      return `- [${metierLabel} à ${villeLabel}](${url}) — version Markdown : ${url}/markdown`;
    })
  );

  const blogLines = BLOG_POSTS.map(
    (post) =>
      `- [${post.title}](${BASE_URL}/blog/${post.slug}) — version Markdown : ${BASE_URL}/blog/${post.slug}/markdown`
  );

  const legalLines = LEGAL_PAGES.map(
    (page) =>
      `- [${page.title}](${BASE_URL}/legal/${page.slug}) — version Markdown : ${BASE_URL}/legal/${page.slug}/markdown`
  );

  const body = `# Élite Dépannage 34

> Élite Dépannage 34 est une entreprise d'artisanat d'urgence (plomberie et serrurerie) intervenant dans tout le département de l'Hérault (34). Nos artisans certifiés se déplacent en 30 minutes, 7j/7, pour toute panne, fuite ou porte claquée. Devis gratuit avant toute intervention.

## Coordonnées

- Téléphone : 04 11 93 96 74
- Zone d'intervention : Hérault (34) — Montpellier, Béziers, Sète, Agde et ${SEO_CITIES.length - 4} autres communes
- Métiers : ${METIERS.map((m) => m.label).join(", ")}

## Page d'accueil

- [Élite Dépannage 34](${BASE_URL}) — version Markdown : ${BASE_URL}/markdown
- Contenu complet du site en un seul fichier : ${BASE_URL}/llms-full.txt

## Pages d'intervention locales

${villeLines.join("\n")}

## Articles de blog

${blogLines.join("\n")}

## Pages légales

${legalLines.join("\n")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
