type DivergenceInput = {
  scenario: string;
  winner?: string | null;
  timeline: string[];
};

import { fanReactionText, normalizeFanReactions } from "../universes/fan-reactions";

type ChaosInput = {
  divergenceScore: number;
  scenario: string;
  headlines: string[];
  fanReactions: Parameters<typeof fanReactionText>[0];
};

const HIGH_DIVERGENCE_TERMS = [
  "every world cup",
  "never",
  "instead of",
  "chose",
  "won the 2022",
  "since 2002",
  "all time",
  "dynasty",
];

const CHAOS_TERMS = ["collapse", "chaos", "controversy", "explodes", "shock", "impossible"];

export function calculateDivergenceScore(input: DivergenceInput) {
  const scenario = input.scenario.toLowerCase();
  const timelineText = input.timeline.join(" ").toLowerCase();

  let score = 25;

  if (scenario.includes("qualified")) score += 10;
  if (input.winner && !["argentina", "france", "germany", "brazil", "spain"].includes(input.winner.toLowerCase())) {
    score += 12;
  }

  score += HIGH_DIVERGENCE_TERMS.reduce((total, term) => {
    return total + (scenario.includes(term) || timelineText.includes(term) ? 10 : 0);
  }, 0);

  if (/\b(2002|2006|2010|2014|2018|2022|2026|2030)\b/.test(timelineText)) score += 8;
  if (input.timeline.length >= 4) score += 8;

  return clampScore(score);
}

export function calculateChaosScore(input: ChaosInput) {
  const reactions = fanReactionText(input.fanReactions);
  const text = `${input.scenario} ${input.headlines.join(" ")} ${reactions}`.toLowerCase();
  const signalScore = CHAOS_TERMS.reduce((total, term) => total + (text.includes(term) ? 5 : 0), 0);
  const reactionEnergy = normalizeFanReactions(input.fanReactions).filter((reaction) =>
    /!|unreal|cinema|wild|chaos/i.test(reaction.quote),
  ).length;

  return clampScore(input.divergenceScore + signalScore + reactionEnergy);
}

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}
