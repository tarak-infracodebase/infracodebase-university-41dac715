export interface Exercise {
  title: string;
  description: string;
}

export interface Artifact {
  title: string;
  description: string;
}

export interface KnowledgeCheck {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Lesson {
  id: string;
  title: string;
  whyThisMatters: string;
  whatYoullLearn?: string[];
  coreConceptsTitle?: string;
  coreConcepts: string;
  stepByStep?: string;
  exercise: Exercise;
  artifact: Artifact;
  validationChecklist: string[];
  failureAndDebugging?: string;
  modificationExercise?: string;
  engineeringReflection?: string;
  knowledgeCheck?: KnowledgeCheck;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  estimatedTime?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface LearningPath {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  courses: Course[];
  order: number;
  color: string;
}

export const learningPaths: LearningPath[] = [
  {
    id: "welcome-orientation",
    title: "Welcome & Orientation",
    shortTitle: "Welcome",
    description: "Introduce the program and understand the problem with fragmented infrastructure tooling, why infrastructure knowledge must be connected, how Infracodebase works, and how the program is structured.",
    icon: "Compass",
    order: 1,
    color: "primary",
    courses: [
      {
        id: "welcome-overview",
        title: "Welcome & Overview",
        description: "What this course is about, what you will learn, and how to get started with Infracodebase.",
        difficulty: "beginner",
        estimatedTime: "30 min",
        lessons: [
          {
            id: "introduction",
            title: "Introduction",
            whyThisMatters: "If you are here, you probably want to understand how to design, build, and operate infrastructure using Infracodebase. Maybe you are completely new to it. Maybe you already work with infrastructure as code and you are curious how AI agents change the way infrastructure is built. Either way, this course will help you understand how Infracodebase works and how to use it effectively.",
            whatYoullLearn: [
              "What Infracodebase is",
              "How workspaces are organized",
              "How you collaborate with the agent to design infrastructure",
              "How infrastructure workflows evolve when AI agents become part of the engineering process"
            ],
            coreConcepts: "We will start with the foundations. You will learn what Infracodebase is, how workspaces are organized, and how you collaborate with the agent to design infrastructure. Then we will move toward real infrastructure scenarios, governance, and architecture design. The goal is not only to show you where things are inside Infracodebase. The goal is to help you understand how infrastructure workflows evolve when AI agents become part of the engineering process.",
            exercise: {
              title: "Identify Your Role",
              description: "Think about which role best describes you: platform engineer, DevOps engineer, cloud architect, infrastructure engineer, or engineering team member adopting AI-assisted workflows."
            },
            artifact: {
              title: "Learning Goals",
              description: "Write a short description of what you hope to learn from this course and how it applies to your current work."
            },
            validationChecklist: [
              "Understand the scope of the course",
              "Know who the course is designed for",
              "Have a clear sense of the learning journey"
            ]
          },
          {
            id: "who-is-this-for",
            title: "Who Is This Course For?",
            whyThisMatters: "This course is designed for anyone who wants to understand how infrastructure can be designed and managed using Infracodebase.",
            coreConcepts: "You might be a platform engineer, a DevOps engineer, a cloud architect, an infrastructure engineer, or part of an engineering team adopting AI-assisted infrastructure workflows. No matter your background, this course will help you understand how modern infrastructure is designed and managed.",
            exercise: {
              title: "Self-Assessment",
              description: "Identify your current experience level with infrastructure as code tools and write one sentence about what you hope to gain."
            },
            artifact: {
              title: "Role Description",
              description: "A brief note about your role and how infrastructure work fits into your responsibilities."
            },
            validationChecklist: [
              "Identified your role",
              "Understood the target audience",
              "Set personal learning goals"
            ]
          },
          {
            id: "what-you-will-learn",
            title: "What You Will Learn",
            whyThisMatters: "Understanding the full scope of the program helps you prioritize and focus your learning journey.",
            coreConcepts: "Infracodebase University is structured as a series of tracks. Each track focuses on a different aspect of working with infrastructure.\n\n**Track 1 — Foundations: Understanding Infracodebase**\nYou will learn what Infracodebase is, how workspaces are organized, how the agent works, and how infrastructure projects are structured.\n\n**Track 2 — Real Infrastructure Scenarios**\nYou will apply Infracodebase to real situations such as building new infrastructure, creating landing zones, modernizing ClickOps environments, migrating infrastructure, and improving security and cost efficiency.\n\n**Track 3 — Architecture Diagrams & Living Documentation**\nYou will learn how to generate, maintain, and use architecture diagrams and documentation that stay connected to your infrastructure.\n\n**Track 4 — Enterprise Governance & Platform Engineering**\nYou will understand how organizations enforce standards, manage rulesets, and support multiple engineering teams.\n\n**Track 5 — Advanced Infrastructure Architecture**\nYou will explore how experienced engineers design resilient systems, multi-cloud architectures, and shared infrastructure foundations.",
            exercise: {
              title: "Map Your Learning Path",
              description: "Review the track descriptions and identify which tracks are most relevant to your current work."
            },
            artifact: {
              title: "Learning Path Priority",
              description: "A prioritized list of tracks based on your learning needs."
            },
            validationChecklist: [
              "Reviewed all five tracks",
              "Identified most relevant tracks",
              "Understand the progression from foundations to advanced topics"
            ]
          },
          {
            id: "what-you-will-be-able-to-do",
            title: "What You Will Be Able to Do",
            whyThisMatters: "By the end of this course, you should understand not only how to use Infracodebase, but also how modern infrastructure systems are designed and managed.",
            coreConcepts: "By the end of this course, you should be able to:\n\n- Understand how infrastructure work is organized inside Infracodebase\n- Collaborate effectively with the agent to design infrastructure\n- Generate and review infrastructure as code\n- Structure infrastructure projects using workspaces, rulesets, and workflows\n- Visualize systems using architecture diagrams\n- Keep documentation synchronized with infrastructure\n- Apply governance and engineering standards across projects\n- Design more resilient and scalable infrastructure systems",
            exercise: {
              title: "Define Success Criteria",
              description: "Write three specific things you want to be able to do after completing this course."
            },
            artifact: {
              title: "Success Criteria",
              description: "A list of three measurable outcomes for your learning journey."
            },
            validationChecklist: [
              "Defined personal success criteria",
              "Understand the course outcomes",
              "Ready to begin the learning journey"
            ]
          },
          {
            id: "how-to-approach",
            title: "How to Approach This Course",
            whyThisMatters: "Getting the most out of the course requires the right approach and mindset.",
            coreConcepts: "There are no prerequisites for this course. But here are a few ways to get the most out of it.\n\n**Follow along inside Infracodebase.** The best way to learn is by doing. As you go through the lessons, try performing the exercises inside your own workspace. Seeing how the agent responds and reviewing the generated infrastructure will make the concepts much clearer.\n\n**Don't treat the agent as an autopilot.** One important idea in this course is that the agent is a collaborator. It can help you design and generate infrastructure. But you should always review what it produces. Part of learning Infracodebase is learning how to guide the agent effectively.\n\n**Focus on understanding the workflow.** This course is not only about generating infrastructure code. It is about understanding the full workflow around infrastructure: architecture, documentation, governance, review, and evolution over time.\n\nInfracodebase connects these pieces together. Understanding that bigger picture will make the rest of the course much more useful.\n\nTrack 1, which covers the foundations of Infracodebase, usually takes about 60 to 90 minutes to complete if you follow the exercises. Some lessons are short and conceptual. Others include hands-on activities. The best way to learn Infracodebase is by trying things inside your own workspace and seeing how the agent responds.",
            exercise: {
              title: "Set Up Your Environment",
              description: "Create your Infracodebase account and familiarize yourself with the workspace interface."
            },
            artifact: {
              title: "Preparation Checklist",
              description: "A completed checklist confirming you have access and understand the learning approach."
            },
            validationChecklist: [
              "Understand the hands-on approach",
              "Know that the agent is a collaborator, not autopilot",
              "Ready to start with Track 1"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "foundations",
    title: "Foundations — Understanding Infracodebase",
    shortTitle: "Foundations",
    description: "Learn the operating model of Infracodebase including enterprises, workspaces, rulesets, workflows, agents, subagents, documentation, architecture diagrams, GitHub integration, and infrastructure history.",
    icon: "Layers",
    order: 2,
    color: "primary",
    courses: [
      {
        id: "understanding-infracodebase",
        title: "Understanding Infracodebase",
        description: "Learn what Infracodebase is, how it is organized, and how engineers collaborate with the AI agent.",
        difficulty: "beginner",
        estimatedTime: "90 min",
        lessons: [
          {
            id: "what-is-infracodebase",
            title: "What is Infracodebase",
            whyThisMatters: "First question you might ask yourself. What exactly is Infracodebase? And maybe another important question. Why would I want to use it? Because if you misunderstand what Infracodebase is, you might think it is simply a tool that generates infrastructure code. But that is not the full picture. Infracodebase is designed as an agent operating system for infrastructure as code. That means it is not just generating code. It gives you an environment where you can design, build, review, and operate infrastructure with the help of AI agents. Understanding this changes how you approach Infracodebase. Because instead of thinking: \"this writes Terraform for me\" you start thinking: \"I can work with an agent inside one environment where architecture, code, documentation, and decisions stay connected.\"",
            whatYoullLearn: ["What Infracodebase is", "Why it exists", "What problem it solves", "How it fits into the process of building infrastructure"],
            coreConcepts: "Let's start with something very common in infrastructure work. When you build infrastructure today, you usually use many different tools. For example: one tool to design architecture, another tool to write infrastructure code, another tool to manage Git repositories, another tool to store documentation, another tool to review security, another tool to deploy infrastructure, another tool to visualize diagrams. This creates a fragmented workflow. You move from tool to tool. You copy information between systems. You lose context. Documentation drifts away from the real infrastructure. Architecture decisions get separated from the code. And teams spend more time coordinating tools than designing systems well. This is the problem Infracodebase is trying to solve.\n\nInstead of spreading this work across many tools, Infracodebase brings the pieces together into one connected environment. Inside a workspace you can: design infrastructure, generate infrastructure code, review architecture, collaborate with engineers, connect Git repositories, visualize systems, upload documentation, and track changes over time.\n\nAnd Infracodebase works across multiple cloud providers: AWS, Azure, GCP. It also supports infrastructure as code languages such as: Terraform, Pulumi, OpenTofu.",
            stepByStep: "Imagine you open Infracodebase for the first time. You enter a workspace. Inside the workspace you see several things: a chat interface, infrastructure files, architecture diagrams, project documentation, and history of changes. All of these elements are connected. The agent can understand the context of the workspace and help you generate, review, or modify infrastructure.",
            exercise: {
              title: "Infrastructure Tool Audit",
              description: "Think about the last infrastructure project you worked on. Write down the tools you used for: architecture, infrastructure code, documentation, deployment, and security review. Then answer this question: Where did context get lost between those tools?"
            },
            artifact: {
              title: "Workflow Fragmentation Analysis",
              description: "Write a short description of: \"How infrastructure projects are normally built today, and where the workflow becomes fragmented.\""
            },
            validationChecklist: [
              "Understand what Infracodebase is",
              "Understand why it exists",
              "Understand what problem it solves",
              "Understand why it is described as an agent operating system"
            ],
            knowledgeCheck: {
              question: "Your team uses Terraform, a wiki, GitHub, a diagram tool, and separate security review documents. What is the main problem Infracodebase is trying to solve?",
              options: ["Replace cloud providers", "Replace engineers", "Bring fragmented infrastructure work into one connected environment", "Only generate Terraform faster"],
              correctAnswer: 2
            }
          },
          {
            id: "getting-started",
            title: "Getting Started",
            whyThisMatters: "Before you start building infrastructure, you need to understand how Infracodebase is organized. Because Infracodebase is not simply a list of projects. It has a structure. Understanding that structure helps you navigate it more easily. It also helps you understand where organization-level work happens and where project-level work happens.",
            whatYoullLearn: ["How to create an account", "What an enterprise environment is", "How to create your first workspace", "How Infracodebase is organized"],
            coreConcepts: "When you create an account in Infracodebase, something important happens automatically. An enterprise environment is created. You can think of the enterprise as the top-level container. Inside the enterprise you manage: people, teams, workspaces, rules, integrations, and subagents.\n\nThen inside the enterprise you create workspaces. A workspace is where infrastructure projects live. This is where you interact with the agent. This is where infrastructure code, documentation, diagrams, and history stay together. So you can think about it like this. The enterprise is the organizational layer. The workspace is the project layer.",
            stepByStep: "1. Create an account in Infracodebase.\n2. Review the enterprise environment created automatically.\n3. Create your first workspace.\n4. Explore the workspace sections.",
            exercise: {
              title: "Create Your First Workspace",
              description: "Create a workspace called: my-first-infrastructure-project. Before asking the agent to generate anything, write one sentence explaining: What is the difference between the enterprise and the workspace? Then ask the agent: Create a Terraform configuration for an AWS VPC with public and private subnets."
            },
            artifact: {
              title: "Enterprise vs Workspace",
              description: "A workspace created inside your enterprise, plus a one-sentence explanation of the difference between enterprise and workspace."
            },
            validationChecklist: [
              "Have an enterprise environment",
              "Have a workspace",
              "Started a conversation with the agent",
              "Understand how Infracodebase is organized"
            ],
            knowledgeCheck: {
              question: "Your organization wants to manage members, teams, and shared rules in one place, while keeping each infrastructure project separate. Where should those shared controls live?",
              options: ["In a diagram", "In the enterprise", "In a single infrastructure file", "In the code editor"],
              correctAnswer: 1
            }
          },
          {
            id: "what-happens-by-default",
            title: "What Happens by Default",
            whyThisMatters: "When working with AI systems, people often ask an important question. What happens if I do not configure anything? With Infracodebase, you can start immediately. But organizations often want more control over how the agent behaves. So understanding configuration hierarchy is important.",
            whatYoullLearn: ["How the agent behaves by default", "How configuration hierarchy works", "How organizations enforce standards", "What happens when rules conflict"],
            coreConcepts: "When you start using Infracodebase, the agent follows standard engineering best practices. So you can begin working immediately. However, organizations often define their own standards. For example: naming conventions, security requirements, architecture patterns, tagging policies, default regions.\n\nThese rules can exist at different levels: Enterprise, Workspace, User.\n\nEnterprise configuration applies everywhere. Workspace configuration applies to a specific project. User configuration controls personal preferences. If a conflict happens, enterprise rules always take priority. That is how organizations enforce global standards without having to repeat them in every workspace.",
            stepByStep: "1. Open enterprise settings.\n2. Look at the configuration sections.\n3. Then open workspace settings.\n4. Compare how configuration can exist at multiple levels.\n5. Identify one example of a rule that should live at the enterprise level, and one that makes more sense at the workspace level.",
            exercise: {
              title: "Configuration Inheritance",
              description: "Write an example showing configuration inheritance. Example: Enterprise rule → all resources must have tags. Workspace rule → environment = development. User preference → default region. Then write one sentence explaining which rule wins if a conflict appears."
            },
            artifact: {
              title: "Configuration Levels",
              description: "A short explanation of the three configuration levels, including what happens during a conflict."
            },
            validationChecklist: [
              "Understand enterprise configuration",
              "Understand workspace configuration",
              "Understand user configuration",
              "Understand why enterprise rules have the highest priority"
            ],
            knowledgeCheck: {
              question: "An enterprise rule requires encryption on all storage resources. A workspace rule says development buckets can skip encryption. You ask the agent to create an unencrypted bucket in that workspace. What should happen?",
              options: ["The workspace rule overrides the enterprise rule", "The user preference overrides both", "The enterprise rule takes priority and encryption is enforced", "The agent ignores both rules"],
              correctAnswer: 2
            }
          },
          {
            id: "inviting-people-teams",
            title: "Inviting People and Creating Teams",
            whyThisMatters: "Now let's imagine something very common. You are not building infrastructure alone. Maybe you are part of a small team. Maybe you are part of a larger platform engineering organization. In both cases, multiple engineers need to collaborate on the same infrastructure.",
            whatYoullLearn: ["How members are invited into the enterprise", "How roles define what someone is allowed to do", "How teams simplify collaboration"],
            coreConcepts: "Inside your enterprise you can invite other engineers. Each person who joins the enterprise is called a member. Members receive a role. Roles determine what someone can do in Infracodebase.\n\nFor example: Owner - manages the enterprise and billing. Admin - manages settings and members. Editor - creates and modifies infrastructure. Viewer - can see resources but cannot modify them.\n\nNow imagine you have ten engineers working together. Instead of assigning permissions individually for every workspace, you can create teams: Platform Team, Security Team, DevOps Team. Then you assign teams to workspaces. When someone joins or leaves a team, their access updates automatically.",
            stepByStep: "1. Open the enterprise settings.\n2. Navigate to the Members section.\n3. Invite a new member by email.\n4. Assign a role.\n5. Navigate to the Teams section.\n6. Create a team.\n7. Add the member to that team.",
            exercise: {
              title: "Create a Team",
              description: "Create a team called Platform Team. Add one member to that team. Then write one sentence answering: Why is managing access through teams easier than assigning access user by user across every workspace?"
            },
            artifact: {
              title: "Team Setup",
              description: "One invited member, one created team, and one member assigned to the team."
            },
            validationChecklist: [
              "One invited member",
              "One created team",
              "One member assigned to the team",
              "Clear understanding of why teams simplify access management"
            ],
            knowledgeCheck: {
              question: "Your company has 20 engineers working across many infrastructure projects. What is the main advantage of using teams?",
              options: ["Teams generate infrastructure automatically", "Teams simplify how access is managed across workspaces", "Teams replace user roles", "Teams replace the enterprise"],
              correctAnswer: 1
            }
          },
          {
            id: "the-agent",
            title: "The Agent",
            whyThisMatters: "Now imagine you want to build infrastructure. Traditionally you would start writing infrastructure code. For example Terraform. You would create files. Define resources. Configure networking. And then review everything carefully. This process takes time. The idea behind Infracodebase is different. Instead of starting with code, you start with intent. You describe what you want to build. The agent then helps generate the infrastructure. But something important needs to be said clearly. The agent helps you. It does not remove the need for engineering judgment.",
            whatYoullLearn: ["What the agent does", "How the agent interprets your requests", "How engineers collaborate with the agent", "What the right mental model is when working with it"],
            coreConcepts: "The agent understands natural language. You describe the infrastructure you want. For example: Create a Terraform configuration for an S3 bucket with encryption enabled.\n\nThe agent then: reads the workspace context, applies rulesets, follows workflows, uses available tools when needed, and generates infrastructure code.",
            stepByStep: "Open your workspace. Start a conversation with the agent. Describe the infrastructure you want to create. Watch as the agent generates infrastructure files. Then review what it created before assuming it is correct.",
            exercise: {
              title: "First Agent Interaction",
              description: "Ask the agent: Create a Terraform configuration for an S3 bucket with encryption enabled. Then review the result and answer: Did the output clearly reflect the encryption requirement? What would you still want to review before using this in a real project?"
            },
            artifact: {
              title: "Agent Output Review",
              description: "Terraform configuration generated by the agent, plus one sentence describing what you would review manually."
            },
            validationChecklist: [
              "Generated infrastructure code",
              "Reviewed the output critically",
              "Understood that the agent helps but still requires engineering oversight"
            ],
            knowledgeCheck: {
              question: "Which statement best describes the role of the agent in Infracodebase?",
              options: ["It replaces engineers entirely", "It acts as a collaborator that helps generate and refine infrastructure", "It only works for diagrams", "It can be trusted without review in production environments"],
              correctAnswer: 1
            }
          },
          {
            id: "prompting-best-practices",
            title: "Prompting Best Practices",
            whyThisMatters: "The agent understands natural language. But the way you describe what you want matters. A vague request often produces a vague result. A clear request produces a much better outcome. So learning how to express your intent clearly is extremely important.",
            whatYoullLearn: ["How prompts influence the agent's output", "How to express infrastructure intent clearly", "How to structure a better request", "How to refine requests step by step"],
            coreConcepts: "A strong prompt usually contains three things: Role, Goal, and Constraints.\n\nWhat you are building. What you want the agent to produce. What rules, requirements, or security expectations must be respected.\n\n**Example 1 (Weak):** Create an aws_s3_bucket resource.\n\nTechnically this works. But it gives very little information about the purpose of the system.\n\n**Example 2 (Strong):** Create a Terraform configuration for an S3 bucket used for application logs. Enable encryption, versioning, and tags for environment and owner.\n\nThis prompt is much clearer. It describes the purpose of the resource, security requirements, and configuration expectations. This allows the agent to generate infrastructure that is much closer to what you actually need.",
            exercise: {
              title: "Improve a Prompt",
              description: "Rewrite the following prompt: 'Create an aws_s3_bucket resource.' Transform it into a better request that includes: purpose, security requirements, and at least one tagging expectation."
            },
            artifact: {
              title: "Improved Prompt",
              description: "An improved prompt describing infrastructure intent."
            },
            validationChecklist: [
              "Understand why clear prompts matter",
              "Know how to provide context in requests",
              "Know how constraints improve results",
              "Understand how better prompts produce better infrastructure"
            ],
            knowledgeCheck: {
              question: "You ask the agent: 'Create storage for my app.' The result is incomplete and does not include encryption or tagging. What is the most likely problem?",
              options: ["The agent cannot generate storage resources", "The request was too vague and missing constraints"],
              correctAnswer: 1
            }
          },
          {
            id: "debugging-the-agent",
            title: "Debugging the Agent",
            whyThisMatters: "Every lesson looks easy when the agent works perfectly. But real engineering work is not like that. Sometimes the agent misunderstands what you want. Sometimes it generates code that fails validation. Sometimes a ruleset blocks the output. So you need to know how to debug the agent when something goes wrong. This is one of the most important skills in Infracodebase.",
            whatYoullLearn: ["What common agent mistakes look like", "How to debug generated infrastructure", "How rules, prompts, and validation all affect the result", "How to correct the agent instead of starting over blindly"],
            coreConcepts: "When the agent produces the wrong result, there are usually a few common causes: The prompt was too vague. The ruleset introduced constraints you forgot about. The workflow required a different sequence. The code is incomplete or invalid. The architecture intent was never stated clearly.\n\nSo instead of thinking 'the agent failed', it is more useful to think: 'What part of the instruction, context, or validation path caused the issue?'\n\nA good debugging process usually looks like this:\n1. Review the output carefully\n2. Identify what is wrong\n3. Check whether a ruleset affected the result\n4. Check whether the request was too vague\n5. Refine the prompt\n6. Regenerate or modify the code",
            exercise: {
              title: "Debug Agent Output",
              description: "Ask the agent: Create a Terraform configuration for an S3 bucket for application logs. Then review the output. If encryption, versioning, or tags are missing, ask the agent to correct the configuration. Your goal is not only to generate the bucket. Your goal is to spot what is missing and improve it."
            },
            artifact: {
              title: "Debug Report",
              description: "A short note describing: what issue you found, why you think it happened, and how you corrected it."
            },
            validationChecklist: [
              "Agent output still needs review",
              "Know how to identify common agent mistakes",
              "Know how to correct the result through refinement",
              "Understand debugging is part of normal infrastructure work"
            ],
            knowledgeCheck: {
              question: "You ask the agent to create a storage bucket. The generated code works, but it does not include required tags from your organization. What is the best next step?",
              options: ["Delete the workspace", "Assume the tags are optional", "Review the rules and ask the agent to regenerate the bucket with the required tagging standard", "Move directly to deployment"],
              correctAnswer: 2
            }
          },
          {
            id: "subagents",
            title: "Subagents",
            whyThisMatters: "As infrastructure projects grow, different tasks require different expertise. For example: Git operations, security reviews, compliance validation. Instead of one agent trying to handle everything, Infracodebase allows specialized agents to focus on specific tasks. These are called subagents.",
            whatYoullLearn: ["What subagents are", "Why specialized agents are useful", "How organizations can create their own agents"],
            coreConcepts: "A subagent is a specialized AI agent designed for a particular task. Each subagent can have its own instructions, its own tools, and its own model.\n\nFor example, Infracodebase can include a Git agent focused on operations such as creating branches, committing changes, and pushing updates.\n\nOrganizations can also create custom subagents. For example: a security audit agent, a compliance validation agent, a diagram review agent. The idea is simple. Instead of one general agent doing everything the same way, specialized agents can handle different kinds of work more effectively.",
            exercise: {
              title: "Design a Subagent",
              description: "Think about one task your organization performs repeatedly. Design a potential subagent that could help with that task. Describe: what the subagent would do, what inputs it would need, and what output it should produce."
            },
            artifact: {
              title: "Subagent Design",
              description: "One description of a potential custom subagent."
            },
            validationChecklist: [
              "Understand what subagents are",
              "Understand why specialized agents are useful",
              "Understand how they can support different kinds of infrastructure work"
            ],
            knowledgeCheck: {
              question: "Your team wants one agent focused only on reviewing generated infrastructure for policy compliance. What is the best description of that setup?",
              options: ["A replacement for the main agent", "A specialized subagent for compliance validation", "A cloud provider feature", "A secret"],
              correctAnswer: 1
            }
          },
          {
            id: "tools-integrations",
            title: "Tools and Integrations",
            whyThisMatters: "Sometimes the agent needs more information than what is inside the workspace. For example: Maybe it needs to inspect resources that already exist in your cloud account. Maybe it needs to interact with a Git repository. Maybe it needs to retrieve information from an internal API. Without access to those systems, the agent would only work with the files inside the workspace. That is where tools and integrations become important.",
            whatYoullLearn: ["How the agent connects to external systems", "What tools are in Infracodebase", "How integrations expand what the agent can do"],
            coreConcepts: "The agent can interact with external systems through tools. A tool is essentially a connection between the agent and another system. For example, a tool can allow the agent to interact with: AWS, GitHub, Terraform Cloud, Kubernetes, internal APIs.\n\nThese connections allow the agent to retrieve information or perform actions outside the workspace. The way these integrations work is through something called the Model Context Protocol, often abbreviated as MCP. The Model Context Protocol gives AI agents a standardized way to communicate with external systems.\n\nIn practical terms, it means the agent can safely interact with tools while maintaining clear boundaries.",
            exercise: {
              title: "Identify Integration Needs",
              description: "Open the Tools section in your enterprise settings. Look at the available integrations. Then write down three systems your organization would want the agent to interact with, and why."
            },
            artifact: {
              title: "Integration List",
              description: "A short list of three systems that could be connected through tools, plus one sentence describing why each one matters."
            },
            validationChecklist: [
              "Understand what tools are in Infracodebase",
              "Understand how the agent connects to external systems",
              "Understand why integrations expand the agent's capabilities"
            ],
            knowledgeCheck: {
              question: "You want the agent to inspect an existing AWS environment instead of only working from files in the workspace. What makes that possible?",
              options: ["Infrastructure templates", "Tools connected through MCP", "Public workspaces", "Diagram generation"],
              correctAnswer: 1
            }
          },
          {
            id: "rulesets",
            title: "Rulesets",
            whyThisMatters: "Your organization has several teams building infrastructure. Each team is working on different projects. But the organization still wants infrastructure to follow certain standards. Without clear rules, different teams might implement infrastructure differently. Over time this creates inconsistency. And inconsistency can lead to security issues or operational problems. This is where rulesets become important.",
            whatYoullLearn: ["What rulesets are", "Why organizations use them", "How rulesets guide the behavior of the agent"],
            coreConcepts: "A ruleset is a collection of instructions that the agent must follow. These instructions are written in plain language. For example, a rule might say: \"All S3 buckets must have encryption enabled.\" Another rule might say: \"All resources must include environment tags.\"\n\nRulesets help ensure that infrastructure created by the agent follows the organization's standards. Rulesets can exist at three levels: Enterprise, Workspace, User.\n\nEnterprise rules apply across the entire organization. Workspace rules apply only to a specific project. User rules represent personal preferences. When rules conflict, enterprise rules always take priority.",
            stepByStep: "1. Open the workspace settings.\n2. Navigate to the Rulesets section.\n3. Create a new ruleset.\n4. Add a rule describing a security requirement.\n5. Save the ruleset.\n6. Generate or modify infrastructure and see how the rule affects the result.",
            exercise: {
              title: "Create a Ruleset",
              description: "Create a rule that says: 'All S3 buckets must have encryption enabled.' Then ask the agent to generate a bucket. Review whether the rule is reflected in the output. If something is missing, ask the agent to correct it."
            },
            artifact: {
              title: "Workspace Ruleset",
              description: "One workspace ruleset containing at least one rule, plus one generated or corrected infrastructure example showing how the rule affects the result."
            },
            validationChecklist: [
              "One ruleset created",
              "One rule describing an infrastructure standard",
              "One example of the agent following or being corrected to follow the rule",
              "Clear understanding of how rulesets guide the agent"
            ],
            knowledgeCheck: {
              question: "Your workspace contains a rule requiring encryption on all S3 buckets. You ask the agent to create a logging bucket, but the generated code does not include encryption. What is the best interpretation?",
              options: ["Rulesets only apply to diagrams", "The output still needs review, and you should ask the agent to correct the bucket to follow the rule", "The rule is automatically ignored", "Encryption is never part of infrastructure generation"],
              correctAnswer: 1
            }
          },
          {
            id: "workflows",
            title: "Workflows",
            whyThisMatters: "Now let's imagine something. You are part of a platform engineering team. Every time your team builds infrastructure, the process looks roughly the same. But even if everyone knows this process, people still skip steps. Someone jumps directly to writing Terraform. Someone else deploys before security validation. This is exactly the kind of situation workflows are meant to solve.",
            whatYoullLearn: ["What workflows are", "Why workflows exist in Infracodebase", "How workflows help teams follow consistent engineering processes"],
            coreConcepts: "A workflow describes how work should happen. Instead of the agent improvising every time, the agent follows a structured process. You can think of it like a playbook. For example, an infrastructure workflow might look like this:\n\n1. Gather requirements\n2. Design architecture\n3. Define security requirements\n4. Generate infrastructure code\n5. Validate the code\n6. Fix issues if validation fails\n\nNow imagine the agent knows this process. Instead of jumping randomly between tasks, it follows the workflow step by step. That is how organizations enforce engineering discipline.",
            stepByStep: "1. Open the Workflows section in your workspace.\n2. Create a new workflow.\n3. Give it a name such as: Infrastructure Delivery Workflow.\n4. Add the steps your team normally follows.\n5. Review whether the workflow reflects the way work should happen in real life.",
            exercise: {
              title: "Create a Workflow",
              description: "Create a workflow with at least five steps describing how your team delivers infrastructure. Then add one step specifically for validation or review."
            },
            artifact: {
              title: "Infrastructure Workflow",
              description: "A workflow that includes at least five steps, including one review or validation step."
            },
            validationChecklist: [
              "A workflow created",
              "Multiple steps describing the infrastructure delivery process",
              "A review or validation checkpoint",
              "Clear understanding of how workflows guide the agent"
            ],
            knowledgeCheck: {
              question: "Your team keeps skipping validation and going directly from code generation to deployment. What is the best reason to introduce a workflow?",
              options: ["To replace Terraform", "To define and enforce the engineering process step by step", "To store secrets", "To make diagrams prettier"],
              correctAnswer: 1
            }
          },
          {
            id: "secrets",
            title: "Secrets",
            whyThisMatters: "Let's say the agent needs to interact with AWS. It might need to create resources, inspect environments, or perform deployments. To do that, the agent needs credentials. But credentials must be protected.",
            whatYoullLearn: ["What secrets are", "How secrets are stored", "How tools use secrets securely"],
            coreConcepts: "Secrets are encrypted credentials. Examples include: AWS access keys, API tokens, database passwords.\n\nSecrets are never visible in conversations. Even the agent cannot read them directly. Instead, secrets are provided to tools when authentication is required. So the agent can use a tool that connects to AWS. But the actual credentials remain protected.",
            exercise: {
              title: "Create a Secret",
              description: "Create a secret representing a cloud credential. Then write one sentence explaining why the credential should be stored as a secret instead of being pasted into a conversation."
            },
            artifact: {
              title: "Secure Credential",
              description: "One secret stored in your workspace, plus one sentence explaining why secrets matter."
            },
            validationChecklist: [
              "One secret created",
              "Encrypted credentials stored in Infracodebase",
              "Clear understanding of why secrets are separated from conversations"
            ],
            knowledgeCheck: {
              question: "You connect a tool that needs AWS credentials. Why should those credentials be stored as secrets instead of pasted into chat?",
              options: ["Because secrets make diagrams load faster", "Because secrets protect sensitive values and keep them out of conversations and logs", "Because the agent cannot work with AWS", "Because secrets replace workflows"],
              correctAnswer: 1
            }
          },
          {
            id: "workspaces",
            title: "Workspaces",
            whyThisMatters: "Think about how infrastructure projects normally work. You usually have architecture documents, infrastructure code, conversations between engineers, design diagrams, and history of changes. Now imagine those things scattered across many different tools. This fragmentation creates friction. The workspace solves that.",
            whatYoullLearn: ["What a workspace contains", "How workspaces organize infrastructure projects", "How workspace visibility works"],
            coreConcepts: "A workspace is the environment where infrastructure work happens. Inside a workspace you will find: chat conversations, infrastructure code, architecture diagrams, documentation, and history of changes.\n\nYou can think of a workspace as a home for an infrastructure project. Workspaces also have visibility settings:\n- Private: only invited members can access it\n- Internal: everyone in the enterprise can see it\n- Public: anyone with the link can view it",
            exercise: {
              title: "Create and Explore a Workspace",
              description: "Create a workspace with internal visibility. Then identify where you would expect to find: the conversation with the agent, the infrastructure files, the project documentation, and the history of changes."
            },
            artifact: {
              title: "Workspace Overview",
              description: "A workspace created in your enterprise, plus a short note describing what you expect to keep inside it."
            },
            validationChecklist: [
              "One workspace created",
              "Visibility configured",
              "Clearer understanding of what a workspace contains"
            ],
            knowledgeCheck: {
              question: "A teammate wants a space where infrastructure code, documentation, diagrams, and history all stay connected for one project. What should you create?",
              options: ["A secret", "A workspace", "A ruleset", "A subagent"],
              correctAnswer: 1
            }
          },
          {
            id: "using-the-agent",
            title: "Using the Agent",
            whyThisMatters: "Now things start getting interesting. Because this is where you begin working with the agent to design infrastructure. Instead of writing every line of Terraform yourself, you collaborate with the agent. And the more clearly you express what you want, the better the results become.",
            whatYoullLearn: ["How to request infrastructure from the agent", "How the agent uses workspace context", "How to iterate step by step", "How generation becomes refinement"],
            coreConcepts: "Inside a workspace you interact with the agent through conversation. You describe the infrastructure you want to build. The agent then reads the workspace context, applies rulesets, follows workflows, uses available tools, and generates infrastructure code.\n\nThe conversation is persistent. So the agent remembers previous context. That means you do not need to treat every request as a brand new task. You can build iteratively. First ask for a baseline. Then review it. Then modify it. That is much closer to how real infrastructure work actually happens.",
            exercise: {
              title: "Iterative Infrastructure",
              description: "Start a conversation with the agent. Describe the infrastructure you want. Review what was generated. Ask the agent to make one improvement instead of recreating everything from scratch. For example: Create a Terraform module for an S3 bucket with encryption and versioning enabled. Then say: Now add tags for environment and owner."
            },
            artifact: {
              title: "Iterative Output",
              description: "Generated infrastructure code plus one follow-up modification request."
            },
            validationChecklist: [
              "Generated infrastructure code",
              "Reviewed what the agent created",
              "Refined the output through a second request"
            ],
            knowledgeCheck: {
              question: "What is the best way to use the agent in a real project?",
              options: ["Only ask it to create things once and never review the output", "Use it iteratively by generating, reviewing, and refining infrastructure step by step", "Paste finished Terraform into chat and ignore the workspace", "Only use it for naming suggestions"],
              correctAnswer: 1
            }
          },
          {
            id: "code-editor",
            title: "Code Editor",
            whyThisMatters: "You asked the agent to generate infrastructure. The agent analyzes your request and generates infrastructure code. At that moment, you now have real infrastructure configuration files. And those files need to be reviewed.",
            whatYoullLearn: ["How infrastructure files are organized in the workspace", "How to review files generated by the agent", "How you can modify infrastructure code directly"],
            coreConcepts: "The workspace is not only a chat interface. It also contains a full code environment. Inside the workspace you can see all the files that make up your infrastructure project. For example you might see files like: main.tf, variables.tf, outputs.tf. These files represent the infrastructure configuration. The code editor allows you to: open files, read the configuration, edit resources, add new files, organize folders.\n\nThis means you can collaborate with the agent while still maintaining full visibility and control over the infrastructure code.",
            exercise: {
              title: "Edit Infrastructure Code",
              description: "Open one of the infrastructure files generated by the agent. Look for a resource definition. Then modify a small configuration value. For example: add a tag, change a name, or add versioning."
            },
            artifact: {
              title: "Modified File",
              description: "One infrastructure file that has been opened, reviewed, and modified inside the code editor."
            },
            validationChecklist: [
              "Opened a generated infrastructure file",
              "Reviewed the configuration created by the agent",
              "Made a small modification to the file"
            ],
            knowledgeCheck: {
              question: "The agent generated a Terraform file, but you want to inspect exactly how a resource is configured before moving on. Where should you do that?",
              options: ["In the code editor", "In the secrets section", "In the team settings", "In the enterprise billing page"],
              correctAnswer: 0
            }
          },
          {
            id: "diagrams",
            title: "Diagrams",
            whyThisMatters: "You open a repository. Inside the repository you see infrastructure code. You scroll through the files. Technically everything is correct. But understanding the overall system is still difficult. Because infrastructure code describes resources line by line. But what you usually want to understand first is the architecture. This is where diagrams become extremely useful.",
            whatYoullLearn: ["Why architecture diagrams are important", "How Infracodebase generates diagrams from infrastructure code", "How diagrams help you understand complex systems faster"],
            coreConcepts: "Infrastructure code describes how resources are created. But diagrams help you understand how those resources work together. Infracodebase can analyze infrastructure code and generate diagrams automatically. These diagrams represent cloud resources, network relationships, and service dependencies. This helps you move from reading code to understanding architecture.",
            exercise: {
              title: "Generate a Diagram",
              description: "Ask the agent: Create an architecture diagram for this infrastructure. Then review the diagram and write down: one thing that became easier to understand visually, and one question you still have after looking at the diagram."
            },
            artifact: {
              title: "Architecture Diagram",
              description: "One generated architecture diagram inside the workspace, plus two short observations from your review."
            },
            validationChecklist: [
              "One architecture diagram generated",
              "Infrastructure resources visualized",
              "Clearer understanding of how diagrams represent system architecture"
            ],
            knowledgeCheck: {
              question: "You understand the Terraform files, but you want a faster way to see how networks, services, and dependencies connect. What should you use?",
              options: ["Secrets", "Architecture diagrams", "Billing settings", "User preferences"],
              correctAnswer: 1
            }
          },
          {
            id: "documentation",
            title: "Documentation",
            whyThisMatters: "You have the code. You have the architecture. But there is something missing. Context. Why was this architecture chosen? What requirements did the system need to meet? If those things only exist in someone's head, the next engineer who opens the project will be confused.",
            whatYoullLearn: ["Why documentation is important", "How documentation helps the agent understand your system", "How documents are used inside a workspace"],
            coreConcepts: "Infrastructure is not just code. It is also requirements, architecture decisions, security considerations, and design constraints. Inside a workspace you can upload documents that provide that context. Once uploaded, these documents become part of the workspace context. And the agent can now use those documents while generating or modifying infrastructure.",
            exercise: {
              title: "Add Documentation",
              description: "Upload a simple document describing the requirements for an application infrastructure. Then ask the agent to update or generate infrastructure based on one requirement from that document."
            },
            artifact: {
              title: "Requirements Document",
              description: "One uploaded requirements document inside the workspace plus one example of the agent using that context."
            },
            validationChecklist: [
              "A document uploaded in the workspace",
              "Documentation available for the agent to reference",
              "One example of documentation influencing the work",
              "Better understanding of how documentation provides context"
            ],
            knowledgeCheck: {
              question: "A teammate opens your project and wants to understand not only what was built, but why it was built that way. What will help most?",
              options: ["Only the generated code", "Documentation stored in the workspace alongside the infrastructure", "Only the workspace name", "Only a secret"],
              correctAnswer: 1
            }
          },
          {
            id: "history-versioning",
            title: "History and Versioning",
            whyThisMatters: "Your team builds an infrastructure project. Everything works. Then someone changes something. Maybe a new resource is added. Maybe a configuration value is modified. Without history, you would have no way to know what changed, when, or why.",
            whatYoullLearn: ["How infrastructure history is tracked", "How commits represent changes", "How engineers review previous versions"],
            coreConcepts: "Every change made inside the workspace creates a commit. A commit records: what changed, when it changed, and which files were modified. This allows you to inspect the history of a project. You can: review differences between versions, revert to a previous state, and bookmark important milestones. This makes infrastructure changes transparent and traceable.",
            exercise: {
              title: "Explore History",
              description: "Open the history panel and inspect the most recent commit. Then answer: What changed? Why might this change matter to the architecture, security, or operations of the system?"
            },
            artifact: {
              title: "History Review",
              description: "One commit reviewed and one short explanation of why the change matters."
            },
            validationChecklist: [
              "Explored commit history",
              "Inspected file differences",
              "Connected code changes to infrastructure meaning"
            ],
            knowledgeCheck: {
              question: "A teammate asks who introduced a new networking rule and what changed in the files. Where should you look first?",
              options: ["The history panel", "The secrets section", "The team settings", "The visibility settings"],
              correctAnswer: 0
            }
          },
          {
            id: "github-integration",
            title: "GitHub Integration",
            whyThisMatters: "In most engineering teams, infrastructure code lives inside Git repositories. If the workspace was isolated from Git, teams would struggle to integrate it into their existing processes. That is why GitHub integration exists.",
            whatYoullLearn: ["How the workspace connects to GitHub", "How synchronization works", "How infrastructure workflows integrate with Git"],
            coreConcepts: "When a workspace is connected to GitHub, changes made in the workspace can be pushed to the repository. Changes made in the repository can be pulled into the workspace. This creates a two-way synchronization between Infracodebase and Git. Infracodebase can also help with common Git workflows such as creating branches, committing changes, and pushing updates.",
            exercise: {
              title: "Connect to GitHub",
              description: "Explore the GitHub integration settings in your workspace. Understand how synchronization between the workspace and a Git repository works."
            },
            artifact: {
              title: "Git Integration Notes",
              description: "A short note describing how GitHub integration supports your team's workflow."
            },
            validationChecklist: [
              "Understand how workspace connects to GitHub",
              "Understand two-way synchronization",
              "Know how Git workflows integrate with Infracodebase"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "real-infrastructure",
    title: "Real Infrastructure Engineering",
    shortTitle: "Infrastructure",
    description: "Build a realistic infrastructure environment step by step, covering architecture intent, VPC networking, subnets, routing, NAT, load balancers, application servers, databases, identity, storage, environments, resilience, and debugging.",
    icon: "Server",
    order: 3,
    color: "primary",
    courses: [
      {
        id: "building-infrastructure",
        title: "Building Real Infrastructure",
        description: "Design and evolve a complete infrastructure system from architecture intent through production-ready deployment.",
        difficulty: "intermediate",
        estimatedTime: "4 hours",
        lessons: [
          { id: "understanding-system", title: "Understanding the System We Are Building", whyThisMatters: "Before writing infrastructure code, engineers must understand the system they are designing. Without answering questions about users, availability, and access patterns, infrastructure decisions become random.", coreConcepts: "Our application architecture will contain several components. The system needs network isolation (VPC with multiple subnets), a public entry point (load balancer), private application servers, a private database service, and outbound internet access for internal services.", exercise: { title: "Define Architecture Intent", description: "Ask the agent to generate the initial architecture for the application system. The goal is to establish the system you will evolve throughout the track." }, artifact: { title: "Initial Architecture", description: "A generated architecture for the application infrastructure." }, validationChecklist: ["Initial infrastructure design created", "Application servers placed behind a load balancer", "Database component in the architecture"] },
          { id: "building-network", title: "Building the Network Foundation", whyThisMatters: "Every cloud architecture begins with networking. Without a well-designed network, infrastructure becomes difficult to secure and operate.", coreConcepts: "Your VPC will contain multiple subnet types. Public subnets will host components that accept internet traffic. Private subnets will host internal services. Most production environments distribute subnets across multiple availability zones to protect from zone-level failures.", exercise: { title: "Generate VPC Architecture", description: "Generate the VPC architecture with two availability zones, public subnets, private subnets, and routing tables." }, artifact: { title: "VPC Network", description: "Terraform or OpenTofu definitions describing the VPC network." }, validationChecklist: ["Public subnets connect to an internet gateway", "Private subnets do not expose public IP addresses", "Subnets exist in multiple availability zones"], knowledgeCheck: { question: "Why are application servers typically placed in private subnets?", options: ["To increase performance", "To prevent direct internet exposure", "To reduce storage cost", "To simplify infrastructure code"], correctAnswer: 1 } },
          { id: "routing-nat", title: "Controlling Traffic With Routing and NAT", whyThisMatters: "Creating subnets alone does not determine how resources communicate. What really controls network behavior is routing.", coreConcepts: "The Internet Gateway allows resources in public subnets to communicate with the public internet. The NAT Gateway allows private resources to make outbound connections while preventing inbound access. Route tables define where network traffic should go. These routing decisions define the security boundaries of the network.", exercise: { title: "Add NAT Gateway", description: "Ask the agent to update the infrastructure by adding a NAT gateway. Identify which subnets route through the internet gateway and which route through the NAT gateway." }, artifact: { title: "Updated Routing", description: "Updated infrastructure definitions including a NAT gateway and route table entries for private subnets." }, validationChecklist: ["Public subnets route traffic to internet gateway", "Private subnets route outbound traffic through NAT gateway", "Application servers remain inside private subnets", "No internal services directly reachable from internet"], failureAndDebugging: "Routing problems are extremely common. A typical failure: servers deploy successfully but fail to download packages because private subnets don't have a route to the NAT gateway. Inspect route tables and verify outbound traffic routes through the NAT gateway." },
          { id: "identity-permissions", title: "Controlling Access With Identity and Permissions", whyThisMatters: "Networking alone does not control who can access cloud resources. Cloud platforms rely heavily on Identity and permissions. Without proper identity controls, infrastructure can become insecure very quickly.", coreConcepts: "IAM answers: Who is allowed to do what? There are three concepts: Roles (identities that services can assume), Policies (permissions attached to roles), and the Principle of Least Privilege (every system should only receive the permissions it truly needs).", exercise: { title: "Create IAM Role", description: "Ask the agent to create an IAM role that allows application servers to read log files from a storage bucket. Review the generated policy carefully." }, artifact: { title: "IAM Configuration", description: "Infrastructure definitions describing an IAM role with a policy granting read-only permissions." }, validationChecklist: ["Role grants read access to storage", "Role does not allow write or delete", "Role is attached to application servers"], knowledgeCheck: { question: "Why is the principle of least privilege important?", options: ["It improves performance", "It limits damage if credentials are compromised", "It simplifies diagrams", "It increases storage capacity"], correctAnswer: 1 } },
          { id: "preparing-app-servers", title: "Preparing the Application Servers", whyThisMatters: "Provisioning infrastructure is only half the work. Servers also need to be configured with software packages, web servers, and security settings.", coreConcepts: "Infrastructure provisioning creates the environment. Configuration management prepares the servers to run applications. Together they produce a functioning system. Engineers describe the desired state and automation tools apply that configuration consistently. One of the most widely used tools is Ansible.", exercise: { title: "Generate Ansible Playbook", description: "Generate an Ansible playbook that installs and starts NGINX on the application servers." }, artifact: { title: "Configuration Playbook", description: "An Ansible playbook describing the configuration of the application servers." }, validationChecklist: ["Installation of NGINX package", "Step ensuring service is running"], knowledgeCheck: { question: "What is the primary purpose of configuration management tools like Ansible?", options: ["Managing infrastructure costs", "Configuring operating systems and services consistently", "Managing user identities", "Optimizing network routing"], correctAnswer: 1 } },
          { id: "debugging-infrastructure", title: "Debugging Infrastructure Generation", whyThisMatters: "Infrastructure rarely works perfectly the first time. Sooner or later, you will encounter situations where something breaks. Debugging infrastructure is one of the most important skills you can develop.", coreConcepts: "Infrastructure failures usually fall into categories: provider validation errors (missing attributes), dependency errors (referencing resources not yet created), and policy or rule conflicts (encryption requirements not met). Understanding which category the problem belongs to is the first step.", exercise: { title: "Debug a Deployment", description: "Ask the agent to add a storage bucket for application logs. Apply a rule requiring encryption. Observe how validation behaves and correct any issues." }, artifact: { title: "Corrected Configuration", description: "A corrected infrastructure configuration where the storage bucket includes encryption." }, validationChecklist: ["Storage bucket includes encryption", "Infrastructure validation succeeds", "Rule violation resolved"], knowledgeCheck: { question: "If infrastructure validation fails because a required attribute is missing, what should you do first?", options: ["Retry the deployment", "Review the provider error message to identify the missing attribute", "Delete the infrastructure project", "Disable validation rules"], correctAnswer: 1 } },
          { id: "multiple-environments", title: "Introducing Multiple Environments", whyThisMatters: "If every change is applied directly to production, even a small mistake could cause an outage. This is why infrastructure teams introduce multiple environments.", coreConcepts: "Most organizations operate at least three environments: Development (experimentation), Staging (simulate production), Production (real system). Infrastructure as code allows reusing architecture while changing configuration values between environments.", exercise: { title: "Create Environments", description: "Ask the agent to generate infrastructure definitions for development and production environments." }, artifact: { title: "Multi-Environment Config", description: "Infrastructure definitions supporting both environments." }, validationChecklist: ["Both environments share same architecture", "Resource names include environment identifiers", "Development and production resources remain isolated"], knowledgeCheck: { question: "Why do engineering teams maintain multiple infrastructure environments?", options: ["To reduce cloud provider costs", "To safely test infrastructure changes before production", "To simplify network configuration"], correctAnswer: 1 } },
          { id: "enforcing-security", title: "Enforcing Security Standards", whyThisMatters: "As systems grow, different engineers modify infrastructure. Over time, inconsistency appears. Some resources follow security best practices, others do not.", coreConcepts: "Organizations define security rules such as: all storage resources must be encrypted, all resources must include environment tags, internal services must not be publicly accessible. In Infracodebase, these rules guide how the agent generates infrastructure.", exercise: { title: "Create Security Rules", description: "Create a rule requiring encryption on all storage resources. Then update the infrastructure." }, artifact: { title: "Security Ruleset", description: "A ruleset enforcing encryption on storage resources." }, validationChecklist: ["Storage resources include encryption", "Security rules are enforced", "Generated infrastructure follows standards"], knowledgeCheck: { question: "Why do organizations enforce infrastructure security standards through rules?", options: ["To improve performance", "To ensure infrastructure consistently follows security policies", "To simplify diagrams", "To reduce costs"], correctAnswer: 1 } },
          { id: "designing-for-failure", title: "Designing Infrastructure for Failure", whyThisMatters: "Instead of assuming the system will never fail, you design infrastructure that continues operating even when part of the system fails.", coreConcepts: "One of the most common resilience strategies is distributing resources across multiple availability zones. Each zone operates independently. Load balancers distribute incoming traffic across multiple instances. If one instance becomes unhealthy, the load balancer stops sending traffic to it.", exercise: { title: "Add Resilience", description: "Modify the infrastructure so application servers run across two availability zones." }, artifact: { title: "Resilient Architecture", description: "Infrastructure definitions distributing application servers across multiple zones." }, validationChecklist: ["Application servers run in multiple zones", "Load balancer distributes traffic", "System continues operating during zone failures"], knowledgeCheck: { question: "Why do engineers distribute infrastructure across multiple availability zones?", options: ["To reduce cost", "To protect systems from localized failures", "To simplify routing tables", "To improve application performance"], correctAnswer: 1 } },
          { id: "operating-evolving", title: "Operating and Evolving the Infrastructure", whyThisMatters: "Real infrastructure engineering rarely ends at deployment. As applications evolve, infrastructure must evolve with them.", coreConcepts: "Operating infrastructure means observing how systems behave and improving them over time: scaling resources, introducing monitoring, strengthening security controls, improving automation. You do not 'finish' infrastructure once. You keep improving it as the system and the organization change.", exercise: { title: "Scale the System", description: "Ask the agent to scale the application servers so the system can support higher traffic levels." }, artifact: { title: "Scaled Architecture", description: "Infrastructure definitions reflecting the scaled architecture." }, validationChecklist: ["Additional compute instances deployed", "Traffic flows through load balancer", "Auto-scaling parameters reflect demand"], knowledgeCheck: { question: "Why must infrastructure evolve over time?", options: ["Because application requirements change and systems must adapt", "Because cloud providers automatically remove resources", "Because routing tables expire", "Because IAM roles cannot be reused"], correctAnswer: 0 } }
        ]
      }
    ]
  },
  {
    id: "architecture-diagrams",
    title: "Architecture Diagrams & Living Documentation",
    shortTitle: "Diagrams & Docs",
    description: "Learn how infrastructure must remain understandable as systems grow through architecture diagrams, system visualization, traffic flows, documentation practices, and architecture decision records.",
    icon: "FileText",
    order: 4,
    color: "primary",
    courses: [
      {
        id: "living-documentation",
        title: "Architecture Diagrams and Living Documentation",
        description: "Maintain architecture understanding synchronized with your infrastructure through diagrams, documentation, and decision records.",
        difficulty: "intermediate",
        estimatedTime: "3 hours",
        lessons: [
          { id: "understanding-architecture", title: "Understanding the Architecture You Built", whyThisMatters: "Infrastructure works, but understanding the architecture becomes harder as it grows. New engineers join, new services are added, security rules evolve.", coreConcepts: "Infrastructure code describes how resources are created. Architecture diagrams show how those resources interact. When visualized, it becomes easier to see network boundaries, service relationships, traffic flows, and security zones.", exercise: { title: "Generate Architecture Diagram", description: "Ask the agent to create an architecture diagram representing the infrastructure. Observe how networking, compute, and storage components appear." }, artifact: { title: "Architecture Diagram", description: "One generated architecture diagram representing the infrastructure." }, validationChecklist: ["Networking components appear in diagram", "Application servers appear behind load balancer", "Storage resources appear connected"] },
          { id: "generating-diagrams", title: "Generating Architecture Diagrams from Infrastructure", whyThisMatters: "Many engineering teams create architecture diagrams manually. The problem is that infrastructure evolves constantly but manual diagrams often stay the same.", coreConcepts: "You can analyze infrastructure definitions directly on Infracodebase. Using Terraform configuration, networking topology, and service dependencies, you can generate architecture diagrams that stay aligned with the real infrastructure.", exercise: { title: "Auto-Generate Diagrams", description: "Ask the agent to generate an architecture diagram based on the current infrastructure configuration." }, artifact: { title: "Generated Diagram", description: "One generated architecture diagram reflecting current infrastructure." }, validationChecklist: ["Diagram reflects infrastructure defined in workspace", "Networking zones appear correctly", "Application services appear connected to storage and load balancing"], knowledgeCheck: { question: "Why are automatically generated diagrams valuable?", options: ["They replace infrastructure code", "They stay aligned with the real infrastructure", "They replace security reviews"], correctAnswer: 1 } },
          { id: "improving-clarity", title: "Improving Diagram Clarity", whyThisMatters: "Even if a diagram contains correct information, engineers may struggle to understand it when services appear randomly positioned, connections cross each other, or networking boundaries aren't visually clear.", coreConcepts: "Good architecture diagrams communicate structure. Infrastructure components should be grouped into logical zones (networking, application, storage). Network boundaries should be visible (public subnets, private subnets, isolated database subnets). These visual groupings help engineers understand security boundaries quickly.", exercise: { title: "Reorganize Diagram", description: "Reorganize the architecture diagram so that networking components appear in a clearly defined VPC boundary, application servers appear grouped behind the load balancer, and storage services appear near the services that interact with them." }, artifact: { title: "Improved Diagram", description: "An updated architecture diagram with improved visual clarity." }, validationChecklist: ["Networking boundaries visible", "Compute services grouped logically", "Storage resources connected to correct services", "Traffic flow easier to follow"], knowledgeCheck: { question: "Why is diagram clarity important?", options: ["It reduces cloud costs", "It helps engineers understand infrastructure behavior and troubleshoot issues", "It improves Terraform performance"], correctAnswer: 1 } },
          { id: "documenting-decisions", title: "Documenting Architecture Decisions", whyThisMatters: "Infrastructure code shows how infrastructure works, but it does not always explain why the architecture was designed this way. Without documentation, architectural decisions may accidentally be reversed or weakened.", coreConcepts: "Architecture documentation explains the intent behind the infrastructure: architectural constraints, system requirements, security principles, and operational expectations. Documentation also allows the agent to reference architectural constraints when generating infrastructure.", exercise: { title: "Create Architecture Documentation", description: "Create a document describing the architecture decisions behind the infrastructure you built. Include explanations for network isolation, environment separation, and encryption requirements." }, artifact: { title: "Architecture Decision Record", description: "One architecture documentation file stored in the workspace on Infracodebase." }, validationChecklist: ["Document explains architecture decisions", "Document is stored in workspace", "Agent can reference the document", "Documented decisions match infrastructure definitions"], knowledgeCheck: { question: "Why is architecture documentation important?", options: ["It replaces infrastructure code", "It explains the reasoning behind infrastructure design decisions", "It stores cloud credentials"], correctAnswer: 1 } },
          { id: "keeping-current", title: "Keeping Architecture Understanding Current", whyThisMatters: "Infrastructure rarely remains static. As it evolves, diagrams and documentation must evolve with it. If they remain static, engineers stop trusting them.", coreConcepts: "Three elements must evolve together: infrastructure definitions, architecture diagrams, and architecture documentation. When infrastructure changes, diagrams should be regenerated and documentation should be updated. Because the infrastructure lives on Infracodebase, these elements can remain connected inside the same workspace.", exercise: { title: "Update Documentation", description: "Modify the infrastructure by introducing a new service. Then regenerate the architecture diagram and update the documentation." }, artifact: { title: "Updated Architecture Package", description: "A workspace containing updated infrastructure definitions, regenerated architecture diagram, and updated architecture documentation." }, validationChecklist: ["Diagram reflects updated infrastructure", "Documentation explains new component", "Architecture representation remains accurate"] }
        ]
      }
    ]
  },
  {
    id: "enterprise-governance",
    title: "Enterprise Governance & Platform Engineering",
    shortTitle: "Governance",
    description: "Learn how infrastructure is managed at organizational scale through governance principles, enterprise rulesets, infrastructure policies, approval workflows, audit history, and platform engineering practices.",
    icon: "Shield",
    order: 5,
    color: "primary",
    courses: [
      {
        id: "governance-platform",
        title: "Enterprise Governance and Platform Engineering",
        description: "Understand how organizations enforce standards, manage rulesets, and support multiple engineering teams safely at scale.",
        difficulty: "advanced",
        estimatedTime: "3 hours",
        lessons: [
          { id: "why-governance", title: "Why Governance Matters for AI-Assisted Infrastructure", whyThisMatters: "Imagine ten engineering teams, each using the agent. Infrastructure can be generated quickly. But different teams start building differently. One enables encryption, another forgets. Over time, infrastructure drifts. This is exactly why governance exists.", coreConcepts: "Governance is the system that ensures infrastructure follows defined standards. Instead of relying on engineers to remember every rule, governance enforces standards automatically through rulesets, workflows, roles and permissions, and audit history.", exercise: { title: "Define Governance Standards", description: "Write down three governance standards your organization might require. Examples: All storage must use encryption. All infrastructure must include environment tags. Production deployments require approval." }, artifact: { title: "Governance Standards", description: "A list of three governance standards relevant to your organization." }, validationChecklist: ["Understand why governance exists", "How governance prevents infrastructure drift", "How standards apply across workspaces"], knowledgeCheck: { question: "What is the primary goal of governance?", options: ["Slow down infrastructure development", "Ensure infrastructure follows safe and consistent standards", "Replace engineers"], correctAnswer: 1 } },
          { id: "enterprise-rulesets", title: "Designing Enterprise Rulesets", whyThisMatters: "Imagine ten teams building similar systems. Each team implements standards differently. One encrypts storage, another forgets. Even though everyone uses the same tools, infrastructure diverges. Enterprise rulesets solve this by enforcing standards automatically.", coreConcepts: "Enterprise rulesets define policies that apply across multiple workspaces. Instead of each team defining rules independently, the organization defines shared standards. Examples: All storage must use encryption. All resources must include environment tags. Public access to databases is prohibited. When a ruleset exists, the agent evaluates those rules while generating infrastructure.", exercise: { title: "Create Enterprise Rule", description: "Create a new enterprise rule requiring encryption on storage resources. Then generate infrastructure that includes a storage service. Observe how the rule affects the configuration." }, artifact: { title: "Enterprise Ruleset", description: "One enterprise ruleset requiring encryption on storage resources." }, validationChecklist: ["Rule exists in enterprise ruleset list", "Rule applies across workspaces", "Generated infrastructure includes encryption"], knowledgeCheck: { question: "What is the main purpose of enterprise rulesets?", options: ["Reduce infrastructure costs", "Enforce organization-wide infrastructure standards", "Replace infrastructure automation"], correctAnswer: 1 } },
          { id: "governance-exceptions", title: "Handling Governance Exceptions Safely", whyThisMatters: "Real infrastructure environments are rarely perfect. Sometimes a rule cannot be followed immediately. The challenge is ensuring exceptions remain controlled, documented, and traceable.", coreConcepts: "Mature governance models support controlled exceptions. Every exception must include: Documentation (reason clearly explained), Review (another engineer reviews), and Traceability (future engineers can see when and why the exception occurred). In Infracodebase, these explanations are stored in workspace documentation.", exercise: { title: "Document an Exception", description: "Create a documented governance exception for a temporary infrastructure change. Include: the rule being overridden, the reason, the expected duration, and the plan to remove the exception." }, artifact: { title: "Governance Exception", description: "One documented governance exception stored in the workspace documentation." }, validationChecklist: ["Exception is documented", "Reason is clearly explained", "Duration is specified", "Remediation plan exists"], knowledgeCheck: { question: "Why do governance systems support documented exceptions?", options: ["To eliminate infrastructure rules", "To allow flexibility while maintaining traceability", "To simplify infrastructure diagrams"], correctAnswer: 1 } },
          { id: "approval-gates", title: "Approval Gates and Infrastructure Workflows", whyThisMatters: "Some infrastructure changes can have serious consequences. A networking change could expose internal services. A database change could affect production data. Approval gates ensure critical changes are reviewed before deployment.", coreConcepts: "Infrastructure workflows define the sequence of steps required to deliver infrastructure safely. Approval gates act as checkpoints within workflows. Before the workflow can continue, another engineer must review the change. Commonly used for production changes, networking modifications, security-sensitive resources, and changes affecting customer data.", exercise: { title: "Add Approval Gate", description: "Create a workflow step that requires approval before deploying infrastructure to production. The step should be called: Security Review Required." }, artifact: { title: "Approval Workflow", description: "A workflow configuration containing at least one approval gate." }, validationChecklist: ["Workflow includes approval step", "Approval step occurs before deployment", "Critical changes cannot proceed without review"], knowledgeCheck: { question: "What is the purpose of approval gates?", options: ["Increase infrastructure cost", "Ensure critical infrastructure changes are reviewed before deployment", "Replace infrastructure automation"], correctAnswer: 1 } },
          { id: "audit-trails", title: "Audit Trails and Infrastructure History", whyThisMatters: "Infrastructure systems evolve continuously. Eventually engineers ask: Who modified this? When? Why? Without infrastructure history, answering these questions is extremely difficult.", coreConcepts: "An audit trail records the history of infrastructure changes. Each change includes: what changed, when it occurred, who made the change. This information is essential for security investigations, compliance reviews, and incident analysis. In Infracodebase, every change creates a traceable record.", exercise: { title: "Review Audit Trail", description: "Select one commit from the infrastructure history. Review the file changes. Identify which infrastructure components were modified." }, artifact: { title: "Audit Review", description: "One reviewed infrastructure commit." }, validationChecklist: ["Commit shows which files changed", "Can trace who made changes", "Understand how infrastructure evolved"], knowledgeCheck: { question: "What is the main purpose of infrastructure audit trails?", options: ["Improve cloud performance", "Track infrastructure changes for accountability and compliance", "Replace infrastructure documentation"], correctAnswer: 1 } },
          { id: "platform-engineering", title: "The Role of Platform Engineering", whyThisMatters: "As organizations grow, more teams begin creating infrastructure. If every team designs independently, infrastructure patterns diverge. Platform engineering teams build systems that help other engineers create infrastructure safely and consistently.", coreConcepts: "Platform engineering focuses on building internal infrastructure platforms that provide shared standards, automation, and guardrails. Platform engineering systems include: governance rules, infrastructure templates, workflows guiding delivery, and approval gates. In Infracodebase, these are implemented through enterprise rulesets, workspace workflows, approval gates, and infrastructure history.", exercise: { title: "Design Platform Model", description: "Design a simple platform engineering model for your organization describing enterprise rules, workflows, and approval gates. Write a short description explaining how these elements support engineering teams." }, artifact: { title: "Platform Engineering Model", description: "A written description of a platform engineering model using Infracodebase." }, validationChecklist: ["Governance rules enforce standards", "Workflows guide deployment", "Platform teams support multiple engineering teams"], knowledgeCheck: { question: "What is the primary goal of platform engineering?", options: ["Replace infrastructure engineers", "Enable teams to build infrastructure safely and consistently", "Eliminate governance"], correctAnswer: 1 } }
        ]
      }
    ]
  },
  {
    id: "advanced-architecture",
    title: "Advanced Infrastructure Architecture",
    shortTitle: "Advanced",
    description: "Move from building infrastructure to thinking like an infrastructure architect, covering scalability, failure domains, resilient architectures, security architecture, multi-region infrastructure, and system evolution.",
    icon: "Cpu",
    order: 6,
    color: "primary",
    courses: [
      {
        id: "advanced-architecture-course",
        title: "Advanced Infrastructure Architecture",
        description: "Design infrastructure systems that evolve over time, handling failures, scaling, and multi-region deployments.",
        difficulty: "advanced",
        estimatedTime: "4 hours",
        lessons: [
          { id: "thinking-like-architect", title: "Thinking Like an Infrastructure Architect", whyThisMatters: "Creating infrastructure resources is only part of the job. The more important skill is designing systems that remain stable as they grow. Poor architecture decisions can create hidden security vulnerabilities, operational complexity, scaling limitations, and fragile systems.", coreConcepts: "Infrastructure architects evaluate: Failure Domains (which components could cause widespread outages), Scalability (supporting increasing traffic without major redesigns), Security Boundaries (which services are allowed to communicate), and Operational Simplicity (reducing complexity where possible). Instead of asking 'How do I create this resource?' architects ask: How will it scale? What happens if it fails? Where are the security boundaries?", exercise: { title: "Architecture Analysis", description: "Write a short architecture description explaining: how the application environment should scale, which components must remain highly available, and which components represent potential failure domains." }, artifact: { title: "Architecture Assessment", description: "A short architecture description stored in workspace documentation." }, validationChecklist: ["Identified scaling components", "Identified redundancy requirements", "Identified failure domains"], knowledgeCheck: { question: "What distinguishes infrastructure architecture from infrastructure implementation?", options: ["Creating more resources", "Designing systems that remain reliable, scalable, and secure", "Writing infrastructure code faster"], correctAnswer: 1 } },
          { id: "multi-region", title: "Designing Multi-Region Architectures", whyThisMatters: "The infrastructure currently operates inside a single cloud region. While resilient within the region, it cannot tolerate a regional outage. Critical systems often evolve toward multi-region architectures.", coreConcepts: "Multi-region architecture introduces geographic failure domains. Key concepts: Regional Isolation (regions operate independently), Global Traffic Routing (DNS-based, global load balancers, latency-based routing), Data Replication (active-passive where one region serves while another stands by, or active-active where multiple regions serve simultaneously). Trade-offs between latency, consistency, and operational complexity must be balanced.", exercise: { title: "Extend to Multi-Region", description: "Ask the agent to extend the infrastructure so the application environment runs across two regions and can fail over if one region becomes unavailable." }, artifact: { title: "Multi-Region Architecture", description: "An updated architecture diagram showing infrastructure deployed across two regions." }, validationChecklist: ["Application servers exist in both regions", "Global routing directs traffic between regions", "Storage systems replicate data across regions"], knowledgeCheck: { question: "Why do organizations deploy infrastructure across multiple regions?", options: ["To reduce infrastructure cost", "To protect systems from regional failures", "To eliminate networking complexity"], correctAnswer: 1 } },
          { id: "resilient-infrastructure", title: "Designing Resilient Infrastructure", whyThisMatters: "Infrastructure systems inevitably experience failures. Resilience is not something that can be added once and forgotten. As systems evolve, new dependencies can introduce hidden failure risks.", coreConcepts: "Resilient architectures are designed around failure domains. Key concepts: Redundancy (multiple instances of critical components), Load Balancing (distributing traffic and automatically stopping unhealthy instances), Fault Isolation (ensuring failures remain contained within specific parts of the system). Instead of preventing failures, resilient architectures limit their impact.", exercise: { title: "Improve Resilience", description: "Ask the agent to analyze the infrastructure and identify potential single points of failure. Then update the architecture to improve resilience." }, artifact: { title: "Resilient Architecture", description: "An updated architecture diagram representing a resilient infrastructure system." }, validationChecklist: ["Critical services include redundant instances", "Application servers run across multiple zones", "Load balancing distributes traffic"], knowledgeCheck: { question: "What is the primary goal of resilient infrastructure design?", options: ["Prevent all infrastructure failures", "Ensure the system continues operating when failures occur", "Reduce the number of infrastructure components"], correctAnswer: 1 } },
          { id: "zero-trust", title: "Designing Zero-Trust Infrastructure", whyThisMatters: "Traditional infrastructure security relied on network-based trust. But modern environments are complex — cloud environments, container platforms, external APIs, distributed services. If an attacker gains internal network access, they can move laterally between systems.", coreConcepts: "Zero-trust architecture: Never trust. Always verify. Every service must prove its identity before interacting with another service. Key concepts: Identity-Based Authentication (service identity tokens, mutual TLS), Authorization Policies (defining allowed interactions between services), and Network Segmentation as Defense in Depth. This model significantly reduces the impact of security breaches.", exercise: { title: "Implement Zero-Trust", description: "Ask the agent to modify the infrastructure so that all service communication requires identity-based authentication and authorization." }, artifact: { title: "Zero-Trust Architecture", description: "An updated architecture diagram representing identity-secured service communication." }, validationChecklist: ["Services authenticate before interacting", "Authorization policies define allowed interactions", "Internal communication doesn't rely only on network location"], knowledgeCheck: { question: "What is the core principle of zero-trust infrastructure?", options: ["Trust all internal services", "Always verify identity and authorization", "Eliminate authentication"], correctAnswer: 1 } },
          { id: "infrastructure-platforms", title: "Designing Infrastructure Platforms", whyThisMatters: "Organizations rarely operate only one system. If every team builds independently, infrastructure patterns diverge, security practices become inconsistent, and operational complexity increases.", coreConcepts: "Platform engineering focuses on building systems that help engineers build systems. Platforms provide: Shared Infrastructure Foundations (networking baselines, storage standards, identity systems), Self-Service Infrastructure (templates and automation for self-service environments), and Governance Integration (governance rules directly in infrastructure workflows). Application teams build on top of the platform instead of reinventing components.", exercise: { title: "Design a Platform", description: "Ask the agent to design a platform architecture that allows multiple engineering teams to deploy infrastructure while following governance rules." }, artifact: { title: "Platform Architecture", description: "An architecture diagram representing a shared infrastructure platform." }, validationChecklist: ["Shared infrastructure supports multiple teams", "Governance rules apply across environments", "Platform simplifies infrastructure deployment"], knowledgeCheck: { question: "What is the primary goal of platform engineering?", options: ["Replace engineering teams", "Provide shared infrastructure capabilities for multiple teams", "Eliminate infrastructure governance"], correctAnswer: 1 } }
        ]
      }
    ]
  },
  {
    id: "review-wrapup",
    title: "Review & Wrap-Up",
    shortTitle: "Review",
    description: "Review the entire learning journey, revisiting the Infracodebase model, infrastructure engineering, architecture documentation, governance, and advanced architecture with reflection questions and key insights.",
    icon: "GraduationCap",
    order: 7,
    color: "primary",
    courses: [
      {
        id: "review-course",
        title: "Review & Wrap-Up",
        description: "Reflect on the complete learning journey and prepare for the final assessment.",
        difficulty: "beginner",
        estimatedTime: "45 min",
        lessons: [
          { id: "track1-review", title: "Review — Understanding Infracodebase", whyThisMatters: "Revisiting the foundations ensures the core principles are solidified before moving forward in your infrastructure career.", coreConcepts: "In the first track, you learned how Infracodebase works and how engineers collaborate with the agent to design and manage infrastructure. You explored how: the agent collaborates with you, workspaces organize infrastructure work, rulesets guide infrastructure generation, workflows structure infrastructure delivery, and code, diagrams, documentation, and history stay connected.\n\nThis track introduced the core principle: Infrastructure knowledge should live in one connected system. Instead of definitions, diagrams, and documentation living in separate tools, they remain synchronized inside the same workspace.", exercise: { title: "Foundation Reflection", description: "Write a brief summary of the core Infracodebase principles you learned." }, artifact: { title: "Foundation Summary", description: "A short summary of key Infracodebase principles." }, validationChecklist: ["Can explain what Infracodebase is", "Understand workspace organization", "Know how the agent collaborates"] },
          { id: "track2-review", title: "Review — Building Real Infrastructure", whyThisMatters: "The infrastructure you built demonstrates the progressive nature of real engineering work.", coreConcepts: "In Track 2, you built a complete infrastructure system step by step: a VPC network, public and private subnets, routing and NAT connectivity, identity and access permissions, application servers, configuration automation, storage resources, multiple environments, and resilience across availability zones.\n\nYou learned how engineers reason about infrastructure design, debug networking and configuration problems, and evolve infrastructure safely as requirements change. Instead of creating isolated examples, you built one continuous infrastructure system, reflecting how real systems grow.", exercise: { title: "Infrastructure Reflection", description: "Review the infrastructure system you built and identify the most important lesson from this track." }, artifact: { title: "Infrastructure Review", description: "A reflection on the key principles from building real infrastructure." }, validationChecklist: ["Can describe the full infrastructure system built", "Understand how systems evolve step by step"] },
          { id: "track3-review", title: "Review — Architecture Diagrams and Living Documentation", whyThisMatters: "Architecture understanding must evolve alongside infrastructure.", coreConcepts: "In Track 3, you learned how engineers understand and document infrastructure architectures. You explored how to generate architecture diagrams directly from infrastructure definitions, improve diagram clarity, document architectural decisions, and investigate infrastructure behavior using diagrams.\n\nYou learned how diagrams and documentation remain synchronized with infrastructure on Infracodebase. This creates living architecture documentation, where infrastructure code, architecture diagrams, and documentation evolve together.", exercise: { title: "Documentation Reflection", description: "Explain why living documentation is more valuable than static documentation." }, artifact: { title: "Documentation Review", description: "A reflection on architecture documentation principles." }, validationChecklist: ["Understand living documentation concept", "Know how to keep diagrams synchronized"] },
          { id: "track4-review", title: "Review — Enterprise Governance and Platform Engineering", whyThisMatters: "Governance becomes essential as infrastructure scales across teams.", coreConcepts: "As infrastructure grows across teams, organizations must introduce governance. You learned how organizations scale infrastructure safely using: rulesets that enforce standards, workflows that structure delivery, approval gates for critical changes, audit history that tracks decisions, and platform engineering practices that support multiple teams.\n\nThese mechanisms ensure that infrastructure remains secure, consistent, and traceable even as organizations grow.", exercise: { title: "Governance Reflection", description: "Design a brief governance model for a hypothetical organization with five engineering teams." }, artifact: { title: "Governance Review", description: "A brief governance model description." }, validationChecklist: ["Understand governance principles", "Know how platform engineering supports teams"] },
          { id: "track5-review", title: "Review — Advanced Infrastructure Architecture", whyThisMatters: "Thinking architecturally is what distinguishes experienced engineers.", coreConcepts: "In the final track, you moved from building infrastructure to thinking like an infrastructure architect. You explored how experienced engineers design systems that tolerate failures, operate across multiple regions, enforce identity-based security models, support many engineering teams, and evolve safely as applications grow.\n\nYou extended the infrastructure system to support resilient distributed architectures, platform engineering foundations, and multi-region environments.", exercise: { title: "Architecture Reflection", description: "Compare your understanding of infrastructure now versus when you started the course." }, artifact: { title: "Architecture Review", description: "A reflection on architectural thinking and system design." }, validationChecklist: ["Can think architecturally about infrastructure", "Understand multi-region and resilience concepts"] },
          { id: "wrap-up", title: "Wrap-Up and Next Steps", whyThisMatters: "Before moving on, reflect on the complete infrastructure system you built during this program.", coreConcepts: "You started by learning how Infracodebase works. Then you designed and evolved a realistic infrastructure environment that included: networking foundations, compute infrastructure, storage systems, monitoring services, security policies, architecture documentation, governance mechanisms, and resilience and scaling strategies.\n\nEach step expanded the system gradually, mirroring how infrastructure evolves inside real engineering organizations. By the end, you were learning how to design and reason about infrastructure systems. This mindset is what distinguishes infrastructure architects and platform engineers.\n\n**Additional Learning Paths:**\n- Distributed Systems Architecture\n- Platform Engineering\n- Cloud Infrastructure Design\n\n**Ready to Test Your Knowledge?**\nThe final assessment will test your understanding of infrastructure architecture, cloud networking fundamentals, governance and platform engineering, system resilience and scaling, and infrastructure design using Infracodebase.", exercise: { title: "Final Reflection", description: "Write a comprehensive reflection on your learning journey. What changed in how you think about infrastructure?" }, artifact: { title: "Course Completion", description: "A comprehensive reflection on the entire learning journey." }, validationChecklist: ["Reviewed all tracks", "Reflected on learning progression", "Ready for assessment"] }
        ]
      }
    ]
  }
];

export const getTotalLessons = (): number => {
  return learningPaths.reduce((total, path) =>
    total + path.courses.reduce((courseTotal, course) =>
      courseTotal + course.lessons.length, 0), 0);
};

export const getTotalCourses = (): number => {
  return learningPaths.reduce((total, path) => total + path.courses.length, 0);
};

export const getLearningPathById = (id: string): LearningPath | undefined => {
  return learningPaths.find(lp => lp.id === id);
};

export const getLessonById = (pathId: string, lessonId: string): { lesson: Lesson; course: Course; path: LearningPath } | undefined => {
  const path = learningPaths.find(lp => lp.id === pathId);
  if (!path) return undefined;
  for (const course of path.courses) {
    const lesson = course.lessons.find(l => l.id === lessonId);
    if (lesson) return { lesson, course, path };
  }
  return undefined;
};
