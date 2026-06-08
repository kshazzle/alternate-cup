import { ChaoticLeaderboard } from "@/components/rankings/chaotic-leaderboard";
import { universeRepository } from "@/lib/db/repositories/universe-repository";

export const metadata = {
  title: "Most Chaotic Universes",
  description: "The wildest What If? World Cup timelines ranked by chaos score.",
};

export const revalidate = 60;

export default async function ChaoticPage() {
  const universes = await universeRepository.listMostChaotic(12).catch(() => []);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <ChaoticLeaderboard universes={universes} />
    </main>
  );
}
