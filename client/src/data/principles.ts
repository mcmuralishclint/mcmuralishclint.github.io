import type { LucideIcon } from "lucide-react";
import {
  Network,
  Layers,
  Gauge,
  TerminalSquare,
  Sparkles,
  Briefcase,
} from "lucide-react";

export type Principle = {
  id: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  detail: string;
  proof: { metric: string; label: string };
};

export const principles: Principle[] = [
  {
    id: "systems-thinking",
    title: "Systems Thinking",
    icon: Network,
    summary:
      "Outages, rework, and slow delivery are properties of the system — not the people.",
    detail:
      "I map the whole sociotechnical system before changing any part of it. At Circles.Life, codifying twelve reference architectures turned every recurring debate into a documented decision and removed the architect as a bottleneck.",
    proof: { metric: "60%", label: "faster architecture review cycles" },
  },
  {
    id: "platform-first",
    title: "Platform First",
    icon: Layers,
    summary: "Golden paths beat heroics. Paved roads compound; workarounds decay.",
    detail:
      "At iVedha I built Platformnex, an Internal Developer Portal, and a 30-engineer platform organisation from zero — service catalogs, self-service provisioning, and GitOps pipelines that product teams adopt because they are the easiest path, not the mandated one.",
    proof: { metric: "40%", label: "reduction in engineer onboarding time" },
  },
  {
    id: "execution-excellence",
    title: "Execution Excellence",
    icon: Gauge,
    summary: "Predictability is a feature you ship to the entire business.",
    detail:
      "Architecture review gates and ADR practice at a Series A funded organisation cut engineering rework by 35% and lifted sprint delivery predictability past 90% — so commercial teams could finally make promises engineering would keep.",
    proof: { metric: "90%+", label: "sprint delivery predictability" },
  },
  {
    id: "developer-experience",
    title: "Developer Experience",
    icon: TerminalSquare,
    summary: "Friction is a tax every engineer pays, every day. I remove it at the source.",
    detail:
      "Standardised CI/CD on AWS cut commit-to-production lead time by 40% at a Series A funded organisation; GitOps automation at iVedha halved deployment cycle time. Velocity comes from the pipeline, not the pressure.",
    proof: { metric: "40%", label: "faster commit-to-production lead time" },
  },
  {
    id: "ai-native",
    title: "AI-Native Mindset",
    icon: Sparkles,
    summary: "AI is an operating model, not a feature on the roadmap.",
    detail:
      "I founded a dedicated AI & R&D function from zero at a Series A funded organisation — staffing, charter, and delivery cadence — and hold the Generative AI Leader certification. The goal is organisations where AI agents are part of the system design, not bolted on.",
    proof: { metric: "0 → 1", label: "AI & R&D function founded" },
  },
  {
    id: "business-alignment",
    title: "Business Alignment",
    icon: Briefcase,
    summary: "Architecture decisions are business decisions in disguise.",
    detail:
      "Trusted by C-level stakeholders to translate architecture into outcomes and GTM strategy. Owning the Australian market architecture at Circles.Life — 25 microservices — meant owning its revenue line too.",
    proof: { metric: "25%+", label: "annual revenue growth delivered" },
  },
];
