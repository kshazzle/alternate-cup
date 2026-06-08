"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp } from "lucide-react";
import { toggleUpvoteAction } from "@/actions/upvote";
import { cn } from "@/lib/utils";

type UpvoteButtonProps = {
  universeId: string;
  initialCount: number;
  initialUpvoted: boolean;
  isSignedIn: boolean;
};

export function UpvoteButton({
  universeId,
  initialCount,
  initialUpvoted,
  isSignedIn,
}: UpvoteButtonProps) {
  const [upvoted, setUpvoted] = useState(initialUpvoted);
  const [count, setCount] = useState(initialCount);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    const nextUpvoted = !upvoted;
    setUpvoted(nextUpvoted);
    setCount((c) => c + (nextUpvoted ? 1 : -1));

    startTransition(async () => {
      const result = await toggleUpvoteAction(universeId);
      if (result.error === "sign-in-required") {
        router.push("/sign-in");
        setUpvoted(false);
        setCount(initialCount);
        return;
      }
      setUpvoted(result.upvoted);
      setCount(result.upvoteCount);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={cn(
        "flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition",
        upvoted
          ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
          : "border-white/10 bg-white/[0.05] text-zinc-300 hover:border-white/20 hover:text-white",
      )}
    >
      <ChevronUp className={cn("size-4 transition", upvoted && "text-amber-300")} />
      {count > 0 ? count : "Upvote"}
    </button>
  );
}
