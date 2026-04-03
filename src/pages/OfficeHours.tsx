import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useUser } from "@clerk/clerk-react";
import { AppLayout } from "@/components/AppLayout";
import {
  Calendar, Clock, ExternalLink, Play, ChevronLeft, ChevronRight,
  Download, X, Edit2, Check, Bold, Italic, Heading3, Pilcrow,
  List, Minus, ChevronDown, Share2, Heart, Link, Linkedin, Instagram, Video,
} from "lucide-react";

const SPECTRUM_GRADIENT = "linear-gradient(135deg, #c2410c, #d97706, #ca8a04, #16a34a, #0891b2)";

import justinPhoto from "@/assets/justin.jpeg";
import tarakPhoto from "@/assets/tarak.jpeg";

const JUSTIN_AVATAR = justinPhoto;
const TARAK_AVATAR = tarakPhoto;

const HOSTS = [
  { name: "Justin", initial: "J", role: "Founder, Infracodebase", avatar: JUSTIN_AVATAR },
  { name: "Tarak", initial: "T", role: "Co-Founder, Infracodebase", avatar: TARAK_AVATAR },
] as const;

function applyAvatarFallback(target: HTMLImageElement, name: string, size: number, border?: string) {
  target.style.display = "none";

  const parent = target.parentElement;
  if (!parent || parent.querySelector('[data-avatar-fallback="true"]')) return;

  parent.style.width = `${size}px`;
  parent.style.height = `${size}px`;
  parent.style.borderRadius = "50%";
  parent.style.overflow = "hidden";
  parent.style.background = "linear-gradient(135deg,#c2410c,#16a34a)";
  parent.style.display = "flex";
  parent.style.alignItems = "center";
  parent.style.justifyContent = "center";

  if (border) {
    parent.style.border = border;
  }

  const span = document.createElement("span");
  span.setAttribute("data-avatar-fallback", "true");
  span.style.cssText = `color:#fff;font-weight:700;font-size:${Math.max(12, Math.round(size * 0.36))}px;`;
  span.textContent = name.charAt(0);
  parent.appendChild(span);
}

const INITIAL_SESSION_NOTES = `<h2>Build with Her — March 18, 2026 — 49m 36s</h2>
<h3>Facilitators</h3>
<p>Justin O'Connor, Tarak</p>
<h3>Purpose</h3>
<ul>
<li>Continue Build with Her learning series</li>
<li>Demonstrate a practical Infracodebase use case</li>
<li>Introduce early version of Infracodebase University</li>
<li>Gather community feedback</li>
</ul>
<h3>Main Themes</h3>
<ul>
<li>ClickOps to IaC modernization</li>
<li>Azure infrastructure import and Terraform generation</li>
<li>Shift-left remediation</li>
<li>Live architecture visualization</li>
<li>Compliance scoring and rule sets</li>
</ul>
<h3>Demo</h3>
<p>Justin led a live Azure demo showing: tenant, subscription, resource group, web app, app service plan, Azure Front Door, managed identity, Key Vault, virtual network, subnets, NSGs, private IP, VM for GitHub runner, WAF policy.</p>
<h3>What Infracodebase Generated</h3>
<ul>
<li>Full architecture diagram with 92% layout quality score</li>
<li>Terraform code across multiple files: security.tf, network.tf, compute.tf, database.tf, storage.tf, rbac.tf, and more</li>
<li>Compliance evaluation: 58% score · 28 pass · 21 fail · 1 overridden against Azure Policy, Azure Well-Architected Framework, Terraform Configuration Language Style Guide, and Terraform Module Development Guidelines</li>
</ul>
<h3>Key Point — Why Not Remediate Directly in Cloud</h3>
<p>Direct cloud remediation increases environment drift. Code-first remediation is more auditable and consistent. Recommended sequence: import infra → establish Terraform baseline → merge → improve.</p>
<h3>Questions</h3>
<ul>
<li><strong>Abby</strong> asked if the agent can map ClickOps infra — yes.</li>
<li><strong>Tawni</strong> asked if manual cloud setup still matters — yes, foundations still matter.</li>
<li><strong>Reilly</strong> asked how rule sets work — they can be defined at enterprise level from internal standards or security frameworks.</li>
</ul>
<h3>Closing</h3>
<p>Infracodebase University is free and community-driven. Feedback encouraged on both the product and the university.</p>`;

