import { useParams, Link } from "react-router-dom";
import { getLessonById, learningPaths } from "@/data/courseData";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, AlertTriangle, Lightbulb, PenTool, Zap, ChevronRight } from "lucide-react";
import { useState } from "react";

const LessonPage = () => {
  const { pathId, lessonId } = useParams<{ pathId: string; lessonId: string }>();
  const result = getLessonById(pathId || "", lessonId || "");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const { lesson, course, path } = result;

  // Find prev/next lessons
  const allLessons = path.courses.flatMap(c => c.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Find next learning path
  const currentPathIndex = learningPaths.findIndex(p => p.id === path.id);
  const nextPath = currentPathIndex < learningPaths.length - 1 ? learningPaths[currentPathIndex + 1] : null;

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
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <Link to={`/path/${path.id}`} className="hover:text-foreground transition-colors">{path.shortTitle}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{lesson.title}</span>
          </div>
        </div>
      </header>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 border-r border-border/50 bg-card/20 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
          <div className="p-4">
            <Link to={`/path/${path.id}`} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-3 w-3" /> {path.shortTitle}
            </Link>
            <h3 className="font-mono text-xs text-muted-foreground mb-3 uppercase tracking-wider">{course.title}</h3>
            <nav className="space-y-0.5">
              {course.lessons.map((l, i) => (
                <Link
                  key={l.id}
                  to={`/path/${path.id}/lesson/${l.id}`}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors ${
                    l.id === lesson.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <span className="font-mono text-[10px] w-4 text-center">{i + 1}</span>
                  <span className="truncate">{l.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-6 py-12">
            {/* Breadcrumb mobile */}
            <Link to={`/path/${path.id}`} className="lg:hidden flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-4 w-4" /> {path.shortTitle}
            </Link>

            {/* Lesson Title */}
            <div className="mb-10">
              <div className="text-xs font-mono text-primary mb-2">Lesson {currentIndex + 1} of {allLessons.length}</div>
              <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
              <div className="h-1 w-16 rounded-full bg-primary/50" />
            </div>

            {/* Why This Matters */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-secondary" />
                <h2 className="text-lg font-bold">Why This Matters</h2>
              </div>
              <div className="rounded-xl border border-border/50 bg-card/30 p-6">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{lesson.whyThisMatters}</p>
              </div>
            </section>

            {/* What You'll Learn */}
            {lesson.whatYoullLearn && (
              <section className="mb-10">
                <h2 className="text-lg font-bold mb-3">What You'll Learn</h2>
                <ul className="space-y-2">
                  {lesson.whatYoullLearn.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Core Concepts */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-primary" />
                <h2 className="text-lg font-bold">Core Concepts</h2>
              </div>
              <div className="prose-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {lesson.coreConcepts.split('\n').map((para, i) => {
                  if (para.startsWith('**') && para.endsWith('**')) {
                    return <h3 key={i} className="text-foreground font-semibold mt-4 mb-1 font-mono text-sm">{para.replace(/\*\*/g, '')}</h3>;
                  }
                  if (para.startsWith('- ')) {
                    return <div key={i} className="flex items-start gap-2 ml-2 my-1"><ChevronRight className="h-3 w-3 text-primary shrink-0 mt-1" /><span>{para.substring(2)}</span></div>;
                  }
                  return para ? <p key={i} className="mb-3">{para.replace(/\*\*/g, '')}</p> : null;
                })}
              </div>
            </section>

            {/* Step by Step */}
            {lesson.stepByStep && (
              <section className="mb-10">
                <h2 className="text-lg font-bold mb-3">Step-by-Step Walkthrough</h2>
                <div className="rounded-xl border border-border/50 bg-card/30 p-6 text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {lesson.stepByStep}
                </div>
              </section>
            )}

            {/* Engineering Reflection */}
            {lesson.engineeringReflection && (
              <section className="mb-10">
                <h2 className="text-lg font-bold mb-3">Engineering Reflection</h2>
                <div className="rounded-xl border-l-4 border-secondary/50 bg-card/30 p-6 text-sm text-muted-foreground leading-relaxed">
                  {lesson.engineeringReflection}
                </div>
              </section>
            )}

            {/* Exercise */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <PenTool className="h-4 w-4 text-secondary" />
                <h2 className="text-lg font-bold">Hands-On Exercise</h2>
              </div>
              <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-6">
                <h3 className="font-semibold text-sm mb-2">{lesson.exercise.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{lesson.exercise.description}</p>
              </div>
            </section>

            {/* Required Artifact */}
            <section className="mb-10">
              <h2 className="text-lg font-bold mb-3">Required Artifact</h2>
              <div className="rounded-xl border border-border/50 bg-card/30 p-6">
                <h3 className="font-semibold text-sm mb-1">{lesson.artifact.title}</h3>
                <p className="text-sm text-muted-foreground">{lesson.artifact.description}</p>
              </div>
            </section>

            {/* Validation Checklist */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <h2 className="text-lg font-bold">Validation Checklist</h2>
              </div>
              <div className="space-y-2">
                {lesson.validationChecklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-4 w-4 rounded border border-border/50 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* Failure and Debugging */}
            {lesson.failureAndDebugging && (
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <h2 className="text-lg font-bold">Failure & Debugging</h2>
                </div>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 text-sm text-muted-foreground leading-relaxed">
                  {lesson.failureAndDebugging}
                </div>
              </section>
            )}

            {/* Knowledge Check */}
            {lesson.knowledgeCheck && (
              <section className="mb-10">
                <h2 className="text-lg font-bold mb-3">Knowledge Check</h2>
                <div className="rounded-xl border border-border/50 bg-card/30 p-6">
                  <p className="text-sm font-medium mb-4">{lesson.knowledgeCheck.question}</p>
                  <div className="space-y-2">
                    {lesson.knowledgeCheck.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedAnswer(i)}
                        className={`w-full text-left rounded-lg border p-3 text-sm transition-all ${
                          selectedAnswer === null
                            ? "border-border/50 hover:border-primary/30 text-muted-foreground"
                            : selectedAnswer === i
                              ? i === lesson.knowledgeCheck!.correctAnswer
                                ? "border-green-500/50 bg-green-500/10 text-green-400"
                                : "border-red-500/50 bg-red-500/10 text-red-400"
                              : i === lesson.knowledgeCheck!.correctAnswer && selectedAnswer !== null
                                ? "border-green-500/50 bg-green-500/10 text-green-400"
                                : "border-border/30 text-muted-foreground/50"
                        }`}
                      >
                        <span className="font-mono text-xs mr-2">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {selectedAnswer !== null && (
                    <p className={`text-xs mt-3 ${selectedAnswer === lesson.knowledgeCheck.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedAnswer === lesson.knowledgeCheck.correctAnswer ? '✓ Correct!' : `✗ The correct answer is ${String.fromCharCode(65 + lesson.knowledgeCheck.correctAnswer)}.`}
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-border/50">
              {prevLesson ? (
                <Link to={`/path/${path.id}/lesson/${prevLesson.id}`} onClick={() => { setSelectedAnswer(null); window.scrollTo(0, 0); }} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-4 w-4" /> {prevLesson.title}
                </Link>
              ) : <div />}
              {nextLesson ? (
                <Link to={`/path/${path.id}/lesson/${nextLesson.id}`} onClick={() => { setSelectedAnswer(null); window.scrollTo(0, 0); }} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                  {nextLesson.title} <ArrowRight className="h-4 w-4" />
                </Link>
              ) : nextPath ? (
                <Link to={`/path/${nextPath.id}`} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                  Next: {nextPath.shortTitle} <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link to="/" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                  Back to Home <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LessonPage;
