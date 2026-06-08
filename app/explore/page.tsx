import { UniverseGrid } from "@/components/rankings/universe-grid";
import { Badge } from "@/components/ui/badge";
import { universeRepository } from "@/lib/db/repositories/universe-repository";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Explore Universes",
  description: "Search every alternate FIFA World Cup timeline ever generated.",
};

type ExplorePageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const universes = await universeRepository.search(query, 40).catch(() => []);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <Badge>Explore</Badge>
      <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-white md:text-7xl">
        Every alternate timeline, ever.
      </h1>

      <form method="GET" action="/explore" className="mt-10">
        <div className="flex gap-3">
          <input
            name="q"
            defaultValue={query}
            placeholder="Search scenarios, teams, players…"
            autoComplete="off"
            className="flex-1 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20"
          />
          <button
            type="submit"
            className="rounded-2xl border border-white/10 bg-white/[0.08] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.12]"
          >
            Search
          </button>
        </div>
      </form>

      {query ? (
        <p className="mt-4 text-sm text-zinc-500">
          {universes.length} result{universes.length !== 1 ? "s" : ""} for &quot;{query}&quot;
        </p>
      ) : null}

      <div className="mt-8">
        <UniverseGrid
          universes={universes}
          emptyTitle={
            query
              ? `No timelines found for "${query}". Try different keywords.`
              : "No universes yet. Generate one to start the feed."
          }
        />
      </div>
    </main>
  );
}
