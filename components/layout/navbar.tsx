import Link from "next/link";
import { Suspense } from "react";
import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { NavLinks } from "./nav-links";
import { AccountMenu } from "./account-menu";

async function NavAuth() {
  const session = await auth();

  if (session?.user) {
    return (
      <AccountMenu
        name={session.user.name ?? "User"}
        image={session.user.image ?? null}
        signOutAction={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      />
    );
  }

  return (
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
  );
}

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 to-amber-500 text-sm font-black text-black shadow-[0_0_20px_rgba(251,191,36,0.35)]">
              ?
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">What If? WC</span>
          </Link>
          <NavLinks />
        </div>
        <Suspense fallback={<div className="size-8 animate-pulse rounded-full bg-white/5" />}>
          <NavAuth />
        </Suspense>
      </div>
    </nav>
  );
}
