import Link from "next/link";
import { Sparkles, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Badge>AI World Cup multiverse</Badge>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <h1 className="text-balance text-6xl font-semibold tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
              Rewrite football history without breaking believability.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              What If? World Cup Edition turns wild what-ifs into full sports-media universes: timelines, tournaments,
              awards, headlines, fan reactions, and legacy.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/create">
                  <Sparkles className="size-5" />
                  Generate a universe
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/random">
                  <Shuffle className="size-5" />
                  Random universe
                </Link>
              </Button>
            </div>
          </div>
          <div className="rounded-[2rem] border border-amber-300/20 bg-black/50 p-5 shadow-[0_0_80px_rgba(245,197,66,0.18)]">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-zinc-950 to-zinc-900 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-200">What If Final</p>
              <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center">
                <Team name="Portugal" score="2" />
                <span className="text-zinc-600">FT</span>
                <Team name="Argentina" score="1" />
              </div>
              <p className="mt-8 text-sm leading-6 text-zinc-400">
                Ronaldo lifts the 2022 World Cup, Messi delays retirement, and Mbappe inherits a colder, louder
                football planet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team({ name, score }: { name: string; score: string }) {
  return (
    <div>
      <p className="text-sm text-zinc-400">{name}</p>
      <p className="mt-2 font-mono text-6xl font-semibold text-white">{score}</p>
    </div>
  );
}
