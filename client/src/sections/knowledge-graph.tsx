import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from "d3-force";
import { Award } from "lucide-react";
import { SectionHeading } from "@/components/motion/section-heading";
import { EASE } from "@/components/motion/reveal";
import {
  graphNodes,
  graphLinks,
  certifications,
  hubs,
  type GraphNode,
} from "@/data/certifications";

const WIDTH = 880;
const HEIGHT = 560;

type SimNode = GraphNode & SimulationNodeDatum;
type SimLink = SimulationLinkDatum<SimNode>;
type LaidOutLink = { source: SimNode; target: SimNode };

function useGraphLayout() {
  return useMemo(() => {
    const nodes: SimNode[] = graphNodes.map((n) => ({ ...n }));
    const links: SimLink[] = graphLinks.map((l) => ({ ...l }));

    const simulation = forceSimulation(nodes)
      .force(
        "link",
        forceLink<SimNode, SimLink>(links)
          .id((d) => d.id)
          .distance((l) => {
            const s = l.source as SimNode;
            const t = l.target as SimNode;
            if (s.type === "hub" && t.type === "hub") return 190;
            if (s.type === "skill" || t.type === "skill") return 70;
            return 95;
          })
      )
      .force("charge", forceManyBody().strength(-260))
      .force("center", forceCenter(0, 0))
      .force(
        "collide",
        forceCollide<SimNode>().radius((d) => (d.type === "hub" ? 56 : d.type === "cert" ? 50 : 38))
      )
      .stop();

    for (let i = 0; i < 300; i++) simulation.tick();

    // Normalize into the viewBox with padding.
    const pad = 64;
    const xs = nodes.map((n) => n.x ?? 0);
    const ys = nodes.map((n) => n.y ?? 0);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    nodes.forEach((n) => {
      n.x = pad + (((n.x ?? 0) - minX) / (maxX - minX || 1)) * (WIDTH - pad * 2);
      n.y = pad + (((n.y ?? 0) - minY) / (maxY - minY || 1)) * (HEIGHT - pad * 2);
    });

    return { nodes, links: links as unknown as LaidOutLink[] };
  }, []);
}

