"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@/components/shared/icons";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "westridge-theme";

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // localStorage can throw in private-browsing edge cases — theme
      // just won't persist across visits, which is a fine fallback.
    }
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full text-navy-500 transition-colors hover:bg-navy-50 hover:text-navy-900 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white",
        className
      )}
    >
      {isDark === null ? null : isDark ? (
        <SunIcon className="h-[1.1rem] w-[1.1rem]" />
      ) : (
        <MoonIcon className="h-[1.1rem] w-[1.1rem]" />
      )}
    </button>
  );
}
