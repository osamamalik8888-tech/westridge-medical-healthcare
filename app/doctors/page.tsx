import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { WhatsappIcon, ClockIcon, CheckIcon, PhoneIcon, MailIcon } from "@/components/shared/icons";
import { doctors, whatsapp, siteConfig, primaryPhone } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Our Doctors",
  description: "Meet Dr. Khalid Ahmed and the physicians at Westridge Medical Healthcare, Rawalpindi.",
  alternates: { canonical: "/doctors" },
};

export default function DoctorsPage() {
  return (
    <div className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
          Doctors
        </p>
        <h1 className="mt-4 font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">
          Meet our physicians
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-navy-600 dark:text-white/65">
          Westridge is built to grow into a full team — here&rsquo;s who
          you&rsquo;ll see today.
        </p>
      </div>

      <div className="mx-auto mt-16 flex max-w-4xl flex-col gap-8">
        {doctors.map((doctor) => (
          <div
            key={doctor.slug}
            className="overflow-hidden rounded-[1.75rem] border border-line bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-navy-900/[0.06] dark:border-white/10 dark:bg-navy-900"
          >
            <div className="p-8 sm:p-9">
              <h2 className="font-serif text-2xl text-navy-950 dark:text-white">{doctor.name}</h2>
              <p className="mt-1 font-medium text-red-600 dark:text-red-300">{doctor.role}</p>
              <p className="mt-4 leading-relaxed text-navy-600 dark:text-white/65">{doctor.bio}</p>

              {(doctor.credentials || doctor.pastRole || doctor.registration) && (
                <div className="mt-6 grid gap-3 border-t border-line pt-6 dark:border-white/10 sm:grid-cols-3">
                  {doctor.credentials && (
                    <div className="rounded-xl bg-navy-50 px-3.5 py-3 dark:bg-white/5">
                      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-navy-400 dark:text-white/40">
                        Qualification
                      </p>
                      <p className="mt-1 text-sm font-medium text-navy-900 dark:text-white">
                        {doctor.credentials}
                      </p>
                    </div>
                  )}
                  {doctor.pastRole && (
                    <div className="rounded-xl bg-navy-50 px-3.5 py-3 dark:bg-white/5">
                      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-navy-400 dark:text-white/40">
                        Experience
                      </p>
                      <p className="mt-1 text-sm font-medium text-navy-900 dark:text-white">
                        {doctor.pastRole}
                      </p>
                    </div>
                  )}
                  {doctor.registration && (
                    <div className="rounded-xl bg-navy-50 px-3.5 py-3 dark:bg-white/5">
                      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-navy-400 dark:text-white/40">
                        PM&amp;DC Registration
                      </p>
                      <p className="mt-1 text-sm font-medium text-navy-900 dark:text-white">
                        {doctor.registration.replace("PM&DC: ", "")}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-5 flex items-start gap-2.5 border-t border-line pt-5 text-sm text-navy-600 dark:border-white/10 dark:text-white/65">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-navy-400 dark:text-white/40" />
                <span>{siteConfig.hours.opdDisplay}</span>
              </div>

              {doctor.focusAreas && doctor.focusAreas.length > 0 && (
                <div className="mt-5 border-t border-line pt-5 dark:border-white/10">
                  <p className="text-xs font-medium uppercase tracking-[0.1em] text-navy-500 dark:text-white/50">
                    Special interests
                  </p>
                  <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {doctor.focusAreas.map((area) => (
                      <li
                        key={area}
                        className="flex items-start gap-2 text-sm text-navy-600 dark:text-white/65"
                      >
                        <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-600 dark:text-red-300" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-3">
                  <ButtonLink
                    href={whatsapp.href(
                      `Hi, I'd like to book an appointment with ${doctor.name}.`
                    )}
                  >
                    <WhatsappIcon className="h-4 w-4" />
                    Book with {doctor.name}
                  </ButtonLink>
                  <a
                    href={primaryPhone.href}
                    aria-label={`Call ${primaryPhone.display}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy-700 transition-colors hover:bg-navy-50 dark:border-white/15 dark:text-white/85 dark:hover:bg-white/10"
                  >
                    <PhoneIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    aria-label={`Email ${siteConfig.email}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy-700 transition-colors hover:bg-navy-50 dark:border-white/15 dark:text-white/85 dark:hover:bg-white/10"
                  >
                    <MailIcon className="h-4 w-4" />
                  </a>
                  <Link
                    href="/appointments"
                    className="text-sm font-medium text-navy-600 underline-offset-4 transition-colors hover:text-red-600 hover:underline dark:text-white/65 dark:hover:text-red-300"
                  >
                    Full booking form →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col items-center justify-center gap-3 rounded-[1.75rem] border border-dashed border-line px-8 py-14 text-center dark:border-white/15">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-50 text-2xl font-light text-navy-400 dark:bg-white/10 dark:text-white/50">
            +
          </span>
          <p className="max-w-xs text-sm text-navy-500 dark:text-white/55">
            More physicians will be added here as Westridge brings on
            additional departments — dentistry, ENT, gynecology, and
            physiotherapy are next.
          </p>
        </div>
      </div>
    </div>
  );
}
