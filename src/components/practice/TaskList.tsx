import { DAYS, PHASE_COLORS, type ChallengeDay } from "@/data/challengeDays";
import { MILESTONE_DAYS } from "@/data/milestones";
import { getDayStatus } from "@/hooks/useChallenge";
import { TaskRow } from "./TaskRow";
import { MilestoneRow } from "./MilestoneRow";
import { Separator } from "@/components/ui/separator";

interface TaskListProps {
  completedDays: number[];
  onComplete: (day: number) => void;
  onMilestoneShare: (day: number) => void;
}

const PHASES: ChallengeDay["phase"][] = [
  "AI Foundation",
  "Prompt & Design",
  "Validate & Fix",
  "Mastery",
];

export function TaskList({ completedDays, onComplete, onMilestoneShare }: TaskListProps) {
  return (
    <div className="space-y-2">
      {PHASES.map((phase) => {
        const phaseDays = DAYS.filter((d) => d.phase === phase);
        const lastDay = phaseDays[phaseDays.length - 1]?.day;
        const milestoneDay = MILESTONE_DAYS.find(
          (ms) => phaseDays.some((d) => d.day === ms)
        );

        return (
          <div key={phase}>
            {/* Phase header */}
            <div className="flex items-center gap-2 py-2 px-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: PHASE_COLORS[phase] }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: PHASE_COLORS[phase] }}
              >
                {phase}
              </span>
              <span className="text-xs text-muted-foreground">
                Days {phaseDays[0]?.day}–{lastDay}
              </span>
            </div>

            {/* Task rows */}
            <div className="space-y-1">
              {phaseDays.map((day) => (
                <TaskRow
                  key={day.day}
                  day={day}
                  status={getDayStatus(day.day, completedDays)}
                  onComplete={() => onComplete(day.day)}
                />
              ))}
            </div>

            {/* Milestone row after phase */}
            {milestoneDay && (
              <div className="mt-1 mb-2">
                <MilestoneRow
                  day={milestoneDay}
                  earned={completedDays.includes(milestoneDay)}
                  onShare={() => onMilestoneShare(milestoneDay)}
                />
              </div>
            )}

            <Separator className="my-2 opacity-20" />
          </div>
        );
      })}
    </div>
  );
}
