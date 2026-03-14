import { AppLayout } from "@/components/AppLayout";
import { useState } from "react";
import { Search, Play, Clock, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const videoTopics = [
  "All", "Infrastructure Architecture", "Networking", "Governance", "Platform Engineering",
  "Documentation", "Advanced Architecture", "Getting Started"
];

const videos = [
  { id: 1, title: "Introduction to Infracodebase Workspaces", duration: "12:30", topic: "Getting Started", thumbnail: "🏗️" },
  { id: 2, title: "Building Your First VPC Network", duration: "18:45", topic: "Networking", thumbnail: "🌐" },
  { id: 3, title: "Understanding Agent Workflows", duration: "15:20", topic: "Getting Started", thumbnail: "🤖" },
  { id: 4, title: "Configuring Routing and NAT", duration: "22:10", topic: "Networking", thumbnail: "🔀" },
  { id: 5, title: "Enterprise Governance with Rulesets", duration: "20:00", topic: "Governance", thumbnail: "🛡️" },
  { id: 6, title: "Architecture Diagrams in Practice", duration: "16:35", topic: "Documentation", thumbnail: "📊" },
  { id: 7, title: "Multi-Region Infrastructure Design", duration: "25:15", topic: "Advanced Architecture", thumbnail: "🌍" },
  { id: 8, title: "Platform Engineering Foundations", duration: "19:50", topic: "Platform Engineering", thumbnail: "⚙️" },
  { id: 9, title: "Identity and Permissions Deep Dive", duration: "21:00", topic: "Infrastructure Architecture", thumbnail: "🔐" },
  { id: 10, title: "Debugging Infrastructure Generation", duration: "14:40", topic: "Infrastructure Architecture", thumbnail: "🐛" },
  { id: 11, title: "Living Documentation Practices", duration: "17:25", topic: "Documentation", thumbnail: "📝" },
  { id: 12, title: "Designing for Resilience", duration: "23:30", topic: "Advanced Architecture", thumbnail: "🏰" },
];

const VideoLibrary = () => {
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");

  const filtered = videos.filter(v => {
    const matchTopic = selectedTopic === "All" || v.topic === selectedTopic;
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase());
    return matchTopic && matchSearch;
  });

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Video Library</h1>
          <p className="text-sm text-muted-foreground">Browse video content on infrastructure engineering topics</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-muted/50 pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              placeholder="Search videos..." />
          </div>
          <div className="flex flex-wrap gap-2">
            {videoTopics.map(t => (
              <button key={t} onClick={() => setSelectedTopic(t)}
                className={cn("px-3 py-1.5 rounded-full text-xs transition-colors border",
                  selectedTopic === t
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                )}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(v => (
            <div key={v.id} className="glass-panel-hover rounded-xl overflow-hidden cursor-pointer group">
              <div className="aspect-video bg-muted/50 flex items-center justify-center text-4xl relative">
                {v.thumbnail}
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center">
                    <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium mb-1 line-clamp-2">{v.title}</h3>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {v.duration}</span>
                  <span className="px-1.5 py-0.5 rounded bg-muted text-[10px]">{v.topic}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default VideoLibrary;