const SESSION_NOTES_MD = `# Build with Her — March 18, 2026 — 49m 36s

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

const initialScreenshots = [
  { src: "/workshop-thumbnail.png", caption: "Session thumbnail" },
  { src: "/session-photo-1.png", caption: "Session participants" },
  { src: "/session-photo-2.png", caption: "Session participants" },
  { src: "/design.png", caption: "Azure architecture diagram — 92% layout quality" },
  { src: "/code.png", caption: "Generated Terraform code — security.tf" },
  { src: "/compliance.png", caption: "Compliance score — 58% · 28 pass · 21 fail · 1 overridden" },
];

const session1Comments = [
  {
    name: 'Comfort Benton', date: 'March 18, 2026', avatar: '/Comfort_Benton.jpeg',
    text: 'This session completely changed how I think about cloud infrastructure. The ClickOps to IaC demo was eye-opening.',
    upvotes: 12,
    reply: { name: 'Tarak', badge: 'Host', badgeColor: 'linear-gradient(90deg,#f5821f,#16a34a)', ring: '#f5821f', avatar: TARAK_AVATAR, text: "Thanks Comfort! The live mapping of existing infra is one of my favourite moments to demo — glad it landed. Next session we'll go even deeper on the remediation side.", upvotes: 4 }
  },
  {
    name: 'Tawni', date: 'March 18, 2026', avatar: '/Tawni.jpeg',
    text: 'I appreciated that manual cloud knowledge still matters. Helps me know where to focus as a beginner.',
    upvotes: 7, reply: null
  },
  {
    name: 'Reilly', date: 'March 18, 2026', avatar: '/Reilly.jpeg',
    text: 'The rule sets explanation was exactly what I needed. Finally understand how compliance scoring works.',
    upvotes: 9,
    answered: '38:22',
    reply: { name: 'Justin', badge: 'Host', badgeColor: 'linear-gradient(90deg,#009ddc,#963d97)', ring: '#009ddc', avatar: JUSTIN_AVATAR, text: "Glad it clicked! We covered compliance scoring at 38:22 in the recording — definitely rewatch that section, there's a lot of detail in there.", upvotes: 6 }
  },
  {
    name: 'Abby', date: 'March 18, 2026', avatar: '/Abby.jpeg',
    text: "Seeing the agent map existing ClickOps infra live was incredible. Can't wait to try it myself.",
    upvotes: 5, reply: null
  },
];

const session2Screenshots = [
  { src: "/workshops/workshop-2/moments/Screenshot_2026-03-25_at_18_00_48.png", caption: "Teams call — full group (15 attendees)" },
  { src: "/workshops/workshop-2/moments/Screenshot_2026-03-25_at_18_06_50.png", caption: "CLOUD_COMPARISON.md — Multi-Cloud API Gateway Architecture Comparison" },
  { src: "/workshops/workshop-2/moments/Screenshot_2026-03-25_at_18_07_30.png", caption: "PROGRESS.md — Azure APIM Secure Baseline Build Progress" },
  { src: "/workshops/workshop-2/moments/Screenshot_2026-03-25_at_18_07_45.png", caption: "Azure API Management diagram — 80% layout quality" },
  { src: "/workshops/workshop-2/moments/Screenshot_2026-03-25_at_18_07_59.png", caption: "AWS API Gateway diagram — 96% layout quality" },
  { src: "/workshops/workshop-2/moments/Screenshot_2026-03-25_at_18_08_43.png", caption: "GCP API Gateway diagram — 89% layout quality" },
  { src: "/workshops/workshop-2/moments/Screenshot_2026-03-25_at_18_00_48.png", caption: "Teams call — second group view" },
];

const session3Screenshots = [
  { src: "/workshops/workshop-3/moments/session-call.png", caption: "Teams call — full group" },
  { src: "/workshops/workshop-3/moments/slide-workflow.png", caption: "Guest: Cameron Walters — Teradata InfoSec" },
  { src: "/workshops/workshop-3/moments/workspaces.png", caption: "Tawni's Infracodebase workspaces" },
  { src: "/workshops/workshop-3/moments/new-workspace.png", caption: "New workspace — Infracodebase Agent" },
  { src: "/workshops/workshop-3/moments/templates.png", caption: "Public infrastructure templates" },
  { src: "/workshops/workshop-3/moments/workspace-agent.png", caption: "Agent context — uploading iterum.md rules" },
  { src: "/workshops/workshop-3/moments/slide-ssdlc.png", caption: "Slide — SDLC vs SSDLC: security from the first idea" },
  { src: "/workshops/workshop-3/moments/editor-100.png", caption: "Iterum Secure Template — 100% compliance score" },
  { src: "/workshops/workshop-3/moments/compliance-100.png", caption: "Architecture diagram — 100% layout quality" },
];

const SESSION3_NOTES_HTML = `<h2>Build with Her — April 1, 2026 — 1h 04m</h2>
<h3>Facilitators</h3>
<p>Tawni Glover, Tarak, Justin O'Connor</p>
<h3>Guest</h3>
<p>Cameron Walters — Teradata InfoSec (Application Security & Security Engineering)</p>
<h3>Purpose</h3>
<ul>
<li>Continue Build with Her learning series</li>
<li>Demonstrate shift-left security principles applied to a real Azure workspace</li>
<li>Introduce the concept of SSDLC vs traditional SDLC</li>
<li>Showcase community-led workspace iteration</li>
</ul>
<h3>Main Themes</h3>
<ul>
<li>Shift-left security — embedding security from the first idea</li>
<li>SSDLC vs SDLC — why bolting security on late creates debt</li>
<li>Enterprise rule sets and personal rule sets</li>
<li>Compliance scoring and workspace iteration</li>
<li>Context → Generate → Validate → Iterate workflow</li>
</ul>
<h3>Demo</h3>
<p>Tawni led the session, walking through her personal AI workflow for building a secure Azure baseline. She demonstrated how to combine personal rule sets with enterprise compliance validation using Infracodebase workspaces, iterating until reaching 100% compliance and 100% layout quality.</p>
<h3>Key Points</h3>
<ul>
<li><strong>Shostack's Four Questions:</strong> What are we working on? What can go wrong? What are we going to do about it? Did we do a good enough job?</li>
<li><strong>SDLC (bolted on late):</strong> No security thinking → no threat model → no security rules → too late to change → fingers crossed → security debt</li>
<li><strong>SSDLC (security from the first idea):</strong> Threat model & requirements → secure arch & data flow → governed generation → CI & sequential gates → signed & policy gate → logs & alerts</li>
<li><strong>Core workflow:</strong> Context → Generate → Validate → Iterate — every tool that touches your project has rules, one vocabulary across agents</li>
</ul>
<h3>Community Highlight</h3>
<p>Tawni was the first participant to combine personal rule sets with enterprise compliance validation, reaching 100% compliance and 100% layout quality in her Iterum Secure Template workspace.</p>
<h3>Community Contribution</h3>
<p>Tawni agreed to share her workspace publicly as a reusable template in Infracodebase University.</p>
<h3>Closing</h3>
<p>Cameron provided expert context on how shift-left security applies at enterprise scale. The session demonstrated that security isn't a phase — it's a mindset that starts before the first line of code.</p>`;

const SESSION3_NOTES_MD = `# Build with Her — April 1, 2026 — 1h 04m

## Facilitators
Tawni Glover, Tarak, Justin O'Connor

## Guest
Cameron Walters — Teradata InfoSec (Application Security & Security Engineering)

## Purpose
- Continue Build with Her learning series
- Demonstrate shift-left security principles applied to a real Azure workspace
- Introduce the concept of SSDLC vs traditional SDLC
- Showcase community-led workspace iteration

## Main Themes
- Shift-left security — embedding security from the first idea
- SSDLC vs SDLC — why bolting security on late creates debt
- Enterprise rule sets and personal rule sets
- Compliance scoring and workspace iteration
- Context → Generate → Validate → Iterate workflow

## Demo
Tawni led the session, walking through her personal AI workflow for building a secure Azure baseline. She demonstrated how to combine personal rule sets with enterprise compliance validation using Infracodebase workspaces, iterating until reaching 100% compliance and 100% layout quality.

## Key Points
- **Shostack's Four Questions:** What are we working on? What can go wrong? What are we going to do about it? Did we do a good enough job?
- **SDLC (bolted on late):** No security thinking → no threat model → no security rules → too late to change → fingers crossed → security debt
- **SSDLC (security from the first idea):** Threat model & requirements → secure arch & data flow → governed generation → CI & sequential gates → signed & policy gate → logs & alerts
- **Core workflow:** Context → Generate → Validate → Iterate — every tool that touches your project has rules, one vocabulary across agents

## Community Highlight
Tawni was the first participant to combine personal rule sets with enterprise compliance validation, reaching 100% compliance and 100% layout quality in her Iterum Secure Template workspace.

## Community Contribution
Tawni agreed to share her workspace publicly as a reusable template in Infracodebase University.

