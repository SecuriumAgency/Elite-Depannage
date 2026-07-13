import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog-content";
import { getBlogMarkdown } from "@/lib/markdown-mirrors";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = getBlogMarkdown(slug);
  if (!body) notFound();

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
