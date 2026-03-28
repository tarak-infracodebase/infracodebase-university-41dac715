import { useTheme } from "@/contexts/ThemeContext";

const fontDisplay: React.CSSProperties = { fontFamily: "'Fraunces', serif" };
const fontMono: React.CSSProperties = { fontFamily: "'DM Mono', monospace" };

interface Testimonial {
  name: string;
  avatar: string;
  role: string;
  quote: string;
  accent?: "green" | "amber" | "purple";
}

const testimonials: Testimonial[] = [
  { name: "Manisha Sarkar", avatar: "avatars/Manisha Sarkar.jpeg", role: "DevOps · MLOps · AWS · Azure · CI/CD · Kubernetes", quote: "That shift from teaching people → to building systems that teach is something most people don't even realize until it's too late. You don't add more content, you design better systems — systems that guide people without making them dependent on you." },
  { name: "Avni Bhatt", avatar: "avatars/Avni Bhatt.jpeg", role: "Enterprise Architect · AI Architect · Integrations · Solutions Architect", quote: "Modern, intuitive and logically structured! Looks great, Tarak.", accent: "amber" },
  { name: "Evangeline Obeta", avatar: "avatars/Evangeline Obeta.jpeg", role: "DevOps Engineer · AWS · Docker · CI/CD · Terraform · Automation", quote: "You have done noble. The task is quite simple — try it, break it, learn from it. That is exactly what real engineering looks like." },
  { name: "Elosy Mwendwa", avatar: "avatars/Elosy Mwendwa.jpeg", role: "Community Builder · Women Empowerment Advocate · Talent & Leadership", quote: "This is impressive. I must say you've done a great job. I'm grateful to be part of this. Honestly this is inspiring to me. Let's continue to bring opportunities to many people and impact them.", accent: "purple" },
  { name: "Gracious Onyeahialam", avatar: "avatars/Gracious Onyeahialam.jpeg", role: "Multi-Cloud Security & DevSecOps Engineer · IAM Specialist · AWS", quote: "Awesome! Well done to everyone involved for a great vision now turned reality." },
  { name: "Belinda Ntinyari", avatar: "avatars/Belind Ntinyari.jpeg", role: "AWS Community Builder · Cloud Engineer (AWS) · Terraform", quote: "What stands out most to me is this shift from following tutorials to thinking in systems. That's the difference I'm starting to experience in my own cloud journey. Not just building... but understanding why things are built the way they are and how they behave at scale. That mindset changes everything." },
  { name: "Asalu Oluwatunmise", avatar: "avatars/Asalu Oluwatu...ise.jpeg", role: "Cloud Engineer · AWS Community Builder · AWS Certified Solutions Architect", quote: "Infracodebase University feels like the perfect bridge between that personal touch and a system that actually works. The way you mentor is proof that you really do care about the person, not just the code. It's rare to find someone who scales a business but still stays this focused on individual understanding.", accent: "green" },
  { name: "Comfort Benton", avatar: "avatars/Comfort Benton.jpeg", role: "Cloud Engineer · Infrastructure & Operations · AWS Certified", quote: "It's the people-first approach that stands out to me the most. You didn't just build something to scale, you're making a conscious decision to not lose the human side of it. That resonates deeply. You've created a space where people aren't just consuming, they're contributing, testing, questioning, and growing together." },
  { name: "Emmanuella Blessing Udeh", avatar: "avatars/Emmanuella Blessing...eh.jpeg", role: "Cloud Administrator Specialist · AWS, IAM & Secure Cloud Architecture", quote: "Certifications are great, tutorials are helpful, but real world systems are built on structure and security. This is the shift with InfracodeBase University — hands on projects, immediate results, and detailed explanations on why and how things are done." },
  { name: "Venisa Sara", avatar: "avatars/Venisa Sara.jpeg", role: "DevOps Engineer · AI Agents to Production", quote: "I really appreciate your journey, Tarak — it has truly inspired me and played a big role in pushing me toward my DevOps career. What stands out most is your humility and how genuinely you care about helping people achieve what they're aiming for.", accent: "amber" },
  { name: "Partha Patnaik", avatar: "avatars/PARTHA PATNAIK.jpeg", role: "Principal Solutions Architect · Enterprise AWS Migration & Hybrid Architecture", quote: "Tutorials give you steps, but real cloud engineering is about understanding systems, trade-offs, and failures. The real learning starts when you build, break, and fix things in real scenarios." },
  { name: "Bunrinmwa Gobum", avatar: "avatars/Bunrinmwa Gobum.jpeg", role: "Community Lead at Infracodebase", quote: "This is really amazing — the goal is building something of great impact that positively affects the lives of people. Learning on Infracodebase University isn't just easy but very enjoyable. So much work has been put into this and it shows." },
  { name: "Dipin Kanojia", avatar: "avatars/Dipin Kanojia.jpeg", role: "AI Project Lead · AI Agents & Workflows", quote: "Powerful reminder: real growth comes from building systems, not consuming tutorials. Relationships matter but scalable impact needs intentional design." },
  { name: "Divine Odazie", avatar: "avatars/Divine (Akachu...zie).jpeg", role: "CEO @ EverythingDevOps · Cloud Native & DevOps", quote: "So happy to see this Live! After spending time to review the curriculum and go through some of the tasks, will recommend this to anyone in the infrastructure space — whether early career or experienced professionals!", accent: "purple" },
  { name: "Anita Ihuman", avatar: "avatars/Anita ihuman.jpeg", role: "Developer Advocate · Board Member · CNCF Ambassador", quote: "This is so true — tutorials alone don't take beginners to pro level. I am excited about this university and can't wait to share with my network." },
  { name: "Kennedy Torkura", avatar: "avatars/Kennedy Torkura.jpeg", role: "Co-Founder & CTO at Mitigant · Cloud Attack Emulation", quote: "Engineering is better learnt by practice and the earlier that starts the better. This is an enviable achievement." },
  { name: "Millicent Eze", avatar: "avatars/Millicent Eze.jpeg", role: "Cloud Security & DevOps Trainee · Executive Operations", quote: "It's been amazing building and growing this community. We are just getting started. They ain't seen nothing yet." },
  { name: "Comfort Etim", avatar: "avatars/Comfort Etim.jpeg", role: "DevOps · Cloud Security Trainee · System Administration", quote: "It is an honour to be a part of something so incredible and to have you actually take our opinions into consideration. I love it here." },
  { name: "Bojosi Elizabeth Dema", avatar: "avatars/Bojosi Elizabeth Dema.jpeg", role: "Business Analyst · TOGAF® 9 Foundation Certified", quote: "Real learning experience, building systems, architecture — super excited about this platform." },
  { name: "Zerah Abba", avatar: "avatars/Zerah (Iliya) Abba.jpeg", role: "Cloud · DevOps Author", quote: "This is just incredible. Love the resilience." },
  { name: "Praise Ayodele", avatar: "avatars/Praise Ayodele.jpeg", role: "DevOps & Cloud Infrastructure Engineer · Systems, Security and Compliance", quote: "Absolutely phenomenal — what you are doing for this community is something truly special.", accent: "green" },
  { name: "Abdirahman Jama", avatar: "avatars/Abdirahman Jama.jpeg", role: "Software Development Engineer @ AWS", quote: "Great to see you giving back to the community, Tarak." },
  { name: "Benedicta Otoibhi", avatar: "avatars/Benedicta Otoibhi.jpeg", role: "Six-Time 5.0 GPA Achiever · Helping Students Hit Their Academic Goals", quote: "I'm proud of you. Such a great mentor you are.", accent: "amber" },
  { name: "Charles (Kojo) Mark", avatar: "avatars/Charles (Kojo) Mark.jpeg", role: "Backend → DevOps Engineer · Automating Everything: Infrastructure & Delivery", quote: "This is a great milestone for the Infracodebase team. I love this — helping junior engineers accelerate faster in their cloud career. Kudos kudos." },
];

