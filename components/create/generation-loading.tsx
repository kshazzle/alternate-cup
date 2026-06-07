const steps = ["Splitting reality", "Rewriting qualifiers", "Simulating knockout chaos", "Drafting headlines"];

export function GenerationLoading() {
  return (
    <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200">Generating</p>
      <div className="mt-5 grid gap-3">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3 text-sm text-zinc-300">
            <span
              className="size-2 animate-pulse rounded-full bg-amber-300"
              style={{ animationDelay: `${index * 180}ms` }}
            />
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
