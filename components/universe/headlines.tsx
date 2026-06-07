type HeadlinesProps = {
  headlines: string[];
};

export function Headlines({ headlines }: HeadlinesProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-zinc-950/80 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-500">Back Pages</p>
      <div className="mt-5 grid gap-3">
        {headlines.map((headline) => (
          <div key={headline} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 font-serif text-2xl text-white">
            {headline}
          </div>
        ))}
      </div>
    </section>
  );
}
