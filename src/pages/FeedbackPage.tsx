import { AppLayout } from "@/components/AppLayout";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star, Check, Share2, ClipboardCopy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams, Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import LZString from "lz-string";

// localStorage keys
const KEYS = {
  disappointment: "icbu_fb_pmf_disappointment",
  who: "icbu_fb_pmf_who",
  benefit: "icbu_fb_pmf_benefit",
  rating: "icbu_fb_rating",
  friction: "icbu_fb_friction",
  valuable: "icbu_fb_valuable",
  brutal: "icbu_fb_brutal",
  submittedAt: "icbu_fb_submitted_at",
} as const;

type FieldKey = keyof Omit<typeof KEYS, "submittedAt">;

// --- Hooks ---

function useAutoSaveText(key: string) {
  const [value, setValue] = useState("");
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

function SavedBadge({ visible }: { visible: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium text-accent transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <Check className="h-3 w-3" /> Saved
    </span>
  );
}

// --- Read-only view ---

function ReadOnlyView({ data }: { data: Record<string, string> }) {
  const disappointmentLabels: Record<string, string> = {
    very: "Very disappointed",
    somewhat: "Somewhat disappointed",
    not: "Not disappointed",
  };

  const questions: { key: FieldKey; label: string; section: "A" | "B" }[] = [
    { key: "disappointment", label: "How would you feel if you could no longer use Infracodebase University?", section: "A" },
    { key: "who", label: "What type of person would benefit most from this?", section: "A" },
    { key: "benefit", label: "What is the main benefit you get from Infracodebase University?", section: "A" },
    { key: "rating", label: "How would you rate your experience so far?", section: "B" },
    { key: "friction", label: "Where did you get stuck or confused?", section: "B" },
    { key: "valuable", label: "What did you find most valuable?", section: "B" },
    { key: "brutal", label: "Anything else?", section: "B" },
  ];

  const renderValue = (key: FieldKey, val: string) => {
    if (!val) return <span className="text-muted-foreground/50 italic">No answer</span>;
    if (key === "disappointment") return disappointmentLabels[val] || val;
    if (key === "rating") {
      const n = Number(val);
      return (
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className={cn("h-5 w-5", s <= n ? "fill-accent text-accent" : "text-muted-foreground/30")} />
          ))}
        </div>
      );
    }
    return <p className="whitespace-pre-wrap font-mono text-sm text-foreground">{val}</p>;
  };

  const sectionA = questions.filter((q) => q.section === "A");
  const sectionB = questions.filter((q) => q.section === "B");

  return (
    <AppLayout>
      <div className="p-6 lg:p-10 max-w-2xl mx-auto space-y-10">
        <div className="rounded-md border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-accent">
          You're viewing shared feedback — these answers are read-only.
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Feedback</h1>
        </div>

        <section className="space-y-6">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-muted-foreground">About Infracodebase University</p>
          {sectionA.map((q) => (
            <div key={q.key} className="space-y-1.5">
              <p className="text-sm font-semibold text-foreground">{q.label}</p>
              <div className="text-sm text-foreground/90">{renderValue(q.key, data[q.key] || "")}</div>
            </div>
          ))}
        </section>

        <section className="space-y-6">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-muted-foreground">Your experience so far</p>
          {sectionB.map((q) => (
            <div key={q.key} className="space-y-1.5">
              <p className="text-sm font-semibold text-foreground">{q.label}</p>
              <div className="text-sm text-foreground/90">{renderValue(q.key, data[q.key] || "")}</div>
            </div>
          ))}
        </section>

        {/* Fill in your own CTA */}
        <div className="pt-4 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            Want to share your own feedback?{" "}
            <Link to="/feedback" className="text-accent hover:underline font-medium">
              Fill in your own →
            </Link>
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

// --- Main page ---

const FeedbackPage = () => {
  const [searchParams] = useSearchParams();
  const answersParam = searchParams.get("answers");

  // Read-only mode
  if (answersParam) {
    try {
      const decompressed = LZString.decompressFromEncodedURIComponent(answersParam);
      if (!decompressed) throw new Error("Decompression failed");
      const decoded = JSON.parse(decompressed);
      return <ReadOnlyView data={decoded} />;
    } catch {
      // fall through to editable
    }
  }

  return <EditableFeedback />;
};

const FRICTION_AREAS_LIST = [
  "Home & Manifesto",
  "Training",
  "Hands-On Training",
  "Video Library",
  "Workshops & Events",
  "Dashboard",
];

function EditableFeedback() {
  const [disappointment, setDisappointment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [copyAnswersMsg, setCopyAnswersMsg] = useState("");
  const [copyFormMsg, setCopyFormMsg] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState("");
  const [stuckAreas, setStuckAreas] = useState<string[]>([]);
  const [referral, setReferral] = useState("");

  const who = useAutoSaveText(KEYS.who);
  const benefit = useAutoSaveText(KEYS.benefit);
  
  const valuable = useAutoSaveText(KEYS.valuable);
  const brutal = useAutoSaveText(KEYS.brutal);

  useEffect(() => {
    setDisappointment(localStorage.getItem(KEYS.disappointment) || "");
    const r = localStorage.getItem(KEYS.rating);
    if (r) setRating(Number(r));
    setSubmittedAt(localStorage.getItem(KEYS.submittedAt));
  }, []);

  const handleDisappointment = (val: string) => {
    setDisappointment(val);
    localStorage.setItem(KEYS.disappointment, val);
  };

  const handleRating = (n: number) => {
    setRating(n);
    localStorage.setItem(KEYS.rating, String(n));
  };

  const answeredCount = useMemo(() => {
    let count = 0;
    if (disappointment) count++;
    if (who.value.trim()) count++;
    if (benefit.value.trim()) count++;
    if (rating > 0) count++;
    if (stuckAreas.length > 0) count++;
    if (valuable.value.trim()) count++;
    if (brutal.value.trim()) count++;
    return count;
  }, [disappointment, who.value, benefit.value, rating, stuckAreas, valuable.value, brutal.value]);

  const handleShareAnswers = async () => {
    if (answeredCount === 0) return;
    try {
      const payload: Record<string, string> = {};
      if (disappointment) payload.disappointment = disappointment;
      if (who.value.trim()) payload.who = who.value;
      if (benefit.value.trim()) payload.benefit = benefit.value;
      if (rating > 0) payload.rating = String(rating);
      if (stuckAreas.length > 0) payload.friction = stuckAreas.join(", ");
      if (valuable.value.trim()) payload.valuable = valuable.value;
      if (brutal.value.trim()) payload.brutal = brutal.value;
      if (referral.trim()) payload.referral = referral;

      const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(payload));
      const url = `${window.location.origin}/feedback?answers=${compressed}`;

      try {
        await navigator.clipboard.writeText(url);
        setCopyAnswersMsg("Link copied — share it with the team.");
        setFallbackUrl("");
      } catch {
        setFallbackUrl(url);
        setCopyAnswersMsg("Copy this link and share it with the team:");
      }

      const ts = new Date().toISOString();
      localStorage.setItem(KEYS.submittedAt, ts);
      setSubmittedAt(ts);
      setTimeout(() => setCopyAnswersMsg(""), 5000);
    } catch (err) {
      console.error("Share error:", err);
      setCopyAnswersMsg("Something went wrong. Please try again.");
      setTimeout(() => setCopyAnswersMsg(""), 3000);
    }
  };

  const handleShareForm = async () => {
    const url = `${window.location.origin}/feedback`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // fallback
    }
    setCopyFormMsg(true);
    setTimeout(() => setCopyFormMsg(false), 3000);
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

          {/* Share blank form link */}
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleShareForm}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors"
            >
              <ClipboardCopy className="h-3.5 w-3.5" />
              Share this form with others →{" "}
              <span className="underline underline-offset-2">Copy link</span>
            </button>
            <span
              className={cn(
                "text-xs font-medium text-accent transition-opacity duration-300",
                copyFormMsg ? "opacity-100" : "opacity-0",
              )}
            >
              Form link copied — share it with anyone.
            </span>
          </div>

          {answeredCount > 0 && (
            <div className="mt-2 flex items-center gap-1.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-colors duration-200"
                  style={{
                    width: 6,
                    height: 6,
                    background: i < answeredCount ? "hsl(var(--accent))" : "hsl(var(--muted-foreground) / 0.15)",
                  }}
                />
              ))}
              <span className="ml-1 font-mono text-xs text-muted-foreground/35">
                {answeredCount} of 7
              </span>
            </div>
          )}
        </div>

        {/* Section A */}
        <section className="space-y-8">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-muted-foreground">
            About Infracodebase University
          </p>

          {/* Q1 — Disappointment */}
          <div className="space-y-3">
            <label htmlFor="disappointment-group" className="text-sm font-semibold text-foreground">
              How would you feel if you could no longer use Infracodebase University?
            </label>
            <RadioGroup id="disappointment-group" aria-label="How would you feel if you could no longer use Infracodebase University?" value={disappointment} onValueChange={handleDisappointment} className="space-y-2">
              {[
                { value: "very", label: "Very disappointed" },
                { value: "somewhat", label: "Somewhat disappointed" },
                { value: "not", label: "Not disappointed" },
              ].map((opt) => (
                <div key={opt.value} className="flex items-center gap-2.5">
                  <RadioGroupItem value={opt.value} id={`dis-${opt.value}`} />
                  <Label htmlFor={`dis-${opt.value}`} className="text-sm text-foreground/90 cursor-pointer">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Q2 — Who */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="feedback-who" className="text-sm font-semibold text-foreground">
                What type of person would benefit most from this?
              </label>
              <SavedBadge visible={who.saved} />
            </div>
            <p className="text-xs text-muted-foreground">
              Think about a colleague or someone in your network.
            </p>
            <Textarea
              id="feedback-who"
              value={who.value}
              onChange={(e) => who.update(e.target.value)}
              className="min-h-[100px] bg-muted/30 border-border/50 font-mono text-sm resize-y"
            />
          </div>

          {/* Q3 — Benefit */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="feedback-benefit" className="text-sm font-semibold text-foreground">
                What is the main benefit you get from Infracodebase University?
              </label>
              <SavedBadge visible={benefit.saved} />
            </div>
            <p className="text-xs text-muted-foreground">
              What would you lose if it disappeared tomorrow?
            </p>
            <Textarea
              id="feedback-benefit"
              value={benefit.value}
              onChange={(e) => benefit.update(e.target.value)}
              className="min-h-[100px] bg-muted/30 border-border/50 font-mono text-sm resize-y"
            />
          </div>
        </section>

        {/* Section B */}
        <section className="space-y-8">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-muted-foreground">
            Your experience so far
          </p>

          {/* Q4 — Rating */}
          <div className="space-y-3">
            <label id="rating-label" className="text-sm font-semibold text-foreground">
              How would you rate your experience so far?
            </label>
            <div className="flex items-center gap-1.5" role="group" aria-labelledby="rating-label">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => handleRating(n)}
                  onMouseEnter={() => setHoveredStar(n)}
                  onMouseLeave={() => setHoveredStar(0)}
                  aria-label={`Rate ${n} out of 5 stars`}
                  aria-pressed={n <= rating}
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
          </div>

          {/* Q5 — Friction */}
          <div className="space-y-2">
            <label id="friction-label" className="text-sm font-semibold text-foreground">
              Where did you get stuck or confused?
            </label>
            <p className="text-xs text-muted-foreground">
              Select all areas where you experienced friction.
            </p>
            <div className="flex flex-wrap gap-2 mt-2" role="group" aria-labelledby="friction-label">
              {FRICTION_AREAS_LIST.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() =>
                    setStuckAreas((prev) =>
                      prev.includes(area)
                        ? prev.filter((a) => a !== area)
                        : [...prev, area]
                    )
                  }
                  className="font-mono text-xs px-3 py-1.5 rounded-full border transition-all duration-150 cursor-pointer"
                  aria-label={`${stuckAreas.includes(area) ? "Deselect" : "Select"} ${area}`}
                  aria-pressed={stuckAreas.includes(area)}
                  style={{
                    borderColor: stuckAreas.includes(area)
                      ? "hsl(var(--accent) / 0.5)"
                      : "hsl(var(--muted-foreground) / 0.15)",
                    background: stuckAreas.includes(area)
                      ? "hsl(var(--accent) / 0.1)"
                      : "transparent",
                    color: stuckAreas.includes(area)
                      ? "hsl(var(--accent))"
                      : "hsl(var(--muted-foreground) / 0.5)",
                  }}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Q6 — Valuable */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="feedback-valuable" className="text-sm font-semibold text-foreground">
                What did you find most valuable?
              </label>
              <SavedBadge visible={valuable.saved} />
            </div>
            <p className="text-xs text-muted-foreground">
              What would you miss most if it was removed?
            </p>
            <Textarea
              id="feedback-valuable"
              value={valuable.value}
              onChange={(e) => valuable.update(e.target.value)}
              className="min-h-[100px] bg-muted/30 border-border/50 font-mono text-sm resize-y"
            />
          </div>

          {/* Q7 — Brutal */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="feedback-brutal" className="text-sm font-semibold text-foreground">
                Anything else? Be as direct as you want.
              </label>
              <SavedBadge visible={brutal.saved} />
            </div>
            <p className="text-xs text-muted-foreground">
              No filter needed. If something feels off, say it.
            </p>
            <Textarea
              id="feedback-brutal"
              value={brutal.value}
              onChange={(e) => brutal.update(e.target.value)}
              className="min-h-[160px] bg-muted/30 border-border/50 font-mono text-sm resize-y"
              placeholder="Say what you really think..."
            />
          </div>

          {/* Q8 — Referral */}
          <div className="space-y-2 mt-8">
            <label htmlFor="feedback-referral" className="text-sm font-semibold text-foreground" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Who would you most want to send this to?
            </label>
            <p className="text-xs font-mono text-muted-foreground/40">
              A colleague, a friend, someone in your team — just a name or role is fine.
            </p>
            <textarea
              id="feedback-referral"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              placeholder="e.g. My DevOps colleague who keeps asking me about Terraform..."
              rows={3}
              aria-label="Who would you most want to send this to?"
              className="w-full rounded-lg border border-border/30 bg-muted/10 px-3.5 py-3 font-mono text-sm text-foreground resize-y outline-none focus:border-accent/30 transition-colors"
            />
          </div>
        </section>

        {/* Share answers */}
        <div className="pt-2 space-y-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-block">
                  <Button
                    onClick={handleShareAnswers}
                    disabled={answeredCount === 0}
                    className="px-8 gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    {hasSubmitted ? "Update shared link" : "Share my answers"}
                  </Button>
                </span>
              </TooltipTrigger>
              {answeredCount === 0 && (
                <TooltipContent>
                  <p>Fill in at least one field to share your answers</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          {copyAnswersMsg && (
            <div className="text-xs font-medium text-accent">
              {copyAnswersMsg}
            </div>
          )}
          {fallbackUrl && (
            <input
              readOnly
              value={fallbackUrl}
              onFocus={(e) => e.target.select()}
              aria-label="Shareable feedback link"
              className="w-full rounded-md border border-border/50 bg-muted/30 px-3 py-2 text-xs font-mono text-foreground"
            />
          )}
          {hasSubmitted && !copyAnswersMsg && (
            <div>
              <p className="text-xs text-accent font-medium">
                Thanks — your feedback has been noted.
              </p>
              <div style={{
                marginTop: 24,
                padding: "20px 24px",
                background: "rgba(232,96,48,0.06)",
                border: "0.5px solid rgba(232,96,48,0.25)",
                borderRadius: 10,
              }}>
                <p style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 6,
                }}>
                  ✓ Your feedback has been saved.
                </p>
                <p style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}>
                  One last step — send your link to Tarak so we can read it.
                  We read every submission personally.
                </p>
                <button
                  aria-label="Copy my feedback link to clipboard"
                  onClick={() => {
                    const url = window.location.href;
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                      navigator.clipboard.writeText(url).catch(() => {});
                    } else {
                      const ta = document.createElement("textarea");
                      ta.value = url;
                      ta.style.position = "fixed";
                      ta.style.opacity = "0";
                      document.body.appendChild(ta);
                      ta.focus();
                      ta.select();
                      try { document.execCommand("copy"); } catch(e) {}
                      document.body.removeChild(ta);
                    }
                  }}
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "11px 24px",
                    borderRadius: 6,
                    background: "#e86030",
                    color: "#1a1a1a",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  📋 Copy my feedback link
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default FeedbackPage;