function wrapLabel(label: string, max = 18): string[] {
  if (label.length <= max) return [label];
  const words = label.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > max && current) {
      lines.push(current.trim());
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function KnowledgeGraphSection() {
  const { nodes, links } = useGraphLayout();
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const neighbors = useMemo(() => {
    const map = new Map<string, Set<string>>();
    nodes.forEach((n) => map.set(n.id, new Set([n.id])));
    links.forEach((l) => {
      map.get(l.source.id)?.add(l.target.id);
      map.get(l.target.id)?.add(l.source.id);
    });
    return map;
  }, [nodes, links]);

  const isLit = (id: string) => !hovered || neighbors.get(hovered)?.has(id);
  const hoveredNode = hovered ? nodes.find((n) => n.id === hovered) : null;

  return (
    <section id="knowledge" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(225deg, hsl(var(--gradient-to) / 0.04), transparent 40%, hsl(var(--gradient-from) / 0.05))",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          chapter="04"
          chapterTitle="Platform Ecosystems"
          title="Knowledge Graph"
          subtitle="Fourteen certifications mapped as a living network — hover a node to trace how credentials, skills, and domains connect."
          testId="text-section-knowledge"
        />

        {/* Interactive graph — desktop and tablet */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="hidden sm:block relative rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden"
        >
          <div className="absolute inset-0 grid-lines opacity-70 pointer-events-none" />
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="relative w-full h-auto"
            onMouseLeave={() => setHovered(null)}
            role="img"
            aria-label="Knowledge graph of certifications, skills, and domains"
          >
            {links.map((l) => {
              const lit = !hovered || (neighbors.get(hovered)?.has(l.source.id) && neighbors.get(hovered)?.has(l.target.id) && (l.source.id === hovered || l.target.id === hovered));
              return (
                <line
                  key={`${l.source.id}-${l.target.id}`}
                  x1={l.source.x}
                  y1={l.source.y}
                  x2={l.target.x}
                  y2={l.target.y}
                  stroke="hsl(var(--primary))"
                  strokeWidth={lit && hovered ? 1.4 : 0.8}
                  strokeOpacity={lit ? (hovered ? 0.5 : 0.18) : 0.05}
                  style={{ transition: "stroke-opacity 0.25s, stroke-width 0.25s" }}
                />
              );
            })}

            {nodes.map((n, i) => {
              const lit = isLit(n.id);
              const r = n.type === "hub" ? 30 : n.type === "cert" ? 9 : 6;
              const labelLines = n.type === "hub" ? [n.label] : wrapLabel(n.label);
              return (
                <motion.g
                  key={n.id}
                  animate={
                    reduced
                      ? undefined
                      : { y: [0, i % 2 === 0 ? -4 : 4, 0] }
                  }
                  transition={{ duration: 5 + (i % 5), repeat: Infinity, ease: "easeInOut" }}
                  style={{ opacity: lit ? 1 : 0.18, transition: "opacity 0.25s" }}
                  onMouseEnter={() => setHovered(n.id)}
                  data-testid={`graph-node-${n.id}`}
                >
                  {/* Generous hover target */}
                  <circle cx={n.x} cy={n.y} r={Math.max(r + 14, 22)} fill="transparent" />

                  {n.type === "hub" ? (
                    <>
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={r}
                        fill="hsl(var(--primary) / 0.08)"
                        stroke="hsl(var(--primary))"
                        strokeOpacity={0.5}
                        strokeWidth={1}
                      />
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={r + 7}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeOpacity={0.18}
                        strokeWidth={0.8}
                        strokeDasharray="3 4"
                      />
                      {(() => {
                        // Scale font size to keep text inside r=30 circle (safe width ~50px).
                        // Monospace char ≈ 0.62em wide; cap at 10px, floor at 7px.
                        const safeWidth = 50;
                        const fontSize = Math.max(7, Math.min(10, Math.floor(safeWidth / (n.label.length * 0.62))));
                        return (
                          <text
                            x={n.x}
                            y={(n.y ?? 0) + fontSize * 0.35}
                            textAnchor="middle"
                            fill="hsl(var(--foreground))"
                            style={{ fontSize: `${fontSize}px`, fontFamily: "var(--font-mono)", letterSpacing: "0.05em", textTransform: "uppercase" }}
                          >
                            {n.label}
                          </text>
                        );
                      })()}
                    </>
                  ) : (
                    <>
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={r}
                        fill={n.type === "cert" ? "hsl(var(--card))" : "hsl(var(--muted))"}
                        stroke={n.type === "cert" ? "hsl(var(--chart-3))" : "hsl(var(--muted-foreground))"}
                        strokeOpacity={n.type === "cert" ? 0.8 : 0.5}
                        strokeWidth={1.2}
                      />
                      {labelLines.map((line, li) => (
                        <text
                          key={line}
                          x={n.x}
                          y={(n.y ?? 0) + r + 12 + li * 11}
                          textAnchor="middle"
                          fill="hsl(var(--muted-foreground))"
                          style={{ fontSize: "9.5px", fontFamily: "var(--font-mono)" }}
                        >
                          {line}
                        </text>
                      ))}
                    </>
                  )}
                </motion.g>
              );
            })}
          </svg>

          {/* Detail readout */}
          <div className="relative border-t border-border/60 px-5 py-3 font-mono text-xs text-muted-foreground min-h-[2.75rem] flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
            {hoveredNode ? (
              hoveredNode.type === "cert" ? (
                <span data-testid="text-graph-readout">
                  <span className="text-foreground">{hoveredNode.label}</span>
                  {" — "}
                  {hoveredNode.issuer}, {hoveredNode.year}
                </span>
              ) : (
                <span data-testid="text-graph-readout">
                  <span className="text-foreground">{hoveredNode.label}</span>
                  {hoveredNode.type === "hub" ? " domain — connected credentials highlighted" : " — applied skill"}
                </span>
              )
            ) : (
              <span data-testid="text-graph-readout">14 certifications // 6 domains // hover to explore</span>
            )}
          </div>
        </motion.div>

        {/* Compact list — mobile fallback */}
        <div className="sm:hidden space-y-2.5">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4, ease: EASE }}
              className="flex items-center gap-3 rounded-lg border border-card-border bg-card/80 px-4 py-3"
              data-testid={`card-cert-${cert.id}`}
            >
              <Award className="w-4 h-4 text-primary shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug">{cert.label}</p>
                <p className="font-mono text-[0.65rem] text-muted-foreground mt-0.5">
                  {cert.issuer} // {cert.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Domain legend */}
        <div className="hidden sm:flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
          {hubs.map((hub) => (
            <button
              key={hub.id}
              onMouseEnter={() => setHovered(hub.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(hub.id)}
              onBlur={() => setHovered(null)}
              className={`font-mono text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-200 ${
                hovered === hub.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`legend-${hub.id}`}
            >
              ● {hub.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
