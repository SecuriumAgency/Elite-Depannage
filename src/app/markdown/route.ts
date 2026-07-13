import { getHomeMarkdown } from "@/lib/markdown-mirrors";

export const dynamic = "force-static";

export async function GET() {
  return new Response(getHomeMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
