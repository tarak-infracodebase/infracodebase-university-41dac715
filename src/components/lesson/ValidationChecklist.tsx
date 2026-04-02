import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthGate } from "@/hooks/useAuthGate";
import AuthGateModal from "@/components/AuthGateModal";

interface ValidationChecklistProps {
  items: string[];
  lessonId: string;
  onAllChecked?: (allChecked: boolean) => void;
  compact?: boolean;
}

const ValidationChecklist = ({ items, lessonId, onAllChecked }: ValidationChecklistProps) => {
  const storageKey = `icbu_checklist_${lessonId}`;
  const { requireAuth, showGate, dismissGate } = useAuthGate();

  const [checked, setChecked] = useState<boolean[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === items.length) return parsed;
      }
    } catch {}
    return new Array(items.length).fill(false);
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checked));
    onAllChecked?.(checked.every(Boolean));
  }, [checked, storageKey, onAllChecked]);

  const toggle = (index: number) => {
    if (!requireAuth()) return;
    setChecked(prev => prev.map((v, i) => (i === index ? !v : v)));
  };

  const allDone = checked.every(Boolean);
  const doneCount = checked.filter(Boolean).length;

  return (
    <section className="mb-8">
      <AuthGateModal open={showGate} onOpenChange={dismissGate} />
      <div className="flex items-center gap-2 mb-1">
        <CheckCircle2 className="h-4 w-4 text-[hsl(var(--crystal-green))]" style={{ color: "hsl(145, 60%, 45%)" }} />
        <h2 className="text-base font-bold">Validation Checklist</h2>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Work through the lesson content first, then check each item as you feel confident. If you can't tick something yet, that's your signal to revisit that part of the lesson.
      </p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <label
            key={i}
            className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer rounded-lg p-2 -mx-2 hover:bg-muted/30 transition-colors"
          >
            <Checkbox
              checked={checked[i]}
              onCheckedChange={() => toggle(i)}
              className="mt-0.5 shrink-0"
            />
            <span className={checked[i] ? "text-foreground line-through opacity-60" : ""}>{item}</span>
          </label>
        ))}
      </div>
      <div className="mt-3 text-xs text-muted-foreground font-mono">
        {doneCount} / {items.length} complete
        {allDone && <span className="ml-2 text-[hsl(145,60%,45%)]">✓ All done</span>}
      </div>
    </section>
  );
};

export default ValidationChecklist;
