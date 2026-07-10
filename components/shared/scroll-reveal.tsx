"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginRegistered = false;

/**
 * Wrap a grid/list and mark each child that should reveal with
 * `data-reveal`. Batches entries with ScrollTrigger so a row of 4-6 items
 * staggers in together rather than firing 4-6 separate observers.
 * Falls back to an instant, un-animated reveal for prefers-reduced-motion.
 */
export function ScrollReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", container.current);
    if (items.length === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    if (!pluginRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      pluginRegistered = true;
    }

    gsap.set(items, { opacity: 0, y: 24 });
    const triggers = ScrollTrigger.batch(items, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          overwrite: true,
        }),
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
