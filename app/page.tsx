import { ExampleScenarios } from "@/components/landing/example-scenarios";
import { Hero } from "@/components/landing/hero";
import { TrendingPreview } from "@/components/landing/trending-preview";
import { universeRepository } from "@/lib/db/repositories/universe-repository";

export const dynamic = "force-dynamic";

export default async function Home() {
  const trending = await universeRepository.listTrending(3).catch(() => []);

  return (
    <main>
      <Hero />
      <ExampleScenarios />
      <TrendingPreview universes={trending} />
    </main>
  );
}
