import { HandsOnTrack } from "./handsOnData";

export const handsOnPrereqTracks: HandsOnTrack[] = [
  {
    id: "prereq-1-hands-on",
    trackNumber: 0,
    title: "Hands-on Training: Cloud Foundations",
    description: "Deploy your first real cloud environment — a public entry point, private application compute, storage, and least-privilege identity — step by step.",
    level: "Beginner",
    curriculumTrackId: "prereq-foundations",
    color: "hsl(213, 53%, 25%)",
    accentColor: "hsl(213, 53%, 90%)",
    moduleCount: 2,
    estimatedHours: 2.5,
    modules: [
      {
        id: "prereq1-m1",
        title: "Deploy and Separate Your First Cloud Environment",
        sections: {
          whyThisMatters: `Your first cloud deployment teaches you two things simultaneously: how to create infrastructure, and why structure matters from the start.

When you deploy a single server with a public IP, the application works — but everything is exposed. The entry point and the application are the same thing. There is no separation, no controlled path, no ability to scale or secure independently.

This module takes you from that starting point to a properly separated architecture: a public load balancer accepting traffic from the internet, and a private application server that is never directly reachable. This is the structural pattern every production system uses.

The goal is not just to build infrastructure. It is to understand why each separation decision matters — so that when you encounter a system that lacks this structure, you can identify what is wrong and fix it.`,

          coreConcepts: `Every infrastructure environment is built from five core categories:

- Compute: something runs code — virtual machines, containers, serverless functions
- Storage: something stores data — object storage, block disks, databases
- Networking: something connects components and controls traffic — virtual networks, subnets, routing, load balancers, firewalls
- Identity and Access: something determines who or what is allowed to do what — users, service accounts, roles, policies
- Observability: something helps you understand system behavior — metrics, logs, traces, dashboards, alerts

**Public vs Private Infrastructure**

Modern systems are designed around controlled exposure. Most components should not be reachable from the internet.

Public infrastructure accepts or supports external access: internet-facing load balancers, public API gateways, CDN edges. These are hardened specifically because they face the public internet.

Private infrastructure supports internal system behavior without direct public exposure: application servers, internal microservices, databases. These communicate only with other internal resources or through tightly controlled paths.

**Request Flow**

A user entering a website URL triggers a sequence that touches every infrastructure category:
1. The user's browser sends a DNS query to resolve the domain name
2. The request is routed to a public endpoint — often a load balancer
3. The load balancer selects a healthy application server and forwards the request
4. The application server processes the request — compute doing its job
5. The application reads from or writes to a database or storage as needed
6. The response travels back through the load balancer to the user
7. Metrics and logs capture the behavior for debugging and monitoring`,

          engineeringReflection: `**Before:**

- You provision a server and give it a public IP
- Anyone can reach port 22 and your application port directly
- There is no separation between the entry point and the application
- If you need to scale, every instance needs its own public IP
- Debugging means guessing which of many open ports is the problem

**After:**

- A load balancer holds the public IP; your server has only a private IP
- Port 22 is closed to the internet; access is through a bastion or VPN only
- The entry point and the application are separate layers with separate responsibilities
- Scaling means adding instances behind the load balancer — the public IP never changes
- Debugging starts at the load balancer and moves inward, one layer at a time`,

          stepByStep: `**Scenario:** You need to deploy a simple web application so it is reachable from the internet, then restructure it so the application server is no longer publicly exposed.

**Step 1 — Define your environment before touching any tool**

Write a plain-language description of what you are about to build:

👉 "A public-facing web application with one compute resource, one storage location for logs, and a clear path from the internet to the application."

Answer these questions first:
- What does the application do?
- What port does it listen on?
- What should be reachable from the internet and what should not?

**Step 2 — Provision compute in a public subnet**

Create a virtual machine in a public subnet with a public IP assigned.

👉 provision compute: type=t3.micro, subnet=public-subnet-a, public_ip=true

Verify it exists and is running before proceeding. A created resource is not the same as a running application.

**Step 3 — Deploy and verify the application**

Install your application on the compute resource. Confirm it is running and listening on the correct port.

👉 curl http://<public-ip>:<port> → expect a valid response

If you receive no response: check that the application process is running, that the port matches your security group rule, and that the security group is attached to the correct resource.

**Step 4 — Observe what is wrong with this setup**

The application is working — but the server is directly public. Note what this means:
- The application port is open to the entire internet
- SSH or RDP is likely also exposed
- There is no layer to absorb traffic spikes or route around failures
- Anyone who finds the IP can attempt to reach the application directly

This is the problem you are about to fix.

**Step 5 — Introduce a load balancer and move compute to a private subnet**

Create a load balancer in the public subnet. Create a new compute resource in a private subnet (no public IP). Register the private compute resource as a target in the load balancer.

👉 provision load_balancer: type=application, subnet=public-subnet-a, internet_facing=true
👉 provision compute: type=t3.micro, subnet=private-subnet-a, public_ip=false
👉 register target: load_balancer=<lb-name>, target=<private-instance-id>, port=<app-port>

**Step 6 — Verify the new architecture**

Send a request to the load balancer DNS name. Confirm the application responds.

👉 curl http://<load-balancer-dns>:<port> → expect same valid response

Then confirm the private instance has no public IP and is unreachable directly from the internet. The only path to it is through the load balancer.`,

          handsOnExercise: `Deploy a simple web application to a public subnet with a public IP. Verify it is reachable. Then restructure the architecture:

1. Introduce a load balancer in the public subnet
2. Move the application to a private subnet with no public IP
3. Register the private instance as a target in the load balancer
4. Verify the application is reachable only through the load balancer
5. Confirm the private instance is not directly reachable from the internet
6. Record the request flow from the internet to the application through the new architecture`,

          requiredArtifact: `**Lab 1 Artifact:** A simple working environment including one compute resource, one public access path, and a description of the request flow from internet to application.

**Lab 2 Artifact:** An updated architecture with one public entry component (load balancer), one private application layer, and a verified traffic flow between them.`,

          validationChecklist: [
            "Compute resource is provisioned and running",
            "Application is deployed and responding on the correct port",
            "Load balancer is created in a public subnet and is internet-facing",
            "Application compute is in a private subnet with no public IP",
            "Application responds when accessed through the load balancer DNS name",
            "Application is NOT directly reachable from the internet",
            "You can describe the full request flow from user to application",
            "You understand why the separation between public entry and private compute matters"
          ],

          failureAndDebugging: `**Common issues:**

- Application not running: the compute resource exists but the application process was never started. Check the process list and application logs.
- Wrong port exposed: the security group allows traffic on port 80 but the application listens on port 3000. Ports must match end-to-end.
- Public path misconfigured: the load balancer target group health check fails because the health check path returns a 404. Verify the health check endpoint exists and returns 200.
- Machine exists but serves nothing: created infrastructure is not the same as a functioning application path. Each layer must be correct independently.
- Load balancer not routing: the target instance is registered but unhealthy. Check that the security group on the private instance allows traffic from the load balancer's security group on the application port.`,

          modificationExercise: `Modify your architecture to add a second private compute instance in a different availability zone. Register both instances as targets in the load balancer.

Observe:
- How traffic distributes between the two instances
- What happens when you stop one instance — does the load balancer route around it?
- How this changes your availability model`,

          knowledgeCheck: {
            question: "Why should application servers typically be placed in private subnets rather than public subnets?",
            options: [
              "To reduce memory usage on the server",
              "To prevent direct exposure to the public internet and reduce attack surface",
              "To make backups run faster",
              "To replace the need for a load balancer"
            ],
            correctAnswer: 1
          }
        }
      },
      {
        id: "prereq1-m2",
        title: "Storage, Identity, and System Validation",
        sections: {
          whyThisMatters: `Your application can run and respond to requests, but it cannot yet store data or prove it has permission to access anything. These are not optional features — they are fundamental architectural layers.

Storage determines where your application's data lives, how it persists, and what happens when compute resources are replaced. Identity determines what your application is allowed to do — and equally importantly, what it is not allowed to do.

Without storage, your application loses everything when the server restarts. Without identity, your application either cannot access the services it needs, or has far more access than it should — both are failures.

This module adds storage and identity to your environment, then walks through a complete system validation to confirm every layer behaves as intended.`,

          coreConcepts: `**Infrastructure as Code**

Cloud resources can be created manually through a console. But manual infrastructure has a fundamental problem: the only record of what was built lives in someone's browser history and memory. No one else can review it. No one can reproduce it. No one can audit what changed and when.

Infrastructure as code means describing infrastructure in files and applying those files to create or update real resources. A tool reads your declared desired state and makes the real environment match it. IaC gives you:

- Repeatability: the same definition produces the same infrastructure every time
- Reviewability: another engineer can read a pull request and understand exactly what will change
- Version control: every infrastructure change is tracked with an author, a timestamp, and a reason
- Drift detection: you can compare the desired state in code to the actual state in the cloud
- Safer evolution: plan a change, review the plan, apply it

**Debugging Beginner Infrastructure Problems**

Most beginner problems fall into four categories:

- Compute problems: the application or service is not running. Check: is the process started? Is the service enabled? Is the right software installed?
- Networking problems: traffic does not reach the intended component. Check: is the route correct? Is the firewall rule open? Is the component listening on the right port?
- Identity problems: the system reaches a service but is not authorized to act. Check: what identity is being used? What action is being attempted? Is that action included in the policy?
- Configuration problems: the environment exists but is not configured as expected. Check: are environment variables set? Are config files in the right location? Are connections pointing at the right endpoints?

Anti-pattern: Making multiple changes at once. You no longer know which change helped or harmed the system. Make one change, observe the result, then proceed.`,

          engineeringReflection: `**Before:**

- The application uses the same credentials as the operator
- Storage is provisioned without considering who or what should access it
- There is no defined boundary between what the application can read and what it can write
- A leaked credential gives an attacker full access to everything the operator can reach
- Debugging access problems means guessing which permission is missing

**After:**

- The application uses a dedicated role with exactly the permissions it needs
- Storage access is defined: the application can read from this bucket and nothing else
- The boundary is documented and reviewable — another engineer can audit it in 30 seconds
- A leaked application credential gives an attacker only what the application role allows
- Debugging access problems starts with "what is the identity, what action, what resource"`,

          stepByStep: `**Scenario:** Your application needs to read uploaded files from object storage. You will provision the storage, create a scoped role, and validate that the application can read — and cannot write or delete.

**Step 1 — Provision object storage**

Create a storage bucket for application uploads.

👉 provision storage: type=object, name=app-uploads-<env>, access=private

Verify the bucket exists and is private — not publicly accessible. Any misconfiguration here is a data exposure risk.

**Step 2 — Create a least-privilege application role**

Create a role that allows only the specific action the application needs.

👉 create role: name=app-read-role
👉 attach policy: role=app-read-role, effect=Allow, action=storage:GetObject, resource=app-uploads-<env>/*

Do not add write or delete permissions. The application does not need them. If you are unsure whether to add a permission, the answer is no.

**Step 3 — Assign the role to your compute resource**

Attach the role to the application server so it can assume the role automatically — no hardcoded credentials.

👉 assign role: role=app-read-role, target=<private-instance-id>

**Step 4 — Validate read access works**

From the application server, attempt to read a test file from the bucket.

👉 storage get: bucket=app-uploads-<env>, key=test.txt → expect success

**Step 5 — Validate write access is denied**

From the same server, attempt to write to the bucket.

👉 storage put: bucket=app-uploads-<env>, key=test-write.txt, body="test" → expect AccessDenied

This denial is correct. Confirm it and document it. A denied action you intended to block is a passing test, not a failure.

**Step 6 — Run full system validation**

Walk through the complete system:
- What is public? → only the load balancer
- What is private? → the compute resource and the storage bucket
- Where does the application run? → on the private compute resource
- What can the application access? → read-only access to the uploads bucket
- What happens if the compute resource is replaced? → storage persists; the role is re-attached`,

          handsOnExercise: `Add storage and identity to your existing environment:

1. Provision an object storage bucket with private access
2. Create a least-privilege role that allows only read access to that bucket
3. Assign the role to your application compute resource
4. Verify the application can read from the bucket
5. Verify the application cannot write to or delete from the bucket
6. Run a full system validation covering every layer of your architecture`,

          requiredArtifact: `**Lab 3 Artifact:** An updated system design including one storage component, its type justification, and an explanation of how the application interacts with it.

**Lab 4 Artifact:** A short access design: one identity, one allowed action, one intentionally excluded action, and a one-sentence explanation of why the boundary matters.`,

          validationChecklist: [
            "Object storage bucket is provisioned and private",
            "Application role has read-only access to the storage bucket",
            "No write or delete permissions are granted to the application role",
            "Application can successfully read a file from the bucket",
            "Application is denied when attempting to write to the bucket",
            "No hardcoded credentials exist anywhere in the system",
            "You can explain what is public, what is private, and why",
            "You can walk through the full request flow from user to application to storage",
            "You can identify and categorize infrastructure problems into compute, networking, identity, or configuration",
            "System validation confirms every layer behaves as intended"
          ],

          failureAndDebugging: `**The Four Problem Categories:**

**Compute problems:** The application or service is not running. Check: is the process started? Is the service enabled? Is the right software installed? A machine that exists is not the same as a working application.

**Networking problems:** Traffic does not reach the intended component. Check: is the route correct? Is the firewall rule open? Is the component listening on the right port? Networking problems are often invisible — the request disappears silently.

**Identity problems:** The system reaches a service but is not authorized to act. Check: what identity is being used? What action is being attempted? Is that action included in the policy? If the application can reach storage over the network but gets AccessDenied, this is an identity problem, not a networking problem.

**Configuration problems:** The environment exists but is not configured as expected. Check: are environment variables set? Are config files in the right location? Are connections pointing at the right endpoints?

**Anti-pattern:** Making multiple changes at once. You no longer know which change helped or harmed the system. Make one change, observe the result, then proceed.`,

          modificationExercise: `Add a second storage bucket for application logs. Create a separate role that allows write-only access to the logs bucket. Assign both roles to the application.

Observe:
- How role separation creates clear permission boundaries
- How each bucket has a distinct access pattern (read vs write)
- How the application's total permissions are the sum of its assigned roles`,

          knowledgeCheck: {
            question: "If your application can reach a storage service over the network but receives an AccessDenied error, what type of problem is this?",
            options: [
              "A compute problem — the application is not running correctly",
              "A networking problem — the route is misconfigured",
              "An identity problem — the application lacks the required permission",
              "A configuration problem — the environment variables are wrong"
            ],
            correctAnswer: 2
          }
        }
      }
    ]
  },
  {
    id: "prereq-2-hands-on",
    trackNumber: 0,
    title: "Hands-on Training: Intermediate Cloud Engineering",
    description: "Write real Terraform, design multi-AZ networks, implement production security, build CI/CD pipelines, and set up structured observability with SLOs.",
    level: "Intermediate",
    curriculumTrackId: "prereq-intermediate",
    color: "hsl(211, 61%, 33%)",
    accentColor: "hsl(211, 61%, 90%)",
    moduleCount: 2,
    estimatedHours: 3.5,
    modules: [
      {
        id: "prereq2-m1",
        title: "Infrastructure as Code and Production Networking",
        sections: {
          whyThisMatters: `In Tier 1 you understood what IaC is and why it matters. Now you write it. Terraform is the most widely used cross-cloud IaC tool. It works with AWS, Azure, GCP, and hundreds of other providers through a consistent workflow. Your Terraform skills transfer across cloud boundaries.

But writing Terraform is only half of this module. The other half is designing a network architecture that can survive real production conditions — which means deploying across multiple availability zones, separating public from private layers correctly, and controlling how traffic flows between your resources and cloud services.

Manual infrastructure has a fundamental problem: the only record of what was built lives in someone's browser history and memory. No one else can review it. No one can reproduce it. No one can audit what changed and when. IaC solves every one of these problems.`,

          coreConcepts: `**Terraform Fundamentals**

A provider is a plugin that Terraform uses to interact with a specific cloud or service API. A resource block declares a single piece of infrastructure. Variables let you parameterize your configuration so the same code creates resources in different environments. Outputs expose information about created resources.

Terraform maintains a state file that maps your configuration to real infrastructure. Storing state remotely — in an S3 bucket with DynamoDB locking, Azure Blob, or GCS — is required for team collaboration. Never store state locally in a shared project.

terraform plan shows exactly what will change. terraform apply executes the plan. Always review the plan before applying, especially in production.

**Environment Separation**

Most organizations run multiple environments: development, staging, and production. Each should be isolated: separate accounts, separate VPCs, separate state files, separate access controls. Shared environments cause shared blast radius.

**Configuration Drift**

Drift happens when real infrastructure diverges from the desired state in code — a manual console change, a hotfix applied without updating the code. terraform plan detects drift by comparing state to real infrastructure.

**Multi-AZ VPC Design**

A single availability zone is a single point of failure. Real systems deploy across at least two AZs. Each AZ has its own public and private subnets. Load balancers distribute traffic across AZs.

**Private Endpoints**

Private endpoints allow you to access cloud provider services through a private network path inside your VPC rather than over the public internet. This keeps traffic off the internet and satisfies compliance requirements.

**Network Flow Logs**

Logs capturing all network flow data: source IP, destination IP, protocol, port, and whether traffic was accepted or rejected. Essential for debugging connectivity problems and meeting security audit requirements.`,

          engineeringReflection: `**Before:**

- Infrastructure is created by clicking through a console
- No one else can review what was built or how
- Reproducing the environment in a new region takes days
- A change made at 11pm by one engineer is invisible to everyone else
- Drift accumulates silently — the console no longer matches what anyone believes exists

**After:**

- Infrastructure is declared in code and applied through a reviewed plan
- A pull request shows every resource that will change before it changes
- The same configuration deploys identically to dev, staging, and prod
- Every change has an author, a timestamp, and a reason in version control
- terraform plan detects drift immediately — the code and reality stay synchronized`,

          stepByStep: `**Scenario:** You have been manually creating resources. You need to move to IaC and redesign your network for multi-AZ production use.

**Step 1 — Initialize a Terraform project with remote state**

Create a Terraform configuration directory. Add a provider block and configure a remote backend with state locking.

👉 terraform init → confirm providers downloaded and remote backend connected

Verify the state file is stored remotely, not locally. A local state file in a shared project will cause conflicts and data loss.

**Step 2 — Define your multi-AZ VPC**

Write resource blocks for: one VPC, two public subnets (one per AZ), two private subnets (one per AZ), one internet gateway, one NAT gateway per public subnet, route tables for each subnet type.

👉 terraform plan → review the output carefully. Confirm the resource count matches your intent before applying.

**Step 3 — Add a private endpoint for object storage**

Add a VPC endpoint resource so your private subnets can reach object storage without traversing the internet.

👉 provision vpc_endpoint: service=storage, type=gateway, vpc=<vpc-id>, route_tables=[private-rt-a, private-rt-b]

**Step 4 — Apply and validate**

👉 terraform apply → confirm all resources created

Validate: a resource in a private subnet can reach object storage; that same resource cannot reach the internet directly (only through NAT).

**Step 5 — Introduce a variable and test environment separation**

Add an input variable for the environment name. Create a dev.tfvars and prod.tfvars file. Confirm that applying with different var files produces separate, isolated state.

👉 terraform plan -var-file=dev.tfvars → expect dev-prefixed resources
👉 terraform plan -var-file=prod.tfvars → expect prod-prefixed resources, different state file`,

          handsOnExercise: `Write a complete Terraform configuration that includes:

1. A provider block for your chosen cloud
2. A multi-AZ VPC with public and private subnets
3. Internet gateway and NAT gateway with proper routing
4. A VPC endpoint for object storage
5. At least two input variables (environment name, region)
6. At least two outputs (VPC ID, subnet IDs)
7. Remote state backend with locking

Verify: terraform init, plan, and apply all succeed cleanly.`,

          requiredArtifact: `A Terraform configuration with at minimum: one provider block, three resource blocks, two input variables, and two outputs. The plan must run cleanly with no errors. State must be stored remotely.`,

          validationChecklist: [
            "terraform init runs without errors",
            "terraform plan shows only the expected resources",
            "terraform apply creates all resources",
            "State is stored remotely, not in a local file",
            "Multi-AZ VPC has public and private subnets in at least two AZs",
            "Private subnets route outbound traffic through NAT gateway",
            "VPC endpoint allows private access to object storage",
            "Environment separation works with different var files",
            "terraform destroy removes all resources cleanly"
          ],

          failureAndDebugging: `**Common issues:**

- State lock not released after a failed apply: run terraform force-unlock <lock-id>. This happens when an apply is interrupted. Always check the lock status before force-unlocking.
- Plan shows resource replacement instead of update: check if you changed an immutable attribute (like a subnet's AZ). Some attributes require resource recreation — this is expected, not a bug.
- NAT gateway not routing: verify the private route table has a 0.0.0.0/0 route pointing to the NAT gateway, not the internet gateway. This is the most common multi-AZ networking mistake.
- VPC endpoint not working: verify the endpoint is associated with the correct route tables and that the endpoint policy allows the required actions.`,

          modificationExercise: `Add a second VPC in a different region and configure VPC peering between them. Verify that resources in one VPC can communicate with resources in the other using private IPs.

Observe:
- How peering changes your routing tables
- Whether CIDR blocks overlap (they must not for peering to work)
- How this pattern could extend to a multi-region architecture`,

          knowledgeCheck: {
            question: "Why should Terraform state be stored remotely rather than locally?",
            options: [
              "Remote state is faster to read",
              "Local state cannot track resource changes",
              "Remote state enables team collaboration and prevents conflicts through locking",
              "Remote state automatically fixes drift"
            ],
            correctAnswer: 2
          }
        }
      },
      {
        id: "prereq2-m2",
        title: "Security, CI/CD, and Observability",
        sections: {
          whyThisMatters: `A system that works is not the same as a system that is production-ready. Production readiness means your secrets are managed, your data is encrypted, your deployments are automated and reversible, and you have visibility into whether the system is healthy — not just a guess that it is.

This module covers the three pillars of production readiness: security (protecting what you have built), CI/CD (automating how you change it), and observability (understanding how it behaves). Each one addresses a category of risk that manual, ad-hoc approaches leave exposed.

Without secrets management, a single leaked environment variable gives an attacker access to your database. Without CI/CD, every deployment is a manual, error-prone process that cannot be reliably rolled back. Without observability, the first sign of a problem is a user complaint.`,

          coreConcepts: `**Identity and Access at Production Scale**

Permissions are attached to roles. Roles are assigned to identities. No individual identity gets permissions directly. Federation means cloud IAM trusts your corporate identity provider: employees authenticate with existing credentials and receive temporary cloud access tokens.

**Data Security and Encryption**

All sensitive data should be encrypted at rest using customer-managed keys. All data in transit should be encrypted using TLS. Database passwords, API keys, and certificates must never be stored in code — use cloud secrets managers with automatic rotation.

**CI/CD Pipeline Architecture**

Every code commit triggers an automated pipeline: format check, validation, security scan, plan, manual approval for production, apply. Artifact management ensures deployments are reproducible.

**Deployment Strategies**

- Rolling: new versions deployed one instance at a time; slower rollback
- Blue-Green: two identical environments; instant traffic switch and rollback
- Canary: small percentage of traffic to new version; gradual increase if healthy
- Feature Flags: decouple code deployment from feature activation

**Observability: The Three Pillars**

- Metrics: numeric measurements over time — CPU, request rate, error rate, latency percentiles
- Logs: records of discrete events with context — user ID, error message, request path
- Traces: follow a single request through multiple services to find where latency or errors originate

**Service Level Objectives**

An SLO is a target for system reliability: 99.9% of requests complete in under 200ms. SLOs give teams a quantitative definition of "working well enough." Error budgets tell you when to slow down and focus on reliability.`,

          engineeringReflection: `**Before:**

- Database passwords are stored in environment variables in the application server
- Deployments are manual: SSH in, pull code, restart the process
- There is no visibility into whether the system is healthy until a user reports a problem
- Logs are unstructured text — finding a specific error requires reading thousands of lines
- "The system is working" means no one has complained recently

**After:**

- All secrets are stored in a secrets manager with rotation enabled; applications fetch them at runtime
- Every code commit triggers a pipeline: lint → security scan → plan → staging deploy → approval → production deploy
- Dashboards show request rate, error rate, and latency percentiles in real time
- Structured logs are queryable: find all 500 errors from service X for user Y in the last hour in seconds
- "The system is working" means it is within its defined SLO — a number, not a feeling`,

          stepByStep: `**Scenario:** Your Terraform-managed environment needs secrets management, a CI/CD pipeline, and an observability stack before it is production-ready.

**Step 1 — Move secrets out of environment variables**

Identify every secret currently hardcoded or stored in an environment variable. Create a secrets manager entry for each one.

👉 create secret: name=db-password, value=<redacted>, rotation=enabled

Update your application to fetch secrets at runtime from the secrets manager. Remove all plaintext secrets from code, config files, and Terraform variable files. Confirm no secrets appear in your git history.

**Step 2 — Encrypt all data stores**

Enable encryption at rest for your database and object storage using a customer-managed key.

👉 enable encryption: resource=database, key=<cmk-id>
👉 enable encryption: resource=storage-bucket, key=<cmk-id>

Verify: inspect the resource configuration and confirm encryption is enabled.

**Step 3 — Build a CI/CD pipeline for your Terraform code**

Create a pipeline with these stages in order:

1. Format check: terraform fmt -check — fails if code is not formatted
2. Validation: terraform validate — fails if configuration is invalid
3. Security scan: run a static analysis tool against the Terraform plan
4. Plan: terraform plan -out=tfplan — save the plan artifact
5. Manual approval gate for production
6. Apply: terraform apply tfplan

The pipeline should run on every pull request. Apply to production only after human approval.

**Step 4 — Implement a blue-green deployment for the application**

Create two identical target groups behind your load balancer: blue (current) and green (new version). Deploy the new version to green. Test green with 5% of traffic. If healthy after 10 minutes, shift 100% to green. Keep blue warm for 30 minutes.

👉 shift traffic: from=blue, to=green, percentage=5 → monitor error rate
👉 shift traffic: from=blue, to=green, percentage=100 → confirm success

**Step 5 — Set up structured logging and define an SLO**

Configure your application to emit structured JSON logs with fields: timestamp, level, service, request_id, status_code, latency_ms. Ship logs to your log aggregation service.

Define your SLO: 99.9% of requests will return a 2xx or 3xx response within 500ms over a rolling 30-day window. Create an alert that fires when the error budget burn rate exceeds 2x for more than 1 hour.

**Step 6 — Validate the full production-ready system**

Run through the Tier 2 capstone checklist:
- Secrets manager in use, no plaintext secrets anywhere
- Encryption at rest and in transit on all data stores
- CI/CD pipeline runs on every commit
- Blue-green deployment works and rollback takes under 60 seconds
- SLO defined, dashboard live, alert configured`,

          handsOnExercise: `Take your Tier 1 system and evolve it into a production-ready architecture:

1. Move all secrets to a secrets manager with rotation
2. Enable encryption at rest on all data stores
3. Build a CI/CD pipeline with format, validate, scan, plan, approve, apply stages
4. Implement a blue-green deployment with traffic shifting
5. Configure structured logging with queryable fields
6. Define an SLO and create an alert on error budget burn rate`,

          requiredArtifact: `A production-ready architecture that includes: multi-AZ VPC, auto-scaling application tier, managed database with failover, encryption at rest and in transit, secrets manager, least-privilege IAM, CI/CD pipeline, structured logging, and a defined SLO with alerting.`,

          validationChecklist: [
            "Secrets manager stores all credentials — no plaintext secrets anywhere",
            "Encryption at rest is enabled on all data stores using customer-managed keys",
            "Encryption in transit (TLS) is enforced for all service communication",
            "CI/CD pipeline runs format check, validation, security scan, plan, and apply",
            "Pipeline requires manual approval before production apply",
            "Blue-green deployment works and rollback takes under 60 seconds",
            "Structured JSON logs include timestamp, level, service, request_id, status_code, latency_ms",
            "SLO is defined with a specific target (e.g., 99.9% of requests under 500ms)",
            "Alert fires when error budget burn rate exceeds threshold",
            "Every component has a documented reason for existing"
          ],

          failureAndDebugging: `**Common issues:**

- Pipeline fails on security scan: read the finding carefully. Most are fixable in under 5 minutes — an open security group, an unencrypted bucket, a hardcoded secret. These are the exact problems the scan is designed to catch.
- Blue-green traffic shift causes errors: check target group health checks are passing on green before increasing traffic. A failing health check means the new version is not ready.
- SLO alert fires immediately: recalibrate the burn rate threshold. It is correct to start strict and loosen, not the reverse. An alert that never fires is as useless as one that always fires.
- Secrets rotation breaks the application: ensure your application re-fetches secrets periodically, not only at startup. A rotated secret that the application never re-reads causes silent failures.`,

          modificationExercise: `Add a canary deployment stage to your pipeline. Before shifting all traffic to green, route 5% of traffic to a canary target group and monitor error rate for 10 minutes.

Observe:
- How canary monitoring catches issues that pre-deployment tests miss
- How the rollback decision changes when you have real traffic data
- How this fits with your SLO — does the canary traffic count toward your error budget?`,

          knowledgeCheck: {
            question: "What is the primary purpose of a Service Level Objective (SLO)?",
            options: [
              "To set the maximum number of servers a system can use",
              "To provide a quantitative target for system reliability that teams can measure against",
              "To replace monitoring dashboards with automated alerts",
              "To eliminate the need for incident response"
            ],
            correctAnswer: 1
          }
        }
      }
    ]
  },
  {
    id: "prereq-3-hands-on",
    trackNumber: 0,
    title: "Hands-on Training: Expert Cloud Architecture",
    description: "Design and validate multi-region resilient architectures, implement governance at organizational scale, enforce DevSecOps in CI/CD, and deploy cloud-native systems with Kubernetes.",
    level: "Advanced",
    curriculumTrackId: "prereq-expert",
    color: "hsl(155, 85%, 18%)",
    accentColor: "hsl(155, 85%, 90%)",
    moduleCount: 2,
    estimatedHours: 4,
    modules: [
      {
        id: "prereq3-m1",
        title: "Resilience, Multi-Region, and Well-Architected Design",
        sections: {
          whyThisMatters: `Everything fails eventually. Hardware fails. Networks partition. Software has bugs. Dependencies go down. Resilient systems do not prevent failure — they are designed to survive it. Your goal is to make failure boring: detected quickly, contained to a small blast radius, and recovered automatically.

If your system runs in one region and that region has a major outage, your system is down. There is no workaround, no failover, no recovery plan that can execute faster than the provider can restore the region. Multi-region architecture is the only way to survive regional failures.

AWS, Azure, and GCP all publish Well-Architected Frameworks. Understanding these frameworks gives you a systematic way to evaluate any architecture — including one you are designing or reviewing. The five pillars organize cloud architecture thinking around operational excellence, security, reliability, performance efficiency, and cost optimization.`,

          coreConcepts: `**Designing for Failure**

- RTO (Recovery Time Objective): how long can the system be unavailable before it causes unacceptable business impact?
- RPO (Recovery Point Objective): how much data loss is acceptable?

Your RTO and RPO determine your architecture. A one-hour RTO with a one-day RPO can use warm standby. A 30-second RTO with zero RPO requires active-active multi-region with synchronous replication.

**Circuit Breakers**

A circuit breaker stops calling a failing dependency and returns an error immediately rather than waiting for a timeout. This prevents cascading failures across your system.

**Multi-Region Architecture**

- Active-Passive: all traffic in one region; a second region kept warm with replicated data. Simpler but has non-zero failover time.
- Active-Active: traffic in multiple regions simultaneously. Complex but provides zero-downtime failover.

**Disaster Recovery Strategies**

- Backup and Restore: RTO is hours. Acceptable for non-critical systems.
- Pilot Light: minimal resources run continuously. RTO is 10–60 minutes.
- Warm Standby: scaled-down but functional system. RTO is minutes.
- Multi-Site Active-Active: full production in multiple regions. RTO and RPO near-zero.

**The Well-Architected Framework — Five Pillars**

1. Operational Excellence: treat operations as code, make frequent small reversible changes, learn from failures
2. Security: apply security at every layer, enable traceability, automate best practices, protect data everywhere
3. Reliability: test recovery procedures, scale horizontally, manage change through automation
4. Performance Efficiency: use the right resource type, use managed services, go global in minutes
5. Cost Optimization: implement FinOps, adopt a consumption model, measure efficiency, eliminate waste`,

          engineeringReflection: `**Before:**

- The system runs in one region; a regional failure means full downtime
- Recovery is manual: someone gets paged at 2am and figures it out under pressure
- RTO and RPO are theoretical — no one has ever tested whether they are achievable
- A slow downstream dependency causes your service to slow down and eventually fail
- "High availability" means the last outage was a long time ago

**After:**

- The system runs in two regions; traffic shifts automatically when health checks fail
- Recovery is a runbook: documented, rehearsed, and takes minutes not hours
- RTO and RPO are measured — the last DR drill confirmed them under realistic conditions
- A slow downstream dependency hits a circuit breaker; your service returns a degraded response and stays up
- "High availability" means you have a measured SLO, you know your error budget, and you have tested failure`,

          stepByStep: `**Scenario:** Your single-region production system needs to survive a regional outage. You will implement active-passive multi-region failover and run a DR drill.

**Step 1 — Implement a circuit breaker for a downstream dependency**

Identify the downstream dependency most likely to cause cascading failure. Add a circuit breaker with these parameters: open after 50% failure rate over 10 requests; stay open for 30 seconds; attempt one test request before closing.

👉 Configure: circuit_breaker: threshold=0.5, window=10, timeout=30s, half_open_max=1

Test it: disable the downstream dependency and send 15 requests. Confirm the circuit opens after 5 failures and subsequent requests fail fast.

**Step 2 — Provision a passive region**

In a second region, provision a minimal version of your environment: the VPC, subnets, and database replica.

👉 provision replica: source=primary-db, region=secondary-region, type=read-replica

Do not route any production traffic to the secondary region yet. It is warm standby only.

**Step 3 — Configure global DNS with health-check-based failover**

Create a health check that monitors your primary region's load balancer endpoint. Create a DNS failover record set.

👉 create dns_record: type=failover, primary=<primary-lb-dns>, secondary=<secondary-lb-dns>, health_check=<primary-health-check-id>

**Step 4 — Run a DR failover drill**

Simulate a primary region failure by disabling the primary load balancer. Measure:
- Time until the DNS health check detects failure
- Time until DNS TTL expires and clients resolve to the secondary region
- Time until the secondary region is handling traffic and returning valid responses
- Whether any data was lost (RPO)

Record your actual RTO and RPO. Compare them to your targets.

**Step 5 — Evaluate against the Well-Architected Framework**

Score your system against each of the five pillars. For each one, write one thing you have implemented well and one gap to address:

- Operational Excellence: do you have runbooks? Are operations automated?
- Security: is least privilege enforced? Is all data encrypted?
- Reliability: is your RTO/RPO tested? Do you have circuit breakers?
- Performance Efficiency: are resources right-sized? Are you using managed services?
- Cost Optimization: do you have tagging? Have you identified idle resources?`,

          handsOnExercise: `Implement multi-region resilience for your production system:

1. Add circuit breakers to all downstream dependencies
2. Provision a passive region with database replication
3. Configure DNS-based failover with health checks
4. Run a complete DR failover drill and measure actual RTO and RPO
5. Evaluate your architecture against all five Well-Architected pillars
6. Document gaps and create a remediation plan`,

          requiredArtifact: `A multi-region architecture design document including: circuit breaker configuration, passive region setup, DNS failover configuration, DR drill results with measured RTO and RPO, and a five-pillar Well-Architected evaluation with gaps documented.`,

          validationChecklist: [
            "Circuit breaker is configured and tested — opens on failure, fails fast",
            "Passive region is provisioned with database replication",
            "DNS failover is configured with health checks on primary region",
            "DR failover drill has been executed with measured results",
            "Actual RTO and RPO match or are within acceptable range of targets",
            "Well-Architected evaluation completed for all five pillars",
            "At least one gap per pillar is identified with a remediation plan",
            "DR runbook is documented and could be followed by another engineer"
          ],

          failureAndDebugging: `**Common issues:**

- DNS failover takes longer than expected: check your TTL. It should be 60 seconds or less for failover records. High TTLs mean clients continue resolving to the failed region long after health checks detect the failure.
- Secondary region cannot reach the database replica: check the security group allows replication traffic from the primary region CIDR. Cross-region replication requires explicit network rules.
- Circuit breaker opens but never closes: verify your half-open test request is reaching a healthy downstream endpoint. If the dependency is still down, the circuit breaker correctly stays open.
- DR drill shows data loss: check replication lag. Asynchronous replication always has some lag. If your RPO requires zero data loss, you need synchronous replication — which has performance and cost implications.`,

          modificationExercise: `Upgrade your architecture from active-passive to active-active. Route traffic to both regions simultaneously using latency-based DNS routing.

Observe:
- How data consistency changes when both regions accept writes
- How conflict resolution works for concurrent writes to different regions
- How your cost model changes with duplicate infrastructure
- Whether the complexity is justified by your availability requirements`,

          knowledgeCheck: {
            question: "What is the primary difference between active-passive and active-active multi-region architectures?",
            options: [
              "Active-passive is more expensive to operate",
              "Active-active routes traffic to multiple regions simultaneously, while active-passive keeps one region on standby",
              "Active-passive provides better data consistency",
              "Active-active requires fewer regions to operate"
            ],
            correctAnswer: 1
          }
        }
      },
      {
        id: "prereq3-m2",
        title: "Governance, DevSecOps, and Cloud-Native Architecture",
        sections: {
          whyThisMatters: `At organizational scale, the challenge shifts from building individual systems to governing how all systems are built. Without governance, every team makes independent decisions about security, networking, logging, and access control — creating inconsistency, risk, and duplicated effort.

A landing zone is a pre-configured, governed cloud environment that new workloads land in. It provides a baseline of security controls, network architecture, identity configuration, logging, and policy enforcement. Every new account or project inherits the landing zone.

Security should be automated in the pipeline, not bolted on after deployment. Every pull request should trigger static analysis, container scanning, and secret scanning. Finding a vulnerability in a pull request is orders of magnitude cheaper than finding it in production.

Cloud-native architecture — microservices, event-driven systems, Kubernetes — represents the modern approach to building scalable, resilient systems. But these patterns add distributed systems complexity that must be managed deliberately.`,

          coreConcepts: `**Landing Zones and Organizational Governance**

A landing zone provides a baseline: security controls, network architecture, identity configuration, logging, and policy enforcement. Every new account or project starts from a known-good baseline rather than a blank slate.

Service Control Policies set the maximum permissions any account can ever use — even full admin rights cannot override an SCP. These are the guardrails that make large-scale infrastructure manageable.

**FinOps and Cost Management**

Tags are key-value pairs attached to resources. Without tagging discipline, cloud bills are opaque. With consistent tagging, every dollar is attributable to a team and a reason. FinOps brings financial accountability to cloud spending.

**DevSecOps: Security in CI/CD**

Every pull request should trigger: static analysis of infrastructure code, container image scanning for known vulnerabilities, secret scanning to catch hardcoded credentials, policy validation against guardrails. Compliance as code means encoding regulatory requirements as automated checks.

**Cloud-Native Architecture**

- Microservices: independently deployable services, each owning its data
- API Gateway: single entry point for external traffic with routing, auth, rate limiting
- Event-Driven Architecture: services publish events to queues; consumers react asynchronously
- Service Mesh: TLS, retries, circuit breakers, and observability between services at the infrastructure layer

**Kubernetes in Production**

- Control plane manages the cluster; worker nodes run workloads
- Pods are the smallest deployable unit; Deployments manage pod replicas and rolling updates
- HPA scales pods based on CPU, memory, or custom metrics; Cluster Autoscaler manages nodes
- Helm packages Kubernetes manifests with templating for versioned deployments and rollbacks`,

          engineeringReflection: `**Before:**

- Every new project starts from scratch — no standard security controls, no standard networking
- Security is reviewed once a quarter in an audit; vulnerabilities live in production for months
- A Kubernetes deployment is a wall of YAML that only the person who wrote it understands
- Cloud costs are discovered monthly when the bill arrives; by then the waste has already happened
- "Governance" means a document that no one reads and no system enforces

**After:**

- Every new project lands in a pre-configured environment with security controls, logging, and network boundaries already in place
- Security runs in every pull request; a vulnerability is found in minutes and fixed before it reaches production
- A Helm chart packages the deployment; a new engineer can deploy or roll back with one command
- Cost alerts fire when spend exceeds the weekly budget; tagging shows exactly which team and service is responsible
- Governance is code: a policy that prevents unencrypted storage from being created is enforced by the system, not by a checklist`,

          stepByStep: `**Scenario:** You need to govern infrastructure across multiple teams, embed security in your pipeline, and deploy a containerized workload to Kubernetes with autoscaling.

**Step 1 — Implement a basic landing zone with policy guardrails**

Create an organizational unit structure: a root organization, a security OU, a production OU, and a development OU. Attach these service control policies to the production OU:
- Deny creation of unencrypted storage buckets
- Deny creation of publicly accessible databases
- Deny any action that disables audit logging
- Deny resource creation in regions outside your approved list

👉 create policy: name=require-encryption, effect=Deny, action=storage:CreateBucket, condition=encryption!=enabled

Test: attempt to create an unencrypted bucket in the production OU. Confirm the policy denies it.

**Step 2 — Add FinOps tagging and budget alerts**

Enforce a tagging policy: every resource must have team, environment, and service tags. Add a budget alert that fires when projected monthly spend exceeds the threshold by 20%.

👉 create budget: ou=production, threshold=<monthly-target>, alert_at=120%

Run a cost report filtered by team tag. Confirm every resource is attributable.

**Step 3 — Embed security scanning in CI/CD**

Add three security stages to your pipeline, running before the Terraform plan stage:

1. Secret scanning: scan all files for hardcoded credentials
2. IaC static analysis: scan Terraform files for misconfigurations
3. Container image scan: scan for known CVEs; fail on critical findings

If any stage fails, the pipeline stops. A failed security gate is a finding to fix, not a problem to work around.

**Step 4 — Deploy a Kubernetes workload with autoscaling**

Deploy a containerized application to a managed Kubernetes cluster using a Helm chart: a Deployment with 2 replicas, a Service, an HPA targeting 70% CPU with min=2 and max=10, and resource requests and limits.

👉 helm install app-name ./chart --set image.tag=<version> --set env=production
👉 kubectl get pods → expect 2 running pods
👉 kubectl get hpa → expect autoscaler active

**Step 5 — Simulate load and observe autoscaling**

Generate load against the application. Watch the HPA scale up pods as CPU exceeds 70%.

👉 kubectl get hpa --watch → observe replicas increasing

Remove the load and observe scale-down. Confirm the system returns to 2 replicas within 5 minutes.

**Step 6 — Complete the Expert capstone checklist**

Review your full architecture:
- Multi-region active-passive with tested RTO and RPO
- Circuit breakers on all downstream dependencies
- Landing zone with SCPs enforcing encryption and audit logging
- Security scanning in CI/CD pipeline (secrets, IaC, container images)
- FinOps tagging with full cost attribution
- Kubernetes deployment with autoscaling
- Well-Architected evaluation with gaps documented`,

          handsOnExercise: `Design and implement a complete production cloud architecture:

1. Implement a landing zone with organizational hierarchy and policy guardrails
2. Enforce FinOps tagging and set up budget alerts
3. Add secret scanning, IaC analysis, and container scanning to your CI/CD pipeline
4. Deploy a Helm-managed Kubernetes workload with HPA
5. Simulate load and verify autoscaling behavior
6. Complete the full Tier 3 capstone checklist`,

          requiredArtifact: `A complete production cloud architecture document including: landing zone design with SCPs, FinOps tagging strategy, CI/CD security pipeline configuration, Kubernetes deployment with Helm chart and HPA, load test results showing autoscaling, and the full Tier 3 capstone checklist with all items verified.`,

          validationChecklist: [
            "Landing zone organizational hierarchy is created (root, security, production, development OUs)",
            "SCPs enforce encryption, prevent public databases, and require audit logging",
            "FinOps tagging policy is enforced — every resource has team, environment, and service tags",
            "Budget alerts fire when projected spend exceeds threshold",
            "CI/CD pipeline includes secret scanning, IaC static analysis, and container image scanning",
            "Pipeline stops on critical security findings",
            "Kubernetes deployment runs with 2 replicas via Helm chart",
            "HPA scales pods based on CPU utilization",
            "Autoscaling up and down has been observed under load",
            "Full Tier 3 capstone checklist is completed and documented"
          ],

          failureAndDebugging: `**Common issues:**

- SCP blocks an action you intended to allow: check condition syntax. SCPs use AND logic for conditions — all conditions must match for the policy to apply. A missing condition may cause the SCP to be broader than intended.
- Helm chart fails with image pull error: verify the image tag exists in the container registry and the cluster has pull permissions (IAM role for the node group or service account).
- HPA shows <unknown> for CPU: metrics-server is not installed or not running. Install it before the HPA will function. Run kubectl top pods to verify metrics are flowing.
- Budget alert does not fire: check the alert threshold calculation. Most cloud providers calculate projected spend, not actual spend — if your usage pattern is variable, the projection may not trigger.
- Container scan finds critical CVEs: update the base image. Most critical CVEs are in outdated OS packages in the container base layer. Use a minimal base image (distroless, Alpine) to reduce attack surface.`,

          modificationExercise: `Add a service mesh (Istio or equivalent) to your Kubernetes cluster. Configure mutual TLS between services and observe how traffic management changes.

Observe:
- How mTLS changes your security posture — every service-to-service call is encrypted and authenticated
- How traffic routing policies let you implement canary deployments at the mesh level
- How observability improves with mesh-level metrics and tracing without application code changes`,

          knowledgeCheck: {
            question: "What is the primary purpose of a Service Control Policy (SCP) in cloud governance?",
            options: [
              "To create new cloud accounts automatically",
              "To set the maximum permissions any account in the organization can use, regardless of individual IAM policies",
              "To replace IAM roles with organization-level credentials",
              "To monitor cloud spending and generate cost reports"
            ],
            correctAnswer: 1
          }
        }
      }
    ]
  }
];
