import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db/prisma";
import { absoluteUrl } from "@/lib/utils/absolute-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const universes = await prisma.universe.findMany({
    select: { slug: true, updatedAt: true },
    orderBy: { createdAt: "desc" },
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/trending"), changeFrequency: "hourly", priority: 0.9 },
    { url: absoluteUrl("/create"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/chaotic"), changeFrequency: "daily", priority: 0.8 },
  ];

  const universeRoutes: MetadataRoute.Sitemap = universes.map((u) => ({
    url: absoluteUrl(`/universe/${u.slug}`),
    lastModified: u.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...universeRoutes];
}
