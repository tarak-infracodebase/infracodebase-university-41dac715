import { Check, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskExpanded } from "./TaskExpanded";
import { PHASE_COLORS, type ChallengeDay } from "@/data/challengeDays";
import type { getDayStatus } from "@/hooks/useChallenge";
import { useState } from "react";

interface TaskRowProps {
  day: ChallengeDay;
  status: ReturnType<typeof getDayStatus>;
  onComplete: () => void;
}

export function TaskRow({ day, status, onComplete }: TaskRowProps) {
  const [expanded, setExpanded] = useState(false);
  const phaseColor = PHASE_COLORS[day.phase];

  return (
    <div>
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer"
        style={{
          background: status === "active" ? "#1e1e38" : "#1e1e32",
          opacity: status === "locked" ? 0.5 : 1,
        }}
        onClick={() => {
          if (status === "active") setExpanded(!expanded);
        }}
        onMouseEnter={(e) => {
          if (status !== "locked") (e.currentTarget.style.background = "#252548");
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            status === "active" ? "#1e1e38" : "#1e1e32";
        }}
      >
        {/* Day number / check */}
        <div className="shrink-0 w-8 text-center">
          {status === "done" ? (
            <div className="w-6 h-6 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="h-3.5 w-3.5 text-green-400" />
            </div>
          ) : (
            <span
              className="text-sm font-bold"
              style={{ color: status === "locked" ? "#4a4a65" : phaseColor }}
            >
              {day.day}
            </span>
          )}
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-medium truncate"
            style={{
              color: status === "done" ? "#6b6b78" : status === "locked" ? "#4a4a65" : "#e8e6e0",
              textDecoration: status === "done" ? "line-through" : "none",
            }}
          >
            Day {day.day}: {day.name}
          </p>
        </div>

        {/* Status button */}
        <div className="shrink-0">
          {status === "done" ? (
            <Badge
              variant="outline"
              className="text-green-400 border-green-400/30 bg-green-400/10 text-xs"
            >
              Done
            </Badge>
          ) : status === "active" ? (
            <Button
              size="sm"
              variant="secondary"
              className="text-xs h-7 px-4"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
            >
              Start
            </Button>
          ) : (
            <Badge
              variant="outline"
              className="text-muted-foreground/50 border-muted-foreground/20 text-xs gap-1"
            >
              <Lock className="h-3 w-3" /> Unlock
            </Badge>
          )}
        </div>
      </div>

      {/* Expanded view */}
      {expanded && status === "active" && (
        <TaskExpanded
          day={day.day}
          where={day.where}
          ref={day.ref}
          steps={day.steps}
          onComplete={onComplete}
        />
      )}
    </div>
  );
}
