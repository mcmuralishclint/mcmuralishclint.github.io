import { lazy, Suspense, useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Magnetic } from "@/components/motion/magnetic";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { RevealLines, fadeUp, stagger } from "@/components/motion/reveal";
import { scrollToSection } from "@/components/layout/nav-bar";
import { identity, heroRoles, stats } from "@/data/site";
import profileImage from "@assets/1708862676484-2_1770641756175.jpeg";

const HeroScene = lazy(() => import("@/components/three/hero-scene"));

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneActive = useInView(sectionRef, { margin: "200px 0px" });
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const [mountScene, setMountScene] = useState(false);

  // Defer the WebGL canvas until after first paint so text renders instantly.
  useEffect(() => {
    if (reduced) return;
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => setMountScene(true))
      : window.setTimeout(() => setMountScene(true), 200);
    return () => {
      if (window.cancelIdleCallback && typeof id === "number") window.cancelIdleCallback(id);
      else clearTimeout(id as number);
    };
  }, [reduced]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-14 overflow-hidden"
    >
      {/* Atmosphere layers */}
      <div className="absolute inset-0 mesh-gradient pointer-events-none" />
      <div className="absolute inset-0 grid-lines pointer-events-none" />

      {/* Living network — the command-center backdrop */}
      {!reduced && mountScene && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 pointer-events-none opacity-80">
            <HeroScene active={sceneActive} dark={theme === "dark"} />
          </div>
        </Suspense>
      )}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <motion.div variants={fadeUp} className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden gradient-border glow">
              <img
                src={profileImage}
                alt="Muralish Clinton"
                className="w-full h-full object-cover"
                width={112}
                height={112}
                data-testid="img-profile"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary/40 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
          </div>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="font-mono text-[0.7rem] sm:text-xs tracking-[0.3em] uppercase text-primary/90 mb-6"
          data-testid="badge-role"
        >
        </motion.p>

        <h1
          className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[1.02] mb-6"
          data-testid="text-hero-name"
        >
          <RevealLines lines={["Muralish Clinton"]} delay={0.15} />
        </h1>

        <div className="mb-6" data-testid="text-hero-roles">
          <RevealLines
            lines={heroRoles}
            delay={0.45}
            className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight"
            lineClassName="gradient-text pb-0.5"
          />
        </div>

        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Ten years building the systems behind the systems — cloud-native platforms,
          engineering organisations, and AI-native foundations that turn architecture
          into business outcomes.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Button size="lg" onClick={() => scrollToSection("stories")} data-testid="button-view-systems">
              Explore the Systems
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              size="lg"
              variant="outline"
              className="backdrop-blur-sm"
              onClick={() => scrollToSection("contact")}
              data-testid="button-get-in-touch"
            >
              Start a Conversation
            </Button>
          </Magnetic>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-20">
          <motion.button
            onClick={() => scrollToSection("principles")}
            className="text-muted-foreground/60"
            animate={reduced ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Scroll to first chapter"
            data-testid="button-scroll-down"
          >
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function StatsBar() {
  return (
    <section className="relative py-14 px-6 border-y border-border/70 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--gradient-from) / 0.06), hsl(var(--gradient-via) / 0.04), hsl(var(--gradient-to) / 0.06))",
        }}
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="max-w-4xl mx-auto relative z-10"
      >
        <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl sm:text-4xl font-mono font-medium gradient-text"
                data-testid={`text-counter-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix ?? ""} />
              </p>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-muted-foreground mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
