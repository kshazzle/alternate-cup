type AwardsGridProps = {
  goldenBoot: string;
  goldenBall: string;
  youngPlayer: string;
  fairPlay: string;
};

export function AwardsGrid({ goldenBoot, goldenBall, youngPlayer, fairPlay }: AwardsGridProps) {
  const awards = [
    ["Golden Boot", goldenBoot],
    ["Golden Ball", goldenBall],
    ["Best Young Player", youngPlayer],
    ["Fair Play Award", fairPlay],
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {awards.map(([label, value]) => (
        <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">{label}</p>
          <p className="mt-3 text-xl font-semibold text-white">{value}</p>
        </div>
      ))}
    </section>
  );
}
