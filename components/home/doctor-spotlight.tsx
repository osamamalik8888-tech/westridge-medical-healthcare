import Link from "next/link";
import dynamic from "next/dynamic";
import { doctors, whatsapp } from "@/lib/site-config";
import { ArrowRightIcon } from "@/components/shared/icons";

const ScrollReveal = dynamic(() =>
  import("@/components/shared/scroll-reveal").then((mod) => mod.ScrollReveal)
);

export function DoctorSpotlight() {
  return (
    <section className="bg-mist py-24 dark:bg-navy-950 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
          Your Physician
        </p>
        <h2 className="mt-4 max-w-xl text-balance font-serif text-3xl text-navy-950 dark:text-white sm:text-4xl">
          Meet the doctor you&rsquo;ll actually see.
        </h2>

        <ScrollReveal className="mt-12 grid gap-6 sm:grid-cols-2">
          {doctors.map((doctor) => (
            <div
              key={doctor.slug}
              data-reveal
              className="overflow-hidden rounded-[1.75rem] border border-line bg-white dark:border-white/10 dark:bg-navy-900"
            >
              <div className="p-7">
                <h3 className="font-serif text-xl text-navy-950 dark:text-white">{doctor.name}</h3>
                <p className="mt-1 text-sm font-medium text-red-600 dark:text-red-300">
                  {doctor.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-navy-600 dark:text-white/65">
                  {doctor.bio}
                </p>

                {(doctor.credentials || doctor.pastRole || doctor.registration) && (
                  <dl className="mt-4 flex flex-col gap-1 border-t border-line pt-4 text-xs text-navy-500 dark:border-white/10 dark:text-white/50">
                    {doctor.credentials && <dd>{doctor.credentials}</dd>}
                    {doctor.pastRole && <dd>{doctor.pastRole}</dd>}
                    {doctor.registration && (
                      <dd className="font-medium text-navy-400 dark:text-white/50">
                        {doctor.registration}
                      </dd>
                    )}
                  </dl>
                )}

                <Link
                  href={whatsapp.href(`Hi, I'd like to book an appointment with ${doctor.name}.`)}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-navy-900 transition-colors hover:text-red-600 dark:text-white dark:hover:text-red-400"
                >
                  Book with {doctor.name}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}

          <div
            data-reveal
            className="flex flex-col items-center justify-center gap-3 rounded-[1.75rem] border border-dashed border-line px-7 py-14 text-center dark:border-white/15"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-50 text-2xl font-light text-navy-400 dark:bg-white/10 dark:text-white/50">
              +
            </span>
            <p className="text-sm text-navy-500 dark:text-white/55">
              More physicians joining as Westridge grows.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
