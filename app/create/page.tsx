import { UniverseForm } from "@/components/create/universe-form";
import { universeRepository } from "@/lib/db/repositories/universe-repository";
import { Badge } from "@/components/ui/badge";

export const maxDuration = 60;

type CreatePageProps = {
  searchParams: Promise<{ scenario?: string }>;
};

export const metadata = {
  title: "Create Universe",
  description: "Generate a believable alternate FIFA World Cup timeline.",
};

export default async function CreatePage({ searchParams }: CreatePageProps) {
  const params = await searchParams;
  const existingUniverse = params.scenario
    ? await universeRepository.findCanonicalByScenario(params.scenario).catch(() => null)
    : null;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <Badge>Create Universe</Badge>
      <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-white md:text-7xl">
        Drop one football what-if. Get an entire alternate world.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
        Ask about a player choice, injury, final, qualification miracle, tactical revolution, or impossible dynasty.
      </p>
      <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 sm:p-8">
        <UniverseForm
          initialScenario={params.scenario}
          existingUniverse={
            existingUniverse
              ? { slug: existingUniverse.slug, title: existingUniverse.title }
              : null
          }
        />
      </div>
    </main>
  );
}
