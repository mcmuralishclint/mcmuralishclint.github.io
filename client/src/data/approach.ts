import type { LucideIcon } from "lucide-react";
import { Eye, Route, Layers, Users, Workflow, BarChart3 } from "lucide-react";

export type ApproachStage = {
  id: string;
  title: string;
  icon: LucideIcon;
  line: string;
  proof: string;
};

export const approachStages: ApproachStage[] = [
  {
    id: "vision",
    title: "Vision",
    icon: Eye,
    line: "Name the future state in business terms before drawing any diagram.",
    proof: "Technology aligned across 4 product verticals",
  },
  {
    id: "strategy",
    title: "Strategy",
    icon: Route,
    line: "Sequence bets by risk and reversibility — decide what must be true first.",
    proof: "12 reference architectures codified",
  },
  {
    id: "platforms",
    title: "Platforms",
    icon: Layers,
    line: "Build the paved road the strategy will travel on.",
    proof: "40% faster engineer onboarding via IDP",
  },
  {
    id: "teams",
    title: "Teams",
    icon: Users,
    line: "Design the organisation so the right architecture can emerge.",
    proof: "70 engineers led and hired across orgs",
  },
  {
    id: "execution",
    title: "Execution",
    icon: Workflow,
    line: "Review gates, ADRs, and feedback loops keep delivery honest.",
    proof: "90%+ sprint delivery predictability",
  },
  {
    id: "outcomes",
    title: "Outcomes",
    icon: BarChart3,
    line: "Measure in revenue, reliability, and time given back to engineers.",
    proof: "25%+ annual revenue growth delivered",
  },
];
