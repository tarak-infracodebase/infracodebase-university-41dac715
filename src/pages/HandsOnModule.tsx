import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { getHandsOnModule, handsOnTracks } from "@/data/handsOnData";
import { ArrowLeft, ArrowRight, Lightbulb, BookOpen, PenTool, AlertTriangle, RefreshCw, Zap } from "lucide-react";
import ValidationChecklist from "@/components/lesson/ValidationChecklist";
import HandsOnSubmission from "@/components/lesson/HandsOnSubmission";
import KnowledgeCheckMulti from "@/components/lesson/KnowledgeCheckMulti";
import { toast } from "@/components/ui/use-toast";

const SectionBlock = ({ icon: Icon, title, color, children }: { icon: React.ElementType; title: string; color: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <div className="flex items-center gap-2 mb-3">
      <Icon className="h-4 w-4" style={{ color }} />
      <h2 className="text-base font-bold">{title}</h2>
    </div>
    {children}
  </section>
);

const ContentBlock = ({ content, className = "" }: { content: string; className?: string }) => (
  <div className={`text-sm text-muted-foreground leading-relaxed ${className}`}>
    {content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h3 key={i} className="text-foreground font-semibold mt-4 mb-1 font-mono text-xs">{line.replace(/\*\*/g, '')}</h3>;
      }
      if (line.startsWith('- ')) {
        return (
          <div key={i} className="flex items-start gap-2 ml-2 my-0.5">
            <span className="text-primary mt-1.5 shrink-0">•</span>
            <span>{line.substring(2)}</span>
          </div>
        );
      }
      if (line.startsWith('👉')) {
        return <div key={i} className="my-2 pl-3 border-l-2 border-primary/30 text-foreground font-medium text-xs">{line}</div>;
      }
      if (line.match(/^\d+\./)) {
        return (
          <div key={i} className="flex items-start gap-2 ml-2 my-0.5">
            <span className="text-primary font-mono text-xs mt-0.5 shrink-0">{line.match(/^\d+/)?.[0]}.</span>
            <span>{line.replace(/^\d+\.\s*/, '')}</span>
          </div>
        );
      }
      return line ? <p key={i} className="mb-2">{line}</p> : null;
    })}
  </div>
);

