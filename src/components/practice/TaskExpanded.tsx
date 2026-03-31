import { Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TaskExpandedProps {
  day: number;
  where: string;
  ref: string | null;
  steps: string[];
  onComplete: () => void;
}

export function TaskExpanded({ day, where, ref: refUrl, steps, onComplete }: TaskExpandedProps) {
  const safeSteps = Array.isArray(steps) ? steps : [];
  const [checked, setChecked] = useState<boolean[]>(() => safeSteps.map(() => false));

  const allChecked = safeSteps.length > 0 && checked.every(Boolean);

  const toggle = (idx: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  return (
    <div
      className="rounded-lg p-4 mt-1 space-y-4"
      style={{ background: "#181830", border: "1px solid #252545" }}
    >
      {/* Platform bar */}
      <div
        className="flex items-center gap-3 rounded-lg p-3 flex-wrap"
        style={{ background: "#0d0d1e" }}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="shrink-0 w-6 h-6 rounded bg-[#534AB7]/30 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7F77DD" strokeWidth="2">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
            </svg>
          </div>
          <p className="text-xs text-muted-foreground truncate">
            Do this on <span className="text-foreground font-medium">infracodebase.com</span> → {where}
          </p>
        </div>
        <a
          href="https://infracodebase.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="sm"
            className="gap-1.5 text-xs shrink-0"
            style={{ background: "#534AB7" }}
          >
            Open infracodebase.com <ExternalLink className="h-3 w-3" />
          </Button>
        </a>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, i) => (
          <button
            key={i}
            className="flex items-start gap-3 text-left w-full group"
            onClick={() => toggle(i)}
          >
            <div
              className="shrink-0 w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-colors"
              style={{
                borderColor: checked[i] ? "#4ade80" : "#4a4a65",
                background: checked[i] ? "#4ade80" : "transparent",
              }}
            >
              {checked[i] && <Check className="h-3 w-3 text-black" />}
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-0.5">
                Step {i + 1}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: checked[i] ? "#6b6b78" : "#d0d0d8",
                  textDecoration: checked[i] ? "line-through" : "none",
                }}
              >
                {step}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Reference link */}
      {refUrl && (
        <a
          href={refUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
        >
          <ExternalLink className="h-3 w-3" />
          Reference docs
        </a>
      )}

      {/* Mark complete */}
      <div className="flex justify-end pt-2">
        <Button
          size="sm"
          disabled={!allChecked}
          onClick={onComplete}
          className="gap-1.5"
          style={allChecked ? { background: "#534AB7" } : undefined}
        >
          Mark Day {day} complete →
        </Button>
      </div>
    </div>
  );
}
