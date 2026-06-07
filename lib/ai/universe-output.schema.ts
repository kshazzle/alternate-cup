import { z } from "zod";

export const fanReactionSchema = z.object({
  handle: z
    .string()
    .min(2)
    .max(24)
    .regex(/^[A-Za-z][A-Za-z0-9_]*$/, "Handle must look like a football social username"),
  quote: z.string().min(8).max(180),
});

export const universeOutputSchema = z.object({
  title: z.string().min(4).max(120),
  summary: z.string().min(40).max(500),
  butterflyTimeline: z.array(z.string().min(8).max(180)).min(4).max(8),
  groupStage: z.array(z.string().min(12).max(220)).min(4).max(10),
  knockoutStage: z.array(z.string().min(12).max(220)).min(4).max(10),
  winner: z.string().min(2).max(80),
  goldenBoot: z.string().min(2).max(80),
  goldenBall: z.string().min(2).max(80),
  youngPlayer: z.string().min(2).max(80),
  fairPlay: z.string().min(2).max(80),
  headlines: z.array(z.string().min(10).max(120)).length(5),
  fanReactions: z.array(fanReactionSchema).length(10),
  legacy: z.string().min(80).max(900),
});

export type UniverseOutput = z.infer<typeof universeOutputSchema>;
