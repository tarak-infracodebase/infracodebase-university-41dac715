import { AppLayout } from "@/components/AppLayout";
import { CrystalIcon } from "@/components/DashboardWidgets";
import { Share2, MapPin, Calendar, Flame, Trophy } from "lucide-react";
import buildWithHerBg from "@/assets/build-with-her-bg.png";

const projects = [
  { name: "Azure APIM Landing Zone", desc: "Production-grade Azure API Management landing zone with Terraform following security best practices.", tags: ["Azure", "Terraform"], color: "hsl(var(--crystal-cyan))" },
  { name: "Production Web App over SQL on AWS", desc: "Production-grade web application with SQL database on AWS using Terraform — security-hardened, Well-Architected, and compliant.", tags: ["AWS", "Terraform"], color: "hsl(var(--crystal-magenta))" },
  { name: "AWS-Security-Insights-Pipeline", desc: "Real-time AWS threat detection and auto-remediation system analysis.", tags: ["AWS", "Security"], color: "hsl(var(--crystal-green))" },
  { name: "AWS Secure Web Application", desc: "Production-ready AWS web application using ALB, WAF, and security-by-design infrastructure.", tags: ["AWS", "Security"], color: "hsl(var(--crystal-orange))" },
  { name: "Azure Active Directory Lab Environment", desc: "Terraform workspace for deploying a Windows Server Active Directory domain with domain controllers and enterprise configuration.", tags: ["Azure", "AD"], color: "hsl(var(--crystal-violet))" },
  { name: "Azure AD DS Hybrid Architecture", desc: "Hybrid Active Directory Domain Services architecture extending on-premises AD to Azure using Terraform.", tags: ["Azure", "Hybrid"], color: "hsl(var(--crystal-yellow))" },
];

const heatmapData = Array.from({ length: 52 }, () =>
  Array.from({ length: 7 }, () => Math.random())
);

const stats = [
  { label: "Daily Average", value: "1.8 hrs" },
  { label: "Days Active", value: "47" },
  { label: "Current Streak", value: "12 days" },
  { label: "Total Edits", value: "342" },
];

const Profile = () => {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto pb-12">
        {/* Gradient Banner */}
        <div className="h-48 rounded-b-2xl relative overflow-hidden" style={{
          background: "linear-gradient(135deg, hsl(260 70% 30%) 0%, hsl(330 65% 25%) 40%, hsl(185 70% 20%) 70%, hsl(228 30% 10%) 100%)"
        }}>
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>

        {/* Avatar + Info */}
        <div className="px-6 lg:px-8 -mt-16 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div className="h-28 w-28 rounded-full border-4 border-background bg-card flex items-center justify-center text-3xl font-mono font-bold text-foreground shrink-0">
              YO
            </div>
            <div className="flex-1 pb-2">
              <h1 className="text-2xl font-bold">Your Name</h1>
              <p className="text-sm text-muted-foreground">@yourhandle</p>
            </div>
            <div className="flex items-center gap-2 pb-2">
              <button className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors flex items-center gap-1.5">
                <Share2 className="h-3.5 w-3.5" /> Share Profile
              </button>
            </div>
          </div>

          {/* Bio row */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Infrastructure Engineer</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Joined Feb 2026</span>
            <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-crystal-orange" /> 12 day streak</span>
            <span className="flex items-center gap-1"><Trophy className="h-3.5 w-3.5 text-crystal-yellow" /> Silver League</span>
          </div>

          {/* Follower stats */}
          <div className="mt-3 flex items-center gap-4 text-sm">
            <span><strong className="text-foreground">24</strong> <span className="text-muted-foreground">following</span></span>
            <span><strong className="text-foreground">18</strong> <span className="text-muted-foreground">followers</span></span>
          </div>
        </div>

        <div className="px-6 lg:px-8 mt-8 grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Main column */}
          <div className="space-y-8">
            {/* Engineer Profile */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-5">Engineer Profile</h2>
              <div className="space-y-3 max-w-xl">
                <p className="text-sm text-foreground leading-relaxed">
                  Infrastructure Engineer focused on building secure and scalable systems.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Designs and operates production infrastructure, automated deployment pipelines, and high-performance cloud applications.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Works across cloud infrastructure, platform engineering, and frontend systems when needed.
                </p>
              </div>
            </div>

            {/* Infrastructure Stack */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-5">Infrastructure Stack</h2>
              <div className="space-y-6">
                {/* Cloud Infrastructure */}
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1">Primary Cloud: <span className="text-foreground font-medium">AWS</span></p>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Cloud Infrastructure</h3>
                  <div className="space-y-3">
                    {[
                      { name: "AWS", pct: 52, color: "hsl(var(--crystal-orange))" },
                      { name: "Azure", pct: 37, color: "hsl(var(--crystal-cyan))" },
                      { name: "GCP", pct: 7, color: "hsl(var(--crystal-green))" },
                    ].map(c => (
                      <div key={c.name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-muted-foreground">{c.name}</span>
                          <span className="text-xs font-mono text-foreground">{c.pct}%</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${c.pct}%`, backgroundColor: c.color, opacity: 0.7 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Infrastructure as Code */}
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1">Primary IaC: <span className="text-foreground font-medium">Terraform</span></p>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Infrastructure as Code</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Terraform", pct: 99, color: "hsl(var(--crystal-violet))" },
                      { name: "Bicep", pct: 1, color: "hsl(var(--crystal-cyan))" },
                    ].map(c => (
                      <div key={c.name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-muted-foreground">{c.name}</span>
                          <span className="text-xs font-mono text-foreground">{c.pct}%</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${c.pct}%`, backgroundColor: c.color, opacity: 0.7 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Infrastructure Projects</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {projects.map((p, i) => (
                  <div key={i} className="glass-panel rounded-xl p-4 hover:border-primary/20 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                      <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{p.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{p.desc}</p>
                    <div className="flex gap-1.5">
                      {p.tags.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Heatmap */}
            <div className="glass-panel rounded-xl p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Activity</h2>
              <div className="overflow-x-auto">
                <div className="flex gap-[3px] min-w-[680px]">
                  {heatmapData.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((val, di) => (
                        <div
                          key={di}
                          className="h-[11px] w-[11px] rounded-[2px]"
                          style={{
                            backgroundColor: val < 0.15
                              ? "hsl(var(--muted))"
                              : val < 0.4
                              ? "hsl(260 70% 58% / 0.3)"
                              : val < 0.7
                              ? "hsl(260 70% 58% / 0.55)"
                              : "hsl(260 70% 58% / 0.85)"
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Side stats */}
          <div className="space-y-4">
            {/* XP Card */}
            <div className="glass-panel rounded-xl p-5 text-center">
              <p className="text-3xl font-mono font-bold text-foreground">2,450</p>
              <p className="text-xs text-muted-foreground mt-1">Total XP</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <CrystalIcon color="hsl(var(--crystal-violet))" size={18} />
                <span className="text-sm font-medium">Level 7</span>
              </div>
            </div>

            {/* Stats */}
            <div className="glass-panel rounded-xl p-5 space-y-4">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <span className="text-sm font-mono font-semibold">{s.value}</span>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="glass-panel rounded-xl p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {["hsl(var(--crystal-violet))", "hsl(var(--crystal-magenta))", "hsl(var(--crystal-cyan))", "hsl(var(--crystal-green))", "hsl(var(--crystal-yellow))"].map((c, i) => (
                  <CrystalIcon key={i} color={c} size={24} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
