import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LEGAL_PAGES, getLegalPageBySlug } from "@/lib/legal-content";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return LEGAL_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPageBySlug(slug);
  if (!page) return {};

  return {
    // Root layout's title.template already appends " | Élite Dépannage 34".
    title: page.title,
    robots: "noindex, follow",
    alternates: {
      types: { "text/markdown": `${SITE_URL}/legal/${slug}/markdown` },
    },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLegalPageBySlug(slug);
  if (!page) notFound();

  return (
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
          {page.title}
        </h1>

        <div className="mt-12 space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-cyan-400">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-slate-400">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul className="space-y-2 pl-1">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
