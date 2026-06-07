import { prisma } from "../db/prisma";

type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

export function createMemoryRateLimiter(initialNow: () => number = () => Date.now()) {
  const buckets = new Map<string, Bucket>();
  let now = initialNow;

  return {
    setNow(nextNow: () => number) {
      now = nextNow;
    },
    check(key: string, options: RateLimitOptions) {
      const currentTime = now();
      const existing = buckets.get(key);

      if (!existing || existing.resetAt <= currentTime) {
        buckets.set(key, {
          count: 1,
          resetAt: currentTime + options.windowMs,
        });

        return { allowed: true, remaining: options.limit - 1 };
      }

      if (existing.count >= options.limit) {
        return { allowed: false, remaining: 0, resetAt: existing.resetAt };
      }

      existing.count += 1;

      return { allowed: true, remaining: options.limit - existing.count, resetAt: existing.resetAt };
    },
  };
}

export const generationRateLimiter = createMemoryRateLimiter();
export const metricRateLimiter = createMemoryRateLimiter();

export async function checkPersistentRateLimit(key: string, options: RateLimitOptions) {
  const now = new Date();
  const resetAt = new Date(now.getTime() + options.windowMs);

  return prisma.$transaction(async (tx) => {
    const reset = await tx.rateLimitBucket.updateMany({
      where: {
        key,
        resetAt: { lte: now },
      },
      data: {
        count: 1,
        resetAt,
      },
    });

    if (reset.count > 0) {
      return { allowed: true, remaining: options.limit - 1 };
    }

    const incremented = await tx.rateLimitBucket.updateMany({
      where: {
        key,
        count: { lt: options.limit },
        resetAt: { gt: now },
      },
      data: {
        count: { increment: 1 },
      },
    });

    if (incremented.count > 0) {
      const bucket = await tx.rateLimitBucket.findUniqueOrThrow({ where: { key } });

      return { allowed: true, remaining: Math.max(0, options.limit - bucket.count), resetAt: bucket.resetAt };
    }

    try {
      await tx.rateLimitBucket.create({
        data: { key, count: 1, resetAt },
      });

      return { allowed: true, remaining: options.limit - 1, resetAt };
    } catch {
      const bucket = await tx.rateLimitBucket.findUnique({ where: { key } });

      return { allowed: false, remaining: 0, resetAt: bucket?.resetAt };
    }
  });
}
