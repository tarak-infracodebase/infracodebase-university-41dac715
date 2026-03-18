import { Link } from "react-router-dom";
import { learningPaths, getTotalLessons, getTotalCourses } from "@/data/courseData";
import { AppLayout } from "@/components/AppLayout";
import { CrystalIcon } from "@/components/DashboardWidgets";
import { 
  Compass, Layers, Server, FileText, Shield, Cpu, GraduationCap, 
  ArrowRight, BookOpen, Users, Zap, ChevronRight 
} from "lucide-react";

const crystalColors = [
  "hsl(260, 70%, 58%)", "hsl(330, 65%, 55%)", "hsl(185, 70%, 48%)",
  "hsl(145, 60%, 45%)", "hsl(45, 85%, 55%)", "hsl(25, 85%, 55%)", "hsl(0, 72%, 55%)"
];

const Index = () => {
  return (
    <AppLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative px-6 lg:px-12 py-20 lg:py-32 max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full crystal-badge px-4 py-1.5 text-xs text-primary mb-6">
            <CrystalIcon size={14} />
            {getTotalCourses()} Courses · {getTotalLessons()} Lessons · {learningPaths.length} Learning Paths
          </div>
          <h1
            className="text-5xl lg:text-7xl xl:text-8xl font-semibold mb-6 leading-[1.1]"
            style={{
              background: "linear-gradient(90deg, #61BB46, #FDB827, #F5821F, #E03A3E, #963D97, #009DDC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
            }}
          >
            Infracodebase University
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            Learn how modern infrastructure teams design, build, document, and govern infrastructure using AI-assisted workflows with Infracodebase.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/curriculum" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-glow">
              Start Learning <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/manifesto" className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors">
              Read our Manifesto
            </Link>
          </div>
        </div>
      </section>

      {/* What is */}
      <section className="py-20 px-6 lg:px-12 border-t border-border/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What is Infracodebase University?</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Infracodebase University is a structured learning program for infrastructure engineers. 
            It teaches how to design, build, document, and govern infrastructure using Infracodebase — 
            an agent operating system for infrastructure as code. Instead of fragmented tutorials, 
            you follow a progressive curriculum that mirrors how real infrastructure systems are built and evolved.
          </p>
        </div>
      </section>

      {/* Learning Paths */}
      <section id="paths" className="py-20 px-6 lg:px-12 border-t border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Learning Paths</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">Seven structured tracks from foundations to advanced infrastructure architecture.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningPaths.map((path, i) => {
              const totalLessons = path.courses.reduce((t, c) => t + c.lessons.length, 0);
              return (
                <Link key={path.id} to={`/path/${path.id}`}
                  className="group glass-panel-hover rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <CrystalIcon color={crystalColors[i]} size={28} />
                    <div className="min-w-0">
                      <div className="text-[10px] text-muted-foreground font-mono mb-1">Track {path.order}</div>
                      <h3 className="font-semibold text-sm mb-1.5">{path.shortTitle}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{path.description}</p>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        <span>{totalLessons} lessons</span>
                        <span className="text-crystal-yellow font-mono">+{totalLessons * 50} XP</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 px-6 lg:px-12 border-t border-border/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Who This Is For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Server className="h-5 w-5" />, title: "Platform Engineers", desc: "Build internal infrastructure platforms that support multiple engineering teams." },
              { icon: <Zap className="h-5 w-5" />, title: "DevOps Engineers", desc: "Evolve infrastructure workflows with AI-assisted design and automation." },
              { icon: <Layers className="h-5 w-5" />, title: "Cloud Architects", desc: "Design resilient, scalable infrastructure systems across cloud providers." },
              { icon: <Shield className="h-5 w-5" />, title: "Infrastructure Engineers", desc: "Build and operate production infrastructure with modern tooling." },
              { icon: <Users className="h-5 w-5" />, title: "Engineering Teams", desc: "Teams adopting AI-assisted infrastructure workflows." },
              { icon: <Cpu className="h-5 w-5" />, title: "Technical Leaders", desc: "Leaders driving infrastructure modernization across organizations." },
            ].map((item, i) => (
              <div key={i} className="glass-panel rounded-xl p-5">
                <div className="rounded-lg bg-primary/10 p-2 text-primary inline-flex mb-3">{item.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Will Learn */}
      <section className="py-20 px-6 lg:px-12 border-t border-border/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What You Will Learn</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Organize infrastructure work inside Infracodebase",
              "Collaborate with AI agents to design infrastructure",
              "Generate and review infrastructure as code",
              "Structure projects using workspaces, rulesets, and workflows",
              "Visualize systems using architecture diagrams",
              "Keep documentation synchronized with infrastructure",
              "Apply governance and engineering standards across projects",
              "Design resilient and scalable infrastructure systems",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 glass-panel rounded-lg p-4">
                <CrystalIcon color={crystalColors[i % crystalColors.length]} size={16} />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-12 border-t border-border/30">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-8 text-sm">Begin with the Welcome track and progress through the entire curriculum at your own pace.</p>
          <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-medium text-sm text-primary-foreground hover:bg-primary/90 transition-colors shadow-glow">
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 px-6 lg:px-12">
        <p className="text-center text-xs text-muted-foreground">© 2026 Infracodebase University. A technical academy for infrastructure engineering.</p>
      </footer>
    </AppLayout>
  );
};

export default Index;
