import { cn } from "@/lib/utils";

type ProgressProps = {
  value: number;
  className?: string;
};

export function Progress({ value, className }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-white/10", className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-amber-300 to-red-400"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
