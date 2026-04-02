import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuthGate } from "@/hooks/useAuthGate";
import AuthGateModal from "@/components/AuthGateModal";

interface ReflectionNotebookProps {
  lessonId: string;
}

export function ReflectionNotebook({ lessonId }: ReflectionNotebookProps) {
  const storageKey = `reflection_${lessonId}`;
  const { requireAuth, showGate, dismissGate } = useAuthGate();
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setText(stored);
    } catch {}
  }, [storageKey]);

  const handleSave = useCallback(() => {
    if (!requireAuth()) return;
    try {
      localStorage.setItem(storageKey, text);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {}
  }, [storageKey, text, requireAuth]);

  return (
    <div className="mt-4">
      <AuthGateModal open={showGate} onOpenChange={dismissGate} />
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground/50 mb-2">
        Your answer
      </p>
      <Textarea
        value={text}
        onChange={e => {
          if (!requireAuth()) return;
          setText(e.target.value);
        }}
        placeholder="Write your answer here..."
        rows={5}
        className="bg-background/50 border-border/50 font-mono text-sm resize-y"
      />
      <div className="flex items-center justify-end gap-2.5 mt-2">
        {saved && (
          <span className="font-mono text-xs text-[hsl(145,60%,45%)]">✓ Saved</span>
        )}
        <Button onClick={handleSave} size="sm" variant="outline" className="text-xs font-mono">
          Save Answer
        </Button>
      </div>
    </div>
  );
}
