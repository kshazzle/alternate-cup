import type { Universe } from "@prisma/client";
import { UniverseGrid } from "./universe-grid";

type ChaoticLeaderboardProps = {
  universes: Array<Pick<Universe, "slug" | "title" | "scenario" | "summary" | "divergenceScore" | "chaosScore" | "views" | "shares">>;
};

export function ChaoticLeaderboard({ universes }: ChaoticLeaderboardProps) {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-red-300">Most Chaotic Universes</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
          Timelines where football history detonates.
        </h1>
      </div>
      <UniverseGrid universes={universes} emptyTitle="No chaotic universes have been generated yet." />
    </section>
  );
}
