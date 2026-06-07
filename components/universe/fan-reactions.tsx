import type { FanReaction } from "@/lib/universes/fan-reactions";

type FanReactionsProps = {
  reactions: FanReaction[];
};

export function FanReactions({ reactions }: FanReactionsProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6">
      <h2 className="text-2xl font-semibold text-white">Fan Reactions</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {reactions.map((reaction) => (
          <div
            key={`${reaction.handle}-${reaction.quote}`}
            className="rounded-2xl border border-white/5 bg-black/30 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-300/15 text-sm font-semibold text-amber-200">
                {reaction.handle.slice(0, 1).toUpperCase()}
              </div>
              <p className="font-mono text-sm text-amber-200">@{reaction.handle}</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-300">{reaction.quote}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
