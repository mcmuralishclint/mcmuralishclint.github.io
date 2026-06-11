import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

export const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({ children, className, delay = 0, y = 28, once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type RevealLinesProps = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  staggerDelay?: number;
};

/** Staggered line-by-line reveal with a clip mask, for display headlines. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  staggerDelay = 0.12,
}: RevealLinesProps) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * staggerDelay, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
