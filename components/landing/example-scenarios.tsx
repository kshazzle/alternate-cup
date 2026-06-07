import Link from "next/link";
import { randomScenarios } from "@/lib/ai/random-scenarios";

export function ExampleScenarios() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200">Try these</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Scenario starters</h2>
        </div>
        <Link href="/create" className="hidden text-sm font-semibold text-amber-200 hover:text-amber-100 sm:block">
          Create your own
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {randomScenarios.slice(0, 6).map((scenario) => (
          <Link
            key={scenario}
            href={`/create?scenario=${encodeURIComponent(scenario)}`}
            className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm text-zinc-300 transition hover:border-amber-300/40 hover:bg-white/[0.08] hover:text-white"
          >
            {scenario}
          </Link>
        ))}
      </div>
    </section>
  );
}
