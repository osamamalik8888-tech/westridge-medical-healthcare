import dynamic from "next/dynamic";
import { ClockIcon, BuildingIcon, WhatsappIcon, HeartPulseIcon, CheckIcon } from "@/components/shared/icons";
import { trustBadges } from "@/lib/site-config";
import type { ComponentType } from "react";

const ScrollReveal = dynamic(() =>
  import("@/components/shared/scroll-reveal").then((mod) => mod.ScrollReveal)
);

const points: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}[] = [
  {
    title: "Open when others are closed",
    description:
      "Two OPD sessions a day, seven days a week — 10 AM–3 PM and 6 PM–midnight — with the pharmacy open 24/7 in between.",
    icon: ClockIcon,
  },
  {
    title: "One address, not three",
    description:
      "Doctor, lab, and pharmacy in the same building, so a single visit usually covers all three.",
    icon: BuildingIcon,
  },
  {
    title: "Walk in, or book ahead",
    description:
      "Message us on WhatsApp for a time that suits you, or come straight in — same-day slots are the norm.",
    icon: WhatsappIcon,
  },
  {
    title: "Built for families and businesses",
    description:
      "From a single check-up to a corporate health package arranged for your whole team.",
    icon: HeartPulseIcon,
  },
];

export function WhyWestridge() {
  return (
    <section className="bg-white py-24 dark:bg-navy-900 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
            Why Westridge
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl text-navy-950 dark:text-white sm:text-4xl">
            A neighbourhood clinic, run with hospital discipline.
          </h2>
        </div>

        <ScrollReveal className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ title, description, icon: Icon }) => (
            <div key={title} data-reveal>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-medium text-navy-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500 dark:text-white/55">
                {description}
              </p>
            </div>
          ))}
        </ScrollReveal>

        <div className="mt-16 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line pt-8 dark:border-white/10">
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-2 text-sm text-navy-600 dark:text-white/65"
            >
              <CheckIcon className="h-4 w-4 text-red-600 dark:text-red-300" />
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
