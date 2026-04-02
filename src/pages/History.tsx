import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle2, PlayCircle, Loader2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProgressHistory, LessonHistoryEntry } from "@/hooks/useProgressHistory";
import { AppLayout } from "@/components/AppLayout";
import { toast } from "@/hooks/use-toast";

// ── helpers ───────────────────────────────────────────────────────────────────

function relativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(isoString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

const PROVIDER_COLORS: Record<string, string> = {
  azure: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  aws: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  gcp: "bg-red-500/10 text-red-400 border-red-500/20",
  k8s: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  terraform: "bg-green-500/10 text-green-400 border-green-500/20",
  general: "bg-muted text-muted-foreground border-border",
};

const PROVIDER_LABELS: Record<string, string> = {
  azure: "Azure",
  aws: "AWS",
  gcp: "GCP",
  k8s: "Kubernetes",
  terraform: "Terraform",
  general: "General",
};

// ── sub-components ────────────────────────────────────────────────────────────

interface LessonRowProps {
  entry: LessonHistoryEntry;
  actionLabel: string;
}

function LessonRow({ entry, actionLabel }: LessonRowProps) {
  const navigate = useNavigate();
  const pct =
    entry.totalLessons > 0
      ? Math.round((entry.completedLessons / entry.totalLessons) * 100)
      : 0;
  const providerKey = entry.cloudProvider ?? "general";
  const providerColor = PROVIDER_COLORS[providerKey] ?? PROVIDER_COLORS.general;
  const providerLabel = PROVIDER_LABELS[providerKey] ?? "General";

  return (
    <div className="flex items-center gap-4 px-5 py-4 bg-card border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
      <span
        className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded border ${providerColor}`}
      >
        {providerLabel}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {entry.lessonTitle}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {entry.moduleTitle} · {entry.completedLessons} of {entry.totalLessons}{" "}
          lessons
        </p>
      </div>

      {entry.status === "in_progress" && (
        <div className="flex items-center gap-2 shrink-0">
          <Progress value={pct} className="w-20 h-1.5" />
          <span className="text-xs text-muted-foreground w-7 text-right">{pct}%</span>
        </div>
      )}

      {entry.status !== "in_progress" && (
        <span className="text-xs text-muted-foreground shrink-0">
          {relativeTime(entry.lastAccessedAt)}
        </span>
      )}

      <Button
        size="sm"
        variant="outline"
        className="shrink-0 h-7 text-xs px-3"
        onClick={() => navigate(entry.coursePath)}
      >
        {actionLabel}
      </Button>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  message,
}: {
  icon: React.ElementType;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Icon className="w-8 h-8 text-muted-foreground/40 mb-3" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

// ── page ──────────────────────────────────────────────────────────────────────

export default function History() {
  const { isLoaded, getInProgress, getRecentlyVisited, getCompleted } =
    useProgressHistory();

  const inProgress = getInProgress();
  const recent = getRecentlyVisited();
  const completed = getCompleted();

  if (!isLoaded) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground">History</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Pick up where you left off
          </p>
        </div>

        <Tabs defaultValue="in_progress">
          <TabsList className="mb-5">
            <TabsTrigger value="in_progress" className="flex items-center gap-1.5">
              <PlayCircle className="w-3.5 h-3.5" />
              In progress
              {inProgress.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 h-4 text-[10px] px-1.5"
                >
                  {inProgress.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Recently visited
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completed
              {completed.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 h-4 text-[10px] px-1.5"
                >
                  {completed.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="in_progress">
            <div className="rounded-xl border border-border overflow-hidden">
              {inProgress.length === 0 ? (
                <EmptyState
                  icon={PlayCircle}
                  message="No lessons in progress. Start a module to see it here."
                />
              ) : (
                inProgress.map((entry) => (
                  <LessonRow
                    key={entry.lessonId}
                    entry={entry}
                    actionLabel="Resume"
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="rounded-xl border border-border overflow-hidden">
              {recent.length === 0 ? (
                <EmptyState
                  icon={Clock}
                  message="No recent activity yet. Start learning to build your history."
                />
              ) : (
                recent.map((entry) => (
                  <LessonRow
                    key={entry.lessonId}
                    entry={entry}
                    actionLabel="Open"
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="rounded-xl border border-border overflow-hidden">
              {completed.length === 0 ? (
                <EmptyState
                  icon={CheckCircle2}
                  message="Nothing completed yet — you're on your way."
                />
              ) : (
                completed.map((entry) => (
                  <LessonRow
                    key={entry.lessonId}
                    entry={entry}
                    actionLabel="Review"
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
