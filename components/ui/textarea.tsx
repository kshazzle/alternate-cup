import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "min-h-44 w-full resize-none rounded-[1.5rem] border border-white/10 bg-black/40 px-5 py-4 text-base text-white placeholder:text-zinc-500 shadow-inner outline-none transition focus:border-amber-300/60 focus:ring-4 focus:ring-amber-300/10",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
