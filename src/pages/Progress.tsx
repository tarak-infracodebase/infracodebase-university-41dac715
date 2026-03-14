import { AppLayout } from "@/components/AppLayout";
import { SkillBar, ProgressRing, CrystalIcon } from "@/components/DashboardWidgets";

const crystalColors = [
  "hsl(260, 70%, 58%)", "hsl(330, 65%, 55%)", "hsl(185, 70%, 48%)",
  "hsl(145, 60%, 45%)", "hsl(45, 85%, 55%)", "hsl(25, 85%, 55%)", "hsl(0, 72%, 55%)"
];

const skills = [
  { label: "Infrastructure Architecture", value: 72, color: crystalColors[0] },
  { label: "Networking & Routing", value: 65, color: crystalColors[1] },
  { label: "Identity & Access Management", value: 45, color: crystalColors[2] },
  { label: "Configuration Automation", value: 58, color: crystalColors[3] },
  { label: "Infrastructure Debugging", value: 40, color: crystalColors[4] },
  { label: "Environment Management", value: 35, color: crystalColors[5] },
  { label: "Governance & Rulesets", value: 25, color: crystalColors[6] },
  { label: "Architecture Documentation", value: 30, color: crystalColors[0] },
  { label: "Platform Engineering", value: 20, color: crystalColors[1] },
  { label: "Resilience & Scaling", value: 15, color: crystalColors[2] },
  { label: "Infrastructure Operations", value: 50, color: crystalColors[3] },
];

const monthlyData = [
  { month: "Oct", xp: 200 }, { month: "Nov", xp: 450 }, { month: "Dec", xp: 380 },
  { month: "Jan", xp: 520 }, { month: "Feb", xp: 680 }, { month: "Mar", xp: 220 },
];

const milestones = [
  { name: "First Lesson", earned: true, xp: 50 },
  { name: "Track Complete", earned: true, xp: 500 },
  { name: "5-Day Streak", earned: true, xp: 100 },
  { name: "10 Lessons", earned: true, xp: 200 },
  { name: "Silver League", earned: false, xp: 300 },
  { name: "All Tracks", earned: false, xp: 1000 },
];

const Progress = () => {
  const maxMonthly = Math.max(...monthlyData.map(d => d.xp));

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Progress</h1>
          <p className="text-sm text-muted-foreground">Track your learning journey and skill development</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* XP Progression */}
          <div className="lg:col-span-2 glass-panel rounded-xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">XP Progression</h2>
            <div className="flex items-end gap-3 h-40">
              {monthlyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs font-mono text-muted-foreground">{d.xp}</span>
                  <div className="w-full rounded-t-lg transition-all duration-500"
                    style={{ 
                      height: `${(d.xp / maxMonthly) * 100}%`,
                      background: `linear-gradient(to top, ${crystalColors[i % crystalColors.length]}, ${crystalColors[(i + 1) % crystalColors.length]})`
                    }} />
                  <span className="text-[10px] text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overall Progress */}
          <div className="glass-panel rounded-xl p-5 flex flex-col items-center justify-center">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 self-start">Overall</h2>
            <ProgressRing value={12} max={45} size={120} strokeWidth={10}>
              <div className="text-center">
                <span className="text-xl font-mono font-bold">27%</span>
                <p className="text-[10px] text-muted-foreground">Complete</p>
              </div>
            </ProgressRing>
            <p className="text-xs text-muted-foreground mt-3">12 of 45 lessons completed</p>
          </div>

          {/* Skill Development */}
          <div className="lg:col-span-2 glass-panel rounded-xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Skill Development</h2>
            <div className="space-y-3">
              {skills.map((s, i) => (
                <SkillBar key={i} label={s.label} value={s.value} color={s.color} />
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="glass-panel rounded-xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Milestones</h2>
            <div className="space-y-3">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CrystalIcon color={m.earned ? crystalColors[i % crystalColors.length] : "hsl(228, 20%, 20%)"} size={20} />
                  <div className="flex-1">
                    <p className={`text-xs ${m.earned ? 'text-foreground' : 'text-muted-foreground'}`}>{m.name}</p>
                    <p className="text-[10px] text-muted-foreground">+{m.xp} XP</p>
                  </div>
                  {m.earned && <span className="text-[10px] text-crystal-green">✓</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Progress;
