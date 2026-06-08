import type { Universe } from "@prisma/client";
import Link from "next/link";
import { UniverseGrid } from "@/components/rankings/universe-grid";

type TopUpvotedPreviewProps = {
  universes: Array<Pick<Universe, "slug" | "title" | "scenario" | "summary" | "divergenceScore" | "chaosScore" | "views" | "shares" | "upvoteCount">>;
};

export function TopUpvotedPreview({ universes }: TopUpvotedPreviewProps) {
  const hasUpvotes = universes.some((u) => u.upvoteCount > 0);

  if (!hasUpvotes) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200">Most Upvoted</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Fan favourites</h2>
        </div>
        <Link href="/explore" className="text-sm font-semibold text-amber-200 hover:text-amber-100">
          View all
        </Link>
      </div>
      <UniverseGrid universes={universes.slice(0, 3)} emptyTitle="" />
    </section>
  );
}
