import { lazy, Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/motion/section-heading";
import { TiltCard } from "@/components/motion/tilt-card";
import { EASE } from "@/components/motion/reveal";
import { ArchSketch } from "@/components/arch-sketch";
import { stories, storyCategories, type Story } from "@/data/stories";

const CaseStudyOverlay = lazy(() => import("@/components/case-study-overlay"));

const categoryColors: Record<Story["category"], string> = {
  build: "bg-cyan-500/15 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300",
  architecture: "bg-violet-500/15 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300",
  leadership: "bg-amber-500/15 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
};

function StoryCard({ story, onOpen }: { story: Story; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <TiltCard max={4} className="relative h-full rounded-lg">
      <motion.button
        onClick={onOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="group w-full h-full text-left rounded-lg border border-card-border bg-card/80 backdrop-blur-sm overflow-hidden transition-colors duration-300 hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-ring"
        data-testid={`card-story-${story.id}`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 shrink-0">
                <story.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <Badge className={`text-[0.65rem] font-mono uppercase tracking-wider mb-1 ${categoryColors[story.category]}`}>
                  {storyCategories[story.category]}
                </Badge>
                <h3 className="text-base font-medium tracking-tight leading-snug">{story.title}</h3>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 shrink-0 mt-1 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          <p className="font-mono text-sm gradient-text mb-3">{story.metric}</p>

          {/* Architecture preview — draws itself on hover */}
          <div className="relative rounded-md border border-border/50 bg-background/40 mb-4 overflow-hidden">
            <div className="absolute inset-0 grid-lines opacity-60" />
            <ArchSketch
              nodes={story.architecture.nodes}
              links={story.architecture.links}
              active={hovered}
              className="relative w-full h-auto"
            />
            <AnimatePresence>
              {!hovered && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-[1.5px]"
                >
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                    Hover to render architecture
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed flex-1">{story.subtitle}</p>

          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-primary/70 mt-4 transition-colors group-hover:text-primary">
            Open case study →
          </p>
        </div>
      </motion.button>
    </TiltCard>
  );
}

const filterColors: Record<Story["category"], string> = {
  build: "data-[active=true]:bg-cyan-500/15 data-[active=true]:text-cyan-700 data-[active=true]:border-cyan-500/30 dark:data-[active=true]:text-cyan-300 dark:data-[active=true]:border-cyan-400/30",
  architecture: "data-[active=true]:bg-violet-500/15 data-[active=true]:text-violet-700 data-[active=true]:border-violet-500/30 dark:data-[active=true]:text-violet-300 dark:data-[active=true]:border-violet-400/30",
  leadership: "data-[active=true]:bg-amber-500/15 data-[active=true]:text-amber-700 data-[active=true]:border-amber-500/30 dark:data-[active=true]:text-amber-300 dark:data-[active=true]:border-amber-400/30",
};

export function StoriesSection() {
  const [openStory, setOpenStory] = useState<Story | null>(null);
  const [activeFilter, setActiveFilter] = useState<Story["category"] | "all">("all");

  const filtered = activeFilter === "all" ? stories : stories.filter((s) => s.category === activeFilter);

  return (
    <section id="stories" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(315deg, hsl(var(--gradient-via) / 0.04), transparent 40%, hsl(var(--gradient-from) / 0.04))",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          chapter="03"
          chapterTitle="Systems Thinking"
          title="Building Systems That Scale"
          subtitle="Nine systems, nine measurable outcomes. Hover a card to render its architecture; open it for the full mission report."
          testId="text-section-stories"
        />

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveFilter("all")}
            data-active={activeFilter === "all"}
            className="px-3 py-1.5 rounded-md border border-border text-sm font-mono tracking-wide text-muted-foreground transition-colors duration-200 hover:border-primary/30 hover:text-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:border-primary/30"
          >
            All
          </button>
          {(Object.keys(storyCategories) as Story["category"][]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              data-active={activeFilter === cat}
              className={`px-3 py-1.5 rounded-md border border-border text-sm font-mono tracking-wide text-muted-foreground transition-colors duration-200 hover:border-primary/30 hover:text-foreground ${filterColors[cat]}`}
            >
              {storyCategories[cat]}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((story, i) => (
              <motion.div
                key={story.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: (i % 3) * 0.06, duration: 0.4, ease: EASE }}
              >
                <StoryCard story={story} onOpen={() => setOpenStory(story)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Suspense fallback={null}>
        <AnimatePresence>
          {openStory && (
            <CaseStudyOverlay story={openStory} onClose={() => setOpenStory(null)} />
          )}
        </AnimatePresence>
      </Suspense>
    </section>
  );
}