const accentColors = {
  green: "#3a7a5a",
  amber: "#e86030",
  purple: "#c060d0",
};

function AvatarWithFallback({ name, src }: { name: string; src: string }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  return (
    <div className="relative shrink-0" style={{ width: 38, height: 38 }}>
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center text-xs font-bold"
        style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
      >
        {initials}
      </div>
      <img
        src={`/${src}`}
        alt={name}
        className="relative rounded-full object-cover"
        style={{ width: 38, height: 38 }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
    </div>
  );
}

export function TestimonialsSection() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const cardBg = dark ? "#131316" : "#f5f6f8";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const heading = dark ? "#ffffff" : "#0f172a";
  const muted = dark ? "#6b6f78" : "#475569";

  return (
    <section style={{ background: dark ? "#0d0f11" : "#f8f9fa", borderTop: `1px solid ${cardBorder}`, borderBottom: `1px solid ${cardBorder}` }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
        <span className="text-[11px] tracking-[0.25em] uppercase mb-4 inline-block" style={{ ...fontMono, color: muted }}>FROM THE COMMUNITY</span>
        <h2 style={{ ...fontDisplay, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.15, color: heading }}>
          Learn infrastructure.{" "}
          <em className="font-light" style={{ color: "#e86030" }}>Differently.</em>
        </h2>

        <div className="mt-12" style={{ columns: 3, columnGap: 16 }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-4"
              style={{
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                borderRadius: 12,
                padding: 24,
                borderTop: t.accent ? `1.5px solid ${accentColors[t.accent]}` : undefined,
              }}
            >
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13.5, color: muted, lineHeight: 1.75 }}>
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 mt-4">
                <AvatarWithFallback name={t.name} src={t.avatar} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: heading }}>{t.name}</div>
                  <div style={{ ...fontMono, fontSize: 10, color: muted, marginTop: 1 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}