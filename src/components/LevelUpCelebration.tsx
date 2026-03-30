import { useState, useEffect, useCallback } from "react";
import { useGamificationContext } from "@/hooks/GamificationProvider";
import { LEVELS } from "@/hooks/useGamification";
import { Sparkles, Star, Trophy } from "lucide-react";

export function LevelUpCelebration() {
  const { levelIdx, levelName } = useGamificationContext();
  const [show, setShow] = useState(false);
  const [displayLevel, setDisplayLevel] = useState<{ idx: number; name: string } | null>(null);
  const [prevLevelIdx, setPrevLevelIdx] = useState(levelIdx);

  useEffect(() => {
    if (levelIdx > prevLevelIdx && prevLevelIdx >= 0) {
      setDisplayLevel({ idx: levelIdx, name: LEVELS[levelIdx].name });
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      setPrevLevelIdx(levelIdx);
      return () => clearTimeout(timer);
    }
    setPrevLevelIdx(levelIdx);
  }, [levelIdx, prevLevelIdx]);

  if (!show || !displayLevel) return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm animate-fade-in pointer-events-auto" onClick={() => setShow(false)} />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              background: `hsl(${Math.random() * 360}, 70%, 60%)`,
              animation: `level-up-particle ${1.5 + Math.random() * 2}s ease-out forwards`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Card */}
      <div className="relative z-10 pointer-events-auto" style={{ animation: "level-up-card 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}>
        <div className="rounded-2xl border border-primary/40 bg-card/95 backdrop-blur-md p-8 text-center shadow-2xl max-w-sm mx-4">
          <div className="relative mx-auto w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full bg-primary/20" style={{ animation: "level-up-ring 1.5s ease-out infinite" }} />
            <div className="absolute inset-2 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="h-7 w-7 text-primary" style={{ animation: "level-up-icon 0.8s ease-out 0.3s both" }} />
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-mono uppercase tracking-widest text-primary">Level Up!</span>
            <Sparkles className="h-4 w-4 text-primary" />
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1">{displayLevel.name}</h2>
          <p className="text-sm text-muted-foreground mb-4">
            You've reached Level {displayLevel.idx + 1}
          </p>

          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: Math.min(displayLevel.idx + 1, 5) }).map((_, i) => (
              <Star key={i} className="h-4 w-4 text-primary fill-primary" style={{ animation: `level-up-star 0.4s ease-out ${0.5 + i * 0.1}s both` }} />
            ))}
          </div>

          <button
            onClick={() => setShow(false)}
            className="mt-5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Continue learning →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes level-up-card {
          0% { opacity: 0; transform: scale(0.5) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes level-up-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes level-up-icon {
          0% { opacity: 0; transform: scale(0) rotate(-180deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes level-up-star {
          0% { opacity: 0; transform: scale(0); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes level-up-particle {
          0% { opacity: 1; transform: scale(1) translate(0, 0); }
          100% { opacity: 0; transform: scale(0) translate(${Math.random() > 0.5 ? '' : '-'}${30 + Math.random() * 60}px, -${40 + Math.random() * 80}px); }
        }
      `}</style>
    </div>
  );
}
