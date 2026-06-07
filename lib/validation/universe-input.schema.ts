import { z } from "zod";

export const universeInputSchema = z.object({
  scenario: z
    .string()
    .trim()
    .min(12, "Give us a richer what-if scenario.")
    .max(500, "Keep the scenario under 500 characters."),
});

export type UniverseInput = z.infer<typeof universeInputSchema>;
