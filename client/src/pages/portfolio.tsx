import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTheme } from "@/components/theme-provider";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Users,
  Layers,
  Gauge,
  ArrowRight,
  ArrowDown,
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
  Quote,
  Sparkles,
  Map,
  DollarSign,
  FileText,
  Download,
  ExternalLink,
  Trophy,
  Server,
  Cpu,
  Signal,
  ShoppingCart,
  UserPlus,
  Network,
  BookOpen,
  Filter,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import profileImage from "@assets/1708862676484-2_1770641756175.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function useTypingEffect(texts: string[], typingSpeed = 60, deletingSpeed = 30, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length - 1));
      }, deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}

function AnimatedCounter({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl font-bold font-mono gradient-text" data-testid={`text-counter-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        {count}{suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-14 left-0 right-0 h-0.5 origin-left z-50"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(245 58% 52%), hsl(200 80% 50%), hsl(173 60% 40%))",
      }}
      data-testid="scroll-progress"
    />
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}

function NavBar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "expertise", "approach", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Expertise", id: "expertise" },
    { label: "Stories", id: "stories" },
    { label: "Approach", id: "approach" },
    { label: "Contact", id: "contact" },
  ];

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
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => scrollTo(item.id)}
              data-testid={`link-nav-${item.id}`}
              className={`relative transition-colors ${activeSection === item.id ? "text-primary" : ""}`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Button>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const typingText = useTypingEffect([
    "High-Performing Engineering Teams",
    "Platform Engineering",
    "Developer Efficiency",
  ], 70, 40, 2200);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-14 overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient pointer-events-none" />
      
      {/* Animated floating orbs — multi-color */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(245 58% 52% / 0.12), hsl(200 80% 50% / 0.06))" }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(173 60% 40% / 0.12), hsl(200 80% 50% / 0.05))" }}
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, 25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(280 55% 55% / 0.08), hsl(245 58% 52% / 0.04))" }}
        />
        <motion.div
          animate={{ x: [0, -10, 0], y: [0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] right-[20%] w-64 h-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(340 65% 50% / 0.06), transparent)" }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative max-w-4xl mx-auto px-6 text-center"
      >
        <motion.div variants={scaleIn} className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden gradient-border glow">
              <img
                src={profileImage}
                alt="Muralish Clinton"
                className="w-full h-full object-cover"
                data-testid="img-profile"
              />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(245 58% 52%), hsl(200 80% 50%))" }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mb-4">
          <Badge variant="secondary" className="no-default-active-elevate" data-testid="badge-role">
            Strategic Technology Leader
          </Badge>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6 gradient-text"
          data-testid="text-hero-name"
        >
          Muralish Clinton
        </motion.h1>

        <motion.div variants={fadeUp} className="mb-4">
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I build high-performance engineering teams and platforms from the ground up,
            transforming how organizations ship software.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="h-8 mb-10">
          <p className="text-base text-primary font-medium" data-testid="text-typing">
            {typingText}
            <span className="animate-pulse ml-0.5 inline-block w-0.5 h-5 bg-primary align-middle" />
          </p>
        </motion.div>

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
          className="mt-20"
        >
          <motion.button
            onClick={() => scrollTo("about")}
            className="text-muted-foreground/60"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            data-testid="button-scroll-down"
          >
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
      
      {/* Gradient fade to stats bar */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none" />
    </section>
  );
}

