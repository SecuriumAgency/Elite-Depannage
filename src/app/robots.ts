import type { MetadataRoute } from "next";

const BASE_URL = "https://www.elite-depannage-34.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
