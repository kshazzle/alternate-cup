"use client";

import { randomScenarios } from "@/lib/ai/random-scenarios";

type SuggestedPromptsProps = {
  onPick: (scenario: string) => void;
};

export function SuggestedPrompts({ onPick }: SuggestedPromptsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {randomScenarios.slice(0, 6).map((scenario) => (
        <button
          key={scenario}
          type="button"
          onClick={() => onPick(scenario)}
          className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-left text-sm leading-6 text-zinc-300 transition hover:border-amber-300/40 hover:text-white"
        >
          {scenario}
        </button>
      ))}
    </div>
  );
}
