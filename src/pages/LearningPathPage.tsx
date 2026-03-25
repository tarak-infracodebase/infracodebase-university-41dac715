import { useParams, Link } from "react-router-dom";
import { getLearningPathById } from "@/data/courseData";
import { handsOnTracks } from "@/data/handsOnData";
import { AppLayout } from "@/components/AppLayout";
import { CrystalIcon } from "@/components/DashboardWidgets";
import { ArrowLeft, ArrowRight, BookOpen, Clock, BarChart3, Play, Video, Hammer, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AzurePeriodicTableCard } from "@/components/AzurePeriodicTableLink";

const crystalColors = [
  "hsl(260, 70%, 58%)", "hsl(330, 65%, 55%)", "hsl(185, 70%, 48%)",
  "hsl(145, 60%, 45%)", "hsl(45, 85%, 55%)", "hsl(25, 85%, 55%)", "hsl(0, 72%, 55%)"
];

const trackVideoMap: Record<string, string> = {
  foundations: "/assets/Introduction.mp4",
  "real-infrastructure": "/assets/Applying_Infracodebase2.mp4",
  "architecture-diagrams": "/assets/Architecture_Diagrams.mp4",
};


function IntroVideo({ pathId }: { pathId: string }) {
  const videoSrc = trackVideoMap[pathId];

  if (videoSrc) {
    return (
      <div className="rounded-2xl overflow-hidden border border-border/30 bg-black shadow-lg shadow-primary/5">
        <video
          controls
          preload="metadata"
          playsInline
          className="w-full aspect-video"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/30 bg-muted/30 aspect-video flex flex-col items-center justify-center gap-4 shadow-lg shadow-primary/5">
      <div className="h-16 w-16 rounded-full bg-muted/60 border border-border/40 flex items-center justify-center">
        <Video className="h-7 w-7 text-muted-foreground/60" />
      </div>
      <div className="text-center px-6">
        <h3 className="text-sm font-semibold text-foreground mb-1">Introduction</h3>
        <p className="text-xs text-muted-foreground max-w-sm">
          {pathId === "cloud-infrastructure-intro"
            ? "This track will introduce the cloud & infrastructure prerequisite program, explain the three tiers, and help you identify where to start."
            : pathId === "prereq-foundations"
            ? "Tier 1 covers cloud fundamentals — compute, storage, networking, identity, and your first real infrastructure environment."
            : pathId === "prereq-intermediate"
            ? "Tier 2 covers real IaC with Terraform, multi-AZ networking, security architecture, scalability, CI/CD, and observability."
            : pathId === "prereq-expert"
            ? "Tier 3 covers resilience engineering, the Well-Architected Framework, FinOps, governance, DevSecOps, and cloud-native patterns."
            : "This track will include an embedded introduction video to guide learners through the course overview and learning objectives."
          }
        </p>
        <span className="inline-block mt-3 text-[10px] font-mono text-muted-foreground/50 border border-border/30 rounded-full px-3 py-1">
          Video coming soon
        </span>
      </div>
    </div>
  );
}

function TrackIntroBlock({ text }: { text: string }) {
  return (
    <div className="glass-panel rounded-xl p-6">
      <h3 className="text-[10px] uppercase tracking-wider text-primary font-semibold mb-3">Where You Are</h3>
      <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
        {text}
      </div>
    </div>
  );
}

function ContinueLearningCard({
  nextLessonTitle,
  totalLessons,
  pathId,
  firstLessonId,
}: {
  nextLessonTitle: string;
  totalLessons: number;
  pathId: string;
  firstLessonId: string;
}) {
  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1">Continue Learning</p>
        <h3 className="text-sm font-semibold truncate">{nextLessonTitle}</h3>
        <div className="flex items-center gap-3 mt-2">
          <Progress value={0} className="h-1.5 flex-1 max-w-[160px] bg-muted" />
          <span className="text-[10px] text-muted-foreground font-mono">0/{totalLessons} completed</span>
        </div>
      </div>
      <Link to={`/path/${pathId}/lesson/${firstLessonId}`}>
        <Button size="sm" className="gap-1.5 text-xs">
          <Play className="h-3 w-3" /> Start Learning
        </Button>
      </Link>
    </div>
  );
}

