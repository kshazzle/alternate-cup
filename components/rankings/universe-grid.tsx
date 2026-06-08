import type { Universe } from "@prisma/client";
import { UniverseCard } from "./universe-card";

type UniverseGridProps = {
  universes: Array<Pick<Universe, "slug" | "title" | "scenario" | "summary" | "divergenceScore" | "chaosScore" | "views" | "shares" | "upvoteCount">>;
  emptyTitle?: string;
};

export function UniverseGrid({ universes, emptyTitle = "No universes yet." }: UniverseGridProps) {
  if (universes.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.04] p-10 text-center text-zinc-400">
        {emptyTitle}
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {universes.map((universe, index) => (
        <UniverseCard key={universe.slug} universe={universe} rank={index + 1} />
      ))}
    </div>
  );
}
