export type NotificationCategory = "workshop" | "video" | "module";

export interface NotificationItem {
  id: number;
  category: NotificationCategory;
  status: "upcoming" | "replay" | null;
  title: string;
  description: string;
  byline?: string;
  timestamp: string;
  tags: string[];
  duration?: string;
  read: boolean;
  modal: {
    tagLabel: string;
    statusTag: { label: string; type: "replay" | "upcoming" } | null;
    eyebrow: string;
    leftTitle: string;
    speakers: string[];
    badge: string;
    title: string;
    description: string;
    meta: { icon: string; text: string }[];
    features: { icon: string; title: string; description: string }[];
    cta: string;
  };
}

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    category: "workshop",
    status: "upcoming",
    title: "Shifting Left: Building a Secure Azure Baseline",
    description: "With Tawni, Senior Full Stack — Wednesday, April 1, 2026 · 5:00 PM CET",
    timestamp: "New",
    tags: ["Azure Security", "Upcoming"],
    read: false,
    modal: {
      tagLabel: "Workshop",
      statusTag: { label: "Upcoming", type: "upcoming" },
      eyebrow: "Upcoming workshop",
      leftTitle: "Shifting\nLeft",
      speakers: ["Tawni — Senior Full Stack"],
      badge: "UPCOMING WORKSHOP",
      title: "Shifting Left: Building a Secure Azure Baseline",
      description:
        "Live demo: take a simple Azure 3-tier web app template, question its assumptions, and apply constraints like input validation, API boundaries, and secrets management before it's introduced into a CI pipeline.",
      meta: [
        { icon: "calendar", text: "Wednesday, April 1, 2026" },
        { icon: "clock", text: "5:00 PM CET" },
        { icon: "users", text: "Tawni — Senior Full Stack" },
      ],
      features: [
        {
          icon: "shield",
          title: "Azure Policy & Defender for Cloud",
          description:
            "Set baseline policies at the management group level and enforce them across all subscriptions.",
        },
        {
          icon: "lock",
          title: "Security baseline controls",
          description:
            "Identity, network, data, and logging baselines — applied step by step on a live Azure 3-tier environment.",
        },
        {
          icon: "zap",
          title: "Shift-left in practice",
          description:
            "How to catch misconfigurations at design time before they reach production or a CI pipeline.",
        },
      ],
      cta: "View Workshop",
    },
  },
  {
    id: 2,
    category: "workshop",
    status: "replay",
    title: "Migrating Azure Infrastructure to AWS and GCP",
    description: "Tarak & Justin O'Connor · March 25, 2026 · 56m 46s",
    timestamp: "March 25",
    tags: ["Cross-cloud", "Build with Her", "Replay"],
    duration: "56m 46s",
    read: false,
    modal: {
      tagLabel: "Workshop",
      statusTag: { label: "Replay", type: "replay" },
      eyebrow: "Weekly workshop — replay",
      leftTitle: "Azure\nMigration",
      speakers: ["Tarak", "Justin O'Connor"],
      badge: "WORKSHOP REPLAY",
      title: "Migrating Azure Infrastructure to AWS and GCP",
      description:
        "Full recording of the cross-cloud migration session with Tarak & Justin O'Connor. Session notes, the Azure Periodic Table reference, and moments from the cohort are all inside the workshop card.",
      meta: [
        { icon: "clock", text: "56m 46s" },
        { icon: "calendar", text: "March 25, 2026" },
        { icon: "users", text: "Build with Her" },
      ],
      features: [
        {
          icon: "film",
          title: "Full recording available",
          description:
            "Watch the complete session at your own pace, with timestamps for each section.",
        },
        {
          icon: "image",
          title: "Our moments",
          description:
            "Photos from the live cohort session — browse the gallery in the workshop card.",
        },
        {
          icon: "file",
          title: "Notes & resources",
          description:
            "Structured session notes, Azure Periodic Table reference, and migration checklist.",
        },
      ],
      cta: "View Workshop",
    },
  },
  {
    id: 3,
    category: "video",
    status: null,
    title: "Scaling Infrastructure",
    description: "Track 5 — Enterprise Governance & Platform Engineering",
    byline: "By Manisha, DevOps Eng.",
    timestamp: "New",
    tags: ["Track 5", "Enterprise Governance"],
    read: false,
    modal: {
      tagLabel: "New Video",
      statusTag: null,
      eyebrow: "New video",
      leftTitle: "Scaling\nInfra",
      speakers: ["Manisha — DevOps Eng."],
      badge: "NEW VIDEO",
      title: "Scaling Infrastructure",
      description:
        "Learn how organisations scale infrastructure work through rulesets, workflows, subagents, workspace history, and platform engineering practices. Created by Manisha, DevOps Engineer. Added to Track 5 — Enterprise Governance & Platform Engineering.",
      meta: [
        { icon: "layers", text: "Track 5 — Enterprise Governance" },
        { icon: "users", text: "Manisha — DevOps Eng." },
      ],
      features: [
        {
          icon: "bar-chart",
          title: "Rulesets & workflows at scale",
          description:
            "Govern infrastructure across large teams using Infracodebase enterprise rulesets and workflow templates.",
        },
        {
          icon: "cpu",
          title: "Subagents & workspace history",
          description:
            "Delegate scoped tasks to subagents and track all changes through workspace history.",
        },
        {
          icon: "shield",
          title: "Platform engineering practices",
          description:
            "Patterns for building internal platforms that ship compliant infrastructure consistently.",
        },
      ],
      cta: "View Video Library",
    },
  },
  {
    id: 4,
    category: "module",
    status: null,
    title: "New resource: Azure Periodic Table",
    description:
      "Naming conventions, prefixes & service reference — available in Training.",
    timestamp: "New",
    tags: ["Azure", "Training"],
    read: false,
    modal: {
      tagLabel: "New Resource",
      statusTag: null,
      eyebrow: "New training resource",
      leftTitle: "Azure\nReference",
      speakers: [],
      badge: "NEW RESOURCE",
      title: "Azure Periodic Table",
      description:
        "A comprehensive reference covering every Azure resource type with its naming prefix, character constraints, and full service description. Covers management, networking, security, compute, and more. Now available in the Training page.",
      meta: [
        { icon: "cloud", text: "azureperiodictable.com" },
        { icon: "map", text: "All Azure resource categories" },
      ],
      features: [
        {
          icon: "layers",
          title: "Naming prefixes & constraints",
          description:
            "Every Azure resource type with its recommended prefix (mg-, sub-, rg-, id-) and character limits.",
        },
        {
          icon: "shield",
          title: "Security & identity resources",
          description:
            "Managed Identity, Firewall, Firewall Policy, Application Security Groups — with naming rules.",
        },
        {
          icon: "terminal",
          title: "Networking service reference",
          description:
            "Application Gateway, ExpressRoute, DNS Zones, CDN Profiles — definitions and use cases.",
        },
      ],
      cta: "View Training",
    },
  },
  {
    id: 5,
    category: "module",
    status: null,
    title: "New resource: Infracodebase Docs",
    description:
      "Agent OS for IaC — workspaces, rulesets, subagents & enterprise config.",
    timestamp: "New",
    tags: ["Docs", "Training"],
    read: false,
    modal: {
      tagLabel: "New Resource",
      statusTag: null,
      eyebrow: "New training resource",
      leftTitle: "Infracodebase\nDocs",
      speakers: [],
      badge: "NEW RESOURCE",
      title: "Infracodebase Docs",
      description:
        "The complete documentation for Infracodebase — the agent operating system for infrastructure as code. Covers enterprise configuration, workspaces, the agent, subagents, rulesets, workflows, secrets, and integrations. Now available in the Training page.",
      meta: [
        { icon: "book-open", text: "infracodebase.com/docs" },
        { icon: "cpu", text: "Agent · Workspaces · Enterprise" },
      ],
      features: [
        {
          icon: "cpu",
          title: "Enterprise configuration",
          description:
            "Rulesets, tools, models, workflows, and people & teams — governance across your whole organisation.",
        },
        {
          icon: "terminal",
          title: "Workspaces & the agent",
          description:
            "Code editor, diagrams, docs, history, GitHub integration, and workspace-level settings.",
        },
        {
          icon: "book-open",
          title: "Advanced patterns",
          description:
            "Prompting best practices, agent rule patterns, and usage guides for production teams.",
        },
      ],
      cta: "View Training",
    },
  },
];
