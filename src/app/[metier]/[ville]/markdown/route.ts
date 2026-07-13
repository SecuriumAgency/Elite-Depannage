import { METIERS, SEO_CITIES } from "@/lib/cities";
import { getVilleMarkdown } from "@/lib/markdown-mirrors";

export function generateStaticParams() {
  return METIERS.flatMap((metier) =>
    SEO_CITIES.map((city) => ({ metier: metier.slug, ville: city.slug }))
  );
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ metier: string; ville: string }> }
) {
  const { metier, ville } = await params;

  return new Response(getVilleMarkdown(metier, ville), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
