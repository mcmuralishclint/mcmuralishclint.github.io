import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/motion/section-heading";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { EASE } from "@/components/motion/reveal";
import { missions } from "@/data/missions";

function MissionCard({ mission }: { mission: (typeof missions)[number] }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      className="relative pl-12 sm:pl-16 pb-16 last:pb-0"
      data-testid={`card-mission-${mission.id}`}
    >
      {/* Node marker on the timeline */}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 320, damping: 20, delay: 0.15 }}
        className="absolute left-[11px] sm:left-[19px] top-1.5 w-[11px] h-[11px] rounded-full bg-primary glow"
      />

      <header className="mb-4">
        <p className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-primary/80 mb-2">
          Mission {mission.index} <span className="text-muted-foreground">// {mission.period}</span>
        </p>
        <h3 className="font-serif text-2xl sm:text-3xl tracking-tight">
          {mission.role} <span className="text-muted-foreground/70 italic">at {mission.org}</span>
        </h3>
      </header>

      <p className="text-sm sm:text-base text-foreground/70 dark:text-foreground/80 leading-relaxed max-w-2xl mb-5">
        {mission.summary}
      </p>

      <ul className="space-y-2 mb-6 max-w-2xl">
        {mission.impact.map((line) => (
          <li key={line} className="flex items-start gap-2.5 text-sm text-foreground/80">
            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {mission.metrics.length > 0 && (
        <div className="flex flex-wrap gap-x-10 gap-y-4 mb-6">
          {mission.metrics.map((m) => (
            <div key={m.label}>
              <p className="font-mono text-2xl sm:text-3xl gradient-text">
                <AnimatedNumber value={m.value} suffix={m.suffix ?? ""} decimals={m.decimals ?? 0} />
              </p>
              <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {mission.tech.map((t) => (
          <Badge key={t} variant="secondary" className="text-xs no-default-active-elevate">
            {t}
          </Badge>
        ))}
      </div>
    </motion.article>
  );
}

export function MissionsSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  return (
    <section id="missions" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(225deg, transparent 30%, hsl(var(--gradient-via) / 0.03) 55%, hsl(var(--gradient-from) / 0.05))",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          chapter="02"
          chapterTitle="What I Have Built"
          title="Mission Timeline"
          subtitle="A decade of missions, in order of engagement. Each one expanded the blast radius — from features, to systems, to organisations."
          testId="text-section-missions"
        />

        <div ref={timelineRef} className="relative">
          {/* Track */}
          <div className="absolute left-4 sm:left-6 top-1 bottom-0 w-px bg-border" aria-hidden />
          {/* Scroll-driven fill */}
          <motion.div
            className="absolute left-4 sm:left-6 top-1 bottom-0 w-px origin-top"
            style={{
              scaleY: progress,
              background:
                "linear-gradient(180deg, hsl(var(--gradient-from)), hsl(var(--gradient-via)), hsl(var(--gradient-to)))",
            }}
            aria-hidden
          />

          {missions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      </div>
    </section>
  );
}
