import { describe, expect, it } from "vitest";
import { calculateTrendingScore } from "./trending-score";

describe("calculateTrendingScore", () => {
  it("rewards views, shares, branches, and recency", () => {
    const now = new Date("2026-06-07T12:00:00.000Z");
    const recent = calculateTrendingScore({
      views: 100,
      shares: 10,
      branchCount: 4,
      createdAt: new Date("2026-06-07T10:00:00.000Z"),
      now,
    });
    const stale = calculateTrendingScore({
      views: 100,
      shares: 10,
      branchCount: 4,
      createdAt: new Date("2026-05-01T10:00:00.000Z"),
      now,
    });

    expect(recent).toBeGreaterThan(stale);
  });
});
