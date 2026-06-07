import { describe, expect, it } from "vitest";
import { buildUniversePrompt } from "./prompt-builder";

describe("buildUniversePrompt", () => {
  it("frames the model as a football historian and demands strict JSON", () => {
    const prompt = buildUniversePrompt({
      scenario: "What if Messi chose Spain instead of Argentina?",
    });

    expect(prompt.system).toContain("football historian");
    expect(prompt.user).toContain("What if Messi chose Spain instead of Argentina?");
    expect(prompt.user).toContain("strict JSON");
    expect(prompt.user).toContain("butterflyTimeline");
  });

  it("includes parent context for branch timelines", () => {
    const prompt = buildUniversePrompt({
      scenario: "Make Portugal win instead",
      parent: {
        title: "Ronaldo's 2022 Miracle",
        scenario: "What if Ronaldo won the 2022 World Cup?",
        summary: "Portugal wins in Qatar.",
      },
    });

    expect(prompt.user).toContain("Branch from this existing alternate universe");
    expect(prompt.user).toContain("Ronaldo's 2022 Miracle");
  });
});
