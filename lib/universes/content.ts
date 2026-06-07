import { fanReactionSchema, universeOutputSchema } from "@/lib/ai/universe-output.schema";
import { normalizeFanReactions, type FanReaction } from "@/lib/universes/fan-reactions";
import { z } from "zod";

const storedUniverseContentSchema = universeOutputSchema.extend({
  fanReactions: z
    .array(z.union([fanReactionSchema, z.string().min(8).max(200)]))
    .min(1),
});

export type UniverseOutput = Omit<z.infer<typeof universeOutputSchema>, "fanReactions"> & {
  fanReactions: FanReaction[];
};

export function parseUniverseContent(content: unknown): UniverseOutput {
  const parsed = storedUniverseContentSchema.parse(content);

  return {
    ...parsed,
    fanReactions: normalizeFanReactions(parsed.fanReactions),
  };
}
