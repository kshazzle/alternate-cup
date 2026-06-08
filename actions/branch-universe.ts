"use server";

import { redirect } from "next/navigation";
import { universeRepository } from "@/lib/db/repositories/universe-repository";
import { checkPersistentRateLimit } from "@/lib/security/rate-limit";
import { getRequestFingerprint } from "@/lib/security/request-fingerprint";
import { createUniverseFromScenario } from "@/lib/universes/create-universe";
import { branchInputSchema } from "@/lib/validation/universe-input.schema";

export type BranchUniverseState = {
  error?: string;
};

export async function branchUniverseAction(
  _previousState: BranchUniverseState,
  formData: FormData,
): Promise<BranchUniverseState> {
  const slug = String(formData.get("slug") ?? "");
  const parsed = branchInputSchema.safeParse({
    scenario: formData.get("scenario"),
  });

  if (!slug) {
    return { error: "Missing parent universe." };
  }

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Enter a valid branch idea." };
  }

  const rateLimit = await checkPersistentRateLimit(await getRequestFingerprint("branch"), {
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return { error: "Too many branch generations from this device. Try again later." };
  }

  const parent = await universeRepository.findBySlug(slug);

  if (!parent) {
    return { error: "Parent universe was not found." };
  }

  try {
    const child = await createUniverseFromScenario(parsed.data.scenario, {
      id: parent.id,
      title: parent.title,
      scenario: parent.scenario,
      summary: parent.summary,
    });
    redirect(`/universe/${child.slug}`);
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    console.error(error);
    return { error: "Could not branch this timeline yet. Try another angle." };
  }
}
