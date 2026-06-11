import { motion } from "framer-motion";
import type { ArchNode, ArchLink } from "@/data/stories";

type ArchSketchProps = {
  nodes: ArchNode[];
  links: ArchLink[];
  /** When false the sketch renders dimmed and undrawn (used for hover reveals). */
  active?: boolean;
  detailed?: boolean;
  className?: string;
};

/** Blueprint-style architecture diagram drawn with animated SVG strokes. */
export function ArchSketch({ nodes, links, active = true, detailed = false, className }: ArchSketchProps) {
  const byId = new Map(nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="0 0 100 64"
      className={className}
      role="img"
      aria-label="Architecture diagram"
    >
      {links.map(([a, b], i) => {
        const na = byId.get(a);
        const nb = byId.get(b);
        if (!na || !nb) return null;
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={na.x}
            y1={na.y + 4}
            x2={nb.x}
            y2={nb.y + 4}
            stroke="hsl(var(--primary))"
            strokeOpacity={0.35}
            strokeWidth={0.35}
            strokeDasharray="1.6 1.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: active ? 1 : 0 }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.6 }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${n.x}px ${n.y + 4}px` }}
        >
          <circle
            cx={n.x}
            cy={n.y + 4}
            r={n.hub ? 2.4 : 1.7}
            fill="hsl(var(--card))"
            stroke="hsl(var(--primary))"
            strokeWidth={n.hub ? 0.6 : 0.4}
          />
          {n.hub && (
            <circle
              cx={n.x}
              cy={n.y + 4}
              r={3.6}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeOpacity={0.3}
              strokeWidth={0.3}
            />
          )}
          <text
            x={n.x}
            y={n.y + 4 + (detailed ? 6.4 : 5.6)}
            textAnchor="middle"
            fill="hsl(var(--muted-foreground))"
            style={{
              fontSize: detailed ? "2.6px" : "2.9px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.04em",
            }}
          >
            {n.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
