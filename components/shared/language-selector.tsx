"use client";

import { useState, useRef, useEffect } from "react";
import { GlobeIcon, ChevronDownIcon } from "@/components/shared/icons";
import { cn } from "@/lib/utils";

// Only English exists today — adding a real second language means adding
// translated content somewhere real to serve, not just a longer array
// here. This is the UI affordance, ready for that day, not a promise it's
// already done.
const languages = [{ code: "en", label: "English" }] as const;

export function LanguageSelector({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Select language, currently English"
        className="inline-flex h-9 items-center gap-1 rounded-full border border-line px-2.5 text-xs font-medium text-navy-700 transition-colors hover:bg-navy-50 dark:border-white/15 dark:text-white/75 dark:hover:bg-white/10"
      >
        <GlobeIcon className="h-3.5 w-3.5" />
        EN
        <ChevronDownIcon className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-40 rounded-xl border border-line bg-white p-1.5 shadow-lg shadow-navy-900/5 dark:border-white/10 dark:bg-navy-900">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-navy-700 hover:bg-navy-50 dark:text-white/80 dark:hover:bg-white/10"
            >
              {lang.label}
              <span className="text-xs text-navy-400 dark:text-white/40">✓</span>
            </button>
          ))}
          <p className="mt-1 border-t border-line px-3 pt-2 text-[0.6875rem] text-navy-400 dark:border-white/10 dark:text-white/40">
            More languages coming soon
          </p>
        </div>
      )}
    </div>
  );
}
