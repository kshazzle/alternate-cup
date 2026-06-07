import { NextResponse } from "next/server";
import { z } from "zod";
import { universeRepository } from "@/lib/db/repositories/universe-repository";
import { checkPersistentRateLimit } from "@/lib/security/rate-limit";
import { getRequestFingerprint } from "@/lib/security/request-fingerprint";

const viewSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

export async function POST(request: Request) {
  const parsed = viewSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const rateLimit = await checkPersistentRateLimit(`${await getRequestFingerprint("view")}:${parsed.data.slug}`, {
    limit: 20,
    windowMs: 60 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many view events" }, { status: 429 });
  }

  const result = await universeRepository.incrementViews(parsed.data.slug);

  if (result.count === 0) {
    return NextResponse.json({ error: "Universe not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
