import type { MetadataRoute } from "next";
import { METIERS, SEO_CITIES } from "@/lib/cities";
import { BLOG_POSTS } from "@/lib/blog-content";
import { LEGAL_PAGES } from "@/lib/legal-content";
import { getSeoPages } from "@/lib/notion";

const BASE_URL = "https://www.elite-depannage-34.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const buildDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/llms.txt`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/llms-full.txt`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  const villeRoutes: MetadataRoute.Sitemap = METIERS.flatMap((metier) =>
    SEO_CITIES.map((city) => ({
      url: `${BASE_URL}/${metier.slug}/${city.slug}`,
      lastModified: buildDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }))
  );

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const legalRoutes: MetadataRoute.Sitemap = LEGAL_PAGES.map((page) => ({
    url: `${BASE_URL}/legal/${page.slug}`,
    lastModified: buildDate,
    changeFrequency: "yearly",
    priority: 0.2,
  }));

  const seoPages = await getSeoPages();
  const expertiseRoutes: MetadataRoute.Sitemap = seoPages.map((page) => ({
    url: `${BASE_URL}/expertises/${page.slug}`,
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...villeRoutes, ...blogRoutes, ...legalRoutes, ...expertiseRoutes];
}
