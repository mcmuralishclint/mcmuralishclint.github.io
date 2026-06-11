import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

/** Page-wide ambient spotlight that trails the cursor. Desktop pointer devices only. */
export function CursorSpotlight() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const sx = useSpring(mx, { stiffness: 120, damping: 30, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 120, damping: 30, mass: 0.8 });
  const background = useMotionTemplate`radial-gradient(560px circle at ${sx}px ${sy}px, hsl(var(--primary) / 0.05), transparent 70%)`;

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      style={{ background }}
    />
  );
}
