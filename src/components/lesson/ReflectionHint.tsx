import { useState } from "react";

interface ReflectionHintProps {
  hint: string;
}

export function ReflectionHint({ hint }: ReflectionHintProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3 mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="font-mono text-xs text-primary/70 hover:text-primary bg-transparent border-none cursor-pointer p-0 flex items-center gap-1.5 transition-colors"
      >
        <span
          className="text-xs inline-block transition-transform duration-150"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ▶
        </span>
        {open ? "Hide hint" : "Show hint"}
      </button>

      {open && (
        <div className="mt-2.5 p-3 bg-primary/5 border border-primary/20 rounded-md border-l-2 border-l-primary/40">
          <p className="font-mono text-xs text-muted-foreground leading-relaxed m-0">
            {hint}
          </p>
        </div>
      )}
    </div>
  );
}
