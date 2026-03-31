import { Card } from "@/components/ui/card";
import { Lock, Check } from "lucide-react";

interface LockedAdvancedCardProps {
  unlocked: boolean;
}

export function LockedAdvancedCard({ unlocked }: LockedAdvancedCardProps) {
  return (
    <Card
      className="p-6"
      style={{
        background: "#111120",
        opacity: unlocked ? 1 : 0.6,
        border: unlocked ? "1px solid #1D9E75" : "1px solid #1a1a35",
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            background: unlocked ? "#1D9E75" + "20" : "#2a2a45",
          }}
        >
          {unlocked ? (
            <Check className="h-5 w-5 text-green-400" />
          ) : (
            <Lock className="h-5 w-5 text-muted-foreground/50" />
          )}
        </div>
        <div className="flex-1">
          <h3
            className="text-base font-bold"
            style={{ color: unlocked ? "#e8e6e0" : "#6b6b78" }}
          >
            75-Day Advanced Track
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Containers · Serverless · Data platform · Enterprise governance · Cross-cloud migrations
          </p>
          <p
            className="text-xs mt-3 font-medium"
            style={{ color: unlocked ? "#4ade80" : "#6b6b78" }}
          >
            {unlocked
              ? "30-Day Challenge complete — 75-Day Advanced Track is now unlocked"
              : "Complete the 30-Day Challenge to unlock the 75-Day Advanced Track"}
          </p>
          {unlocked && (
            <p className="text-xs text-muted-foreground mt-2 italic">Coming soon</p>
          )}
        </div>
      </div>
    </Card>
  );
}
