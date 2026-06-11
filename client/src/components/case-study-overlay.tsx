import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArchSketch } from "@/components/arch-sketch";
import { EASE } from "@/components/motion/reveal";
import { storyCategories, type Story } from "@/data/stories";

type CaseStudyOverlayProps = {
  story: Story;
  onClose: () => void;
};

export default function CaseStudyOverlay({ story, onClose }: CaseStudyOverlayProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={story.title}
      data-testid={`overlay-story-${story.id}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.98 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative max-w-4xl mx-auto my-8 sm:my-16 rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 sm:px-10 pt-8 sm:pt-10 pb-6 border-b border-border/60">
          <div className="absolute inset-0 mesh-gradient pointer-events-none" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-primary/80 mb-3">
                Case Study // {storyCategories[story.category]}
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl tracking-tight leading-tight">
                {story.title}
              </h3>
              <p className="font-mono text-sm gradient-text mt-2">{story.metric}</p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              aria-label="Close case study"
              data-testid="button-close-overlay"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="px-6 sm:px-10 py-8 space-y-10">
          {/* Challenge */}
          <div>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">
              01 / The Challenge
            </p>
            <p className="text-sm sm:text-base text-foreground/85 leading-relaxed max-w-2xl">
              {story.challenge}
            </p>
          </div>

          {/* Architecture */}
          <div>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">
              02 / The Architecture
            </p>
            <p className="text-sm sm:text-base text-foreground/85 leading-relaxed max-w-2xl mb-6">
              {story.architecture.summary}
            </p>
            <div className="rounded-lg border border-border/60 bg-background/50 grid-lines p-4 sm:p-6">
              <ArchSketch
                nodes={story.architecture.nodes}
                links={story.architecture.links}
                detailed
                className="w-full h-auto max-h-[340px]"
              />
            </div>
          </div>

          {/* Outcome */}
          <div>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">
              03 / The Outcome
            </p>
            <ul className="space-y-2.5">
              {story.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/85">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
            <span className="sr-only">Technologies and themes</span>
            {story.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs no-default-active-elevate mt-3">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
