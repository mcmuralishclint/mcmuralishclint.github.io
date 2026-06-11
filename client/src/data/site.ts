export const identity = {
  name: "Muralish Clinton",
  title: "Solutions Architect & Fractional CTO",
  email: "mcmuralishclint@outlook.com",
  linkedin: "https://linkedin.com/in/mcmuralishclint",
  github: "https://github.com/mcmuralishclint",
  resumePdf: "/resume.pdf",
};

export type NavItem = { label: string; id: string };

export const navItems: NavItem[] = [
  { label: "Principles", id: "principles" },
  { label: "Missions", id: "missions" },
  { label: "Systems", id: "stories" },
  { label: "Knowledge", id: "knowledge" },
  { label: "Approach", id: "approach" },
  { label: "Contact", id: "contact" },
];

export const sectionIds = ["hero", ...navItems.map((n) => n.id)];

export type Stat = { value: number; suffix?: string; label: string };

export const stats: Stat[] = [
  { value: 10, suffix: "+", label: "Years Building" },
  { value: 70, label: "Engineers Led & Hired" },
  { value: 14, label: "Certifications" },
  { value: 30, suffix: "%", label: "Cloud Spend Cut" },
];

export const heroRoles = [
  "Solutions Architect",
];
