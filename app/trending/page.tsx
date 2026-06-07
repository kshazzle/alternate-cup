import { UniverseGrid } from "@/components/rankings/universe-grid";
import { Badge } from "@/components/ui/badge";
import { universeRepository } from "@/lib/db/repositories/universe-repository";

export const metadata = {
  title: "Trending Universes",
  description: "The Alternate Cup timelines fans are reading and sharing right now.",
};

export const dynamic = "force-dynamic";

export default async function TrendingPage() {
  const universes = await universeRepository.listTrending(12).catch(() => []);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <Badge>Trending</Badge>
      <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-white md:text-7xl">
        The timelines currently warping the football internet.
      </h1>
      <div className="mt-10">
        <UniverseGrid universes={universes} emptyTitle="No trending universes yet. Generate one to start the feed." />
      </div>
    </main>
  );
}
