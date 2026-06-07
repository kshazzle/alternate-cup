"use server";

import { universeRepository } from "@/lib/db/repositories/universe-repository";
import { absoluteUrl } from "@/lib/utils/absolute-url";

export async function recordShareAction(slug: string) {
  const result = await universeRepository.incrementShares(slug);

  if (result.count === 0) {
    throw new Error("Universe not found");
  }

  return absoluteUrl(`/universe/${slug}`);
}
