"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "westridge-text-size";

export function TextSizeToggle({ className }: { className?: string }) {
  const [isLarge, setIsLarge] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLarge(document.documentElement.classList.contains("text-lg-mode"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("text-lg-mode");
    document.documentElement.classList.toggle("text-lg-mode", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "large" : "default");
    } catch {
      // Same fallback as ThemeToggle — persistence is a nice-to-have, not
      // a requirement for the toggle to work this visit.
    }
    setIsLarge(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isLarge ?? false}
      aria-label={isLarge ? "Switch to default text size" : "Switch to larger text"}
      title={isLarge ? "Default text size" : "Larger text"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full text-[0.8rem] font-bold text-navy-500 transition-colors hover:bg-navy-50 hover:text-navy-900 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white",
        className
      )}
    >
      <span aria-hidden="true">A{isLarge === null ? "" : isLarge ? "-" : "+"}</span>
    </button>
  );
}
