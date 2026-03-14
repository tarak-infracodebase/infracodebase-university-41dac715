import { useState } from "react";
import { X, Upload, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

const feedbackTypes = ["Bug Report", "Feature Request", "Content Issue", "General Feedback", "Platform Suggestion"];

export function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(feedbackTypes[0]);
  const [comment, setComment] = useState("");
  const [loomLink, setLoomLink] = useState("");
  const [troubleshoot, setTroubleshoot] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); onClose(); }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg glass-panel rounded-2xl p-6 shadow-glow">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        
        <h2 className="text-xl font-bold mb-1">Send Feedback</h2>
        <p className="text-sm text-muted-foreground mb-6">Help us improve Infracodebase University</p>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="text-4xl mb-3">💎</div>
            <p className="text-lg font-semibold">Thank you!</p>
            <p className="text-sm text-muted-foreground">Your feedback has been submitted.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} required
                  className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" placeholder="Your name" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" placeholder="you@email.com" />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Type</label>
              <select value={type} onChange={e => setType(e.target.value)}
                className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50">
                {feedbackTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Comment</label>
              <textarea value={comment} onChange={e => setComment(e.target.value)} required rows={4}
                className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none" placeholder="Describe your feedback..." />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Loom Link (optional)</label>
              <input value={loomLink} onChange={e => setLoomLink(e.target.value)}
                className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" placeholder="https://loom.com/..." />
            </div>
            <div className="flex items-center gap-3">
              <button type="button" className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
                <Upload className="h-3.5 w-3.5" /> Attach Evidence
              </button>
            </div>
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={troubleshoot} onChange={e => setTroubleshoot(e.target.checked)} className="rounded border-border" />
              Grant temporary troubleshooting access
            </label>
            <button type="submit" className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <Send className="h-4 w-4" /> Send Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
