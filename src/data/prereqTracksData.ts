import type { LearningPath } from "./courseData";

export const prereqFoundations: LearningPath = {
  id: "prereq-foundations",
  title: "Cloud & Infrastructure Training — Foundations",
  shortTitle: "Prereq: Foundations",
  description: "Learn what the cloud actually is, how compute, storage, networking, and identity work together, and build your first real infrastructure environment step by step.",
  icon: "CloudCog",
  order: 0,
  color: "prerequisite",
  accentColor: "#1E3A5F",
  courses: [
    {
      id: "mod0-cloud-understanding",
      title: "Module 0 — Understanding What the Cloud Actually Is",
      description: "Start here. Understand what the cloud really is beneath the abstraction, and learn the core building blocks that every infrastructure environment is built from.",
      difficulty: "beginner",
      estimatedTime: "20 min",
      lessons: [
        {
          id: "p1-lesson-1",
          title: "What the Cloud Really Means",
          whyThisMatters: "When you first encounter AWS, Azure, or Google Cloud, the cloud can feel like magic. Resources appear instantly. Servers are created on demand. Storage expands automatically. If that abstraction stays mysterious, everything else becomes harder to understand. You may memorize service names but still not understand what is actually happening.\n\nCore idea: The cloud is not magic. It is a model for renting computing resources, storage, networking, and control systems from someone else's physical infrastructure.",
          whatYoullLearn: [
            "What the cloud really is and why it feels abstract at first",
            "The three cloud service models: IaaS, PaaS, and SaaS",
            "The three deployment models: public, private, and hybrid cloud",
            "Why the underlying model matters more than memorizing service names"
          ],
          coreConcepts: "Cloud platforms provide access to real infrastructure through software interfaces. Instead of buying and operating physical servers, you rent infrastructure from providers that already run massive data centers. The provider hides the physical complexity — the data center floor, the physical switches, the storage hardware, the hypervisor layer. But those things still exist. You are requesting infrastructure that turns physical systems into software-defined building blocks.\n\n**The Three Service Models**\n- IaaS — Infrastructure as a Service: you manage virtual machines, networks, and storage; the provider manages the physical hardware beneath\n- PaaS — Platform as a Service: you manage your application and data; the provider manages the runtime, operating system, and everything below\n- SaaS — Software as a Service: you use software that the provider fully hosts, manages, and operates\n\n**The Three Deployment Models**\n- Public cloud: infrastructure owned and operated by a provider, shared across many customers on dedicated partitions\n- Private cloud: infrastructure operated exclusively for one organization, either on-premises or hosted\n- Hybrid cloud: a combination of public and private, connected so workloads and data can move between environments as needed",
          exercise: {
            title: "Cloud vs Physical Infrastructure",
            description: "Write a comparison between running infrastructure on physical hardware versus running it through a cloud provider. Then answer: what complexity does the provider absorb, and what responsibility still stays with you?"
          },
          artifact: {
            title: "Cloud Abstraction Note",
            description: "A short note explaining what the cloud abstracts away and what you still need to design and control."
          },
          validationChecklist: [
            "You can explain that cloud services still run on real physical infrastructure",
            "You can describe IaaS, PaaS, and SaaS with a concrete example of each",
            "You can explain the difference between public, private, and hybrid cloud",
            "You understand that abstraction does not remove the need for architectural thinking"
          ],
          knowledgeCheck: {
            question: "Which statement best describes the cloud?",
            options: [
              "A system that removes the need for infrastructure design",
              "A way to access computing resources through software-defined services",
              "A replacement for applications",
              "A tool that only stores files"
            ],
            correctAnswer: 1
          },
          engineeringReflection: "If a server running in the cloud fails, what actually failed? Cloud abstraction changes what you see. It does not eliminate system behavior."
        },
        {
          id: "p1-lesson-2",
          title: "The Core Building Blocks of Infrastructure",
          whyThisMatters: "AWS alone has hundreds of services. Azure and GCP do too. That can overwhelm you quickly. But underneath that complexity, most systems are built from a small set of repeating ideas. If you understand those ideas first, you can make sense of any cloud platform much faster.",
          coreConcepts: "Every infrastructure environment is built from five core categories:\n\n- Compute: Something runs code — virtual machines, containers, serverless functions\n- Storage: Something stores data — object storage, block disks, databases\n- Networking: Something connects components and controls traffic — virtual networks, subnets, routing, load balancers, firewalls\n- Identity and Access: Something determines who or what is allowed to do what — users, service accounts, roles, policies\n- Observability: Something helps you understand system behavior — metrics, logs, traces, dashboards, alerts\n\nThese categories show up on every cloud platform. The service names differ. The roles do not.",
          comparisonTables: [
            {
              headers: ["Concept / Skill", "AWS", "Azure / GCP"],
              rows: [
                ["Virtual Machine", "EC2", "Azure VM / Compute Engine"],
                ["Object Storage", "S3", "Azure Blob Storage / GCS"],
                ["Private Network", "VPC", "Azure Virtual Network / GCP VPC"],
                ["Managed Relational DB", "RDS", "Azure SQL Database / Cloud SQL"],
                ["Managed NoSQL DB", "DynamoDB", "Azure Cosmos DB / Firestore"],
                ["Identity & Access", "IAM", "Microsoft Entra ID / GCP IAM"],
                ["Metrics & Logs", "CloudWatch", "Azure Monitor / Cloud Logging"],
                ["Serverless Functions", "Lambda", "Azure Functions / Cloud Functions"],
                ["Container Orchestration", "EKS", "AKS / GKE"],
                ["DNS", "Route 53", "Azure DNS / Cloud DNS"]
              ]
            }
          ],
          exercise: {
            title: "Map Concepts to Services",
            description: "Pick any cloud provider you have used. For each of the five core categories (compute, storage, networking, identity, observability), name one service you have used or heard of. If you have not used any, look up one service per category."
          },
          artifact: {
            title: "Core Categories Map",
            description: "A table mapping the five core infrastructure categories to at least one service per cloud provider."
          },
          validationChecklist: [
            "Can name the five core infrastructure categories",
            "Understand that service names differ but roles are the same across providers",
            "Can give at least one example per category"
          ],
          knowledgeCheck: {
            question: "Why is learning infrastructure by concept more useful than learning only service names?",
            options: [
              "Because service names never matter",
              "Because concepts transfer across providers, jobs, and architectures",
              "Because identity systems are optional",
              "Because cloud providers are identical"
            ],
            correctAnswer: 1
          },
          engineeringReflection: "If you moved from one cloud provider to another tomorrow, which knowledge would still matter: service names or infrastructure concepts?"
        }
      ]
    },
    {
      id: "mod1-csni",
      title: "Module 1 — Compute, Storage, Networking, and Identity",
      description: "Go deep on the four building blocks that form every cloud system. Understand how each one works, what tradeoffs exist, and how they connect.",
      difficulty: "beginner",
      estimatedTime: "30 min",
      lessons: [
        {
          id: "p1-lesson-3",
          title: "Compute: Where Applications Run",
          whyThisMatters: "Applications do not run in the cloud in the abstract. They run somewhere. That somewhere may be a virtual machine, a container platform, or a serverless runtime — but in every case, code executes on underlying compute resources. Without understanding compute, you cannot reason clearly about application placement, scaling, failures, or runtime dependencies.",
          coreConcepts: "**Virtual Machines**\nYou get a full operating system environment. The provider manages the physical host underneath. You control the OS, installed software, running services, and open ports. VMs give you the most control over configuration and the most visibility into the runtime environment.\n\n**Containers**\nYou package the application and its dependencies together into a portable image. Containers share the host OS kernel but are isolated from each other. They start faster than VMs and are easier to move between environments. Container orchestration platforms like Kubernetes manage scheduling, scaling, and recovery automatically.\n\n**Serverless Functions**\nYou deploy individual code units that run on demand. The provider manages all underlying runtime, scaling, and infrastructure. You pay only for execution time. Serverless is ideal for event-driven, short-lived tasks. The tradeoff is less control over the execution environment and cold-start latency.\n\n**Managed Container Services**\nServices like App Service (Azure), Cloud Run (GCP), and App Runner (AWS) let you run containers without managing orchestration infrastructure. They sit between raw VMs and pure serverless: you think in containers, but the provider handles the cluster layer for you.\n\nCommon misconception: Provisioned compute is not the same as a working system. The machine may exist but the software may not be installed, the service may not be running, the right port may not be open. Each of these is a separate problem.",
          exercise: {
            title: "Compute Model Comparison",
            description: "Compare VMs, containers, and serverless functions. For each, describe one scenario where it would be the best choice and one scenario where it would be a poor choice."
          },
          artifact: {
            title: "Compute Decision Guide",
            description: "A short guide explaining when to use VMs, containers, and serverless functions."
          },
          validationChecklist: [
            "Can explain the difference between VMs, containers, and serverless",
            "Understand that provisioned compute is not the same as a working system",
            "Know what managed container services provide"
          ],
          engineeringReflection: "What dependencies does your compute layer have that might fail before the machine itself does?"
        },
        {
          id: "p1-lesson-4",
          title: "Storage: Where Data Lives",
          whyThisMatters: "Every application needs to store data somewhere. Choosing the wrong storage type leads to performance problems, data loss risk, or unnecessary cost. Understanding the four storage categories helps you make the right choice for each use case.",
          coreConcepts: "**Object Storage**\nUsed for files, assets, logs, backups, and unstructured data. Accessed via HTTP APIs using unique keys. Massively scalable, highly durable, and cheap at scale. The default choice for any data you read or download but do not write to in-place frequently.\n\n**Block Storage**\nAttached to virtual machines as disks. The OS sees it exactly like a local hard drive. Applications that need to read and write files in-place — databases, file servers, OS root volumes — use block storage. Faster for random reads and writes than object storage, but more expensive and tied to a single VM at a time.\n\n**Managed Databases**\nRelational databases, NoSQL databases, and time-series databases offered as fully managed services. The provider handles backups, patching, replication, and failover. You focus on schema design and query patterns. Choosing between relational and NoSQL depends on your data model and access patterns, not provider preference.\n\n**File Storage**\nShared network file systems that multiple VMs can mount simultaneously. Useful for applications that need shared access to the same files from multiple compute resources.\n\nThe critical question is not only where the data will be stored — it is how it will be used. Application logs: object storage. OS files: block storage. User records: relational database. Session data: key-value store.",
          exercise: {
            title: "Storage Plan",
            description: "Design a storage plan for a simple web application. Identify what type of storage you would use for: user uploads, application logs, database records, and temporary session data."
          },
          artifact: {
            title: "Application Storage Plan",
            description: "A short storage plan for a simple application covering file storage, runtime disk storage, and structured application data — with a justification for each choice."
          },
          validationChecklist: [
            "Can explain the four storage types and their use cases",
            "Understand when to use object vs block vs managed database",
            "Can design a basic storage plan for a simple application"
          ],
          engineeringReflection: "If your application servers are replaced tomorrow, what data should survive? The answer helps you distinguish temporary runtime state from durable application data from operational records."
        },
        {
          id: "p1-lesson-5",
          title: "Networking: How Systems Communicate",
          whyThisMatters: "Networking determines how components find each other, how traffic flows, and what is exposed to the outside world. Misconfigured networking is one of the most common sources of both outages and security vulnerabilities in cloud infrastructure.",
          coreConcepts: "**Virtual Private Cloud / Virtual Network**\nA logical private network boundary for your infrastructure. Resources inside a VPC communicate using private IP addresses and are isolated from the internet by default. You define the IP address range (CIDR block) when you create a VPC.\n\n**Subnets**\nSmaller network segments inside the VPC. Public subnets have a route to an internet gateway and can send and receive internet traffic. Private subnets have no direct internet route. Load balancers go in public subnets; application servers and databases go in private subnets.\n\n**Internet Gateway and NAT Gateway**\nAn internet gateway lets resources in public subnets communicate with the internet in both directions. A NAT gateway lets resources in private subnets initiate outbound internet requests — for updates, API calls, external services — without being directly reachable from the internet.\n\n**Security Groups and Network ACLs**\nSecurity groups act as stateful firewalls at the resource level: if you allow inbound traffic on port 80, the response is automatically allowed. Network ACLs apply to entire subnets and are stateless — you must define rules for both directions explicitly.\n\n**Load Balancers**\nA load balancer distributes incoming traffic across multiple compute resources. It detects unhealthy instances and routes traffic around them. It supports horizontal scaling by adding more instances behind the balancer as traffic grows.\n\n**DNS**\nDomain Name System translates human-readable domain names into IP addresses. Cloud providers offer managed DNS with health checking, routing policies, and integration with other cloud services.",
          comparisonTables: [
            {
              headers: ["Concept / Skill", "AWS", "Azure / GCP"],
              rows: [
                ["Internet Gateway", "Internet Gateway", "Azure Internet Gateway / Cloud Router"],
                ["NAT Gateway", "NAT Gateway", "Azure NAT Gateway / Cloud NAT"],
                ["Application Load Balancer", "ALB", "Azure Application Gateway / GCP HTTPS LB"],
                ["Network Load Balancer", "NLB", "Azure Load Balancer / GCP Network LB"],
                ["Resource-level firewall", "Security Group", "NSG / VPC Firewall Rules"],
                ["Subnet-level ACL", "Network ACL", "Subnet NSG / VPC Firewall (subnet)"],
                ["Private network peering", "VPC Peering", "VNet Peering / VPC Peering"],
                ["Managed DNS", "Route 53", "Azure DNS / Cloud DNS"]
              ]
            }
          ],
          exercise: {
            title: "Network Design",
            description: "Sketch a basic VPC design with one public subnet and one private subnet. Place a load balancer in the public subnet and an application server in the private subnet. Describe how traffic flows from the internet to the application."
          },
          artifact: {
            title: "VPC Design",
            description: "A basic VPC design showing public and private subnets, load balancer placement, and traffic flow."
          },
          validationChecklist: [
            "Can explain VPCs, subnets, and the difference between public and private",
            "Understand security groups vs network ACLs",
            "Know what load balancers and DNS do"
          ],
          knowledgeCheck: {
            question: "Why are application servers often placed in private subnets?",
            options: [
              "To reduce memory usage",
              "To prevent direct exposure to the public internet",
              "To make backups faster",
              "To replace the load balancer"
            ],
            correctAnswer: 1
          },
          engineeringReflection: "Why should a database usually not be publicly reachable? Answering this clearly means you are beginning to think in architecture and security boundaries rather than only cloud features."
        },
        {
          id: "p1-lesson-6",
          title: "Identity and Access: Who Can Do What",
          whyThisMatters: "Identity and access management determines who and what can interact with your infrastructure. Misconfigured IAM is one of the most common causes of cloud security incidents. Understanding identity is not optional — it is foundational.",
          coreConcepts: "**Identity**\nA user, service account, role, or federated identity that can request access to cloud resources. Identities are the subjects of access decisions.\n\n**Policies and Permissions**\nStatements that describe what actions an identity is allowed to perform on which resources, under what conditions. Permissions are explicit — nothing is allowed unless it is stated.\n\n**Roles**\nA collection of permissions that can be assigned to identities. Instead of hardcoding credentials into an application, you assign the application a role with exactly the permissions it needs and nothing more.\n\n**Least Privilege**\nGrant only the access that is actually required. This principle reduces the blast radius of any mistake, misconfiguration, or compromised credential.\n\n**Shared Responsibility Model**\nCloud providers are responsible for the security of the cloud — physical hardware, hypervisor, global network. You are responsible for security in the cloud — how you configure access controls, protect your data, and design your systems. This boundary is fixed.\n\nThe provider secures the physical infrastructure. You secure everything you configure on top of it — access controls, encryption settings, network boundaries, and data handling.",
          exercise: {
            title: "Least Privilege Design",
            description: "Design a set of IAM permissions for a web application that needs to read from an S3 bucket and write to a database. List exactly the permissions it needs and nothing more."
          },
          artifact: {
            title: "IAM Permission Set",
            description: "A least-privilege permission design for a simple application with specific allowed and denied actions."
          },
          validationChecklist: [
            "Can explain identities, policies, and roles",
            "Understand the principle of least privilege",
            "Know the shared responsibility model"
          ],
          engineeringReflection: "If your application can reach a storage service over the network but still cannot read from it, what kind of problem is that — networking or identity?"
        }
      ]
    },
    {
      id: "mod2-real-system",
      title: "Module 2 — How Infrastructure Components Form a Real System",
      description: "See how compute, storage, networking, and identity work together when a real request flows through a system.",
      difficulty: "beginner",
      estimatedTime: "15 min",
      lessons: [
        {
          id: "p1-lesson-7",
          title: "What Happens When You Open a Website",
          whyThisMatters: "Understanding a real request flow shows you how every infrastructure category connects. This is the mental model that separates people who memorize services from people who understand systems.",
          coreConcepts: "A user entering a website URL triggers a sequence that touches every infrastructure category:\n\n- 1. The user's browser sends a DNS query to resolve the domain name to an IP address\n- 2. The request is routed across the internet to a public endpoint — often a load balancer\n- 3. The load balancer selects a healthy application server and forwards the request\n- 4. The application server processes the request — compute doing its job\n- 5. The application reads from or writes to a database or object storage as needed\n- 6. The response travels back through the load balancer to the user\n- 7. Metrics and logs capture the behavior so you can understand and debug it later\n\nEach step maps to a core category:\n- DNS and load balancer: networking\n- Application server: compute\n- Database and file storage: storage\n- Application reading from the database: identity (the app needs permission)\n- Logs and metrics: observability\n\nKey insight: Infrastructure is not a pile of unrelated resources. It is a system of cooperating components. Understanding the flow is more important than memorizing individual services.",
          exercise: {
            title: "Request Flow Mapping",
            description: "Trace a request from a user typing a URL to the response appearing in their browser. Label each step with its infrastructure category: networking, compute, storage, identity, or observability."
          },
          artifact: {
            title: "Request Flow Explanation",
            description: "A short request-flow explanation connecting user action to infrastructure behavior — each step labeled with networking, compute, storage, identity, or observability."
          },
          validationChecklist: [
            "Can trace a request through all infrastructure layers",
            "Can label each step with the correct infrastructure category",
            "Understand that infrastructure is a system, not isolated resources"
          ]
        },
        {
          id: "p1-lesson-8",
          title: "Public and Private Infrastructure Roles",
          whyThisMatters: "Modern systems are designed around controlled exposure. Most components should not be reachable from the internet. Understanding what should be public and what should be private is a fundamental architectural decision.",
          coreConcepts: "**Public infrastructure**\nAccepts or supports external access. Examples: internet-facing load balancers, public API gateways, CDN edges. These are hardened specifically because they face the public internet.\n\n**Private infrastructure**\nSupports internal system behavior without direct public exposure. Examples: application servers, internal microservices, databases. These communicate only with other internal resources or through tightly controlled paths.\n\nDesign principle: The right things exposed in the right way — not everything private, not everything public. Exposure is a deliberate architectural decision.",
          exercise: {
            title: "Public vs Private Classification",
            description: "For a typical web application, classify each component as public or private: load balancer, application server, database, CDN, API gateway, monitoring dashboard. Explain your reasoning for each."
          },
          artifact: {
            title: "Exposure Classification",
            description: "A classification of common infrastructure components as public or private with justification."
          },
          validationChecklist: [
            "Can distinguish between public and private infrastructure",
            "Understand that exposure is a deliberate design decision",
            "Can classify common components correctly"
          ]
        }
      ]
    },
    {
      id: "mod3-iac",
      title: "Module 3 — Infrastructure as Code",
      description: "Understand why infrastructure should be defined in code rather than built manually, and how provider concepts map across clouds.",
      difficulty: "beginner",
      estimatedTime: "15 min",
      lessons: [
        {
          id: "p1-lesson-9",
          title: "Why Infrastructure Should Live in Code",
          whyThisMatters: "Cloud resources can be created manually through a console. But manual infrastructure has a fundamental problem: the only record of what was built lives in someone's browser history and memory. No one else can review it. No one can reproduce it. No one can audit what changed and when.",
          coreConcepts: "Infrastructure as code means describing infrastructure in files and applying those files to create or update real resources. A tool reads your declared desired state and makes the real environment match it. IaC gives you:\n\n- Repeatability: the same definition produces the same infrastructure every time, in every environment\n- Reviewability: another engineer can read a pull request and understand exactly what will change before it changes\n- Version control: every infrastructure change is tracked with an author, a timestamp, and a reason\n- Drift detection: you can compare the desired state in code to the actual state in the cloud\n- Safer evolution: plan a change, review the plan, apply it — rather than editing a live system by hand",
          comparisonTables: [
            {
              headers: ["Capability", "AWS-native", "Cross-provider equivalent"],
              rows: [
                ["Declarative IaC (multi-cloud)", "Terraform / OpenTofu", "Same tools work across AWS, Azure, GCP"],
                ["Provider-native IaC", "CloudFormation", "Azure Bicep / ARM / Deployment Manager"],
                ["Configuration management", "Ansible / Chef", "Works across all providers"],
                ["Container configuration", "Kubernetes YAML", "Works across EKS, AKS, GKE"],
                ["Policy as code", "OPA / Sentinel", "Enforces rules across all providers"]
              ]
            }
          ],
          exercise: {
            title: "IaC Benefits Analysis",
            description: "List three infrastructure changes you have made (or would need to make) manually. For each, describe how IaC would improve the process."
          },
          artifact: {
            title: "IaC Justification",
            description: "A comparison of manual vs code-defined infrastructure for three real scenarios."
          },
          validationChecklist: [
            "Understand why manual infrastructure is problematic",
            "Can list the five key benefits of IaC",
            "Know the difference between declarative and provider-native IaC tools"
          ],
          engineeringReflection: "If your infrastructure exists only in a console and not in code, what becomes harder: understanding it, reviewing it, reproducing it, debugging it, or all of the above?"
        },
        {
          id: "p1-lesson-10",
          title: "Same Concepts, Different Names",
          whyThisMatters: "Cloud providers solve the same infrastructure problems but name their services differently. Understand the architectural role first, then the provider-specific name. This keeps your knowledge transferable.",
          coreConcepts: "Every major cloud provider offers equivalent services for the same infrastructure needs. The names differ but the underlying concepts are identical. Understanding the concept lets you work confidently across any provider.",
          comparisonTables: [
            {
              headers: ["Concept / Skill", "AWS", "Azure / GCP"],
              rows: [
                ["Object Storage", "S3", "Azure Blob Storage / GCS"],
                ["Block Storage (VM disk)", "EBS", "Azure Managed Disk / Persistent Disk"],
                ["Private Network", "VPC", "Azure Virtual Network / GCP VPC"],
                ["Application Load Balancer", "ALB", "Azure App Gateway / GCP HTTP LB"],
                ["Serverless Functions", "Lambda", "Azure Functions / Cloud Functions"],
                ["Container Orchestration", "EKS", "AKS / GKE"],
                ["Managed PostgreSQL", "RDS PostgreSQL", "Azure DB for PostgreSQL / Cloud SQL"],
                ["Managed NoSQL", "DynamoDB", "Cosmos DB / Firestore"],
                ["IAM Roles / Service Accounts", "IAM Roles", "Managed Identity / Service Accounts"],
                ["CDN", "CloudFront", "Azure CDN / Cloud CDN"],
                ["Secrets Management", "Secrets Manager", "Azure Key Vault / Secret Manager"],
                ["Monitoring & Alerting", "CloudWatch", "Azure Monitor / Cloud Monitoring"],
                ["Distributed Tracing", "X-Ray", "Azure App Insights / Cloud Trace"]
              ]
            }
          ],
          exercise: {
            title: "Cross-Provider Mapping",
            description: "Pick three infrastructure concepts from the table. For each, write one sentence explaining the architectural role — without using any provider-specific service name."
          },
          artifact: {
            title: "Provider-Agnostic Definitions",
            description: "Three infrastructure concepts described by their architectural role, independent of any provider."
          },
          validationChecklist: [
            "Can map common services across AWS, Azure, and GCP",
            "Understand that learning concepts is more transferable than learning names",
            "Can describe infrastructure roles without provider-specific terminology"
          ]
        }
      ]
    },
    {
      id: "mod4-first-build",
      title: "Module 4 — Building Your First Real Infrastructure System",
      description: "Understand the system you will build and learn to design before you provision.",
      difficulty: "beginner",
      estimatedTime: "15 min",
      lessons: [
        {
          id: "p1-lesson-11",
          title: "The System You Are Going to Build",
          whyThisMatters: "Before building anything, you need a clear picture of what you are building. This lesson defines the target system — a simple but real web application environment with the same structural shape as production systems.",
          coreConcepts: "You will build a simple but real web application environment with the same structural shape as production systems, just with less complexity in each layer:\n\n- A public entry point that accepts traffic from the internet\n- Private application compute behind that entry point\n- Storage for data and logs\n- Basic identity permissions scoped to what the application actually needs\n- Clear network boundaries separating public and private components\n\nThis is not a toy project. It follows the same architectural patterns that real production systems use. The difference is scale and complexity, not structure.",
          exercise: {
            title: "System Description",
            description: "Write a one-paragraph description of the system you are about to build. Include what each layer does and why it exists."
          },
          artifact: {
            title: "Target System Overview",
            description: "A written description of the target infrastructure system and its components."
          },
          validationChecklist: [
            "Can describe the five components of the target system",
            "Understand that this follows real production patterns",
            "Ready to design before building"
          ]
        },
        {
          id: "p1-lesson-12",
          title: "Designing Before You Build",
          whyThisMatters: "The most common beginner mistake is jumping straight to provisioning resources without thinking through the design first. Answering a few key questions before you build prevents wasted work and architectural problems.",
          coreConcepts: "Before you provision anything, describe the system clearly enough that the architecture makes sense. Answer these questions first:\n\n- What does the application do?\n- Which components need to accept public traffic?\n- Which components should remain internal?\n- What data needs to be stored and in what form?\n- What access does the application need to other services?\n\nBetter request example: Design infrastructure for a simple web application with a public load balancer, private application compute, object storage for uploads, and a least-privilege application role that can only read from that storage bucket.\n\nNotice how this request describes intent and constraints rather than listing service names. This is how experienced engineers communicate infrastructure requirements.",
          exercise: {
            title: "Design First",
            description: "Write a design description for your target system by answering each of the five questions above. Do not provision anything yet."
          },
          artifact: {
            title: "System Design Document",
            description: "A structured design document answering the five key questions for your target system."
          },
          validationChecklist: [
            "Can articulate what the system does before building it",
            "Know which components should be public vs private",
            "Have a clear design before provisioning"
          ]
        }
      ]
    },
    {
      id: "mod5-labs",
      title: "Module 5 — Hands-On Foundations Labs",
      description: "Build your first real infrastructure system step by step. Each lab adds one layer of complexity to the system.",
      difficulty: "beginner",
      estimatedTime: "45 min",
      lessons: [
        {
          id: "p1-lab-1",
          title: "Lab 1 — Deploy Your First Public Application Environment",
          whyThisMatters: "This is where you stop reading and start building. You will provision a real compute resource, deploy an application on it, and verify that it is reachable from the internet.",
          coreConcepts: "Follow these steps:\n\n- 1. Define the application environment in plain language before touching any tool\n- 2. Provision one compute resource in a public subnet\n- 3. Install or deploy a simple application on that compute resource\n- 4. Verify the application is reachable via a public IP or DNS name\n- 5. Record how traffic reaches the application end to end\n- 6. Inspect what feels fragile or incomplete — you will fix it in Lab 2",
          exercise: {
            title: "Deploy and Verify",
            description: "Deploy a simple application on a single compute resource and verify it is reachable from the internet. Document the full request path from browser to application."
          },
          artifact: {
            title: "First Application Environment",
            description: "A simple working environment including one compute resource, one public access path, and a description of the request flow from internet to application."
          },
          validationChecklist: [
            "Application is deployed on a compute resource",
            "Application is reachable via public IP or DNS",
            "Can describe the request flow end to end",
            "Can identify what feels fragile in this setup"
          ],
          failureAndDebugging: "Common issues: application not running, wrong port exposed, public path misconfigured, machine exists but serves nothing. Created infrastructure is not the same as a functioning application path. Each layer must be correct independently."
        },
        {
          id: "p1-lab-2",
          title: "Lab 2 — Separate Public Entry from Private Compute",
          whyThisMatters: "Real architectures never expose application servers directly to the internet. This lab introduces the separation between a public entry point and private application compute — the pattern used by every production system.",
          coreConcepts: "Introduce the separation that real architectures use:\n\n- A public load balancer or proxy in a public subnet\n- Private application compute in a private subnet\n- Traffic flows inward through the controlled entry point — not directly to the server\n\nThis pattern is the foundation of secure cloud architecture. The load balancer is the only component with a public IP. The application server has no direct internet exposure.",
          exercise: {
            title: "Add Public/Private Separation",
            description: "Modify your Lab 1 environment to add a load balancer in a public subnet and move the application server to a private subnet. Verify traffic still flows correctly."
          },
          artifact: {
            title: "Public/Private Architecture",
            description: "An updated architecture with one public entry component, one private application layer, and a verified traffic flow between them."
          },
          validationChecklist: [
            "Load balancer is in a public subnet",
            "Application compute is in a private subnet",
            "Traffic flows through the load balancer to the application",
            "Application server is not directly reachable from the internet"
          ]
        },
        {
          id: "p1-lab-3",
          title: "Lab 3 — Add Storage to the System",
          whyThisMatters: "Applications need persistent data. This lab adds a storage component to your system and forces you to think about how the application accesses it and what would happen if it were misconfigured.",
          coreConcepts: "Define one storage need for the application. Choose the right storage type. Add it to the architecture.\n\nAnswer these questions:\n- How does the application access this storage?\n- What data does it contain?\n- What would happen if that storage was misconfigured or accidentally public?",
          exercise: {
            title: "Add Storage",
            description: "Add one storage component to your system. Choose the appropriate storage type, justify your choice, and verify the application can access it correctly."
          },
          artifact: {
            title: "Storage Integration",
            description: "An updated system design including one storage component, its type justification, and an explanation of how the application interacts with it."
          },
          validationChecklist: [
            "Storage component is added to the architecture",
            "Storage type choice is justified",
            "Application can access the storage correctly",
            "Understand what would happen if storage were accidentally public"
          ]
        },
        {
          id: "p1-lab-4",
          title: "Lab 4 — Secure Access with Least Privilege",
          whyThisMatters: "Overly permissive access is the most common security mistake in cloud environments. This lab forces you to scope access to exactly what the application needs — and nothing more.",
          coreConcepts: "Give the application only the access it actually needs. Create a role with exactly those permissions.\n\nName one permission that would be dangerous to grant and explain why.\n\nThe goal is to make the permission boundary intentional and explainable. If you cannot articulate why a permission exists, it probably should not.",
          exercise: {
            title: "Apply Least Privilege",
            description: "Create an IAM role for your application with only the permissions it needs. Identify one permission that would be dangerous to grant and explain why."
          },
          artifact: {
            title: "Access Design",
            description: "A short access design: one identity, one allowed action, one intentionally excluded action, and a one-sentence explanation of why the boundary matters."
          },
          validationChecklist: [
            "Application has a dedicated identity/role",
            "Permissions are scoped to only what is needed",
            "Can name one dangerous permission and explain why",
            "Permission boundary is intentional and explainable"
          ]
        }
      ]
    },
    {
      id: "mod6-validation",
      title: "Module 6 — Validation, Debugging, and Moving to Tier 2",
      description: "Validate your complete system end to end and learn to debug the four most common categories of beginner infrastructure problems.",
      difficulty: "beginner",
      estimatedTime: "20 min",
      lessons: [
        {
          id: "p1-lesson-13",
          title: "Validating the Beginner System",
          whyThisMatters: "Building infrastructure is only half the work. Validating that it behaves correctly is the other half. This lesson teaches you to walk through every layer of your system and verify each one independently.",
          coreConcepts: "Walk through the system in order and verify each layer:\n\n- 1. What is public? Is it intentionally public?\n- 2. What is private? Is it truly unreachable from the internet?\n- 3. Where does the application run? Is it actually running?\n- 4. Where is data stored? Is the storage correctly configured and accessible?\n- 5. What can the application access? Is access scoped correctly?\n- 6. What happens if one component fails? Does the system degrade gracefully?",
          exercise: {
            title: "System Validation",
            description: "Walk through your system and verify each of the six validation points above. Document what you find."
          },
          artifact: {
            title: "Validation Report",
            description: "A validation report covering all six verification points for your infrastructure system."
          },
          validationChecklist: [
            "Verified what is public and confirmed it should be",
            "Verified what is private and confirmed it is unreachable",
            "Confirmed the application is running correctly",
            "Confirmed storage is configured and accessible",
            "Confirmed access is scoped correctly",
            "Considered failure scenarios"
          ],
          engineeringReflection: "Could you explain your system to a teammate in five minutes without relying on provider service names? If yes, your understanding is becoming architectural rather than vocabulary-based."
        },
        {
          id: "p1-lesson-14",
          title: "Debugging Beginner Infrastructure Problems",
          whyThisMatters: "Most beginner infrastructure problems fall into four predictable categories. Learning to identify the category quickly is the fastest path to a solution.",
          coreConcepts: "**Compute problems**\nThe application or service is not running. Check: is the process started? Is the service enabled? Is the right software installed?\n\n**Networking problems**\nTraffic does not reach the intended component. Check: is the route correct? Is the firewall rule open? Is the component listening on the right port?\n\n**Identity problems**\nThe system reaches a service but is not authorized to act. Check: what identity is being used? What action is being attempted? Is that action included in the policy?\n\n**Configuration problems**\nThe environment exists but is not configured as expected. Check: are environment variables set? Are config files in the right location? Are connections pointing at the right endpoints?\n\nAnti-pattern: Making multiple changes at once. You no longer know which change helped or harmed the system. Make one change, observe the result, then proceed.",
          exercise: {
            title: "Debug Classification",
            description: "Describe three hypothetical infrastructure problems. Classify each as compute, networking, identity, or configuration. Then describe the first diagnostic step you would take."
          },
          artifact: {
            title: "Debugging Guide",
            description: "A guide covering the four debugging categories with diagnostic steps for each."
          },
          validationChecklist: [
            "Can classify problems into compute, networking, identity, or configuration",
            "Know the first diagnostic step for each category",
            "Understand why making one change at a time matters"
          ]
        }
      ]
    },
    {
      id: "mod-capstone-1",
      title: "Tier 1 Capstone",
      description: "Design a complete beginner cloud application that demonstrates your understanding of all Tier 1 concepts.",
      difficulty: "beginner",
      estimatedTime: "30 min",
      lessons: [
        {
          id: "p1-capstone",
          title: "Design a Complete Beginner Cloud Application",
          whyThisMatters: "The capstone is where you prove your understanding has become capability. You will design a complete system from scratch, without step-by-step guidance, using everything you have learned in Tier 1.",
          coreConcepts: "Design and describe a simple application environment that includes all of the following. This is your capstone — do it from memory without referring back to the lessons.\n\n**What Makes a Strong Capstone**\nA strong beginner system is the one whose behavior you can explain clearly: what is public, what is private, where data lives, how the application accesses it, and what happens when one component fails. If you can answer all of those questions from memory, you are ready for Tier 2.\n\nNext document: Tier 2 — Intermediate. Begin with Module 7: Infrastructure as Code in Depth.",
          exercise: {
            title: "Capstone Build",
            description: "Design a complete application environment from scratch. Include all required components and write a full request flow with validation."
          },
          artifact: {
            title: "Tier 1 Capstone System",
            description: "A complete beginner cloud application design with all required components, request flow, and validation checklist."
          },
          validationChecklist: [
            "System includes a public entry path for user traffic",
            "System includes private application compute behind that entry path",
            "System includes at least one storage component with a clear role",
            "System includes a least-privilege application identity",
            "Written request flow covers seven steps, each labeled",
            "Short validation checklist confirms each component behaves as intended"
          ]
        }
      ]
    }
  ]
};

