import { AppLayout } from "@/components/AppLayout";
import { Helmet } from "react-helmet-async";
import { learningPaths } from "@/data/courseData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BookOpen, Clock, ArrowRight, Search, HelpCircle, X } from "lucide-react";
import { AzurePeriodicTablePill } from "@/components/AzurePeriodicTableLink";
import { InfracodebaseDocsPill } from "@/components/InfracodebaseDocsLink";


import { CurriculumGuidanceQuiz } from "@/components/CurriculumGuidanceQuiz";
import { AudioPlayer } from "@/components/AudioPlayer";

const BANNER_DISMISSED_KEY = "curriculum-guidance-dismissed";

function PathCard({ path }: { path: typeof learningPaths[number] }) {
  const totalLessons = path.courses.reduce((t, c) => t + c.lessons.length, 0);
  const isPrereq = path.color === "prerequisite";

  return (
    <Link key={path.id} to={`/path/${path.id}`}
      className="group glass-panel-hover rounded-xl p-5 flex items-start gap-5 block">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {isPrereq ? (
            <>
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-full bg-[hsl(235,56%,34%)]/20 text-[hsl(235,56%,70%)] border border-[hsl(235,56%,34%)]/30">Prerequisite</span>
              <span className="text-xs text-muted-foreground/60 font-mono">Complete before Track 1</span>
            </>
          ) : (
            <span className="text-xs font-mono text-muted-foreground uppercase">Track {path.order}</span>
          )}
          <span className="text-xs px-2 py-0.5 rounded-full crystal-badge text-primary">{path.courses[0]?.difficulty || "beginner"}</span>
        </div>
        <h3 className="text-base font-semibold text-foreground mb-1">{path.title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{path.description}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {totalLessons} lessons</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {path.courses[0]?.estimatedTime || "~2 hrs"}</span>
          <span className="text-crystal-yellow font-mono">+{totalLessons * 50} XP</span>
          {isPrereq ? (
            <span className="ml-auto">
              <AzurePeriodicTablePill />
            </span>
          ) : (
            <span className="ml-auto">
              <InfracodebaseDocsPill trackId={path.id} />
            </span>
          )}
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2" />
    </Link>
  );
}

const Curriculum = () => {
  const [search, setSearch] = useState("");
  const [bannerDismissed, setBannerDismissed] = useState(() => localStorage.getItem(BANNER_DISMISSED_KEY) === "true");
  const [quizOpen, setQuizOpen] = useState(false);

  const dismissBanner = () => {
    setBannerDismissed(true);
    localStorage.setItem(BANNER_DISMISSED_KEY, "true");
  };

  const filteredPaths = learningPaths.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  const prereqPaths = filteredPaths.filter(p => p.color === "prerequisite");
  const curriculumPaths = filteredPaths.filter(p => p.color !== "prerequisite");

  return (
    <AppLayout>
      <Helmet>
        <title>Training — Infracodebase University</title>
        <meta name="description" content="Browse the complete Infracodebase learning program — 4 prerequisite tracks and 7 curriculum modules for cloud and platform engineers." />
        <link rel="canonical" href="https://university.infracodebase.com/training" />
        <meta property="og:title" content="Training — Infracodebase University" />
        <meta property="og:description" content="Browse the complete Infracodebase learning program — 4 prerequisite tracks and 7 curriculum modules for cloud and platform engineers." />
        <meta property="og:url" content="https://university.infracodebase.com/training" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://university.infracodebase.com/og/training.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Infracodebase University" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Training — Infracodebase University" />
        <meta name="twitter:description" content="Browse the complete Infracodebase learning program — 4 prerequisite tracks and 7 curriculum modules." />
        <meta name="twitter:image" content="https://university.infracodebase.com/og/training.png" />
      </Helmet>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Training</h1>
          <p className="text-sm text-muted-foreground">Browse the complete Infracodebase learning program</p>
        </div>

        {/* Guidance Banner */}
        {!bannerDismissed && (
          <div
            className="mb-8 rounded-xl border border-border bg-muted/60 px-5 py-4 flex items-center gap-4"
          >
            <HelpCircle className="h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Want help getting started?</p>
              <p className="text-xs text-muted-foreground mt-0.5">Answer 3 quick questions and we'll frame the curriculum around where you are right now.</p>
            </div>
            <button
              onClick={() => setQuizOpen(true)}
              className="shrink-0 flex items-center gap-1.5 text-[13px] font-semibold px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              Get personalised guidance
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button onClick={dismissBanner} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <CurriculumGuidanceQuiz open={quizOpen} onClose={() => setQuizOpen(false)} />

        <AudioPlayer
          src="/training-intro.mp3"
          label="Hey! Ivy created this quick 1 min voice to help you get started with your training. Hope it helps!"
          footer="Don't forget to do the hands-on training next!"
        />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              aria-label="Search courses and lessons"
              className="w-full rounded-lg border border-border bg-muted/50 pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              placeholder="Search courses, lessons..." />
          </div>
        </div>

        <div className="space-y-4">
          {/* Prerequisite Tracks */}
          {prereqPaths.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[hsl(235,56%,70%)]">Cloud & Infrastructure Prerequisites</span>
                <div className="flex-1 h-px bg-[hsl(235,56%,34%)]/30" />
              </div>
              {prereqPaths.map(path => (
                <PathCard key={path.id} path={path} />
              ))}
              {curriculumPaths.length > 0 && (
                <div className="flex items-center gap-3 mt-8 mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Infracodebase Curriculum</span>
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
      </div>
    </AppLayout>
  );
};

export default Curriculum;
