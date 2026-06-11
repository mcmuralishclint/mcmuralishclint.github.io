import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, useReducedMotion } from "framer-motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  glare?: boolean;
};

/** 3D tilt-on-hover card with an optional cursor-following sheen. */
export function TiltCard({ children, className, max = 6, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 260, damping: 24 });
  const sry = useSpring(ry, { stiffness: 260, damping: 24 });
  const sheen = useMotionTemplate`radial-gradient(360px circle at ${gx}% ${gy}%, hsl(var(--primary) / 0.08), transparent 65%)`;

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
      {glare && !reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: sheen }}
        />
      )}
    </motion.div>
  );
}
