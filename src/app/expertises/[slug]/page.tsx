import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";
import PhoneLink from "@/components/ui/PhoneLink";
import { getSeoPages, type SeoPage } from "@/lib/notion";
import { getBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

async function getPageBySlug(slug: string): Promise<SeoPage | null> {
  const pages = await getSeoPages();
  return pages.find((page) => page.slug === slug) ?? null;
}

// Notion content is a system boundary: normalize away a manually-typed brand
// suffix so the root layout's title.template doesn't double it up.
function stripBrandSuffix(title: string): string {
  return title.replace(/\s*[|\-–]\s*Élite Dépannage 34\s*$/iu, "").trim();
}

export async function generateStaticParams() {
  const pages = await getSeoPages();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return {};

  const title = stripBrandSuffix(page.metaTitle);
  const fullTitle = `${title} | Élite Dépannage 34`;

  return {
    title,
    description: page.metaDescription,
    alternates: { canonical: `${SITE_URL}/expertises/${slug}` },
    openGraph: {
      title: fullTitle,
      description: page.metaDescription,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.metaDescription,
    },
  };
}

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  const title = stripBrandSuffix(page.metaTitle);
  const breadcrumbSchema = getBreadcrumbSchema(title, `/expertises/${slug}`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="mx-auto max-w-3xl px-4 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Link>

        <article>
          <h1 className="mt-8 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-4xl font-black tracking-tight text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.35)] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg text-slate-400">{page.metaDescription}</p>

          <PhoneLink
            aria-label="Appeler Élite Dépannage 34"
            source="expertise_page"
            className="mt-10 inline-flex min-h-[56px] items-center gap-3 rounded-full bg-cyan-500 px-8 py-4 text-base font-bold text-slate-950 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]"
          >
            <Phone className="h-5 w-5" />
            Appeler Élite Dépannage 34
          </PhoneLink>
        </article>
      </main>
    </>
  );
}
