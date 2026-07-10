import type { Metadata } from "next";
import { CareersApplicationForm } from "@/components/careers/careers-application-form";
import { PulseDivider } from "@/components/shared/pulse-divider";
import { positions } from "@/lib/careers-schema";

export const metadata: Metadata = {
  title: "Careers",
  description: "Apply for a position at Westridge Medical Healthcare — doctors, nurses, pharmacists, lab and administrative staff.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <div className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
          Careers
        </p>
        <h1 className="mt-4 font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">
          Join the team
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-navy-600 dark:text-white/65">
          There&rsquo;s nothing open right now — we&rsquo;d rather say that
          plainly than list roles that aren&rsquo;t real. As Westridge grows,
          openings will show up here first, across roles like these:
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {positions.map((position) => (
            <span
              key={position}
              className="rounded-full border border-line px-3 py-1 text-sm text-navy-600 dark:border-white/10 dark:text-white/60"
            >
              {position}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[10rem]">
        <PulseDivider />
      </div>

      <div className="mx-auto mt-14 max-w-2xl">
        <h2 className="text-center font-serif text-2xl text-navy-950 dark:text-white">
          Apply anyway
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-[0.9375rem] leading-relaxed text-navy-600 dark:text-white/65">
          Send your details now and we&rsquo;ll keep them on file — when a
          role opens up that matches, you&rsquo;ll be the first call, not
          someone finding out after the fact.
        </p>

        <div className="mt-10 rounded-[1.75rem] border border-line bg-white p-6 shadow-sm shadow-navy-900/[0.03] dark:border-white/10 dark:bg-navy-900 sm:p-8">
          <CareersApplicationForm />
        </div>

        <p className="mt-6 text-center text-xs text-navy-400 dark:text-white/40">
          Submitting opens WhatsApp with your details already filled in —
          nothing is sent until you press send there.
        </p>
      </div>
    </div>
  );
}