export const prereqIntermediate: LearningPath = {
  id: "prereq-intermediate",
  title: "Cloud & Infrastructure Training — Intermediate",
  shortTitle: "Prereq: Intermediate",
  description: "Go deep on Terraform, multi-AZ networking, security architecture, scalability, CI/CD pipelines, and production observability. Build infrastructure that other engineers can review, rely on, and operate.",
  icon: "CloudCog",
  order: 0,
  color: "prerequisite",
  accentColor: "#2563A6",
  courses: [
    {
      id: "mod7-iac-depth",
      title: "Module 7 — Infrastructure as Code in Depth",
      description: "Move from understanding IaC to writing real Terraform. Learn providers, resources, state management, environments, drift detection, and policy as code.",
      difficulty: "intermediate",
      estimatedTime: "30 min",
      lessons: [
        {
          id: "p2-lesson-15",
          title: "Writing Real IaC with Terraform",
          whyThisMatters: "In Tier 1 you understood what IaC is and why it matters. Now you write it. Terraform is the most widely used cross-cloud IaC tool. It works with AWS, Azure, GCP, and hundreds of other providers through a consistent workflow. Your Terraform skills transfer across cloud boundaries.",
          coreConcepts: "**Providers**\nA provider is a plugin that Terraform uses to interact with a specific cloud or service API. You declare which providers your configuration needs. Terraform downloads them automatically.\n\n**Resources**\nA resource block declares a single piece of infrastructure — a VM, a database, a security group, a storage bucket. You declare what the resource should look like. Terraform figures out how to create, update, or destroy it.\n\n**Variables and Outputs**\nVariables let you parameterize your configuration so the same code creates resources in different environments with different values. Outputs expose information about created resources so other configurations or humans can use them.\n\n**State**\nTerraform maintains a state file that maps your configuration to real infrastructure. Storing state remotely — in an S3 bucket with DynamoDB locking, Azure Blob, or GCS — is required for team collaboration. Never store state locally in a shared project.\n\n**Plan, Apply, Destroy**\nterraform plan shows exactly what will change before anything changes. terraform apply executes the plan. terraform destroy removes all managed resources. Always review the plan before applying, especially in production.\n\n**Modules**\nA module is a reusable package of Terraform configuration. Instead of repeating the same networking setup in every project, you extract it into a module and call it with different parameters. Modules are how Terraform scales from simple scripts to organization-wide infrastructure patterns.",
          exercise: {
            title: "Write a Terraform Configuration",
            description: "Write a Terraform configuration with one provider block, three resource blocks, two input variables, and two outputs. Run terraform plan and verify it produces no errors."
          },
          artifact: {
            title: "Terraform Configuration",
            description: "A Terraform configuration with at minimum: one provider block, three resource blocks, two input variables, and two outputs. The plan must run cleanly with no errors."
          },
          validationChecklist: [
            "terraform init runs without errors",
            "terraform plan shows only the expected resources",
            "terraform apply creates all resources",
            "terraform destroy removes all resources cleanly",
            "State is stored remotely, not in a local file"
          ],
          engineeringReflection: "If a new engineer joins the team and needs to understand the network topology, which is faster: reading a Terraform configuration or exploring the cloud console? Why?"
        },
        {
          id: "p2-lesson-16",
          title: "Environment Separation and State Management",
          whyThisMatters: "Production infrastructure requires strict environment separation. Shared environments mean shared blast radius. This lesson covers how to isolate environments and manage Terraform state safely.",
          coreConcepts: "**Environments**\nMost organizations run multiple environments: development, staging, and production. Each should be isolated: separate accounts or subscriptions, separate VPCs, separate state files, separate access controls. Shared environments cause shared blast radius.\n\n**Workspaces vs Separate State Files**\nTerraform workspaces let you manage multiple instances of the same configuration. For production environments, separate state files and separate cloud accounts give the strongest isolation guarantees.\n\n**State Locking**\nWhen two engineers run terraform apply simultaneously, they can corrupt the state file. State locking prevents this. DynamoDB provides locking for AWS S3 backends. Azure uses blob leases. GCS uses object versioning and metadata.\n\n**Secrets in IaC**\nNever hardcode secrets, passwords, or API keys in Terraform configurations. Use environment variables, provider-level credential chains, or secrets managers. Secrets that appear in code end up in version control and in state files — both are dangerous.",
          exercise: {
            title: "Environment Isolation Design",
            description: "Design a Terraform state management strategy for three environments (dev, staging, prod). Specify where state is stored, how locking works, and how secrets are handled."
          },
          artifact: {
            title: "State Management Strategy",
            description: "A state management design covering remote state, locking, environment isolation, and secrets handling."
          },
          validationChecklist: [
            "Environments are isolated with separate state files",
            "State is stored remotely with locking enabled",
            "Secrets are never hardcoded in configuration",
            "Understand workspace vs separate state file tradeoffs"
          ]
        },
        {
          id: "p2-lesson-17",
          title: "Drift, Validation, and Policy as Code",
          whyThisMatters: "Infrastructure drift is inevitable in any environment where humans can make manual changes. Understanding how to detect, prevent, and correct drift is essential for maintaining infrastructure integrity.",
          coreConcepts: "**Configuration Drift**\nDrift happens when real infrastructure diverges from the desired state in code — a manual console change, an automated process modifying a resource, a hotfix applied without updating the code. terraform plan detects drift by comparing state to real infrastructure.\n\n**Immutable Infrastructure**\nInstead of modifying existing resources, you replace them. When you need a new application version, you create new instances and destroy the old ones. This eliminates configuration drift entirely.\n\n**Policy as Code**\nTools like OPA, HashiCorp Sentinel, and cloud organization policies check Terraform plans and cloud API calls against rules you define: no unencrypted storage, no public database access, no production changes without approval.",
          exercise: {
            title: "Drift Detection Plan",
            description: "Describe how you would detect and correct drift in a production environment. Include: how drift happens, how terraform plan detects it, and how immutable infrastructure prevents it."
          },
          artifact: {
            title: "Drift Management Strategy",
            description: "A drift detection and prevention strategy including policy as code enforcement."
          },
          validationChecklist: [
            "Understand what configuration drift is and how it happens",
            "Know how terraform plan detects drift",
            "Understand immutable infrastructure as a drift prevention strategy",
            "Know what policy as code tools do"
          ]
        }
      ]
    },
    {
      id: "mod8-networking-depth",
      title: "Module 8 — Networking Architecture in Depth",
      description: "Design real VPC architectures with multi-AZ deployment, CIDR planning, peering, private endpoints, and flow logs.",
      difficulty: "intermediate",
      estimatedTime: "20 min",
      lessons: [
        {
          id: "p2-lesson-18",
          title: "Designing Real VPC Architectures",
          whyThisMatters: "A single availability zone is a single point of failure. Real systems deploy across at least two AZs. This lesson covers production-grade VPC design.",
          coreConcepts: "**Multi-AZ Design**\nA single availability zone is a single point of failure. Real systems deploy across at least two AZs. Each AZ has its own public and private subnets. Load balancers distribute traffic across AZs. Multi-AZ design is the minimum bar for production availability.\n\n**CIDR Planning**\nPlan your IP address ranges before you build. Overlapping CIDRs cause routing problems and prevent VPC peering. Plan with room to grow — changing a VPC CIDR later is painful.\n\n**VPC Peering and Transit Gateway**\nVPC peering connects two VPCs so resources can communicate using private IPs. Peering is non-transitive. Transit Gateway acts as a central hub — each VPC connects to it and can reach any other connected VPC through it.\n\n**Private Endpoints**\nPrivate endpoints allow you to access cloud provider services through a private network path inside your VPC rather than over the public internet. This keeps traffic off the internet and satisfies compliance requirements.\n\n**Network Flow Logs**\nLogs capturing all network flow data: source IP, destination IP, protocol, port, and whether traffic was accepted or rejected. Essential for debugging connectivity problems and security auditing.",
          comparisonTables: [
            {
              headers: ["Concept / Skill", "AWS", "Azure / GCP"],
              rows: [
                ["Multi-AZ Subnets", "Multiple AZs per VPC", "Same pattern in Azure / GCP"],
                ["VPC Peering", "VPC Peering", "VNet Peering / VPC Peering"],
                ["Hub-and-spoke networking", "Transit Gateway", "Azure Virtual WAN / Cloud VPN Hub"],
                ["Private service endpoints", "VPC Endpoints (Private Link)", "Private Endpoint / Private Service Connect"],
                ["Network flow logging", "VPC Flow Logs", "NSG Flow Logs / VPC Flow Logs"],
                ["Web application firewall", "AWS WAF", "Azure WAF / Cloud Armor"],
                ["DDoS protection", "AWS Shield", "Azure DDoS Protection / Cloud Armor"]
              ]
            }
          ],
          exercise: {
            title: "Multi-AZ VPC Design",
            description: "Design a multi-AZ VPC with at least two availability zones. Include public and private subnets in each AZ, a load balancer, NAT gateways, and CIDR planning."
          },
          artifact: {
            title: "Production VPC Architecture",
            description: "A multi-AZ VPC design with CIDR plan, subnet layout, and traffic flow documentation."
          },
          validationChecklist: [
            "VPC spans at least two availability zones",
            "CIDR ranges are planned without overlap",
            "Understand VPC peering vs Transit Gateway",
            "Know what private endpoints and flow logs provide"
          ]
        }
      ]
    },
    {
      id: "mod9-security",
      title: "Module 9 — Security Architecture",
      description: "Production-scale identity, data encryption, network security, and threat detection.",
      difficulty: "intermediate",
      estimatedTime: "25 min",
      lessons: [
        {
          id: "p2-lesson-19",
          title: "Identity and Access at Production Scale",
          whyThisMatters: "Production IAM is fundamentally different from development IAM. Role-based access, federation, service accounts, and condition-based policies are how real organizations manage access at scale.",
          coreConcepts: "**Role-Based Access Control**\nPermissions are attached to roles. Roles are assigned to identities. No individual identity gets permissions directly. Changing a role affects everyone who holds it — making permission management auditable and scalable.\n\n**Federation and Single Sign-On**\nEnterprise environments use identity providers like Active Directory or Okta. Federation means cloud IAM trusts your corporate IdP: employees authenticate with existing credentials and receive temporary cloud access tokens.\n\n**Service Accounts and Workload Identity**\nApplications should never use human credentials. Instead they use service accounts or workload identity — machine identities specifically created for automated workloads, tightly scoped to only the permissions the workload needs.\n\n**Condition-Based Access**\nModern IAM policies support conditions: an action is only allowed if certain conditions are true — specific IP ranges, specific VPC endpoints, encrypted objects only.",
          comparisonTables: [
            {
              headers: ["Concept / Skill", "AWS", "Azure / GCP"],
              rows: [
                ["Role-based access", "IAM Roles", "Azure RBAC / GCP IAM Roles"],
                ["Identity federation / SSO", "IAM Identity Center", "Azure AD / GCP Workforce Identity"],
                ["Service / workload identity", "IAM Roles for services", "Managed Identity / Workload Identity"],
                ["Policy analyzer", "IAM Access Analyzer", "Azure Advisor / Policy Analyzer"],
                ["MFA enforcement", "MFA on IAM / SCPs", "Conditional Access / MFA enforcement"]
              ]
            }
          ],
          exercise: {
            title: "Production IAM Design",
            description: "Design an IAM strategy for an organization with three teams: platform, application, and security. Define roles, federation, and service account policies."
          },
          artifact: {
            title: "IAM Architecture",
            description: "A production IAM design with roles, federation, service accounts, and condition-based policies."
          },
          validationChecklist: [
            "Understand RBAC and why direct permissions are avoided",
            "Know how federation and SSO work",
            "Understand service accounts and workload identity",
            "Can design condition-based access policies"
          ]
        },
        {
          id: "p2-lesson-20",
          title: "Data Security and Encryption",
          whyThisMatters: "Data breaches are the most costly security incidents. Encryption at rest and in transit, secrets management, and data classification are the foundations of data security in the cloud.",
          coreConcepts: "**Encryption at Rest**\nAll sensitive data should be encrypted at rest. For stronger control, use customer-managed keys (CMKs) stored in a cloud key management service. You control rotation, access, and which services can use each key.\n\n**Encryption in Transit**\nAll data moving between services should be encrypted using TLS. Never allow unencrypted communication between services handling sensitive data.\n\n**Secrets Management**\nDatabase passwords, API keys, OAuth tokens, and TLS certificates must never be stored in code, container image environment variables, or unencrypted config files. Cloud secrets managers provide encrypted storage, automatic rotation, fine-grained access control, and audit logging.\n\n**Data Classification**\nPublic, internal, confidential, and restricted data need different protection levels. Knowing which tier your data belongs to determines which encryption requirements, access controls, and retention policies apply.",
          comparisonTables: [
            {
              headers: ["Concept / Skill", "AWS", "Azure / GCP"],
              rows: [
                ["Customer-managed keys", "KMS", "Azure Key Vault / Cloud KMS"],
                ["Secrets storage", "Secrets Manager", "Azure Key Vault Secrets / Secret Manager"],
                ["Certificate management", "ACM", "Azure App Service Certs / Certificate Manager"],
                ["Database encryption at rest", "RDS encryption", "TDE / Cloud SQL encryption"]
              ]
            }
          ],
          exercise: {
            title: "Data Security Plan",
            description: "Design a data security strategy for an application handling user payment data. Cover encryption at rest, encryption in transit, secrets management, and data classification."
          },
          artifact: {
            title: "Data Security Architecture",
            description: "A data security design covering encryption, secrets management, and classification for sensitive data."
          },
          validationChecklist: [
            "All sensitive data is encrypted at rest with customer-managed keys",
            "All inter-service communication uses TLS",
            "Secrets are stored in a secrets manager, never in code",
            "Data is classified by sensitivity level"
          ]
        },
        {
          id: "p2-lesson-21",
          title: "Network Security and Threat Detection",
          whyThisMatters: "Network security goes beyond firewalls. WAFs, DDoS protection, threat detection, and zero trust networking form the defense-in-depth strategy that production systems require.",
          coreConcepts: "**Web Application Firewall**\nA WAF inspects HTTP/HTTPS traffic at the application layer. It blocks SQL injection, cross-site scripting, malformed requests, and known bad IPs. WAFs sit in front of public-facing load balancers and API gateways.\n\n**DDoS Protection**\nCloud providers offer DDoS protection at multiple levels. At a system design level, you mitigate DDoS risk by putting load balancers and CDNs in front of origin servers and keeping origin IPs private.\n\n**Threat Detection**\nCloud-native threat detection services analyze API calls, network traffic, and resource behavior for signs of compromise — unusual roles, unexpected exports, bursts of failed authentication attempts.\n\n**Zero Trust Networking**\nZero trust rejects the assumption that anything inside the network perimeter is trusted. Every request must be authenticated and authorized regardless of where it originates. Network location is not sufficient proof of identity.",
          exercise: {
            title: "Defense-in-Depth Design",
            description: "Design a network security architecture that includes WAF, DDoS protection, threat detection, and zero trust principles for a public-facing web application."
          },
          artifact: {
            title: "Network Security Architecture",
            description: "A defense-in-depth network security design for a production web application."
          },
          validationChecklist: [
            "Understand what WAFs protect against",
            "Know how DDoS protection works at the infrastructure level",
            "Understand cloud-native threat detection",
            "Can explain zero trust networking principles"
          ]
        }
      ]
    },
    {
      id: "mod10-scalability",
      title: "Module 10 — Scalability and Performance",
      description: "Horizontal scaling, auto scaling groups, caching, CDNs, database scaling, and connection pooling.",
      difficulty: "intermediate",
      estimatedTime: "20 min",
      lessons: [
        {
          id: "p2-lesson-22",
          title: "Scaling Compute",
          whyThisMatters: "Traffic is not constant. Systems must handle spikes without manual intervention and scale down when demand drops. Understanding horizontal scaling, auto scaling, and caching is essential for production infrastructure.",
          coreConcepts: "**Horizontal vs Vertical Scaling**\nVertical scaling means making one resource bigger. It has a ceiling. Horizontal scaling means adding more instances — it scales without hard limits and provides redundancy. Cloud architecture favors horizontal scaling because it also improves availability.\n\n**Auto Scaling Groups**\nAn auto scaling group manages a fleet of identical compute instances. You define a minimum size, a maximum size, and scaling policies. The group adds instances when load increases and removes them when load drops. It also automatically replaces unhealthy instances.\n\n**Stateless Application Design**\nHorizontal scaling requires that your application instances are interchangeable. Any instance should handle any request. Application state must live outside the instances in shared storage or a cache.\n\n**Caching**\nCaches store frequently accessed data in fast in-memory storage. Common patterns: cache-aside (check cache first, query database on miss), write-through (writes go to both cache and database), TTL-based expiration. Managed Redis and Memcached services are common choices.\n\n**Content Delivery Networks**\nCDNs cache static content at edge locations geographically close to users. Users get content from the nearest edge node rather than your origin server. This reduces global latency and dramatically reduces origin load.",
          comparisonTables: [
            {
              headers: ["Concept / Skill", "AWS", "Azure / GCP"],
              rows: [
                ["Auto Scaling Groups", "EC2 Auto Scaling", "Azure VMSS / Managed Instance Groups"],
                ["Managed Cache (Redis)", "ElastiCache", "Azure Cache for Redis / Memorystore"],
                ["CDN", "CloudFront", "Azure CDN / Cloud CDN"],
                ["Container auto scaling", "EKS HPA / KEDA", "AKS HPA / GKE HPA"],
                ["Serverless auto scaling", "Lambda (inherent)", "Azure Functions / Cloud Functions"]
              ]
            }
          ],
          exercise: {
            title: "Scaling Strategy",
            description: "Design a scaling strategy for a web application that experiences 10x traffic spikes during business hours. Include auto scaling, caching, and CDN configuration."
          },
          artifact: {
            title: "Scaling Architecture",
            description: "A scaling design with auto scaling groups, caching layer, and CDN for a traffic-variable application."
          },
          validationChecklist: [
            "Understand horizontal vs vertical scaling",
            "Can configure auto scaling groups with appropriate policies",
            "Know when and how to use caching",
            "Understand how CDNs reduce latency and origin load"
          ]
        },
        {
          id: "p2-lesson-23",
          title: "Database Scaling and Resilience",
          whyThisMatters: "Databases are often the bottleneck in cloud systems. Understanding read replicas, multi-AZ deployment, connection pooling, and query performance is essential for building systems that scale.",
          coreConcepts: "**Read Replicas**\nA read replica handles read traffic. Write operations go to the primary. Read operations distribute across replicas. This works well when your workload is read-heavy, which most web applications are.\n\n**Multi-AZ Database Deployment**\nThe provider maintains a synchronized standby in a different availability zone. If the primary fails, the provider automatically promotes the standby. Failover typically completes in under two minutes.\n\n**Connection Pooling**\nDatabase connections are expensive to create. Connection pools maintain a set of open connections and reuse them across requests. Without connection pooling, a traffic burst can exhaust database connection limits and cause failures.\n\n**Query Performance**\nSlow queries are the most common source of database performance problems. Explain plans show how the database executes a query and where it is spending time. Indexes speed up lookups on frequently queried columns.",
          exercise: {
            title: "Database Resilience Design",
            description: "Design a database architecture for a read-heavy web application. Include read replicas, multi-AZ deployment, connection pooling, and query performance monitoring."
          },
          artifact: {
            title: "Database Architecture",
            description: "A database scaling and resilience design with replicas, failover, pooling, and performance monitoring."
          },
          validationChecklist: [
            "Understand read replicas and when to use them",
            "Know how multi-AZ database deployment works",
            "Understand connection pooling and why it matters",
            "Can identify and diagnose slow queries"
          ]
        }
      ]
    },
    {
      id: "mod11-cicd",
      title: "Module 11 — CI/CD and Deployment Pipelines",
      description: "Continuous integration, continuous delivery, deployment strategies, and artifact management for infrastructure.",
      difficulty: "intermediate",
      estimatedTime: "20 min",
      lessons: [
        {
          id: "p2-lesson-24",
          title: "Continuous Integration and Continuous Delivery",
          whyThisMatters: "Manual deployments are slow, error-prone, and unrepeatable. CI/CD pipelines automate the entire path from code commit to production deployment, catching problems early and making deployments reliable.",
          coreConcepts: "**Continuous Integration**\nEvery code commit triggers an automated pipeline that builds the application, runs tests, and reports results. If any step fails, the pipeline fails and the developer is notified immediately. CI catches problems early, when they are cheap to fix.\n\n**Continuous Delivery**\nEvery successful build is automatically packaged and ready to deploy. A human approves the deployment to production. Most organizations use continuous delivery (human approval gate for production) rather than full continuous deployment.\n\n**Pipeline Stages for Infrastructure**\nAn IaC pipeline typically includes: format and lint checks, security scanning, terraform plan in a preview environment, plan review and approval, apply to staging, smoke tests, approval gate, apply to production.\n\n**Artifact Management**\nBuild artifacts — container images, compiled binaries, Terraform state — should be versioned and stored in managed artifact repositories. This ensures deployments are reproducible.",
          comparisonTables: [
            {
              headers: ["Concept / Skill", "AWS", "Azure / GCP"],
              rows: [
                ["CI/CD pipelines", "CodePipeline / GitHub Actions", "Azure DevOps / Cloud Build"],
                ["Container registry", "ECR", "Azure Container Registry / Artifact Registry"],
                ["Artifact storage", "S3 + versioning", "Azure Blob / GCS versioned"]
              ]
            }
          ],
          exercise: {
            title: "CI/CD Pipeline Design",
            description: "Design a CI/CD pipeline for infrastructure code. Include all pipeline stages from commit to production deployment, with approval gates."
          },
          artifact: {
            title: "IaC Pipeline Design",
            description: "A CI/CD pipeline design for infrastructure code with stages, gates, and artifact management."
          },
          validationChecklist: [
            "Understand CI vs CD",
            "Can design pipeline stages for infrastructure",
            "Know how artifact management ensures reproducibility",
            "Understand approval gates for production"
          ]
        },
        {
          id: "p2-lesson-25",
          title: "Deployment Strategies",
          whyThisMatters: "How you deploy matters as much as what you deploy. The wrong deployment strategy can cause downtime, data loss, or silent failures. Understanding rolling, blue-green, canary, and feature flag strategies gives you options.",
          coreConcepts: "**Rolling Deployment**\nNew versions are deployed to instances one at a time. Old instances are replaced gradually. If the new version has a problem, you halt the rollout. Rolling deployments minimize downtime but make rollback slower.\n\n**Blue-Green Deployment**\nTwo identical environments: blue (current production) and green (new version). When confident, you switch traffic atomically. If something goes wrong, you switch back in seconds. Blue-green provides fast, reliable rollback.\n\n**Canary Deployment**\nA small percentage of production traffic routes to the new version. You monitor error rates and latency. If the canary looks healthy, you gradually increase traffic. Canary deployments validate new versions under real production traffic with minimal risk.\n\n**Feature Flags**\nFeature flags decouple code deployment from feature activation. Deploy the code with the feature disabled; enable it for specific users through a configuration system, not a code deploy. This allows instant rollbacks by toggling a flag.",
          exercise: {
            title: "Deployment Strategy Selection",
            description: "For three different scenarios (critical payment service, marketing landing page, internal dashboard), choose the most appropriate deployment strategy and explain why."
          },
          artifact: {
            title: "Deployment Strategy Guide",
            description: "A guide matching deployment strategies to different application types with tradeoff analysis."
          },
          validationChecklist: [
            "Can explain rolling, blue-green, canary, and feature flag strategies",
            "Know the tradeoffs of each strategy",
            "Can match strategies to appropriate use cases"
          ]
        }
      ]
    },
    {
      id: "mod12-observability",
      title: "Module 12 — Observability: Understanding System Behavior",
      description: "The three pillars of observability: metrics, logs, and traces. Plus structured logging and SLOs.",
      difficulty: "intermediate",
      estimatedTime: "15 min",
      lessons: [
        {
          id: "p2-lesson-26",
          title: "The Three Pillars of Observability",
          whyThisMatters: "You cannot fix what you cannot see. Observability gives you the ability to understand system behavior from the outside by examining its outputs: metrics, logs, and traces.",
          coreConcepts: "**Metrics**\nNumeric measurements collected over time: CPU usage, request rate, error rate, latency percentiles, queue depth. The first place you look when something is wrong. Dashboards visualize metrics. Alerts fire when metrics cross thresholds.\n\n**Logs**\nRecords of discrete events: a request came in, an error occurred, an authentication failed. Logs contain context — user ID, IP address, error message — that metrics cannot capture. They answer 'what exactly happened' after metrics tell you 'something went wrong.'\n\n**Traces**\nDistributed tracing follows a single request as it moves through multiple services. A trace captures the path, the time spent at each service, and where latency or errors originate. Traces answer 'which service is responsible for this slow request.'\n\n**Structured Logging**\nStructured logs are JSON objects with consistent fields: timestamp, level, service, request_id, user_id, message. Structured logs are queryable — you can filter all ERROR logs from a specific service for a specific user in a specific time window.\n\n**Service Level Objectives**\nAn SLO is a target for system reliability: 99.9% of requests complete in under 200ms. SLOs give teams a quantitative definition of 'working well enough.' If you are burning through your error budget, you slow down and focus on reliability.",
          comparisonTables: [
            {
              headers: ["Concept / Skill", "AWS", "Azure / GCP"],
              rows: [
                ["Metrics platform", "CloudWatch Metrics", "Azure Monitor Metrics / Cloud Monitoring"],
                ["Log aggregation", "CloudWatch Logs", "Azure Monitor Logs / Cloud Logging"],
                ["Distributed tracing", "X-Ray", "Azure App Insights / Cloud Trace"],
                ["Alerting", "CloudWatch Alarms", "Azure Alerts / Cloud Monitoring Alerts"],
                ["Third-party observability", "Datadog / Grafana / New Relic", "Same tools work across all clouds"]
              ]
            }
          ],
          exercise: {
            title: "Observability Strategy",
            description: "Design an observability strategy for your production application. Define what metrics to track, what to log, where distributed tracing adds value, and set one SLO."
          },
          artifact: {
            title: "Observability Architecture",
            description: "An observability design covering metrics, logs, traces, and at least one SLO."
          },
          validationChecklist: [
            "Understand metrics, logs, and traces and when to use each",
            "Know what structured logging is and why it matters",
            "Can define a meaningful SLO",
            "Understand error budgets"
          ]
        }
      ]
    },
    {
      id: "mod-capstone-2",
      title: "Tier 2 Capstone",
      description: "Build a production-ready application environment that demonstrates your Tier 2 engineering skills.",
      difficulty: "intermediate",
      estimatedTime: "45 min",
      lessons: [
        {
          id: "p2-capstone",
          title: "Build a Production-Ready Application Environment",
          whyThisMatters: "The Tier 2 capstone is where you prove you can build production-grade infrastructure. Take everything you learned and design a complete system that another engineer could review, understand, and operate.",
          coreConcepts: "Take the beginner system from Tier 1 and evolve it into a production-ready architecture. Every component must have a documented reason for existing. Every permission must be justified. The architecture should be something a new engineer could understand from code and documentation alone — no verbal explanation required.\n\n**What Makes a Strong Capstone**\nEvery component must have a documented reason for existing. Every permission must be justified. The architecture should be something a new engineer could understand from code and documentation alone — no verbal explanation required.\n\nNext document: Tier 3 — Expert. Begin with Module 13: High Availability and Resilience Engineering.",
          exercise: {
            title: "Production Architecture Build",
            description: "Design and build a complete production-ready architecture that includes all required components. Document every decision."
          },
          artifact: {
            title: "Tier 2 Capstone Architecture",
            description: "A complete production-ready application environment with documentation for every component and decision."
          },
          validationChecklist: [
            "Multi-AZ VPC with proper subnet separation and routing",
            "Auto-scaling application tier behind a load balancer",
            "Managed database with Multi-AZ failover and read replicas",
            "Caching layer reducing database load",
            "Encryption at rest and in transit for all data stores",
            "Secrets manager storing all credentials — no plaintext secrets",
            "Least-privilege IAM roles for every component",
            "CI/CD pipeline that validates, plans, and applies IaC changes",
            "Structured logging, metrics, and alerting with a defined SLO"
          ]
        }
      ]
    }
  ]
};

