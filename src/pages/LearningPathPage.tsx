import { useParams, Link } from "react-router-dom";
import { getLearningPathById } from "@/data/courseData";
import { AppLayout } from "@/components/AppLayout";
import { CrystalIcon } from "@/components/DashboardWidgets";
import { ArrowLeft, ArrowRight, BookOpen, Clock, BarChart3, Zap } from "lucide-react";

const crystalColors = [
  "hsl(260, 70%, 58%)", "hsl(330, 65%, 55%)", "hsl(185, 70%, 48%)",
  "hsl(145, 60%, 45%)", "hsl(45, 85%, 55%)", "hsl(25, 85%, 55%)", "hsl(0, 72%, 55%)"
];

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

  return (
    <AppLayout>
      {/* Path Header */}
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
              <span className="flex items-center gap-1.5"><BarChart3 className="h-3.5 w-3.5" /> {path.courses.length} Course{path.courses.length !== 1 ? 's' : ''}</span>
              <span className="text-crystal-yellow font-mono">+{totalLessons * 50} XP</span>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-8 px-6 lg:px-12 max-w-4xl">
        {path.courses.map((course, ci) => (
          <div key={course.id} className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold mb-0.5">{course.title}</h2>
                <p className="text-xs text-muted-foreground">{course.description}</p>
              </div>
              <div className="hidden md:flex items-center gap-3 text-[10px] text-muted-foreground">
                {course.estimatedTime && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.estimatedTime}</span>}
                <span className="rounded-full border border-border px-2 py-0.5 capitalize">{course.difficulty}</span>
              </div>
            </div>
            <div className="space-y-1.5">
              {course.lessons.map((lesson, i) => (
                <Link key={lesson.id} to={`/path/${path.id}/lesson/${lesson.id}`}
                  className="group flex items-center gap-3 glass-panel-hover rounded-xl p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-[10px] font-mono text-muted-foreground">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium">{lesson.title}</h3>
                    <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">{lesson.whyThisMatters.substring(0, 100)}...</p>
                  </div>
                  <span className="text-[10px] font-mono text-crystal-yellow shrink-0">+50 XP</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </AppLayout>
  );
};

export default LearningPathPage;
