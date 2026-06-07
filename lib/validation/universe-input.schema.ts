import { z } from "zod";
import { assessScenarioTopic } from "./scenario-topic";

export const universeInputSchema = z
  .object({
    scenario: z
      .string()
      .trim()
      .min(12, "Give us a richer what-if scenario.")
      .max(500, "Keep the scenario under 500 characters."),
  })
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

export type UniverseInput = z.infer<typeof universeInputSchema>;
