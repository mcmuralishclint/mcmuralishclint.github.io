import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Users,
  Layers,
  Gauge,
  ArrowRight,
  CheckCircle2,
  Target,
  TrendingUp,
  Workflow,
  GitBranch,
  Boxes,
  Rocket,
  Zap,
  BarChart3,
  Clock,
  Shield,
  Code2,
  Mail,
  Linkedin,
  ChevronDown,
} from "lucide-react";
import { SiGithub } from "react-icons/si";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  );
}

function NavBar() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b"
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between gap-4 h-14">
        <button
          onClick={() => scrollTo("hero")}
          className="font-serif text-lg font-bold tracking-tight"
          data-testid="link-home"
        >
          MC
        </button>
        <div className="hidden sm:flex items-center gap-1">
          {[
            { label: "About", id: "about" },
            { label: "Expertise", id: "expertise" },
            { label: "Contact", id: "contact" },
          ].map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => scrollTo(item.id)}
              data-testid={`link-nav-${item.id}`}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-14">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative max-w-3xl mx-auto px-6 text-center"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <Badge variant="secondary" className="no-default-active-elevate">
            Strategic Technology Leader
          </Badge>
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6"
          data-testid="text-hero-name"
        >
          Muralish Clinton
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          I build high-performance engineering teams and platforms from the ground up,
          transforming how organizations ship software.
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="text-base text-muted-foreground/80 max-w-xl mx-auto mb-10"
        >
          Specializing in Ruby on Rails team building, platform engineering,
          and developer efficiency at scale.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => scrollTo("expertise")} data-testid="button-view-expertise">
            View My Expertise
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" onClick={() => scrollTo("contact")} data-testid="button-get-in-touch">
            Get in Touch
          </Button>
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="mt-16"
        >
          <button
            onClick={() => scrollTo("about")}
            className="text-muted-foreground/60 animate-bounce"
            data-testid="button-scroll-down"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const highlights = [
    { icon: Users, label: "Teams Built", value: "Multiple" },
    { icon: Rocket, label: "Focus", value: "0 to 1" },
    { icon: TrendingUp, label: "Impact", value: "Measurable" },
    { icon: Target, label: "Approach", value: "Strategic" },
  ];

  return (
    <section id="about" className="py-24 px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">Background</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight" data-testid="text-section-about">
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div variants={fadeUp} className="space-y-5">
            <p className="text-base leading-relaxed text-muted-foreground">
              As a strategic technology leader, I have a proven track record of building
              engineering teams and platforms from scratch. My approach combines deep technical
              expertise with a keen understanding of business objectives, ensuring that every
              team I build and every platform I architect directly drives organizational success.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              I thrive in environments where there is ambiguity and complexity. Whether it's
              assembling a Ruby on Rails team to deliver critical products, designing platform
              engineering organizations, or systematically improving developer productivity,
              I bring a structured, outcome-focused methodology to every challenge.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              My leadership philosophy centers on empowering engineers, creating scalable
              processes, and fostering a culture of continuous improvement that compounds
              over time.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <Card key={item.label} data-testid={`card-highlight-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardContent className="p-5">
                    <item.icon className="w-5 h-5 text-primary mb-3" />
                    <p className="text-sm text-muted-foreground mb-1" data-testid={`text-highlight-label-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>{item.label}</p>
                    <p className="text-lg font-semibold" data-testid={`text-highlight-value-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

interface ExpertiseCardProps {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  challenges: { icon: React.ElementType; text: string }[];
  outcomes: string[];
  skills: string[];
}

function ExpertiseCard({
  number,
  title,
  subtitle,
  description,
  icon: Icon,
  challenges,
  outcomes,
  skills,
}: ExpertiseCardProps) {
  return (
    <motion.div variants={fadeUp}>
      <Card className="overflow-visible">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-1" data-testid={`text-expertise-number-${number}`}>{number}</p>
                <h3 className="text-xl font-semibold tracking-tight" data-testid={`text-expertise-title-${number}`}>{title}</h3>
                <p className="text-sm text-muted-foreground mt-1" data-testid={`text-expertise-subtitle-${number}`}>{subtitle}</p>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>

          <Separator className="mb-6" />

          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-medium mb-4">Key Focus Areas</p>
              <div className="space-y-3">
                {challenges.map((item, i) => (
                  <div key={i} className="flex flex-wrap items-start gap-3">
                    <item.icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground flex-1 min-w-0">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-4">Outcomes Delivered</p>
              <div className="space-y-3">
                {outcomes.map((item, i) => (
                  <div key={i} className="flex flex-wrap items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="no-default-active-elevate text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ExpertiseSection() {
  const expertiseData: ExpertiseCardProps[] = [
    {
      number: "01",
      title: "Building a Ruby on Rails Team",
      subtitle: "From Zero to a High-Performing Product Team",
      icon: GitBranch,
      description:
        "Built a Ruby on Rails engineering team from scratch, establishing the hiring pipeline, technical standards, and delivery cadence needed to ship production-grade applications. This involved defining role competencies, structuring interviews for Rails-specific depth, and creating an onboarding program that accelerated time-to-first-commit.",
      challenges: [
        { icon: Users, text: "Talent strategy and hiring pipeline for Rails engineers" },
        { icon: Code2, text: "Establishing coding standards, review processes, and best practices" },
        { icon: Workflow, text: "Sprint cadence, delivery workflows, and agile ceremonies" },
        { icon: Shield, text: "Security, testing culture, and production readiness" },
      ],
      outcomes: [
        "Assembled a productive Rails team capable of full-cycle delivery",
        "Reduced average onboarding time with structured ramp-up programs",
        "Established a consistent deployment rhythm with reliable releases",
        "Created a reusable playbook for standing up framework-specific teams",
      ],
      skills: [
        "Ruby on Rails",
        "Team Building",
        "Talent Strategy",
        "Technical Hiring",
        "Agile Delivery",
        "Code Quality",
      ],
    },
    {
      number: "02",
      title: "Building a Platform Engineering Team",
      subtitle: "Designing the Foundation for Developer Productivity",
      icon: Boxes,
      description:
        "Designed and built a platform engineering team responsible for creating the internal developer platform (IDP) that serves as the backbone of engineering operations. This involved defining the team's charter, selecting the technology stack, establishing service level objectives, and building the abstractions that allow product teams to ship independently and safely.",
      challenges: [
        { icon: Layers, text: "Internal developer platform (IDP) design and architecture" },
        { icon: Workflow, text: "CI/CD pipeline standardization and automation" },
        { icon: Shield, text: "Infrastructure-as-code, observability, and reliability" },
        { icon: Target, text: "Self-service tooling and golden paths for product teams" },
      ],
      outcomes: [
        "Launched an internal platform serving multiple product teams",
        "Significantly reduced infrastructure provisioning time through self-service",
        "Improved system reliability with standardized observability practices",
        "Enabled product teams to deploy independently without platform bottlenecks",
      ],
      skills: [
        "Platform Engineering",
        "IDP Design",
        "Infrastructure as Code",
        "CI/CD",
        "Observability",
        "Cloud Architecture",
      ],
    },
    {
      number: "03",
      title: "Improving Developer Efficiency",
      subtitle: "Systematic Approaches to Engineering Velocity",
      icon: Gauge,
      description:
        "Led organization-wide initiatives to measurably improve developer efficiency through data-driven analysis, tooling investments, and process optimization. This work focuses on identifying bottlenecks across the software development lifecycle, quantifying their impact, and implementing targeted improvements that compound over time.",
      challenges: [
        { icon: BarChart3, text: "DORA metrics tracking and engineering analytics" },
        { icon: Clock, text: "Build time optimization and feedback loop compression" },
        { icon: Zap, text: "Developer experience (DX) improvements and friction reduction" },
        { icon: TrendingUp, text: "Continuous improvement culture and knowledge sharing" },
      ],
      outcomes: [
        "Measurably improved deployment frequency and lead time for changes",
        "Reduced build and test cycle times through targeted optimizations",
        "Implemented developer experience surveys and acted on feedback loops",
        "Built a culture of continuous improvement with visible, shared metrics",
      ],
      skills: [
        "DORA Metrics",
        "Developer Experience",
        "Process Optimization",
        "Engineering Analytics",
        "Build Systems",
        "Change Management",
      ],
    },
  ];

  return (
    <section id="expertise" className="py-24 px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
            Value Addition
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-section-expertise">
            Areas of Expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Deep experience across three critical dimensions of engineering leadership,
            each grounded in hands-on execution and strategic thinking.
          </p>
        </motion.div>

        <div className="space-y-6">
          {expertiseData.map((item) => (
            <ExpertiseCard key={item.number} {...item} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ApproachSection() {
  const principles = [
    {
      title: "Start with Why",
      description:
        "Every team and platform decision ties back to a clear business objective. I ensure alignment between engineering investment and organizational goals before writing a single line of code.",
    },
    {
      title: "Hire for Trajectory",
      description:
        "I prioritize growth mindset and foundational skills over perfect resume matches. The best teams are built with people who learn fast, communicate well, and care about craft.",
    },
    {
      title: "Build in the Open",
      description:
        "Transparency in architecture decisions, sprint progress, and technical debt creates trust. I champion documentation, ADRs, and visible metrics as leadership tools.",
    },
    {
      title: "Measure What Matters",
      description:
        "From DORA metrics to developer satisfaction surveys, I use quantitative and qualitative data to guide decisions and demonstrate impact to stakeholders.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-card/50">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
            Philosophy
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-section-approach">
            My Leadership Approach
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Principles that guide how I build teams, design systems, and drive results.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {principles.map((item, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-start gap-4">
                    <span className="font-mono text-xs text-muted-foreground mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="max-w-3xl mx-auto text-center"
      >
        <motion.div variants={fadeUp}>
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
            Connect
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-section-contact">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Whether you need to build an engineering team, stand up a platform organization,
            or improve your team's velocity, I'd love to hear about your challenges.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild data-testid="link-email">
            <a href="mailto:muralish.clinton@example.com">
              <Mail className="w-4 h-4 mr-2" />
              Email Me
            </a>
          </Button>
          <Button variant="outline" asChild data-testid="link-linkedin">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" asChild data-testid="link-github">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <SiGithub className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4" data-testid="text-footer">
        <p className="text-sm text-muted-foreground" data-testid="text-footer-name">
          Muralish Clinton
        </p>
        <p className="text-sm text-muted-foreground" data-testid="text-footer-role">
          Strategic Technology Leader
        </p>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ApproachSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
