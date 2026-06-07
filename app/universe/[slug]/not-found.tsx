import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UniverseNotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200">Timeline lost</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">This universe collapsed.</h1>
        <p className="mt-4 text-zinc-400">The slug does not match any known alternate football reality.</p>
        <Button asChild className="mt-8">
          <Link href="/create">Create a new universe</Link>
        </Button>
      </div>
    </main>
  );
}
