import React from "react";
import { motion, type Variants } from "framer-motion";

type Direction = "up" | "left" | "right" | "zoom";

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 36 },
  left: { x: -48 },
  right: { x: 48 },
  zoom: { scale: 0.9 },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  from?: Direction;
  delay?: number;
  /** Render as a stagger container: direct <RevealItem> children animate in sequence */
  stagger?: number;
  as?: "div" | "li" | "ul";
}

/** Fades + slides content in the first time it scrolls into view. */
export const Reveal: React.FC<RevealProps> = ({ children, className, from = "up", delay = 0, stagger, as = "div" }) => {
  const Comp = motion[as];
  const variants: Variants = {
    hidden: { opacity: 0, filter: "blur(6px)", ...offsets[from] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
        ...(stagger ? { staggerChildren: stagger, delayChildren: delay } : {}),
      },
    },
  };
  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </Comp>
  );
};

/** Child of a <Reveal stagger> container. */
export const RevealItem: React.FC<{ children: React.ReactNode; className?: string; from?: Direction }> = ({
  children,
  className,
  from = "up",
}) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, ...offsets[from] },
      show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 24 } },
    }}
  >
    {children}
  </motion.div>
);
