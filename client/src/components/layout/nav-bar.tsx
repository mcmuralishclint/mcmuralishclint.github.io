import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { navItems, sectionIds } from "@/data/site";

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-14 left-0 right-0 h-px origin-left z-50"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, hsl(var(--gradient-from)), hsl(var(--gradient-via)), hsl(var(--gradient-to)))",
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
      aria-label="Toggle color theme"
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

export function NavBar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // Track whichever section crosses the vertical center of the viewport,
      // so sections taller than the viewport still register.
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/75 backdrop-blur-md border-b border-border/60"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4 h-14">
        <button
          onClick={() => scrollToSection("hero")}
          className="font-serif italic text-xl tracking-tight"
          data-testid="link-home"
        >
          MC
        </button>
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(item.id)}
              data-testid={`link-nav-${item.id}`}
              className={`relative font-mono text-xs uppercase tracking-wider transition-colors ${
                activeSection === item.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <span className="mr-1.5 text-[0.6rem] text-muted-foreground/50">
                {String(i + 1).padStart(2, "0")}
              </span>
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
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
