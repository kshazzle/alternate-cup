export default function CreateLoading() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <div className="skeleton h-7 w-40 rounded-full" />
      <div className="mt-6 space-y-3">
        <div className="skeleton h-14 w-full max-w-3xl rounded-2xl" />
        <div className="skeleton h-14 w-2/3 rounded-2xl" />
      </div>
      <div className="skeleton mt-5 h-6 w-full max-w-xl rounded-lg" />
      <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 sm:p-8">
        <div className="skeleton h-32 w-full rounded-2xl" />
        <div className="skeleton mt-6 h-11 w-full rounded-xl" />
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="skeleton h-12 w-52 rounded-full" />
          <div className="skeleton h-5 w-60 rounded-lg" />
        </div>
      </div>
    </main>
  );
}
