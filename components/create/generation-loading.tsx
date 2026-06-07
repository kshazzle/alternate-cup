"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const steps = [
  "Splitting reality",
  "Rewriting qualifiers",
  "Simulating knockout chaos",
  "Drafting headlines",
];

export function GenerationLoading() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-amber-300/20 bg-amber-300/[0.07]">
      <div className="relative h-0.5 w-full overflow-hidden bg-amber-300/10">
        <div className="animate-progress-sweep absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200">Generating</p>
          <p className="font-mono text-xs text-amber-200/40">
            {activeStep + 1}&thinsp;/&thinsp;{steps.length}
          </p>
        </div>

        <ul className="mt-5 grid gap-3">
          {steps.map((step, index) => {
            const done = index < activeStep;
            const active = index === activeStep;
            const waiting = index > activeStep;

            return (
              <li
                key={step}
                className={`flex items-center gap-3 text-sm transition-all duration-700 ${waiting ? "opacity-25" : "opacity-100"}`}
              >
                <span className="relative flex size-4 shrink-0 items-center justify-center">
                  {done ? (
                    <span className="flex size-4 items-center justify-center rounded-full bg-amber-300">
                      <Check className="size-2.5 stroke-[3] text-black" />
                    </span>
                  ) : active ? (
                    <>
                      <span className="absolute size-4 animate-ping rounded-full bg-amber-300/60" />
                      <span className="relative size-2 rounded-full bg-amber-300" />
                    </>
                  ) : (
                    <span className="size-2 rounded-full bg-amber-300/30" />
                  )}
                </span>
                <span
                  className={
                    done
                      ? "text-zinc-600 line-through decoration-amber-300/20"
                      : active
                        ? "font-medium text-amber-100"
                        : "text-zinc-500"
                  }
                >
                  {step}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
