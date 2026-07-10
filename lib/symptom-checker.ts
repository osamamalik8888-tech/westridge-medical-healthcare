/**
 * Pure triage logic, separated from
 * components/patient-resources/symptom-checker.tsx for the same reason as
 * health-calculators.ts — testable without rendering React.
 *
 * Deliberately never names a condition — see the component file for the
 * full reasoning. This only ever answers "how soon."
 */

export const durations = ["Just started today", "A few days", "About a week", "Longer than a week"] as const;
export type Duration = (typeof durations)[number];

export const severities = [
  { key: "mild", label: "Mild — noticeable, but not stopping my day" },
  { key: "moderate", label: "Moderate — getting in the way of normal activities" },
  { key: "severe", label: "Severe — hard to ignore or function through" },
] as const;
export type SeverityKey = (typeof severities)[number]["key"];

export interface Guidance {
  tier: string;
  detail: string;
}

export function getGuidance(duration: Duration, severity: SeverityKey): Guidance {
  if (severity === "severe") {
    return {
      tier: "Book today if you can",
      detail:
        "Severe or hard-to-ignore symptoms are worth getting checked promptly, even if they turn out to be minor.",
    };
  }
  if (severity === "moderate" && (duration === "About a week" || duration === "Longer than a week")) {
    return {
      tier: "Worth scheduling a visit soon",
      detail: "Something that's persisted and is affecting your day is worth a proper look.",
    };
  }
  if (duration === "Longer than a week") {
    return {
      tier: "Worth getting checked",
      detail: "Even mild symptoms that stick around for a week or more are worth mentioning to the doctor.",
    };
  }
  return {
    tier: "Keep an eye on it",
    detail: "This may settle on its own. If it isn't improving in a few days, or gets worse, book a visit.",
  };
}