## Closing
Cameron provided expert context on how shift-left security applies at enterprise scale. The session demonstrated that security isn't a phase — it's a mindset that starts before the first line of code.
`;

const session3Comments = [
  {
    name: 'Tawni', date: 'April 1, 2026', avatar: '/avatars/Tawni-2.jpeg',
    text: 'This was such a meaningful session for me. Being the first to hit 100% compliance with personal + enterprise rules felt like a real milestone. Excited to share the template with everyone.',
    upvotes: 14,
    reply: { name: 'Tarak', badge: 'Host', badgeColor: 'linear-gradient(90deg,#f5821f,#16a34a)', ring: '#f5821f', avatar: '/avatars/tarak-2.jpeg', text: "You earned it Tawni — the way you iterated through the rules and got to 100% was exactly the workflow we designed for. Can't wait to see people fork your template.", upvotes: 7 }
  },
  {
    name: 'Shravani P', date: 'April 1, 2026', avatar: '/avatars/Shravani.jpeg',
    text: 'The SDLC vs SSDLC comparison really clicked for me. Seeing the difference between bolting security on late vs building it in from the start — that slide was everything.',
    upvotes: 11, reply: null
  },
  {
    name: 'Cameron Walters', date: 'April 1, 2026', avatar: '/avatars/Walters_Cameron.jpeg',
    text: 'Cameron\'s perspective from enterprise security was incredible. It\'s one thing to hear about shift-left in theory — hearing how it works at Teradata made it real.',
    upvotes: 9,
    reply: { name: 'Justin O\'Connor', badge: 'Host', badgeColor: 'linear-gradient(90deg,#009ddc,#963d97)', ring: '#009ddc', avatar: '/avatars/justin-2.jpeg', text: "Cameron brought exactly the kind of real-world context we want in these sessions. Security engineering at that scale is a different game.", upvotes: 5 }
  },
  {
    name: 'Megg', date: 'April 1, 2026', avatar: null,
    text: "The four questions framework from Shostack is something I'm going to use in every project now. Simple but powerful.",
    upvotes: 8, reply: null
  },
];

const SESSION2_NOTES_HTML = `<h2>Build with Her — March 25, 2026 — 56m 46s</h2>
<h3>Facilitators</h3>
<p>Justin O'Connor, Tarak</p>
<h3>Purpose</h3>
<ul>
<li>Continue Build with Her learning series</li>
<li>Share updates on Infracodebase University</li>
<li>Demonstrate a cross-cloud learning use case</li>
<li>Help community members understand how to translate architecture across Azure, AWS, and GCP</li>
<li>Encourage more community-led participation</li>
</ul>
<h3>Main Themes</h3>
<ul>
<li>Cross-cloud architecture translation</li>
<li>Azure to AWS to GCP mapping</li>
<li>Terraform as a multi-cloud learning language</li>
<li>Best practices and enterprise rule sets</li>
<li>Learning with AI while still building foundations</li>
<li>Trust, validation, and compliance</li>
<li>Community-led learning</li>
</ul>
<h3>University Update</h3>
<p>Tarak shared the latest version of Infracodebase University, including:</p>
<ul>
<li>Light and dark mode</li>
<li>Structured trainings with videos, assessments, and hands-on work</li>
<li>Workshop pages with notes and recordings</li>
<li>Dashboard, profile, feedback tab, and resources section</li>
</ul>
<h3>Demo</h3>
<p>Tarak created a new workspace from an uploaded architecture image and selected Terraform. The session focused on translating an Azure architecture into AWS and GCP equivalents.</p>
<h3>What Infracodebase Generated</h3>
<ul>
<li>Structured workspace prompt based on the uploaded architecture</li>
<li>Architecture explanation describing traffic flow, security layers, and design intent</li>
<li>Terraform code for the Azure implementation</li>
<li>AWS translation of the architecture</li>
<li>Partial GCP translation, with some behaviour Tarak noted needed further testing</li>
<li>Cross-cloud comparison documentation in progress</li>
</ul>
<h3>Key Point — Prototyping vs Production</h3>
<ul>
<li>Prototype mode is lighter and cheaper.</li>
<li>Production mode includes stronger defaults for security, redundancy, monitoring, and complexity.</li>
<li>For learners, Justin recommended being explicit that the goal is learning or prototyping.</li>
</ul>
<h3>Key Point — Learning with AI</h3>
<ul>
<li>AI makes building faster, but it does not remove the need for cloud literacy.</li>
<li>Tarak emphasised testing generated code for quality, security, compliance, and secrets before pushing it further.</li>
<li>Justin emphasised that learners still need enough vocabulary and understanding to guide the AI well and learn while building.</li>
</ul>
<h3>Key Point — Can We Trust the Output?</h3>
<ul>
<li>Tarak said no output should be trusted blindly and should always be validated with tools such as Terraform validate, Terraform plan, tfsec, and checkov.</li>
<li>Justin reframed this at enterprise level as verifiable trust: standards, rule sets, compliance scoring, and observability help reduce reliance on a few manual reviewers.</li>
</ul>
<h3>Questions</h3>
<ul>
<li><strong>Bhavika</strong> asked how best practices are chosen — the platform uses authoritative documentation plus enterprise and workspace rule sets.</li>
<li><strong>Comfort</strong> asked whether users can trust the output — answer: validate it, and use compliance to create verifiable trust.</li>
<li><strong>Tawni</strong> asked where to draw the line between learning and relying on AI — answer: AI should support learning, not replace understanding.</li>
<li><strong>Ria</strong> asked whether learners will receive certificates — Tarak said yes, the team is working on that.</li>
</ul>
<h3>Community Discussion</h3>
<ul>
<li>Justin invited community members to build a small use case and present it in a future session.</li>
<li>Divine volunteered to do this later in April.</li>
<li>Tawni also expressed interest, with some collaboration beforehand.</li>
<li>The group discussed creating a Discord space, and Tawni volunteered to create it.</li>
</ul>
<h3>Closing</h3>
<p>Tarak said he would share the notes, video, and workspace. Infracodebase University remains free and community-driven. Certificates and LinkedIn-ready brand assets are being developed. Feedback on the university, the product, and future session topics was encouraged.</p>`;

const SESSION2_NOTES_MD = `# Build with Her — March 25, 2026 — 56m 46s

## Facilitators
Justin O'Connor, Tarak

## Purpose
- Continue Build with Her learning series
- Share updates on Infracodebase University
- Demonstrate a cross-cloud learning use case
- Help community members understand how to translate architecture across Azure, AWS, and GCP
- Encourage more community-led participation

## Main Themes
- Cross-cloud architecture translation
- Azure to AWS to GCP mapping
- Terraform as a multi-cloud learning language
- Best practices and enterprise rule sets
- Learning with AI while still building foundations
- Trust, validation, and compliance
- Community-led learning

## University Update
Tarak shared the latest version of Infracodebase University, including:
- Light and dark mode
- Structured trainings with videos, assessments, and hands-on work
- Workshop pages with notes and recordings
- Dashboard, profile, feedback tab, and resources section

## Demo
Tarak created a new workspace from an uploaded architecture image and selected Terraform. The session focused on translating an Azure architecture into AWS and GCP equivalents.

## What Infracodebase Generated
- Structured workspace prompt based on the uploaded architecture
- Architecture explanation describing traffic flow, security layers, and design intent
- Terraform code for the Azure implementation
- AWS translation of the architecture
- Partial GCP translation, with some behaviour Tarak noted needed further testing
- Cross-cloud comparison documentation in progress

## Key Point — Prototyping vs Production
- Prototype mode is lighter and cheaper.
- Production mode includes stronger defaults for security, redundancy, monitoring, and complexity.
- For learners, Justin recommended being explicit that the goal is learning or prototyping.

## Key Point — Learning with AI
- AI makes building faster, but it does not remove the need for cloud literacy.
- Tarak emphasised testing generated code for quality, security, compliance, and secrets before pushing it further.
- Justin emphasised that learners still need enough vocabulary and understanding to guide the AI well and learn while building.

## Key Point — Can We Trust the Output?
- Tarak said no output should be trusted blindly and should always be validated with tools such as Terraform validate, Terraform plan, tfsec, and checkov.
- Justin reframed this at enterprise level as verifiable trust: standards, rule sets, compliance scoring, and observability help reduce reliance on a few manual reviewers.

## Questions
- **Bhavika** asked how best practices are chosen — the platform uses authoritative documentation plus enterprise and workspace rule sets.
- **Comfort** asked whether users can trust the output — answer: validate it, and use compliance to create verifiable trust.
- **Tawni** asked where to draw the line between learning and relying on AI — answer: AI should support learning, not replace understanding.
- **Ria** asked whether learners will receive certificates — Tarak said yes, the team is working on that.

## Community Discussion
- Justin invited community members to build a small use case and present it in a future session.
- Divine volunteered to do this later in April.
- Tawni also expressed interest, with some collaboration beforehand.
- The group discussed creating a Discord space, and Tawni volunteered to create it.

