import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Calendar, Clock, ExternalLink, Play, ChevronLeft, ChevronRight, Download, X } from "lucide-react";

const SPECTRUM_GRADIENT = "linear-gradient(135deg, #c2410c, #d97706, #ca8a04, #16a34a, #0891b2)";

const SESSION_NOTES = `# Build with Her — March 18, 2026 — 49m 36s

## Facilitators
Justin O'Connor, Tarak

## Purpose
- Continue Build with Her learning series
- Demonstrate a practical Infracodebase use case
- Introduce early version of Infracodebase University
- Gather community feedback

## Main Themes
- ClickOps to IaC modernization
- Azure infrastructure import and Terraform generation
- Shift-left remediation
- Live architecture visualization
- Compliance scoring and rule sets

## Demo
Justin led a live Azure demo showing: tenant, subscription, resource group, web app, app service plan, Azure Front Door, managed identity, Key Vault, virtual network, subnets, NSGs, private IP, VM for GitHub runner, WAF policy.

## What Infracodebase Generated
- Full architecture diagram with 92% layout quality score
- Terraform code across multiple files: security.tf, network.tf, compute.tf, database.tf, storage.tf, rbac.tf, and more
- Compliance evaluation: 58% score · 28 pass · 21 fail · 1 overridden against Azure Policy, Azure Well-Architected Framework, Terraform Configuration Language Style Guide, and Terraform Module Development Guidelines

## Key Point — Why Not Remediate Directly in Cloud
Direct cloud remediation increases environment drift. Code-first remediation is more auditable and consistent. Recommended sequence: import infra → establish Terraform baseline → merge → improve.

## Questions
- **Abby** asked if the agent can map ClickOps infra — yes.
- **Tawni** asked if manual cloud setup still matters — yes, foundations still matter.
- **Reilly** asked how rule sets work — they can be defined at enterprise level from internal standards or security frameworks.

## Closing
Infracodebase University is free and community-driven. Feedback encouraged on both the product and the university.
`;

const screenshots = [
  { src: "/session-photo-1.png", caption: "Session participants" },
  { src: "/session-photo-2.png", caption: "Session participants" },
  { src: "/design.png", caption: "Azure architecture diagram — 92% layout quality" },
  { src: "/code.png", caption: "Generated Terraform code — security.tf" },
  { src: "/compliance.png", caption: "Compliance score — 58% · 28 pass · 21 fail · 1 overridden" },
];

