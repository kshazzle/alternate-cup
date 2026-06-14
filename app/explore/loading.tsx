export default function ExploreLoading() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <div className="skeleton h-7 w-32 rounded-full" />
      <div className="mt-6 space-y-3">
        <div className="skeleton h-14 w-full max-w-2xl rounded-2xl" />
        <div className="skeleton h-14 w-1/2 rounded-2xl" />
      </div>
      <div className="mt-10 flex gap-3">
        <div className="skeleton h-12 flex-1 rounded-2xl" />
        <div className="skeleton h-12 w-28 rounded-2xl" />
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="skeleton h-56 rounded-[2rem]" />
        ))}
      </div>
    </main>
  );
}
