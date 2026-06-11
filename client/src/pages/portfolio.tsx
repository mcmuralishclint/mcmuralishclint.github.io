import { lazy, Suspense } from "react";
import { NavBar, ScrollProgress } from "@/components/layout/nav-bar";
import { Footer } from "@/components/layout/footer";
import { CursorSpotlight } from "@/components/motion/cursor-spotlight";
import { HeroSection, StatsBar } from "@/sections/hero";
import { PrinciplesSection } from "@/sections/principles";
import { MissionsSection } from "@/sections/missions";
import { StoriesSection } from "@/sections/stories";
import { ApproachSection } from "@/sections/approach";
import { ContactSection } from "@/sections/contact";

const KnowledgeGraphSection = lazy(() =>
  import("@/sections/knowledge-graph").then((m) => ({ default: m.KnowledgeGraphSection }))
);

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <ScrollProgress />
      <CursorSpotlight />
      <main>
        <HeroSection />
        <StatsBar />
        <PrinciplesSection />
        <MissionsSection />
        <StoriesSection />
        <Suspense fallback={<section id="knowledge" className="py-28" />}>
          <KnowledgeGraphSection />
        </Suspense>
        <ApproachSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
