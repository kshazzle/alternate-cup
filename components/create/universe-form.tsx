"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Sparkles } from "lucide-react";
import { createUniverseAction, type CreateUniverseState } from "@/actions/create-universe";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { assessScenarioTopic } from "@/lib/validation/scenario-topic";
import { SuggestedPrompts } from "./suggested-prompts";
import { GenerationLoading } from "./generation-loading";

const initialState: CreateUniverseState = {};

type UniverseFormProps = {
  initialScenario?: string;
  existingUniverse?: {
    slug: string;
    title: string;
  } | null;
};

export function UniverseForm({ initialScenario = "", existingUniverse = null }: UniverseFormProps) {
  const [scenario, setScenario] = useState(initialScenario);
  const [forceRegenerate, setForceRegenerate] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [state, action, pending] = useActionState(createUniverseAction, initialState);
  const topicError =
    scenario.trim().length >= 12 ? assessScenarioTopic(scenario).message : undefined;
  const showTopicError = topicError && !state.error;
  const isGenerating = pending && submitted;

  return (
    <form action={action} onSubmit={() => setSubmitted(true)} className="space-y-6">
      <input type="hidden" name="forceRegenerate" value={forceRegenerate ? "true" : "false"} />
      {existingUniverse ? (
        <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-50">
          <p>
            This scenario already exists as{" "}
            <Link href={`/universe/${existingUniverse.slug}`} className="font-semibold text-white underline">
              {existingUniverse.title}
            </Link>
            . Submitting again opens the saved universe unless you choose a new variant below.
          </p>
        </div>
      ) : null}
      <Textarea
        name="scenario"
        value={scenario}
        onChange={(event) => setScenario(event.target.value)}
        placeholder="What if India qualified for FIFA World Cup 2026?"
        disabled={isGenerating}
      />
      {state.error ? (
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-100">{state.error}</div>
      ) : null}
      {showTopicError ? (
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100">
          {topicError}
        </div>
      ) : null}
      <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-300">
        <input
          type="checkbox"
          checked={forceRegenerate}
          onChange={(event) => setForceRegenerate(event.target.checked)}
          disabled={isGenerating}
          className="mt-1"
        />
        <span>
          Generate a new variant anyway
          <span className="mt-1 block text-zinc-500">
            Creates a fresh AI timeline with a new slug. Use this only if you want a different take on the same scenario.
          </span>
        </span>
      </label>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button size="lg" disabled={isGenerating || Boolean(topicError)}>
          <Sparkles className="size-5" />
          {isGenerating
            ? forceRegenerate
              ? "Generating new variant..."
              : "Generating timeline..."
            : forceRegenerate
              ? "Generate new variant"
              : "Generate universe"}
        </Button>
        <p className="text-sm text-zinc-500">Output is saved to a shareable slug URL.</p>
      </div>
      {isGenerating ? <GenerationLoading /> : <SuggestedPrompts onPick={setScenario} />}
    </form>
  );
}
