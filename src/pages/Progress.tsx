import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { SkillBar, ProgressRing, CrystalIcon } from "@/components/DashboardWidgets";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const crystalColors = [
  "hsl(260, 70%, 58%)", "hsl(330, 65%, 55%)", "hsl(185, 70%, 48%)",
  "hsl(145, 60%, 45%)", "hsl(45, 85%, 55%)", "hsl(25, 85%, 55%)", "hsl(0, 72%, 55%)"
];

const skillLabels = [
  "Infrastructure Architecture", "Networking & Routing", "Identity & Access Management",
  "Configuration Automation", "Infrastructure Debugging", "Environment Management",
  "Governance & Rulesets", "Architecture Documentation", "Platform Engineering",
  "Resilience & Scaling", "Infrastructure Operations",
];

const TOTAL_LESSONS = 45;

const Progress = () => {
  const { isSignedIn } = useUser();
  const [totalXP, setTotalXP] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [monthlyData, setMonthlyData] = useState([
    { month: "Oct", xp: 0 }, { month: "Nov", xp: 0 }, { month: "Dec", xp: 0 },
    { month: "Jan", xp: 0 }, { month: "Feb", xp: 0 }, { month: "Mar", xp: 0 },
  ]);

  useEffect(() => {
    const load = () => {
      try {
        const xp = parseInt(localStorage.getItem("icbu_xp") || "0", 10);
        setTotalXP(xp);

        const raw = localStorage.getItem("icbu_track_progress");
        const progress = raw ? JSON.parse(raw) : {};
        let total = 0;
        Object.values(progress).forEach((t: any) => {
          total += (t.completedLessons?.length || t.completed || 0);
        });
        setCompletedCount(total);
      } catch {}

      try {
        const raw = localStorage.getItem("icbu_monthly_xp");
        if (raw) setMonthlyData(JSON.parse(raw));
      } catch {}
    };

    load();
    window.addEventListener("icbu_xp_update", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("icbu_xp_update", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  const overallPct = TOTAL_LESSONS > 0 ? Math.round((completedCount / TOTAL_LESSONS) * 100) : 0;
  const maxMonthly = Math.max(...monthlyData.map(d => d.xp), 1);

  // Dynamic skill values based on XP (scale proportionally)
  const skillScale = Math.min(totalXP / 2000, 1);
  const skills = skillLabels.map((label, i) => ({
    label,
    value: Math.round(skillScale * (70 - i * 5)),
    color: crystalColors[i % crystalColors.length],
  }));

  const milestones = [
    { name: "First Lesson", earned: completedCount >= 1, xp: 50 },
    { name: "Track Complete", earned: totalXP >= 500, xp: 500 },
    { name: "5-Day Streak", earned: false, xp: 100 },
    { name: "10 Lessons", earned: completedCount >= 10, xp: 200 },
    { name: "Silver League", earned: false, xp: 300 },
    { name: "All Tracks", earned: completedCount >= TOTAL_LESSONS, xp: 1000 },
  ];

  const hasProgress = totalXP > 0 || completedCount > 0;

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Progress</h1>
          <p className="text-sm text-muted-foreground">Track your learning journey and skill development</p>
        </div>

        {!isSignedIn && (
          <div className="glass-panel rounded-xl p-6 text-center mb-6">
            <p className="text-sm font-medium mb-1">Sign in to track your progress</p>
            <p className="text-xs text-muted-foreground mb-4">
              Your learning progress will be saved across devices when you're signed in.
            </p>
            <Link to="/sign-in" className="text-xs text-primary hover:underline">
              Sign in →
            </Link>
          </div>
        )}

        {isSignedIn && !hasProgress && (
          <div className="glass-panel rounded-xl p-6 text-center mb-6">
            <p className="text-sm font-medium mb-1">No progress tracked yet</p>
            <p className="text-xs text-muted-foreground mb-4">
              Complete your first lesson to start tracking your progress here.
            </p>
            <Link to="/training" className="text-xs text-primary hover:underline">
              Go to training →
            </Link>
          </div>
        )}

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
                      background: `linear-gradient(to top, ${crystalColors[i % crystalColors.length]}, ${crystalColors[(i + 1) % crystalColors.length]})`,
                      minHeight: d.xp > 0 ? '4px' : '0',
                    }} />
                  <span className="text-[10px] text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overall Progress */}
          <div className="glass-panel rounded-xl p-5 flex flex-col items-center justify-center">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 self-start">Overall</h2>
            <ProgressRing value={completedCount} max={TOTAL_LESSONS} size={120} strokeWidth={10}>
              <div className="text-center">
                <span className="text-xl font-mono font-bold">{overallPct}%</span>
                <p className="text-[10px] text-muted-foreground">Complete</p>
              </div>
            </ProgressRing>
            <p className="text-xs text-muted-foreground mt-3">{completedCount} of {TOTAL_LESSONS} lessons completed</p>
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
