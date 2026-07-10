import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { PulseDivider } from "@/components/shared/pulse-divider";
import { WhatsappIcon, CheckIcon, StethoscopeIcon } from "@/components/shared/icons";
import { whatsapp, siteConfig, doctors, healthPackages } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Health Packages",
  description: "Consultation and screening packages at Westridge Medical Healthcare, built around Dr. Khalid Ahmed's clinical focus areas.",
  alternates: { canonical: "/health-packages" },
};

export default function HealthPackagesPage() {
  const doctor = doctors[0];

  return (
    <div className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
          Health Packages
        </p>
        <h1 className="mt-4 font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">
          Packages built around real expertise
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-navy-600 dark:text-white/65">
          Fixed pricing isn&rsquo;t published yet — quoting a number before
          it&rsquo;s confirmed would be worse than just saying so directly.
          What we can tell you now is what a package actually gets you:
          time with a physician who manages a genuinely broad range of
          conditions, not a generic checklist.
        </p>
      </div>

      {doctor && (
        <div className="mx-auto mt-16 max-w-3xl rounded-[1.75rem] border border-line bg-white p-8 dark:border-white/10 dark:bg-navy-900 sm:p-10">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-900 dark:bg-white/10 dark:text-white">
              <StethoscopeIcon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-serif text-xl text-navy-950 dark:text-white">
                {doctor.name}
              </h2>
              <p className="text-sm font-medium text-red-600 dark:text-red-300">{doctor.role}</p>
            </div>
          </div>

          {doctor.focusAreas && doctor.focusAreas.length > 0 && (
            <>
              <p className="mt-6 text-sm font-medium uppercase tracking-[0.1em] text-navy-500 dark:text-white/50">
                Conditions commonly seen and managed
              </p>
              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {doctor.focusAreas.map((area) => (
                  <li
                    key={area}
                    className="flex items-start gap-2.5 text-sm text-navy-700 dark:text-white/75"
                  >
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-300" />
                    {area}
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-navy-400 dark:border-white/10 dark:text-white/40">
            This describes the range of conditions {doctor.name} sees in
            practice as a {doctor.role.toLowerCase()} — not a claim of
            subspecialty certification. For anything specific to you, a
            consultation is the accurate next step, not this page.
          </p>
        </div>
      )}

      <div className="mx-auto mt-16 max-w-4xl">
        <h2 className="text-center font-serif text-2xl text-navy-950 dark:text-white sm:text-3xl">
          The shapes a package can take
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {healthPackages.map((pkg) => (
            <div
              key={pkg.slug}
              className="rounded-[1.75rem] border border-line bg-white p-7 dark:border-white/10 dark:bg-navy-900"
            >
              <h3 className="font-medium text-navy-900 dark:text-white">{pkg.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500 dark:text-white/55">
                {pkg.description}
              </p>
              <ul className="mt-4 flex flex-col gap-1.5">
                {pkg.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-navy-500 dark:text-white/50"
                  >
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-red-500" />
                    {item}
                  </li>
                ))}
              </ul>
              {pkg.price && (
                <p className="mt-4 border-t border-line pt-4 text-sm font-medium text-navy-900 dark:border-white/10 dark:text-white">
                  {pkg.price}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[10rem]">
        <PulseDivider />
      </div>

      <div className="mx-auto mt-16 max-w-2xl rounded-[1.75rem] bg-navy-950 px-8 py-12 text-center dark:border dark:border-white/10">
        <h2 className="font-serif text-2xl text-white sm:text-3xl">Tell us what you need</h2>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] text-white/60">
          A rough idea — for one person or a whole team — is enough to start.
        </p>
        <div className="mt-7">
          <ButtonLink
            href={whatsapp.href(
              "Hi Westridge Medical Healthcare, I'd like to ask about a health package."
            )}
            size="lg"
          >
            <WhatsappIcon className="h-4 w-4" />
            Ask on WhatsApp
          </ButtonLink>
        </div>
        <p className="mt-6 text-xs text-white/40">Or call {siteConfig.phones[0]?.display}</p>
      </div>
    </div>
  );
}
