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

const trackNumberMap: Record<string, number | string> = {
  "prereq-1-hands-on": "Prereq 1",
  "prereq-2-hands-on": "Prereq 2",
  "prereq-3-hands-on": "Prereq 3",
  "track-2-hands-on": 2,
  "track-3-hands-on": 3,
  "track-4-hands-on": 4,
  "track-5-hands-on": 5,
  "track-6-hands-on": 6,
};

const prereqTracks = handsOnTracks.filter(t => t.id.startsWith("prereq-"));
const curriculumTracks = handsOnTracks.filter(t => !t.id.startsWith("prereq-"));

// Ordered curriculum tracks
const orderedCurriculumTracks = [
  curriculumTracks.find(t => t.id === "track-2-hands-on"),
  curriculumTracks.find(t => t.id === "track-3-hands-on"),
  curriculumTracks.find(t => t.id === "track-4-hands-on"),
  curriculumTracks.find(t => t.id === "track-5-hands-on"),
  curriculumTracks.find(t => t.id === "track-6-hands-on"),
].filter(Boolean) as typeof handsOnTracks;

const featuredTrack = prereqTracks[0] || orderedCurriculumTracks[0];

function getLevelColor(level: string) {
  switch (level) {
    case "Beginner": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "Intermediate": return "bg-sky-500/15 text-sky-400 border-sky-500/30";
    case "Advanced": return "bg-purple-500/15 text-purple-400 border-purple-500/30";
    default: return "bg-muted text-muted-foreground";
  }
}

function TrackCard({ track }: { track: typeof handsOnTracks[number] }) {
  const label = trackNumberMap[track.id];
  return (
    <Link
      key={track.id}
      to={`/hands-on/${track.id}`}
      className="group rounded-xl p-6 transition-all hover:shadow-md"
      style={{ background: '#141f2e', border: '1px solid #1e3a5f' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-mono text-muted-foreground tracking-wider">
          {typeof label === "number" ? `Track ${label}` : label}
        </span>
        <span className="text-muted-foreground/30">·</span>
        <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${getLevelColor(track.level)}`}>
          {track.level}
        </span>
      </div>
      <h3 className="font-bold text-base mb-2" style={{ color: '#f8fafc' }}>{track.title}</h3>
      <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: '#94a3b8' }}>
        {track.description}
      </p>
      <div className="flex items-center justify-between text-[11px]" style={{ color: '#64748b' }}>
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
            className="h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-bold"
            style={{ background: '#1e3a5f', color: '#7dd3fc', border: '1px solid #2a5080' }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: track.color }}>
        Start learning <ArrowRight className="h-3 w-3" />
      </div>
    </Link>
  );
}

const HandsOnExercises = () => {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-6 py-10 lg:py-14">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">Hands-On Training</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Build your skills through learning paths designed for every experience level. Each track builds on the previous one.
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
               <span className="text-[10px] font-mono text-muted-foreground tracking-wider">
                 {trackNumberMap[featuredTrack.id]}
               </span>
               <span className="text-muted-foreground/30">·</span>
               <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${getLevelColor(featuredTrack.level)}`}>
                 {featuredTrack.level}
               </span>
             </div>
             <span
               className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full inline-block mb-2"
               style={{ color: '#94a3b8', border: '1px solid #94a3b8', background: 'transparent' }}
             >
               Your Learning Path
             </span>
            <h2 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {featuredTrack.title}
            </h2>
             <p className="text-sm mb-5 max-w-xl" style={{ color: '#94a3b8' }}>
              {featuredTrack.description}
            </p>
             <div className="flex items-center gap-6 text-xs mb-6" style={{ color: '#64748b' }}>
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
                    className="h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{ background: '#1e3a5f', color: '#7dd3fc', border: '1px solid #2a5080' }}
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
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 text-center">How You Will Learn</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {methodSteps.map((step, i) => (
              <div
                key={step.label}
                className="rounded-xl p-4 text-center"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-themed)' }}
              >
                <div className="text-[10px] font-mono mb-1" style={{ color: 'var(--text-muted)' }}>Step {i + 1}</div>
                <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{step.label}</div>
                <div className="text-[11px] leading-snug" style={{ color: 'var(--text-secondary)' }}>{step.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Prerequisite Tracks */}
        {prereqTracks.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Cloud & Infrastructure Prerequisites</span>
              <div className="flex-1 h-px bg-border/50" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-10">
              {prereqTracks.map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          </>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Infracodebase Hands-On Training — begin after completing prerequisites</span>
          <div className="flex-1 h-px bg-border/50" />
        </div>

        {/* Curriculum Tracks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {orderedCurriculumTracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default HandsOnExercises;
