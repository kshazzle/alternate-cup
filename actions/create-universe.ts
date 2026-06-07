"use server";

import { redirect } from "next/navigation";
import { checkPersistentRateLimit } from "@/lib/security/rate-limit";
import { getRequestFingerprint } from "@/lib/security/request-fingerprint";
import { createUniverseFromScenario } from "@/lib/universes/create-universe";
import { universeInputSchema } from "@/lib/validation/universe-input.schema";

export type CreateUniverseState = {
  error?: string;
};

export async function createUniverseAction(
  _previousState: CreateUniverseState,
  formData: FormData,
): Promise<CreateUniverseState> {
  const parsed = universeInputSchema.safeParse({
    scenario: formData.get("scenario"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Enter a valid scenario." };
  }

  const rateLimit = await checkPersistentRateLimit(await getRequestFingerprint("create"), {
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return { error: "Too many universes generated from this device. Try again later." };
  }

  try {
    const forceRegenerate = formData.get("forceRegenerate") === "true";
    const universe = await createUniverseFromScenario(parsed.data.scenario, { forceRegenerate });
    redirect(`/universe/${universe.slug}`);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.error(error);
    return {
      error:
        error instanceof Error && error.message.includes("OPENROUTER")
          ? "OpenRouter is not configured yet. Add your API key to generate universes."
          : "The timeline engine misfired. Try a different scenario in a moment.",
    };
  }
}

function isRedirectError(error: unknown) {
  return error instanceof Error && error.message === "NEXT_REDIRECT";
}
