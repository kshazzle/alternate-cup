import { describe, expect, it } from "vitest";
import { createUniverseSlug } from "./slug";

describe("createUniverseSlug", () => {
  it("turns a scenario into a readable lowercase slug", () => {
    expect(createUniverseSlug("What if India qualified for FIFA World Cup 2026?")).toBe(
      "india-qualified-fifa-world-cup-2026",
    );
  });

  it("adds a short suffix when requested to avoid collisions", () => {
    expect(createUniverseSlug("Messi chose Spain instead of Argentina", "abc123")).toBe(
      "messi-chose-spain-instead-argentina-abc123",
    );
  });
});
