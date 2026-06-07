import { buildUniversePrompt } from "./prompt-builder";
import { createOpenRouterClient, type ModelClient } from "./openrouter-client";
import { universeOutputSchema, type UniverseOutput } from "./universe-output.schema";
import { parseJsonObject } from "../utils/safe-json";

type GenerateOptions = ModelClient & {
  parent?: Parameters<typeof buildUniversePrompt>[0]["parent"];
};

const MAX_GENERATION_ATTEMPTS = 2;

export async function generateUniverseContent(
  scenario: string,
  options?: Partial<GenerateOptions>,
): Promise<UniverseOutput> {
  const client = options?.complete ? ({ complete: options.complete } satisfies ModelClient) : createOpenRouterClient();
  const prompt = buildUniversePrompt({
    scenario,
    parent: options?.parent,
  });

  let lastValidationError = "unknown validation error";

  for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt += 1) {
    const rawContent = await client.complete(
      attempt === 0
        ? prompt
        : {
            system: prompt.system,
            user: `${prompt.user}

Your previous JSON was incomplete or invalid:
${lastValidationError}

Return corrected strict JSON only. Include every required field and fully populate all arrays (headlines: 5 items, fanReactions: 10 objects with handle and quote, groupStage and knockoutStage: at least 4 items each).`,
          },
    );

    console.log("[universe-generator] raw response (first 500 chars):", rawContent.slice(0, 500));

    const parsed = parseJsonObject(rawContent);
    const result = universeOutputSchema.safeParse(parsed);

    if (result.success) {
      return result.data;
    }

    console.error("[universe-generator] schema mismatch, parsed keys:", parsed && typeof parsed === "object" ? Object.keys(parsed as object) : typeof parsed);
    lastValidationError = result.error.message;
  }

  throw new Error(`The generated universe did not match the required schema: ${lastValidationError}`);
}