const HandsOnModulePage = () => {
  const { trackId, moduleId } = useParams<{ trackId: string; moduleId: string }>();
  const result = getHandsOnModule(trackId || "", moduleId || "");

  if (!result) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
            <Link to="/hands-on" className="text-primary hover:underline text-sm">← Back to Hands-On Exercises</Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  const { track, module: mod, moduleIndex } = result;
  const prevModule = moduleIndex > 0 ? track.modules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < track.modules.length - 1 ? track.modules[moduleIndex + 1] : null;

  const currentTrackIdx = handsOnTracks.findIndex(t => t.id === track.id);
  const nextTrack = currentTrackIdx < handsOnTracks.length - 1 ? handsOnTracks[currentTrackIdx + 1] : null;

  return (
    <AppLayout>
      <div className="flex" style={{ background: '#0f1724' }}>
        {/* Sidebar */}
        <aside className="hidden xl:block w-64 shrink-0 border-r min-h-screen sticky top-0 overflow-y-auto custom-scrollbar" style={{ background: '#141f2e', borderColor: '#1e3a5f' }}>
          <div className="p-4">
            <Link to={`/hands-on/${track.id}`} className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-3 w-3" /> {track.title}
            </Link>
            <h3 className="font-mono text-[10px] mb-3 uppercase tracking-wider" style={{ color: '#94a3b8' }}>Modules</h3>
            <nav className="space-y-0.5">
              {track.modules.map((m, i) => (
                <Link
                  key={m.id}
                  to={`/hands-on/${track.id}/${m.id}`}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] transition-colors ${
                    m.id === mod.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <span
                    className="font-mono text-[9px] w-5 h-5 rounded flex items-center justify-center shrink-0"
                    style={{ background: '#1e3a5f', color: '#7dd3fc', border: '1px solid #2a5080' }}
                  >
                    {i + 1}
                  </span>
                  <span className="truncate">{m.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-6 py-8 lg:py-12">
            <Link to={`/hands-on/${track.id}`} className="xl:hidden flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-3 w-3" /> {track.title}
            </Link>

            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono" style={{ color: '#7dd3fc' }}>
                  Module {moduleIndex + 1} of {track.modules.length}
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-3 font-mono" style={{ color: '#5eead4' }}>{mod.title}</h1>
              <div className="h-1 w-12 rounded-full" style={{ background: track.color }} />
            </div>

            {/* Why This Matters */}
            <SectionBlock icon={Lightbulb} title="Why This Matters" color="hsl(45, 85%, 55%)">
              <div className="rounded-xl p-5" style={{ background: '#141f2e', border: '1px solid #1e3a5f' }}>
                <ContentBlock content={mod.sections.whyThisMatters} />
              </div>
            </SectionBlock>

            {/* Core Concepts */}
            <SectionBlock icon={BookOpen} title="Core Concepts" color="hsl(260, 70%, 58%)">
              <ContentBlock content={mod.sections.coreConcepts} />
            </SectionBlock>

            {/* Engineering Reflection */}
            <section className="mb-8">
              <h2 className="text-base font-bold mb-3">Engineering Reflection</h2>
              <div className="rounded-xl border-l-4 border-secondary/50 p-5" style={{ background: '#141f2e' }}>
                <ContentBlock content={mod.sections.engineeringReflection} />
              </div>
            </section>

            {/* Step-by-Step Walkthrough */}
            <SectionBlock icon={Zap} title="Step-by-Step Walkthrough" color="hsl(25, 85%, 55%)">
              <div className="rounded-xl p-5" style={{ background: '#141f2e', border: '1px solid #1e3a5f' }}>
                <ContentBlock content={mod.sections.stepByStep} />
              </div>
            </SectionBlock>

            {/* Hands-On Exercise */}
            <SectionBlock icon={PenTool} title="Hands-On Exercise" color="hsl(185, 70%, 48%)">
              <div className="rounded-xl p-5" style={{ background: '#141f2e', border: '1px solid #1e3a5f' }}>
                <ContentBlock content={mod.sections.handsOnExercise} />
              </div>
              <HandsOnSubmission exerciseId={`handsOn_${trackId}_${moduleId}`} exerciseType="build-platform" exerciseDescription={mod.sections.handsOnExercise} exerciseTitle={mod.title} onSave={() => toast({ title: "+50 XP", description: "Work saved. Keep going." })} />
            </SectionBlock>

            {/* Required Artifact */}
            <section className="mb-8">
              <h2 className="text-base font-bold mb-3">Required Artifact</h2>
              <div className="rounded-xl p-5" style={{ background: '#141f2e', border: '1px solid #1e3a5f' }}>
                <ContentBlock content={mod.sections.requiredArtifact} />
              </div>
            </section>

            {/* Validation Checklist */}
            <ValidationChecklist
              items={mod.sections.validationChecklist}
              lessonId={`handsOn_${trackId}_${moduleId}`}
            />

            {/* Failure and Debugging */}
            <SectionBlock icon={AlertTriangle} title="Failure and Debugging" color="hsl(25, 85%, 55%)">
              <div className="rounded-xl p-5" style={{ background: '#141f2e', border: '1px solid #1e3a5f' }}>
                <ContentBlock content={mod.sections.failureAndDebugging} />
              </div>
            </SectionBlock>

            {/* Modification Exercise */}
            <SectionBlock icon={RefreshCw} title="Modification Exercise" color="hsl(330, 65%, 55%)">
              <div className="rounded-xl p-5" style={{ background: '#141f2e', border: '1px solid #1e3a5f' }}>
                <ContentBlock content={mod.sections.modificationExercise} />
              </div>
            </SectionBlock>

            {/* Knowledge Check */}
            <KnowledgeCheckMulti
              questions={[mod.sections.knowledgeCheck]}
              moduleId={`handsOn_${trackId}_${moduleId}`}
            />

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-border/30">
              {prevModule ? (
                <Link
                  to={`/hands-on/${track.id}/${prevModule.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> {prevModule.title}
                </Link>
              ) : <div />}
              {nextModule ? (
                <Link
                  to={`/hands-on/${track.id}/${nextModule.id}`}
                  onClick={() => {
                    try {
                      const raw = localStorage.getItem("icbu_track_progress");
                      const progress = raw ? JSON.parse(raw) : {};
                      const key = trackId || "";
                      const current = progress[key] || { completed: 0, status: "in_progress" };
                      progress[key] = { completed: current.completed + 1, status: "in_progress" };
                      localStorage.setItem("icbu_track_progress", JSON.stringify(progress));
                    } catch {}
                    window.scrollTo(0, 0);
                  }}
                  className="flex items-center gap-2 text-xs font-medium transition-colors"
                  style={{ color: '#5eead4' }}
                >
                  Continue my training <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : nextTrack ? (
                <Link
                  to={`/hands-on/${nextTrack.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="flex items-center gap-2 text-xs font-medium transition-colors"
                  style={{ color: '#5eead4' }}
                >
                  Continue my training → {nextTrack.title} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <Link
                  to="/hands-on"
                  onClick={() => window.scrollTo(0, 0)}
                  className="flex items-center gap-2 text-xs text-primary font-medium transition-colors"
                >
                  Back to Exercises <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
};

export default HandsOnModulePage;
