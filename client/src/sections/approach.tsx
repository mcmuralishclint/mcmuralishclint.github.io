import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SectionHeading } from "@/components/motion/section-heading";
import { EASE } from "@/components/motion/reveal";
import { approachStages } from "@/data/approach";

export function ApproachSection() {
  return (
    <section id="approach" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, hsl(var(--gradient-from) / 0.05), transparent 50%), radial-gradient(circle at 75% 70%, hsl(var(--gradient-to) / 0.04), transparent 50%)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <SectionHeading
          chapter="05"
          chapterTitle="Leadership Philosophy"
          title="How I Think"
          subtitle="Every engagement runs the same pipeline. The inputs change; the discipline doesn't."
          testId="text-section-approach"
        />

        <div className="relative">
          {approachStages.map((stage, i) => (
            <div key={stage.id}>
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
                className="group relative rounded-lg border border-card-border bg-card/80 backdrop-blur-sm p-5 sm:p-6 transition-colors duration-300 hover:border-primary/30"
                data-testid={`card-stage-${stage.id}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-11 h-11 rounded-md bg-primary/10 shrink-0 transition-colors duration-300 group-hover:bg-primary/20">
                    <stage.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground/60">
                        Stage {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl tracking-tight">{stage.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1.5">{stage.line}</p>
                  </div>
                  <p className="hidden sm:block font-mono text-xs text-primary/80 text-right shrink-0 max-w-[150px]">
                    {stage.proof}
                  </p>
                </div>
                <p className="sm:hidden font-mono text-xs text-primary/80 mt-3 pl-[3.75rem]">
                  {stage.proof}
                </p>
              </motion.div>

              {i < approachStages.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: 0.25, ease: EASE }}
                  className="flex flex-col items-center py-1.5 origin-top"
                  aria-hidden
                >
                  <span className="w-px h-5 bg-gradient-to-b from-primary/60 to-primary/20" />
                  <ArrowDown className="w-3.5 h-3.5 text-primary/50 -mt-1" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
