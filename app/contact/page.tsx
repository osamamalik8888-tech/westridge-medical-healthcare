import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { ContactForm } from "@/components/contact/contact-form";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  WhatsappIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/shared/icons";
import { siteConfig, whatsapp, defaultWhatsappMessage, socialLinks } from "@/lib/site-config";
import type { ComponentType } from "react";

const socialIconByPlatform: Record<string, ComponentType<{ className?: string }>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
};

export const metadata: Metadata = {
  title: "Contact",
  description: "Phone, WhatsApp, email, and location for Westridge Medical Healthcare, Main GT Road, Rawalpindi.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    siteConfig.address.mapsQuery
  )}&output=embed`;

  return (
    <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
          Contact
        </p>
        <h1 className="mt-4 font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">
          Get in touch
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-navy-600 dark:text-white/65">
          WhatsApp is the fastest way to reach us for appointments. For
          anything else, call, email, or come straight to Main GT Road.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-7">
          <ButtonLink href={whatsapp.href(defaultWhatsappMessage)} size="lg" className="w-full sm:w-fit">
            <WhatsappIcon className="h-4 w-4" />
            Message us on WhatsApp
          </ButtonLink>

          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2.5 text-sm font-medium text-navy-500 dark:text-white/55">
              <PhoneIcon className="h-4 w-4 text-navy-400 dark:text-white/50" />
              Phone
            </span>
            <div className="flex flex-col gap-1 pl-[1.625rem]">
              {siteConfig.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="text-[0.9375rem] text-navy-800 transition-colors hover:text-red-600 dark:text-white/85 dark:hover:text-red-400"
                >
                  {phone.display}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2.5 text-sm font-medium text-navy-500 dark:text-white/55">
              <MailIcon className="h-4 w-4 text-navy-400 dark:text-white/50" />
              Email
            </span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="pl-[1.625rem] text-[0.9375rem] text-navy-800 transition-colors hover:text-red-600 dark:text-white/85 dark:hover:text-red-400"
            >
              {siteConfig.email}
            </a>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2.5 text-sm font-medium text-navy-500 dark:text-white/55">
              <ClockIcon className="h-4 w-4 text-navy-400 dark:text-white/50" />
              Hours
            </span>
            <div className="pl-[1.625rem] text-[0.9375rem] text-navy-800 dark:text-white/85">
              <p>OPD: {siteConfig.hours.opdDisplay}</p>
              <p className="text-navy-500 dark:text-white/50">{siteConfig.hours.pharmacyDisplay}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2.5 text-sm font-medium text-navy-500 dark:text-white/55">
              <MapPinIcon className="h-4 w-4 text-navy-400 dark:text-white/50" />
              Address
            </span>
            <address className="pl-[1.625rem] text-[0.9375rem] not-italic leading-relaxed text-navy-800 dark:text-white/85">
              {siteConfig.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          {socialLinks.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-navy-500 dark:text-white/55">Follow</span>
              <div className="flex gap-2.5 pl-[0.125rem]">
                {socialLinks.map((social) => {
                  const Icon = socialIconByPlatform[social.platform];
                  return (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-50 text-navy-600 transition-colors hover:bg-navy-100 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/15"
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-line dark:border-white/10">
            <Image
              src="/images/gallery/building-daytime.jpg"
              alt="Westridge Medical Healthcare storefront, Main GT Road, Rawalpindi"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-line dark:border-white/10">
            <iframe
              title={`${siteConfig.name} location on Google Maps`}
              src={mapsEmbedSrc}
              className="h-[22rem] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-2xl">
        <h2 className="text-center font-serif text-2xl text-navy-950 dark:text-white sm:text-3xl">
          Or send us a message
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-[0.9375rem] leading-relaxed text-navy-600 dark:text-white/65">
          Choose WhatsApp or email — whichever you&rsquo;d rather use.
        </p>
        <div className="mt-8 rounded-[1.75rem] border border-line bg-white p-6 shadow-sm shadow-navy-900/[0.03] dark:border-white/10 dark:bg-navy-900 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
