import type { Universe } from "@prisma/client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type UniverseCardProps = {
  universe: Pick<Universe, "slug" | "title" | "scenario" | "summary" | "divergenceScore" | "chaosScore" | "views" | "shares">;
  rank?: number;
};

export function UniverseCard({ universe, rank }: UniverseCardProps) {
  return (
    <Link href={`/universe/${universe.slug}`} className="group block">
      <Card className="h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:bg-white/[0.09]">
        <CardContent className="flex h-full flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <Badge>{rank ? `#${rank}` : "Universe"}</Badge>
            <ArrowUpRight className="size-5 text-zinc-500 transition group-hover:text-amber-200" />
          </div>
          <div>
            <p className="mb-3 text-sm text-amber-200/80">{universe.scenario}</p>
            <h3 className="text-2xl font-semibold tracking-tight text-white">{universe.title}</h3>
          </div>
          <p className="line-clamp-3 text-sm leading-6 text-zinc-400">{universe.summary}</p>
          <div className="mt-auto grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-xs text-zinc-400">
            <Metric label="Divergence" value={`${universe.divergenceScore}%`} />
            <Metric label="Chaos" value={`${universe.chaosScore}%`} />
            <Metric label="Heat" value={`${universe.views + universe.shares}`} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="uppercase tracking-[0.18em] text-zinc-600">{label}</p>
      <p className="mt-1 font-mono text-sm font-semibold text-zinc-100">{value}</p>
    </div>
  );
}
