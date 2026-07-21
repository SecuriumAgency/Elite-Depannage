import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ipAddress } from "@vercel/functions";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { GTM_IDS } from "@/lib/gtmConfig";

/**
 * Anti-click-fraud gate for paid (SEA) traffic.
 *
 * A Google Ads click ID (`gclid`/`gbraid`/`wbraid`) on the landing URL marks
 * that visit as billable. A competitor (or a bot) repeatedly clicking the
 * same ad from the same IP burns the Ads budget without ever converting.
 * This caps how many ad-tagged landing hits a single IP gets per day; once
 * the cap is hit, the click ID is stripped and the visitor is bounced to the
 * homepage *before* the page — and therefore GTM/GA4 — ever sees the
 * `gclid`, so the hit never gets attributed back to the campaign.
 *
 * Requires an Upstash Redis database (its client talks REST over fetch, so
 * it works the same whether Proxy ends up running on the Node.js runtime —
 * the Next.js 16 default — or Edge; a traditional TCP client like ioredis
 * would need extra config to work in either). Set:
 *   UPSTASH_REDIS_REST_URL=...
 *   UPSTASH_REDIS_REST_TOKEN=...
 * Vercel's "KV" storage is the same Upstash product under a different name,
 * so the REST URL/token from a Vercel KV store work here unchanged.
 *
 * Fails OPEN when Redis isn't configured: ad traffic lands normally instead
 * of every visitor getting redirected because a secret is missing. A
 * misconfigured budget guard must never be able to turn into a full site
 * outage — especially not for a 24/7 emergency callout business.
 */

const MAX_SPONSORED_CLICKS_PER_DAY = 2;
const RATE_LIMIT_WINDOW = "24 h";
const AD_CLICK_PARAMS = ["gclid", "gbraid", "wbraid"];

// Domains this guard runs on. Reuses the tenant list from gtmConfig.ts
// instead of a second hardcoded domain list, so onboarding a new tenant
// there also covers it here — the two lists can't drift apart.
const PROTECTED_HOSTS = new Set<string>(Object.keys(GTM_IDS));

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(MAX_SPONSORED_CLICKS_PER_DAY, RATE_LIMIT_WINDOW),
      prefix: "anti-click-fraud",
    })
  : null;

// NextRequest.ip / .geo were removed in Next.js 15+ (values now come from
// the host, not the framework) — @vercel/functions' ipAddress() is the
// replacement on Vercel. Falling back to x-forwarded-for covers running
// behind any other reverse proxy.
function getClientIp(request: NextRequest): string | null {
  return (
    ipAddress(request) ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null
  );
}

export async function proxy(request: NextRequest) {
  // `request.nextUrl.hostname` reflects the socket Next.js is bound to, not
  // the client-supplied `Host` header — it stays "localhost" behind any
  // proxy/dev-server setup that doesn't rewrite the request URL itself. The
  // `Host` header is what actually carries the tenant domain (same source
  // the GTM injection in layout.tsx keys off).
  const host = (request.headers.get("host") || "").split(":")[0];
  if (!ratelimit || !PROTECTED_HOSTS.has(host)) {
    return NextResponse.next();
  }

  const hasAdClickId = AD_CLICK_PARAMS.some((param) =>
    request.nextUrl.searchParams.has(param)
  );
  if (!hasAdClickId) {
    return NextResponse.next();
  }

  const ip = getClientIp(request);
  if (!ip) {
    // Nothing to key the quota on — let it through rather than guess.
    return NextResponse.next();
  }

  const { success } = await ratelimit.limit(ip);
  if (success) {
    return NextResponse.next();
  }

  // Quota burned for this IP: evade rather than hard-block. A full site
  // block risks a false positive (shared office IP, CGNAT) locking out a
  // real customer — only the paid-attribution path is closed off, silently.
  const homepage = request.nextUrl.clone();
  homepage.pathname = "/";
  AD_CLICK_PARAMS.forEach((param) => homepage.searchParams.delete(param));

  return NextResponse.redirect(homepage);
}

export const config = {
  matcher: [
    // Every page request except static assets, image optimization and API
    // routes — an ad click only ever lands on an actual page.
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
