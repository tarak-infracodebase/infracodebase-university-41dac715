import { Button } from "@/components/ui/button";
import { MILESTONES } from "@/data/milestones";
import { Linkedin, X } from "lucide-react";

interface MilestoneBadgeModalProps {
  day: number | null;
  onClose: () => void;
}

export function MilestoneBadgeModal({ day, onClose }: MilestoneBadgeModalProps) {
  if (!day) return null;
  const milestone = MILESTONES[day];
  if (!milestone) return null;

  const shareText = encodeURIComponent(
    `I just earned the "${milestone.name}" badge — Day ${day} of the 30-Day Infracodebase Challenge!\n\nTraining daily on infracodebase.com — learning to ship enterprise-grade cloud infrastructure with AI.\n\n#Infracodebase #CloudEngineering #IaC #DevOps #InfracodebaseUniversity`
  );
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://university.infracodebase.com&summary=${shareText}`;

  // Confetti dot colors
  const confettiColors = ["#7F77DD", "#1D9E75", "#EF9F27", "#D85A30", "#378ADD", "#4ade80"];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 pt-12">
      <div
        className="rounded-2xl p-8 max-w-sm w-full mx-4 relative text-center"
        style={{ background: "#1e1e32", border: "1px solid #2a2a45" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Confetti dots */}
        <div className="flex justify-center gap-2 mb-6">
          {confettiColors.map((c, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-sm"
              style={{ background: c, transform: `rotate(${i * 15}deg)` }}
            />
          ))}
        </div>

        {/* Badge icon ring */}
        <div
          className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ border: `3px solid ${milestone.color}`, background: milestone.color + "15" }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill={milestone.color}
            stroke={milestone.color}
            strokeWidth="1"
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </div>

        {/* Day label */}
        <p className="text-sm font-semibold mb-1" style={{ color: milestone.color }}>
          Day {day} — Badge unlocked
        </p>

        {/* Badge name */}
        <h3 className="text-xl font-bold text-foreground mb-2">{milestone.name}</h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {milestone.description}
        </p>

        {/* LinkedIn share */}
        <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Button className="w-full gap-2" style={{ background: "#0A66C2" }}>
            <Linkedin className="h-4 w-4" />
            Share on LinkedIn
          </Button>
        </a>

        {/* Continue */}
        <button
          onClick={onClose}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Continue training
        </button>
      </div>
    </div>
  );
}
