import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-sm font-semibold text-white">
          What If? WC
        </Link>
        <div className="hidden items-center gap-4 sm:flex">
          <Link href="/explore" className="text-sm text-zinc-400 transition hover:text-white">
            Explore
          </Link>
          <Link href="/trending" className="text-sm text-zinc-400 transition hover:text-white">
            Trending
          </Link>
          <Link href="/create" className="text-sm text-zinc-400 transition hover:text-white">
            Create
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {session?.user ? (
          <>
            {session.user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={session.user.image}
                alt={session.user.name ?? "User"}
                className="size-8 rounded-full"
              />
            ) : (
              <div className="flex size-8 items-center justify-center rounded-full bg-amber-400/20 text-xs font-bold text-amber-300">
                {session.user.name?.[0]?.toUpperCase() ?? "U"}
              </div>
            )}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button type="submit" className="text-sm text-zinc-500 transition hover:text-white">
                Sign out
              </button>
            </form>
          </>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn(undefined, { redirectTo: "/" });
            }}
          >
            <Button type="submit" size="sm" variant="secondary">
              Sign in
            </Button>
          </form>
        )}
      </div>
    </nav>
  );
}
