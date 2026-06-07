"use server";

import { redirect } from "next/navigation";
import { getRandomScenario } from "@/lib/ai/random-scenarios";
import { checkPersistentRateLimit } from "@/lib/security/rate-limit";
import { getRequestFingerprint } from "@/lib/security/request-fingerprint";
import { createUniverseFromScenario } from "@/lib/universes/create-universe";

export async function randomUniverseAction(): Promise<void> {
  const rateLimit = await checkPersistentRateLimit(await getRequestFingerprint("random"), {
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    redirect("/create");
  }

  try {
    const universe = await createUniverseFromScenario(getRandomScenario());
    redirect(`/universe/${universe.slug}`);
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    console.error(error);
    redirect("/create");
  }
}
