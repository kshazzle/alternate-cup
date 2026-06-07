import type { ReactNode } from "react";

export function StoryShell({ children }: { children: ReactNode }) {
  return <article className="mx-auto max-w-6xl px-6 py-10 lg:px-8">{children}</article>;
}
