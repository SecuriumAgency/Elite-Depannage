import { METIERS, SEO_CITIES } from "@/lib/cities";
import { BLOG_POSTS } from "@/lib/blog-content";
import { LEGAL_PAGES } from "@/lib/legal-content";
import {
  getBlogMarkdown,
  getHomeMarkdown,
  getLegalMarkdown,
  getVilleMarkdown,
} from "@/lib/markdown-mirrors";

export const dynamic = "force-static";

export async function GET() {
  const parts: string[] = [getHomeMarkdown()];

  for (const metier of METIERS) {
    for (const city of SEO_CITIES) {
      parts.push(getVilleMarkdown(metier.slug, city.slug));
    }
  }

  for (const post of BLOG_POSTS) {
    const markdown = getBlogMarkdown(post.slug);
    if (markdown) parts.push(markdown);
  }

  for (const page of LEGAL_PAGES) {
    const markdown = getLegalMarkdown(page.slug);
    if (markdown) parts.push(markdown);
  }

  const body = parts.join("\n\n---\n\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
