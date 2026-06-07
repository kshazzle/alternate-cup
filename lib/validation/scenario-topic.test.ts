import { describe, expect, it } from "vitest";
import { assessScenarioTopic } from "./scenario-topic";

describe("assessScenarioTopic", () => {
  it("rejects coding questions", () => {
    const result = assessScenarioTopic("hey how do i sort an array in O of n log n");

    expect(result.ok).toBe(false);
    expect(result.message).toContain("FIFA World Cup");
  });

  it("accepts believable football scenarios", () => {
    expect(assessScenarioTopic("What if Neymar never got injured in 2014?").ok).toBe(true);
    expect(assessScenarioTopic("What if India qualified for FIFA World Cup 2026?").ok).toBe(true);
  });

  it("accepts branch-style football prompts", () => {
    expect(assessScenarioTopic("Make Portugal win the 2022 final instead").ok).toBe(true);
  });
});
