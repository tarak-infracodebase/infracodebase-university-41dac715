import { AppLayout } from "@/components/AppLayout";
import { useEffect, useState, useRef, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const LS_RATING = "icbu_feedback_rating";
const LS_FRICTION = "icbu_feedback_friction";
const LS_BRUTAL = "icbu_feedback_brutal";
const LS_SUBMITTED = "icbu_feedback_submitted_at";

function useAutoSave(key: string, initial: string) {
  const [value, setValue] = useState(initial);
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setValue(localStorage.getItem(key) || "");
  }, [key]);

  const update = useCallback(
    (next: string) => {
      setValue(next);
      setSaved(false);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        localStorage.setItem(key, next);
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
      }, 800);
    },
    [key],
  );

  return { value, update, saved };
}

function SavedIndicator({ visible }: { visible: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[11px] font-medium text-accent transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <Check className="h-3 w-3" /> Saved
    </span>
  );
}

const FeedbackPage = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);

  const friction = useAutoSave(LS_FRICTION, "");
  const brutal = useAutoSave(LS_BRUTAL, "");

  useEffect(() => {
    const r = localStorage.getItem(LS_RATING);
    if (r) setRating(Number(r));
    setSubmittedAt(localStorage.getItem(LS_SUBMITTED));
  }, []);

  const handleRating = (n: number) => {
    setRating(n);
    localStorage.setItem(LS_RATING, String(n));
  };

  const handleSubmit = () => {
    const ts = new Date().toISOString();
    localStorage.setItem(LS_SUBMITTED, ts);
    setSubmittedAt(ts);
  };

  const hasSubmitted = !!submittedAt;

  return (
    <AppLayout>
      <div className="p-6 lg:p-10 max-w-2xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Feedback</h1>
          <p className="text-sm text-muted-foreground">
            This is a living document. Update it anytime — nothing resets.
          </p>
          {hasSubmitted && (
            <div className="mt-3 text-xs text-muted-foreground/70 font-mono">
              Last shared:{" "}
              {new Date(submittedAt!).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          )}
        </div>

        {/* Section 1 — Rating */}
        <section className="space-y-3">
          <label className="text-sm font-semibold text-foreground">
            How would you rate your experience so far?
          </label>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => handleRating(n)}
                onMouseEnter={() => setHoveredStar(n)}
                onMouseLeave={() => setHoveredStar(0)}
                className="p-0.5 transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    "h-7 w-7 transition-colors",
                    n <= (hoveredStar || rating)
                      ? "fill-accent text-accent"
                      : "text-muted-foreground/30",
                  )}
                />
              </button>
            ))}
          </div>
        </section>

        {/* Section 2 — Friction log */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground">
              Where did you get stuck or confused?
            </label>
            <SavedIndicator visible={friction.saved} />
          </div>
          <p className="text-xs text-muted-foreground">
            Note anything that slowed you down — unclear instructions, broken features, confusing
            copy. Update this as you go.
          </p>
          <Textarea
            value={friction.value}
            onChange={(e) => friction.update(e.target.value)}
            className="min-h-[160px] bg-muted/30 border-border/50 font-mono text-sm resize-y"
            placeholder="e.g. I couldn't find the hands-on exercises from the dashboard..."
          />
        </section>

        {/* Section 3 — Brutal feedback */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground">
              Anything else? Be as direct as you want.
            </label>
            <SavedIndicator visible={brutal.saved} />
          </div>
          <p className="text-xs text-muted-foreground">
            No filter needed. If something feels off, say it.
          </p>
          <Textarea
            value={brutal.value}
            onChange={(e) => brutal.update(e.target.value)}
            className="min-h-[160px] bg-muted/30 border-border/50 font-mono text-sm resize-y"
            placeholder="Say what you really think..."
          />
        </section>

        {/* Section 4 — Submit */}
        <div className="pt-2">
          <Button onClick={handleSubmit} className="px-8">
            {hasSubmitted ? "Update feedback" : "Share feedback"}
          </Button>
          {hasSubmitted && (
            <p className="mt-3 text-xs text-accent font-medium">
              Thanks — your feedback has been noted.
            </p>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default FeedbackPage;
