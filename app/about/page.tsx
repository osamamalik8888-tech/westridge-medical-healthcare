import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { PulseDivider } from "@/components/shared/pulse-divider";
import { ImageReveal } from "@/components/shared/image-reveal";
import { ClockIcon, BuildingIcon, WhatsappIcon, CheckIcon } from "@/components/shared/icons";
import { siteConfig, whatsapp, defaultWhatsappMessage, trustBadges, doctors } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: "How Westridge Medical Healthcare brings a general physician, diagnostic laboratory, and Westridge Plus Pharmacy together on Main GT Road, Rawalpindi.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
          About
        </p>
        <h1 className="mt-4 text-balance font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">
          {siteConfig.positioning}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-navy-600 dark:text-white/65">
          Westridge Medical Healthcare exists on a simple idea: most visits to
          a clinic involve three stops — seeing a doctor, getting tested, and
          filling a prescription. We put all three in one building on Main GT
          Road so a visit here is usually just one stop.
        </p>
      </div>

      <ImageReveal className="mx-auto mt-14 max-w-2xl overflow-hidden rounded-[1.75rem] border border-line dark:border-white/10">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src="/images/gallery/building-daytime.jpg"
            alt="Westridge Medical Healthcare and Westridge Plus Pharmacy storefront on Main GT Road, Rawalpindi"
            fill
            sizes="(min-width: 1024px) 42rem, 100vw"
            className="object-cover object-top"
          />
        </div>
      </ImageReveal>

      <div className="mx-auto mt-20 grid max-w-5xl gap-12 lg:grid-cols-2">
        <div>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-900 dark:bg-white/10 dark:text-white">
            <BuildingIcon className="h-5 w-5" />
          </span>
          <h2 className="mt-5 font-serif text-2xl text-navy-950 dark:text-white">
            One roof, three services
          </h2>
          <p className="mt-3 leading-relaxed text-navy-600 dark:text-white/65">
            A general physician for everyday illness, ongoing conditions, and
            check-ups. A diagnostic laboratory for the tests that follow a
            consultation. And Westridge Plus Pharmacy to fill what&rsquo;s
            prescribed — all under the same roof, so results and
            prescriptions don&rsquo;t get lost between appointments at
            different addresses.
          </p>
        </div>
        <div>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-900 dark:bg-white/10 dark:text-white">
            <ClockIcon className="h-5 w-5" />
          </span>
          <h2 className="mt-5 font-serif text-2xl text-navy-950 dark:text-white">
            Hours built around real life
          </h2>
          <p className="mt-3 leading-relaxed text-navy-600 dark:text-white/65">
            The doctor holds two sessions a day, seven days a week —{" "}
            {siteConfig.hours.opdDisplay.replace("Mon–Sun, ", "")} — so there&rsquo;s
            a slot before work and one after. {siteConfig.hours.pharmacyDisplay},
            for the times a prescription can&rsquo;t wait until morning.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-5xl">
        <PulseDivider />
        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
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

      <div className="mx-auto mt-20 max-w-4xl">
        <h2 className="text-center font-serif text-2xl text-navy-950 dark:text-white sm:text-3xl">
          What a visit actually looks like
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: "01",
              title: "Reach out",
              body: "Message us on WhatsApp or call ahead — or just walk in during OPD hours, no booking required.",
            },
            {
              step: "02",
              title: "See the doctor",
              body: `${siteConfig.hours.opdDisplay.split(",")[1]?.trim() ?? "Two sessions daily"} — most visits start within a short wait, longer at peak times.`,
            },
            {
              step: "03",
              title: "Test, if needed",
              body: "If something needs checking, the lab is down the hall — not a separate trip to another building.",
            },
            {
              step: "04",
              title: "Fill your prescription",
              body: "Westridge Plus Pharmacy fills what's prescribed on the spot, same building, same visit.",
            },
          ].map((item) => (
            <div key={item.step} className="rounded-2xl border border-line bg-white p-6 dark:border-white/10 dark:bg-navy-900">
              <span className="font-serif text-2xl text-navy-200 dark:text-white/20">{item.step}</span>
              <h3 className="mt-2 font-medium text-navy-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-white/65">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-4xl">
        <h2 className="text-center font-serif text-2xl text-navy-950 dark:text-white sm:text-3xl">
          Whoever you&rsquo;re booking for
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {[
            {
              title: "First time here",
              body: "Walk in or message ahead — there's no account to create or form to fill out beforehand. Bring any past reports if you have them.",
            },
            {
              title: "Coming back for a follow-up",
              body: "Mention it's a follow-up when you message us, and it helps to bring whatever was prescribed or tested last time.",
            },
            {
              title: "Booking for your family",
              body: "One WhatsApp message can cover more than one person — just list who's coming and roughly when.",
            },
            {
              title: "A workplace or group",
              body: "Corporate and group visits are arranged directly rather than through the usual booking form.",
              link: { href: "/corporate-healthcare", label: "See corporate healthcare →" },
            },
          ].map((path) => (
            <div key={path.title} className="rounded-2xl border border-line bg-white p-6 dark:border-white/10 dark:bg-navy-900">
              <h3 className="font-medium text-navy-900 dark:text-white">{path.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-white/65">{path.body}</p>
              {path.link && (
                <Link
                  href={path.link.href}
                  className="mt-3 inline-block text-sm font-medium text-red-600 hover:underline dark:text-red-300"
                >
                  {path.link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-center font-serif text-2xl text-navy-950 dark:text-white sm:text-3xl">
          Qualifications &amp; registration
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-navy-500 dark:text-white/55">
          Real credentials only — nothing here is a generic trust badge with nothing behind it.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Degree", value: "MBBS" },
            { label: "Postgraduate", value: "FCPS Part-I (Medicine)" },
            { label: "Registration", value: doctors[0]?.registration?.replace("PM&DC: ", "") ?? "" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-line bg-white p-5 text-center dark:border-white/10 dark:bg-navy-900"
            >
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-navy-400 dark:text-white/40">
                {item.label}
              </p>
              <p className="mt-2 font-serif text-lg text-navy-950 dark:text-white">{item.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-navy-400 dark:text-white/40">
          Registered with the Pakistan Medical &amp; Dental Council. {doctors[0]?.pastRole}.
        </p>
      </div>

      <div className="mx-auto mt-20 max-w-2xl rounded-[1.75rem] bg-navy-950 px-8 py-12 text-center dark:border dark:border-white/10">
        <h2 className="font-serif text-2xl text-white sm:text-3xl">
          Come see the difference in person.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] text-white/60">
          {siteConfig.address.lines.join(", ")}
        </p>
        <div className="mt-7">
          <ButtonLink href={whatsapp.href(defaultWhatsappMessage)} size="lg">
            <WhatsappIcon className="h-4 w-4" />
            Book on WhatsApp
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
