import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { PulseDivider } from "@/components/shared/pulse-divider";
import { WhatsappIcon, ArrowRightIcon } from "@/components/shared/icons";
import { whatsapp, defaultWhatsappMessage, futureServices } from "@/lib/site-config";
import { serviceDetails } from "@/lib/service-details";

export const metadata: Metadata = {
  title: "Services",
  description: "General physician consultations, diagnostic laboratory testing, Westridge Plus Pharmacy, vaccination, ECG, and corporate healthcare at Westridge Medical Healthcare.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
          Services
        </p>
        <h1 className="mt-4 font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">
          Every service, in detail
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-navy-600 dark:text-white/65">
          Everything below is available in the same building on Main GT Road.
        </p>
      </div>

      <div className="mx-auto mt-16 flex max-w-4xl flex-col gap-14">
        {serviceDetails.map((service, i) => (
          <div key={service.slug}>
            {i > 0 && <PulseDivider className="mb-14" />}
            <div id={service.slug} className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-900 dark:bg-white/10 dark:text-white">
                <service.icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-serif text-2xl text-navy-950 dark:text-white">{service.name}</h2>
                <p className="mt-3 leading-relaxed text-navy-600 dark:text-white/65">
                  {service.description}
                </p>
                <ul className="mt-4 flex flex-col gap-1.5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-navy-500 dark:text-white/55"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-500" />
                      {point}
                    </li>
                  ))}
                </ul>
                {service.dedicatedPage && (
                  <Link
                    href={`/${service.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy-900 transition-colors hover:text-red-600 dark:text-white dark:hover:text-red-300"
                  >
                    Full page
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-4xl rounded-[1.75rem] border border-dashed border-line px-8 py-8 text-center dark:border-white/15">
        <p className="font-medium text-navy-700 dark:text-white/75">Expanding soon</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5 text-sm text-navy-500 dark:text-white/50">
          {futureServices.map((item) => (
            <span
              key={item}
              className="rounded-full border border-line px-3 py-1 dark:border-white/10"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-2xl rounded-[1.75rem] bg-navy-950 px-8 py-12 text-center dark:border dark:border-white/10">
        <h2 className="font-serif text-2xl text-white sm:text-3xl">Ready to come in?</h2>
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
