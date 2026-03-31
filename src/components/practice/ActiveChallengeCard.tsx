import { Card } from "@/components/ui/card";
import { DAYS, PHASE_COLORS } from "@/data/challengeDays";
import { MILESTONE_DAYS } from "@/data/milestones";

interface ActiveChallengeCardProps {
  completedCount: number;
}

export function ActiveChallengeCard({ completedCount }: ActiveChallengeCardProps) {
  const pct = Math.round((completedCount / 30) * 100);

  return (
    <Card className="p-6 border-[#534AB7]/40" style={{ background: "#1e1e32" }}>
      <div className="flex items-start gap-4">
        {/* Hexagon icon */}
        <div
          className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #534AB7, #7F77DD)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-foreground">30-Day Infracodebase Challenge</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Complete each day on infracodebase.com to unlock the next. 4 LinkedIn badges.
          </p>
        </div>
      </div>

      {/* Milestone progress bar */}
      <div className="mt-6 relative">
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "#2a2a45" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, #534AB7, #7F77DD)",
            }}
          />
        </div>

        {/* Milestone pins */}
        <div className="relative h-5 mt-1">
          {MILESTONE_DAYS.map((ms) => {
            const pos = (ms / 30) * 100;
            const phase = DAYS.find((d) => d.day === ms)?.phase ?? "AI Foundation";
            const color = PHASE_COLORS[phase];
            const earned = completedCount >= ms;
            return (
              <div
                key={ms}
                className="absolute flex flex-col items-center -translate-x-1/2"
                style={{ left: `${pos}%` }}
              >
                <div
                  className="w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: earned ? color : "#4a4a65",
                    background: earned ? color : "transparent",
                  }}
                />
                <span
                  className="text-[10px] mt-0.5 font-medium"
                  style={{ color: earned ? color : "#6b6b78" }}
                >
                  Day {ms}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-4 font-medium">
        Progress: <span className="text-foreground">{completedCount}/30 tasks · {pct}%</span>
      </p>
    </Card>
  );
}
