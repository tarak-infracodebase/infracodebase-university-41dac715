export interface HandsOnModule {
  id: string;
  title: string;
  sections: {
    whyThisMatters: string;
    coreConcepts: string;
    engineeringReflection: string;
    stepByStep: string;
    handsOnExercise: string;
    requiredArtifact: string;
    validationChecklist: string[];
    failureAndDebugging: string;
    modificationExercise: string;
    knowledgeCheck: {
      question: string;
      options: string[];
      correctAnswer: number;
    };
  };
}

export interface HandsOnTrack {
  id: string;
  trackNumber: number;
  title: string;
  description: string;
  color: string;
  accentColor: string;
  moduleCount: number;
  estimatedHours: number;
  modules: HandsOnModule[];
}

export const handsOnTracks: HandsOnTrack[] = [
  {
    id: "track-2-hands-on",
    trackNumber: 2,
    title: "Foundations",
    description: "Learn how to set up your environment, interact with the agent, and build the habits that separate casual users from real engineers.",
    color: "hsl(145, 60%, 45%)",
    accentColor: "hsl(145, 60%, 92%)",
    moduleCount: 2,
    estimatedHours: 2.5,
    modules: [
      {
        id: "t2-m1",
        title: "Setting Up Your First Infrastructure Workspace",
        sections: {
          whyThisMatters: `When starting with Infracodebase, it is easy to focus only on the agent. You might think:

"I will just ask the agent to generate infrastructure."

But before that, something more important needs to be done. Your environment must be structured correctly. Because Infracodebase is not just a tool. It is an environment where:

- people collaborate
- workspaces organize infrastructure
- rules can be applied
- the agent uses context

If your setup is unclear:

- engineers may not have the right access
- workspaces may become disorganized
- infrastructure work becomes harder to manage

This module ensures that your foundation is correct from the beginning.`,
          coreConcepts: `Before generating infrastructure, you must understand how Infracodebase is structured.

**Enterprise**

The enterprise is the top-level environment. It manages:

- members
- teams
- shared configuration

This is where organization-level control exists.

**People and Teams**

Members are invited into the enterprise. Teams group members together. This simplifies access management across workspaces.

**Workspace**

A workspace is where infrastructure work happens. Inside a workspace you will find:

- conversations with the agent
- infrastructure code
- diagrams
- documentation
- history

Each workspace represents one infrastructure project.

**The Agent**

The agent helps generate and refine infrastructure. But it depends on:

- your instructions
- the workspace context
- defined rules

It is a collaborator, not an autopilot.`,
          engineeringReflection: `Imagine two engineers starting with Infracodebase.

The first engineer:

- creates a workspace without structure
- works alone
- does not define teams
- generates infrastructure immediately

The second engineer:

- creates an enterprise structure
- organizes teams
- creates a clear workspace
- understands how the agent works

After a few days:

- the first engineer struggles to manage work
- the second engineer moves faster and more clearly

The difference is not the agent. The difference is the setup.`,
          stepByStep: `**Step 1 — Create or Review Your Enterprise**

Open your enterprise.

Review:

- members
- teams
- settings

Understand that this is the organizational layer.

**Step 2 — Invite a Member and Create a Team**

Invite at least one member.

Create a team.

For example:

- Platform Team

Add the member to the team.

**Step 3 — Create Your First Workspace**

Create a workspace.

You can:

- start from scratch
- connect a repository

Name it:

👉 my-first-infrastructure-project

Set visibility (recommended: internal).

**Step 4 — Explore the Workspace**

Open the workspace.

Identify:

- where the agent lives
- where files are stored
- where history is visible
- where documentation can be added

**Step 5 — First Interaction with the Agent**

Ask the agent:

👉 "Create a Terraform configuration for an AWS VPC with public and private subnets."

Review the output. Do not assume it is correct.

**Step 6 — Make One Improvement**

Ask the agent to refine the result. For example:

👉 "Add tags for environment and owner."

Observe how the output changes.`,
          handsOnExercise: `Set up your environment and workspace. Your setup must include:

- one enterprise
- one team
- one workspace
- one interaction with the agent
- one refinement of generated infrastructure`,
          requiredArtifact: `You should have:

- a configured enterprise
- a team with at least one member
- a workspace
- generated infrastructure
- a refined version of the infrastructure`,
          validationChecklist: [
            "You understand the difference between enterprise and workspace",
            "You created a team and added a member",
            "You created a workspace",
            "You generated infrastructure using the agent",
            "You refined the output at least once"
          ],
          failureAndDebugging: `Common beginner mistakes:

- skipping enterprise structure
- not creating teams
- treating the agent as fully autonomous
- not reviewing generated infrastructure

If something feels unclear:

- go back to the workspace
- review where each component lives
- interact with the agent again`,
          modificationExercise: `Create a second workspace.

Ask yourself:

👉 When should infrastructure live in a new workspace vs the same one?

Write one sentence explaining your decision.`,
          knowledgeCheck: {
            question: "Where should infrastructure work primarily happen?",
            options: [
              "In the enterprise",
              "In the workspace",
              "In the team settings",
              "In the billing page"
            ],
            correctAnswer: 1
          }
        }
      },
      {
        id: "t2-m2",
        title: "Investigating and Correcting Agent Behavior",
        sections: {
          whyThisMatters: `After setting up your workspace, the next step is working with the agent.

At first, it may seem simple.

You describe what you want.

The agent generates infrastructure.

But in real usage, something different happens.

The agent does not always produce what you expect.

- required configuration may be missing
- outputs may not match your intent
- important constraints may be ignored

This does not mean the agent failed. It means something influenced the result. Because the agent depends on:

- how the request was written
- what context exists in the workspace
- what rules or constraints apply

Understanding this is critical. Because working with the agent is not only about asking. It is about:

- observing
- interpreting
- correcting

This module gives you that experience.`,
          coreConcepts: `**Prompt Influence**

The agent interprets what you ask. If the request is unclear, the result will be incomplete.

**Context Awareness**

The agent uses workspace context:

- existing files
- previous conversations
- defined rules

This affects the output.

**Iteration**

Infrastructure is refined step by step. You do not generate the final result immediately.

**Debugging**

When the result is incorrect, you must identify why. This requires analyzing:

- the request
- the output
- what is missing`,
          engineeringReflection: `Imagine you are working on infrastructure. You ask the agent to generate a configuration. The result looks correct at first glance. But after review:

- encryption is missing
- tags are incomplete
- the purpose is unclear

You now have a choice:

- regenerate everything
- or understand what went wrong

If you always regenerate without understanding:

- 👉 you repeat the same mistakes

If you investigate:

- 👉 you improve how you work with the agent

This is the difference between:

Using the agent casually

Using it as an engineer`,
          stepByStep: `**Scenario**

You are working in your workspace. You ask the agent:

👉 "Create storage for my application."

The agent generates a configuration. But after reviewing it, you notice:

- encryption is not enabled
- no tags are present
- the configuration is too generic

At the same time:

- your workspace may contain rules
- previous conversations may exist
- your request may be incomplete

Your goal is not only to fix the result. Your goal is to understand:

👉 why this result was generated

**Step 1 — Generate the Initial Configuration**

Ask the agent:

👉 "Create storage for my application."

Do not refine the prompt yet. Observe the output.

**Step 2 — Analyze the Output**

Carefully review the result. Identify:

- what is correct
- what is missing
- what is unclear

Write down at least 3 observations.

**Step 3 — Form a Hypothesis**

Before changing anything, ask:

👉 Why did the agent generate this result?

Possible causes:

- the request was too vague
- constraints were not specified
- no rules influenced the output

Choose the most likely explanation.

**Step 4 — Apply a Targeted Improvement**

Now refine your request.

Example:

👉 "Create a Terraform configuration for an S3 bucket used for application logs. Enable encryption, versioning, and include environment and owner tags."

Do not change everything randomly. Make a focused improvement.

**Step 5 — Compare Results**

Compare:

- initial output
- refined output

Identify what changed and why.

**Step 6 — Iterate Again**

If needed:

- refine the request further
- correct a specific issue

Repeat until the configuration matches your intent.

**Step 7 — Validate Understanding**

Ask yourself:

- what caused the initial problem?
- what change fixed it?
- how would you avoid this issue next time?`,
          handsOnExercise: `Using the agent:

- generate an initial configuration
- identify at least 3 issues
- form a hypothesis about the cause
- apply a targeted fix
- improve the configuration`,
          requiredArtifact: `You should have:

- an initial configuration
- a refined configuration

A short explanation of:

- what was wrong
- what caused it
- how you fixed it`,
          validationChecklist: [
            "You reviewed the initial output carefully",
            "You identified multiple issues",
            "You formed a clear hypothesis",
            "You applied a targeted improvement",
            "The final result matches your intent",
            "You understand why the first result was incorrect"
          ],
          failureAndDebugging: `Common mistakes:

- immediately rewriting the prompt without analysis
- making multiple changes at once
- not comparing outputs

Correct approach:

- observe
- analyze
- hypothesize
- fix
- compare`,
          modificationExercise: `Introduce a new constraint. For example:

👉 "This storage must be used for production logs and must include lifecycle rules."

Update the configuration.

Observe:

- how the agent adapts
- whether the constraint is respected`,
          knowledgeCheck: {
            question: "The agent generated incomplete infrastructure. What is the best first step?",
            options: [
              "Regenerate immediately",
              "Deploy the result",
              "Analyze the output and identify what is missing",
              "Delete the workspace"
            ],
            correctAnswer: 2
          }
        }
      }
    ]
  },
  {
    id: "track-3-hands-on",
    trackNumber: 3,
    title: "Real Infrastructure",
    description: "Move from generating isolated resources to building connected, working infrastructure environments through structured iteration.",
    color: "hsl(185, 70%, 48%)",
    accentColor: "hsl(185, 70%, 92%)",
    moduleCount: 2,
    estimatedHours: 3,
    modules: [
      {
        id: "t3-m1",
        title: "Building Your First Complete Infrastructure Environment",
        sections: {
          whyThisMatters: `After learning how to work with the agent, the next step is building real infrastructure. At first, you may think:

"I will generate a VPC, then a database, then an application."

But infrastructure does not work as isolated pieces. It works as a connected environment. Where:

- components are placed in the right locations
- services can communicate
- traffic flows correctly

If this structure is not correct:

- resources may exist but not work together
- applications may not connect to storage
- infrastructure becomes difficult to understand

This module helps you move from:

- 👉 generating infrastructure
- to
- 👉 building a working environment`,
          coreConcepts: `**Environment Structure**

Infrastructure must be organized into a clear structure. This includes:

- network boundaries
- separation of components
- relationships between resources

**Component Placement**

Where a resource is placed matters. For example:

- some components should be public
- others should remain private

**Connectivity**

Resources must be able to communicate. This depends on:

- network configuration
- correct placement

**Iteration**

A working environment is rarely correct on the first attempt. It is improved step by step.`,
          engineeringReflection: `Imagine two engineers building infrastructure. The first engineer:

- generates components one by one
- does not think about connections
- assumes everything will work

The second engineer:

- defines the structure first
- places components intentionally
- verifies how they connect

After a few iterations:

- the first engineer has disconnected resources
- the second engineer has a working system

The difference is not the agent.

The difference is how the system is built.`,
          stepByStep: `**Step 1 — Define Your Intent**

Before generating anything, write:

👉 "I want to build an application environment with separated components."

Keep it simple.

**Step 2 — Generate the Initial Network**

Ask the agent:

👉 "Create a VPC with public and private subnets."

Review the output.

Do not assume it is correct.

**Step 3 — Add an Application Component**

Ask the agent to add an application component to the environment.

**Step 4 — Add a Storage Component**

Ask the agent:

👉 "Add storage for the application."

Review:

- where it is placed
- whether it is accessible

**Step 5 — Analyze the System**

Now pause.

Look at the full environment.

Ask:

- can the application reach the storage?
- is anything exposed incorrectly?
- does the structure make sense?

Write at least 2 observations.

**Step 6 — Apply One Improvement**

Choose ONE issue.

Refine your request.

Example:

👉 "Move the storage to a private subnet and ensure the application can access it."

**Step 7 — Compare Results**

Compare:

- before
- after

Identify:

- what improved
- what is still unclear

**Step 8 — Iterate Again**

Make one more improvement.

Do not change everything.`,
          handsOnExercise: `Using the agent:

- generate a network
- add an application component
- add a storage component
- identify at least 2 issues
- apply one targeted improvement
- refine the system`,
          requiredArtifact: `You should have:

- a network (VPC + subnets)
- an application component
- a storage component
- a refined version of the system

Plus:

- a short explanation of:
  - what was wrong
  - what you improved`,
          validationChecklist: [
            "The system includes multiple components",
            "You reviewed how they connect",
            "You identified issues before fixing",
            "You applied targeted improvements",
            "The system became more coherent"
          ],
          failureAndDebugging: `Common mistakes:

- generating components without reviewing them
- assuming everything works
- making multiple changes at once

Correct approach:

- generate
- observe
- identify issue
- fix one thing
- validate`,
          modificationExercise: `Add one new requirement. For example:

👉 "The application must remain accessible, but storage must be private."

Update your system. Observe what changes.`,
          knowledgeCheck: {
            question: "You generated infrastructure components but they do not work together. What is the best next step?",
            options: [
              "Generate more resources",
              "Analyze how components connect",
              "Delete everything",
              "Deploy immediately"
            ],
            correctAnswer: 1
          }
        }
      },
      {
        id: "t3-m2",
        title: "Investigating and Fixing Infrastructure Issues",
        sections: {
          whyThisMatters: `Once you start building infrastructure, you will notice something important. The agent does not always produce a fully working system. For example:

- components may exist but not connect
- resources may be placed incorrectly
- configurations may be incomplete

This does not mean the system is broken. It means it needs to be understood and improved. Working with infrastructure is not only about building. It is about:

- 👉 observing
- 👉 analyzing
- 👉 correcting

This module helps you develop that skill.`,
          coreConcepts: `**Observation**

Before fixing anything, you must understand what exists.

**Hypothesis**

You must identify why something is not working.

**Targeted Fixes**

You should fix one issue at a time.

**Iteration**

Improvement happens through multiple small changes.`,
          engineeringReflection: `Imagine you build an infrastructure environment. At first glance:

- all components exist

But when you test:

- services cannot communicate
- behavior is inconsistent

You now have two choices:

- regenerate everything
- or investigate and improve

If you always regenerate:

- 👉 you do not learn

If you investigate:

- 👉 you build real engineering skills`,
          stepByStep: `**Scenario**

You have an infrastructure environment that includes:

- a network
- an application component
- a storage component

But:

- the application cannot access storage
- some components are incorrectly exposed

**Step 1 — Observe the System**

Do not change anything yet.

Review:

- network
- component placement
- connections

**Step 2 — Identify Issues**

List what is wrong.

- storage is in the wrong location
- connectivity is missing

**Step 3 — Form a Hypothesis**

Ask:

👉 Why is this happening?

Choose the most likely explanation.

**Step 4 — Apply One Fix**

Make one targeted change.

Example:

👉 "Ensure storage is private and accessible from the application."

**Step 5 — Compare Results**

Compare:

- before
- after

Identify:

- what improved

**Step 6 — Iterate**

If issues remain, apply another targeted fix.

**Step 7 — Validate Understanding**

Ask:

- what caused the issue?
- what fixed it?`,
          handsOnExercise: `Using your environment:

- observe the system
- identify at least 2 issues
- form a hypothesis
- apply one fix
- validate the result
- iterate`,
          requiredArtifact: `You should have:

- an initial system
- an improved system

Plus:

- a short explanation of what you fixed and why`,
          validationChecklist: [
            "You analyzed before fixing",
            "You identified multiple issues",
            "You applied targeted fixes",
            "You validated improvements",
            "You understand what caused the issues"
          ],
          failureAndDebugging: `Common mistakes:

- fixing without understanding
- making multiple changes at once
- not comparing results

Correct approach:

- observe
- identify
- hypothesize
- fix
- validate`,
          modificationExercise: `Introduce a new constraint.

For example:

👉 "The storage must not be publicly accessible."

Update your system.

Observe the impact.`,
          knowledgeCheck: {
            question: "Your infrastructure is not working as expected. What is the best first step?",
            options: [
              "Rebuild everything",
              "Analyze the system",
              "Deploy again",
              "Ignore the issue"
            ],
            correctAnswer: 1
          }
        }
      }
    ]
  },
  {
    id: "track-4-hands-on",
    trackNumber: 4,
    title: "Governance",
    description: "Apply rulesets, workflows, and subagents to control how infrastructure is generated, reviewed, and evolved across teams.",
    color: "hsl(45, 85%, 55%)",
    accentColor: "hsl(45, 85%, 92%)",
    moduleCount: 2,
    estimatedHours: 3,
    modules: [
      {
        id: "t4-m1",
        title: "Applying Governance to Infrastructure Generation",
        sections: {
          whyThisMatters: `Until now, you have been generating infrastructure using the agent. But something important is missing. The agent behaves based on:

- Your requests
- Your workspace context

This means:

👉 Different engineers can produce different results. In real organizations, this creates problems:

- Inconsistent infrastructure
- Missing security requirements
- Unpredictable outputs

To solve this, organizations introduce governance. In Infracodebase, governance is not external. It is encoded directly into the system using:

- Rulesets
- Workflows

This module helps you understand:

👉 How governance changes how infrastructure is generated.`,
          coreConcepts: `**Rulesets**

Rulesets define what must be followed. They enforce:

- Standards
- Constraints
- Required practices

**Workflows**

Workflows define how work is performed. They guide:

- Steps
- Sequence
- Validation

**Governance As Behavior**

Governance is not documentation. It changes:

👉 How the agent behaves.

**Iteration**

Governed systems are refined step by step. You observe → adjust → validate.`,
          engineeringReflection: `Imagine two teams using the agent. The first team:

- Has no rules
- Has no workflow

Each engineer:

- Writes different prompts
- Gets different results

The second team:

- Defines rulesets
- Defines workflows

Now:

- Outputs become consistent
- Standards are enforced
- Work becomes predictable

The difference is governance.`,
          stepByStep: `**Step 1 — Generate Without Governance**

Ask the agent:

👉 "Create storage for my application."

Carefully review the output.

Write at least 2 observations:

- What is missing
- What is inconsistent

**Step 2 — Form A Hypothesis**

Before making any changes, ask:

👉 Why did the agent generate this result?

Possible causes:

- No constraints
- No defined standards
- Request is too generic

Write your hypothesis.

**Step 3 — Introduce A Ruleset**

Create a ruleset that defines:

- Encryption must be enabled
- Tagging must be present

Make the rules explicit.

**Step 4 — Generate Again**

Ask the SAME request:

👉 "Create storage for my application."

**Step 5 — Compare Outputs**

Compare:

- Initial output
- Ruleset-driven output

Write:

- What changed
- What improved
- What is still missing

**Step 6 — Introduce A Workflow**

Create a workflow that includes:

- Generation
- Validation

The workflow should structure how work is performed.

**Step 7 — Run Through The Workflow**

Now execute using the workflow instead of a direct prompt. Observe:

- How the process is structured
- How the output differs

**Step 8 — Compare Again**

Compare three states:

- No governance
- Ruleset only
- Ruleset + workflow

Write:

- What improved at each stage
- Which change had the biggest impact

**Step 9 — Iterate One More Time**

Refine ONE element:

- Improve the ruleset
- OR
- Improve the workflow

Run again. Observe:

- How small changes affect results`,
          handsOnExercise: `Using your workspace:

1. Generate infrastructure without governance.
2. Write at least 2 observations.
3. Form a hypothesis.
4. Create a ruleset.
5. Generate again.
6. Compare results.
7. Create a workflow.
8. Run through the workflow.
9. Compare all versions.
10. Apply one refinement.`,
          requiredArtifact: `You should have:

- An initial output
- A ruleset
- A workflow
- Multiple versions of generated infrastructure

Plus:

- A short explanation of what changed at each stage`,
          validationChecklist: [
            "Rulesets influence infrastructure output",
            "Workflows influence execution process",
            "Outputs became more consistent",
            "You compared multiple iterations",
            "You understand why changes occurred"
          ],
          failureAndDebugging: `Common mistakes:

- Creating vague rulesets
- Skipping comparison steps
- Changing too many variables at once

Correct approach:

1. Generate
2. Observe
3. Hypothesize
4. Apply one change
5. Compare
6. Iterate`,
          modificationExercise: `Add a new requirement to your ruleset. For example:

👉 "All storage must include versioning."

Generate again.

Observe:

- How the system adapts
- Whether the requirement is enforced`,
          knowledgeCheck: {
            question: "What is the primary effect of rulesets?",
            options: [
              "Generate infrastructure",
              "Define and enforce standards",
              "Replace workflows",
              "Store files"
            ],
            correctAnswer: 1
          }
        }
      },
      {
        id: "t4-m2",
        title: "Understanding How Governance Scales Across Teams",
        sections: {
          whyThisMatters: `After applying governance, the next challenge appears when systems grow.

In small environments:

- One engineer can manage everything

But in real organizations:

- Multiple teams generate infrastructure
- Different engineers interact with the agent
- Changes accumulate over time

Without structure:

- Responsibilities become unclear
- Outputs become inconsistent
- Debugging becomes difficult

To scale governance, organizations introduce:

- Separation of execution
- Visibility into changes

In Infracodebase, this is achieved using:

- Subagents
- Workspace history

This module helps you understand:

👉 How governance scales across teams and time.`,
          coreConcepts: `**Subagents**

Subagents handle specialized tasks. They:

- Isolate responsibilities
- Control execution
- Reduce risk

**Workspace History**

History records all changes. It allows you to:

- Understand system evolution
- Review decisions
- Debug infrastructure

**Governance At Scale**

At scale, governance is not only about rules.

It is about:

- 👉 How work is executed
- 👉 How changes are tracked

**Iteration**

Understanding systems requires observing multiple changes over time.`,
          engineeringReflection: `Imagine multiple teams working on infrastructure.

Without structure:

- Engineers overlap in responsibilities
- Changes are unclear
- Debugging is slow

With structure:

- Responsibilities are separated
- Changes are visible
- Systems are easier to manage

This is governance at scale.`,
          stepByStep: `**Scenario**

You have an infrastructure environment where:

- Everything is handled in a single agent context
- Changes are made continuously
- Structure is limited

Your goal is to improve:

- Execution clarity
- System traceability

**Step 1 — Observe Current Behavior**

Generate or modify infrastructure. Do NOT introduce subagents yet.

Write at least 2 observations:

- What feels unclear
- What feels unstructured

**Step 2 — Identify A Limitation**

List at least 2 issues:

- Unclear responsibilities
- Inconsistent execution
- Lack of structure

**Step 3 — Form A Hypothesis**

Ask:

👉 What is missing from this system?

Possible answers:

- No separation of responsibilities
- No structured execution

Write your hypothesis.

**Step 4 — Introduce A Subagent**

Create a subagent for a specific task.

Example:

- Validation
- Configuration

Ensure the role is clearly defined.

**Step 5 — Execute Using The Subagent**

Run the same task using the subagent. Observe:

- What changed
- What became clearer

**Step 6 — Compare Before Vs After**

Compare:

- Without subagent
- With subagent

Write:

- What improved
- What is still unclear

**Step 7 — Analyze Workspace History**

Open workspace history. Review:

- Sequence of changes
- How actions are recorded

**Step 8 — Form A Second Hypothesis**

Ask:

👉 Does history make the system easier to understand?

Write your answer.

**Step 9 — Introduce Another Change**

Modify your infrastructure again. Then:

- Review history
- Analyze how the change appears

**Step 10 — Final Comparison**

Compare three states:

- No structure
- With subagent
- With history

Write:

- What improved at each stage
- Which component had the biggest impact`,
          handsOnExercise: `Using your workspace:

- Generate or modify infrastructure.
- Write observations.
- Identify issues.
- Form a hypothesis.
- Create a subagent.
- Execute using the subagent.
- Compare results.
- Review workspace history.
- Introduce another change.
- Analyze evolution.`,
          requiredArtifact: `You should have:

- One subagent with a clear role
- Multiple infrastructure iterations
- Visible history of changes

Plus:

A short explanation of:

- What improved
- How execution changed
- How history helped`,
          validationChecklist: [
            "Subagent has a clear and limited responsibility",
            "Execution became more structured",
            "History shows system evolution clearly",
            "You compared multiple states",
            "You understand how governance scales"
          ],
          failureAndDebugging: `Common mistakes:

- Creating subagents that are too broad
- Not comparing before and after
- Ignoring history

Correct approach:

- Observe
- Identify limitation
- Introduce structure
- Compare
- Iterate`,
          modificationExercise: `Refine your subagent. Make it more specific. Run the process again.

Observe:

- How behavior changes
- Whether clarity improves`,
          knowledgeCheck: {
            question: "What enables governance to scale across teams?",
            options: [
              "Manual review",
              "Subagents and workspace history",
              "Infrastructure size",
              "Number of engineers"
            ],
            correctAnswer: 1
          }
        }
      }
    ]
  },
  {
    id: "track-5-hands-on",
    trackNumber: 5,
    title: "Scalable Architecture",
    description: "Design infrastructure that supports multiple environments, handles growth, and remains stable as systems evolve over time.",
    color: "hsl(260, 70%, 58%)",
    accentColor: "hsl(260, 70%, 92%)",
    moduleCount: 2,
    estimatedHours: 3.5,
    modules: [
      {
        id: "t5-m1",
        title: "Designing a Scalable Infrastructure Architecture",
        sections: {
          whyThisMatters: `As systems grow, infrastructure becomes more complex. You are no longer building a single environment. You are designing systems that must:

- Support multiple environments
- Handle increasing traffic
- Remain reliable over time

At this stage, generating infrastructure is not enough. You must think about:

- Structure
- Scalability
- Resilience

If these are not considered:

- Systems may fail under load
- Environments may become inconsistent
- Changes may introduce instability

This module helps you understand:

- How architecture evolves through structured iteration`,
          coreConcepts: `**Environment Separation**

Infrastructure must support multiple environments. This includes:

- Development
- Staging
- Production

Each environment must be isolated but consistent.

**Scalability**

Systems must handle growth. This includes:

- Increasing traffic
- Additional services
- Evolving requirements

**Resilience**

Systems must remain stable. This includes:

- Handling failures
- Maintaining availability
- Avoiding single points of failure

**Iteration**

Architecture is refined step by step. You observe → adjust → validate.`,
          engineeringReflection: `Imagine two systems.

The first system:

- Is designed for a single environment
- Does not consider growth
- Has tightly coupled components

The second system:

- Separates environments
- Anticipates scaling
- Isolates components

Over time:

- The first system becomes fragile
- The second system remains stable

The difference is architecture.`,
          stepByStep: `**Step 1 — Generate Initial Architecture**

Ask the agent:

👉 "Create infrastructure for a web application with networking and compute."

Review the output carefully.

Write at least 2 observations:

- What is missing
- What is unclear

**Step 2 — Form A Hypothesis**

Ask:

👉 Why is this architecture not ready for scale?

Possible causes:

- No environment separation
- No scaling mechanisms
- No resilience considerations

Write your hypothesis.

**Step 3 — Introduce Environment Separation**

Refine your request:

👉 "Add support for development and production environments."

**Step 4 — Compare Outputs**

Compare:

- Initial architecture
- Multi-environment architecture

Write:

- What changed
- What improved
- What is still missing

**Step 5 — Introduce Scalability**

Refine your request:

👉 "Ensure the system can handle increased traffic."

**Step 6 — Compare Again**

Compare three states:

- Initial architecture
- Environment-aware architecture
- Scalable architecture

Write:

- What improved at each stage
- Which change had the biggest impact

**Step 7 — Introduce Resilience**

Refine your request:

👉 "Improve system resilience and avoid single points of failure."

**Step 8 — Compare Full Evolution**

Compare four states:

- Initial
- With environments
- With scalability
- With resilience

Write:

- What changed at each stage
- Where the biggest improvements occurred
- What is still incomplete

**Step 9 — Iterate One More Time**

Refine ONE aspect:

- Improve environment isolation
- OR
- Improve scaling strategy
- OR
- Improve resilience

Run again.

Observe:

- How small changes affect the system`,
          handsOnExercise: `Using your workspace:

1. Generate initial architecture.
2. Write at least 2 observations.
3. Form a hypothesis.
4. Add environment separation.
5. Compare results.
6. Add scalability.
7. Compare three states.
8. Add resilience.
9. Compare full evolution.
10. Apply one refinement.`,
          requiredArtifact: `You should have:

- An initial architecture
- A multi-environment architecture
- A scalable architecture
- A resilient architecture

Plus:

A short explanation of:

- What changed at each stage
- Which improvement had the biggest impact
- What remains challenging`,
          validationChecklist: [
            "Environments are clearly separated",
            "The system supports scaling",
            "The system avoids single points of failure",
            "You compared multiple iterations",
            "You understand architectural evolution"
          ],
          failureAndDebugging: `Common mistakes:

- Adding complexity without purpose
- Skipping comparison steps
- Trying to fix everything at once

Correct approach:

- Generate
- Observe
- Hypothesize
- Apply one change
- Compare
- Iterate`,
          modificationExercise: `Add a new requirement:

👉 "The system must support multiple regions."

Update your architecture.

Observe:

- How the system evolves
- What becomes more complex`,
          knowledgeCheck: {
            question: "What is the key to designing scalable architecture?",
            options: [
              "Generating more resources",
              "Iterating and refining structure",
              "Using a single environment",
              "Avoiding changes"
            ],
            correctAnswer: 1
          }
        }
      },
      {
        id: "t5-m2",
        title: "Evolving and Improving a Complex Infrastructure System",
        sections: {
          whyThisMatters: `Real systems are never finished.

They evolve over time.

As changes accumulate:

- Architecture becomes harder to understand
- Inconsistencies appear
- Complexity increases

At this stage, your role is not to build from scratch.

Your role is to:

- Understand
- Improve
- Evolve

This module helps you understand:

- How complex systems are improved through structured iteration`,
          coreConcepts: `**System Evolution**

Infrastructure changes over time. Each change affects the system.

**Complexity**

As systems grow:

- Dependencies increase
- Interactions become harder to track

**Incremental Improvement**

You should not redesign everything. You should improve step by step.

**Observation And Iteration**

You must:

- Observe
- Analyze
- Refine`,
          engineeringReflection: `Imagine a system that has evolved over time.

It works. But:

- Structure is unclear
- Components are inconsistent
- Behavior is unpredictable

You now have two options:

- Rebuild everything
- Improve the system gradually

The second approach is how real systems evolve.`,
          stepByStep: `**Scenario**

You have an infrastructure system that includes:

- Multiple environments
- Several components
- Existing scaling logic

But:

- Structure is inconsistent
- Resilience is uneven
- Behavior is difficult to predict

**Step 1 — Observe The System**

Review the infrastructure. Do not change anything yet.

Write at least 2 observations:

- What is unclear
- What is inconsistent

**Step 2 — Identify Issues**

List at least 2 problems:

- Weak scalability
- Missing resilience
- Inconsistent structure

**Step 3 — Form A Hypothesis**

Ask:

👉 Why does the system behave this way?

Write your hypothesis.

**Step 4 — Apply One Improvement**

Make one targeted change.

Example:

👉 Improve environment consistency or scaling behavior.

**Step 5 — Compare Results**

Compare:

- Before
- After

Write:

- What changed
- What improved
- What is still unclear

**Step 6 — Iterate Again**

Apply a second improvement. Do not change everything.

**Step 7 — Compare Multi-Step Evolution**

Compare three states:

- Initial system
- After first improvement
- After second improvement

Write:

- What improved at each stage
- Which change had the biggest impact

**Step 8 — Introduce A New Constraint**

Add a requirement:

👉 "The system must handle increased traffic without downtime."

Update the system.

**Step 9 — Final Comparison**

Compare:

- Original system
- Improved system
- Constrained system

Write:

- How the system evolved
- What became more complex
- What improved

**Step 10 — Validate Understanding**

Ask:

- What caused the original issues?
- What changes fixed them?
- How would the system behave at larger scale?`,
          handsOnExercise: `Using your system:

1. Observe the system.
2. Write observations.
3. Identify issues.
4. Form a hypothesis.
5. Apply one improvement.
6. Compare results.
7. Apply a second improvement.
8. Compare multiple states.
9. Introduce a constraint.
10. Analyze system evolution.`,
          requiredArtifact: `You should have:

- An initial system
- A partially improved system
- A refined system

Plus:

A short explanation of:

- Issues identified
- Improvements applied
- How the system evolved`,
          validationChecklist: [
            "You analyzed before changing",
            "You applied targeted improvements",
            "You compared multiple states",
            "The system improved over time",
            "You understand system evolution"
          ],
          failureAndDebugging: `Common mistakes:

- Making large changes at once
- Skipping comparison
- Not forming hypotheses

Correct approach:

- Observe
- Identify
- Hypothesize
- Fix
- Compare`,
          modificationExercise: `Add a new constraint:

👉 "The system must support an additional region."

Update your system.

Observe:

- How the system adapts
- What becomes more complex`,
          knowledgeCheck: {
            question: "What is the best way to improve a complex infrastructure system?",
            options: [
              "Rebuild everything",
              "Apply incremental improvements",
              "Ignore inconsistencies",
              "Remove components"
            ],
            correctAnswer: 1
          }
        }
      }
    ]
  },
  {
    id: "track-6-hands-on",
    trackNumber: 6,
    title: "Advanced Architecture",
    description: "Design multi-region resilient systems and enterprise infrastructure platforms that handle failure, scale, and organizational complexity.",
    color: "hsl(330, 65%, 55%)",
    accentColor: "hsl(330, 65%, 92%)",
    moduleCount: 2,
    estimatedHours: 4,
    modules: [
      {
        id: "t6-m1",
        title: "Designing a Multi-Region Resilient Architecture",
        sections: {
          whyThisMatters: `Earlier in the course, you designed an infrastructure system that is resilient inside a single region. That system includes:

- Multiple availability zones
- Load balancing
- Replication within a region

This protects against:

- Instance failures
- Availability zone failures

But one major risk remains:

👉 A regional outage can make the entire system unavailable

This module helps you understand:

- 👉 How infrastructure evolves from regional resilience → global resilience

And more importantly:

- 👉 How each architectural layer changes system behavior`,
          coreConcepts: `**Failure Domains**

Failures occur at multiple levels:

- Instances
- Availability zones
- Regions

Each layer requires a different architectural response.

**Multi-Region Architecture**

Infrastructure is deployed across regions to prevent total system failure.

**Traffic Routing**

Users must be routed dynamically between regions.

**Data Replication**

Data must be available across regions. This introduces trade-offs:

- Consistency
- Latency
- Complexity

**Layered Resilience**

Resilience is built progressively:

👉 Instance → Zone → Region`,
          engineeringReflection: `Open your current architecture. Ask:

- What failures are already handled?
- What failures are NOT handled?

Now answer clearly:

- What would happen during a regional outage?`,
          stepByStep: `**Step 1 — Observe The Current System**

Do NOT modify anything.

Write at least 2 observations:

- What makes the system resilient
- What is still a single point of failure

**Step 2 — Identify The Limitation**

Write at least 2 issues:

- No regional redundancy
- No global routing
- No cross-region replication

**Step 3 — Form A Hypothesis**

Ask:

👉 Why would this system fail during a regional outage?

Write your hypothesis.

**Step 4 — Extend To Multi-Region**

Ask the agent:

👉 "Extend this infrastructure so it runs across two regions with failover."

**Step 5 — Compare Architectures**

Compare:

- Single-region system
- Multi-region system

Write:

- What changed
- What improved
- What became more complex

**Step 6 — Analyze Traffic Routing**

Inspect the new architecture.

Write at least 2 observations:

- How traffic is routed
- What happens during failure

**Step 7 — Analyze Data Replication**

Write at least 2 observations:

- How data is replicated
- What risks exist

**Step 8 — Compare System Evolution**

Compare three states:

- Single-region
- Multi-region (basic)
- Multi-region with routing + replication

Write:

- What improved at each stage
- Which layer had the biggest impact

**Step 9 — Introduce Active-Active Architecture**

Refine your request:

👉 "Make both regions actively serve traffic."

**Step 10 — Compare Trade-Offs**

Compare:

- Active-passive
- Active-active

Write:

- What improved
- What trade-offs appeared
- What became more complex

**Step 11 — Validate System Behavior**

Ask:

- Does the system survive regional failure?
- How quickly does failover occur?
- What risks remain?`,
          handsOnExercise: `Using your workspace:

- Observe current system
- Write observations
- Identify limitations
- Form hypothesis
- Extend to multi-region
- Compare results
- Analyze routing
- Analyze replication
- Compare evolution
- Introduce active-active
- Analyze trade-offs`,
          requiredArtifact: `You should have:

- A multi-region architecture
- A failover-capable system
- A traffic routing strategy
- A replication strategy

Plus:

A written explanation of:

- System evolution
- Trade-offs introduced
- Remaining risks`,
          validationChecklist: [
            "System operates across regions",
            "Traffic is routed globally",
            "Data is replicated",
            "Failover is possible",
            "You compared multiple stages",
            "You understand trade-offs"
          ],
          failureAndDebugging: `Common mistakes:

- Ignoring replication consistency
- Assuming failover is instant
- Not analyzing routing behavior

Correct approach:

- Observe
- Identify
- Hypothesize
- Extend
- Compare
- Analyze`,
          modificationExercise: `Add a requirement:

👉 "Failover must be automatic and near real-time."

Update your system.

Observe:

- How routing changes
- What complexity increases`,
          knowledgeCheck: {
            question: "What does multi-region architecture primarily protect against?",
            options: [
              "Instance failure",
              "Regional failure",
              "Network latency",
              "Storage limits"
            ],
            correctAnswer: 1
          }
        }
      },
      {
        id: "t6-m2",
        title: "Designing and Evolving an Enterprise Infrastructure Platform",
        sections: {
          whyThisMatters: `So far, you have designed a single infrastructure system. But real organizations operate:

- Multiple teams
- Multiple systems
- Multiple environments

Without structure:

- Teams build differently
- Systems become inconsistent
- Operations become complex

To solve this, organizations build:

👉 Infrastructure platforms

This module helps you understand:

👉 How infrastructure evolves from single system → organization-wide platform`,
          coreConcepts: `**Platform Architecture**

Platforms provide shared infrastructure foundations.

**Shared Services**

Common components:

- Networking
- Identity
- Monitoring

**Governance Integration**

Platforms enforce:

- Standards
- Security
- Consistency

**Self-Service**

Teams deploy infrastructure independently.

**Trade-Offs**

Platforms must balance:

- Control
- Flexibility`,
          engineeringReflection: `Imagine 10 teams building infrastructure.

Ask:

- Would their systems look the same?
- Would security be consistent?
- Would operations be manageable?

Now imagine a platform exists.

👉 This is the shift from system → organization thinking.`,
          stepByStep: `**Step 1 — Observe Current System**

Write at least 2 observations:

- What is reusable
- What is duplicated

**Step 2 — Identify Limitations**

Write at least 2 issues:

- No shared services
- Inconsistent patterns
- Lack of governance

**Step 3 — Form A Hypothesis**

Ask:

👉 Why does infrastructure diverge across teams?

Write your hypothesis.

**Step 4 — Design Platform Architecture**

Ask the agent:

👉 "Design a platform supporting multiple teams."

**Step 5 — Identify Platform Components**

Write:

- Shared networking
- Identity systems
- Monitoring services

**Step 6 — Compare Architectures**

Compare:

- Single-system
- Platform architecture

Write:

- What changed
- What improved
- What became more complex

**Step 7 — Analyze Governance**

Write at least 2 observations:

- How standards are enforced
- Where rules apply

**Step 8 — Analyze Self-Service**

Write at least 2 observations:

- How teams deploy infrastructure
- What constraints exist

**Step 9 — Introduce Governance Constraint**

Refine the platform with governance requirements.

**Step 10 — Compare System Evolution**

Compare three states:

- No platform
- Platform without constraints
- Platform with governance

Write:

- What improved at each stage
- Which layer had the biggest impact

**Step 11 — Introduce Scale Pressure**

Add:

"Support 20+ teams with different use cases."

Update the platform.

**Step 12 — Final Evaluation**

Ask:

- Is the platform still usable?
- Is governance too strict?
- Where does complexity increase?`,
          handsOnExercise: `Using your workspace:

- Observe current system
- Identify issues
- Form hypothesis
- Design platform
- Identify components
- Compare architectures
- Analyze governance
- Analyze self-service
- Add constraints
- Compare evolution
- Add scale pressure
- Evaluate system`,
          requiredArtifact: `You should have:

- A platform architecture
- Shared infrastructure components
- Governance integration

Plus:

A written explanation of:

- System evolution
- Trade-offs
- Scaling challenges`,
          validationChecklist: [
            "Platform supports multiple teams",
            "Shared services exist",
            "Governance is enforced",
            "Self-service is possible",
            "You compared multiple stages",
            "You understand platform trade-offs"
          ],
          failureAndDebugging: `Common mistakes:

- Making the platform too rigid
- Ignoring developer experience
- Over-centralizing control

Correct approach:

1. Observe
2. Identify
3. Hypothesize
4. Design
5. Compare
6. Iterate`,
          modificationExercise: `Add:

👉 "Teams must deploy using predefined templates."

Update your platform.

Observe:

- How flexibility changes
- How governance improves`,
          knowledgeCheck: {
            question: "What is the main purpose of a platform architecture?",
            options: [
              "Reduce infrastructure size",
              "Provide shared foundations across teams",
              "Remove governance",
              "Replace engineers"
            ],
            correctAnswer: 1
          }
        }
      }
    ]
  }
];

export function getHandsOnTrack(trackId: string): HandsOnTrack | undefined {
  return handsOnTracks.find(t => t.id === trackId);
}

export function getHandsOnModule(trackId: string, moduleId: string): { track: HandsOnTrack; module: HandsOnModule; moduleIndex: number } | undefined {
  const track = handsOnTracks.find(t => t.id === trackId);
  if (!track) return undefined;
  const moduleIndex = track.modules.findIndex(m => m.id === moduleId);
  if (moduleIndex === -1) return undefined;
  return { track, module: track.modules[moduleIndex], moduleIndex };
}
