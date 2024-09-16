import { ratelimit } from "@/lib/rateLimiter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const ip = req.ip ?? "127.0.0.1";
  const isLocal = process.env.NODE_ENV === "development";
  const country = isLocal ? "CA" : req.geo?.country ?? "unknown";

  const { success, limit, reset, remaining } = await ratelimit.limit(ip, {
    country,
  });

  console.warn("req.geo.country", country);

  if (!success) {
    console.warn("limit", limit);
    console.warn("reset", reset);
    console.warn("remaining", remaining);

    return NextResponse.json("Rate Limited", { status: 429 });
  }
  console.warn("remaining", remaining);

  return NextResponse.json("Success", { status: 200 });
}
