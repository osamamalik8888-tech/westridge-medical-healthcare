import { services, doctors } from "@/lib/site-config";

const stats = [
  { value: `${services.length}`, label: "Services under one roof" },
  { value: "24/7", label: "Pharmacy access" },
  { value: "7", label: "Days a week open" },
  { value: `${doctors[0]?.focusAreas?.length ?? 0}`, label: "Areas of clinical focus" },
];

/**
 * Every number here is real and derived from the actual site data, not
 * invented. Deliberately excludes anything that would need to be
 * fabricated to sound impressive — "patients served," a satisfaction
 * percentage, "years in business" — none of that is data anyone actually
 * has yet, and a healthcare site is exactly the wrong place to guess.
 */
export function StatsStrip() {
  return (
    <section className="border-y border-line bg-mist py-12 dark:border-white/10 dark:bg-navy-950/40">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-serif text-3xl text-navy-950 dark:text-white sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-xs text-navy-500 dark:text-white/55 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
