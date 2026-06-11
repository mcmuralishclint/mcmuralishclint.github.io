import type { LucideIcon } from "lucide-react";
import {
  ShoppingCart,
  Signal,
  UserPlus,
  Cpu,
  Network,
  BookOpen,
  Users,
  TrendingUp,
  Boxes,
} from "lucide-react";

export type ArchNode = { id: string; label: string; x: number; y: number; hub?: boolean };
export type ArchLink = [string, string];

export type Story = {
  id: string;
  category: "build" | "architecture" | "leadership";
  title: string;
  metric: string;
  subtitle: string;
  icon: LucideIcon;
  challenge: string;
  architecture: { summary: string; nodes: ArchNode[]; links: ArchLink[] };
  outcomes: string[];
  tags: string[];
};

export const storyCategories: Record<Story["category"], string> = {
  build: "Build",
  architecture: "Architecture",
  leadership: "Leadership",
};

export const stories: Story[] = [
  {
    id: "idp",
    category: "architecture",
    title: "Platformnex — Internal Developer Portal",
    metric: "40% faster onboarding",
    subtitle: "Platform engineering at iVedha",
    icon: Cpu,
    challenge:
      "Every product team was reinventing infrastructure, pipelines, and observability. Engineers took months to become productive, and cloud spend grew faster than the teams it served.",
    architecture: {
      summary:
        "A modular IDP with composable, independently deployable components: a service catalog and portal in front, self-service provisioning, golden-path CI/CD, and shared observability underneath — all on Kubernetes with GitOps as the control plane.",
      nodes: [
        { id: "portal", label: "Portal", x: 50, y: 10, hub: true },
        { id: "catalog", label: "Service Catalog", x: 18, y: 32 },
        { id: "cicd", label: "CI/CD Golden Paths", x: 50, y: 36 },
        { id: "iac", label: "Self-Service IaC", x: 82, y: 32 },
        { id: "obs", label: "Observability", x: 30, y: 58 },
        { id: "k8s", label: "Kubernetes", x: 68, y: 58 },
      ],
      links: [
        ["portal", "catalog"],
        ["portal", "cicd"],
        ["portal", "iac"],
        ["cicd", "k8s"],
        ["iac", "k8s"],
        ["catalog", "obs"],
        ["obs", "k8s"],
      ],
    },
    outcomes: [
      "Engineer onboarding time cut by 40%",
      "Deployment cycle time reduced 50%; cloud spend down 30%",
      "30-engineer platform organisation built from zero to run it",
    ],
    tags: ["Platform Engineering", "IDP", "GitOps", "Kubernetes"],
  },
  {
    id: "roaming",
    category: "build",
    title: "5G & Roaming Features",
    metric: "25% annual revenue increase",
    subtitle: "Telecom platform, Circles.Life",
    icon: Signal,
    challenge:
      "Expanding a digital telco into roaming and 5G meant working across carrier partners, complex protocol layers, and billing systems that could not afford a single misstep.",
    architecture: {
      summary:
        "Roaming and 5G services integrated with carrier partners through a dedicated integration layer, with billing and provisioning decoupled behind asynchronous messaging for resilience.",
      nodes: [
        { id: "app", label: "Customer App", x: 14, y: 18 },
        { id: "bss", label: "BSS Core", x: 50, y: 18, hub: true },
        { id: "roam", label: "Roaming Service", x: 50, y: 50 },
        { id: "carrier", label: "Carrier Partners", x: 86, y: 50 },
        { id: "billing", label: "Billing", x: 14, y: 50 },
      ],
      links: [
        ["app", "bss"],
        ["bss", "roam"],
        ["roam", "carrier"],
        ["bss", "billing"],
        ["roam", "billing"],
      ],
    },
    outcomes: [
      "Directly contributed to a 25% annual revenue increase",
      "Expanded the product's addressable market across borders",
    ],
    tags: ["5G", "Roaming", "Telecom", "Carrier Integrations"],
  },
  {
    id: "prepaid",
    category: "build",
    title: "Prepaid Flow for a Postpaid Market",
    metric: "5,000+ new customers monthly",
    subtitle: "New segment unlocked, Circles.Life",
    icon: UserPlus,
    challenge:
      "The market was built around postpaid contracts. Acquiring prepaid customers required new billing, onboarding, and activation flows the platform was never designed for.",
    architecture: {
      summary:
        "A prepaid onboarding pipeline — KYC, wallet, billing, and activation as discrete services — grafted onto a postpaid core without destabilising it.",
      nodes: [
        { id: "onboard", label: "Onboarding", x: 14, y: 20 },
        { id: "kyc", label: "KYC", x: 44, y: 14 },
        { id: "wallet", label: "Wallet", x: 74, y: 20 },
        { id: "billing", label: "Prepaid Billing", x: 30, y: 52, hub: true },
        { id: "activate", label: "Activation", x: 66, y: 52 },
      ],
      links: [
        ["onboard", "kyc"],
        ["kyc", "wallet"],
        ["onboard", "billing"],
        ["wallet", "billing"],
        ["billing", "activate"],
      ],
    },
    outcomes: [
      "5,000+ new customer acquisitions per month",
      "Opened an entirely new recurring-revenue segment",
    ],
    tags: ["Billing Systems", "Customer Acquisition", "Market Expansion"],
  },
  {
    id: "ecommerce",
    category: "build",
    title: "E-Commerce Platform from Scratch",
    metric: "Zero to production, full ownership",
    subtitle: "Series D organisation",
    icon: ShoppingCart,
    challenge:
      "A Series D organisation needed end-to-end e-commerce systems built from the ground up — architecture, implementation, and operations — under rapid customer growth.",
    architecture: {
      summary:
        "A scalable commerce stack: storefront and API gateway in front of catalog, order, and payment services, each independently deployable and backed by isolated data stores.",
      nodes: [
        { id: "web", label: "Storefront", x: 14, y: 16 },
        { id: "gw", label: "API Gateway", x: 50, y: 16, hub: true },
        { id: "catalog", label: "Catalog", x: 20, y: 50 },
        { id: "orders", label: "Orders", x: 50, y: 54 },
        { id: "pay", label: "Payments", x: 80, y: 50 },
      ],
      links: [
        ["web", "gw"],
        ["gw", "catalog"],
        ["gw", "orders"],
        ["gw", "pay"],
        ["orders", "pay"],
      ],
    },
    outcomes: [
      "Owned architecture through production end-to-end",
      "Platform absorbed the demands of a rapidly expanding customer base",
    ],
    tags: ["E-Commerce", "System Design", "Full Stack"],
  },
  {
    id: "integrations",
    category: "architecture",
    title: "Technical Point of Contact",
    metric: "20+ third-party integrations",
    subtitle: "Organisation-wide architecture authority",
    icon: Network,
    challenge:
      "Every vendor evaluation, partner integration, and architectural decision converged on one desk. Each integration had to meet security, performance, and scalability standards — without becoming a bottleneck.",
    architecture: {
      summary:
        "A hardened integration gateway pattern: every external partner connects through governed, observable contracts rather than ad-hoc point-to-point links.",
      nodes: [
        { id: "core", label: "Core Platform", x: 50, y: 46, hub: true },
        { id: "gw", label: "Integration Gateway", x: 50, y: 16 },
        { id: "p1", label: "Partner APIs", x: 14, y: 18 },
        { id: "p2", label: "Vendors", x: 86, y: 18 },
        { id: "sec", label: "Security Review", x: 18, y: 54 },
        { id: "obs", label: "Contract Monitoring", x: 82, y: 54 },
      ],
      links: [
        ["p1", "gw"],
        ["p2", "gw"],
        ["gw", "core"],
        ["sec", "core"],
        ["obs", "core"],
      ],
    },
    outcomes: [
      "20+ third-party organisations engaged and integrated",
      "Every integration held to security, performance, and scale standards",
    ],
    tags: ["Integration Architecture", "Vendor Management", "API Design"],
  },
  {
    id: "standards",
    category: "architecture",
    title: "Engineering Standards & ADRs",
    metric: "60% faster architecture reviews",
    subtitle: "Technical governance, Circles.Life",
    icon: BookOpen,
    challenge:
      "Recurring architectural debates consumed weeks and produced inconsistent systems. Knowledge lived in people's heads, and reviews depended on whoever was in the room.",
    architecture: {
      summary:
        "Twelve reference architectures plus an ADR practice and review gates — turning architecture from a meeting into a system every team can navigate alone.",
      nodes: [
        { id: "ref", label: "12 Reference Architectures", x: 50, y: 14, hub: true },
        { id: "adr", label: "ADR Repository", x: 18, y: 42 },
        { id: "gate", label: "Review Gates", x: 82, y: 42 },
        { id: "teams", label: "Product Teams", x: 50, y: 58 },
      ],
      links: [
        ["ref", "adr"],
        ["ref", "gate"],
        ["adr", "teams"],
        ["gate", "teams"],
      ],
    },
    outcomes: [
      "Architecture review cycle time reduced 60%",
      "Decisions documented, repeatable, and team-navigable",
    ],
    tags: ["ADRs", "Engineering Standards", "Technical Governance"],
  },
  {
    id: "rails-team",
    category: "leadership",
    title: "Rails + React Team from the Ground Up",
    metric: "100K+ monthly active users",
    subtitle: "Hiring to live product",
    icon: Users,
    challenge:
      "No team, no processes, a product that needed to exist. Hiring, onboarding, and delivery rhythm all had to be built simultaneously.",
    architecture: {
      summary:
        "Team and system designed together: a Rails API and React frontend owned end-to-end by a team hired and onboarded against the architecture they would run.",
      nodes: [
        { id: "hire", label: "Hiring Pipeline", x: 14, y: 18 },
        { id: "team", label: "Team", x: 50, y: 18, hub: true },
        { id: "rails", label: "Rails API", x: 30, y: 52 },
        { id: "react", label: "React App", x: 70, y: 52 },
        { id: "users", label: "100K+ MAU", x: 86, y: 18 },
      ],
      links: [
        ["hire", "team"],
        ["team", "rails"],
        ["team", "react"],
        ["react", "users"],
        ["rails", "react"],
      ],
    },
    outcomes: [
      "Live product serving 100,000+ monthly active users",
      "Consistent feature delivery with high availability",
    ],
    tags: ["Ruby on Rails", "React", "Team Building"],
  },
  {
    id: "org-scaling",
    category: "leadership",
    title: "Scaling Engineering to 40 Headcount",
    metric: "90%+ sprint predictability",
    subtitle: "Six disciplines, Series A startup",
    icon: TrendingUp,
    challenge:
      "A multi-domain product organisation growing faster than its engineering practices. Rework was eating capacity, and delivery dates were guesses.",
    architecture: {
      summary:
        "Org design as architecture: structured hiring, OKR-linked skills programmes, architecture review gates, and standardised CI/CD — capability built into the system rather than demanded from individuals.",
      nodes: [
        { id: "cto", label: "CTO Office", x: 50, y: 12, hub: true },
        { id: "hiring", label: "Structured Hiring", x: 16, y: 38 },
        { id: "okr", label: "OKR Skills Programmes", x: 50, y: 42 },
        { id: "gates", label: "Review Gates", x: 84, y: 38 },
        { id: "cicd", label: "Standardised CI/CD", x: 32, y: 60 },
        { id: "ai", label: "AI & R&D Function", x: 68, y: 60 },
      ],
      links: [
        ["cto", "hiring"],
        ["cto", "okr"],
        ["cto", "gates"],
        ["okr", "cicd"],
        ["gates", "cicd"],
        ["cto", "ai"],
      ],
    },
    outcomes: [
      "40 headcount across 6 disciplines",
      "35% rework reduction; 40% faster lead time; 90%+ on-time roadmap completion",
    ],
    tags: ["Org Scaling", "OKR", "CI/CD", "ADR"],
  },
  {
    id: "team-topologies",
    category: "leadership",
    title: "Platform + Product Org Design",
    metric: "Multi-product fast flow",
    subtitle: "Team Topologies in practice",
    icon: Boxes,
    challenge:
      "Multiple products, one delivery organisation, and constant cross-team friction. Ownership boundaries did not match the systems being built.",
    architecture: {
      summary:
        "Stream-aligned teams per product, one platform team beneath them, and enabling interactions on demand — Conway's Law used deliberately instead of suffered accidentally.",
      nodes: [
        { id: "s1", label: "Stream Team A", x: 22, y: 16 },
        { id: "s2", label: "Stream Team B", x: 56, y: 16 },
        { id: "en", label: "Enabling", x: 86, y: 26 },
        { id: "plat", label: "Platform Team", x: 44, y: 52, hub: true },
      ],
      links: [
        ["s1", "plat"],
        ["s2", "plat"],
        ["en", "s1"],
        ["en", "s2"],
      ],
    },
    outcomes: [
      "Clear ownership and fast flow across multiple products",
      "Sustainable delivery without cross-team gridlock",
    ],
    tags: ["Team Topologies", "Platform Teams", "Org Design"],
  },
];
