import { AppLayout } from "@/components/AppLayout";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Users, Radio, MessageSquare, ArrowRight } from "lucide-react";

const upcomingEvents = [
  { id: 1, title: "Infrastructure Architecture Patterns", date: "Mar 20, 2026", time: "2:00 PM UTC", type: "Technical Session", speaker: "Sarah Chen", description: "Deep dive into scalable infrastructure patterns using Infracodebase agent workflows." },
  { id: 2, title: "Building Resilient VPC Networks", date: "Mar 25, 2026", time: "3:00 PM UTC", type: "Live Webinar", speaker: "Marcus Weber", description: "Hands-on session building production-grade VPC configurations with routing and NAT." },
  { id: 3, title: "Platform Engineering Best Practices", date: "Apr 2, 2026", time: "1:00 PM UTC", type: "Conversation", speaker: "Priya Sharma", description: "Discussion on governance rulesets and enterprise-scale platform engineering." },
  { id: 4, title: "Community Infrastructure Review", date: "Apr 10, 2026", time: "4:00 PM UTC", type: "Community Talk", speaker: "Community Panel", description: "Share and review infrastructure designs built during the learning program." },
];

const pastEvents = [
  { id: 5, title: "Getting Started with Infracodebase", date: "Mar 5, 2026", type: "Technical Session", speaker: "Aiko Tanaka" },
  { id: 6, title: "Understanding Workspaces & Agents", date: "Feb 28, 2026", type: "Live Webinar", speaker: "James O'Brien" },
  { id: 7, title: "Infrastructure Documentation Strategies", date: "Feb 20, 2026", type: "Conversation", speaker: "Emma Lindqvist" },
];

const typeColors: Record<string, string> = {
  "Technical Session": "bg-crystal-violet/10 text-crystal-violet border-crystal-violet/20",
  "Live Webinar": "bg-crystal-cyan/10 text-crystal-cyan border-crystal-cyan/20",
  "Conversation": "bg-crystal-magenta/10 text-crystal-magenta border-crystal-magenta/20",
  "Community Talk": "bg-crystal-green/10 text-crystal-green border-crystal-green/20",
};

const Events = () => {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Events</h1>
          <p className="text-sm text-muted-foreground">Live sessions, webinars, and community discussions</p>
        </div>

        <div className="flex gap-2 mb-8">
          <button onClick={() => setTab("upcoming")} className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors", tab === "upcoming" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
            Upcoming Sessions
          </button>
          <button onClick={() => setTab("past")} className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors", tab === "past" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
            Past Sessions
          </button>
        </div>

        {tab === "upcoming" ? (
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingEvents.map(ev => (
              <div key={ev.id} className="glass-panel rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={cn("text-[10px] px-2 py-0.5 rounded-full border", typeColors[ev.type])}>{ev.type}</span>
                </div>
                <h3 className="text-sm font-semibold mb-1">{ev.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{ev.description}</p>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {ev.date}</span>
                  <span>{ev.time}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {ev.speaker}</span>
                </div>
                <button className="w-full rounded-lg bg-primary/10 text-primary px-4 py-2 text-xs font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-1.5">
                  Register <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {pastEvents.map(ev => (
              <div key={ev.id} className="glass-panel rounded-xl p-4 flex items-center gap-4">
                <span className={cn("text-[10px] px-2 py-0.5 rounded-full border shrink-0", typeColors[ev.type])}>{ev.type}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{ev.title}</p>
                  <p className="text-[10px] text-muted-foreground">{ev.date} · {ev.speaker}</p>
                </div>
                <button className="text-xs text-primary hover:text-primary/80">Watch Recording</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Events;
