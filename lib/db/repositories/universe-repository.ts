import type { Prisma, Universe } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { calculateTrendingScore } from "@/lib/ranking/trending-score";

export type UniverseWithBranchCount = Universe & {
  _count: {
    branches: number;
  };
};

export type CreateUniverseInput = {
  slug: string;
  title: string;
  scenario: string;
  summary: string;
  generatedContent: Prisma.InputJsonValue;
  divergenceScore: number;
  chaosScore: number;
  winner?: string | null;
  parentUniverseId?: string | null;
  promptVersion: string;
  model: string;
};

export const universeRepository = {
  async create(input: CreateUniverseInput) {
    return prisma.universe.create({
      data: input,
    });
  },

  async slugExists(slug: string) {
    const existing = await prisma.universe.findUnique({
      where: { slug },
      select: { id: true },
    });

    return Boolean(existing);
  },

  async findBySlug(slug: string) {
    return prisma.universe.findUnique({
      where: { slug },
      include: {
        parentUniverse: true,
        branches: {
          orderBy: { createdAt: "desc" },
          take: 4,
        },
        _count: {
          select: { branches: true },
        },
      },
    });
  },

  async listLatest(limit = 6) {
    return prisma.universe.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        _count: {
          select: { branches: true },
        },
      },
    });
  },

  async listMostChaotic(limit = 12) {
    return prisma.universe.findMany({
      orderBy: [{ chaosScore: "desc" }, { divergenceScore: "desc" }, { createdAt: "desc" }],
      take: limit,
      include: {
        _count: {
          select: { branches: true },
        },
      },
    });
  },

  async listTrending(limit = 12) {
    const universes = await prisma.universe.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        _count: {
          select: { branches: true },
        },
      },
    });

    return universes
      .map((universe) => ({
        universe,
        score: calculateTrendingScore({
          views: universe.views,
          shares: universe.shares,
          branchCount: universe._count.branches,
          createdAt: universe.createdAt,
        }),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ universe }) => universe);
  },

  async countBranches(parentUniverseId: string) {
    return prisma.universe.count({
      where: { parentUniverseId },
    });
  },

  async incrementViews(slug: string) {
    return prisma.universe.updateMany({
      where: { slug },
      data: { views: { increment: 1 } },
    });
  },

  async incrementShares(slug: string) {
    return prisma.universe.updateMany({
      where: { slug },
      data: { shares: { increment: 1 } },
    });
  },
};