const upNextContent: Record<string, { trackNumber: number; title: string; description: string; pathId: string; label?: string }> = {
  "cloud-infrastructure-intro": {
    trackNumber: 0,
    title: "Foundations",
    description: "Begin the first tier of the cloud & infrastructure prerequisite program.",
    pathId: "prereq-foundations",
    label: "Start Tier 1",
  },
  "prereq-foundations": {
    trackNumber: 0,
    title: "Intermediate",
    description: "Continue to the second tier covering real IaC, security architecture, and CI/CD.",
    pathId: "prereq-intermediate",
    label: "Start Tier 2",
  },
  "prereq-intermediate": {
    trackNumber: 0,
    title: "Expert",
    description: "Continue to the third tier covering resilience, governance, and cloud-native architecture.",
    pathId: "prereq-expert",
    label: "Start Tier 3",
  },
  "prereq-expert": {
    trackNumber: 1,
    title: "Welcome & Orientation",
    description: "You have completed all prerequisites. Begin the Infracodebase curriculum.",
    pathId: "welcome-orientation",
    label: "Start Track 1",
  },
  "welcome-orientation": {
    trackNumber: 2,
    title: "Foundations — Understanding Infracodebase",
    description: "Learn what Infracodebase is, how workspaces are organized, and how the agent collaborates with you to design infrastructure.",
    pathId: "foundations",
  },
  foundations: {
    trackNumber: 3,
    title: "Real Infrastructure Engineering",
    description: "Move from generating isolated resources to building connected, working infrastructure environments.",
    pathId: "real-infrastructure",
  },
  "real-infrastructure": {
    trackNumber: 4,
    title: "Architecture Diagrams & Living Documentation",
    description: "Understand how infrastructure is structured, visualized, and documented as it evolves.",
    pathId: "architecture-diagrams",
  },
  "architecture-diagrams": {
    trackNumber: 5,
    title: "Enterprise Governance & Platform Engineering",
    description: "Learn how to apply rulesets, workflows, and structure to control how infrastructure is generated.",
    pathId: "enterprise-governance",
  },
  "enterprise-governance": {
    trackNumber: 6,
    title: "Advanced Infrastructure Architecture",
    description: "Design resilient, multi-region infrastructure systems that handle scale, failure, and complexity.",
    pathId: "advanced-architecture",
  },
};

