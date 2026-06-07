import { describe, expect, it } from "vitest";
import { normalizeScenario } from "./normalize-scenario";

describe("normalizeScenario", () => {
  it("normalizes casing and whitespace", () => {
    expect(normalizeScenario("  What if   Neymar never got injured?  ")).toBe(
      "what if neymar never got injured?",
    );
  });
});
