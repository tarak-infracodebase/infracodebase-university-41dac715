import { AppLayout } from "@/components/AppLayout";
import { BookOpen, Layout, Youtube, Linkedin, Activity, ExternalLink } from "lucide-react";

const sections = [
  {
    title: "Learning",
    items: [
      { name: "Introduction to Infracodebase", desc: "Start here to understand what Infracodebase is, how it works, and how to begin.", url: "https://infracodebase.com/docs/getting-started/introduction", icon: BookOpen, color: "text-crystal-violet" },
      { name: "Templates Library", desc: "Explore infrastructure templates and examples to accelerate your cloud builds.", url: "https://infracodebase.com/templates", icon: Layout, color: "text-crystal-cyan" },
    ],
  },
  {
    title: "Updates",
    items: [
      { name: "Infracodebase on YouTube", desc: "Tutorials, webinars, and platform walkthroughs.", url: "https://www.youtube.com/@infracodebase", icon: Youtube, color: "text-crystal-red" },
      { name: "Infracodebase on LinkedIn", desc: "Latest news, events, and community updates.", url: "https://www.linkedin.com/company/infracodebase/?viewAsMember=true", icon: Linkedin, color: "text-crystal-cyan" },
    ],
  },
  {
    title: "Platform",
    items: [
      { name: "Platform Status", desc: "Check real-time platform health and uptime.", url: "https://infracodebase.com/status", icon: Activity, color: "text-crystal-green" },
    ],
  },
];

const Resources = () => {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-2">Resources</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Everything you need to start building with Infracodebase. Learn the platform, explore templates, follow updates, and check platform status.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map(section => (
            <div key={section.title}>
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">{section.title}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {section.items.map(item => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-panel rounded-xl p-5 group hover:border-primary/20 transition-colors block"
                  >
                    <div className="flex items-start gap-3">
                      <item.icon className={`h-5 w-5 shrink-0 mt-0.5 ${item.color}`} />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors flex items-center gap-1.5">
                          {item.name}
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Resources;
