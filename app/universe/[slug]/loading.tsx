export default function UniverseLoading() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <div className="h-8 w-48 animate-pulse rounded-full bg-white/10" />
      <div className="mt-8 h-24 max-w-4xl animate-pulse rounded-3xl bg-white/10" />
      <div className="mt-10 grid gap-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-40 animate-pulse rounded-[2rem] bg-white/[0.06]" />
        ))}
      </div>
    </main>
  );
}
