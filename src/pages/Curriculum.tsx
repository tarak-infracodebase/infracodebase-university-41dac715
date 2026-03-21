import { AppLayout } from "@/components/AppLayout";
import { learningPaths } from "@/data/courseData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BookOpen, Clock, ArrowRight, Search, HelpCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CrystalIcon } from "@/components/DashboardWidgets";
import { CurriculumGuidanceQuiz } from "@/components/CurriculumGuidanceQuiz";

const BANNER_GRADIENT = "linear-gradient(135deg, #1a1a1a 0%, #c2410c 15%, #d97706 35%, #ca8a04 50%, #16a34a 68%, #0891b2 85%, #1a1a1a 100%)";
const BANNER_DISMISSED_KEY = "curriculum-guidance-dismissed";

const crystalColors = [
  "hsl(260, 70%, 58%)", "hsl(330, 65%, 55%)", "hsl(185, 70%, 48%)",
  "hsl(145, 60%, 45%)", "hsl(45, 85%, 55%)", "hsl(25, 85%, 55%)", "hsl(0, 72%, 55%)"
];

const topics = [
  "Infrastructure Architecture", "Networking & Routing", "Identity & Permissions",
  "Configuration Automation", "Infrastructure Debugging", "Environment Management",
  "Infrastructure Governance", "Architecture Documentation", "Platform Engineering",
  "Infrastructure Operations", "Resilient Infrastructure Design"
];

const topicToPath: Record<string, string[]> = {
  "Infrastructure Architecture": ["real-infrastructure", "advanced-architecture"],
  "Networking & Routing": ["real-infrastructure"],
  "Identity & Permissions": ["real-infrastructure"],
  "Configuration Automation": ["foundations"],
  "Infrastructure Debugging": ["real-infrastructure"],
  "Environment Management": ["real-infrastructure"],
  "Infrastructure Governance": ["enterprise-governance"],
  "Architecture Documentation": ["architecture-diagrams"],
  "Platform Engineering": ["enterprise-governance"],
  "Infrastructure Operations": ["real-infrastructure", "advanced-architecture"],
  "Resilient Infrastructure Design": ["advanced-architecture"],
};

type ViewMode = "paths" | "topics";

const PREREQ_COLOR = "hsl(235, 56%, 34%)";
const PREREQ_TEXT_COLOR = "hsl(235, 56%, 70%)";

function PathCard({ path, colorOverride }: { path: typeof learningPaths[number]; colorOverride?: string }) {
  const totalLessons = path.courses.reduce((t, c) => t + c.lessons.length, 0);
  const isPrereq = path.color === "prerequisite";
  const iconColor = colorOverride || (isPrereq ? PREREQ_COLOR : crystalColors[path.order % crystalColors.length]);

  return (
    <Link key={path.id} to={`/path/${path.id}`}
      className="group glass-panel-hover rounded-xl p-5 flex items-start gap-5 block">
      <div className="shrink-0 mt-1">
        <CrystalIcon color={iconColor} size={32} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {isPrereq ? (
            <>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[hsl(235,56%,34%)]/20 text-[hsl(235,56%,70%)] border border-[hsl(235,56%,34%)]/30">Prerequisite</span>
              <span className="text-[10px] text-muted-foreground/60 font-mono">Complete before Track 1</span>
            </>
          ) : (
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Track {path.order}</span>
          )}
          <span className="text-[10px] px-2 py-0.5 rounded-full crystal-badge text-primary">{path.courses[0]?.difficulty || "beginner"}</span>
        </div>
        <h3 className="text-base font-semibold text-foreground mb-1">{path.title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{path.description}</p>
        <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {totalLessons} lessons</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {path.courses[0]?.estimatedTime || "~2 hrs"}</span>
          <span className="text-crystal-yellow font-mono">+{totalLessons * 50} XP</span>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2" />
    </Link>
  );
}

const Curriculum = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("paths");
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const filteredPaths = learningPaths.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  const prereqPaths = filteredPaths.filter(p => p.color === "prerequisite");
  const curriculumPaths = filteredPaths.filter(p => p.color !== "prerequisite");

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Curriculum</h1>
          <p className="text-sm text-muted-foreground">Browse the complete Infracodebase learning program</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-muted/50 pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              placeholder="Search courses, lessons..." />
          </div>
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button onClick={() => setViewMode("paths")} className={cn("px-4 py-2 text-xs font-medium transition-colors", viewMode === "paths" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
              By Learning Path
            </button>
            <button onClick={() => setViewMode("topics")} className={cn("px-4 py-2 text-xs font-medium transition-colors", viewMode === "topics" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
              By Topic
            </button>
          </div>
        </div>

        {viewMode === "paths" ? (
          <div className="space-y-4">
            {/* Prerequisite Tracks */}
            {prereqPaths.length > 0 && (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[hsl(235,56%,70%)]">Cloud & Infrastructure Prerequisites</span>
                  <div className="flex-1 h-px bg-[hsl(235,56%,34%)]/30" />
                </div>
                {prereqPaths.map(path => (
                  <PathCard key={path.id} path={path} />
                ))}
                {curriculumPaths.length > 0 && (
                  <div className="flex items-center gap-3 mt-8 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Infracodebase Curriculum</span>
                    <div className="flex-1 h-px bg-border/50" />
                  </div>
                )}
              </>
            )}
            {/* Curriculum Tracks */}
            {curriculumPaths.map(path => (
              <PathCard key={path.id} path={path} />
            ))}
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {topics.map(t => (
                <button key={t} onClick={() => setSelectedTopic(selectedTopic === t ? null : t)}
                  className={cn("px-3 py-1.5 rounded-full text-xs transition-colors border",
                    selectedTopic === t 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  )}>
                  {t}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {(selectedTopic ? learningPaths.filter(p => topicToPath[selectedTopic]?.includes(p.id)) : learningPaths).map((path, i) => (
                <Link key={path.id} to={`/path/${path.id}`} className="group glass-panel-hover rounded-xl p-4 flex items-center gap-4 block">
                  <CrystalIcon color={crystalColors[i % crystalColors.length]} size={24} />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{path.title}</h3>
                    <p className="text-xs text-muted-foreground">{path.courses.reduce((t, c) => t + c.lessons.length, 0)} lessons</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Curriculum;
