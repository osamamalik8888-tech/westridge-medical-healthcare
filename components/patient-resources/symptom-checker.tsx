"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { whatsapp, primaryPhone, siteConfig } from "@/lib/site-config";
import { WhatsappIcon } from "@/components/shared/icons";
import { durations, severities, getGuidance, type Duration, type SeverityKey } from "@/lib/symptom-checker";

/**
 * Deliberately does NOT try to name or suggest a condition — that's
 * further than a non-clinical tool should go, and false reassurance is
 * more dangerous than no tool at all. It only ever answers two questions:
 * (1) is this an emergency right now, (2) roughly how soon should this be
 * looked at. Both are genuinely useful without pretending to diagnose.
 */

const redFlags = [
  "Chest pain or pressure, especially spreading to the arm, jaw, or back",
  "Difficulty breathing or severe shortness of breath",
  "Sudden weakness, numbness, or drooping on one side of the face or body",
  "Sudden confusion, or trouble speaking or understanding speech",
  "Severe bleeding that won't stop",
  "Severe allergic reaction — face/throat swelling, or a rash with difficulty breathing",
  "Loss of consciousness or fainting",
  "Sudden, severe abdominal pain",
];

const inactivePill =
  "border-line bg-white text-navy-600 hover:bg-navy-50 dark:border-white/15 dark:bg-white/5 dark:text-white/65 dark:hover:bg-white/10";
const activePill = "border-navy-900 bg-navy-900 text-white dark:border-white dark:bg-white dark:text-navy-900";

export function SymptomChecker() {
  const [checkedFlags, setCheckedFlags] = useState<Set<string>>(new Set());
  const [duration, setDuration] = useState<Duration | null>(null);
  const [severity, setSeverity] = useState<SeverityKey | null>(null);

  const hasRedFlag = checkedFlags.size > 0;

  function toggleFlag(flag: string) {
    setCheckedFlags((prev) => {
      const next = new Set(prev);
      next.has(flag) ? next.delete(flag) : next.add(flag);
      return next;
    });
  }

  const result = duration && severity ? getGuidance(duration, severity) : null;

  return (
    <div className="rounded-[1.75rem] border border-line bg-white p-6 dark:border-white/10 dark:bg-navy-900 sm:p-8">
      <p className="text-sm leading-relaxed text-navy-500 dark:text-white/55">
        This is a general guide to how soon you should be seen — it does not diagnose
        anything. For a real assessment, see Dr. Ahmed.
      </p>

      <h3 className="mt-6 font-serif text-lg text-navy-900 dark:text-white">
        First — do you have any of these right now?
      </h3>
      <div className="mt-4 flex flex-col gap-2.5">
        {redFlags.map((flag) => (
          <label
            key={flag}
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-line px-4 py-3 text-sm text-navy-700 transition-colors hover:bg-navy-50 dark:border-white/15 dark:text-white/75 dark:hover:bg-white/5"
          >
            <input
              type="checkbox"
              checked={checkedFlags.has(flag)}
              onChange={() => toggleFlag(flag)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-red-600"
            />
            {flag}
          </label>
        ))}
      </div>

      {hasRedFlag ? (
        <div className="mt-6 rounded-2xl bg-red-50 p-5 dark:bg-red-500/10">
          <p className="font-serif text-2xl text-red-700 dark:text-red-300">
            Get help now — don&rsquo;t wait
          </p>
          <p className="mt-2 text-sm leading-relaxed text-navy-700 dark:text-white/75">
            Call {siteConfig.emergency.number} (Rescue) or go to your nearest emergency
            department immediately. This website can&rsquo;t help with what you&rsquo;ve
            described — a general physician clinic isn&rsquo;t equipped for this, and it
            needs care right away.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 border-t border-line pt-7 dark:border-white/10">
            <h3 className="font-serif text-lg text-navy-900 dark:text-white">
              How long has this been going on?
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {durations.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    duration === d ? activePill : inactivePill
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <h3 className="font-serif text-lg text-navy-900 dark:text-white">
              How would you describe it?
            </h3>
            <div className="mt-4 flex flex-col gap-2">
              {severities.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSeverity(s.key)}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                    severity === s.key ? activePill : inactivePill
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {result && (
            <div className="mt-7 rounded-2xl border border-line bg-mist p-5 dark:border-white/10 dark:bg-white/5">
              <p className="font-serif text-2xl text-navy-950 dark:text-white">{result.tier}</p>
              <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-white/65">
                {result.detail}
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsapp.href(
                    "Hi Westridge Medical Healthcare, I'd like to book an appointment."
                  )}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-red-600 px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-red-700"
                >
                  <WhatsappIcon className="h-4 w-4" />
                  Book on WhatsApp
                </a>
                <a
                  href={primaryPhone.href}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-line px-5 text-[0.9375rem] font-medium text-navy-800 transition-colors hover:bg-navy-50 dark:border-white/15 dark:text-white/85 dark:hover:bg-white/10"
                >
                  Call {primaryPhone.display}
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
