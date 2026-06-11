import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/motion/section-heading";
import { TiltCard } from "@/components/motion/tilt-card";
import { EASE } from "@/components/motion/reveal";
import { principles } from "@/data/principles";

export function PrinciplesSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="principles" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--gradient-from) / 0.04), transparent 40%, hsl(var(--gradient-to) / 0.04))",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          chapter="01"
          chapterTitle="Who I Am"
          title="Operating Principles"
          subtitle="The system I run on. Six principles, each earned in production — select one to see the proof."
          testId="text-section-principles"
        />

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map((p, i) => {
            const isOpen = expanded === p.id;
            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.55, ease: EASE }}
                className={isOpen ? "sm:col-span-2 lg:col-span-3" : ""}
              >
                <TiltCard
                  max={isOpen ? 0 : 5}
                  className="relative h-full rounded-lg"
                >
                  <motion.button
                    layout
                    onClick={() => setExpanded(isOpen ? null : p.id)}
                    aria-expanded={isOpen}
                    data-testid={`card-principle-${p.id}`}
                    className={`w-full h-full text-left rounded-lg border bg-card/80 backdrop-blur-sm p-6 transition-colors duration-300 ${
                      isOpen
                        ? "border-primary/40 glow"
                        : "border-card-border hover:border-primary/30"
                    }`}
                  >
                    <motion.div layout="position" className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 shrink-0">
                          <p.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground/60">
                            P-{String(i + 1).padStart(2, "0")}
                          </p>
                          <h3 className="text-lg font-medium tracking-tight">{p.title}</h3>
                        </div>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="text-muted-foreground/50 mt-1"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.span>
                    </motion.div>

                    <motion.p layout="position" className="text-sm text-muted-foreground leading-relaxed mt-4">
                      {p.summary}
                    </motion.p>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="detail"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="pt-5 mt-5 border-t border-border/60 grid md:grid-cols-[1fr_auto] gap-6 items-center">
                            <p className="text-sm text-foreground/80 leading-relaxed max-w-2xl">
                              {p.detail}
                            </p>
                            <div className="md:text-right md:pl-8 md:border-l md:border-border/60">
                              <p className="font-mono text-3xl gradient-text">{p.proof.metric}</p>
                              <p className="text-xs text-muted-foreground mt-1 max-w-[180px] md:ml-auto">
                                {p.proof.label}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
