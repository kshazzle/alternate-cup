import { Shuffle } from "lucide-react";
import { randomUniverseAction } from "@/actions/random-universe";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Random Universe",
  description: "Generate a random alternate FIFA World Cup timeline.",
};

export default function RandomPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <form action={randomUniverseAction} className="max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center">
        <Badge>Random Universe</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-white">
          Let the multiverse pick the what-if.
        </h1>
        <p className="mt-4 text-zinc-400">
          This button triggers a real AI generation and saves a new shareable timeline.
        </p>
        <Button size="lg" className="mt-8">
          <Shuffle className="size-5" />
          Generate random universe
        </Button>
      </form>
    </main>
  );
}
