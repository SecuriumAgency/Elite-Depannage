import { timingSafeEqual } from "crypto";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.REVALIDATION_TOKEN;
  if (!secret) return false;

  const provided = request.nextUrl.searchParams.get("secret") ?? "";
  const secretBuf = Buffer.from(secret);
  const providedBuf = Buffer.from(provided);

  // Buffers of differing length would make timingSafeEqual throw, and the
  // length mismatch itself is not sensitive, so it's fine to branch on it.
  if (secretBuf.length !== providedBuf.length) return false;
  return timingSafeEqual(secretBuf, providedBuf);
}

async function handleRevalidate(request: NextRequest) {
  if (!process.env.REVALIDATION_TOKEN) {
    console.error("[revalidate] REVALIDATION_TOKEN is not configured");
    return NextResponse.json(
      { revalidated: false, message: "Server misconfiguration" },
      { status: 500 }
    );
  }

  if (!isAuthorized(request)) {
    return NextResponse.json(
      { revalidated: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const path = request.nextUrl.searchParams.get("path");
  if (path && !path.startsWith("/")) {
    return NextResponse.json(
      { revalidated: false, message: "`path` must start with /" },
      { status: 400 }
    );
  }

  try {
    if (path) {
      revalidatePath(path, "page");
    } else {
      revalidatePath("/", "page");
      revalidatePath("/sitemap.xml");
    }

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("[revalidate] failed:", error);
    return NextResponse.json(
      { revalidated: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}
