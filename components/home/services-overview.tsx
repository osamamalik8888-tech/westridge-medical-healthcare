import Link from "next/link";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { services, futureServices } from "@/lib/site-config";
import {
  StethoscopeIcon,
  FlaskIcon,
  PillIcon,
  SyringeIcon,
  HeartPulseIcon,
  BuildingIcon,
  ArrowRightIcon,
} from "@/components/shared/icons";
import type { ComponentType } from "react";

// Dynamic: GSAP is a real chunk of JS for a scroll-reveal effect that's a
// nice-to-have, not core content. Loading it as a separate chunk instead of
// bundling it into every page that uses this section keeps the initial
// homepage JS smaller — see AUDIT_REPORT.md.
const ScrollReveal = dynamic(() =>
  import("@/components/shared/scroll-reveal").then((mod) => mod.ScrollReveal)
);

const iconBySlug: Record<string, ComponentType<{ className?: string }>> = {
  "general-physician": StethoscopeIcon,
  "diagnostic-laboratory": FlaskIcon,
  pharmacy: PillIcon,
  vaccination: SyringeIcon,
  ecg: HeartPulseIcon,
  "corporate-healthcare": BuildingIcon,
};

export function ServicesOverview() {
  return (
    <section id="services" className="bg-white py-24 dark:bg-navy-900 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
            Services
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl text-navy-950 dark:text-white sm:text-4xl">
            Care that doesn&rsquo;t send you somewhere else.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-navy-600 dark:text-white/65">
            Westridge brings the physician, the lab, and the pharmacy into the
            same building on Main GT Road, so most visits end here instead of
            at three different addresses.
          </p>
        </div>

        <ScrollReveal className="mt-14 overflow-hidden rounded-[1.75rem] border border-line dark:border-white/10">
          {services.map((service, i) => {
            const Icon = iconBySlug[service.slug] ?? StethoscopeIcon;
            return (
              <Link
                key={service.slug}
                href={service.href}
                data-reveal
                className={cn(
                  "group flex items-start gap-5 px-6 py-6 transition-colors hover:bg-navy-50/60 dark:hover:bg-white/5 sm:items-center sm:px-8",
                  i !== services.length - 1 && "border-b border-line dark:border-white/10"
                )}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-900 transition-colors group-hover:bg-navy-900 group-hover:text-white dark:bg-white/10 dark:text-white dark:group-hover:bg-red-600">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-medium text-navy-900 dark:text-white">
                    {service.name}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-navy-500 dark:text-white/55">
                    {service.shortDescription}
                  </span>
                </span>
                <ArrowRightIcon className="hidden h-4 w-4 shrink-0 text-navy-300 transition-transform group-hover:translate-x-1 group-hover:text-navy-600 dark:text-white/40 dark:group-hover:text-white sm:block" />
              </Link>
            );
          })}
        </ScrollReveal>

        <div className="mt-8 flex flex-wrap items-center gap-2.5 text-sm text-navy-500 dark:text-white/50">
          <span className="mr-1 font-medium text-navy-700 dark:text-white/75">
            Expanding soon:
          </span>
          {futureServices.map((item) => (
            <span
              key={item}
              className="rounded-full border border-line px-3 py-1 text-navy-500 dark:border-white/10 dark:text-white/50"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
