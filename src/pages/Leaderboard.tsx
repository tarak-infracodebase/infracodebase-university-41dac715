import { AppLayout } from "@/components/AppLayout";
import { CrystalIcon } from "@/components/DashboardWidgets";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Trophy, Medal } from "lucide-react";

const crystalColors = [
  "hsl(45, 85%, 55%)", "hsl(220, 15%, 70%)", "hsl(25, 85%, 55%)"
];

const leaderboardData = [
  { rank: 1, name: "Sarah Chen", country: "🇺🇸", xp: 12450, league: "Diamond", avatar: "SC" },
  { rank: 2, name: "Marcus Weber", country: "🇩🇪", xp: 11200, league: "Diamond", avatar: "MW" },
  { rank: 3, name: "Aiko Tanaka", country: "🇯🇵", xp: 10800, league: "Diamond", avatar: "AT" },
  { rank: 4, name: "James O'Brien", country: "🇮🇪", xp: 9650, league: "Platinum", avatar: "JO" },
  { rank: 5, name: "Priya Sharma", country: "🇮🇳", xp: 8900, league: "Platinum", avatar: "PS" },
  { rank: 6, name: "Luis Garcia", country: "🇪🇸", xp: 7200, league: "Gold", avatar: "LG" },
  { rank: 7, name: "Emma Lindqvist", country: "🇸🇪", xp: 6800, league: "Gold", avatar: "EL" },
  
  { rank: 9, name: "Alex Kim", country: "🇰🇷", xp: 2100, league: "Silver", avatar: "AK" },
  { rank: 10, name: "Nina Petrova", country: "🇧🇬", xp: 1800, league: "Silver", avatar: "NP" },
];

type TimeFilter = "weekly" | "monthly" | "alltime";

const Leaderboard = () => {
  const [filter, setFilter] = useState<TimeFilter>("alltime");
  const top3 = leaderboardData.slice(0, 3);
  const podiumOrder = [top3[1], top3[0], top3[2]]; // 2nd, 1st, 3rd

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Leaderboard</h1>
            <p className="text-sm text-muted-foreground">See how you rank among learners</p>
          </div>
          <div className="flex rounded-lg border border-border overflow-hidden">
            {(["weekly", "monthly", "alltime"] as TimeFilter[]).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={cn("px-3 py-1.5 text-xs font-medium transition-colors capitalize",
                  filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}>
                {f === "alltime" ? "All Time" : f}
              </button>
            ))}
          </div>
        </div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 mb-12">
          {podiumOrder.map((user, i) => {
            const isFirst = i === 1;
            const podiumH = isFirst ? "h-32" : i === 0 ? "h-24" : "h-20";
            return (
              <div key={user.rank} className="flex flex-col items-center">
                <div className="relative mb-2">
                  <div className={cn(
                    "rounded-full flex items-center justify-center font-mono font-bold text-sm border-2",
                    isFirst ? "h-16 w-16 border-crystal-yellow" : "h-12 w-12 border-border"
                  )} style={{ background: 'hsl(var(--muted))' }}>
                    {user.avatar}
                  </div>
                  <CrystalIcon color={crystalColors[isFirst ? 0 : i === 0 ? 1 : 2]} size={isFirst ? 22 : 18} />
                </div>
                <p className="text-xs font-medium mb-0.5">{user.name}</p>
                <p className="text-[10px] text-muted-foreground mb-2">{user.xp.toLocaleString()} XP</p>
                <div className={cn("w-20 rounded-t-lg", podiumH)}
                  style={{ background: `linear-gradient(to top, hsl(var(--muted)), ${crystalColors[isFirst ? 0 : i === 0 ? 1 : 2]})` }}>
                  <div className="flex items-center justify-center h-8 text-sm font-mono font-bold">{user.rank}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table */}
        <div className="glass-panel rounded-xl overflow-hidden">
          <div className="grid grid-cols-[3rem_1fr_4rem_5rem_4rem] gap-2 px-4 py-2.5 border-b border-border/50 text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
            <span>Rank</span><span>Learner</span><span className="text-right">XP</span><span className="text-center">League</span><span></span>
          </div>
          {leaderboardData.map(user => (
            <div key={user.rank} className={cn(
              "grid grid-cols-[3rem_1fr_4rem_5rem_4rem] gap-2 px-4 py-3 items-center border-b border-border/30 last:border-0 text-sm",
              user.name === "You" && "bg-primary/5"
            )}>
              <span className="font-mono text-xs text-muted-foreground">{user.rank}</span>
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-mono shrink-0">{user.avatar}</div>
                <span className="text-xs font-medium">{user.name}</span>
                <span className="text-xs">{user.country}</span>
              </div>
              <span className="text-xs font-mono text-right">{user.xp.toLocaleString()}</span>
              <span className="text-[10px] text-center text-muted-foreground">{user.league}</span>
              <span></span>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Leaderboard;
