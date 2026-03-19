import { useParams, Link } from "react-router-dom";
import { getLessonById, learningPaths } from "@/data/courseData";
import { AppLayout } from "@/components/AppLayout";
import { CrystalIcon } from "@/components/DashboardWidgets";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, AlertTriangle, Lightbulb, PenTool, ChevronRight, Zap, RefreshCw } from "lucide-react";
import { useState } from "react";

const crystalColors = [
  "hsl(260, 70%, 58%)", "hsl(330, 65%, 55%)", "hsl(185, 70%, 48%)",
  "hsl(145, 60%, 45%)", "hsl(45, 85%, 55%)", "hsl(25, 85%, 55%)", "hsl(0, 72%, 55%)"
];

const LessonPage = () => {
  const { pathId, lessonId } = useParams<{ pathId: string; lessonId: string }>();
  const result = getLessonById(pathId || "", lessonId || "");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  if (!result) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
            <Link to="/curriculum" className="text-primary hover:underline text-sm">← Back to Curriculum</Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  const { lesson, course, path } = result;
  const allLessons = path.courses.flatMap(c => c.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const currentPathIndex = learningPaths.findIndex(p => p.id === path.id);
  const nextPath = currentPathIndex < learningPaths.length - 1 ? learningPaths[currentPathIndex + 1] : null;

  return (
    <AppLayout>
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden xl:block w-64 shrink-0 border-r border-border/30 bg-card/20 min-h-screen sticky top-0 overflow-y-auto custom-scrollbar">
          <div className="p-4">
            <Link to={`/path/${path.id}`} className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-3 w-3" /> {path.shortTitle}
            </Link>
            <h3 className="font-mono text-[10px] text-muted-foreground mb-3 uppercase tracking-wider">{course.title}</h3>
            <nav className="space-y-0.5">
              {course.lessons.map((l, i) => (
                <Link key={l.id} to={`/path/${path.id}/lesson/${l.id}`}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] transition-colors ${
                    l.id === lesson.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}>
                  <span className="font-mono text-[9px] w-3.5 text-center shrink-0">{i + 1}</span>
                  <span className="truncate">{l.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-6 py-8 lg:py-12">
            <Link to={`/path/${path.id}`} className="xl:hidden flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-3 w-3" /> {path.shortTitle}
            </Link>

            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono text-primary">Lesson {currentIndex + 1} of {allLessons.length}</span>
                <span className="text-[10px] font-mono text-crystal-yellow">+50 XP</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-3">{lesson.title}</h1>
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
            </div>

            {/* Why This Matters */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-crystal-yellow" />
                <h2 className="text-base font-bold">Why This Matters</h2>
              </div>
              <div className="glass-panel rounded-xl p-5">
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{lesson.whyThisMatters}</p>
              </div>
            </section>

            {/* What You'll Learn */}
            {lesson.whatYoullLearn && (
              <section className="mb-8">
                <h2 className="text-base font-bold mb-3">What You'll Learn</h2>
                <ul className="space-y-1.5">
                  {lesson.whatYoullLearn.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CrystalIcon color={crystalColors[i % crystalColors.length]} size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Core Concepts */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-primary" />
                <h2 className="text-base font-bold">Core Concepts</h2>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {lesson.coreConcepts.split('\n').map((para, i) => {
                  if (para.startsWith('**') && para.endsWith('**')) {
                    return <h3 key={i} className="text-foreground font-semibold mt-4 mb-1 font-mono text-xs">{para.replace(/\*\*/g, '')}</h3>;
                  }
                  if (para.startsWith('- ')) {
                    return <div key={i} className="flex items-start gap-2 ml-2 my-1"><ChevronRight className="h-3 w-3 text-primary shrink-0 mt-1" /><span>{para.substring(2)}</span></div>;
                  }
                  return para ? <p key={i} className="mb-2.5">{para.replace(/\*\*/g, '')}</p> : null;
                })}
              </div>
            </section>

            {/* Step by Step */}
            {lesson.stepByStep && (
              <section className="mb-8">
                <h2 className="text-base font-bold mb-3">Step-by-Step Walkthrough</h2>
                <div className="glass-panel rounded-xl p-5 text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {lesson.stepByStep}
                </div>
              </section>
            )}

            {/* Engineering Reflection */}
            {lesson.engineeringReflection && (
              <section className="mb-8">
                <h2 className="text-base font-bold mb-3">Engineering Reflection</h2>
                <div className="rounded-xl border-l-4 border-crystal-magenta/50 bg-card/30 p-5 text-sm text-muted-foreground leading-relaxed">
                  {lesson.engineeringReflection}
                </div>
              </section>
            )}

            {/* Modification Exercise */}
            {lesson.modificationExercise && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="h-4 w-4 text-crystal-magenta" />
                  <h2 className="text-base font-bold">Modification Exercise</h2>
                </div>
                <div className="rounded-xl border border-crystal-magenta/20 bg-crystal-magenta/5 p-5 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {lesson.modificationExercise}
                </div>
              </section>
            )}

            {/* Exercise */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <PenTool className="h-4 w-4 text-crystal-cyan" />
                <h2 className="text-base font-bold">Hands-On Exercise</h2>
              </div>
              <div className="rounded-xl border border-crystal-cyan/20 bg-crystal-cyan/5 p-5">
                <h3 className="font-semibold text-sm mb-1.5">{lesson.exercise.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{lesson.exercise.description}</p>
              </div>
            </section>

            {/* Artifact */}
            <section className="mb-8">
              <h2 className="text-base font-bold mb-3">Required Artifact</h2>
              <div className="glass-panel rounded-xl p-5">
                <h3 className="font-semibold text-sm mb-1">{lesson.artifact.title}</h3>
                <p className="text-sm text-muted-foreground">{lesson.artifact.description}</p>
              </div>
            </section>

            {/* Validation */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-4 w-4 text-crystal-green" />
                <h2 className="text-base font-bold">Validation Checklist</h2>
              </div>
              <div className="space-y-1.5">
                {lesson.validationChecklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-3.5 w-3.5 rounded border border-border/50 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* Failure & Debugging */}
            {lesson.failureAndDebugging && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-crystal-orange" />
                  <h2 className="text-base font-bold">Failure & Debugging</h2>
                </div>
                <div className="rounded-xl border border-crystal-orange/20 bg-crystal-orange/5 p-5 text-sm text-muted-foreground leading-relaxed">
                  {lesson.failureAndDebugging}
                </div>
              </section>
            )}

            {/* Knowledge Check */}
            {lesson.knowledgeCheck && (
              <section className="mb-8">
                <h2 className="text-base font-bold mb-3">Knowledge Check</h2>
                <div className="glass-panel rounded-xl p-5">
                  <p className="text-sm font-medium mb-4">{lesson.knowledgeCheck.question}</p>
                  <div className="space-y-2">
                    {lesson.knowledgeCheck.options.map((opt, i) => (
                      <button key={i} onClick={() => setSelectedAnswer(i)}
                        className={`w-full text-left rounded-lg border p-3 text-sm transition-all ${
                          selectedAnswer === null
                            ? "border-border/50 hover:border-primary/30 text-muted-foreground"
                            : selectedAnswer === i
                              ? i === lesson.knowledgeCheck!.correctAnswer
                                ? "border-crystal-green/50 bg-crystal-green/10 text-crystal-green"
                                : "border-crystal-red/50 bg-crystal-red/10 text-crystal-red"
                              : i === lesson.knowledgeCheck!.correctAnswer && selectedAnswer !== null
                                ? "border-crystal-green/50 bg-crystal-green/10 text-crystal-green"
                                : "border-border/30 text-muted-foreground/50"
                        }`}>
                        <span className="font-mono text-xs mr-2">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {selectedAnswer !== null && (
                    <p className={`text-xs mt-3 ${selectedAnswer === lesson.knowledgeCheck.correctAnswer ? 'text-crystal-green' : 'text-crystal-red'}`}>
                      {selectedAnswer === lesson.knowledgeCheck.correctAnswer ? '✓ Correct!' : `✗ The correct answer is ${String.fromCharCode(65 + lesson.knowledgeCheck.correctAnswer)}.`}
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-border/30">
              {prevLesson ? (
                <Link to={`/path/${path.id}/lesson/${prevLesson.id}`} onClick={() => { setSelectedAnswer(null); window.scrollTo(0, 0); }}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-3.5 w-3.5" /> {prevLesson.title}
                </Link>
              ) : <div />}
              {nextLesson ? (
                <Link to={`/path/${path.id}/lesson/${nextLesson.id}`} onClick={() => { setSelectedAnswer(null); window.scrollTo(0, 0); }}
                  className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors">
                  {nextLesson.title} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : nextPath ? (
                <Link to={`/path/${nextPath.id}`} className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors">
                  Next: {nextPath.shortTitle} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <Link to="/curriculum" className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors">
                  Back to Curriculum <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
};

export default LessonPage;
