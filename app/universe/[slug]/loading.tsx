export default function UniverseLoading() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
      <header className="grid gap-8 py-8 lg:grid-cols-[1fr_320px] lg:items-end">
        <div>
          <div className="skeleton h-7 w-44 rounded-full" />
          <div className="mt-6 space-y-3">
            <div className="skeleton h-14 w-full max-w-3xl rounded-2xl" />
            <div className="skeleton h-14 w-2/3 rounded-2xl" />
          </div>
          <div className="skeleton mt-5 h-6 w-full max-w-2xl rounded-lg" />
        </div>
        <div className="space-y-4">
          <div className="skeleton h-11 w-full rounded-full" />
          <div className="skeleton h-28 w-full rounded-3xl" />
        </div>
      </header>

      <div className="grid gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="skeleton h-40 rounded-[2rem]" />
        ))}
      </div>
    </article>
  );
}
