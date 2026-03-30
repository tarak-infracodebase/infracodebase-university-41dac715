import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
}

interface ProgressBarProps {
  title: string;
  steps: Step[];
  currentStepIndex: number;
  completedCount: number;
}

export function ProgressBar({ title, steps, currentStepIndex, completedCount }: ProgressBarProps) {
  const percent = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;

  return (
    <div className="md:hidden sticky top-[56px] z-10 border-b px-[18px] py-3"
      style={{ background: "#0d0d0b", borderColor: "rgba(255,255,255,0.07)" }}>
      {/* top row */}
      <div className="flex items-center justify-between mb-2">
        <span
          className="uppercase font-sans"
          style={{ fontSize: 9, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)" }}
        >
          {title}
        </span>
        <span
          className="font-mono"
          style={{ fontSize: 12, color: "rgba(255,255,255,0.28)" }}
        >
          {completedCount} / {steps.length} complete
        </span>
      </div>

      {/* fill bar */}
      <div className="overflow-hidden rounded-full mb-[10px]"
        style={{ height: 2, background: "rgba(255,255,255,0.08)" }}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${percent}%`, background: "#c87040" }}
        />
      </div>

      {/* step dots */}
      <div className="flex">
        {steps.map((step, i) => {
          const done = i < completedCount;
          const active = i === currentStepIndex;
          return (
            <div key={step.id} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={cn(
                  "rounded-full border transition-all duration-150",
                  done && "border-transparent",
                  active && !done && "bg-transparent border-transparent",
                  !done && !active && "bg-transparent"
                )}
                style={{
                  width: 6,
                  height: 6,
                  ...(done ? { background: "#c87040", borderColor: "#c87040" } : {}),
                  ...(active && !done ? { borderColor: "#c87040", boxShadow: "0 0 0 2px rgba(200,112,64,0.2)" } : {}),
                  ...(!done && !active ? { borderColor: "rgba(255,255,255,0.2)" } : {}),
                }}
              />
              <span
                className="text-center leading-tight"
                style={{
                  fontSize: 8,
                  maxWidth: 48,
                  color: done
                    ? "rgba(200,112,64,0.6)"
                    : active
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(255,255,255,0.2)",
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
