"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { clipPath: "inset(0 0 0 100%)" }}
      whileInView={{ clipPath: "inset(0 0 0 0%)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
