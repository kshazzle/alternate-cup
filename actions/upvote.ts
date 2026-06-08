"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";

export async function toggleUpvoteAction(universeId: string): Promise<{
  upvoted: boolean;
  upvoteCount: number;
  error?: string;
}> {
  const session = await auth();
  if (!session?.user?.id) {
    return { upvoted: false, upvoteCount: 0, error: "sign-in-required" };
  }

  const userId = session.user.id;

  const existing = await prisma.upvote.findUnique({
    where: { userId_universeId: { userId, universeId } },
  });

  if (existing) {
    await prisma.upvote.delete({ where: { id: existing.id } });
    const updated = await prisma.universe.update({
      where: { id: universeId },
      data: { upvoteCount: { decrement: 1 } },
      select: { upvoteCount: true },
    });
    return { upvoted: false, upvoteCount: Math.max(0, updated.upvoteCount) };
  }

  await prisma.upvote.create({ data: { userId, universeId } });
  const updated = await prisma.universe.update({
    where: { id: universeId },
    data: { upvoteCount: { increment: 1 } },
    select: { upvoteCount: true },
  });
  return { upvoted: true, upvoteCount: updated.upvoteCount };
}

export async function getUpvoteState(universeId: string, userId: string | undefined) {
  if (!userId) return { upvoted: false };
  const existing = await prisma.upvote.findUnique({
    where: { userId_universeId: { userId, universeId } },
  });
  return { upvoted: Boolean(existing) };
}
