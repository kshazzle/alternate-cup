"use client";

import { useActionState } from "react";
import { GitBranch } from "lucide-react";
import { branchUniverseAction, type BranchUniverseState } from "@/actions/branch-universe";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const initialState: BranchUniverseState = {};

export function BranchUniverseCard({ slug }: { slug: string }) {
  const [state, action, pending] = useActionState(branchUniverseAction, initialState);

  return (
    <form action={action} className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6">
      <input type="hidden" name="slug" value={slug} />
      <h2 className="text-2xl font-semibold text-white">Generate Another Timeline</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-400">
        Branch this universe with a new twist. Try changing the final, an injury, a manager, or a transfer decision.
      </p>
      <Textarea
        name="scenario"
        className="mt-5 min-h-28"
        placeholder="What if this final ended on penalties instead?"
        disabled={pending}
      />
      {state.error ? <p className="mt-3 text-sm text-red-200">{state.error}</p> : null}
      <Button className="mt-5" disabled={pending}>
        <GitBranch className="size-4" />
        {pending ? "Branching..." : "Generate branch"}
      </Button>
    </form>
  );
}
