import type { Universe } from "@prisma/client";
import Link from "next/link";
import { UniverseGrid } from "@/components/rankings/universe-grid";

type TrendingPreviewProps = {
  universes: Array<Pick<Universe, "slug" | "title" | "scenario" | "summary" | "divergenceScore" | "chaosScore" | "views" | "shares" | "upvoteCount">>;
};

export function TrendingPreview({ universes }: TrendingPreviewProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-200">Trending</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Universes catching fire</h2>
        </div>
        <Link href="/trending" className="text-sm font-semibold text-amber-200 hover:text-amber-100">
          View all
        </Link>
      </div>
      <UniverseGrid universes={universes.slice(0, 3)} emptyTitle="Generate the first universe to start trending." />
    </section>
  );
}
