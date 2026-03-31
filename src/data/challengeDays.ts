export interface ChallengeDay {
  day: number;
  phase: 'AI Foundation' | 'Prompt & Design' | 'Validate & Fix' | 'Mastery';
  name: string;
  where: string;
  ref: string | null;
  steps: [string, string, string];
}

export const PHASE_COLORS: Record<ChallengeDay['phase'], string> = {
  'AI Foundation':   '#7F77DD',
  'Prompt & Design': '#378ADD',
  'Validate & Fix':  '#EF9F27',
  'Mastery':         '#D85A30',
};

export const DAYS: ChallengeDay[] = [
  // ── AI FOUNDATION (Days 1–7)
  {
    day: 1,
    phase: 'AI Foundation',
    name: 'Create your enterprise on infracodebase.com',
    where: 'infracodebase.com → sign up → Enterprises → New Enterprise',
    ref: 'https://infracodebase.com/docs/enterprises/agent',
    steps: [
      'Sign in to infracodebase.com with your Infracodebase University account. Your free plan includes 500 credits/month. Earn free credits by sharing — invite friends and colleagues and receive 250 credits for each person who signs up using your referral link.',
      'Click "New Enterprise". Name it with your org prefix (e.g. acme-corp). Every ruleset, tool, and integration you configure here applies to every workspace inside it.',
      'Explore the Agent panel (Enterprise → Agent): note the built-in tool categories (File Operations, Search, Shell, Web, Agent, Extensions) and the Infrastructure CLI tools including Terraform, Azure CLI, and AWS CLI. You control which tools the agent can use across your entire organisation. Also open Settings → Usage (https://infracodebase.com/docs/advanced/usage) — this is your credit consumption dashboard, showing average daily usage and when credits are projected to run out.',
    ],
  },
  {
    day: 2,
    phase: 'AI Foundation',
    name: 'Understand all three ruleset levels and import the Azure WAF',
    where: 'infracodebase.com → Enterprise → Rulesets',
    ref: 'https://infracodebase.com/docs/enterprises/rulesets',
    steps: [
      'Rulesets work at three levels: Enterprise (org-wide, applies to all workspaces), Workspace (project-specific, sits on top of enterprise rulesets), and User (personal preferences, apply across all your workspaces). The hierarchy is Enterprise > Workspace > User — enterprise rulesets always win conflicts. Enterprise → Rulesets → Add Ruleset → "Import from URL". Paste: https://learn.microsoft.com/en-us/azure/well-architected/pillars. Toggle "Required: ON" — this locks the ruleset for every workspace in your organisation.',
      'Now create a workspace ruleset: go to your webapp-dev workspace → Workspace Settings → Rulesets → Add Ruleset → "From scratch". Name it "Project Conventions". Add one rule: "All Azure resources must use the naming prefix \'webapp\' followed by the resource type and environment, e.g. webapp-sql-dev". This rule applies only to this workspace, on top of the enterprise Azure WAF ruleset.',
      'Finally, create a user ruleset: your profile icon → Settings → User Rulesets → Add Ruleset. Add one rule: "Always explain why you made architectural choices before generating code. Flag any trade-offs." This personal preference applies across all your workspaces and shapes how the agent communicates with you specifically — other team members keep their own preferences.',
    ],
  },
  {
    day: 3,
    phase: 'AI Foundation',
    name: 'Add the Terraform MCP tool from the registry',
    where: 'infracodebase.com → Enterprise → Tools → Browse Registry',
    ref: 'https://infracodebase.com/docs/enterprises/tools',
    steps: [
      'Enterprise → Tools → Browse Tool Registry. Find and add the Terraform MCP server.',
      'Configure credentials — the Terraform MCP needs a Terraform Cloud API token. Store it as a Secret: Enterprise → Secrets (https://infracodebase.com/docs/enterprises/secrets). Secrets are encrypted and injected into the agent session at runtime — credentials never appear in your code or logs.',
      'In Enterprise → Agent → built-in tool permissions, add a permission rule for the Shell category: set `terraform apply` to "Require approval" so the agent pauses before applying any infrastructure changes. Read https://infracodebase.com/docs/advanced/permission-rules for the full pattern syntax (wildcards, deny vs require approval vs allow).',
    ],
  },
  {
    day: 4,
    phase: 'AI Foundation',
    name: 'Add the Azure MCP tool and connect GitHub',
    where: 'infracodebase.com → Enterprise → Tools + Integrations',
    ref: 'https://infracodebase.com/docs/enterprises/integrations',
    steps: [
      'Tools → Registry → add Azure MCP server. Configure with a service principal: Client ID, Client Secret, Tenant ID, Subscription ID. Enable read-only tools only.',
      'Enterprise → Integrations → Connect GitHub. Install the Infracodebase GitHub App. Complete the OAuth step to allow repo creation on your behalf.',
      'Verify: Azure MCP = Connected. GitHub = Connected. The agent can now read your cloud environment and automatically commit generated infrastructure code via the Git subagent. For workspace-level GitHub settings (target branch, PR configuration), see https://infracodebase.com/docs/workspaces/git',
    ],
  },
  {
    day: 5,
    phase: 'AI Foundation',
    name: 'Create your first workspace and verify the AI foundation layer',
    where: 'infracodebase.com → Enterprise → New Workspace',
    ref: 'https://infracodebase.com/docs/workspaces/using-the-agent',
    steps: [
      'Click "New Workspace" (https://infracodebase.com/docs/workspaces/overview). Name it webapp-dev. Connect it to a new GitHub repository. Open Workspace Settings (https://infracodebase.com/docs/workspaces/workspace-settings) — review General (name, visibility, workflow assignment), Members, and the active rulesets and tools for this workspace.',
      'In workspace settings, verify active rulesets: Azure WAF should show as Required (locked — cannot be disabled). This confirms your enterprise foundation layer is flowing through to the workspace correctly.',
      'Type "Create an Azure storage account" in the agent chat. Observe it applying naming conventions, tagging, and encryption from your Azure WAF ruleset automatically. Notice the Git subagent (a built-in subagent at https://infracodebase.com/docs/enterprises/subagents) commits the generated code to your GitHub repository automatically.',
    ],
  },
  {
    day: 6,
    phase: 'AI Foundation',
    name: 'Master the five prompting principles before you build',
    where: 'infracodebase.com → Docs → Advanced → Prompting + workspace webapp-dev',
    ref: 'https://infracodebase.com/docs/advanced/prompting',
    steps: [
      'Read https://infracodebase.com/docs/advanced/prompting in full. Internalise these five principles: (1) Intent not syntax — describe what the infrastructure should DO, not how to write the Terraform. (2) What belongs where — naming conventions belong in rulesets, repeatable processes belong in workflows, reference documents belong in docs. (3) Build incrementally — start with the foundation, review the output, then add the next layer. (4) Ask for explanations — after any generation, ask "Why did you choose X over Y?" (5) Review like a teammate — read the generated code as you would a PR.',
      'Practice principle 1 (intent not syntax). Write two prompts for an Azure storage account: first using Terraform resource syntax, second using plain intent language. Run both and compare the outputs.',
      'Practice principle 3 (incremental building). In webapp-dev, send three sequential messages building up a VNet, then App Service, then Azure SQL. Notice how each step is reviewable and correctable.',
    ],
  },
  {
    day: 7,
    phase: 'AI Foundation',
    name: 'Study the Project 1 target architecture before prompting',
    where: 'infracodebase.com → workspace webapp-dev (read-only today)',
    ref: null,
    steps: [
      'Project 1 target: App Service (B2) + Azure SQL Server + Storage Account (GRS) + Private DNS Zone. One Azure region. All connected via private endpoints — no public internet exposure except the App Service front door.',
      'Sketch on paper what you expect the Design stage diagram to look like: four service boxes, the VNet containing the private endpoints, arrows showing the connections between services.',
      'Understanding the architecture before you prompt is the methodology. A clear mental model produces a precise prompt, which produces a high-quality first generation.',
    ],
  },

  // ── PROMPT & DESIGN (Days 8–13)
  {
    day: 8,
    phase: 'Prompt & Design',
    name: 'Build Project 1 incrementally using the agent',
    where: 'infracodebase.com → workspace webapp-dev → Agent',
    ref: null,
    steps: [
      'Apply the incremental building principle from Day 6. Do NOT send one large prompt. Instead, send the networking layer first: VNet with two subnets, Private DNS Zone, no public internet exposure. Review before continuing.',
      'Once satisfied, send the compute and data layers: App Service B2 in app-subnet, Azure SQL (Standard S1) in data-subnet, Storage Account (GRS, private). Ask "Why did you put the Storage Account in the data subnet?"',
      'Evaluate the reasoning. If you disagree, challenge: "We need the Storage Account in a separate storage-subnet for compliance reasons." The agent will revise. Generate, explain, challenge, revise — this is the core working pattern.',
    ],
  },
  {
    day: 9,
    phase: 'Prompt & Design',
    name: 'Master the Design stage — score, visual edits, and diagram types',
    where: 'infracodebase.com → workspace webapp-dev → Design tab',
    ref: 'https://infracodebase.com/docs/workspaces/diagrams',
    steps: [
      'Click the Design tab. Read the layout quality score panel. Learn visual edits mode: press V. Click on any resource — a contextual chat opens. Type "Move this inside the VNet container" or "Rename this to webapp-sql-dev".',
      'Click on empty space for diagram-wide chat. Type "Reorganise this diagram so networking is at the top, compute in the middle, data at the bottom."',
      'Create a second diagram: "Threat vector map". Prompt: "Create a threat vector map showing potential attack surfaces." Toggle between L1 and threat views from the diagram panel.',
    ],
  },
  {
    day: 10,
    phase: 'Prompt & Design',
    name: 'Iterate the diagram and do a thorough code review',
    where: 'infracodebase.com → workspace webapp-dev → Design tab + Code tab',
    ref: null,
    steps: [
      'Drag nodes to fix Crossings and Edge Overlap. Use V (visual edits) to reposition specific resources. Verify accuracy: App Service → Private Endpoint → Azure SQL ✓? Storage Account via private endpoint ✓?',
      'If you have reference material, upload it to the Docs tab. Then type @ in the agent chat, select it, and ask: "Does this infrastructure satisfy the requirements in @your-doc-name?"',
      'Switch to the Code tab. Check: security group rules for 0.0.0.0/0, IAM * actions, network exposure, resource sizing, tags on every resource. Prompt fixes for anything that fails.',
    ],
  },
  {
    day: 11,
    phase: 'Prompt & Design',
    name: 'Review the Terraform structure in the Code tab',
    where: 'infracodebase.com → workspace webapp-dev → Code tab',
    ref: 'https://infracodebase.com/docs/workspaces/code-editor',
    steps: [
      'Switch to the Code tab. Review the file structure: main.tf, variables.tf, outputs.tf, providers.tf.',
      'Find each resource block. Verify: tags present on every resource (Environment: dev, prefix: webapp), private_network_access_enabled on storage, public_network_access_enabled = false on SQL server.',
      'If anything is missing — prompt the agent to fix it in the Code tab before running external validation tools.',
    ],
  },
  {
    day: 12,
    phase: 'Prompt & Design',
    name: 'Run terraform validate and terraform plan',
    where: 'Terminal — clone the GitHub repo the agent committed to',
    ref: null,
    steps: [
      'Clone the GitHub repository. The agent committed the generated Terraform here automatically.',
      'Run: `terraform init && terraform validate`. Fix any validation errors before continuing.',
      'Run: `terraform plan -out=tfplan`. Read the full plan: how many resources? Any unexpected replacements? A clean plan confirms the code is logically valid.',
    ],
  },
  {
    day: 13,
    phase: 'Prompt & Design',
    name: 'Run tfsec and read every finding',
    where: 'Terminal',
    ref: null,
    steps: [
      'Install tfsec: `brew install tfsec` (Mac) or `go install github.com/aquasecurity/tfsec/cmd/tfsec@latest`.',
      'Run: `tfsec .` — read every finding. Build a remediation table: Resource | Rule ID | Severity | Description.',
      'Understanding what each finding means — not just fixing it — is what separates a practitioner from someone copy-pasting.',
    ],
  },

  // ── VALIDATE & FIX (Days 14–20)
  {
    day: 14,
    phase: 'Validate & Fix',
    name: 'Run checkov, remediate all findings, and generate the security report',
    where: 'Terminal + infracodebase.com → Agent',
    ref: null,
    steps: [
      'Run checkov: `checkov -d . --framework terraform`. Add findings to your Day 13 table. tfsec and checkov cover different rules — you need both.',
      'Remediate every CRITICAL, HIGH, and MEDIUM finding. For each: copy the finding and prompt the agent to fix it. Re-run both tools after each fix.',
      'Once all findings are cleared: prompt "Generate a security report covering tfsec and checkov results, all vulnerabilities found and remediated, and current security posture." Commit to GitHub.',
    ],
  },
  {
    day: 15,
    phase: 'Validate & Fix',
    name: 'Generate the README and upload reference docs',
    where: 'infracodebase.com → workspace webapp-dev → Agent + Docs tab',
    ref: 'https://infracodebase.com/docs/workspaces/docs',
    steps: [
      'Prompt: "Generate a README.md: what this infrastructure deploys and why each component was chosen, architecture overview, prerequisites, how to run terraform plan and apply, outputs and what they are used for."',
      'Review: does the architecture overview match the Design stage diagram?',
      'Open the Docs tab. Upload any reference material. Attach in the agent chat with + to give the agent direct context.',
    ],
  },
  {
    day: 16,
    phase: 'Validate & Fix',
    name: 'Generate the SECURITY.md',
    where: 'infracodebase.com → workspace webapp-dev → Agent',
    ref: null,
    steps: [
      'Prompt: "Generate a SECURITY.md: all security controls in place, Azure WAF Security pillar requirements satisfied, encryption at rest and in transit, private endpoint strategy, and what a security reviewer should check."',
      'Review: does it reference the clean tfsec and checkov results? Does it accurately describe the private endpoint architecture?',
      'You now have three documents ready to publish: README.md, SECURITY.md, and the security report.',
    ],
  },
  {
    day: 17,
    phase: 'Validate & Fix',
    name: 'Publish to GitHub using the Publish flow',
    where: 'infracodebase.com → workspace webapp-dev → Publish button',
    ref: 'https://infracodebase.com/docs/workspaces/history',
    steps: [
      'Click Publish. The flow walks you through: create a feature branch, commit, push, create a pull request.',
      'Review the pull request in GitHub. The PR description lists resources created or modified.',
      'Open the History panel. Every commit is listed. Click any commit for the diff. Click Revert to roll back if needed.',
    ],
  },
  {
    day: 18,
    phase: 'Validate & Fix',
    name: 'Replicate on AWS — enable AWS WAF ruleset first',
    where: 'infracodebase.com → workspace settings → Agent',
    ref: null,
    steps: [
      'In workspace settings, enable the AWS Well-Architected Framework ruleset.',
      'Prompt: "Create the AWS equivalent in us-east-1: App Runner, RDS PostgreSQL, S3 bucket (private, versioning), Route 53 private hosted zone. Same private-only networking."',
      'Resource mapping: App Service → App Runner · Azure SQL → RDS PostgreSQL · Storage Account (GRS) → S3 with versioning · Private DNS Zone → Route 53 Private Hosted Zone.',
    ],
  },
  {
    day: 19,
    phase: 'Validate & Fix',
    name: 'Full validation loop on AWS — validate, scan, remediate, document, publish',
    where: 'Terminal + infracodebase.com → Agent',
    ref: null,
    steps: [
      'Run the complete validation sequence on the AWS Terraform: terraform validate, terraform plan, tfsec, checkov.',
      'Remediate all findings. Generate the security report. Generate README.md and SECURITY.md for the AWS implementation.',
      'Use the Publish flow to push to GitHub with a pull request.',
    ],
  },
  {
    day: 20,
    phase: 'Validate & Fix',
    name: 'Replicate on GCP — enable GCP ruleset, validate, document, publish',
    where: 'infracodebase.com + Terminal',
    ref: null,
    steps: [
      'Enable GCP Architecture Framework ruleset. Prompt: "Create the GCP equivalent: Cloud Run, Cloud SQL PostgreSQL, Cloud Storage (nearline), Cloud DNS private zone. Private networking via Private Service Connect."',
      'Run full validation: terraform validate, terraform plan, tfsec, checkov. Remediate all findings. Generate security report, README.md, and SECURITY.md.',
      'Use the Publish flow to push to GitHub. You now have the same architecture on Azure, AWS, and GCP.',
    ],
  },

  // ── MASTERY (Days 21–30)
  {
    day: 21,
    phase: 'Mastery',
    name: 'Multi-diagram views and the platform framework applied to all three clouds',
    where: 'infracodebase.com → Design tab (all three workspaces)',
    ref: null,
    steps: [
      'In each workspace, create two diagrams: L1 (high-level overview) and L2 (network detail). In L2, prompt: "Create a detailed network diagram showing all subnets, NSGs, private endpoints, and CIDR ranges."',
      'Write the resource mapping table across all three clouds, including networking constructs (VNet → VPC → VPC, NSG → Security Group → Firewall Rules, etc.).',
      'Audit the "what belongs where" framework: naming conventions in rulesets? Validation sequence in a workflow? Architecture decision records in Docs? Live cloud context via MCP tools?',
    ],
  },
  {
    day: 22,
    phase: 'Mastery',
    name: 'Run a security audit across all three workspaces',
    where: 'infracodebase.com → each workspace → Agent',
    ref: null,
    steps: [
      'For each workspace: prompt "Perform a security audit against CIS benchmarks and my active Security Standards rules. Prioritise findings by severity."',
      'Compare the three audit reports. Which cloud has the most remaining findings?',
      'Prompt the fix for the top finding on the worst-performing workspace. Apply and publish.',
    ],
  },
  {
    day: 23,
    phase: 'Mastery',
    name: 'Create a workflow to guide the agent through a structured process',
    where: 'infracodebase.com → Enterprise → Workflows → Workspace Settings',
    ref: 'https://infracodebase.com/docs/enterprises/workflows',
    steps: [
      'In Enterprise → Workflows, create "Infrastructure Delivery" with steps: gather requirements, create architecture plan, document security standards, write infrastructure code, validate, loop back if validation fails.',
      'Assign the workflow to webapp-dev. The workspace now always uses this workflow.',
      'Prompt: "Add a Redis cache layer to the webapp-dev architecture." Watch it follow the workflow — requirements first, architecture plan, code, validation.',
    ],
  },
  {
    day: 24,
    phase: 'Mastery',
    name: 'Add cost optimisation rules and test them',
    where: 'infracodebase.com → Enterprise → Rulesets',
    ref: 'https://infracodebase.com/docs/enterprises/rulesets',
    steps: [
      'Enterprise → Rulesets → Add Ruleset "Cost Standards". Add rules: "App Service plan must not exceed B2 in dev environments", "Azure SQL must not exceed Standard S2 in dev environments".',
      'In webapp-dev, prompt the agent to create an App Service with a P2 plan. Observe the cost rule blocking it.',
      'Fix the prompt to comply. Governance principle: set standards once at enterprise level, the agent enforces them.',
    ],
  },
  {
    day: 25,
    phase: 'Mastery',
    name: 'Detect and remediate infrastructure drift',
    where: 'Azure portal + infracodebase.com → Agent',
    ref: null,
    steps: [
      'Make a manual change to an existing resource in the Azure portal — add a tag, change a SKU, or modify a setting.',
      'In your workspace, prompt: "Compare my Terraform code against the live Azure environment and flag all drift."',
      'Review the drift report. Prompt the fix. Apply it. Use the Publish flow to push the change.',
    ],
  },
  {
    day: 26,
    phase: 'Mastery',
    name: 'Bring an existing cloud resource under IaC management',
    where: 'Azure portal + infracodebase.com → Agent',
    ref: null,
    steps: [
      'In the Azure portal, manually create a Storage Account named "webappmanual" with LRS replication, no public access.',
      'Prompt: "I have an existing Azure Storage Account named webappmanual in resource group [your-rg] in East US. Generate Terraform for this resource so I can bring it under IaC management."',
      'Review the generated Terraform. Run tfsec and checkov. Remediate. Publish to GitHub.',
    ],
  },
  {
    day: 27,
    phase: 'Mastery',
    name: 'Build a reusable private-networking module',
    where: 'infracodebase.com → new workspace "modules"',
    ref: null,
    steps: [
      'Create workspace "modules". Prompt: "Create a reusable Terraform module for an Azure private VNet: two subnets, NSG rules, VNet flow logs. Accept variables for name prefix, address space, location, environment tag."',
      'Run tfsec and checkov on the module. Remediate all findings.',
      'Principle: when security is in the module, every team that uses it gets compliance built in.',
    ],
  },
  {
    day: 28,
    phase: 'Mastery',
    name: 'Invite your team and configure roles and workspace access',
    where: 'infracodebase.com → Enterprise → People & Teams',
    ref: 'https://infracodebase.com/docs/enterprises/people-and-teams',
    steps: [
      'Enterprise → People & Teams → Invite members. Assign roles: Owner, Admin, Editor, or Viewer. Start with Editor for your team and Admin for your tech lead.',
      'Add the new member to webapp-dev: Workspace Settings → Members → Add member. Assign a workspace role.',
      'Have your colleague open the workspace. Verify they see the agent, code, diagrams, and history. Your enterprise rulesets, workflows, and tools apply to their sessions automatically.',
    ],
  },
  {
    day: 29,
    phase: 'Mastery',
    name: 'Write your prompting playbook',
    where: 'Any editor → commit to GitHub via Publish flow',
    ref: 'https://infracodebase.com/docs/advanced/prompting',
    steps: [
      'Document the three most effective prompting patterns you discovered during the 30 days. For each: pattern name, prompt template, what it produces, and why it works.',
      'Example: "Explicit constraints pattern" — "Create [resource]. Constraints: [list]. Do not include: [list]. Environment: [env]."',
      'Commit as PROMPTING_GUIDE.md to GitHub using the Publish flow.',
    ],
  },
  {
    day: 30,
    phase: 'Mastery',
    name: 'Day 30 — final audit, publish everything, earn the badge',
    where: 'Terminal + infracodebase.com + GitHub + LinkedIn',
    ref: null,
    steps: [
      'Generate a migration runbook. Run the final audit: tfsec and checkov across all three cloud workspaces — confirm zero CRITICAL, zero HIGH, zero MEDIUM.',
      'Review all architecture diagrams and GitHub repositories: README.md, SECURITY.md, security report, MIGRATION.md, PROMPTING_GUIDE.md all present.',
      'You shipped one complete architecture across three clouds, validated at every step, documented for any engineer to understand, and published professionally. The 75-Day Advanced Track is now unlocked.',
    ],
  },
];
