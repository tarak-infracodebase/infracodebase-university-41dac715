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
  trackIntro?: string;
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
    description: "Learn the core model of Infracodebase including enterprises, workspaces, rulesets, workflows, agents, subagents, documentation, architecture diagrams, GitHub integration, and infrastructure history.",
    trackIntro: "This course will help you understand how Infracodebase works and how to use it effectively.\nYou will learn what Infracodebase is, how workspaces are organized, and how you collaborate with the agent to design infrastructure.",
    icon: "Layers",
    order: 2,
    color: "primary",
    courses: [
      {
        id: "introduction-to-infracodebase",
        title: "Introduction to Infracodebase",
        description: "This course will help you understand how Infracodebase works and how to use it effectively. You will learn what Infracodebase is, how workspaces are organized, and how you collaborate with the agent to design infrastructure.",
        difficulty: "beginner",
        estimatedTime: "30 min",
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
          }
        ]
      },
      {
        id: "working-with-the-agent",
        title: "Working With the Agent",
        description: "The agent is a collaborator.\nYou will learn how to guide the agent to design and generate infrastructure, and how to review what it produces.",
        difficulty: "beginner",
        estimatedTime: "25 min",
        lessons: [
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
          }
        ]
      },
      {
        id: "organizing-infrastructure",
        title: "Organizing Infrastructure",
        description: "Infrastructure design, security, governance, and architecture decisions often involve multiple roles.\nYou will learn how infrastructure work is organized and how teams collaborate effectively.",
        difficulty: "beginner",
        estimatedTime: "25 min",
        lessons: [
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
          }
        ]
      },
      {
        id: "infrastructure-artifacts",
        title: "Infrastructure Artifacts",
        description: "This course is not only about generating infrastructure code.\nIt is about understanding the full workflow around infrastructure: architecture, documentation, governance, review, and evolution over time.",
        difficulty: "beginner",
        estimatedTime: "20 min",
        lessons: [
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
          }
        ]
      },
      {
        id: "integrations",
        title: "Integrations",
        description: "In most engineering teams, infrastructure code lives inside Git repositories.",
        difficulty: "beginner",
        estimatedTime: "15 min",
        lessons: [
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
    trackIntro: "In Track 2, you designed and deployed an application environment that included:\n\na VPC network\npublic and private subnets\nrouting and NAT connectivity\nidentity permissions\napplication servers\nconfiguration automation\nstorage resources\nmultiple environments\nresilience across availability zones",
    icon: "Server",
    order: 3,
    color: "primary",
    courses: [
      {
        id: "understanding-the-system",
        title: "Understanding the System",
        description: "Before writing infrastructure code, engineers must understand the system they are designing.",
        difficulty: "intermediate",
        estimatedTime: "30 min",
        difficulty: "intermediate",
        estimatedTime: "20 min",
        lessons: [
          { id: "understanding-system", title: "Understanding the System We Are Building", whyThisMatters: "Before writing infrastructure code, engineers must understand the system they are designing. Without answering questions about users, availability, and access patterns, infrastructure decisions become random.", coreConcepts: "Our application architecture will contain several components. The system needs network isolation (VPC with multiple subnets), a public entry point (load balancer), private application servers, a private database service, and outbound internet access for internal services.", exercise: { title: "Define Architecture Intent", description: "Ask the agent to generate the initial architecture for the application system. The goal is to establish the system you will evolve throughout the track." }, artifact: { title: "Initial Architecture", description: "A generated architecture for the application infrastructure." }, validationChecklist: ["Initial infrastructure design created", "Application servers placed behind a load balancer", "Database component in the architecture"] }
        ]
      },
      {
        id: "building-network-foundation",
        title: "Building the Network Foundation",
        description: "Every cloud architecture begins with networking.\nYou will learn how to design networking using subnets, routing, and NAT connectivity.",
        difficulty: "intermediate",
        estimatedTime: "40 min",
        lessons: [
          { id: "building-network", title: "Building the Network Foundation", whyThisMatters: "Every cloud architecture begins with networking. Without a well-designed network, infrastructure becomes difficult to secure and operate.", coreConcepts: "Your VPC will contain multiple subnet types. Public subnets will host components that accept internet traffic. Private subnets will host internal services. Most production environments distribute subnets across multiple availability zones to protect from zone-level failures.", exercise: { title: "Generate VPC Architecture", description: "Generate the VPC architecture with two availability zones, public subnets, private subnets, and routing tables." }, artifact: { title: "VPC Network", description: "Terraform or OpenTofu definitions describing the VPC network." }, validationChecklist: ["Public subnets connect to an internet gateway", "Private subnets do not expose public IP addresses", "Subnets exist in multiple availability zones"], knowledgeCheck: { question: "Why are application servers typically placed in private subnets?", options: ["To increase performance", "To prevent direct internet exposure", "To reduce storage cost", "To simplify infrastructure code"], correctAnswer: 1 } },
          { id: "routing-nat", title: "Controlling Traffic With Routing and NAT", whyThisMatters: "Creating subnets alone does not determine how resources communicate. What really controls network behavior is routing.", coreConcepts: "The Internet Gateway allows resources in public subnets to communicate with the public internet. The NAT Gateway allows private resources to make outbound connections while preventing inbound access. Route tables define where network traffic should go. These routing decisions define the security boundaries of the network.", exercise: { title: "Add NAT Gateway", description: "Ask the agent to update the infrastructure by adding a NAT gateway. Identify which subnets route through the internet gateway and which route through the NAT gateway." }, artifact: { title: "Updated Routing", description: "Updated infrastructure definitions including a NAT gateway and route table entries for private subnets." }, validationChecklist: ["Public subnets route traffic to internet gateway", "Private subnets route outbound traffic through NAT gateway", "Application servers remain inside private subnets", "No internal services directly reachable from internet"], failureAndDebugging: "Routing problems are extremely common. A typical failure: servers deploy successfully but fail to download packages because private subnets don't have a route to the NAT gateway. Inspect route tables and verify outbound traffic routes through the NAT gateway." }
        ]
      },
      {
        id: "controlling-access-identity",
        title: "Access and Identity",
        description: "Cloud platforms rely heavily on identity and access control.\nYou will learn how resources interact through identity and permissions.",
        difficulty: "intermediate",
        estimatedTime: "20 min",
        lessons: [
          { id: "identity-permissions", title: "Controlling Access With Identity and Permissions", whyThisMatters: "Networking alone does not control who can access cloud resources. Cloud platforms rely heavily on Identity and permissions. Without proper identity controls, infrastructure can become insecure very quickly.", coreConcepts: "IAM answers: Who is allowed to do what? There are three concepts: Roles (identities that services can assume), Policies (permissions attached to roles), and the Principle of Least Privilege (every system should only receive the permissions it truly needs).", exercise: { title: "Create IAM Role", description: "Ask the agent to create an IAM role that allows application servers to read log files from a storage bucket. Review the generated policy carefully." }, artifact: { title: "IAM Configuration", description: "Infrastructure definitions describing an IAM role with a policy granting read-only permissions." }, validationChecklist: ["Role grants read access to storage", "Role does not allow write or delete", "Role is attached to application servers"], knowledgeCheck: { question: "Why is the principle of least privilege important?", options: ["It improves performance", "It limits damage if credentials are compromised", "It simplifies diagrams", "It increases storage capacity"], correctAnswer: 1 } }
        ]
      },
      {
        id: "compute-application-layer",
        title: "Compute and Application Layer",
        description: "Provisioning infrastructure is only half the work. Servers also need to be configured with software and application logic.",
        difficulty: "intermediate",
        estimatedTime: "20 min",
        lessons: [
          { id: "preparing-app-servers", title: "Preparing the Application Servers", whyThisMatters: "Provisioning infrastructure is only half the work. Servers also need to be configured with software packages, web servers, and security settings.", coreConcepts: "Infrastructure provisioning creates the environment. Configuration management prepares the servers to run applications. Together they produce a functioning system. Engineers describe the desired state and automation tools apply that configuration consistently. One of the most widely used tools is Ansible.", exercise: { title: "Generate Ansible Playbook", description: "Generate an Ansible playbook that installs and starts NGINX on the application servers." }, artifact: { title: "Configuration Playbook", description: "An Ansible playbook describing the configuration of the application servers." }, validationChecklist: ["Installation of NGINX package", "Step ensuring service is running"], knowledgeCheck: { question: "What is the primary purpose of configuration management tools like Ansible?", options: ["Managing infrastructure costs", "Configuring operating systems and services consistently", "Managing user identities", "Optimizing network routing"], correctAnswer: 1 } }
        ]
      },
      {
        id: "debugging-iteration",
        title: "Debugging and Iteration",
        description: "Infrastructure rarely works perfectly the first time.\nYou will learn how to debug and iterate on infrastructure generation.",
        difficulty: "intermediate",
        estimatedTime: "20 min",
        lessons: [
          { id: "debugging-infrastructure", title: "Debugging Infrastructure Generation", whyThisMatters: "Infrastructure rarely works perfectly the first time. Sooner or later, you will encounter situations where something breaks. Debugging infrastructure is one of the most important skills you can develop.", coreConcepts: "Infrastructure failures usually fall into categories: provider validation errors (missing attributes), dependency errors (referencing resources not yet created), and policy or rule conflicts (encryption requirements not met). Understanding which category the problem belongs to is the first step.", exercise: { title: "Debug a Deployment", description: "Ask the agent to add a storage bucket for application logs. Apply a rule requiring encryption. Observe how validation behaves and correct any issues." }, artifact: { title: "Corrected Configuration", description: "A corrected infrastructure configuration where the storage bucket includes encryption." }, validationChecklist: ["Storage bucket includes encryption", "Infrastructure validation succeeds", "Rule violation resolved"], knowledgeCheck: { question: "If infrastructure validation fails because a required attribute is missing, what should you do first?", options: ["Retry the deployment", "Review the provider error message to identify the missing attribute", "Delete the infrastructure project", "Disable validation rules"], correctAnswer: 1 } }
        ]
      },
      {
        id: "multiple-environments",
        title: "Multiple Environments",
        description: "If every change is applied directly to production, even a small mistake could cause an outage.",
        difficulty: "intermediate",
        estimatedTime: "20 min",
        lessons: [
          { id: "multiple-environments", title: "Introducing Multiple Environments", whyThisMatters: "If every change is applied directly to production, even a small mistake could cause an outage. This is why infrastructure teams introduce multiple environments.", coreConcepts: "Most organizations operate at least three environments: Development (experimentation), Staging (simulate production), Production (real system). Infrastructure as code allows reusing architecture while changing configuration values between environments.", exercise: { title: "Create Environments", description: "Ask the agent to generate infrastructure definitions for development and production environments." }, artifact: { title: "Multi-Environment Config", description: "Infrastructure definitions supporting both environments." }, validationChecklist: ["Both environments share same architecture", "Resource names include environment identifiers", "Development and production resources remain isolated"], knowledgeCheck: { question: "Why do engineering teams maintain multiple infrastructure environments?", options: ["To reduce cloud provider costs", "To safely test infrastructure changes before production", "To simplify network configuration"], correctAnswer: 1 } }
        ]
      },
      {
        id: "enforcing-standards",
        title: "Enforcing Standards",
        description: "As systems grow, different engineers modify infrastructure. Over time, inconsistency appears.",
        difficulty: "intermediate",
        estimatedTime: "20 min",
        lessons: [
          { id: "enforcing-security", title: "Enforcing Security Standards", whyThisMatters: "As systems grow, different engineers modify infrastructure. Over time, inconsistency appears. Some resources follow security best practices, others do not.", coreConcepts: "Organizations define security rules such as: all storage resources must be encrypted, all resources must include environment tags, internal services must not be publicly accessible. In Infracodebase, these rules guide how the agent generates infrastructure.", exercise: { title: "Create Security Rules", description: "Create a rule requiring encryption on all storage resources. Then update the infrastructure." }, artifact: { title: "Security Ruleset", description: "A ruleset enforcing encryption on storage resources." }, validationChecklist: ["Storage resources include encryption", "Security rules are enforced", "Generated infrastructure follows standards"], knowledgeCheck: { question: "Why do organizations enforce infrastructure security standards through rules?", options: ["To improve performance", "To ensure infrastructure consistently follows security policies", "To simplify diagrams", "To reduce costs"], correctAnswer: 1 } }
        ]
      },
      {
        id: "designing-for-failure",
        title: "Designing for Failure",
        description: "Infrastructure systems inevitably experience failures.\nYou will learn how to design infrastructure that continues operating when failures occur.",
        difficulty: "intermediate",
        estimatedTime: "20 min",
        lessons: [
          { id: "designing-for-failure", title: "Designing Infrastructure for Failure", whyThisMatters: "Instead of assuming the system will never fail, you design infrastructure that continues operating even when part of the system fails.", coreConcepts: "One of the most common resilience strategies is distributing resources across multiple availability zones. Each zone operates independently. Load balancers distribute incoming traffic across multiple instances. If one instance becomes unhealthy, the load balancer stops sending traffic to it.", exercise: { title: "Add Resilience", description: "Modify the infrastructure so application servers run across two availability zones." }, artifact: { title: "Resilient Architecture", description: "Infrastructure definitions distributing application servers across multiple zones." }, validationChecklist: ["Application servers run in multiple zones", "Load balancer distributes traffic", "System continues operating during zone failures"], knowledgeCheck: { question: "Why do engineers distribute infrastructure across multiple availability zones?", options: ["To reduce cost", "To protect systems from localized failures", "To simplify routing tables", "To improve application performance"], correctAnswer: 1 } }
        ]
      },
      {
        id: "operating-evolving",
        title: "Operating and Evolving Infrastructure",
        description: "Real infrastructure engineering rarely ends at deployment.\nInfrastructure must evolve as systems grow.",
        difficulty: "intermediate",
        estimatedTime: "20 min",
        lessons: [
          { id: "operating-evolving", title: "Operating and Evolving the Infrastructure", whyThisMatters: "Real infrastructure engineering rarely ends at deployment. As applications evolve, infrastructure must evolve with them.", coreConcepts: "Operating infrastructure means observing how systems behave and improving them over time: scaling resources, introducing monitoring, strengthening security controls, improving automation. You do not 'finish' infrastructure once. You keep improving it as the system and the organization change.", exercise: { title: "Scale the System", description: "Ask the agent to scale the application servers so the system can support higher traffic levels." }, artifact: { title: "Scaled Architecture", description: "Infrastructure definitions reflecting the scaled architecture." }, validationChecklist: ["Additional compute instances deployed", "Traffic flows through load balancer", "Auto-scaling parameters reflect demand"], knowledgeCheck: { question: "Why must infrastructure evolve over time?", options: ["Because application requirements change and systems must adapt", "Because cloud providers automatically remove resources", "Because routing tables expire", "Because IAM roles cannot be reused"], correctAnswer: 0 } }
        ]
      }
    ]
  },
  {
    id: "architecture-diagrams",
    title: "Architecture Diagrams & Living Documentation",
    shortTitle: "Diagrams & Docs",
    description: "Learn how infrastructure diagrams and documentation stay synchronized with infrastructure code.",
    trackIntro: "In Track 3, you learned how to understand and document that infrastructure.\nYou generated architecture diagrams.\nYou improved diagram clarity.\nYou documented architecture decisions.",
    icon: "FileText",
    order: 4,
    color: "primary",
    courses: [
      {
        id: "understanding-visually",
        title: "Understanding Infrastructure Visually",
        description: "You will learn how infrastructure can be understood through diagrams and system visualization.",
        difficulty: "intermediate",
        estimatedTime: "30 min",
        lessons: [
          { id: "understanding-architecture", title: "Understanding the Architecture You Built", whyThisMatters: "Infrastructure works, but understanding the architecture becomes harder as it grows. New engineers join, new services are added, security rules evolve.", coreConcepts: "Infrastructure code describes how resources are created. Architecture diagrams show how those resources interact. When visualized, it becomes easier to see network boundaries, service relationships, traffic flows, and security zones.", exercise: { title: "Generate Architecture Diagram", description: "Ask the agent to create an architecture diagram representing the infrastructure. Observe how networking, compute, and storage components appear." }, artifact: { title: "Architecture Diagram", description: "One generated architecture diagram representing the infrastructure." }, validationChecklist: ["Networking components appear in diagram", "Application servers appear behind load balancer", "Storage resources appear connected"] }
        ]
      },
      {
        id: "generating-reading-diagrams",
        title: "Generating Diagrams",
        description: "You will learn how to generate architecture diagrams from infrastructure definitions.",
        difficulty: "intermediate",
        estimatedTime: "30 min",
        lessons: [
          { id: "generating-diagrams", title: "Generating Architecture Diagrams from Infrastructure", whyThisMatters: "Many engineering teams create architecture diagrams manually. The problem is that infrastructure evolves constantly but manual diagrams often stay the same.", coreConcepts: "You can analyze infrastructure definitions directly on Infracodebase. Using Terraform configuration, networking topology, and service dependencies, you can generate architecture diagrams that stay aligned with the real infrastructure.", exercise: { title: "Auto-Generate Diagrams", description: "Ask the agent to generate an architecture diagram based on the current infrastructure configuration." }, artifact: { title: "Generated Diagram", description: "One generated architecture diagram reflecting current infrastructure." }, validationChecklist: ["Diagram reflects infrastructure defined in workspace", "Networking zones appear correctly", "Application services appear connected to storage and load balancing"], knowledgeCheck: { question: "Why are automatically generated diagrams valuable?", options: ["They replace infrastructure code", "They stay aligned with the real infrastructure", "They replace security reviews"], correctAnswer: 1 } }
        ]
      },
      {
        id: "improving-clarity-communication",
        title: "Improving Clarity",
        description: "You will learn how to improve diagram clarity to communicate system structure.",
        difficulty: "intermediate",
        estimatedTime: "30 min",
        lessons: [
          { id: "improving-clarity", title: "Improving Diagram Clarity", whyThisMatters: "Even if a diagram contains correct information, engineers may struggle to understand it when services appear randomly positioned, connections cross each other, or networking boundaries aren't visually clear.", coreConcepts: "Good architecture diagrams communicate structure. Infrastructure components should be grouped into logical zones (networking, application, storage). Network boundaries should be visible (public subnets, private subnets, isolated database subnets). These visual groupings help engineers understand security boundaries quickly.", exercise: { title: "Reorganize Diagram", description: "Reorganize the architecture diagram so that networking components appear in a clearly defined VPC boundary, application servers appear grouped behind the load balancer, and storage services appear near the services that interact with them." }, artifact: { title: "Improved Diagram", description: "An updated architecture diagram with improved visual clarity." }, validationChecklist: ["Networking boundaries visible", "Compute services grouped logically", "Storage resources connected to correct services", "Traffic flow easier to follow"], knowledgeCheck: { question: "Why is diagram clarity important?", options: ["It reduces cloud costs", "It helps engineers understand infrastructure behavior and troubleshoot issues", "It improves Terraform performance"], correctAnswer: 1 } }
        ]
      },
      {
        id: "documenting-architecture-decisions",
        title: "Architecture Decisions",
        description: "You will learn how to document architecture decisions and explain why systems are designed in a certain way.",
        difficulty: "intermediate",
        estimatedTime: "30 min",
        lessons: [
          { id: "documenting-decisions", title: "Documenting Architecture Decisions", whyThisMatters: "Infrastructure code shows how infrastructure works, but it does not always explain why the architecture was designed this way. Without documentation, architectural decisions may accidentally be reversed or weakened.", coreConcepts: "Architecture documentation explains the intent behind the infrastructure: architectural constraints, system requirements, security principles, and operational expectations. Documentation also allows the agent to reference architectural constraints when generating infrastructure.", exercise: { title: "Create Architecture Documentation", description: "Create a document describing the architecture decisions behind the infrastructure you built. Include explanations for network isolation, environment separation, and encryption requirements." }, artifact: { title: "Architecture Decision Record", description: "One architecture documentation file stored in the workspace on Infracodebase." }, validationChecklist: ["Document explains architecture decisions", "Document is stored in workspace", "Agent can reference the document", "Documented decisions match infrastructure definitions"], knowledgeCheck: { question: "Why is architecture documentation important?", options: ["It replaces infrastructure code", "It explains the reasoning behind infrastructure design decisions", "It stores cloud credentials"], correctAnswer: 1 } }
        ]
      },
      {
        id: "living-documentation",
        title: "Living Documentation",
        description: "Diagrams and documentation remain synchronized with infrastructure. This creates living architecture documentation, where infrastructure code, architecture diagrams, and documentation evolve together.",
        difficulty: "intermediate",
        estimatedTime: "30 min",
        lessons: [
          { id: "keeping-current", title: "Keeping Architecture Understanding Current", whyThisMatters: "Infrastructure rarely remains static. As it evolves, diagrams and documentation must evolve with it. If they remain static, engineers stop trusting them.", coreConcepts: "Three elements must evolve together: infrastructure definitions, architecture diagrams, and architecture documentation. When infrastructure changes, diagrams should be regenerated and documentation should be updated. Because the infrastructure lives on Infracodebase, these elements can remain connected inside the same workspace.", exercise: { title: "Update Documentation", description: "Modify the infrastructure by introducing a new service. Then regenerate the architecture diagram and update the documentation." }, artifact: { title: "Updated Architecture Package", description: "A workspace containing updated infrastructure definitions, regenerated architecture diagram, and updated architecture documentation." }, validationChecklist: ["Diagram reflects updated infrastructure", "Documentation explains new component", "Architecture representation remains accurate"] }
        ]
      }
    ]
  },
  {
    id: "enterprise-governance",
    title: "Enterprise Governance & Platform Engineering",
    shortTitle: "Governance",
    description: "Learn how organizations scale infrastructure work through rulesets, workflows, subagents, workspace history, and platform engineering practices.",
    icon: "Shield",
    order: 5,
    color: "primary",
    courses: [
      {
        id: "governance-platform",
        title: "Enterprise Governance and Platform Engineering",
        description: "Understand how organizations scale infrastructure work with consistency, traceability, and control through rulesets, workflows, subagents, and workspace history.",
        difficulty: "advanced",
        estimatedTime: "5 hours",
        lessons: [
          {
            id: "why-governance",
            title: "Why Governance Matters for AI-Assisted Infrastructure",
            whyThisMatters: "When one engineer works alone, infrastructure decisions often stay manageable. But as more teams begin using the agent, infrastructure work starts happening faster and in more places at once. Different teams may request similar systems. But they may describe them differently. They may apply different standards. They may expect different review steps. Over time, infrastructure work begins to diverge. This is the real governance problem. The issue is not that teams are moving too quickly. The issue is that they may no longer be moving consistently. In Infracodebase, governance is not presented as a separate approval layer. It is built into how the system behaves through rulesets, workflows, subagents, and workspace history.",
            coreConcepts: "At this stage, the simplest way to think about governance is structured consistency.\n\nRulesets define standards the agent must follow. The docs describe them as collections of rules organized around a specific concern, written in plain language, and applied at enterprise, workspace, or user level.\n\nWorkflows define the process the agent should follow. The docs explicitly say they represent the business process, not the specific technical steps, and that they encode how your best engineers approach work.\n\nSubagents handle specialized tasks in their own context window with their own system prompt, tool access, and model. This keeps specialized work out of the main conversation and lets organizations constrain tools and costs more deliberately.\n\nHistory records every change as a commit in the workspace, giving you a granular timeline of what happened, when it happened, and how the workspace evolved.",
            stepByStep: "Open the enterprise configuration area and review the pages for Rulesets, Workflows, and Subagents.\n\nThen open a workspace and review the History panel.\n\nNotice what the product is really doing.\n\n- It is not asking teams to memorize policy by hand.\n- It is giving the agent standards to follow.\n- It is giving the agent a process to follow.\n- It is allowing specialized work to be delegated.\n- And it is recording each change as part of the workspace timeline.",
            exercise: { title: "Identify Governance Needs", description: "Write down three standards your organization would want the agent to follow. Then write down one repeatable process your team would want the agent to follow every time infrastructure is requested." },
            artifact: { title: "Governance Note", description: "A short governance note describing: three organization standards, one repeatable delivery process." },
            validationChecklist: [
              "Can explain why governance matters once multiple teams use the agent",
              "Understand how standards differ from process",
              "Understand how Infracodebase implements governance through product features rather than theory"
            ],
            failureAndDebugging: "A common mistake here is treating governance as only \"approval.\" That is too narrow. In Infracodebase, governance also includes the rules the agent must follow, the workflow it should use, the subagents available for specialized tasks, and the commit-based history that makes work traceable. If you reduce governance to review alone, you miss most of the product model.",
            modificationExercise: "Revise your governance note so it explicitly separates:\n\n- standards enforced by rulesets\n- process encoded in workflows\n- specialized work delegated to subagents",
            knowledgeCheck: { question: "What is the primary goal of governance in Infracodebase?", options: ["Slow down infrastructure development", "Ensure infrastructure work happens consistently across teams", "Replace engineers", "Remove the need for workspace history"], correctAnswer: 1 }
          },
          {
            id: "enterprise-rulesets",
            title: "Designing Enterprise Rulesets",
            whyThisMatters: "Once multiple teams use the agent, small inconsistencies become large organizational problems.\n\nOne team may use one naming pattern. Another may use a different one.\n\nOne team may enforce encryption by default. Another may forget.\n\nOne workspace may follow one file structure. Another may evolve in a different direction.\n\nWithout shared standards, the agent may still generate useful output. But it will not generate consistent output.\n\nThat is why rulesets matter. The rulesets docs describe them as the mechanism for making the agent\u2019s non-deterministic behavior controllable.",
            coreConcepts: "A ruleset is a collection of related rules organized around a specific concern and written in plain language. The docs give examples like Terraform configuration guidelines covering module sourcing, naming conventions, state management, and variable structure.\n\n**Rulesets exist at three levels:**\n\n- Enterprise\n- Workspace\n- User\n\nEnterprise rulesets set organization-wide standards across workspaces. Workspace rulesets add project-specific behavior. User rulesets capture personal preferences within the boundaries above them. The docs also define the precedence clearly: enterprise first, then workspace, then user.\n\nThe enterprise docs add another important distinction. An enterprise ruleset can be enabled or required. Enabled means it is published and available to workspaces. Required means workspaces cannot opt out. A ruleset that is both enabled and required is locked on across the organization.",
            stepByStep: "1. Open the enterprise Rulesets page.\n2. Review how a ruleset includes a name, a description, and individual rules written in plain language.\n3. Then inspect whether the ruleset is enabled and whether it is required.\n4. Now compare that to the workspace level. The docs explain that optional enterprise rulesets can be turned on from workspace settings, while required enterprise rulesets are locked on and cannot be disabled.",
            exercise: { title: "Create a Ruleset", description: "Create a ruleset for one concern only. For example: Storage Security Standards. Add plain-language rules such as: All storage resources must use encryption. All storage resources must include environment tags." },
            artifact: { title: "Enterprise Ruleset", description: "One enterprise ruleset with: a focused concern, a description, at least two plain-language rules." },
            validationChecklist: [
              "The ruleset is focused on one concern",
              "The rules are written in plain language",
              "You can explain whether it should be enabled only or enabled and required"
            ],
            failureAndDebugging: "A common mistake is writing rulesets that are too vague. The docs explicitly recommend specificity. \"Use t3.medium as the default EC2 instance type\" is better than \"Use appropriate instance sizes.\" They also recommend one ruleset per concern, plain language instead of code, and using required sparingly for true organization-wide standards. If your ruleset is too broad or mixes unrelated concerns, it becomes harder to manage and harder for teams to adopt.",
            modificationExercise: "Split a broad ruleset into two smaller ones. For example:\n\n- Storage Security Standards\n- Resource Naming Standards\n\nThen decide which one should be required and which one should remain optional.",
            knowledgeCheck: { question: "What does \"required\" mean for an enterprise ruleset?", options: ["The ruleset is visible but inactive", "Every workspace must use it and cannot disable it", "Only enterprise admins can view it", "The ruleset overrides workspace history"], correctAnswer: 1 }
          },
          {
            id: "structuring-workflows",
            title: "Structuring Delivery With Workflows",
            whyThisMatters: "Even when standards are clear, teams can still produce inconsistent outcomes if they do not follow a consistent process. One engineer may begin by writing code immediately. Another may start by gathering requirements. Another may forget documentation until the end. Another may skip validation and move straight into implementation. When this happens, the problem is no longer the standards. The problem is the order of operations. This is what workflows solve. The docs define workflows as how things get done at your organization and say they represent the business process the agent should follow, not the specific technical steps.",
            coreConcepts: "A workflow is a sequence of high-level steps that guides the agent through a process. The docs give a direct example of an \"Infrastructure Delivery\" workflow:\n\n- Gather functional and nonfunctional requirements\n- Create a technical architecture plan\n- Document the security standards and compliance requirements\n- Write the infrastructure code\n- Validate the code and confirm it meets the requirements\n- If validation fails, route back to writing code\n\nThat example matters because it shows the correct level of abstraction. A workflow should describe business process. It should not describe low-level implementation. The docs explicitly say that \"Document the security standards for this project\" is a good workflow step, while \"Create a Terraform security group with ingress on port 443\" is not.",
            stepByStep: "Open the enterprise Workflows page. Review an existing workflow and inspect its steps. Ask yourself whether the steps describe:\n\n- a business process\n- or low-level technical implementation\n\nIf the steps are too technical, the workflow is no longer reusable. The docs also explain that if you want the agent to use a specific capability at a specific step, you can mention that in the step itself, such as using web search or looking up existing configuration in another system.",
            exercise: { title: "Create a Workflow", description: "Create a workflow called: Infrastructure Delivery. Add steps such as: Gather requirements, Create an architecture plan, Document standards, Write infrastructure code, Validate results, Revise if validation fails." },
            artifact: { title: "Delivery Workflow", description: "One workflow containing ordered, high-level process steps." },
            validationChecklist: [
              "Each step describes business process rather than implementation detail",
              "The steps are ordered",
              "The workflow could guide the agent repeatedly across projects"
            ],
            failureAndDebugging: "A common workflow mistake is making steps too technical. When that happens, the workflow becomes a one-off script instead of an organizational process. Another mistake is omitting validation or feedback loops. The docs example explicitly includes routing back to writing code if validation fails. That loop is important because it turns the workflow into an actual delivery process rather than a straight-line checklist.",
            modificationExercise: "Improve your workflow by adding one explicit feedback step. For example: If validation fails, revise the implementation and validate again.",
            knowledgeCheck: { question: "What should a workflow describe?", options: ["Specific resource blocks and exact ports", "The business process the agent should follow", "Individual Terraform commands", "Cloud provider API calls"], correctAnswer: 1 }
          },
          {
            id: "delegating-subagents",
            title: "Delegating Specialized Work With Subagents",
            whyThisMatters: "As infrastructure work becomes broader, not every task belongs in the main conversation. Some tasks are specialized. A team may need one kind of behavior for Git operations. Another for focused code changes. Another for domain-specific analysis. If every specialized task stays in the same conversation with the same tools and the same prompt, context becomes crowded and control becomes weaker. This is why subagents matter. The docs describe subagents as specialized AI agents that handle specific types of tasks. Each one runs in its own context window with a custom system prompt, specific tool access, and a dedicated model.",
            coreConcepts: "A subagent is a delegated execution layer. When the main agent encounters a task that matches a subagent\u2019s capabilities, it delegates to that subagent. The subagent works independently and returns results. The docs explain four core benefits.\n\n- Subagents help preserve context by keeping specialized work out of the main conversation.\n- They enforce constraints by limiting tool access.\n- They help control costs by routing tasks to cheaper or faster models when appropriate.\n- And they specialize behavior through focused prompts.\n\nInfracodebase includes built-in subagents managed by the platform. The docs specifically mention the Git Agent for git operations such as initializing repositories, branching, committing, and pushing to GitHub. Built-in subagents always use the latest version.\n\nEnterprise admins can also create custom subagents with:\n\n- a name and description\n- a focused system prompt\n- specific allowed tools\n- a chosen model or inherited model\n\nCustom subagents support versioning, and workspaces pin to a specific version until they upgrade.",
            stepByStep: "1. Open the enterprise Subagents page.\n2. Review the list of available subagents and inspect whether each is enabled, required, or optional.\n3. Then inspect one custom subagent definition and look for: name, description, system prompt, tools, and model.\n\nNow compare that with a workspace. The docs explain that enterprise settings apply as defaults, that required subagents are locked on, and that optional subagents can be toggled at the workspace level. They also explain that workspaces pin custom subagents to a specific version and see a notification when a newer version is available.",
            exercise: { title: "Design a Subagent", description: "Design one custom subagent for a specialized responsibility. For example: Git Operations Assistant. Describe: when the main agent should delegate to it, which tools it should be allowed to use, which model it should use." },
            artifact: { title: "Custom Subagent Definition", description: "One custom subagent definition including: name, description, system prompt intent, tools, model choice." },
            validationChecklist: [
              "The subagent has a clearly scoped responsibility",
              "The allowed tools match that responsibility",
              "You can explain whether it should be required or optional"
            ],
            failureAndDebugging: "A common mistake is making a subagent too broad. If its prompt is vague, its responsibilities overlap with the main agent, or it has tool access that is wider than necessary, you lose the main advantages of delegation. Another mistake is forgetting version behavior. The docs are clear that custom subagents create new versions when prompt, tools, or model change, and workspaces pin to a version until they upgrade. That means changes to a subagent do not silently rewrite behavior in every workspace at once.",
            modificationExercise: "Refine your subagent so it uses fewer tools. Then decide whether that tighter scope makes it safer to mark as required or better to keep optional.",
            knowledgeCheck: { question: "What is the role of subagents in Infracodebase?", options: ["Replace engineers", "Handle specialized tasks in their own constrained context", "Store workspace history", "Override enterprise rulesets"], correctAnswer: 1 }
          },
          {
            id: "workspace-history",
            title: "Understanding Workspace History",
            whyThisMatters: "A workspace is not static. As engineers and agents make changes, the workspace evolves over time. Files change. Documentation changes. Generated code changes. Sometimes the right move is to inspect a previous state. Sometimes the right move is to undo a bad change. Sometimes the real challenge is simply understanding how the workspace got here. That is why history matters. The workspace History docs say the agent creates a commit for every change it makes, giving you a granular timeline of everything that happened and making it easy to see what changed, when, and why.",
            coreConcepts: "History in Infracodebase is commit-based. The History panel shows commits in reverse chronological order. Each entry shows the commit message, author, and how long ago it was made. Clicking a commit opens the full diff, including all changed files and counts of lines added and removed, and each file can be viewed side-by-side or inline. The docs also describe three important behaviors.\n\n1. First, you can revert to any previous commit. Reverting creates a new commit that restores the workspace to that earlier state without deleting any history.\n2. Second, you can bookmark important commits to mark milestones or known-good states and later filter to find them quickly.\n3. Third, if the workspace is connected to GitHub, the History panel also shows when remote commits are available, and publishing will pull in remote changes before pushing yours.",
            stepByStep: "1. Open the History panel.\n2. Review the list of commits in reverse chronological order.\n3. Click one commit and inspect:\n   - the commit message\n   - the author\n   - the relative time\n   - the changed files\n   - the lines added and removed\n4. Then open one file diff and compare the before and after view.\n5. Finally, identify a commit that you would consider a milestone or known-good state and imagine bookmarking it for quick retrieval later.",
            exercise: { title: "Review Workspace History", description: "Open a real workspace history timeline. Select one commit. Review the file changes. Open one diff. Identify whether the commit should be bookmarked as a milestone." },
            artifact: { title: "History Review", description: "A reviewed workspace commit including: commit message, author, what changed, whether it should be bookmarked." },
            validationChecklist: [
              "You can find commits in reverse chronological order",
              "You can inspect diffs and line changes",
              "You understand that reverts create new commits rather than deleting history"
            ],
            failureAndDebugging: "A common misunderstanding is thinking of history as only a passive log. It is more than that. Because commits include diffs and reverts create new commits, history is also part of how engineers investigate changes and safely recover from mistakes. Another common mistake is assuming that a revert erases the past. The docs are explicit that it does not; history remains complete.",
            modificationExercise: "Identify one commit that represents a known-good state. Describe why it should be bookmarked and under what future scenario you would revert to it.",
            knowledgeCheck: { question: "What happens when you revert to a previous commit in workspace history?", options: ["The selected commit is deleted", "All later history is removed", "A new commit is created that restores the earlier state", "The workspace disconnects from GitHub"], correctAnswer: 2 }
          },
          {
            id: "platform-engineering",
            title: "The Role of Platform Engineering",
            whyThisMatters: "In modern organizations, platform teams support many engineering teams. Their goal is simple. Make it easy for teams to build infrastructure safely. As more teams adopt infrastructure as code and AI-assisted workflows, the challenge is no longer just building systems. It is ensuring that those systems are built:\n\n- consistently\n- securely\n- and in a way that scales across teams\n\nWithout platform engineering, each team builds infrastructure differently. Standards drift. Processes diverge. Systems become harder to maintain. With platform engineering, teams can move faster while still following shared standards. In Infracodebase, this is achieved by encoding platform behavior directly into the system through rulesets, workflows, subagents, and workspace history.",
            whatYoullLearn: [
              "What platform engineering teams do",
              "How governance supports platform engineering",
              "How Infracodebase acts as a platform layer across teams"
            ],
            coreConcepts: "Platform engineering is about building systems that enable other engineers to build systems. Instead of building infrastructure directly, platform teams define:\n\n- standards\n- processes\n- constraints\n- and reusable patterns\n\nIn Infracodebase, these are implemented through four core primitives:\n\n- Rulesets — Define the standards infrastructure must follow across teams.\n- Workflows — Define how infrastructure work is performed step by step.\n- Subagents — Handle specialized tasks in controlled and reusable ways.\n- History — Tracks how infrastructure evolves over time across teams.\n\nTogether, these create a platform where infrastructure work becomes:\n\n- consistent\n- repeatable\n- and observable",
            stepByStep: "1. Open the enterprise configuration.\n2. Review the rulesets that define organization-wide standards.\n3. Review workflows that structure how infrastructure is delivered.\n4. Review subagents that handle specialized tasks.\n5. Open a workspace and inspect how history tracks changes over time.\n6. Observe how these components work together.\n\nInstead of relying on individual engineers to remember standards and processes, the platform encodes them directly.",
            exercise: { title: "Platform Engineering Use Case", description: "Write a short description of how a platform engineering team could use Infracodebase to support multiple teams. Include: one ruleset, one workflow, one subagent, one way teams would use history during delivery." },
            artifact: { title: "Platform Engineering Use Case", description: "A short written description explaining how an organization uses Infracodebase to support multiple teams." },
            validationChecklist: [
              "Understand the role of platform engineering",
              "Understand how governance enables platform teams",
              "Understand how Infracodebase encodes platform behavior across teams"
            ],
            failureAndDebugging: "A common mistake is thinking platform engineering is only about tooling. It is not. It is about defining:\n\n- standards (rulesets)\n- process (workflows)\n- execution boundaries (subagents)\n- traceability (history)\n\nIf these are unclear or mixed together, the platform becomes harder to use and less effective.",
            modificationExercise: "Improve your platform engineering use case. Add one additional primitive you did not include in your first version. Then explain how it strengthens the overall platform model.",
            knowledgeCheck: { question: "What is the goal of platform engineering?", options: ["Replace developers", "Enable teams to build infrastructure safely and consistently", "Eliminate infrastructure code"], correctAnswer: 1 }
          },
          {
            id: "operating-model",
            title: "Putting the Enterprise Operating Model Together",
            whyThisMatters: "At this point, you have studied the four key product mechanisms separately. You have seen how standards are encoded. You have seen how process is encoded. You have seen how specialized execution is delegated. You have seen how changes remain traceable over time. Now the goal is to understand how they work together as one system. That is the real platform engineering lesson.",
            coreConcepts: "In Infracodebase, an enterprise operating model comes from the combination of four primitives.\n\n**Rulesets, Workflows, Subagents, and History**\n\nRulesets define what the agent must follow. They give organizations controllable standards across enterprise, workspace, and user levels.\n\nWorkflows define how the agent should approach work. They encode the organization\u2019s order of operations as high-level business steps.\n\nSubagents define who should handle specialized work. They isolate delegated tasks into constrained contexts with specific prompts, tools, and models.\n\nHistory defines how work remains understandable over time. It records every change as a commit with diffs, bookmarks, reverts, and remote awareness.\n\nTaken together, these are not separate features. They form one operating model.",
            stepByStep: "Imagine your organization wants all infrastructure requests to follow the same pattern.\n\nStart with a ruleset that defines naming, encryption, and tagging standards. Then add a workflow that tells the agent to gather requirements, plan architecture, document standards, implement, and validate. Then add a subagent for specialized Git operations or another focused responsibility. Finally, review the workspace history to confirm that each change is being captured as commits, and identify milestones with bookmarks. This sequence mirrors the product model in the docs: standards, process, specialized execution, and traceability.",
            exercise: { title: "Design Operating Model", description: "Design a simple enterprise operating model using all four primitives. Describe: one ruleset your organization requires, one workflow it wants the agent to follow, one subagent it wants available, one way teams would use history during delivery." },
            artifact: { title: "Platform Operating Model", description: "A short description of how your organization would use: rulesets, workflows, subagents, history." },
            validationChecklist: [
              "Each primitive has a clear role",
              "Standards and process are not confused with each other",
              "Specialized execution is separate from general agent behavior",
              "Traceability remains visible through workspace history"
            ],
            failureAndDebugging: "A common failure here is mixing the primitives together. For example, teams may try to put standards into workflows instead of rulesets. Or they may try to use a subagent to compensate for a missing workflow. Or they may treat history as a backup tool rather than a working timeline. The clearer the boundaries are, the more scalable the operating model becomes. The docs themselves make these boundaries explicit by describing each feature with a separate role: rulesets for standards, workflows for process, subagents for delegated specialization, and history for commit-based evolution.",
            modificationExercise: "Take your operating model and improve it. Decide which rule should be required, which workflow step should include explicit validation, which subagent should remain optional, and which commit states should be bookmarked as milestones.",
            knowledgeCheck: { question: "What enables infrastructure work to scale consistently in Infracodebase?", options: ["Manual review alone", "Rulesets, workflows, subagents, and workspace history working together", "User preferences only", "GitHub integration by itself"], correctAnswer: 1 }
          },
          {
            id: "capstone-1",
            title: "Capstone Project 1 — Designing an Enterprise Platform Model",
            whyThisMatters: "Throughout this track, you have learned how infrastructure work scales across organizations. You explored:\n\n- how rulesets define standards\n- how workflows structure work\n- how subagents handle specialized tasks\n- how history tracks system evolution\n\nIndividually, each of these components is useful. But real organizations do not use them separately. They combine them into a platform model. This model defines how infrastructure work happens across teams.\n\nIn practice, platform teams are not asked:\n\n\"Create a ruleset.\"\n\nThey are asked:\n\n\"Design how infrastructure will be built across the company.\"\n\nThis requires thinking across:\n\n- governance\n- process\n- execution\n- traceability\n\nThis capstone gives you that experience.",
            coreConcepts: "Designing a platform model requires combining multiple dimensions at once.\n\n**Standards (Rulesets)** — Define what infrastructure must follow across teams.\n**Process (Workflows)** — Define how infrastructure work is performed.\n**Execution Boundaries (Subagents)** — Define how specialized tasks are handled safely.\n**Traceability (History)** — Define how infrastructure changes are tracked and understood.\n\nA strong platform model ensures:\n\n- consistency across teams\n- repeatability of infrastructure work\n- visibility into system evolution",
            engineeringReflection: "Imagine you are part of a platform team in a growing organization. Multiple teams are building infrastructure. Each team has different habits, tools, and levels of experience. Some follow best practices. Others do not. Over time:\n\n- security standards become inconsistent\n- infrastructure becomes harder to debug\n- systems behave unpredictably\n\nYour role is not to fix individual systems. Your role is to design the platform that all teams will use. That platform must:\n\n- guide engineers\n- enforce standards\n- enable flexibility\n- scale with the organization\n\nThis is what you will design.",
            stepByStep: "Open your workspace in Infracodebase. You will now design a platform model. Start by defining the context. Imagine your organization builds web applications. Multiple teams need to:\n\n- deploy infrastructure\n- manage environments\n- handle security requirements\n\n**Step 1 — Define Standards**\nCreate rulesets that define: required security practices, required tagging or naming conventions. Think carefully about scope. Rulesets should enforce consistency without blocking development.\n\n**Step 2 — Define Process**\nCreate a workflow that defines how infrastructure work is performed. For example: initial design, validation, refinement, final generation. The workflow should guide engineers through a repeatable process.\n\n**Step 3 — Define Execution Boundaries**\nIntroduce a subagent. This subagent should handle a specific task. For example: validating security rules, generating configuration, reviewing architecture. Ensure the scope is clear. Subagents should not be too broad.\n\n**Step 4 — Define Traceability**\nDecide how history will be used. For example: tracking infrastructure evolution, reviewing changes across environments, understanding how decisions were made. History should make system changes observable.\n\n**Step 5 — Combine the System**\nNow review your platform model as a whole. Ask yourself:\n\n- do rulesets align with workflows?\n- do workflows use subagents correctly?\n- does history reflect the full process?\n\nThis is the moment where the system becomes real.",
            exercise: { title: "Design Enterprise Platform", description: "Design a complete enterprise platform model using Infracodebase. Your model should include: at least 2 rulesets, 1 workflow, 1 subagent, a defined history usage strategy." },
            artifact: { title: "Enterprise Platform Model", description: "Your workspace should contain: defined rulesets, a structured workflow, a configured subagent, visible history of changes." },
            validationChecklist: [
              "Rulesets clearly define standards",
              "Workflow guides infrastructure work step by step",
              "Subagent handles a specific task without overlap",
              "History reflects the evolution of the system",
              "All components work together coherently"
            ],
            failureAndDebugging: "Designing platform models often introduces subtle problems. For example:\n\n- Rulesets may be too strict and block development.\n- Workflows may be unclear or incomplete.\n- Subagents may overlap in responsibility.\n- History may not capture meaningful changes.\n\nWhen this happens:\n\n- Start by identifying which component is causing friction.\n- Then adjust that component while preserving the rest of the system.\n- Avoid redesigning everything at once.",
            modificationExercise: "Improve your platform model. Introduce one additional constraint: For example: All infrastructure must include environment-specific configuration. Update: rulesets, workflow, or subagent behavior. Observe how the system evolves.",
            knowledgeCheck: { question: "Which combination of components defines a complete platform model?", options: ["Rulesets only", "Workflows only", "Rulesets, workflows, subagents, and history", "Infrastructure code only"], correctAnswer: 2 }
          },
          {
            id: "capstone-2",
            title: "Capstone Project 2 — Debugging and Improving a Platform Model",
            whyThisMatters: "In real organizations, platform engineers rarely start from a clean, well-designed system. More often, they inherit a platform that has already evolved over time.\n\nThat platform may include:\n\n- rulesets\n- workflows\n- subagents\n- workspace history\n\nAt first glance, everything may appear to work. Infrastructure is being generated. Teams are building systems. But over time, deeper problems begin to appear. Different teams produce different outputs. Security standards are applied inconsistently. Workflows feel unclear or incomplete. Debugging infrastructure changes becomes difficult. At this point, the challenge is no longer building infrastructure. The challenge is understanding and improving a complex, evolving system. This is one of the most important skills in platform engineering. And importantly:\n\n- Most failures are not caused by missing components\n- They are caused by misalignment between components",
            coreConcepts: "Debugging a platform model requires understanding how problems emerge across multiple layers. Most issues fall into four categories:\n\n**Standards Issues (Rulesets)**\n- rules are missing or incomplete\n- rules are too vague\n- rules conflict with each other\nThis leads to inconsistent infrastructure outputs.\n\n**Process Issues (Workflows)**\n- workflows skip important steps\n- validation is missing\n- steps are too technical or unclear\nThis leads to unpredictable delivery processes.\n\n**Execution Issues (Subagents)**\n- subagents are too broad\n- responsibilities overlap\n- tool access is not controlled\nThis leads to inconsistent or unsafe execution.\n\n**Traceability Issues (History)**\n- changes are difficult to understand\n- important milestones are not identified\n- debugging requires guessing\nThis makes systems harder to maintain and improve.\n\nBut these issues rarely exist in isolation. They often reinforce each other. For example:\n\n- weak rulesets \u2192 workflows cannot enforce standards\n- unclear workflows \u2192 subagents are triggered inconsistently\n- poor subagent boundaries \u2192 history becomes harder to interpret\n\nUnderstanding these interactions is key to debugging effectively.",
            engineeringReflection: "Imagine you join a platform team responsible for infrastructure across multiple product teams. The system already exists. But engineers report recurring issues:\n\n- application environments behave differently across teams\n- security rules are not always enforced\n- infrastructure generation sometimes produces unexpected results\n- debugging changes takes too long\n\nThe system is not broken. But it is not reliable. Your role is not to redesign everything. Your role is to:\n\n- understand how the system behaves\n- identify where inconsistencies originate\n- improve the platform without disrupting teams\n\nThis requires careful observation and structured thinking. And most importantly: You must think in systems, not in isolated fixes.",
            stepByStep: "Open the platform model in your workspace. You will now investigate and improve the system.\n\n**Scenario — Current State:**\n- multiple rulesets exist, but they are not clearly scoped\n- workflows exist, but validation steps are inconsistent\n\n**Reported Problems:**\n- Infrastructure outputs vary between teams\n- Some storage resources are missing required security settings\n- Engineers follow different processes when generating infrastructure\n- Subagents sometimes produce conflicting outputs\n- It is difficult to understand how the system evolved over time\n\n**Step 1 — Identify Standards Issues**\nReview all existing rulesets. Look for: missing rules (e.g. security, tagging, naming), vague rules (e.g. \"use best practices\"), overlapping or conflicting rules. Ask yourself: Do these rulesets produce consistent infrastructure across teams?\n\n**Step 2 — Analyze Process Flow**\nOpen the workflow definitions. Check: does the workflow include validation?\n\n**Step 3 — Inspect Execution Boundaries**\nReview subagents. Look for: unclear responsibilities, overlapping scopes, excessive tool access. Ask yourself: Is each subagent responsible for one clearly defined task?\n\n**Step 4 — Evaluate Traceability**\nOpen the workspace history. Inspect: commit timeline, changes across files, ability to understand system evolution. Ask yourself: Can you explain how the system reached its current state? If not, traceability is insufficient.\n\n**Step 5 — Identify Root Causes**\nNow step back. Map each reported problem to a system component:\n\n- Inconsistent Outputs \u2192 Rulesets\n- Missing Security \u2192 Rulesets or Workflows\n- Inconsistent Process \u2192 Workflows\n- Conflicting Outputs \u2192 Subagents\n- Unclear Evolution \u2192 History\n\nThen go one level deeper: Are these problems caused by a single component or by misalignment between multiple components? This step is critical. Do not fix anything yet. Understand the system first.\n\n**Step 6 — Apply Targeted Improvements**\nNow improve the platform model. Make focused changes:\n\n- Refine rulesets to be specific and scoped\n- Add validation steps to workflows\n- Reduce subagent scope and clarify responsibilities\n- Define how history should be used (e.g. milestones, review points)\n\nAs you make changes, observe:\n\n- How ruleset changes affect workflow behavior\n- How workflow changes affect subagent usage\n- How execution changes appear in history\n\nAvoid large redesigns. Make controlled improvements.\n\n**Step 7 — Validate the System**\nAfter applying changes:\n\n- review generated infrastructure\n- verify consistency across teams\n- inspect workflow behavior\n- review history for clarity\n\nThen ask: Is the system now more aligned? The goal is not perfection. The goal is improved consistency, clarity, and alignment.",
            exercise: { title: "Debug and Improve Platform", description: "Using Infracodebase: Analyze the platform model and resolve the reported issues. Focus on: rulesets, workflows, subagents, history. And explicitly: identify where misalignment existed before your changes." },
            artifact: { title: "Improved Platform Model", description: "Your workspace should contain: refined rulesets with clear scope, an improved workflow including validation, subagents with clearly defined responsibilities, a structured history reflecting system evolution, plus a short explanation of the root causes you identified." },
            validationChecklist: [
              "Infrastructure outputs are consistent across teams",
              "Security rules are always applied",
              "Workflows guide engineers clearly",
              "Subagents do not overlap in responsibility",
              "History allows you to understand system changes",
              "You can explain what caused the original issues"
            ],
            failureAndDebugging: "A common mistake is applying random fixes without understanding the system. This often introduces new problems. Instead, follow a structured approach:\n\n1. observe system behavior\n2. identify the category of the problem\n3. locate the responsible component\n4. verify if misalignment exists\n5. apply a targeted fix\n\nAnother common mistake is trying to fix everything at once. Platform systems evolve best through incremental improvements.",
            modificationExercise: "Extend your improved platform model. Introduce one additional requirement: For example: All infrastructure must include environment-specific tagging. Update: rulesets, workflows, or subagent behavior. Then observe: how this change propagates across the system.\n\n**Advanced Reflection:**\nAfter improving the platform model, take a step back. Reflect on the system as a whole.\n\n- Which issue was the most difficult to identify, and why?\n- Which component caused the most cascading problems?\n- Where did misalignment create the biggest impact?\n- How would this platform behave if the number of teams increased significantly?\n- Which part of the system would break first under scale?\n\nThis reflection is critical. Platform engineering is not only about fixing systems. It is about understanding how systems behave as they grow in complexity.",
            knowledgeCheck: { question: "Your platform produces inconsistent infrastructure outputs across teams. What is the most likely root cause?", options: ["Incorrect cloud provider configuration", "Misalignment between rulesets, workflows, and subagents", "Too many workspace commits", "GitHub integration failure"], correctAnswer: 1 }
          }
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
