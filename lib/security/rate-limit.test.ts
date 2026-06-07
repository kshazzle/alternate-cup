import { describe, expect, it } from "vitest";
import { createMemoryRateLimiter } from "./rate-limit";

describe("createMemoryRateLimiter", () => {
  it("allows requests up to the limit and blocks the next one", () => {
    const limiter = createMemoryRateLimiter();
    const options = { limit: 2, windowMs: 60_000 };

    expect(limiter.check("ip:1", options).allowed).toBe(true);
    expect(limiter.check("ip:1", options).allowed).toBe(true);
    expect(limiter.check("ip:1", options).allowed).toBe(false);
  });

  it("resets after the window", () => {
    const limiter = createMemoryRateLimiter(() => 1_000);
    const options = { limit: 1, windowMs: 500 };

    expect(limiter.check("ip:1", options).allowed).toBe(true);
    expect(limiter.check("ip:1", options).allowed).toBe(false);

    limiter.setNow(() => 2_000);

    expect(limiter.check("ip:1", options).allowed).toBe(true);
  });
});
