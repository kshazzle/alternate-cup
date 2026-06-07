import { notFound } from "next/navigation";
import { AwardsGrid } from "@/components/universe/awards-grid";
import { BranchUniverseCard } from "@/components/universe/branch-universe-card";
import { ButterflyTimeline } from "@/components/universe/butterfly-timeline";
import { DivergenceScore } from "@/components/universe/divergence-score";
import { FanReactions } from "@/components/universe/fan-reactions";
import { Headlines } from "@/components/universe/headlines";
import { ShareActions } from "@/components/universe/share-actions";
import { StoryShell } from "@/components/universe/story-shell";
import { TournamentSection } from "@/components/universe/tournament-section";
import { ViewTracker } from "@/components/universe/view-tracker";
import { Badge } from "@/components/ui/badge";
import { universeRepository } from "@/lib/db/repositories/universe-repository";
import { createUniverseMetadata } from "@/lib/seo/metadata";
import { parseUniverseContent } from "@/lib/universes/content";

type UniversePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: UniversePageProps) {
  const { slug } = await params;
  const universe = await universeRepository.findBySlug(slug).catch(() => null);

  if (!universe) {
    return {
      title: "Universe Not Found",
    };
  }

  return createUniverseMetadata(universe);
}

export default async function UniversePage({ params }: UniversePageProps) {
  const { slug } = await params;
  const universe = await universeRepository.findBySlug(slug).catch(() => null);

  if (!universe) {
    notFound();
  }

  const content = parseUniverseContent(universe.generatedContent);

  return (
    <StoryShell>
      <ViewTracker slug={universe.slug} />
      <header className="grid gap-8 py-8 lg:grid-cols-[1fr_320px] lg:items-end">
        <div>
          <Badge>What If Timeline</Badge>
          <h1 className="text-balance mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl lg:text-7xl">
            {universe.title}
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-9 text-zinc-300">{content.summary}</p>
        </div>
        <div className="space-y-4">
          <ShareActions slug={universe.slug} title={universe.title} />
          <DivergenceScore divergenceScore={universe.divergenceScore} chaosScore={universe.chaosScore} />
        </div>
      </header>

      <div className="grid gap-6">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200">Scenario Summary</p>
          <p className="mt-4 text-lg leading-8 text-zinc-300">{universe.scenario}</p>
        </section>
        <ButterflyTimeline items={content.butterflyTimeline} />
        <TournamentSection groupStage={content.groupStage} knockoutStage={content.knockoutStage} winner={content.winner} />
        <AwardsGrid
          goldenBoot={content.goldenBoot}
          goldenBall={content.goldenBall}
          youngPlayer={content.youngPlayer}
          fairPlay={content.fairPlay}
        />
        <Headlines headlines={content.headlines} />
        <FanReactions reactions={content.fanReactions} />
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6">
          <h2 className="text-2xl font-semibold text-white">Legacy</h2>
          <p className="mt-4 text-lg leading-8 text-zinc-300">{content.legacy}</p>
        </section>
        <BranchUniverseCard slug={universe.slug} />
      </div>
    </StoryShell>
  );
}
