"use client";

import { useActionState, useState } from "react";
import { Sparkles } from "lucide-react";
import { createUniverseAction, type CreateUniverseState } from "@/actions/create-universe";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SuggestedPrompts } from "./suggested-prompts";
import { GenerationLoading } from "./generation-loading";

const initialState: CreateUniverseState = {};

type UniverseFormProps = {
  initialScenario?: string;
};

export function UniverseForm({ initialScenario = "" }: UniverseFormProps) {
  const [scenario, setScenario] = useState(initialScenario);
  const [state, action, pending] = useActionState(createUniverseAction, initialState);

  return (
    <form action={action} className="space-y-6">
      <Textarea
        name="scenario"
        value={scenario}
        onChange={(event) => setScenario(event.target.value)}
        placeholder="What if India qualified for FIFA World Cup 2026?"
        disabled={pending}
      />
      {state.error ? (
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-100">{state.error}</div>
      ) : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button size="lg" disabled={pending}>
          <Sparkles className="size-5" />
          {pending ? "Generating timeline..." : "Generate universe"}
        </Button>
        <p className="text-sm text-zinc-500">Output is saved to a shareable slug URL.</p>
      </div>
      {pending ? <GenerationLoading /> : <SuggestedPrompts onPick={setScenario} />}
    </form>
  );
}
