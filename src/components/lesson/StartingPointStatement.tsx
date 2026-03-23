import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useAuthGate } from "@/hooks/useAuthGate";
import AuthGateModal from "@/components/AuthGateModal";

interface StartingPointStatementProps {
  lessonId: string;
}

const StartingPointStatement = ({ lessonId }: StartingPointStatementProps) => {
  const storageKey = `icbu_artifact_${lessonId}`;
  const { requireAuth, showGate, dismissGate } = useAuthGate();

  const [value, setValue] = useState(() => {
    try {
      return localStorage.getItem(storageKey) || "";
    } catch {
      return "";
    }
  });

  const save = useCallback((text: string) => {
    try {
      localStorage.setItem(storageKey, text);
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    const timeout = setTimeout(() => save(value), 400);
    return () => clearTimeout(timeout);
  }, [value, save]);

  return (
    <div className="rounded-xl border border-border/30 bg-card/30 p-5 mt-3">
      <AuthGateModal open={showGate} onOpenChange={dismissGate} />
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        Before you begin, write two sentences below — your current experience level, and what you want to get out of this track. This is saved for you and helps you reflect on your progress later.
      </p>
      <Textarea
        value={value}
        onChange={e => {
          if (!requireAuth()) return;
          setValue(e.target.value);
        }}
        placeholder="e.g. I have basic experience with AWS EC2 and S3. I want to understand networking and infrastructure as code well enough to design systems confidently."
        className="min-h-[100px] bg-background/50 border-border/50 text-sm resize-y"
      />
      <p className="text-[11px] text-muted-foreground/60 mt-2">
        Your response is saved automatically and only visible to you.
      </p>
    </div>
  );
};

export default StartingPointStatement;
