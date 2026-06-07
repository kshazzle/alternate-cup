import { ArrowDown } from "lucide-react";

type ButterflyTimelineProps = {
  items: string[];
};

export function ButterflyTimeline({ items }: ButterflyTimelineProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6">
      <h2 className="text-2xl font-semibold text-white">Butterfly Effect Timeline</h2>
      <div className="mt-6 space-y-3">
        {items.map((item, index) => (
          <div key={item} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="grid size-8 place-items-center rounded-full bg-amber-300 font-mono text-sm font-bold text-black">
                {index + 1}
              </span>
              {index < items.length - 1 ? <ArrowDown className="my-2 size-4 text-zinc-600" /> : null}
            </div>
            <p className="pt-1 text-base leading-7 text-zinc-300">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
