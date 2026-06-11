export type GraphNodeType = "hub" | "cert" | "skill";

export type GraphNode = {
  id: string;
  label: string;
  type: GraphNodeType;
  hub?: string;
  year?: string;
  issuer?: string;
};

export type GraphLink = { source: string; target: string };

export const hubs: GraphNode[] = [
  { id: "hub-cloud", label: "Cloud", type: "hub" },
  { id: "hub-platform", label: "Platform", type: "hub" },
  { id: "hub-ai", label: "AI", type: "hub" },
  { id: "hub-data", label: "Data", type: "hub" },
  { id: "hub-finops", label: "FinOps", type: "hub" },
  { id: "hub-leadership", label: "Leadership", type: "hub" },
];

export const certifications: GraphNode[] = [
  { id: "genai-leader", label: "Generative AI Leader", type: "cert", hub: "hub-ai", year: "2026", issuer: "Google" },
  { id: "app-modern", label: "App Modernization Pre-sales Expert", type: "cert", hub: "hub-cloud", year: "2026", issuer: "Google" },
  { id: "gcp-dev", label: "GCP Cloud Developer", type: "cert", hub: "hub-cloud", year: "2025", issuer: "Google" },
  { id: "gcp-arch", label: "GCP Professional Cloud Architect", type: "cert", hub: "hub-cloud", year: "2024", issuer: "Google" },
  { id: "gcp-sec", label: "GCP Security Engineer", type: "cert", hub: "hub-cloud", year: "2024", issuer: "Google" },
  { id: "gcp-eng", label: "GCP Cloud Engineer", type: "cert", hub: "hub-cloud", year: "2024", issuer: "Google" },
  { id: "gcp-prac", label: "GCP Cloud Digital Leader", type: "cert", hub: "hub-cloud", year: "2024", issuer: "Google" },
  { id: "aws-saa", label: "AWS Solutions Architect Associate", type: "cert", hub: "hub-cloud", year: "2024", issuer: "AWS" },
  { id: "finops", label: "FinOps Certified Engineer", type: "cert", hub: "hub-finops", year: "2024", issuer: "Linux Foundation" },
  { id: "digital-transform", label: "Advanced Digital Transformation", type: "cert", hub: "hub-leadership", year: "2024", issuer: "IIM" },
  { id: "agile-pm", label: "Agile Project Management Professional", type: "cert", hub: "hub-leadership", year: "2024", issuer: "Atlassian" },
  { id: "ckad", label: "CKAD — Kubernetes Application Developer", type: "cert", hub: "hub-platform", year: "2023", issuer: "Linux Foundation" },
  { id: "databricks-genai", label: "Generative AI Fundamentals", type: "cert", hub: "hub-ai", year: "2024", issuer: "Databricks" },
  { id: "databricks-lakehouse", label: "Lakehouse Fundamentals", type: "cert", hub: "hub-data", year: "2024", issuer: "Databricks" },
  { id: "blockchain", label: "Blockchain Specialization", type: "cert", hub: "hub-data", year: "2020", issuer: "SUNY" },
  { id: "data-science", label: "Applied Data Science in Python", type: "cert", hub: "hub-data", year: "2018", issuer: "University of Michigan" },
];

export const skills: GraphNode[] = [
  { id: "sk-k8s", label: "Kubernetes", type: "skill", hub: "hub-platform" },
  { id: "sk-terraform", label: "Terraform", type: "skill", hub: "hub-platform" },
  { id: "sk-gcp", label: "GCP", type: "skill", hub: "hub-cloud" },
  { id: "sk-aws", label: "AWS", type: "skill", hub: "hub-cloud" },
  { id: "sk-genai", label: "GenAI Platforms", type: "skill", hub: "hub-ai" },
  { id: "sk-cost", label: "Cost Optimization", type: "skill", hub: "hub-finops" },
];

export const graphNodes: GraphNode[] = [...hubs, ...certifications, ...skills];

const hubRing: GraphLink[] = hubs.map((h, i) => ({
  source: h.id,
  target: hubs[(i + 1) % hubs.length].id,
}));

export const graphLinks: GraphLink[] = [
  ...hubRing,
  ...certifications.map((c) => ({ source: c.id, target: c.hub! })),
  ...skills.map((s) => ({ source: s.id, target: s.hub! })),
  // Cross-domain relationships
  { source: "sk-k8s", target: "ckad" },
  { source: "sk-cost", target: "finops" },
  { source: "sk-genai", target: "genai-leader" },
];
