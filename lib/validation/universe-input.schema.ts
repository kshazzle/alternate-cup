import { z } from "zod";
import { assessScenarioTopic } from "./scenario-topic";

const scenarioBase = z
  .string()
  .trim()
  .min(12, "Give us a richer what-if scenario.")
  .max(500, "Keep the scenario under 500 characters.");

const createdByField = z
  .string()
  .trim()
  .max(50, "Name must be under 50 characters.")
  .optional()
  .transform((v) => (v === "" ? undefined : v));

// Full schema — validates football topic (used for new top-level universes).
export const universeInputSchema = z
  .object({ scenario: scenarioBase, createdBy: createdByField })
  .superRefine((input, context) => {
    const assessment = assessScenarioTopic(input.scenario);
    if (!assessment.ok) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["scenario"],
        message: assessment.message ?? "Enter a football what-if scenario.",
      });
    }
  });

// Branch schema — only checks length and hard-blocked content (no topic requirement
// because branch prompts are relative to a parent universe and lack standalone keywords).
export const branchInputSchema = z
  .object({ scenario: scenarioBase, createdBy: createdByField })
  .superRefine((input, context) => {
    const assessment = assessScenarioTopic(input.scenario);
    // For branches, only block explicitly prohibited content — not off-topic football check.
    if (!assessment.ok && assessment.message !== "Describe a football what-if scenario with teams, players, or a World Cup twist." && !assessment.message?.includes("only generates")) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["scenario"],
        message: assessment.message ?? "Enter a valid branch scenario.",
      });
    }
  });

export type UniverseInput = z.infer<typeof universeInputSchema>;
