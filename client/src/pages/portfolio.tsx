import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
      <p className="text-3xl sm:text-4xl font-bold text-primary font-mono" data-testid={`text-counter-${label.toLowerCase().replace(/\s+/g, '-')}`}>
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
      className="fixed top-14 left-0 right-0 h-0.5 bg-primary origin-left z-50"
      style={{ scaleX }}
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
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-primary/3 rounded-full blur-3xl"
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
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-primary/20">
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
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-4 h-4 text-primary-foreground" />
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
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6"
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
    </section>
  );
}

function StatsBar() {
  return (
    <section className="py-16 px-6 border-y bg-card/30">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <AnimatedCounter target={10} label="Years Leading" suffix="+" />
          <AnimatedCounter target={50} label="Engineers Hired" suffix="+" />
          <AnimatedCounter target={3} label="Teams Built" />
          <AnimatedCounter target={99} label="Uptime Target" suffix="%" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
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
    </section>
  );
}

function ExpertiseSection() {
  const [activeTab, setActiveTab] = useState("01");

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
    },
  ];

  const activeData = expertiseData.find((d) => d.number === activeTab)!;

  return (
    <section id="expertise" className="py-24 px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="max-w-5xl mx-auto"
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
                          <div className="flex flex-wrap gap-2">
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
    <section id="approach" className="py-24 px-6 bg-card/50">
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
      <ScrollProgress />
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <ExpertiseSection />
      <ApproachSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
