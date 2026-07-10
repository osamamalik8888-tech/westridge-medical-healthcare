"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * A full page load naturally resets focus to <body> and screen readers
 * announce the new title. Client-side route changes do neither by
 * default — the visitor's focus silently stays wherever it was (often a
 * nav link), so a screen reader user gets no signal anything happened.
 * This moves focus to <main> (skipping the very first render, so it
 * doesn't steal focus on initial page load) which both resets keyboard
 * tab order to the top of the new content and triggers an announcement.
 */
export function RouteFocusManager() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    document.getElementById("main-content")?.focus();
  }, [pathname]);

  return null;
}
