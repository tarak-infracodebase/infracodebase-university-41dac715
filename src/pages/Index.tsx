import { Link } from "react-router-dom";
import { learningPaths, getTotalLessons, getTotalCourses } from "@/data/courseData";
import heroBg from "@/assets/hero-bg.jpg";
import { Compass, Layers, Server, FileText, Shield, Cpu, GraduationCap, ArrowRight, BookOpen, Users, Zap, ChevronRight } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="h-6 w-6" />,
  Layers: <Layers className="h-6 w-6" />,
  Server: <Server className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
  Shield: <Shield className="h-6 w-6" />,
  Cpu: <Cpu className="h-6 w-6" />,
  GraduationCap: <GraduationCap className="h-6 w-6" />,
};

const Index = () => {
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
          <nav className="hidden md:flex items-center gap-8">
            <a href="#paths" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Learning Paths</a>
            <a href="#audience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Who It's For</a>
            <a href="#learn" className="text-sm text-muted-foreground hover:text-foreground transition-colors">What You'll Learn</a>
          </nav>
          <Link to="/path/welcome-orientation" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Start Learning
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen" />
        <div className="relative container mx-auto px-6 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm text-muted-foreground mb-6">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              {getTotalCourses()} Courses · {getTotalLessons()} Lessons · {learningPaths.length} Learning Paths
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="text-gradient">Infracodebase</span>{" "}
              <span className="text-foreground">University</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Learn how modern infrastructure teams design, build, document, and govern infrastructure using AI-assisted workflows.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/path/welcome-orientation" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-glow">
                Start Learning <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#paths" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-6 py-3 font-medium text-foreground hover:bg-card transition-colors">
                Explore Learning Paths
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is Infracodebase University */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">What is Infracodebase University?</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Infracodebase University is a structured learning program for infrastructure engineers. 
              It teaches how to design, build, document, and govern infrastructure using Infracodebase — 
              an agent operating system for infrastructure as code. Instead of fragmented tutorials, 
              you follow a progressive curriculum that mirrors how real infrastructure systems are built and evolved.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section id="paths" className="py-20 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Learning Paths</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Seven structured tracks that take you from foundations to advanced infrastructure architecture.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {learningPaths.map((path, i) => (
              <Link
                key={path.id}
                to={`/path/${path.id}`}
                className="group gradient-card rounded-xl border border-border/50 p-6 hover:border-primary/30 hover:shadow-glow transition-all duration-200"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-2.5 text-primary shrink-0">
                    {iconMap[path.icon]}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground font-mono mb-1">Track {path.order}</div>
                    <h3 className="font-semibold text-foreground mb-2 text-sm">{path.shortTitle}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{path.description}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Start learning <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section id="audience" className="py-20 border-t border-border/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Who This Is For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <Server className="h-5 w-5" />, title: "Platform Engineers", desc: "Build internal infrastructure platforms that support multiple engineering teams." },
              { icon: <Zap className="h-5 w-5" />, title: "DevOps Engineers", desc: "Evolve infrastructure workflows with AI-assisted design and automation." },
              { icon: <Layers className="h-5 w-5" />, title: "Cloud Architects", desc: "Design resilient, scalable infrastructure systems across cloud providers." },
              { icon: <Shield className="h-5 w-5" />, title: "Infrastructure Engineers", desc: "Build and operate production infrastructure with modern tooling." },
              { icon: <Users className="h-5 w-5" />, title: "Engineering Teams", desc: "Teams adopting AI-assisted infrastructure workflows." },
              { icon: <Cpu className="h-5 w-5" />, title: "Technical Leaders", desc: "Leaders driving infrastructure modernization across organizations." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-border/50 bg-card/30 p-5">
                <div className="rounded-lg bg-primary/10 p-2 text-primary inline-flex mb-3">{item.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Will Learn */}
      <section id="learn" className="py-20 border-t border-border/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What You Will Learn</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
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
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border/30 bg-card/20 p-4">
                <div className="rounded-full bg-primary/20 p-1 mt-0.5"><ChevronRight className="h-3 w-3 text-primary" /></div>
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Begin with the Welcome & Orientation track and progress through the entire curriculum at your own pace.</p>
          <Link to="/path/welcome-orientation" className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-glow">
            Start Learning <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Infracodebase University. A technical academy for infrastructure engineering.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