function generateICS() {
  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Infracodebase//Office Hours//EN
BEGIN:VEVENT
DTSTART;TZID=Europe/Berlin:20260325T170000
DURATION:PT1H
RRULE:FREQ=WEEKLY;BYDAY=WE
SUMMARY:Infracodebase Office Hours
DESCRIPTION:Weekly live office hours with the Infracodebase team.
END:VEVENT
END:VCALENDAR`;
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "infracodebase-office-hours.ics";
  a.click();
  URL.revokeObjectURL(url);
}

function downloadNotes() {
  const blob = new Blob([SESSION_NOTES], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "build-with-her-march-18-2026.md";
  a.click();
  URL.revokeObjectURL(url);
}

function SessionModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<"recording" | "screenshots" | "notes">("recording");
  const [screenshotIdx, setScreenshotIdx] = useState(0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-border/50 bg-card">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-1">Build with Her — ClickOps to IaC: Azure Infrastructure Modernization</h2>
          <p className="text-sm text-muted-foreground mb-4">March 18, 2026 · 49 min</p>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-border/50 mb-6">
            {(["recording", "screenshots", "notes"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                  tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Recording Tab */}
          {tab === "recording" && (
            <div>
              <div className="aspect-video rounded-lg bg-black/50 border border-border/30 flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                  <Play className="h-8 w-8 text-foreground ml-1" />
                </div>
              </div>
              <div className="flex gap-3">
                <a href="#" className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border border-border/50 text-foreground hover:bg-muted/50 transition-colors">
                  <ExternalLink className="h-4 w-4" /> Open recording
                </a>
                <button onClick={() => setTab("notes")} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border border-border/50 text-foreground hover:bg-muted/50 transition-colors">
                  View notes
                </button>
              </div>
            </div>
          )}

          {/* Screenshots Tab */}
          {tab === "screenshots" && (
            <div>
              <div className="relative mb-4">
                <img
                  src={screenshots[screenshotIdx].src}
                  alt={screenshots[screenshotIdx].caption}
                  className="w-full rounded-lg border border-border/30 object-contain max-h-[50vh]"
                />
                {screenshotIdx > 0 && (
                  <button
                    onClick={() => setScreenshotIdx(i => i - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}
                {screenshotIdx < screenshots.length - 1 && (
                  <button
                    onClick={() => setScreenshotIdx(i => i + 1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
              <p className="text-sm text-muted-foreground text-center mb-4">{screenshots[screenshotIdx].caption}</p>
              <div className="flex gap-2 justify-center">
                {screenshots.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setScreenshotIdx(i)}
                    className={`w-16 h-10 rounded border-2 overflow-hidden transition-all ${
                      i === screenshotIdx ? "border-primary" : "border-border/30 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={s.src} alt={s.caption} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {tab === "notes" && (
            <div>
              <div className="prose prose-invert prose-sm max-w-none mb-6">
                <h3>Build with Her — March 18, 2026 — 49m 36s</h3>
                <h4>Facilitators</h4>
                <p>Justin O'Connor, Tarak</p>
                <h4>Purpose</h4>
                <ul>
                  <li>Continue Build with Her learning series</li>
                  <li>Demonstrate a practical Infracodebase use case</li>
                  <li>Introduce early version of Infracodebase University</li>
                  <li>Gather community feedback</li>
                </ul>
                <h4>Main Themes</h4>
                <ul>
                  <li>ClickOps to IaC modernization</li>
                  <li>Azure infrastructure import and Terraform generation</li>
                  <li>Shift-left remediation</li>
                  <li>Live architecture visualization</li>
                  <li>Compliance scoring and rule sets</li>
                </ul>
                <h4>Demo</h4>
                <p>Justin led a live Azure demo showing: tenant, subscription, resource group, web app, app service plan, Azure Front Door, managed identity, Key Vault, virtual network, subnets, NSGs, private IP, VM for GitHub runner, WAF policy.</p>
                <h4>What Infracodebase Generated</h4>
                <ul>
                  <li>Full architecture diagram with 92% layout quality score</li>
                  <li>Terraform code across multiple files: security.tf, network.tf, compute.tf, database.tf, storage.tf, rbac.tf, and more</li>
                  <li>Compliance evaluation: 58% score · 28 pass · 21 fail · 1 overridden against Azure Policy, Azure Well-Architected Framework, Terraform Configuration Language Style Guide, and Terraform Module Development Guidelines</li>
                </ul>
                <h4>Key Point — Why Not Remediate Directly in Cloud</h4>
                <p>Direct cloud remediation increases environment drift. Code-first remediation is more auditable and consistent. Recommended sequence: import infra → establish Terraform baseline → merge → improve.</p>
                <h4>Questions</h4>
                <ul>
                  <li><strong>Abby</strong> asked if the agent can map ClickOps infra — yes.</li>
                  <li><strong>Tawni</strong> asked if manual cloud setup still matters — yes, foundations still matter.</li>
                  <li><strong>Reilly</strong> asked how rule sets work — they can be defined at enterprise level from internal standards or security frameworks.</li>
                </ul>
                <h4>Closing</h4>
                <p>Infracodebase University is free and community-driven. Feedback encouraged on both the product and the university.</p>
              </div>
              <button
                onClick={downloadNotes}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border border-border/50 text-foreground hover:bg-muted/50 transition-colors"
              >
                <Download className="h-4 w-4" /> Download notes (.md)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OfficeHours() {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmitQuestion = () => {
    if (!question.trim()) return;
    setSubmitted(true);
    setQuestion("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10 space-y-10">
        {/* SECTION 1 — HERO */}
        <section
          className="rounded-xl border border-border/50 overflow-hidden"
          style={{ background: "#0d0d0d" }}
        >
          <div className="h-1" style={{ background: SPECTRUM_GRADIENT }} />
          <div className="p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
            {/* Left */}
            <div className="flex-1 space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                NEXT SESSION
              </span>

              <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                Live Demo — Migrating Azure Infrastructure to AWS and GCP
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Live walkthrough of migrating an existing Azure environment to both AWS and GCP using Infracodebase. We'll scan the resources, generate multi-cloud Terraform, and show how the agent handles the translation automatically — no manual rewriting.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Wednesday, March 25, 2026</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 5:00 PM CET</span>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: SPECTRUM_GRADIENT }}
                >
                  Register for free
                </a>
                <button
                  onClick={generateICS}
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium border border-border/50 text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Calendar className="h-4 w-4" /> Add to calendar
                </button>
              </div>
            </div>

            {/* Right — Hosted by */}
            <div className="lg:w-72 shrink-0 rounded-lg border border-border/30 bg-white/[0.03] p-5 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hosted by</p>
              <div className="space-y-4">
                {[
                  { name: "Justin", photo: "/Justin.jpeg", title: "Founder, Infracodebase" },
                  { name: "Tarak", photo: "/Tarak.jpeg", title: "Co-Founder, Infracodebase" },
                ].map(host => (
                  <div key={host.name} className="flex items-center gap-3">
                    <img src={host.photo} alt={host.name} className="h-10 w-10 rounded-full object-cover border border-border/30" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{host.name}</p>
                      <p className="text-xs text-muted-foreground">{host.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — QUESTION SUBMISSION */}
        <section className="rounded-xl border border-border/50 p-6" style={{ background: "#0d0d0d" }}>
          <h2 className="text-lg font-semibold text-foreground mb-1">Submit a question</h2>
          <p className="text-sm text-muted-foreground mb-4">Ask anything — we'll cover it during the next live session.</p>
          <div className="flex gap-3">
            <input
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmitQuestion()}
              placeholder="Type your question..."
              className="flex-1 rounded-lg border border-border/50 bg-white/[0.03] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
            <button
              onClick={handleSubmitQuestion}
              disabled={!question.trim()}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              style={{ background: SPECTRUM_GRADIENT }}
            >
              Submit
            </button>
          </div>
          {submitted && (
            <p className="mt-3 text-sm text-emerald-400">Question submitted — we'll cover it on Wednesday.</p>
          )}
        </section>

        {/* SECTION 3 — PAST SESSIONS */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-1">Past Sessions</h2>
          <p className="text-sm text-muted-foreground mb-6">Click any session to watch the recording, view screenshots, and read the notes.</p>

          <div
            onClick={() => setModalOpen(true)}
            className="group rounded-xl border border-border/50 overflow-hidden cursor-pointer transition-all hover:border-border hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: "#0d0d0d" }}
          >
            <div className="flex flex-col sm:flex-row">
              {/* Thumbnail */}
              <div className="relative sm:w-72 shrink-0 aspect-video sm:aspect-auto overflow-hidden">
                <img src="/session-photo-1.png" alt="Session thumbnail" className="w-full h-full object-cover" />
                {/* Play overlay on hover */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="h-5 w-5 text-white ml-0.5" />
                  </div>
                </div>
                {/* Instructor avatars */}
                <div className="absolute bottom-2 left-2 flex -space-x-2">
                  <img src="/Justin.jpeg" alt="Justin" className="h-7 w-7 rounded-full border-2 border-[#0d0d0d] object-cover" />
                  <img src="/Tarak.jpeg" alt="Tarak" className="h-7 w-7 rounded-full border-2 border-[#0d0d0d] object-cover" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa" }}>
                      Real Infrastructure
                    </span>
                    <span className="text-xs text-muted-foreground">49 min</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    Build with Her — ClickOps to IaC: Azure Infrastructure Modernization
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Live demo: inspect manually provisioned Azure infrastructure, generate Terraform code with Infracodebase, establish a clean IaC baseline, and shift remediation left.
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-muted-foreground">March 18, 2026</span>
                  <span className="text-xs font-medium text-primary group-hover:underline">View session →</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <SessionModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </AppLayout>
  );
}
