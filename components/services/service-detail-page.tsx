import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { WhatsappIcon, ArrowRightIcon } from "@/components/shared/icons";
import { whatsapp } from "@/lib/site-config";
import type { ServiceDetail } from "@/lib/service-details";

export function ServiceDetailPage({
  service,
  eyebrow,
  intro,
}: {
  service: ServiceDetail;
  eyebrow: string;
  intro: string;
}) {
  const Icon = service.icon;

  return (
    <div className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <Breadcrumbs
          trail={[
            { label: "Services", href: "/services" },
            { label: service.name, href: `/${service.slug}` },
          ]}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">
          {service.name}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-navy-600 dark:text-white/65">{intro}</p>
      </div>

      <div className="mx-auto mt-14 max-w-2xl rounded-[1.75rem] border border-line bg-white p-8 dark:border-white/10 dark:bg-navy-900 sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-50 text-navy-900 dark:bg-white/10 dark:text-white">
          <Icon className="h-5 w-5" />
        </span>
        <p className="mt-5 text-[1.0625rem] leading-relaxed text-navy-700 dark:text-white/75">
          {service.description}
        </p>
        <ul className="mt-5 flex flex-col gap-2">
          {service.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2.5 text-sm text-navy-600 dark:text-white/60"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-500" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-7 dark:border-white/10 sm:flex-row">
          <ButtonLink
            href={whatsapp.href(`Hi, I'd like to ask about ${service.name} at Westridge.`)}
          >
            <WhatsappIcon className="h-4 w-4" />
            Ask on WhatsApp
          </ButtonLink>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-navy-600 transition-colors hover:text-navy-900 dark:text-white/60 dark:hover:text-white"
          >
            See all services
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
