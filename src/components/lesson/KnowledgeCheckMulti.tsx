import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useAuthGate } from "@/hooks/useAuthGate";
import AuthGateModal from "@/components/AuthGateModal";
import { useStreakTracking } from "@/hooks/useStreakTracking";

interface KCQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface KnowledgeCheckMultiProps {
  questions: KCQuestion[];
  moduleId: string;
}

const KnowledgeCheckMulti = ({ questions, moduleId }: KnowledgeCheckMultiProps) => {
  const storageKey = `icbu_kc_${moduleId}`;
  const { requireAuth, showGate, dismissGate } = useAuthGate();
  const { recordActivity } = useStreakTracking();

  const [answers, setAnswers] = useState<(number | null)[]>(() => new Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(() => {
    try {
      const s = localStorage.getItem(storageKey);
      return s ? Number(s) : null;
    } catch {
      return null;
    }
  });

  const allAnswered = answers.every(a => a !== null);

  const handleSelect = (qIndex: number, optIndex: number) => {
    if (submitted) return;
    setAnswers(prev => prev.map((a, i) => (i === qIndex ? optIndex : a)));
  };

  const score = answers.reduce(
    (acc, a, i) => acc + (a === questions[i].correctAnswer ? 1 : 0),
    0
  );

  const handleSubmit = () => {
    if (!requireAuth()) return;
    setSubmitted(true);
    const newBest = bestScore === null ? score : Math.max(bestScore, score);
    setBestScore(newBest);
    try {
      localStorage.setItem(storageKey, String(newBest));
      // Award XP for knowledge check completion
      const currentXP = parseInt(localStorage.getItem("icbu_xp") || "0", 10);
      localStorage.setItem("icbu_xp", String(currentXP + 100));
      window.dispatchEvent(new Event("icbu_xp_update"));
      recordActivity();
    } catch {}
  };

  const handleRetry = () => {
    setAnswers(new Array(questions.length).fill(null));
    setSubmitted(false);
  };

  const perfect = score === questions.length;

  return (
    <section className="mb-8">
      <AuthGateModal open={showGate} onOpenChange={dismissGate} />
      <h2 className="text-base font-bold mb-1">Knowledge Check</h2>
      {bestScore !== null && !submitted && (
        <p className="text-[11px] text-muted-foreground mb-3 font-mono">
          Best score: {bestScore} / {questions.length}
        </p>
      )}
      <div className="space-y-6">
        {questions.map((q, qi) => (
          <div key={qi} className="rounded-xl border border-border/30 bg-card/30 p-5">
            <p className="text-sm font-medium mb-4">
              <span className="font-mono text-xs text-muted-foreground mr-2">Q{qi + 1}.</span>
              {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                let cls = "border-border/50 hover:border-primary/30 text-muted-foreground";
                if (submitted) {
                  if (oi === q.correctAnswer) {
                    cls = "border-[hsl(145,60%,45%)]/50 bg-[hsl(145,60%,45%)]/10 text-[hsl(145,60%,45%)]";
                  } else if (answers[qi] === oi) {
                    cls = "border-destructive/50 bg-destructive/10 text-destructive";
                  } else {
                    cls = "border-border/30 text-muted-foreground/50";
                  }
                } else if (answers[qi] === oi) {
                  cls = "border-primary/50 bg-primary/10 text-primary";
                }

                return (
                  <button
                    key={oi}
                    onClick={() => handleSelect(qi, oi)}
                    disabled={submitted}
                    className={`w-full text-left rounded-lg border p-3 text-sm transition-all ${cls}`}
                  >
                    <span className="font-mono text-xs mr-2">{String.fromCharCode(65 + oi)}.</span>
                    {opt}
                    {submitted && oi === q.correctAnswer && <span className="ml-2 text-[hsl(145,60%,45%)]">✓</span>}
                    {submitted && answers[qi] === oi && oi !== q.correctAnswer && <span className="ml-2 text-destructive">✗</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <Button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="mt-4"
          size="sm"
        >
          Submit Answers
        </Button>
      ) : (
        <div className="mt-4 rounded-xl border border-border/30 bg-card/30 p-4">
          <p className="text-sm font-semibold mb-1">
            You got {score} out of {questions.length} correct
          </p>
          {perfect ? (
            <p className="text-xs text-[hsl(145,60%,45%)]">
              Great work! You're ready to move on.
            </p>
          ) : (
            <div className="flex items-center gap-3 mt-2">
              <p className="text-xs text-muted-foreground">
                Review the sections above and try again.
              </p>
              <Button onClick={handleRetry} size="sm" variant="outline" className="text-xs">
                Retry
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default KnowledgeCheckMulti;
