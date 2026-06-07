import { Progress } from "@/components/ui/progress";

type DivergenceScoreProps = {
  divergenceScore: number;
  chaosScore: number;
};

export function DivergenceScore({ divergenceScore, chaosScore }: DivergenceScoreProps) {
  return (
    <div className="grid gap-4">
      <Score label="Reality Divergence" value={divergenceScore} />
      <Score label="Chaos Index" value={chaosScore} />
    </div>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">{label}</p>
        <p className="font-mono text-2xl font-semibold text-white">{value}%</p>
      </div>
      <Progress value={value} className="mt-4" />
    </div>
  );
}
