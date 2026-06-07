type TournamentSectionProps = {
  groupStage: string[];
  knockoutStage: string[];
  winner: string;
};

export function TournamentSection({ groupStage, knockoutStage, winner }: TournamentSectionProps) {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <Stage title="Group Stage Highlights" items={groupStage} />
      <Stage title="Knockout Stage Results" items={knockoutStage} />
      <div className="rounded-[2rem] border border-amber-300/30 bg-amber-300/10 p-6 lg:col-span-2">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200">Champion</p>
        <p className="mt-3 text-5xl font-semibold tracking-tight text-white">{winner}</p>
      </div>
    </section>
  );
}

function Stage({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-300">
        {items.map((item) => (
          <li key={item} className="rounded-2xl bg-black/25 p-4">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
