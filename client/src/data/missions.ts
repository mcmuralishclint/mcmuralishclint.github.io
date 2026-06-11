export type MissionMetric = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
};

export type Mission = {
  id: string;
  index: string;
  org: string;
  role: string;
  period: string;
  summary: string;
  impact: string[];
  metrics: MissionMetric[];
  tech: string[];
};

export const missions: Mission[] = [
  {
    id: "aum",
    index: "01",
    org: "AUM Creative Solutions",
    role: "Software Developer",
    period: "Sep 2016 — Sep 2019",
    summary:
      "First production systems. Shipped client products end-to-end with a small team — where the habit of owning outcomes, not tickets, was formed.",
    impact: [
      "Delivered full-lifecycle web applications for clients across industries",
      "Owned everything from requirements through deployment and support",
    ],
    metrics: [{ value: 3, suffix: " yrs", label: "Full-lifecycle delivery" }],
    tech: ["Full Stack", "Web Applications", "Client Delivery"],
  },
  {
    id: "bassetti",
    index: "02",
    org: "Bassetti Shanghai",
    role: "Python Developer",
    period: "Nov 2019 — May 2020",
    summary:
      "Engineering-data software for industrial clients in China. Built Python tooling against complex domain models, working across languages and cultures.",
    impact: [
      "Developed Python solutions on the TEEXMA engineering-data platform",
      "Operated in a cross-cultural, multilingual engineering environment",
    ],
    metrics: [],
    tech: ["Python", "Engineering Data", "PLM"],
  },
  {
    id: "circles-senior",
    index: "03",
    org: "Circles.Life",
    role: "Senior Engineer",
    period: "Jan 2021 — Jan 2023",
    summary:
      "Telecom scale. Contributed to the company's highest-revenue product launch of 2021 — the SG Family Plan — while running seven production microservices without a single SLA breach.",
    impact: [
      "Contributed to the highest-revenue product launch of 2021 (SG Family Plan)",
      "Engineered roaming and 5G features expanding market reach",
      "Built a prepaid flow for a postpaid market: 5,000+ new customers monthly",
    ],
    metrics: [
      { value: 99.9, suffix: "%", decimals: 1, label: "Uptime across 7 services" },
      { value: 0, label: "SLA breaches" },
    ],
    tech: ["Ruby on Rails", "Go", "Microservices", "RabbitMQ", "MySQL"],
  },
  {
    id: "circles-architect",
    index: "04",
    org: "Circles.Life",
    role: "Solutions Architect",
    period: "Jan 2023 — Mar 2024",
    summary:
      "Owned the architecture of the Australian market — 25 microservices and the revenue line that ran on them. Codified twelve reference architectures so good decisions became the default.",
    impact: [
      "Drove 25%+ annual revenue growth for the Australian market",
      "Reduced MTTR by 30%; sub-30-minute disaster recovery, zero catastrophic outages over 14 months",
      "Improved NPS by 10+ points; primary contact for 20+ third-party integrations",
    ],
    metrics: [
      { value: 25, suffix: "%+", label: "Annual revenue growth" },
      { value: 30, suffix: "%", label: "MTTR reduction" },
      { value: 12, label: "Reference architectures" },
    ],
    tech: ["AWS", "Kubernetes", "Distributed Systems", "Observability", "REST APIs"],
  },
  {
    id: "ivedha",
    index: "05",
    org: "iVedha",
    role: "Solutions Architect",
    period: "Apr 2024 — Present",
    summary:
      "Built a 30-engineer platform engineering organisation from zero and shipped Platformnex — an Internal Developer Portal that changed how every product team onboards, deploys, and operates.",
    impact: [
      "Cut engineer onboarding time 40% with the Platformnex IDP",
      "Reduced cloud infrastructure spend 30% and deployment cycle time 50%",
      "Improved platform-wide reliability 25%; MTTD down 40%",
      "Built pre-sales MVP prototypes in Go within 2-week sprints",
    ],
    metrics: [
      { value: 30, label: "Engineers, org built from zero" },
      { value: 40, suffix: "%", label: "Faster onboarding" },
      { value: 30, suffix: "%", label: "Cloud spend reduction" },
    ],
    tech: ["Go", "GCP", "Terraform", "Kubernetes", "GitOps", "FinOps"],
  },
  {
    id: "xigenix",
    index: "06",
    org: "Series A Funded Organisation",
    role: "Fractional CTO",
    period: "May 2024 — Feb 2026",
    summary:
      "Executive technology leadership across a multi-domain product organisation. Scaled engineering to 40 headcount across six disciplines and founded a dedicated AI & R&D function from zero.",
    impact: [
      "Scaled the engineering organisation to 40 headcount across 6 disciplines",
      "Cut engineering rework 35% with architecture review gates and ADR practice",
      "Reduced commit-to-production lead time 40% with standardised CI/CD on AWS",
      "Founded the AI & R&D function from zero",
    ],
    metrics: [
      { value: 40, label: "Engineering headcount" },
      { value: 35, suffix: "%", label: "Rework reduction" },
      { value: 90, suffix: "%+", label: "Sprint predictability" },
    ],
    tech: ["AWS", "CI/CD", "ADRs", "Team Topologies", "AI & R&D"],
  },
];
