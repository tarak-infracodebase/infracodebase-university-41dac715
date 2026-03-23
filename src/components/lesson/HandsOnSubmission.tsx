import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface HandsOnSubmissionProps {
  exerciseId: string;
}

const HandsOnSubmission = ({ exerciseId }: HandsOnSubmissionProps) => {
  const storageKey = `icbu_submission_${exerciseId}`;

  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const data = localStorage.getItem(storageKey);
      if (data) {
        const parsed = JSON.parse(data);
        setUrl(parsed.url || "");
        setDescription(parsed.description || "");
      }
    } catch {}
  }, [storageKey]);

  const handleSave = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ url, description }));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {}
  };

  return (
    <div className="mt-5 rounded-xl border border-border/30 bg-card/30 p-5">
      <h4 className="text-sm font-semibold mb-1">Submit Your Work</h4>
      <p className="text-xs text-muted-foreground mb-4">
        Paste a link to your repo, workspace, or screenshot — or describe what you built. This is for your own record.
      </p>
      <div className="space-y-3">
        <Input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Link to repo, workspace, or screenshot"
          className="bg-background/50 border-border/50 text-sm"
        />
        <Textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe what you built (optional)"
          className="min-h-[80px] bg-background/50 border-border/50 text-sm resize-y"
        />
        <div className="flex items-center gap-3">
          <Button onClick={handleSave} size="sm" variant="outline" className="text-xs">
            Save
          </Button>
          {saved && (
            <span className="text-xs text-[hsl(145,60%,45%)] font-medium animate-in fade-in">
              Saved ✓
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HandsOnSubmission;
