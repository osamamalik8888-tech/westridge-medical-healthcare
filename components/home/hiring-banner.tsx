import dynamic from "next/dynamic";
import { ButtonLink } from "@/components/ui/button";
import { BriefcaseIcon, HeartPulseIcon, BuildingIcon, ArrowRightIcon } from "@/components/shared/icons";
import { positions } from "@/lib/careers-schema";

const ScrollReveal = dynamic(() =>
  import("@/components/shared/scroll-reveal").then((mod) => mod.ScrollReveal)
);

const reasons = [
  {
    icon: BuildingIcon,
    title: "Complete care, one team",
    body: "The doctor, the lab, and the pharmacy work together under one roof — not siloed departments that never talk to each other.",
  },
  {
    icon: HeartPulseIcon,
    title: "Real community impact",
    body: "Walk-ins are the norm here, not the exception. You'll see the same families come back, not just a stream of appointment slots.",
  },
  {
    icon: BriefcaseIcon,
    title: "Room to grow with us",
    body: "Westridge is actively expanding into new departments — joining now means growing alongside it, not stepping into something already fixed.",
  },
];

export function HiringBanner() {
  return (
    <section className="relative overflow-hidden bg-mist py-20 dark:bg-navy-950/60 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl dark:bg-red-500/[0.07]"
      />
      <ScrollReveal className="relative mx-auto max-w-5xl px-6 text-center">
        <div data-reveal className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-900/20">
          <BriefcaseIcon className="h-6 w-6" />
        </div>
        <p data-reveal className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
          We&rsquo;re Hiring
        </p>
        <h2 data-reveal className="mx-auto mt-4 max-w-2xl text-balance font-serif text-3xl text-navy-950 dark:text-white sm:text-4xl">
          Build your career at Westridge Medical Healthcare
        </h2>
        <p data-reveal className="mx-auto mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-navy-600 dark:text-white/65">
          We&rsquo;re currently looking to hear from {positions.slice(0, -1).join(", ")}, and{" "}
          {positions[positions.length - 1]}.
        </p>

        <div data-reveal className="mt-12 grid gap-6 text-left sm:grid-cols-3">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-line bg-white p-6 dark:border-white/10 dark:bg-navy-900">
              <Icon className="h-5 w-5 text-red-600 dark:text-red-300" />
              <h3 className="mt-3 font-medium text-navy-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500 dark:text-white/55">{body}</p>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-10">
          <ButtonLink href="/careers" size="lg">
            Apply Now
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </ScrollReveal>
    </section>
  );
}
