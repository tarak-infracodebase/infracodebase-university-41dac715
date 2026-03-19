import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { handsOnTracks } from "@/data/handsOnData";
import { ArrowRight, BookOpen, Clock, Layers } from "lucide-react";

const methodSteps = [
  { label: "Observe", description: "Review the system before changing anything" },
  { label: "Identify", description: "Find what is missing or inconsistent" },
  { label: "Hypothesize", description: "Explain why the system behaves this way" },
  { label: "Apply", description: "Make one targeted improvement" },
  { label: "Compare", description: "Analyze what changed and why" },
  { label: "Iterate", description: "Refine until the system matches your intent" },
];

const featuredTrack = handsOnTracks[handsOnTracks.length - 1];
const otherTracks = handsOnTracks.filter(t => t.id !== featuredTrack.id);

const HandsOnExercises = () => {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-6 py-10 lg:py-14">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">Hands-On Exercises</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Practice infrastructure engineering through structured exercises. Each track builds on the previous one. Work through modules, produce artifacts, and validate your understanding.
          </p>
        </div>

        {/* Featured Track */}
        <Link
          to={`/hands-on/${featuredTrack.id}`}
          className="block mb-10 group"
        >
          <div
            className="rounded-2xl border-2 p-8 lg:p-10 transition-all hover:shadow-lg"
            style={{
              borderColor: featuredTrack.color,
              background: `linear-gradient(135deg, ${featuredTrack.accentColor}08, ${featuredTrack.accentColor}15)`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: featuredTrack.accentColor, color: featuredTrack.color }}
              >
                Your Learning Path
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: featuredTrack.color }}>
              {featuredTrack.title}
            </h2>
            <p className="text-muted-foreground text-sm mb-5 max-w-xl">
              {featuredTrack.description}
            </p>
            <div className="flex items-center gap-6 text-xs text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" />
                Module 1 / {featuredTrack.moduleCount} — {featuredTrack.modules[0]?.title}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-1.5">
                {featuredTrack.modules.map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-6 rounded-full border-2 border-background flex items-center justify-center text-[9px] font-bold"
                    style={{ background: featuredTrack.accentColor, color: featuredTrack.color }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <span className="ml-auto flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all" style={{ color: featuredTrack.color }}>
                Continue learning <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>

        {/* How You Will Learn */}
        <div className="mb-12">
          <h2 className="text-lg font-bold mb-5 text-center">How You Will Learn</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {methodSteps.map((step, i) => (
              <div
                key={step.label}
                className="rounded-xl border border-border/50 bg-card/50 p-4 text-center"
              >
                <div className="text-[10px] font-mono text-muted-foreground mb-1">Step {i + 1}</div>
                <div className="text-sm font-semibold mb-1">{step.label}</div>
                <div className="text-[11px] text-muted-foreground leading-snug">{step.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* More Learning Paths */}
        <h2 className="text-lg font-bold mb-5 text-center">More learning paths</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherTracks.map((track) => (
            <Link
              key={track.id}
              to={`/hands-on/${track.id}`}
              className="group rounded-xl border border-border/50 bg-card/30 hover:bg-card/60 p-6 transition-all hover:shadow-md hover:border-border"
            >
              <div
                className="h-2 w-10 rounded-full mb-4"
                style={{ background: track.color }}
              />
              <h3 className="font-bold text-base mb-2">{track.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                {track.description}
              </p>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {track.moduleCount} Modules
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {track.estimatedHours} Hours
                </span>
              </div>
              <div className="flex -space-x-1 mt-4">
                {track.modules.map((_, i) => (
                  <div
                    key={i}
                    className="h-5 w-5 rounded-full border-2 border-background flex items-center justify-center text-[8px] font-bold"
                    style={{ background: track.accentColor, color: track.color }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: track.color }}>
                Start learning <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default HandsOnExercises;
