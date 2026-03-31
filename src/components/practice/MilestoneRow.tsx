import { Star, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MILESTONES } from "@/data/milestones";

interface MilestoneRowProps {
  day: number;
  earned: boolean;
  onShare: () => void;
}

export function MilestoneRow({ day, earned, onShare }: MilestoneRowProps) {
  const milestone = MILESTONES[day];
  if (!milestone) return null;

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-lg"
      style={{
        background: "#0d0d1e",
        border: "1px solid #1a1a35",
      }}
    >
      <Star
        className="h-5 w-5 shrink-0"
        style={{ color: milestone.color, fill: earned ? milestone.color : "transparent" }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: milestone.color }}>
          Day {day} — {milestone.name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{milestone.description}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Badge
          variant="outline"
          className="text-xs"
          style={{
            color: earned ? milestone.color : "#6b6b78",
            borderColor: earned ? milestone.color + "40" : "#2a2a45",
            background: earned ? milestone.color + "15" : "transparent",
          }}
        >
          {earned ? "Earned" : "Badge"}
        </Badge>
        {earned && (
          <Button
            size="sm"
            variant="ghost"
            className="text-xs gap-1 h-7 text-blue-400 hover:text-blue-300"
            onClick={onShare}
          >
            Share <ExternalLink className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
}
