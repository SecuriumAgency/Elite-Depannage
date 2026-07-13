import { notFound } from "next/navigation";
import { LEGAL_PAGES } from "@/lib/legal-content";
import { getLegalMarkdown } from "@/lib/markdown-mirrors";

export function generateStaticParams() {
  return LEGAL_PAGES.map((page) => ({ slug: page.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = getLegalMarkdown(slug);
  if (!body) notFound();

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
