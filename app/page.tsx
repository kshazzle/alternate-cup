import { ExampleScenarios } from "@/components/landing/example-scenarios";
import { Hero } from "@/components/landing/hero";
import { TrendingPreview } from "@/components/landing/trending-preview";
import { TopUpvotedPreview } from "@/components/landing/top-upvoted-preview";
import { universeRepository } from "@/lib/db/repositories/universe-repository";

export const revalidate = 60;

export default async function Home() {
  const [trending, topUpvoted] = await Promise.all([
    universeRepository.listTrending(3).catch(() => []),
    universeRepository.listTopUpvoted(3).catch(() => []),
  ]);

  return (
    <main>
      <Hero />
      <ExampleScenarios />
      <TopUpvotedPreview universes={topUpvoted} />
      <TrendingPreview universes={trending} />
    </main>
  );
}
