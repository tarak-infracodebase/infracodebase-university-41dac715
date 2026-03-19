import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { getHandsOnTrack } from "@/data/handsOnData";
import { ArrowLeft, ArrowRight, BookOpen, Clock, CheckCircle2 } from "lucide-react";

const HandsOnTrack = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const track = getHandsOnTrack(trackId || "");

  if (!track) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Track Not Found</h1>
            <Link to="/hands-on" className="text-primary hover:underline text-sm">← Back to Hands-On Exercises</Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-6 py-10 lg:py-14">
        <Link to="/hands-on" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-3 w-3" /> All Exercises
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div
            className="h-1.5 w-14 rounded-full mb-4"
            style={{ background: track.color }}
          />
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Track {track.trackNumber}
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">{track.title}</h1>
          <p className="text-muted-foreground text-sm max-w-xl">{track.description}</p>
          <div className="flex items-center gap-6 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              {track.moduleCount} Modules
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              ~{track.estimatedHours} Hours
            </span>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          {track.modules.map((mod, i) => (
            <Link
              key={mod.id}
              to={`/hands-on/${track.id}/${mod.id}`}
              className="group block rounded-xl border border-border/50 bg-card/30 hover:bg-card/60 p-6 transition-all hover:shadow-md hover:border-border"
            >
              <div className="flex items-start gap-5">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 mt-0.5"
                  style={{ background: track.accentColor, color: track.color }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Module {i + 1} / {track.moduleCount}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base mb-2 group-hover:text-foreground transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {mod.sections.whyThisMatters.split('\n')[0]}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-[11px] text-muted-foreground">
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
