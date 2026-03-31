import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StatsGridProps {
  completedCount: number;
}

const stats = [
  {
    label: "Completed",
    color: "#4ade80",
    tooltip: "Days you have marked as complete.",
    getValue: (c: number) => c,
  },
  {
    label: "Pending",
    color: "#f59e0b",
    tooltip: "The current day waiting for you to complete it.",
    getValue: (c: number) => (c >= 30 ? 0 : 1),
  },
  {
    label: "Unlocked",
    color: "#8880e0",
    tooltip: "Days available to start (only one at a time).",
    getValue: (c: number) => (c >= 30 ? 0 : 1),
  },
  {
    label: "Locked",
    color: "#6b6b78",
    tooltip: "Days that will unlock as you progress.",
    getValue: (c: number) => Math.max(0, 30 - c - 1),
  },
];

export function StatsGrid({ completedCount }: StatsGridProps) {
  return (
    <div
      className="grid grid-cols-4 rounded-xl overflow-hidden"
      style={{ background: "#1a1a2e" }}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="p-4 text-center relative"
          style={{
            borderRight: i < 3 ? "1px solid #2a2a45" : undefined,
          }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="absolute top-2 right-2 text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                <Info className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs max-w-[200px]">
              {stat.tooltip}
            </TooltipContent>
          </Tooltip>
          <p
            className="text-2xl font-bold"
            style={{ color: stat.color }}
          >
            {stat.getValue(completedCount)}
          </p>
          <p className="text-xs text-muted-foreground mt-1 font-medium">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
