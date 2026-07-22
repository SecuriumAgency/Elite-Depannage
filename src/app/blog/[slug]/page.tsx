import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Phone } from "lucide-react";
import PhoneLink from "@/components/ui/PhoneLink";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog-content";
import { getBreadcrumbSchema, toJsonLdHtml } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  // `title` here is run through the root layout's title.template, which already
  // appends " | Élite Dépannage 34" — openGraph/twitter titles aren't templated,
  // so they need the suffix spelled out explicitly to match the resolved <title>.
  const fullTitle = `${post.title} | Élite Dépannage 34`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
      types: { "text/markdown": `${SITE_URL}/blog/${slug}/markdown` },
    },
    openGraph: {
      title: fullTitle,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const breadcrumbSchema = getBreadcrumbSchema(post.title, `/blog/${slug}`);

  return (
    <main className="mx-auto max-w-3xl px-4 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdHtml(breadcrumbSchema) }}
      />
      <Link
        href="/#blog"
        className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour
      </Link>

      <div className="relative mt-8 h-64 w-full overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:h-80">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
      </div>

      <article>
        <h1 className="mt-8 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-4xl font-black tracking-tight text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.35)] sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-slate-400">{post.excerpt}</p>

        <div className="mt-12 space-y-12">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold text-white">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-slate-400">
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

      <div className="mt-16 rounded-3xl border border-cyan-400/40 bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-800 p-8 text-center shadow-[0_0_40px_rgba(34,211,238,0.3)]">
        <p className="text-lg font-bold text-white">Une urgence maintenant ?</p>
        <PhoneLink className="mt-4 inline-flex items-center gap-2 text-3xl font-black text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all hover:scale-105">
          <Phone className="h-7 w-7" />
          04 11 93 96 74
        </PhoneLink>
      </div>
    </main>
  );
}
