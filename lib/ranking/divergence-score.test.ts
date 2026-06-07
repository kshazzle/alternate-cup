import { describe, expect, it } from "vitest";
import { calculateChaosScore, calculateDivergenceScore } from "./divergence-score";

describe("calculateDivergenceScore", () => {
  it("scores modest qualification scenarios lower than reality-breaking dynasties", () => {
    const modest = calculateDivergenceScore({
      scenario: "What if India qualified for FIFA World Cup 2026?",
      winner: "Brazil",
      timeline: ["India qualifies", "India reaches the round of 16"],
    });

    const wild = calculateDivergenceScore({
      scenario: "What if Brazil won every World Cup since 2002?",
      winner: "Brazil",
      timeline: ["Brazil wins 2006", "Brazil wins 2010", "Brazil wins 2014", "Brazil wins 2018"],
    });

    expect(modest).toBeGreaterThanOrEqual(30);
    expect(wild).toBeGreaterThan(modest);
    expect(wild).toBeLessThanOrEqual(100);
  });
});

describe("calculateChaosScore", () => {
  it("combines divergence with broad disruption signals", () => {
    const score = calculateChaosScore({
      divergenceScore: 70,
      scenario: "What if Messi chose Spain instead of Argentina?",
      headlines: [
        "Argentina Collapse In Qualifiers",
        "Spain Wins 2014",
        "Germany Rebuilds Differently",
        "Mbappe Becomes Football's Biggest Star",
        "Barcelona Politics Explode",
      ],
      fanReactions: Array.from({ length: 10 }, (_, index) => `Reaction ${index} is pure chaos!`),
    });

    expect(score).toBeGreaterThan(70);
    expect(score).toBeLessThanOrEqual(100);
  });
});
