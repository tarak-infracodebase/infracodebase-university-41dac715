import { useParams, Link, useNavigate } from "react-router-dom";
import { getLearningPathById, learningPaths } from "@/data/courseData";
import { handsOnTracks } from "@/data/handsOnData";
import { AppLayout } from "@/components/AppLayout";
import { CrystalIcon } from "@/components/DashboardWidgets";
import { ArrowLeft, ArrowRight, BookOpen, Clock, BarChart3, Play, Video, Hammer } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const crystalColors = [
  "hsl(260, 70%, 58%)", "hsl(330, 65%, 55%)", "hsl(185, 70%, 48%)",
  "hsl(145, 60%, 45%)", "hsl(45, 85%, 55%)", "hsl(25, 85%, 55%)", "hsl(0, 72%, 55%)"
];

const trackVideoMap: Record<string, string> = {
  foundations: "/assets/Introduction.mp4",
  "real-infrastructure": "/assets/Applying_Infracodebase2.mp4",
  "architecture-diagrams": "/assets/Architecture_Diagrams.mp4",
};

function getNextTrackId(currentId: string): string | null {
  const idx = learningPaths.findIndex(p => p.id === currentId);
  if (idx >= 0 && idx < learningPaths.length - 1) {
    return learningPaths[idx + 1].id;
  }
  return null;
}

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
          This track will include an embedded introduction video to guide learners through the course overview and learning objectives.
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

function ProgressSidebar({
  totalLessons,
  nextLessonTitle,
  nextTrackId,
}: {
  totalLessons: number;
  nextLessonTitle: string;
  nextTrackId: string | null;
}) {
  return (
    <div className="space-y-5">
      {/* Course Progress */}
      <div className="glass-panel rounded-xl p-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Course Progress</h4>
        <Progress value={0} className="h-2 bg-muted mb-2" />
        <p className="text-xs text-muted-foreground font-mono">0%</p>
      </div>

      {/* Assessment */}
      <div className="glass-panel rounded-xl p-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Assessment</h4>
        <p className="text-xs text-muted-foreground">Test your knowledge</p>
      </div>

      {/* Up Next */}
      <div className="glass-panel rounded-xl p-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Up Next</h4>
        <p className="text-sm font-medium">{nextLessonTitle}</p>
        {nextTrackId ? (
          <Link to={`/path/${nextTrackId}`}>
            <Button size="sm" className="mt-3 w-full gap-1.5 text-xs">
              Continue my training <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        ) : (
          <Button size="sm" className="mt-3 w-full gap-1.5 text-xs">
            Complete & continue <ArrowRight className="h-3 w-3" />
          </Button>
        )}
      </div>
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
            <Link to="/curriculum" className="text-primary hover:underline text-sm">← Back to Curriculum</Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  const totalLessons = path.courses.reduce((t, c) => t + c.lessons.length, 0);
  const firstLesson = path.courses[0]?.lessons[0];
  const nextTrackId = getNextTrackId(path.id);

  return (
    <AppLayout>
      {/* Track Header */}
      <section className="gradient-hero py-12 lg:py-16 px-6 lg:px-12 border-b border-border/30">
        <Link to="/curriculum" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-3 w-3" /> All Learning Paths
        </Link>
        <div className="flex items-start gap-4">
          <CrystalIcon color={crystalColors[(path.order - 1) % crystalColors.length]} size={40} />
          <div>
            <div className="text-[10px] text-primary font-mono mb-1">Track {path.order}</div>
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
              totalLessons={totalLessons}
              nextLessonTitle={firstLesson?.title || "Start course"}
              nextTrackId={nextTrackId}
            />
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default LearningPathPage;