function ProgressSidebar({
  currentTrackId,
}: {
  currentTrackId: string;
}) {
  const matchingHandsOn = handsOnTracks.find(t => t.curriculumTrackId === currentTrackId);
  const upNext = upNextContent[currentTrackId];
  const isLastTrack = currentTrackId === "advanced-architecture";
  const isPrereq = currentTrackId === "cloud-infrastructure-intro" || currentTrackId.startsWith("prereq-");
  const isOnboarding = currentTrackId === "welcome-orientation" || isPrereq;

  return (
    <div className="space-y-5">
      {/* Course Progress */}
      <div className="glass-panel rounded-xl p-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Course Progress</h4>
        <Progress value={0} className="h-2 bg-muted mb-2" />
        <p className="text-xs text-muted-foreground font-mono">0%</p>
      </div>

      {isOnboarding ? (
        <>
          {/* Next Step — onboarding action block */}
          <div className="glass-panel rounded-xl p-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Next Step</h4>
            {isPrereq && upNext ? (
              <>
                <p className="text-xs text-muted-foreground mb-3">{upNext.description}</p>
                <p className="text-sm font-semibold mb-1">{upNext.title}</p>
                <Link to={`/path/${upNext.pathId}`}>
                  <Button size="sm" className="w-full gap-1.5 text-xs">
                    <Play className="h-3 w-3" /> {upNext.label || "Continue"}
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <p className="text-xs text-muted-foreground mb-3">You are ready to start building your first infrastructure environment.</p>
                <p className="text-sm font-semibold mb-1">Track 2: Foundations — Understanding Infracodebase</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">Learn what Infracodebase is, how workspaces are organized, and how the agent collaborates with you.</p>
                <Link to="/path/foundations">
                  <Button size="sm" className="w-full gap-1.5 text-xs">
                    <Play className="h-3 w-3" /> Start Track 2
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Up Next — secondary guidance */}
          {upNext && (
            <div className="glass-panel rounded-xl p-5">
              <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">Up Next</h4>
              <p className="text-sm font-semibold mb-1">Track {upNext.trackNumber}: {upNext.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{upNext.description}</p>
              <Link to={`/path/${upNext.pathId}`}>
                <Button size="sm" variant="secondary" className="w-full gap-1.5 text-xs">
                  {upNext.label || "Continue my training"} <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Assessment */}
          <div className="glass-panel rounded-xl p-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Assessment</h4>
            <p className="text-xs text-muted-foreground mb-3">Test your understanding by applying what you learned.</p>
            {matchingHandsOn ? (
              <Link to={`/hands-on/${matchingHandsOn.id}`}>
                <Button size="sm" className="w-full gap-1.5 text-xs">
                  <Hammer className="h-3 w-3" /> Do the hands-on training
                </Button>
              </Link>
            ) : (
              <Button size="sm" className="w-full gap-1.5 text-xs" disabled>
                No hands-on training available
              </Button>
            )}
          </div>

          {/* Up Next / Completion */}
          {isLastTrack ? (
            <div className="glass-panel rounded-xl p-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Completion</h4>
              <p className="text-xs text-muted-foreground mb-3">You have completed the full learning path.</p>
              <Link to="/dashboard">
                <Button size="sm" className="w-full gap-1.5 text-xs">
                  <CheckCircle2 className="h-3 w-3" /> Review your progress
                </Button>
              </Link>
            </div>
          ) : upNext ? (
            <div className="glass-panel rounded-xl p-5">
              <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">Up Next</h4>
              <p className="text-sm font-semibold mb-1">Track {upNext.trackNumber}: {upNext.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{upNext.description}</p>
              <Link to={`/path/${upNext.pathId}`}>
                <Button size="sm" className="w-full gap-1.5 text-xs">
                  Continue my training <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

const LearningPathPage = () => {
  const { pathId } = useParams<{ pathId: string }>();
  const path = getLearningPathById(pathId || "");

  if (!path) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Learning Path Not Found</h1>
            <Link to="/training" className="text-primary hover:underline text-sm">← Back to Training</Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  const totalLessons = path.courses.reduce((t, c) => t + c.lessons.length, 0);
  const firstLesson = path.courses[0]?.lessons[0];
  

  return (
    <AppLayout>
      {/* Track Header */}
      <section className="gradient-hero py-12 lg:py-16 px-6 lg:px-12 border-b border-border/30">
        <Link to="/training" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-3 w-3" /> All Learning Paths
        </Link>
        <div className="flex items-start gap-4">
          <CrystalIcon color={path.color === "prerequisite" ? (path.accentColor || "hsl(235, 56%, 34%)") : crystalColors[(path.order - 1) % crystalColors.length]} size={40} />
          <div>
            <div className="text-[10px] font-mono mb-1">
              {path.color === "prerequisite" ? (
                <span className="px-2 py-0.5 rounded-full bg-[hsl(235,56%,34%)]/20 text-[hsl(235,56%,70%)] border border-[hsl(235,56%,34%)]/30">PREREQUISITE TRACK</span>
              ) : (
                <span className="text-primary">Track {path.order}</span>
              )}
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-3">{path.title}</h1>
            <p className="text-sm text-muted-foreground max-w-2xl mb-4">{path.description}</p>
            <div className="flex items-center gap-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" /> {totalLessons} Lessons</span>
              <span className="flex items-center gap-1.5"><BarChart3 className="h-3.5 w-3.5" /> {path.courses.length} Section{path.courses.length !== 1 ? "s" : ""}</span>
              <span className="text-crystal-yellow font-mono">+{totalLessons * 50} XP</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Video + Track Intro + Continue Learning */}
      <section className="px-6 lg:px-12 max-w-5xl pt-8 space-y-6">
        <IntroVideo pathId={path.id} />
        {path.trackIntro && <TrackIntroBlock text={path.trackIntro} />}
        {firstLesson && (
          <ContinueLearningCard
            nextLessonTitle={firstLesson.title}
            totalLessons={totalLessons}
            pathId={path.id}
            firstLessonId={firstLesson.id}
          />
        )}
      </section>

      {/* Two-column: Sections + Progress Sidebar */}
      <section className="px-6 lg:px-12 py-8">
        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl">
          {/* Left: Course content */}
          <div className="flex-1 min-w-0">
            {path.courses.map((course, courseIdx) => (
              <div key={course.id} className="mb-10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-lg font-bold mb-0.5">{course.title}</h2>
                  </div>
                  <div className="hidden md:flex items-center gap-3 text-[10px] text-muted-foreground">
                    {course.estimatedTime && (
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.estimatedTime}</span>
                    )}
                    <span className="rounded-full border border-border px-2 py-0.5 capitalize">{course.difficulty}</span>
                  </div>
                </div>
                {course.description && (
                  <p className="text-xs text-muted-foreground/80 leading-relaxed mb-4 max-w-2xl whitespace-pre-line">
                    {course.description}
                  </p>
                )}
                <div className="space-y-1.5">
                  {course.lessons.map((lesson, i) => {
                    const globalIndex = path.courses.slice(0, courseIdx).reduce((acc, c) => acc + c.lessons.length, 0) + i;
                    return (
                      <Link
                        key={lesson.id}
                        to={`/path/${path.id}/lesson/${lesson.id}`}
                        className="group flex items-center gap-3 glass-panel-hover rounded-xl p-4"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-[10px] font-mono text-muted-foreground">
                          {globalIndex + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-medium">{lesson.title}</h3>
                          <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
                            {lesson.whyThisMatters.substring(0, 100)}...
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-crystal-yellow shrink-0">+50 XP</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Progress Sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <ProgressSidebar
              currentTrackId={path.id}
            />
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default LearningPathPage;
