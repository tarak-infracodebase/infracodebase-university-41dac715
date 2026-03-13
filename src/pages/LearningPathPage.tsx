import { useParams, Link } from "react-router-dom";
import { getLearningPathById } from "@/data/courseData";
import { ArrowLeft, ArrowRight, BookOpen, Clock, BarChart3, Zap } from "lucide-react";

const LearningPathPage = () => {
  const { pathId } = useParams<{ pathId: string }>();
  const path = getLearningPathById(pathId || "");

  if (!path) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Learning Path Not Found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const totalLessons = path.courses.reduce((t, c) => t + c.lessons.length, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-mono font-bold text-foreground">Infracodebase<span className="text-primary">U</span></span>
          </Link>
        </div>
      </header>

      <div className="pt-16">
        {/* Path Header */}
        <section className="gradient-hero py-16 border-b border-border/50">
          <div className="container mx-auto px-6">
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" /> All Learning Paths
            </Link>
            <div className="flex items-center gap-2 text-xs text-primary font-mono mb-3">Track {path.order}</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{path.title}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-6">{path.description}</p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {totalLessons} Lessons</span>
              <span className="flex items-center gap-1.5"><BarChart3 className="h-4 w-4" /> {path.courses.length} Course{path.courses.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </section>

        {/* Courses */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-4xl">
            {path.courses.map((course) => (
              <div key={course.id} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1">{course.title}</h2>
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-4 text-xs text-muted-foreground">
                    {course.estimatedTime && <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.estimatedTime}</span>}
                    <span className="rounded-full border border-border px-2.5 py-0.5 capitalize">{course.difficulty}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {course.lessons.map((lesson, i) => (
                    <Link
                      key={lesson.id}
                      to={`/path/${path.id}/lesson/${lesson.id}`}
                      className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card/30 p-4 hover:border-primary/30 hover:bg-card/60 transition-all"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-mono text-muted-foreground">
                        {i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-foreground">{lesson.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{lesson.whyThisMatters.substring(0, 100)}...</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LearningPathPage;
