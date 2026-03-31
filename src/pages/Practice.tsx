import { useState, useCallback, Component, ReactNode } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useChallenge } from "@/hooks/useChallenge";
import { MILESTONE_DAYS } from "@/data/milestones";
import { ActiveChallengeCard } from "@/components/practice/ActiveChallengeCard";
import { StatsGrid } from "@/components/practice/StatsGrid";
import { TaskList } from "@/components/practice/TaskList";
import { LockedAdvancedCard } from "@/components/practice/LockedAdvancedCard";
import { MilestoneBadgeModal } from "@/components/practice/MilestoneBadgeModal";

class PracticeErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: string }
> {
  state = { hasError: false, error: "" };
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-red-400 space-y-2">
          <p className="font-bold text-lg">Practice page error</p>
          <p className="text-sm font-mono bg-red-950/30 p-4 rounded">{this.state.error}</p>
          <p className="text-xs text-muted-foreground">Check the browser console for the full stack trace.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const PracticePage = () => {
  const { progress, completeDay } = useChallenge();
  const completedCount = progress.completedDays.length;
  const [modalDay, setModalDay] = useState<number | null>(null);

  const handleComplete = useCallback(
    (day: number) => {
      completeDay(day);
      // Fire badge modal if it's a milestone day
      if ((MILESTONE_DAYS as readonly number[]).includes(day)) {
        setModalDay(day);
      }
    },
    [completeDay]
  );

  const handleMilestoneShare = useCallback((day: number) => {
    setModalDay(day);
  }, []);

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        {/* Page header */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-foreground">Your Active Practice</h1>
          <span className="text-sm text-muted-foreground/50 font-medium cursor-default">
            Completed
          </span>
        </div>

        {/* Active challenge card */}
        <ActiveChallengeCard completedCount={completedCount} />

        {/* Stats grid */}
        <StatsGrid completedCount={completedCount} />

        {/* Task list */}
        <TaskList
          completedDays={progress.completedDays}
          onComplete={handleComplete}
          onMilestoneShare={handleMilestoneShare}
        />

        {/* Locked 75-day card */}
        <LockedAdvancedCard unlocked={completedCount >= 30} />

        {/* Badge modal — inline, no portal */}
        <MilestoneBadgeModal day={modalDay} onClose={() => setModalDay(null)} />
      </div>
    </AppLayout>
  );
};

export default PracticePage;