## Closing
Tarak said he would share the notes, video, and workspace. Infracodebase University remains free and community-driven. Certificates and LinkedIn-ready brand assets are being developed. Feedback on the university, the product, and future session topics was encouraged.
`;

const session2Comments = [
  {
    name: 'Comfort Benton', date: 'March 25, 2026', avatar: '/Comfort_Benton.jpeg',
    text: 'Seeing the agent translate Azure to AWS and GCP live was mind-blowing. I didn\'t realise how transferable the concepts were until I saw the service mapping side by side.',
    upvotes: 11,
    reply: { name: 'Tarak', badge: 'Host', badgeColor: 'linear-gradient(90deg,#f5821f,#16a34a)', ring: '#f5821f', avatar: TARAK_AVATAR, text: "That's exactly why we built the comparison doc — glad it landed! The mapping table is a great reference to keep.", upvotes: 5 }
  },
  {
    name: 'Tawni', date: 'March 25, 2026', avatar: '/Tawni.jpeg',
    text: 'The conversation about AI not replacing cloud literacy really stuck with me. I appreciated that you framed it as "AI helps you go faster but you still need the vocabulary."',
    upvotes: 9, reply: null
  },
  {
    name: 'Divine Odazie', date: 'March 25, 2026', avatar: '/workshops/workshop-2/avatars/Divine.jpeg',
    text: "I'm pumped to do a community session in April. Already thinking about what use case to bring.",
    upvotes: 8,
    reply: { name: 'Justin', badge: 'Host', badgeColor: 'linear-gradient(90deg,#009ddc,#963d97)', ring: '#009ddc', avatar: JUSTIN_AVATAR, text: "Can't wait Divine — reach out beforehand and we'll make sure you have everything you need.", upvotes: 4 }
  },
  {
    name: 'Bhavika', date: 'March 25, 2026', avatar: '/workshops/workshop-2/avatars/Bhavika.jpeg',
    text: 'I asked about how best practices are chosen and the answer really helped — knowing it pulls from authoritative docs plus enterprise rule sets makes it feel much more trustworthy.',
    upvotes: 7, reply: null
  },
  {
    name: 'Ria Choi', date: 'March 25, 2026', avatar: '/workshops/workshop-2/avatars/Ria_Choi.jpeg',
    text: 'The prototype vs production distinction was something I hadn\'t thought about before. Really useful framing for how to approach learning projects.',
    upvotes: 6,
    answered: '41:15',
    reply: { name: 'Justin', badge: 'Host', badgeColor: 'linear-gradient(90deg,#009ddc,#963d97)', ring: '#009ddc', avatar: JUSTIN_AVATAR, text: "Glad this clicked — we covered the prototype/production modes at 41:15 in the recording.", upvotes: 3 }
  },
];


/* ── Inline editable text ── */
function InlineField({
  value, onChange, editing, multiline, className,
}: {
  value: string; onChange: (v: string) => void; editing: boolean; multiline?: boolean; className?: string;
}) {
  const [draft, setDraft] = useState(value);
  const [active, setActive] = useState(false);

  useEffect(() => { setDraft(value); }, [value]);

  if (!editing) return <span className={className}>{value}</span>;
  if (!active) {
    return (
      <span
        className={`${className} cursor-pointer rounded px-1 -mx-1 transition-colors hover:bg-cyan-500/10`}
        onClick={() => setActive(true)}
      >{value}</span>
    );
  }

  const confirm = () => { onChange(draft); setActive(false); };
  const cancel = () => { setDraft(value); setActive(false); };

  if (multiline) {
    return (
      <span className="inline-flex flex-col gap-1 w-full">
        <textarea
          value={draft}
          onChange={e => setDraft(e.target.value)}
          className="w-full rounded border border-border/50 bg-white/[0.03] px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500/50 resize-y min-h-[60px]"
          autoFocus
        />
        <span className="flex gap-1">
          <button onClick={confirm} className="p-1 rounded hover:bg-cyan-500/20 text-cyan-400"><Check className="h-3.5 w-3.5" /></button>
          <button onClick={cancel} className="p-1 rounded hover:bg-red-500/20 text-red-400"><X className="h-3.5 w-3.5" /></button>
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1">
      <input
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") confirm(); if (e.key === "Escape") cancel(); }}
        className="rounded border border-border/50 bg-white/[0.03] px-2 py-0.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
        autoFocus
      />
      <button onClick={confirm} className="p-1 rounded hover:bg-cyan-500/20 text-cyan-400"><Check className="h-3.5 w-3.5" /></button>
      <button onClick={cancel} className="p-1 rounded hover:bg-red-500/20 text-red-400"><X className="h-3.5 w-3.5" /></button>
    </span>
  );
}

/* ── Photo Lightbox (Airbnb-style fullscreen) ── */
function Lightbox({
  images, index, onClose, onNav,
}: {
  images: { src: string; caption: string }[]; index: number; onClose: () => void; onNav: (i: number) => void;
}) {
  const total = images.length;
  const [likedPhotos, setLikedPhotos] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({ 0: 12, 1: 8, 2: 5, 3: 7, 4: 4, 5: 3 });
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [instaCopied, setInstaCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav((index - 1 + total) % total);
      if (e.key === "ArrowRight") onNav((index + 1) % total);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [index, total, onClose, onNav]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) setShareOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleLike = () => {
    const wasLiked = likedPhotos[index];
    setLikedPhotos(p => ({ ...p, [index]: !wasLiked }));
    setLikeCounts(c => ({ ...c, [index]: (c[index] || 0) + (wasLiked ? -1 : 1) }));
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = images[index].src;
    a.download = `infracodebase-${index + 1}.jpg`;
    a.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://university.infracodebase.com/workshops?photo=${index}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://university.infracodebase.com/workshops`, '_blank');
    setShareOpen(false);
  };

  const handleShareInsta = () => {
    navigator.clipboard.writeText(`https://university.infracodebase.com/workshops`);
    setInstaCopied(true);
    setTimeout(() => setInstaCopied(false), 3000);
    setShareOpen(false);
  };

  const actionBtnStyle: React.CSSProperties = {
    background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)',
    fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px',
    cursor: 'pointer', transition: 'all 0.15s', padding: '6px 10px', borderRadius: '6px',
  };

  const shareOptionStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
    color: '#cbd5e1', fontSize: '13px', borderRadius: '7px', width: '100%',
    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' as const,
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.97)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 20 }}>
        <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '14px', cursor: 'pointer' }}>
          <X className="h-5 w-5" /> Close
        </button>
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 500 }}>{index + 1} / {total}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href={images[index].src}
            download={`infracodebase-workshop-${index + 1}.jpg`}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', color: '#fff', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}
          >
            <Download className="h-4 w-4" /> Download
          </a>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShareOpen(v => !v)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: shareOpen ? '#2d3748' : 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', color: '#fff', fontSize: '14px', fontWeight: 500 }}
            >
              <Share2 className="h-4 w-4" /> Share
            </button>
          {shareOpen && (
            <>
              <div onClick={() => setShareOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 1999 }} />
              <div style={{ position: 'absolute', top: '110%', right: 0, background: '#1e2a3a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '8px', minWidth: '200px', zIndex: 2000, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
                {[
                  {
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
                    label: 'Copy link',
                    action: () => { navigator.clipboard.writeText('https://university.infracodebase.com/workshops'); setShareOpen(false); }
                  },
                  {
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                    label: 'Share on X',
                    action: () => { window.open('https://twitter.com/intent/tweet?url=https%3A%2F%2Funiversity.infracodebase.com%2Foffice-hours&text=Check%20out%20this%20Infracodebase%20Workshop', '_blank'); setShareOpen(false); }
                  },
                  {
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
                    label: 'Share on LinkedIn',
                    action: () => { window.open('https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Funiversity.infracodebase.com%2Foffice-hours', '_blank'); setShareOpen(false); }
                  },
                ].map(({ icon, label, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', background: 'none', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#e2e8f0', fontSize: '14px', fontWeight: 500, textAlign: 'left' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                  >
                    {icon}{label}
                  </button>
                ))}
              </div>
            </>
          )}
          </div>
        </div>
      </div>

      {/* Image area */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '70px 80px 120px', pointerEvents: 'none' }}>
        <img key={index} src={images[index].src} alt={images[index].caption} style={{ maxWidth: '90vw', maxHeight: '75vh', objectFit: 'contain', transition: 'opacity 0.2s', pointerEvents: 'auto' }} />
      </div>

      {/* Left arrow */}
      <button
        onClick={() => onNav((index - 1 + total) % total)}
        style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 20, width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', transition: 'background 0.15s' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => onNav((index + 1) % total)}
        style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 20, width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', transition: 'background 0.15s' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Actions bar */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '4px' }}>
        <button onClick={handleDownload} style={actionBtnStyle}
          onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <Download className="h-4 w-4" /> Download
        </button>
        <button onClick={toggleLike} style={{ ...actionBtnStyle, color: likedPhotos[index] ? '#fb7185' : 'rgba(255,255,255,0.8)' }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <Heart className="h-4 w-4" fill={likedPhotos[index] ? '#fb7185' : 'none'} /> {likeCounts[index] || 0}
        </button>
        <div ref={shareRef} style={{ position: 'relative' }}>
          <button onClick={() => setShareOpen(o => !o)} style={actionBtnStyle}
            onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Share2 className="h-4 w-4" /> Share
          </button>
          {shareOpen && (
            <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', background: '#0b1220', border: '1px solid #25405f', borderRadius: '10px', padding: '6px', minWidth: '200px', zIndex: 1100 }}>
              <button onClick={handleCopyLink} style={shareOptionStyle}
                onMouseEnter={e => (e.currentTarget.style.background = '#162035')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                <Link className="h-4 w-4" /> {copied ? 'Copied!' : 'Copy link'}
              </button>
              <button onClick={handleShareLinkedIn} style={shareOptionStyle}
                onMouseEnter={e => (e.currentTarget.style.background = '#162035')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                <Linkedin className="h-4 w-4" /> Share on LinkedIn
              </button>
              <button onClick={handleShareInsta} style={shareOptionStyle}
                onMouseEnter={e => (e.currentTarget.style.background = '#162035')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                <Instagram className="h-4 w-4" /> {instaCopied ? 'Link copied — paste in your story' : 'Share on Instagram'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      <p style={{ textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>{images[index].caption}</p>

      {/* Thumbnail strip */}
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => onNav(i)}
            style={{
              width: '56px', height: '36px', borderRadius: '4px', overflow: 'hidden',
              border: i === index ? '2px solid #22d3ee' : '2px solid transparent',
              opacity: i === index ? 1 : 0.5, cursor: 'pointer', padding: 0, background: 'none',
              transition: 'opacity 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { if (i !== index) e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={e => { if (i !== index) e.currentTarget.style.opacity = '0.5'; }}
          >
            <img src={img.src} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Calendar Dropdown ── */
function CalendarDropdown() {
  const [calOpen, setCalOpen] = useState(false);
  const calRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (calRef.current && !calRef.current.contains(e.target as Node)) {
        setCalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const teamsUrl = "https://teams.microsoft.com/meet/2873768926095?p=24ECEiepy6bHQMKLa4";
  const sessionTitle = "Shifting Left: Building a Secure Azure Baseline";
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(sessionTitle)}&dates=20260401T150000Z/20260401T160000Z&details=Live+workshop+by+Infracodebase+University.+Join:+${encodeURIComponent(teamsUrl)}&location=${encodeURIComponent(teamsUrl)}&recur=RRULE:FREQ%3DWEEKLY;BYDAY%3DWE`;
  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(sessionTitle)}&startdt=2026-04-01T15:00:00Z&enddt=2026-04-01T16:00:00Z&body=Live+workshop+by+Infracodebase+University.+Join:+${encodeURIComponent(teamsUrl)}&location=${encodeURIComponent(teamsUrl)}&allday=false`;

  const handleICS = () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Infracodebase University//EN',
      'BEGIN:VEVENT',
      'DTSTART;TZID=Europe/Paris:20260401T170000',
      'DTEND;TZID=Europe/Paris:20260401T180000',
      `SUMMARY:${sessionTitle}`,
      `DESCRIPTION:Live workshop by Infracodebase University. Join: ${teamsUrl}`,
      `LOCATION:${teamsUrl}`,
      'RRULE:FREQ=WEEKLY;BYDAY=WE',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'infracodebase-office-hours.ics';
    a.click();
    setCalOpen(false);
  };

  const optionStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'hsl(var(--foreground))',
    fontSize: '13px',
    borderRadius: '7px',
    textAlign: 'left' as const,
  };

  return (
    <div ref={calRef} style={{ position: 'relative', zIndex: 50 }}>
      <button
        onClick={() => setCalOpen(o => !o)}
        style={{
          background: SPECTRUM_GRADIENT,
          color: 'white',
          fontWeight: 700,
          fontSize: '14px',
          border: 'none',
          borderRadius: '9px',
          padding: '11px 22px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Calendar className="h-4 w-4" /> Add to calendar <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {calOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '10px',
            minWidth: '240px',
            padding: '6px',
            zIndex: 50,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <button
            onClick={() => { window.open(googleUrl, '_blank'); setCalOpen(false); }}
            style={optionStyle}
            onMouseEnter={e => (e.currentTarget.style.background = 'hsl(var(--muted))')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            <ExternalLink size={14} /> Google Calendar
          </button>
          <button
            onClick={() => { window.open(outlookUrl, '_blank'); setCalOpen(false); }}
            style={optionStyle}
            onMouseEnter={e => (e.currentTarget.style.background = 'hsl(var(--muted))')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            <ExternalLink size={14} /> Microsoft Outlook
          </button>
          <button
            onClick={handleICS}
            style={optionStyle}
            onMouseEnter={e => (e.currentTarget.style.background = 'hsl(var(--muted))')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            <Download size={14} /> Apple / Other (.ics)
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Rich Text Editor ── */
function NotesEditor({
  initialHTML, onDownload, readOnly = false,
}: {
  initialHTML: string; onDownload: (text: string) => void; readOnly?: boolean;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [savedHTML, setSavedHTML] = useState(initialHTML);

  const exec = (cmd: string, val: string | null = null) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val ?? undefined);
  };

  const handleSave = () => {
    if (editorRef.current) {
      setSavedHTML(editorRef.current.innerHTML);
      setIsDirty(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleDiscard = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = savedHTML;
      setIsDirty(false);
    }
  };

  const handleDownloadNotes = () => {
    const text = editorRef.current?.innerText || "";
    onDownload(text);
  };

  const btnCls = "p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors";

  if (readOnly) {
    return (
      <div>
        <style>{`
          .notes-readonly h2 { color:hsl(var(--foreground)); font-size:16px; font-weight:800; border-bottom:1px solid hsl(var(--border)); padding-bottom:6px; margin:20px 0 8px; }
          .notes-readonly h3 { color:hsl(var(--foreground)); font-size:14px; font-weight:700; margin:16px 0 6px; }
          .notes-readonly p { color:hsl(var(--muted-foreground)); margin:4px 0; line-height:1.8; }
          .notes-readonly ul { margin:4px 0 4px 16px; }
          .notes-readonly li { color:hsl(var(--muted-foreground)); margin:2px 0; }
          .notes-readonly hr { border:none; border-top:1px solid hsl(var(--border)); margin:12px 0; }
          .notes-readonly strong { color:hsl(var(--foreground)); font-weight:700; }
        `}</style>
        <div className="relative">
          <span className="absolute top-3 right-3 text-xs font-mono text-muted-foreground/40 uppercase tracking-wider">Read only</span>
          <div
            className="notes-readonly border border-border/50 rounded-lg p-4 min-h-[300px] text-sm bg-card"
            dangerouslySetInnerHTML={{ __html: initialHTML }}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-muted-foreground">These notes are maintained by the workshop hosts.</p>
          <button
            onClick={handleDownloadNotes}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border border-border/50 text-foreground hover:bg-muted/50 transition-colors"
          >
            <Download className="h-4 w-4" /> Download notes (.md)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <style>{`
        [contenteditable] h2 { color:hsl(var(--foreground)); font-size:16px; font-weight:800; border-bottom:1px solid hsl(var(--border)); padding-bottom:6px; margin:20px 0 8px; }
        [contenteditable] h3 { color:hsl(var(--foreground)); font-size:14px; font-weight:700; margin:16px 0 6px; }
        [contenteditable] p { color:hsl(var(--muted-foreground)); margin:4px 0; line-height:1.8; }
        [contenteditable] ul { margin:4px 0 4px 16px; }
        [contenteditable] li { color:hsl(var(--muted-foreground)); margin:2px 0; }
        [contenteditable] hr { border:none; border-top:1px solid hsl(var(--border)); margin:12px 0; }
        [contenteditable] strong { color:hsl(var(--foreground)); font-weight:700; }
        [contenteditable]:focus { outline:none; border-color:rgba(34,211,238,0.25); caret-color:#22d3ee; }
      `}</style>

      {/* Toolbar */}
      <div className="flex items-center gap-0.5 border border-border/50 rounded-t-lg px-2 py-1.5 bg-muted/30">
        <button onClick={() => exec("bold")} className={btnCls} title="Bold"><Bold className="h-4 w-4" /></button>
        <button onClick={() => exec("italic")} className={btnCls} title="Italic"><Italic className="h-4 w-4" /></button>
        <button onClick={() => exec("formatBlock", "h3")} className={btnCls} title="Heading"><Heading3 className="h-4 w-4" /></button>
        <button onClick={() => exec("formatBlock", "p")} className={btnCls} title="Paragraph"><Pilcrow className="h-4 w-4" /></button>
        <button onClick={() => exec("insertUnorderedList")} className={btnCls} title="Bullet List"><List className="h-4 w-4" /></button>
        <button onClick={() => exec("insertHorizontalRule")} className={btnCls} title="Divider"><Minus className="h-4 w-4" /></button>
        <div className="flex-1" />
        {isDirty && (
          <button onClick={handleDiscard} className="px-3 py-1 text-xs rounded border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            Discard
          </button>
        )}
        <button onClick={handleSave} className="px-3 py-1 text-xs rounded font-medium text-white transition-opacity hover:opacity-90 ml-1" style={{ background: SPECTRUM_GRADIENT }}>
          Save
        </button>
        {saved && <span className="text-xs text-emerald-400 ml-2">Saved!</span>}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => setIsDirty(true)}
        className="border border-t-0 border-border/50 rounded-b-lg p-4 min-h-[300px] text-sm focus:outline-none bg-card"
        dangerouslySetInnerHTML={{ __html: savedHTML }}
      />

      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-muted-foreground">Use the toolbar to format notes. Changes are saved locally.</p>
        <button
          onClick={handleDownloadNotes}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border border-border/50 text-foreground hover:bg-muted/50 transition-colors"
        >
          <Download className="h-4 w-4" /> Download notes (.md)
        </button>
      </div>
    </div>
  );
}

/* ── Session Modal ── */
function SessionModal({
  open, onClose, screenshots: shots, isTarak, title, subtitle, sessionComments, notesHTML, notesMD, downloadFilename, youtubeEmbedUrl, sessionUrl,
}: {
  open: boolean; onClose: () => void; screenshots: { src: string; caption: string }[]; isTarak: boolean;
  title: string; subtitle: string; sessionComments: any[]; notesHTML: string; notesMD: string; downloadFilename: string; youtubeEmbedUrl?: string; sessionUrl?: string;
}) {
  const { user } = useUser();
  const isAdmin = (user?.publicMetadata as Record<string, unknown>)?.role === "admin";
  const canEditNotes = isAdmin;
  const [tab, setTab] = useState<"recording" | "screenshots" | "notes">("recording");
  const [screenshotIdx, setScreenshotIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [captions, setCaptions] = useState(shots.map(s => s.caption));
  const [captionEditing, setCaptionEditing] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Comments
  const [comments, setComments] = useState<{name: string; date: string; text: string; avatar?: string; replies?: any[]}[]>([]);
  const [commentInput, setCommentInput] = useState("");

  // Uploadable avatars from localStorage (same keys as hero)
  const [justinPhoto, setJustinPhotoState] = useState<string | null>(() => localStorage.getItem('office-hours-photo-justin'));
  const [tarakPhoto, setTarakPhotoState] = useState<string | null>(() => localStorage.getItem('office-hours-photo-tarak'));
  const justinRef = useRef<HTMLInputElement>(null);
  const tarakRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>, key: string, setter: (v: string | null) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const val = ev.target?.result as string;
      setter(val);
      localStorage.setItem(key, val);
    };
    reader.readAsDataURL(file);
  };

  const openLightbox = (i: number) => { setLightboxIndex(i); setLightboxOpen(true); };
  const imagesWithCaptions = shots.map((s, i) => ({ src: s.src, caption: captions[i] }));

  if (!open) return null;

  const avatarData = [
    { ...HOSTS[0], photo: justinPhoto, setter: setJustinPhotoState, ref: justinRef, key: 'office-hours-photo-justin' },
    { ...HOSTS[1], photo: tarakPhoto, setter: setTarakPhotoState, ref: tarakRef, key: 'office-hours-photo-tarak' },
  ];

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 1000 }}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} style={{ zIndex: 1000 }} />
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-border/50 bg-card" style={{ zIndex: 1001 }}>
          <button onClick={onClose} className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>

          <div className="p-6">
            {/* Header with uploadable instructor photos */}
            <div className="flex items-center gap-3 mb-1">
              <div className="flex -space-x-2">
                {avatarData.map(av => (
                  <div key={av.name} style={{ position: 'relative', cursor: isTarak ? 'pointer' : 'default' }} onClick={() => isTarak && av.ref.current?.click()}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #1c2e47', flexShrink: 0 }}>
                      <img
                        src={av.photo || av.avatar}
                        alt={av.name}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                        onError={(e) => applyAvatarFallback(e.currentTarget, av.name, 36, '2px solid #1c2e47')}
                      />
                    </div>
                    {isTarak && (
                      <>
                        <div
                          style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.15s' }}
                          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                          onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                        >
                          <span style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>EDIT</span>
                        </div>
                        <input ref={av.ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleAvatarUpload(e, av.key, av.setter)} />
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-foreground">{title}</h2>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
              {sessionUrl && (
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(sessionUrl);
                      setShareCopied(true);
                      setTimeout(() => setShareCopied(false), 2000);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'none', cursor: 'pointer', color: shareCopied ? '#22c55e' : 'hsl(var(--muted-foreground))', fontSize: '13px', fontWeight: 500, transition: 'all 0.15s' }}
                  >
                    {shareCopied ? <Check className="h-3.5 w-3.5" /> : <Link className="h-3.5 w-3.5" />}
                    {shareCopied ? 'Link copied!' : 'Share'}
                  </button>
                  <button
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(sessionUrl)}`, '_blank', 'noopener')}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'none', cursor: 'pointer', color: 'hsl(var(--muted-foreground))', fontSize: '13px', fontWeight: 500, transition: 'all 0.15s' }}
                  >
                    <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                  </button>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-border/50 mb-6 mt-4">
              {(["recording", "screenshots", "notes"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t === "recording" ? "Recording" : t === "screenshots" ? `Our Moments (${shots.length})` : "Notes"}
                </button>
              ))}
            </div>

            {/* Recording */}
            {tab === "recording" && (
              <div>
                {youtubeEmbedUrl ? (
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '10px', overflow: 'hidden' }}>
                    <iframe
                      src={youtubeEmbedUrl}
                      title={title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    />
                  </div>
                ) : (
                  <>
                    <div style={{ background: 'hsl(var(--muted))', border: '1px solid hsl(var(--border))', borderRadius: '12px', padding: '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', minHeight: '300px' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'hsl(var(--border))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Video className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p style={{ fontSize: '16px', fontWeight: 600, color: 'hsl(var(--foreground))', margin: 0 }}>Recording coming soon</p>
                      <p style={{ fontSize: '13px', color: 'hsl(var(--muted-foreground))', margin: 0, textAlign: 'center', maxWidth: '320px' }}>This session wasn't recorded. Future sessions will be available here within 24 hours.</p>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button onClick={() => setTab("notes")} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border border-border/50 text-foreground hover:bg-muted/50 transition-colors">
                        View notes
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Screenshots */}
            {tab === "screenshots" && (
              <div>
                <div className="relative mb-4">
                  <img
                    src={shots[screenshotIdx].src}
                    alt={captions[screenshotIdx]}
                    className="w-full rounded-lg border border-border/30 object-contain max-h-[50vh] cursor-pointer"
                    onClick={() => openLightbox(screenshotIdx)}
                  />
                  {screenshotIdx > 0 && (
                    <button
                      onClick={() => setScreenshotIdx(i => i - 1)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                  )}
                  {screenshotIdx < shots.length - 1 && (
                    <button
                      onClick={() => setScreenshotIdx(i => i + 1)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Editable caption */}
                <div className="text-sm text-muted-foreground text-center mb-4 flex items-center justify-center gap-2">
                  {captionEditing ? (
                    <InlineField
                      value={captions[screenshotIdx]}
                      onChange={v => setCaptions(c => c.map((cap, i) => i === screenshotIdx ? v : cap))}
                      editing
                      className="text-sm text-muted-foreground"
                    />
                  ) : (
                    <>
                      <span>{captions[screenshotIdx]}</span>
                      {isTarak && <button onClick={() => setCaptionEditing(true)} className="p-1 rounded hover:bg-white/10 text-muted-foreground"><Edit2 className="h-3 w-3" /></button>}
                    </>
                  )}
                  {captionEditing && isTarak && (
                    <button onClick={() => setCaptionEditing(false)} className="p-1 rounded hover:bg-white/10 text-cyan-400"><Check className="h-3 w-3" /></button>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 justify-center">
                  {shots.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => { setScreenshotIdx(i); openLightbox(i); }}
                      className={`w-16 h-10 rounded border-2 overflow-hidden transition-all ${
                        i === screenshotIdx ? "border-primary" : "border-border/30 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={s.src} alt={captions[i]} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* ── Comments Section ── */}
<div style={{ marginTop: '40px', borderTop: '1px solid hsl(var(--border))', paddingTop: '28px' }}>
  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'hsl(var(--foreground))', marginBottom: '20px', fontFamily: "'Courier New', monospace" }}>What our community said</h3>

  {/* Compose */}
  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '24px' }}>
    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#c2410c,#d97706,#16a34a,#0891b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>Y</div>
    <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
      <input
        type="text"
        value={commentInput}
        onChange={e => setCommentInput(e.target.value)}
        placeholder="Share your thoughts on this session..."
        style={{ flex: 1, background: 'hsl(var(--muted))', border: '1px solid hsl(var(--border))', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: 'hsl(var(--foreground))' }}
      />
      <button
        onClick={() => {
          if (!commentInput.trim()) return;
          setComments(c => [...c, { name: 'You', date: 'Just now', text: commentInput }]);
          setCommentInput("");
        }}
        style={{ background: SPECTRUM_GRADIENT, color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
      >Post</button>
    </div>
  </div>

  {/* User-added */}
  {comments.map((c, i) => (
    <div key={`user-${i}`} style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#c2410c,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{c.name[0]}</div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '2px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'hsl(var(--foreground))' }}>{c.name}</span>
          <span style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))' }}>{c.date}</span>
        </div>
        <p style={{ fontSize: '13px', color: 'hsl(var(--muted-foreground))', lineHeight: 1.7, margin: 0 }}>{c.text}</p>
      </div>
    </div>
  ))}

  {/* Pre-seeded */}
  {sessionComments.map((c: any, i: number) => (
    <div key={i}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: c.reply ? '12px' : '20px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1.5px solid hsl(var(--border))' }}>
          {c.avatar ? (
            <img src={c.avatar} alt={c.name} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '50%' }} onError={(e) => applyAvatarFallback(e.currentTarget, c.name, 36)} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#c2410c,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#fff' }}>{c.name[0]}</div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'hsl(var(--foreground))' }}>{c.name}</span>
            <span style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))' }}>{c.date}</span>
            {c.answered && <span style={{ fontSize: '12px', color: '#22d3ee', background: 'rgba(34,211,238,0.1)', padding: '1px 6px', borderRadius: '4px' }}>Answered at {c.answered}</span>}
          </div>
          <p style={{ fontSize: '13px', color: 'hsl(var(--muted-foreground))', lineHeight: 1.7, margin: '0 0 6px' }}>{c.text}</p>
          <button style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'hsl(var(--muted-foreground))', background: 'none', border: 'none', cursor: 'pointer' }}>▲ {c.upvotes}</button>
        </div>
      </div>

      {c.reply && (
        <div style={{ marginLeft: '42px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: `1.5px solid ${c.reply.ring}` }}>
              <img src={c.reply.avatar} alt={c.reply.name} style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '50%' }} onError={(e) => applyAvatarFallback(e.currentTarget, c.reply.name, 32)} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'hsl(var(--foreground))' }}>{c.reply.name}</span>
                <span style={{ fontSize: '12px', padding: '2px 7px', borderRadius: '99px', background: c.reply.badgeColor, color: '#fff', fontWeight: 600 }}>{c.reply.badge}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'hsl(var(--muted-foreground))', lineHeight: 1.7, margin: '0 0 6px' }}>{c.reply.text}</p>
              <button style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'hsl(var(--muted-foreground))', background: 'none', border: 'none', cursor: 'pointer' }}>▲ {c.reply.upvotes}</button>
            </div>
          </div>
        </div>
      )}
      {i < sessionComments.length - 1 && <div style={{ borderTop: '1px solid hsl(var(--border))', marginBottom: '20px' }} />}
    </div>
  ))}
</div>
              </div>
            )}

            {/* Notes */}
            {tab === "notes" && (
              <NotesEditor
                initialHTML={notesHTML}
                readOnly={!canEditNotes}
                onDownload={() => {
                  const blob = new Blob([notesMD], { type: "text/markdown" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = downloadFilename;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={imagesWithCaptions}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNav={setLightboxIndex}
        />
      )}
    </>
  );
}


/* ── Vertical Workshop Card (SheBuilds-style) ── */
function WorkshopCard({
  gradient, thumbTitle, date, duration, detailTitle, facilitators, tagLabel, tagStyle, onClick, sessionUrl,
}: {
  gradient: string; thumbTitle: string; date: string; duration: string;
  detailTitle: string; facilitators: string; tagLabel: string; tagStyle: React.CSSProperties; onClick: () => void; sessionUrl: string;
}) {
  const [hov, setHov] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        borderRadius: '12px', overflow: 'hidden', cursor: 'pointer',
        border: `1px solid hsl(var(--border))`,
        transition: 'all 0.2s',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      {/* Top — Gradient Thumbnail */}
      <div style={{
        background: gradient,
        padding: '24px 20px 28px',
        display: 'flex', flexDirection: 'column', flex: 1,
      }}>
        <div style={{ marginBottom: '2px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>Infracodebase.com</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
          <span style={{ display: 'inline-block', width: '2px', height: '10px', background: 'rgba(255,255,255,0.5)', borderRadius: '1px' }} />
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Weekly Workshop</span>
        </div>
        <h3 style={{
          fontSize: '24px', fontWeight: 700, color: '#fff',
          fontFamily: 'Fraunces, Georgia, serif',
          lineHeight: 1.2, flex: 1, marginBottom: '20px',
        }}>
          {thumbTitle}
        </h3>
        <div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '2px' }}>{date}</p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>{duration}</p>
        </div>
      </div>

      {/* Bottom — Detail Panel */}
      <div style={{ background: 'hsl(var(--card))', padding: '14px 16px' }}>
        <p style={{
          fontSize: '12px', fontWeight: 500, color: 'hsl(var(--foreground))',
          fontFamily: 'JetBrains Mono, monospace',
          lineHeight: 1.4, marginBottom: '3px',
        }}>
          {detailTitle}
        </p>
        <p style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', marginBottom: '10px' }}>
          {facilitators}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={tagStyle}>{tagLabel}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(sessionUrl);
                setLinkCopied(true);
                setTimeout(() => setLinkCopied(false), 2000);
              }}
              title={linkCopied ? 'Copied!' : 'Copy link'}
              style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '6px', color: linkCopied ? '#22c55e' : 'hsl(var(--muted-foreground))', transition: 'color 0.15s' }}
              onMouseEnter={e => { if (!linkCopied) e.currentTarget.style.color = 'hsl(var(--foreground))'; }}
              onMouseLeave={e => { if (!linkCopied) e.currentTarget.style.color = 'hsl(var(--muted-foreground))'; }}
            >
              {linkCopied ? <Check className="h-3.5 w-3.5" /> : <Link className="h-3.5 w-3.5" />}
              {linkCopied && (
                <span style={{ position: 'absolute', bottom: 'calc(100% + 4px)', left: '50%', transform: 'translateX(-50%)', background: '#1e293b', color: '#22c55e', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '5px', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
                  Copied!
                </span>
              )}
            </button>
            <span style={{ fontSize: '12px', color: '#8b9cff', fontWeight: 500 }}>View session →</span>
          </div>
        </div>
      </div>

      {/* Hover play overlay */}
      {hov && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Play className="h-5 w-5 text-white" style={{ marginLeft: '2px' }} />
          </div>
        </div>
      )}
    </div>
  );
}


