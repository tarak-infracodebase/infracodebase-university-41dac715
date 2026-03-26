import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { getHandsOnTrack } from "@/data/handsOnData";
import { ArrowLeft, ArrowRight, BookOpen, Clock, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ProgressBar } from "@/components/ProgressBar";

function getLevelColor(level: string) {
  switch (level) {
    case "Beginner": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "Intermediate": return "bg-sky-500/15 text-sky-400 border-sky-500/30";
    case "Advanced": return "bg-purple-500/15 text-purple-400 border-purple-500/30";
    default: return "bg-muted text-muted-foreground";
  }
}

const HandsOnTrack = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const track = getHandsOnTrack(trackId || "");

  if (!track) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Track Not Found</h1>
            <Link to="/hands-on" className="text-primary hover:underline text-sm">Back to Hands-On Training</Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  const progressSteps = track.modules.map(m => ({ id: m.id, label: m.title.length > 8 ? m.title.slice(0, 8) + "…" : m.title }));

  return (
    <AppLayout>
      <ProgressBar
        title={track.title}
        steps={progressSteps}
        currentStepIndex={0}
        completedCount={0}
      />
      <div className="max-w-5xl mx-auto px-6 py-10 lg:py-14">
        <Link to="/hands-on" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-3 w-3" /> All Hands-On Training
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div
            className="h-1.5 w-14 rounded-full mb-4"
            style={{ background: track.color }}
          />
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${getLevelColor(track.level)}`}>
              {track.level}
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{track.title}</h1>
          <p className="text-sm max-w-xl" style={{ color: 'var(--text-secondary)' }}>{track.description}</p>
          <div className="flex items-center gap-6 mt-4 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              {track.moduleCount} Modules
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              ~{track.estimatedHours} Hours
            </span>
          </div>
          {/* Progress */}
          <div className="flex items-center gap-3 mt-4">
            <Progress value={0} className="h-2 flex-1 max-w-[300px] bg-muted" />
            <span className="text-xs font-mono text-muted-foreground">0 / {track.moduleCount} Modules</span>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          {track.modules.map((mod, i) => (
            <Link
              key={mod.id}
              to={`/hands-on/${track.id}/${mod.id}`}
              className="group block rounded-xl p-6 transition-all hover:shadow-md"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-themed)' }}
            >
              <div className="flex items-start gap-5">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 mt-0.5"
                  style={{ background: 'var(--border-themed)', color: 'var(--text-link)', border: '1px solid var(--border-themed)' }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                      Module {i + 1} / {track.moduleCount}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base mb-2 transition-colors" style={{ color: 'var(--text-primary)' }}>
                    {mod.title}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    {mod.sections.whyThisMatters.split('\n')[0]}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {mod.sections.validationChecklist.length} Checkpoints
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default HandsOnTrack;
