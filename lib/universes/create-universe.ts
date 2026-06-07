import { randomUUID } from "crypto";
import { Prisma } from "@prisma/client";
import { PROMPT_VERSION } from "@/lib/ai/prompt-builder";
import { generateUniverseContent } from "@/lib/ai/universe-generator";
import { getOpenRouterModel } from "@/lib/ai/openrouter-client";
import { universeRepository } from "@/lib/db/repositories/universe-repository";
import { calculateChaosScore, calculateDivergenceScore } from "@/lib/ranking/divergence-score";
import { createUniverseSlug } from "@/lib/utils/slug";

type ParentContext = {
  id: string;
  title: string;
  scenario: string;
  summary: string;
};

type CreateUniverseOptions = {
  parent?: ParentContext;
  forceRegenerate?: boolean;
};

export async function createUniverseFromScenario(
  scenario: string,
  parentOrOptions?: ParentContext | CreateUniverseOptions,
) {
  const options =
    parentOrOptions && "id" in parentOrOptions
      ? { parent: parentOrOptions }
      : (parentOrOptions ?? {});

  if (!options.parent && !options.forceRegenerate) {
    const existing = await universeRepository.findCanonicalByScenario(scenario);
    if (existing) {
      return existing;
    }
  }

  const content = await generateUniverseContent(scenario, {
    parent: options.parent
      ? {
          title: options.parent.title,
          scenario: options.parent.scenario,
          summary: options.parent.summary,
        }
      : undefined,
  });
  const divergenceScore = calculateDivergenceScore({
    scenario,
    winner: content.winner,
    timeline: content.butterflyTimeline,
  });
  const chaosScore = calculateChaosScore({
    divergenceScore,
    scenario,
    headlines: content.headlines,
    fanReactions: content.fanReactions,
  });
  const slug = await createUniqueSlug(scenario);

  return persistUniverse({
    slug,
    title: content.title,
    scenario,
    summary: content.summary,
    generatedContent: content,
    divergenceScore,
    chaosScore,
    winner: content.winner,
    parentUniverseId: options.parent?.id,
    promptVersion: PROMPT_VERSION,
    model: getOpenRouterModel(),
  });
}

async function createUniqueSlug(scenario: string) {
  const baseSlug = createUniverseSlug(scenario);

  if (!(await universeRepository.slugExists(baseSlug))) {
    return baseSlug;
  }

  return createUniverseSlug(scenario, randomUUID().slice(0, 6));
}

async function persistUniverse(input: Parameters<typeof universeRepository.create>[0]) {
  try {
    return await universeRepository.create(input);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return universeRepository.create({
        ...input,
        slug: createUniverseSlug(input.scenario, randomUUID().slice(0, 6)),
      });
    }

    throw error;
  }
}
