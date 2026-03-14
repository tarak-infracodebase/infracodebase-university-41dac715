import { AppLayout } from "@/components/AppLayout";
import { SkillBar, CrystalIcon, ProgressRing } from "@/components/DashboardWidgets";
import { Share2, Calendar, Flame, Trophy, Zap, MapPin } from "lucide-react";

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
];

const achievements = [
  { name: "Welcome Complete", color: crystalColors[0], desc: "Finished orientation" },
  { name: "Foundation Builder", color: crystalColors[1], desc: "Completed foundations track" },
  { name: "Network Pioneer", color: crystalColors[2], desc: "Built first VPC" },
  { name: "5-Day Streak", color: crystalColors[3], desc: "Consistent learner" },
  { name: "10 Lessons", color: crystalColors[4], desc: "Knowledge seeker" },
];

const timeline = [
  { date: "Mar 14", action: "Completed: Controlling Traffic with Routing and NAT" },
  { date: "Mar 13", action: "Earned crystal: Network Pioneer" },
  { date: "Mar 12", action: "Completed: Building the Network Foundation" },
  { date: "Mar 11", action: "Started: Real Infrastructure Engineering" },
  { date: "Mar 10", action: "Completed: Track 2 — Foundations" },
];

const Profile = () => {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="glass-panel rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="h-20 w-20 rounded-2xl bg-muted flex items-center justify-center text-2xl font-mono font-bold text-foreground shrink-0">
              YO
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-0.5">Your Name</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" /> Infrastructure Engineer
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Joined Feb 2026</span>
                <span className="flex items-center gap-1"><Flame className="h-3 w-3" /> 12 day streak</span>
                <span className="flex items-center gap-1"><Trophy className="h-3 w-3" /> Silver League</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="text-xl font-mono font-bold text-foreground">2,450</p>
                <p className="text-[10px] text-muted-foreground">XP</p>
              </div>
              <div className="text-center ml-4">
                <p className="text-xl font-mono font-bold text-foreground">7</p>
                <p className="text-[10px] text-muted-foreground">Level</p>
              </div>
              <button className="ml-4 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors flex items-center gap-1.5">
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Skills */}
          <div className="lg:col-span-2 glass-panel rounded-xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Skill Progress</h2>
            <div className="space-y-3">
              {skills.map((s, i) => (
                <SkillBar key={i} label={s.label} value={s.value} color={s.color} />
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="glass-panel rounded-xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Achievements</h2>
            <div className="space-y-3">
              {achievements.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CrystalIcon color={a.color} size={22} />
                  <div>
                    <p className="text-xs font-medium">{a.name}</p>
                    <p className="text-[10px] text-muted-foreground">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="lg:col-span-3 glass-panel rounded-xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Activity Timeline</h2>
            <div className="space-y-3">
              {timeline.map((t, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-muted-foreground w-12 shrink-0">{t.date}</span>
                  <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                  <p className="text-xs text-muted-foreground">{t.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
