import { describe, expect, it, vi, beforeEach } from "vitest";
import { createMemoryRateLimiter, checkPersistentRateLimit } from "./rate-limit";

vi.mock("../db/prisma", () => ({
  prisma: {
    rateLimitBucket: {
      updateMany: vi.fn(),
      findUniqueOrThrow: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

const { prisma } = await import("../db/prisma");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bucket = prisma.rateLimitBucket as any;

const LIMIT = 5;
const WINDOW = 60_000;
const OPTIONS = { limit: LIMIT, windowMs: WINDOW };
const FUTURE_RESET = new Date(Date.now() + WINDOW);

function noExpiredRow() {
  bucket.updateMany.mockResolvedValueOnce({ count: 0 });
}

describe("checkPersistentRateLimit", () => {
  beforeEach(() => vi.clearAllMocks());

  it("allows a brand-new key and returns remaining = limit - 1", async () => {
    noExpiredRow();
    bucket.updateMany.mockResolvedValueOnce({ count: 0 }); // increment miss
    bucket.create.mockResolvedValueOnce({});

    const result = await checkPersistentRateLimit("new:key", OPTIONS);

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(LIMIT - 1);
  });

  it("allows an existing key under the limit and returns updated remaining", async () => {
    noExpiredRow();
    bucket.updateMany.mockResolvedValueOnce({ count: 1 }); // increment hit
    bucket.findUniqueOrThrow.mockResolvedValueOnce({ count: 3, resetAt: FUTURE_RESET });

    const result = await checkPersistentRateLimit("existing:key", OPTIONS);

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(LIMIT - 3);
  });

  it("denies a key that is at the limit", async () => {
    noExpiredRow();
    bucket.updateMany.mockResolvedValueOnce({ count: 0 }); // increment miss (count >= limit)
    bucket.create.mockRejectedValueOnce(new Error("Unique constraint"));
    bucket.findUnique.mockResolvedValueOnce({ count: LIMIT, resetAt: FUTURE_RESET });

    const result = await checkPersistentRateLimit("limited:key", OPTIONS);

    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("does not throw when concurrent creates race on the same key", async () => {
    noExpiredRow();
    bucket.updateMany.mockResolvedValueOnce({ count: 0 });
    bucket.create.mockRejectedValueOnce(new Error("Unique constraint"));
    bucket.findUnique.mockResolvedValueOnce({ count: 1, resetAt: FUTURE_RESET });

    await expect(checkPersistentRateLimit("race:key", OPTIONS)).resolves.not.toThrow();
  });

  it("allows and resets an expired bucket", async () => {
    bucket.updateMany.mockResolvedValueOnce({ count: 1 }); // expired reset hit

    const result = await checkPersistentRateLimit("expired:key", OPTIONS);

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(LIMIT - 1);
  });
});

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