export const prereqExpert: LearningPath = {
  id: "prereq-expert",
  title: "Cloud & Infrastructure Training — Expert",
  shortTitle: "Prereq: Expert",
  description: "Design resilient multi-region systems, apply the Well-Architected Framework, manage cloud costs with FinOps, govern infrastructure at organizational scale, and master cloud-native architecture patterns including Kubernetes in production.",
  icon: "CloudCog",
  order: 0,
  color: "prerequisite",
  accentColor: "#065F46",
  courses: [
    {
      id: "mod13-resilience",
      title: "Module 13 — High Availability and Resilience Engineering",
      description: "Design systems that survive failure. Availability zones, recovery objectives, circuit breakers, multi-region architecture, and disaster recovery.",
      difficulty: "advanced",
      estimatedTime: "30 min",
      lessons: [
        {
          id: "p3-lesson-27",
          title: "Designing for Failure",
          whyThisMatters: "Everything fails eventually. Hardware fails. Networks partition. Software has bugs. Dependencies go down. Resilient systems do not prevent failure — they are designed to survive it. Your goal is to make failure boring.",
          coreConcepts: "**The Fundamental Principle**\nEverything fails eventually. Hardware fails. Networks partition. Software has bugs. Dependencies go down. Resilient systems do not prevent failure — they are designed to survive it. Your goal is to make failure boring: detected quickly, contained to a small blast radius, and recovered automatically.\n\n**Availability Zones and Regions**\nA region is a geographic area containing multiple isolated data centers. An availability zone is one or more data centers in a region with independent power, cooling, and networking. Deploying across multiple AZs protects against AZ-level failures. Deploying across multiple regions protects against regional failures.\n\n**Recovery Objectives**\n- RTO — Recovery Time Objective: how long can the system be unavailable before it causes unacceptable business impact?\n- RPO — Recovery Point Objective: how much data loss is acceptable?\n\nYour RTO and RPO determine your architecture. A one-hour RTO with a one-day RPO can use warm standby with daily backups. A 30-second RTO with zero RPO requires active-active multi-region with synchronous replication.\n\n**Circuit Breakers**\nA circuit breaker stops calling a failing dependency and returns an error immediately rather than waiting for a timeout. This prevents cascading failures.\n\n**Retry with Backoff and Jitter**\nRetrying immediately often makes things worse. Exponential backoff waits longer between each retry. Jitter adds randomness so thousands of clients are not all retrying at exactly the same moment.\n\n**Bulkheads**\nBulkheads isolate failures. If your application uses thread pools to call two downstream services, a failing service drains its pool but cannot affect the pool for the healthy service.",
          exercise: {
            title: "Resilience Design",
            description: "Design resilience patterns for an application with three downstream dependencies. Include circuit breakers, retry with backoff, and bulkhead isolation."
          },
          artifact: {
            title: "Resilience Architecture",
            description: "A resilience design including circuit breakers, retry strategies, bulkheads, and recovery objectives."
          },
          validationChecklist: [
            "Understand RTO and RPO and how they determine architecture",
            "Can design circuit breaker patterns",
            "Know how retry with backoff and jitter prevents thundering herds",
            "Understand bulkhead isolation"
          ]
        },
        {
          id: "p3-lesson-28",
          title: "Multi-Region Architecture",
          whyThisMatters: "Single-region architectures have a ceiling on availability. Multi-region design eliminates the single-region point of failure but introduces complexity in data replication, routing, and consistency.",
          coreConcepts: "**Active-Passive**\nAll production traffic runs in one region (active). A second region (passive) is kept warm with replicated data. If the active region fails, you promote the passive region and redirect traffic. Simpler but has non-zero failover time.\n\n**Active-Active**\nTraffic runs in multiple regions simultaneously. Users are served from the closest region. Each region handles its share of write traffic. Data is replicated across regions in near-real-time. Complex but provides zero-downtime failover.\n\n**Global Load Balancing and DNS**\nGlobal load balancers and DNS routing policies direct users to the appropriate region: latency-based routing, geolocation routing, and failover routing.\n\n**Data Residency and Sovereignty**\nSome regulations require that certain data remain within specific geographic boundaries. Multi-region architecture must be designed around these constraints from the start.",
          comparisonTables: [
            {
              headers: ["Concept / Skill", "AWS", "Azure / GCP"],
              rows: [
                ["Global load balancing", "Route 53 / Global Accelerator", "Azure Front Door / GCP Global LB"],
                ["Multi-region data replication", "DynamoDB Global Tables / RDS Global", "Cosmos DB multi-region / Cloud Spanner"],
                ["Cross-region failover", "Route 53 health checks + failover", "Azure Traffic Manager / Cloud DNS"],
                ["Data residency controls", "AWS data residency controls", "Azure Policy / GCP org constraints"]
              ]
            }
          ],
          exercise: {
            title: "Multi-Region Design",
            description: "Design a multi-region architecture for an application serving users in North America and Europe. Choose active-passive or active-active and justify your decision."
          },
          artifact: {
            title: "Multi-Region Architecture",
            description: "A multi-region design with routing strategy, data replication approach, and failover plan."
          },
          validationChecklist: [
            "Understand active-passive vs active-active tradeoffs",
            "Can design global load balancing and DNS routing",
            "Know how data replication works across regions",
            "Understand data residency and sovereignty constraints"
          ]
        },
        {
          id: "p3-lesson-29",
          title: "Disaster Recovery Design",
          whyThisMatters: "A disaster recovery plan that has never been tested is a theory, not a plan. Understanding the four DR strategies and their tradeoffs is essential for designing systems that can actually recover.",
          coreConcepts: "**Backup and Restore**\nThe simplest DR strategy: take regular backups and restore when needed. RTO is high (hours). RPO depends on backup frequency. Acceptable for systems where multi-hour recovery is tolerable.\n\n**Pilot Light**\nA minimal version of the environment runs continuously in the recovery region — just enough to replicate data. When disaster strikes, you scale up quickly. RTO is 10–60 minutes. Cost is low.\n\n**Warm Standby**\nA scaled-down but fully functional version of the system runs continuously. When disaster strikes, you scale it up and redirect traffic. RTO is minutes. The most common approach for systems requiring sub-hour recovery.\n\n**Multi-Site Active-Active**\nFull-scale production environments run in multiple regions simultaneously. Failover is automatic and instantaneous. RTO and RPO are near-zero. Cost is the highest.\n\n**DR Testing**\nTest DR regularly: run failover drills, verify recovery procedures work, measure actual RTO and RPO under realistic conditions. Chaos engineering — deliberately injecting failures — tests recovery mechanisms continuously.",
          exercise: {
            title: "DR Strategy Selection",
            description: "For three systems with different criticality levels (internal tool, customer-facing API, payment processing), choose the appropriate DR strategy and justify the cost-availability tradeoff."
          },
          artifact: {
            title: "DR Strategy Matrix",
            description: "A DR strategy selection matrix mapping system criticality to recovery strategies with RTO/RPO targets."
          },
          validationChecklist: [
            "Can explain backup/restore, pilot light, warm standby, and active-active DR",
            "Know the RTO/RPO tradeoffs for each strategy",
            "Understand why DR plans must be tested regularly",
            "Can match DR strategies to system criticality"
          ],
          engineeringReflection: "What is your organization's RTO and RPO for its most critical system? Do you know how to achieve them? Have you tested it?"
        }
      ]
    },
    {
      id: "mod14-well-architected",
      title: "Module 14 — The Well-Architected Framework",
      description: "A systematic framework for evaluating cloud architecture across five pillars.",
      difficulty: "advanced",
      estimatedTime: "15 min",
      lessons: [
        {
          id: "p3-lesson-30",
          title: "Designing With the Five Pillars",
          whyThisMatters: "AWS, Azure, and GCP all publish Well-Architected Frameworks. Understanding this framework gives you a systematic way to evaluate any architecture — including one you are designing or reviewing.",
          coreConcepts: "**Operational Excellence**\nThe ability to run and monitor systems to deliver business value and to continuously improve. Key practices: treat operations as code, make frequent small reversible changes, anticipate and learn from failures.\n\n**Security**\nThe ability to protect information, systems, and assets through risk assessment and mitigation. Key practices: apply security at every layer, enable traceability, automate security best practices, protect data in transit and at rest.\n\n**Reliability**\nThe ability to recover from failures and continue functioning. Key practices: test recovery procedures, scale horizontally, stop guessing capacity, manage change through automation.\n\n**Performance Efficiency**\nThe ability to use cloud resources efficiently as demand changes. Key practices: use the right resource type, use managed services, go global in minutes, experiment often.\n\n**Cost Optimization**\nThe ability to run systems at the lowest price point while delivering required business value. Key practices: implement FinOps, adopt a consumption model, measure overall efficiency, eliminate waste.",
          comparisonTables: [
            {
              headers: ["Concept / Skill", "AWS", "Azure / GCP"],
              rows: [
                ["Well-Architected Reviews", "AWS WA Tool / Trusted Advisor", "Azure Advisor / GCP Architecture Center"],
                ["Security posture management", "AWS Security Hub", "Defender for Cloud / Security Command Center"],
                ["Cost analysis", "AWS Cost Explorer", "Azure Cost Management / GCP Cost Management"]
              ]
            }
          ],
          exercise: {
            title: "Five Pillar Review",
            description: "Take the production architecture you designed in Tier 2 and evaluate it against each of the five pillars. Identify one improvement for each pillar."
          },
          artifact: {
            title: "Well-Architected Review",
            description: "A five-pillar review of your production architecture with one improvement identified per pillar."
          },
          validationChecklist: [
            "Can name and explain all five pillars",
            "Can evaluate an architecture against the framework",
            "Understand that the framework applies across all cloud providers"
          ]
        }
      ]
    },
    {
      id: "mod15-finops",
      title: "Module 15 — Cloud Cost Management and FinOps",
      description: "Pricing models, right-sizing, tagging, cost attribution, and building a FinOps culture.",
      difficulty: "advanced",
      estimatedTime: "15 min",
      lessons: [
        {
          id: "p3-lesson-31",
          title: "Understanding Cloud Economics",
          whyThisMatters: "Cloud spending can grow rapidly without visibility or accountability. Understanding pricing models, right-sizing, and FinOps culture is how organizations control costs without sacrificing engineering velocity.",
          coreConcepts: "**Pricing Models**\n- On-demand: pay per second or per hour, no commitment — highest per-unit price\n- Reserved instances / committed use: commit to one or three years, receive 30–60% discount\n- Spot / preemptible: bid on unused capacity at 60–90% discount — the provider can reclaim these with short notice\n- Savings plans: flexible commitment to a spend level, discount applies across matching resource types\n\n**Right-Sizing**\nRunning oversized resources wastes money. Right-sizing means analyzing actual utilization and choosing the smallest resource that meets your performance requirements.\n\n**Tagging and Cost Attribution**\nTags are key-value pairs you attach to resources: 'team: payments', 'environment: production'. Without tagging discipline, cloud bills are opaque. With consistent tagging, every dollar is attributable to a team and a reason.\n\n**FinOps Culture**\nFinOps is the practice of bringing financial accountability to cloud spending. It requires collaboration between engineering, finance, and business stakeholders.\n\n**Waste Elimination**\nCommon sources of cloud waste: idle resources running over weekends, oversized instances, unattached storage from deleted VMs, old snapshots kept far longer than required, unoptimized data transfer between regions.",
          exercise: {
            title: "Cost Optimization Audit",
            description: "Audit a hypothetical cloud environment for waste. Identify at least three sources of unnecessary spending and propose a fix for each."
          },
          artifact: {
            title: "FinOps Strategy",
            description: "A FinOps strategy covering pricing model selection, right-sizing, tagging, and waste elimination."
          },
          validationChecklist: [
            "Understand the four pricing models and when to use each",
            "Know what right-sizing means and how to implement it",
            "Can design a tagging strategy for cost attribution",
            "Understand FinOps culture and its organizational requirements"
          ],
          engineeringReflection: "If your team's cloud bill doubled this month, what is the first thing you would look at? What tools would you use to find the cause?"
        }
      ]
    },
    {
      id: "mod16-governance",
      title: "Module 16 — Governance and Organizational-Scale Infrastructure",
      description: "Landing zones, organizational hierarchies, service control policies, and platform engineering.",
      difficulty: "advanced",
      estimatedTime: "20 min",
      lessons: [
        {
          id: "p3-lesson-32",
          title: "Cloud Governance Frameworks",
          whyThisMatters: "As organizations grow, infrastructure without governance becomes unmanageable. Landing zones, organizational hierarchies, and policy guardrails provide the structure that makes large-scale infrastructure safe and consistent.",
          coreConcepts: "**Landing Zones**\nA landing zone is a pre-configured, governed cloud environment that new workloads land in. It provides a baseline of security controls, network architecture, identity configuration, logging, and policy enforcement.\n\n**Organizational Hierarchies**\nAWS Organizations with Organizational Units, Azure Management Groups and Subscriptions, GCP Resource Hierarchy with Folders and Projects. These hierarchies let you apply policies, budgets, and access controls at the organizational level.\n\n**Service Control Policies and Cloud Policy**\nSCPs on AWS set the maximum permissions any account can ever use — even full admin rights cannot override an SCP. Azure Policy and GCP Org Policy enforce rules on resources and automatically remediate violations.",
          comparisonTables: [
            {
              headers: ["Concept / Skill", "AWS", "Azure / GCP"],
              rows: [
                ["Organizational hierarchy", "AWS Organizations + OUs", "Azure Management Groups / GCP Folders"],
                ["Policy guardrails", "Service Control Policies", "Azure Policy / GCP Org Policy"],
                ["Centralized logging", "CloudTrail + S3 centralized", "Azure Monitor at management level"],
                ["Landing zone automation", "AWS Control Tower", "Azure Landing Zones / GCP Landing Zone"],
                ["Budget controls", "AWS Budgets", "Azure Budgets / GCP Budgets"]
              ]
            }
          ],
          exercise: {
            title: "Governance Framework Design",
            description: "Design a governance framework for an organization with 10 engineering teams. Include landing zone design, organizational hierarchy, and policy guardrails."
          },
          artifact: {
            title: "Governance Architecture",
            description: "An organizational governance design with landing zones, hierarchies, and policy enforcement."
          },
          validationChecklist: [
            "Understand what landing zones provide",
            "Can design organizational hierarchies",
            "Know how SCPs and cloud policies enforce guardrails",
            "Understand centralized logging and budget controls"
          ]
        },
        {
          id: "p3-lesson-33",
          title: "Platform Engineering and Developer Enablement",
          whyThisMatters: "Platform engineering is how organizations scale infrastructure expertise. Instead of every team learning every cloud service, a platform team builds golden paths that abstract complexity while maintaining standards.",
          coreConcepts: "**Internal Developer Platforms**\nA platform engineering team builds an internal platform that abstracts cloud complexity for application developers. Instead of every developer learning every cloud service, they interact with a platform that provides golden paths: opinionated, pre-approved ways to provision infrastructure, deploy applications, and monitor systems.\n\n**Golden Paths**\nA golden path is an opinionated, recommended way to accomplish a common task. Create a new service using the golden path and you automatically get: CI/CD pipeline, container registry, appropriate IAM permissions, observability, security scanning, and infrastructure following the organization's standards.\n\n**Self-Service Infrastructure**\nPlatform teams enable application teams to provision infrastructure themselves, within guardrails. Service catalogs, Terraform modules, and internal APIs let developers get what they need without filing tickets.",
          exercise: {
            title: "Platform Design",
            description: "Design a golden path for creating a new microservice. Define what the developer provides and what the platform automatically provisions."
          },
          artifact: {
            title: "Platform Engineering Design",
            description: "A platform design with golden paths, self-service infrastructure, and developer experience."
          },
          validationChecklist: [
            "Understand what platform engineering provides",
            "Can design golden paths for common tasks",
            "Know how self-service infrastructure works within guardrails"
          ]
        }
      ]
    },
    {
      id: "mod17-devsecops",
      title: "Module 17 — DevSecOps: Security as Engineering Practice",
      description: "Shift security left into CI/CD pipelines. Vulnerability management, compliance as code, and blast radius minimization.",
      difficulty: "advanced",
      estimatedTime: "15 min",
      lessons: [
        {
          id: "p3-lesson-34",
          title: "Shifting Security Left",
          whyThisMatters: "Finding a vulnerability in a pull request is orders of magnitude cheaper than finding it in production. DevSecOps integrates security into every stage of the development and deployment pipeline.",
          coreConcepts: "**Security in CI/CD**\nSecurity should be automated in the pipeline, not bolted on after deployment. Every pull request should trigger: static analysis of infrastructure code, container image scanning for known vulnerabilities, secret scanning to catch hardcoded credentials, policy validation against guardrails.\n\n**Vulnerability Management**\nCloud environments have continuously changing attack surfaces. Vulnerability management means: scanning continuously, prioritizing by severity and exploitability, patching within defined SLAs, and tracking remediation to closure.\n\n**Compliance as Code**\nRegulatory compliance requirements translate into specific technical controls: encryption requirements, access logging, data retention rules, network segmentation. Compliance as code means encoding these requirements as automated checks that run continuously.\n\n**Blast Radius Minimization**\nThe goal of defensive architecture is to limit how much damage a successful attack can cause. Network segmentation limits lateral movement. Least-privilege IAM limits what compromised credentials can do. Encrypted data at rest limits the value of exfiltrated storage.",
          exercise: {
            title: "DevSecOps Pipeline",
            description: "Design a security-integrated CI/CD pipeline. Include static analysis, image scanning, secret scanning, and compliance checks at appropriate stages."
          },
          artifact: {
            title: "DevSecOps Architecture",
            description: "A CI/CD pipeline design with security checks integrated at every stage."
          },
          validationChecklist: [
            "Understand shift-left security principles",
            "Can integrate security scanning into CI/CD pipelines",
            "Know how compliance as code works",
            "Understand blast radius minimization strategies"
          ]
        }
      ]
    },
    {
      id: "mod18-cloud-native",
      title: "Module 18 — Cloud-Native Architecture Patterns",
      description: "Microservices, event-driven architecture, API gateways, and service mesh.",
      difficulty: "advanced",
      estimatedTime: "15 min",
      lessons: [
        {
          id: "p3-lesson-35",
          title: "Microservices and Event-Driven Architecture",
          whyThisMatters: "Cloud-native architecture patterns determine how applications are structured, how they communicate, and how they scale. Understanding monoliths vs microservices, event-driven design, and service mesh helps you make informed architectural decisions.",
          coreConcepts: "**Monolith vs Microservices**\nA monolith is a single deployable unit containing all application logic. Microservices decompose the application into small, independently deployable services — each owning its own data and communicating over APIs. Monoliths are simpler at small scale. Microservices scale teams and deployments independently but introduce distributed systems complexity.\n\n**API Gateway**\nThe single entry point for external traffic to a collection of backend services. Handles routing, authentication, rate limiting, request transformation, and logging.\n\n**Service Mesh**\nA service mesh implements TLS, retries, circuit breakers, observability, and authentication between services at the infrastructure layer using sidecar proxies.\n\n**Event-Driven Architecture**\nInstead of services calling each other synchronously, they publish events to a message queue or event stream. Downstream services consume events and react. This decouples producers from consumers and improves resilience, scalability, and extensibility.",
          comparisonTables: [
            {
              headers: ["Concept / Skill", "AWS", "Azure / GCP"],
              rows: [
                ["Message queues", "SQS", "Azure Service Bus / Cloud Pub/Sub"],
                ["Event streaming", "Kinesis / MSK (Kafka)", "Azure Event Hub / Pub/Sub"],
                ["API Gateway", "API Gateway", "Azure API Management / Cloud Endpoints"],
                ["Service mesh", "App Mesh / Istio", "Open Service Mesh / Anthos Service Mesh"]
              ]
            }
          ],
          exercise: {
            title: "Architecture Pattern Selection",
            description: "For an e-commerce platform, design the communication architecture. Decide which interactions should be synchronous (API) and which should be event-driven. Justify each choice."
          },
          artifact: {
            title: "Cloud-Native Architecture",
            description: "A cloud-native architecture design showing synchronous and asynchronous communication patterns."
          },
          validationChecklist: [
            "Understand monolith vs microservices tradeoffs",
            "Know what API gateways and service meshes provide",
            "Can design event-driven communication patterns",
            "Can choose appropriate patterns for different interaction types"
          ]
        }
      ]
    },
    {
      id: "mod19-kubernetes",
      title: "Module 19 — Kubernetes in Production",
      description: "Kubernetes architecture, pods, deployments, services, autoscaling, namespace isolation, and Helm.",
      difficulty: "advanced",
      estimatedTime: "15 min",
      lessons: [
        {
          id: "p3-lesson-36",
          title: "Kubernetes Architecture",
          whyThisMatters: "Kubernetes is the de facto standard for container orchestration at scale. Understanding its architecture, primitives, and operational patterns is essential for anyone working with production container workloads.",
          coreConcepts: "**Control Plane and Worker Nodes**\nA Kubernetes cluster has two layers. The control plane manages the cluster: scheduling workloads, tracking desired state, handling API requests, and storing cluster state in etcd. Worker nodes run the actual workloads. Managed Kubernetes services handle the control plane for you.\n\n**Pods, Deployments, and Services**\nA pod is the smallest deployable unit: one or more containers that share a network namespace. A deployment manages a set of identical pods and handles rolling updates and rollbacks. A service provides a stable network endpoint for a set of pods.\n\n**Horizontal Pod Autoscaler**\nThe HPA automatically scales the number of pods based on CPU usage, memory usage, custom application metrics, or external metrics. Cluster Autoscaler adds and removes worker nodes as pod demand changes.\n\n**Namespace Isolation**\nKubernetes namespaces provide logical isolation within a cluster. Network policies restrict traffic between namespaces. RBAC controls which teams have access to which namespaces.\n\n**Helm**\nHelm is the package manager for Kubernetes. Applications are packaged as Helm charts: Kubernetes YAML manifests with templating. Instead of managing raw YAML for complex applications, you install a Helm chart with configuration values.",
          comparisonTables: [
            {
              headers: ["Concept / Skill", "AWS", "Azure / GCP"],
              rows: [
                ["Managed Kubernetes", "EKS", "AKS / GKE"],
                ["Horizontal Pod Autoscaler", "EKS + HPA", "AKS HPA / GKE HPA"],
                ["Cluster Autoscaler", "EKS Cluster Autoscaler", "AKS Cluster Autoscaler / GKE Autopilot"],
                ["Helm packaging", "Helm on EKS", "Helm on AKS / Helm on GKE"],
                ["Service mesh", "App Mesh / Istio", "Open Service Mesh / Anthos Service Mesh"]
              ]
            }
          ],
          exercise: {
            title: "Kubernetes Architecture Design",
            description: "Design a Kubernetes deployment for a three-service application. Define pods, deployments, services, HPA policies, namespace isolation, and Helm packaging."
          },
          artifact: {
            title: "Kubernetes Production Design",
            description: "A production Kubernetes design with deployments, services, autoscaling, and namespace isolation."
          },
          validationChecklist: [
            "Understand the Kubernetes control plane and worker nodes",
            "Can design pods, deployments, and services",
            "Know how HPA and Cluster Autoscaler work",
            "Understand namespace isolation and RBAC",
            "Know what Helm provides"
          ]
        }
      ]
    },
    {
      id: "mod-capstone-3",
      title: "Tier 3 Capstone",
      description: "Design a complete production cloud architecture that addresses resilience, security, cost, governance, and observability.",
      difficulty: "advanced",
      estimatedTime: "60 min",
      lessons: [
        {
          id: "p3-capstone",
          title: "Design a Production Cloud Architecture",
          whyThisMatters: "The Tier 3 capstone is the final test of your cloud mastery. Design a complete production architecture for a globally distributed, security-sensitive application — addressing all five areas of expert cloud engineering.",
          coreConcepts: "Design a complete production cloud architecture for a web application that processes sensitive user data, serves global users, and must maintain 99.95% monthly availability.\n\nThe best architecture at this level is not the most complex one — it is the one with the fewest unnecessary components and the clearest reasoning for every decision. For each choice, explain: what the alternative was, why you chose this approach, and what the tradeoffs are.\n\n**What Makes a Strong Capstone**\nThe best architecture at this level is not the most complex one — it is the one with the fewest unnecessary components and the clearest reasoning for every decision.\n\nYou have completed the Cloud & Infrastructure prerequisite track. You are ready for Track 1. The cloud foundation you now carry — from understanding what the cloud actually is, through building production-ready infrastructure, to designing resilient multi-region systems with governance at scale — is what the Infracodebase University curriculum is built on.\n\nOpen Track 1: Welcome & Orientation and begin the program.",
          exercise: {
            title: "Full Architecture Design",
            description: "Design a complete production cloud architecture addressing resilience, security, cost, governance, and observability. Document every decision and its tradeoffs."
          },
          artifact: {
            title: "Tier 3 Capstone Architecture",
            description: "A complete production cloud architecture with documented decisions across all five expert areas."
          },
          validationChecklist: [
            "Multi-AZ deployment with automatic failover",
            "Multi-region architecture with defined RTO and RPO",
            "Circuit breakers and retry logic for all service dependencies",
            "Chaos engineering plan for resilience validation",
            "Defense-in-depth: network segmentation, least-privilege IAM, encryption everywhere",
            "Zero-trust networking between services",
            "Vulnerability management and security scanning in CI/CD",
            "Incident response runbook for at least two threat scenarios",
            "Pricing model selection with justification",
            "Right-sizing decisions with utilization targets",
            "Tagging strategy for full cost attribution",
            "Landing zone design with account / subscription hierarchy",
            "Policy guardrails for security and compliance",
            "IaC for all infrastructure with full CI/CD pipeline",
            "SLOs defined for availability and latency",
            "Dashboards, alerting, and on-call runbooks",
            "Distributed tracing across all services"
          ]
        }
      ]
    }
  ]
};