function StatsBar() {
  return (
    <section className="relative py-16 px-6 border-y overflow-hidden">
      {/* Multi-hue background gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, hsl(245 58% 52% / 0.06), hsl(200 80% 50% / 0.04), hsl(173 60% 40% / 0.06))" }} />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="max-w-4xl mx-auto relative z-10"
      >
        <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <AnimatedCounter target={10} label="Years Leading" suffix="+" />
          <AnimatedCounter target={50} label="Engineers Hired" suffix="+" />
          <AnimatedCounter target={5} label="Teams Built" />
          <AnimatedCounter target={99} label="Uptime Target" suffix="%" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden">
      {/* Gradient fade from hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none" />
      
      {/* Multi-hue background pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, hsl(245 58% 52% / 0.04), transparent 40%, hsl(173 60% 40% / 0.05))" }} />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="max-w-5xl mx-auto relative z-10"
      >
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">Background</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight" data-testid="text-section-about">
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <motion.div variants={slideInLeft} className="md:col-span-3 space-y-5">
            <p className="text-base leading-relaxed text-muted-foreground">
              As a strategic technology leader, I have a proven track record of building
              engineering teams and platforms from scratch. My approach combines deep technical
              expertise with a keen understanding of business objectives, ensuring that every
              team I build and every platform I architect directly drives organizational success.
            </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            I thrive in environments where there is ambiguity and complexity. Whether it's
            building high-performing engineering teams across Ruby on Rails, Go, and React,
            designing platform engineering organizations, or systematically improving developer
            productivity, I bring a structured, outcome-focused methodology to every challenge.
          </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              My leadership philosophy centers on empowering engineers, creating scalable
              processes, and fostering a culture of continuous improvement that compounds
              over time.
            </p>

            <motion.div variants={fadeUp}>
              <Card className="overflow-visible mt-6">
                <CardContent className="p-5">
                  <Quote className="w-5 h-5 text-primary/40 mb-2" />
                  <p className="text-sm italic text-muted-foreground leading-relaxed">
                    "The best engineering leaders don't just build systems — they build the teams
                    and cultures that build great systems."
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={slideInRight} className="md:col-span-2">
            <div className="space-y-3">
              {[
                { icon: Users, label: "Teams Built", value: "Multiple from scratch" },
                { icon: Rocket, label: "Focus", value: "Zero to one" },
                { icon: TrendingUp, label: "Impact", value: "Measurable outcomes" },
                { icon: Target, label: "Approach", value: "Strategic & hands-on" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                >
                  <Card className="overflow-visible hover-elevate" data-testid={`card-highlight-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <CardContent className="p-4 flex flex-wrap items-center gap-3">
                      <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary/10 shrink-0">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground" data-testid={`text-highlight-label-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>{item.label}</p>
                        <p className="text-sm font-medium" data-testid={`text-highlight-value-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>{item.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-muted/30 via-muted/10 to-transparent pointer-events-none" />
    </section>
  );
}

function ExpertiseSection() {
  const [activeTab, setActiveTab] = useState("01");
  const [openRoadmap, setOpenRoadmap] = useState<string | null>(null);

  const expertiseData = [
    {
      number: "01",
      title: "High-Performing Engineering Teams",
      subtitle: "Ruby on Rails, Go, and React Delivery Organizations",
      icon: GitBranch,
      description:
        "Built high-performing engineering teams around Ruby on Rails, Go, and React, establishing the hiring pipeline, technical standards, and delivery cadence needed to ship production-grade applications. This included defining role competencies by technology, structuring interviews for framework- and language-specific depth, and creating onboarding programs that accelerated time-to-first-commit across stacks.",
      challenges: [
        { icon: Users, text: "Talent strategy and hiring pipeline for Rails, Go, and React engineers" },
        { icon: Code2, text: "Establishing coding standards, review processes, and best practices across stacks" },
        { icon: Workflow, text: "Sprint cadence, delivery workflows, and agile ceremonies for cross-functional teams" },
        { icon: Shield, text: "Security, testing culture, and production readiness across services and frontends" },
      ],
      outcomes: [
        "Assembled productive, cross-functional teams capable of full-cycle delivery across Ruby on Rails, Go, and React",
        "Reduced average onboarding time with structured, stack-aware ramp-up programs",
        "Established a consistent deployment rhythm with reliable releases across multiple services and applications",
        "Created a reusable playbook for standing up high-performing, framework-specific teams",
      ],
      skills: ["Ruby on Rails", "Go", "React", "Team Building", "Talent Strategy", "Technical Hiring", "Agile Delivery", "Code Quality"],
      roadmap: {
        phases: [
          {
            title: "Phase 1: Assessment & Strategy (Weeks 1-4)",
            activities: [
              "Conduct comprehensive team assessment across Ruby on Rails, Go, and React stacks",
              "Analyze current hiring pipeline, interview processes, and technical standards",
              "Identify gaps in team structure, skills distribution, and delivery cadence",
              "Define target team composition and hiring roadmap for each technology stack",
            ],
          },
          {
            title: "Phase 2: Hiring & Onboarding (Weeks 5-16)",
            activities: [
              "Establish structured hiring pipeline with stack-specific technical assessments",
              "Design and implement onboarding programs tailored to Ruby on Rails, Go, and React",
              "Create role-specific competency frameworks and career progression paths",
              "Build mentorship programs to accelerate time-to-productivity",
            ],
          },
          {
            title: "Phase 3: Standards & Processes (Weeks 17-24)",
            activities: [
              "Establish coding standards, review processes, and best practices for each stack",
              "Implement consistent sprint cadence and delivery workflows across teams",
              "Create security, testing, and production readiness frameworks",
              "Set up metrics and KPIs to track team performance and delivery velocity",
            ],
          },
          {
            title: "Phase 4: Optimization & Scale (Weeks 25+)",
            activities: [
              "Continuously refine hiring and onboarding processes based on data",
              "Scale successful practices across additional teams and projects",
              "Build reusable playbooks for standing up new framework-specific teams",
              "Establish culture of continuous improvement and knowledge sharing",
            ],
          },
        ],
        valueAdditions: [
          {
            metric: "30-50%",
            description: "Reduction in time-to-first-commit for new engineers through structured onboarding",
          },
          {
            metric: "40-60%",
            description: "Improvement in deployment frequency with established delivery cadence",
          },
          {
            metric: "25-35%",
            description: "Increase in team productivity through optimized processes and standards",
          },
          {
            metric: "50-70%",
            description: "Faster hiring cycles with streamlined, stack-specific interview processes",
          },
        ],
      },
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
      skills: ["Platform Engineering", "IDP Design", "Infrastructure as Code", "CI/CD", "Observability", "Cloud Architecture"],
      roadmap: {
        phases: [
          {
            title: "Phase 1: Foundation & Charter (Weeks 1-6)",
            activities: [
              "Define platform engineering team charter, mission, and success metrics",
              "Assess current infrastructure, tooling, and developer pain points",
              "Design internal developer platform (IDP) architecture and technology stack",
              "Establish service level objectives (SLOs) and reliability targets",
            ],
          },
          {
            title: "Phase 2: Core Platform Build (Weeks 7-20)",
            activities: [
              "Build self-service infrastructure provisioning and deployment pipelines",
              "Implement standardized CI/CD workflows and golden paths",
              "Create infrastructure-as-code templates and reusable components",
              "Set up comprehensive observability, monitoring, and alerting systems",
            ],
          },
          {
            title: "Phase 3: Developer Enablement (Weeks 21-32)",
            activities: [
              "Launch self-service tooling and developer portals",
              "Create documentation, runbooks, and best practice guides",
              "Onboard initial product teams and gather feedback",
              "Iterate on platform capabilities based on developer needs",
            ],
          },
          {
            title: "Phase 4: Scale & Optimize (Weeks 33+)",
            activities: [
              "Scale platform to serve all product teams across the organization",
              "Continuously optimize infrastructure costs and resource utilization",
              "Expand platform capabilities based on evolving requirements",
              "Establish platform engineering as a strategic competitive advantage",
            ],
          },
        ],
        valueAdditions: [
          {
            metric: "80-90%",
            description: "Reduction in infrastructure provisioning time through self-service tooling",
          },
          {
            metric: "60-75%",
            description: "Decrease in deployment failures with standardized CI/CD pipelines",
          },
          {
            metric: "50-70%",
            description: "Reduction in time-to-production for new services and applications",
          },
          {
            metric: "30-50%",
            description: "Cost savings through optimized infrastructure and resource management",
          },
        ],
      },
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
      skills: ["DORA Metrics", "Developer Experience", "Process Optimization", "Engineering Analytics", "Build Systems", "Change Management"],
      roadmap: {
        phases: [
          {
            title: "Phase 1: Baseline & Analysis (Weeks 1-6)",
            activities: [
              "Implement DORA metrics tracking (deployment frequency, lead time, MTTR, change failure rate)",
              "Conduct comprehensive developer experience surveys and interviews",
              "Identify bottlenecks across the software development lifecycle",
              "Quantify impact of inefficiencies on developer productivity and business outcomes",
            ],
          },
          {
            title: "Phase 2: Quick Wins (Weeks 7-16)",
            activities: [
              "Optimize build and test cycle times through parallelization and caching",
              "Reduce feedback loop time with faster CI/CD pipelines",
              "Eliminate common friction points in developer workflows",
              "Implement developer experience improvements with highest ROI",
            ],
          },
          {
            title: "Phase 3: Systematic Improvements (Weeks 17-32)",
            activities: [
              "Invest in tooling and automation to reduce manual overhead",
              "Streamline code review processes and reduce cycle times",
              "Improve documentation, knowledge sharing, and onboarding",
              "Establish continuous improvement culture with visible metrics dashboards",
            ],
          },
          {
            title: "Phase 4: Continuous Optimization (Weeks 33+)",
            activities: [
              "Monitor and track DORA metrics trends over time",
              "Iterate on improvements based on developer feedback and data",
              "Scale successful practices across the entire engineering organization",
              "Maintain culture of continuous improvement and innovation",
            ],
          },
        ],
        valueAdditions: [
          {
            metric: "40-60%",
            description: "Reduction in lead time for changes through optimized workflows",
          },
          {
            metric: "50-70%",
            description: "Decrease in build and test cycle times with targeted optimizations",
          },
          {
            metric: "2-3x",
            description: "Increase in deployment frequency with improved CI/CD and processes",
          },
          {
            metric: "30-40%",
            description: "Improvement in developer satisfaction scores through DX enhancements",
          },
        ],
      },
    },
  ];

  const activeData = expertiseData.find((d) => d.number === activeTab)!;

  return (
    <section id="expertise" className="relative py-24 px-6 overflow-hidden">
      {/* Gradient fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-muted/30 via-muted/10 to-transparent pointer-events-none" />
      
      {/* Multi-hue background accent */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(225deg, transparent 20%, hsl(200 80% 50% / 0.03) 50%, hsl(245 58% 52% / 0.05))" }} />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="max-w-5xl mx-auto relative z-10"
      >
        <motion.div variants={fadeUp} className="text-center mb-12">
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

        <motion.div variants={fadeUp}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-auto">
              {expertiseData.map((item) => (
                <TabsTrigger
                  key={item.number}
                  value={item.number}
                  className="flex flex-wrap items-center justify-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid={`tab-expertise-${item.number}`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline text-xs sm:text-sm">{item.title.replace("Building a ", "").replace("Improving ", "")}</span>
                  <span className="sm:hidden text-xs">{item.number}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {expertiseData.map((item) => (
              <TabsContent key={item.number} value={item.number}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={item.number}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Card className="overflow-visible">
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                          <div className="flex flex-wrap items-start gap-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 shrink-0">
                              <item.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-mono text-muted-foreground mb-1" data-testid={`text-expertise-number-${item.number}`}>{item.number}</p>
                              <h3 className="text-xl font-semibold tracking-tight" data-testid={`text-expertise-title-${item.number}`}>{item.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1" data-testid={`text-expertise-subtitle-${item.number}`}>{item.subtitle}</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed mb-6">{item.description}</p>

                        <Separator className="mb-6" />

                        <div className="grid sm:grid-cols-2 gap-8">
                          <div>
                            <p className="text-sm font-medium mb-4">Key Focus Areas</p>
                            <div className="space-y-3">
                              {item.challenges.map((challenge, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.08 + 0.2, duration: 0.3 }}
                                  className="flex flex-wrap items-start gap-3"
                                >
                                  <challenge.icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                  <span className="text-sm text-muted-foreground flex-1 min-w-0">{challenge.text}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium mb-4">Outcomes Delivered</p>
                            <div className="space-y-3">
                              {item.outcomes.map((outcome, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.08 + 0.3, duration: 0.3 }}
                                  className="flex flex-wrap items-start gap-3"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                  <span className="text-sm text-muted-foreground flex-1 min-w-0">{outcome}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-6 border-t">
                          <div className="flex flex-wrap gap-2 mb-6">
                            {item.skills.map((skill, i) => (
                              <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 + 0.4, duration: 0.25 }}
                              >
                                <Badge variant="secondary" className="no-default-active-elevate text-xs">
                                  {skill}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                          <Button
                            onClick={() => setOpenRoadmap(item.number)}
                            className="w-full sm:w-auto"
                            variant="outline"
                          >
                            <Map className="w-4 h-4 mr-2" />
                            View Contribution Roadmap
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </motion.div>

      {/* Roadmap Dialog */}
      {expertiseData.map((item) => (
        <Dialog
          key={item.number}
          open={openRoadmap === item.number}
          onOpenChange={(open) => setOpenRoadmap(open ? item.number : null)}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <item.icon className="w-5 h-5 text-primary" />
                {item.title} - Contribution Roadmap
              </DialogTitle>
              <DialogDescription>
                A strategic roadmap showing how I will contribute to your organization in this area of expertise
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-8 mt-4">
              {/* Roadmap Phases */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Implementation Roadmap
                </h3>
                <div className="space-y-6">
                  {item.roadmap.phases.map((phase, phaseIndex) => (
                    <motion.div
                      key={phaseIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: phaseIndex * 0.1 }}
                      className="relative pl-6 border-l-2 border-primary/20"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                      <h4 className="font-semibold text-base mb-3 text-foreground">{phase.title}</h4>
                      <ul className="space-y-2">
                        {phase.activities.map((activity, activityIndex) => (
                          <li key={activityIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Value Additions */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Expected Value Additions
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {item.roadmap.valueAdditions.map((value, valueIndex) => (
                    <motion.div
                      key={valueIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: valueIndex * 0.1 + 0.5 }}
                    >
                      <Card className="hover-elevate">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 shrink-0">
                              <TrendingUp className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-2xl font-bold gradient-text mb-1">{value.metric}</p>
                              <p className="text-sm text-muted-foreground">{value.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
          </Dialog>
      ))}
      
      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card/50 via-card/30 to-transparent pointer-events-none" />
    </section>
  );
}

type StoryCategory = "all" | "dev" | "architecture" | "leadership";

function StoriesSection() {
  const [activeFilter, setActiveFilter] = useState<StoryCategory>("all");

  const stories = [
    {
      category: "dev" as const,
      title: "E-Commerce Platform from Scratch",
      subtitle: "Series D Organization",
      icon: ShoppingCart,
      description:
        "Built and owned end-to-end e-commerce systems from the ground up for a Series D organization. Designed the architecture, led implementation across the full stack, and delivered a scalable platform that handled the growing demands of a rapidly expanding customer base.",
      highlight: "Full ownership from architecture to production",
      tags: ["E-Commerce", "Full Stack", "System Design", "Scalable Architecture"],
    },
    {
      category: "dev" as const,
      title: "5G & Roaming Features",
      subtitle: "25% Annual Revenue Increase",
      icon: Signal,
      description:
        "Engineered roaming and 5G features for a telecom platform, directly contributing to a 25% annual revenue increase. Worked across complex protocol layers and integrations with carrier partners to deliver features that expanded the product's market reach.",
      highlight: "25% annual revenue increase",
      tags: ["5G", "Roaming", "Telecom", "Revenue Growth"],
    },
    {
      category: "dev" as const,
      title: "Prepaid Flow for Postpaid Market",
      subtitle: "5,000+ New Customers Monthly",
      icon: UserPlus,
      description:
        "Created a prepaid billing and onboarding flow for a traditionally postpaid market, opening up an entirely new customer segment. The system enabled acquisition of 5,000+ new customers per month, unlocking significant recurring revenue in an untapped segment.",
      highlight: "5,000+ new customer acquisitions monthly",
      tags: ["Billing Systems", "Customer Acquisition", "Market Expansion", "Product Innovation"],
    },
    {
      category: "architecture" as const,
      title: "Platform Engineering IDP",
      subtitle: "Internal Developer Platform with Composable Components",
      icon: Cpu,
      description:
        "Architected an Internal Developer Platform (IDP) with multiple composable, independently deployable components. Designed the platform to be modular and extensible, allowing product teams to self-serve infrastructure, CI/CD, and observability without bottlenecks.",
      highlight: "Modular IDP with composable components",
      tags: ["Platform Engineering", "IDP", "Microservices", "Infrastructure"],
    },
    {
      category: "architecture" as const,
      title: "Technical Point of Contact",
      subtitle: "20+ Third-Party Integrations",
      icon: Network,
      description:
        "Served as the primary technical point of contact for all architectural decision-making across the organization. Interfaced with 20+ third-party organizations for integrations, vendor evaluations, and technical partnerships, ensuring every integration met security, performance, and scalability standards.",
      highlight: "20+ third-party organizations engaged",
      tags: ["Technical Leadership", "Vendor Management", "API Design", "Integration Architecture"],
    },
    {
      category: "architecture" as const,
      title: "Engineering Standards & Guidance",
      subtitle: "Organization-Wide Technical Direction",
      icon: BookOpen,
      description:
        "Established and codified engineering standards, architectural decision records (ADRs), and technical guidelines that became the foundation for all teams to follow. Provided hands-on guidance to teams, conducted architecture reviews, and ensured consistency across the technology landscape.",
      highlight: "Set the standard for the entire engineering organization",
      tags: ["ADRs", "Engineering Standards", "Architecture Reviews", "Technical Governance"],
    },
    {
      category: "leadership" as const,
      title: "Ruby on Rails + React Team from Ground Up",
      subtitle: "100K+ Monthly Active Users",
      icon: Users,
      description:
        "Built a Ruby on Rails and React engineering team from scratch — hiring, onboarding, and establishing processes. The team now owns and operates a live product serving over 100,000 monthly active users, delivering features consistently and maintaining high availability.",
      highlight: "100K+ monthly active users on live product",
      tags: ["Ruby on Rails", "React", "Team Building", "Product Delivery"],
    },
    {
      category: "leadership" as const,
      title: "Platform + Product Team (Team Topologies)",
      subtitle: "Multi-Product Delivery Organization",
      icon: Boxes,
      description:
        "Built and managed a combined Platform and Product team structured according to Team Topologies principles. Established stream-aligned teams, a platform team, and enabling interactions to own the delivery of multiple products — ensuring fast flow, clear ownership, and sustainable delivery.",
      highlight: "Team Topologies-driven multi-product delivery",
      tags: ["Team Topologies", "Platform Teams", "Product Teams", "Organizational Design"],
    },
  ];

  const filters: { label: string; value: StoryCategory; icon: typeof Code2 }[] = [
    { label: "All", value: "all", icon: Filter },
    { label: "Dev", value: "dev", icon: Code2 },
    { label: "Architecture", value: "architecture", icon: Server },
    { label: "Leadership", value: "leadership", icon: Users },
  ];

  const filteredStories = activeFilter === "all" ? stories : stories.filter((s) => s.category === activeFilter);

  const categoryColors: Record<string, string> = {
    dev: "bg-cyan-500/15 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300",
    architecture: "bg-violet-500/15 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300",
    leadership: "bg-amber-500/15 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
  };

  const categoryLabels: Record<string, string> = {
    dev: "Development",
    architecture: "Architecture",
    leadership: "Leadership",
  };

  return (
    <section id="stories" className="relative py-24 px-6 overflow-hidden">
      {/* Gradient fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-card/50 via-card/20 to-transparent pointer-events-none" />

      {/* Multi-hue background accent */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(315deg, hsl(200 80% 50% / 0.04), transparent 40%, hsl(280 55% 55% / 0.03))" }} />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="max-w-5xl mx-auto relative z-10"
      >
        <motion.div variants={fadeUp} className="text-center mb-12">
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
            Achievements
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-section-stories">
            Impact Stories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real outcomes from building products, designing systems, and leading teams — each story represents measurable impact.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.value)}
              className="transition-all duration-200"
              data-testid={`filter-stories-${filter.value}`}
            >
              <filter.icon className="w-4 h-4 mr-2" />
              {filter.label}
            </Button>
          ))}
        </motion.div>

        {/* Stories Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-2 gap-6"
          >
            {filteredStories.map((story, i) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="overflow-visible h-full hover-elevate group">
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex flex-wrap items-start gap-4 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 shrink-0">
                        <story.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Badge className={`text-xs font-medium ${categoryColors[story.category]}`}>
                            {categoryLabels[story.category]}
                          </Badge>
                        </div>
                        <h3 className="text-base font-semibold tracking-tight leading-snug">{story.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{story.subtitle}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                      {story.description}
                    </p>

                    {/* Highlight */}
                    <div className="flex items-center gap-2 mb-4 p-3 rounded-md bg-primary/5 border border-primary/10">
                      <Trophy className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-medium text-primary">{story.highlight}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {story.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs no-default-active-elevate">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </section>
  );
}

function ApproachSection() {
  const principles = [
    {
      title: "Start with Why",
      description:
        "Every team and platform decision ties back to a clear business objective. I ensure alignment between engineering investment and organizational goals before writing a single line of code.",
      icon: Target,
    },
    {
      title: "Hire for Trajectory",
      description:
        "I prioritize growth mindset and foundational skills over perfect resume matches. The best teams are built with people who learn fast, communicate well, and care about craft.",
      icon: TrendingUp,
    },
    {
      title: "Build in the Open",
      description:
        "Transparency in architecture decisions, sprint progress, and technical debt creates trust. I champion documentation, ADRs, and visible metrics as leadership tools.",
      icon: Code2,
    },
    {
      title: "Measure What Matters",
      description:
        "From DORA metrics to developer satisfaction surveys, I use quantitative and qualitative data to guide decisions and demonstrate impact to stakeholders.",
      icon: BarChart3,
    },
  ];

  return (
    <section id="approach" className="relative py-24 px-6 overflow-hidden">
      {/* Gradient fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-card/50 via-card/30 to-transparent pointer-events-none" />
      
      {/* Multi-hue background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-card/60 via-card/40 to-card/60 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 50%, hsl(280 55% 55% / 0.05), transparent 50%), radial-gradient(circle at 80% 30%, hsl(173 60% 40% / 0.04), transparent 50%)" }} />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="max-w-5xl mx-auto relative z-10"
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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="overflow-visible h-full hover-elevate">
                <CardContent className="p-6 h-full">
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary/10 shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-mono text-xs text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-semibold">{item.title}</h3>
                      </div>
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
      
      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden">
      {/* Gradient fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none" />
      
      {/* Multi-hue background accent */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, hsl(173 60% 40% / 0.04), transparent 50%, hsl(245 58% 52% / 0.04))" }} />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="max-w-4xl mx-auto relative z-10"
      >
        <motion.div variants={fadeUp} className="text-center mb-12">
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

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Buttons */}
          <motion.div variants={fadeUp}>
            <Card className="overflow-visible hover-elevate h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Get in Touch</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Reach out via email or connect with me on professional networks.
                </p>
                <div className="flex flex-col gap-3">
                  <Button asChild className="w-full" data-testid="link-email">
                    <a href="mailto:mcmuralishclint@outlook.com">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Me
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="w-full" data-testid="link-linkedin">
                    <a href="https://linkedin.com/in/mcmuralishclint" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="w-full" data-testid="link-github">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <SiGithub className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Resume Download */}
          <motion.div variants={fadeUp}>
            <Card className="overflow-visible hover-elevate h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Download Resume</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Get a detailed overview of my experience, skills, and achievements in a downloadable format.
                </p>
                <div className="flex flex-col gap-3">
                  <Button asChild size="lg" className="w-full">
                    <a href="/resume.pdf" download="Muralish_Clinton_Resume.pdf">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </a>
                  </Button>
                  <Button variant="outline" asChild size="lg" className="w-full">
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View in New Tab
                    </a>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Gradient fade to footer */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-border/50 to-transparent pointer-events-none" />
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-8 px-6">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(245 58% 52% / 0.3), hsl(200 80% 50% / 0.3), hsl(173 60% 40% / 0.3), transparent)" }} />
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4" data-testid="text-footer">
        <p className="text-sm font-medium gradient-text" data-testid="text-footer-name">
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
      <ScrollProgress />
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <ExpertiseSection />
      <StoriesSection />
      <ApproachSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