/* ── Main Page ── */
export default function OfficeHours() {
  const { user } = useUser();
  const isTarak = user?.emailAddresses?.some(e => e.emailAddress === 'tarak@infracodebase.com');
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);

  return (
    <AppLayout>
      <Helmet>
        <title>Live Workshops — Infracodebase University</title>
        <meta name="description" content="Join live infrastructure engineering workshops every Wednesday at 5:00 PM CET. Demos, walkthroughs, and Q&A with real systems. Hosted by Justin & Tarak." />
        <link rel="canonical" href="https://university.infracodebase.com/workshops" />
        <meta property="og:title" content="Live Workshops — Infracodebase University" />
        <meta property="og:description" content="Join live infrastructure engineering workshops every Wednesday at 5:00 PM CET. Demos, walkthroughs, and Q&A with real systems." />
        <meta property="og:url" content="https://university.infracodebase.com/workshops" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://university.infracodebase.com/og/workshops.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Infracodebase University" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Live Workshops — Infracodebase University" />
        <meta name="twitter:description" content="Live infrastructure engineering workshops every Wednesday. Real systems, real demos." />
        <meta name="twitter:image" content="https://university.infracodebase.com/og/workshops.png" />
      </Helmet>
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10 pt-16 lg:pt-16 space-y-10">

        {/* What is Workshops banner */}
        <div
          className="rounded-xl p-[1.5px]"
          style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #c2410c 15%, #d97706 35%, #ca8a04 50%, #16a34a 68%, #0891b2 85%, #1a1a1a 100%)" }}
        >
          <div className="rounded-[11px] bg-card px-5 py-4 flex items-center gap-4">
            <div className="shrink-0 h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">What is Workshops?</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Every Wednesday at 5:00 PM CET, Justin and Tarak run a live workshop — demos, walkthroughs, and Q&A on real infrastructure challenges. Sessions are recorded and available to all members. Submit your question below and we'll cover it live.
              </p>
            </div>
          </div>
        </div>

        {/* ── SECTION 3 — PAST SESSIONS ── */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-1">Past Sessions</h2>
          <p className="text-sm text-muted-foreground mb-6">Click any session to watch the recording, relive our moments, and read the notes.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px', alignItems: 'stretch' }}>
            {/* Workshop 3 — April 1, 2026 (newest first) */}
            <WorkshopCard
              gradient="linear-gradient(135deg, #E85D04 0%, #C1121F 45%, #6A0572 100%)"
              thumbTitle="Shifting Left: Building a Secure Azure Baseline"
              date="April 1, 2026"
              duration="1h 04m"
              detailTitle="Build with Her — Shifting Left: Building a Secure Azure Baseline"
              facilitators="Tawni, Tarak & Justin O'Connor"
              tagLabel="Shift left"
              tagStyle={{ background: 'rgba(232,93,4,0.15)', color: '#f59e0b', border: '0.5px solid rgba(232,93,4,0.3)', borderRadius: '20px', padding: '3px 9px', fontSize: '12px', fontWeight: 500 }}
              onClick={() => setModal3Open(true)}
              sessionUrl="https://university.infracodebase.com/workshops#shifting-left-azure-baseline"
            />

            {/* Workshop 2 — March 25, 2026 */}
            <WorkshopCard
              gradient="linear-gradient(135deg, #1d4ed8 0%, #7c3aed 55%, #16653a 100%)"
              thumbTitle="Migrating Azure Infrastructure to AWS and GCP"
              date="March 25, 2026"
              duration="56m 46s"
              detailTitle="Build with Her — Migrating Azure to AWS and GCP"
              facilitators="Tarak & Justin O'Connor"
              tagLabel="Cross-cloud"
              tagStyle={{ background: 'rgba(91,106,245,0.15)', color: '#8b9cff', border: '0.5px solid rgba(91,106,245,0.3)', borderRadius: '20px', padding: '3px 9px', fontSize: '12px', fontWeight: 500 }}
              onClick={() => setModal2Open(true)}
              sessionUrl="https://university.infracodebase.com/workshops#migrating-azure-aws-gcp"
            />

            {/* Workshop 1 — March 18, 2026 */}
            <WorkshopCard
              gradient="linear-gradient(135deg, #7c3aed 0%, #db2877 55%, #ea580c 100%)"
              thumbTitle="ClickOps to IaC: Azure Infrastructure"
              date="March 18, 2026"
              duration="49 min"
              detailTitle="Build with Her — ClickOps to IaC: Azure Infrastructure Modernization"
              facilitators="Tarak & Justin O'Connor"
              tagLabel="Azure"
              tagStyle={{ background: 'rgba(0,120,212,0.15)', color: '#60a9ff', border: '0.5px solid rgba(0,120,212,0.3)', borderRadius: '20px', padding: '3px 9px', fontSize: '12px', fontWeight: 500 }}
              onClick={() => setModalOpen(true)}
              sessionUrl="https://university.infracodebase.com/workshops#clickops-to-iac"
            />
          </div>
        </section>
      </div>

      <SessionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        screenshots={initialScreenshots}
        isTarak={Boolean(isTarak)}
        title="Build with Her — ClickOps to IaC: Azure Infrastructure Modernization"
        subtitle="March 18, 2026 · 49 min · Justin & Tarak"
        sessionComments={session1Comments}
        notesHTML={INITIAL_SESSION_NOTES}
        notesMD={SESSION_NOTES_MD}
        downloadFilename="build-with-her-march-18-2026.md"
        sessionUrl="https://university.infracodebase.com/workshops#clickops-to-iac"
      />
      <SessionModal
        open={modal2Open}
        onClose={() => setModal2Open(false)}
        screenshots={session2Screenshots}
        isTarak={Boolean(isTarak)}
        title="Build with Her — Migrating Azure Infrastructure to AWS and GCP"
        subtitle="March 25, 2026 · 56m 46s · Justin & Tarak"
        sessionComments={session2Comments}
        notesHTML={SESSION2_NOTES_HTML}
        notesMD={SESSION2_NOTES_MD}
        downloadFilename="build-with-her-march-25-2026.md"
        youtubeEmbedUrl="https://www.youtube.com/embed/I68mkGJHMhA"
        sessionUrl="https://university.infracodebase.com/workshops#migrating-azure-aws-gcp"
      />
      <SessionModal
        open={modal3Open}
        onClose={() => setModal3Open(false)}
        screenshots={session3Screenshots}
        isTarak={Boolean(isTarak)}
        title="Build with Her — Shifting Left: Building a Secure Azure Baseline"
        subtitle="April 1, 2026 · 1h 04m · Tawni, Tarak & Justin"
        sessionComments={session3Comments}
        notesHTML={SESSION3_NOTES_HTML}
        notesMD={SESSION3_NOTES_MD}
        downloadFilename="build-with-her-april-1-2026.md"
        youtubeEmbedUrl="https://www.youtube.com/embed/RtlKHzz-k_s"
      />
    </AppLayout>
  );
}
