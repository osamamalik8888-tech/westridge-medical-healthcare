import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and resolve conflicting Tailwind utilities
 * (e.g. cn("px-2", condition && "px-4") -> "px-4").
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Shared hour-to-12-hour-clock conversion. Pulled out after a duplicate,
 * buggy version of this exact logic shipped in one of the two places that
 * needed it — see git history on open-status.tsx if curious.
 */
export function to12Hour(hour24: number): { hour12: number; period: "AM" | "PM" } {
  const normalized = hour24 % 24;
  const period = normalized >= 12 ? "PM" : "AM";
  const hour12 = normalized % 12 === 0 ? 12 : normalized % 12;
  return { hour12, period };
}

/** 15 -> "3:00 PM", 24 -> "12:00 AM", 10 -> "10:00 AM". Whole-hour only. */
export function formatHour12(hour24: number): string {
  const { hour12, period } = to12Hour(hour24);
  return `${hour12}:00 ${period}`;
}

/**
 * Shared form-field styling, used by both the appointment and careers
 * forms. Previously duplicated verbatim in both files — pulled out after
 * an audit flagged it, same reasoning as the time-formatting helpers
 * above: one copy means one place to fix or restyle, not two to keep
 * in sync by hand.
 */
export const formFieldClass =
  "h-11 w-full rounded-xl border border-line bg-white px-3.5 text-[0.9375rem] text-navy-900 focus:border-navy-400 focus:outline-none dark:border-white/15 dark:bg-white/5 dark:text-white dark:focus:border-white/40";
export const formLabelClass = "text-sm font-medium text-navy-700 dark:text-white/75";
export const formErrorClass = "text-xs text-red-600 dark:text-red-300";
export const formTextareaClass =
  "w-full resize-none rounded-xl border border-line bg-white px-3.5 py-3 text-[0.9375rem] text-navy-900 focus:border-navy-400 focus:outline-none dark:border-white/15 dark:bg-white/5 dark:text-white dark:focus:border-white/40";

/**
 * "Dr. Khalid Ahmed" -> "KA". Used as a placeholder avatar wherever a
 * doctor doesn't have a photo yet. Previously duplicated in two files and
 * hardcoded as literal "KA" text in a third (wrong for any doctor other
 * than this one) — pulled out for the same reason as everything else in
 * this file: one copy means it's actually correct everywhere, not just
 * wherever someone remembered to update it.
 */
export function initials(name: string): string {
  return name
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
