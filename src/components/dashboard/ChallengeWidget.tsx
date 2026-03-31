import { useChallenge } from "@/hooks/useChallenge";
import { MILESTONE_DAYS } from "@/data/milestones";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function ChallengeWidget() {
  const { progress } = useChallenge();
  const navigate = useNavigate();
  const comp = progress.completedDays.length;
  const pct = Math.round((comp / 30) * 100);
  const nextMs = MILESTONE_DAYS.find((d) => !progress.completedDays.includes(d)) ?? 30;
  const daysLeft = nextMs - comp;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm">30-Day Infracodebase Challenge</span>
          {comp >= 30 && (
            <span className="text-xs text-green-500 font-semibold">Complete ✓</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{comp} / 30 tasks</span>
          <span className="font-semibold text-primary">{pct}%</span>
        </div>
        <Progress value={pct} className="h-1.5" />
        {comp < 30 && (
          <p className="text-xs text-muted-foreground">
            Next badge:{" "}
            <span className="text-primary font-medium">Day {nextMs}</span> in{" "}
            {daysLeft} day{daysLeft !== 1 ? "s" : ""}
          </p>
        )}
        <Button
          size="sm"
          variant={comp >= 30 ? "outline" : "default"}
          className="w-full"
          onClick={() => navigate("/practice")}
        >
          {comp === 0 ? "Start challenge →" : comp >= 30 ? "Review" : "Continue →"}
        </Button>
      </CardContent>
    </Card>
  );
}
