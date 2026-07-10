import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/shared/logo";
import { PulseDivider } from "@/components/shared/pulse-divider";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import {
  ClockIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
  WhatsappIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  BriefcaseIcon,
} from "@/components/shared/icons";
import { footerNav, siteConfig, socialLinks, whatsapp, defaultWhatsappMessage, primaryPhone } from "@/lib/site-config";
import type { ComponentType } from "react";

const socialIconByPlatform: Record<string, ComponentType<{ className?: string }>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
};

export function Footer() {
  const year = new Date().getFullYear();
  const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    siteConfig.address.mapsQuery
  )}&output=embed`;
  const mapsDirectionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.address.mapsQuery
  )}`;

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/gallery/building-nighttime.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-10"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.9fr_1.1fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              {siteConfig.description}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2.5">
              <a
                href={whatsapp.href(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                <WhatsappIcon className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={primaryPhone.href}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <PhoneIcon className="h-4 w-4" />
                Call Now
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <MailIcon className="h-4 w-4" />
                Email Us
              </a>
              <a
                href={mapsDirectionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <MapPinIcon className="h-4 w-4" />
                Directions
              </a>
            </div>
            <div className="mt-6 flex flex-col gap-1.5 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 shrink-0 text-white/40" />
                OPD: {siteConfig.hours.opdDisplay}
              </span>
              <span className="ml-6 text-white/50">{siteConfig.hours.pharmacyDisplay}</span>
            </div>
            {socialLinks.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = socialIconByPlatform[social.platform];
                  return (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
              Quick Links
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {footerNav.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
              Services
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
              Visit Us
            </h3>
            <address className="mt-5 flex gap-2.5 text-sm not-italic leading-relaxed text-white/70">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
              <span>
                {siteConfig.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </address>
            <div className="mt-3 flex flex-col gap-1.5">
              {siteConfig.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0 text-white/40" />
                  {phone.display}
                </a>
              ))}
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              <MailIcon className="h-4 w-4 shrink-0 text-white/40" />
              {siteConfig.email}
            </a>

            <a
              href={mapsDirectionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block overflow-hidden rounded-2xl border border-white/10 transition-opacity hover:opacity-90"
              aria-label="Get directions on Google Maps"
            >
              <iframe
                title={`${siteConfig.name} location on Google Maps`}
                src={mapsEmbedSrc}
                className="h-40 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-hidden="true"
                tabIndex={-1}
              />
            </a>
          </div>
        </div>

        <PulseDivider tone="dark" className="my-12" />

        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-serif text-xl text-white">Health tips, occasionally.</h3>
            <p className="mt-1.5 text-sm text-white/55">
              No spam — just the odd note when it&rsquo;s actually useful.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-10 rounded-2xl border border-red-500/25 bg-red-500/[0.08] p-5 text-sm leading-relaxed text-white/75">
          <span className="font-semibold text-white">In a medical emergency: </span>
          {siteConfig.emergency.note}
        </div>

        <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
              <BriefcaseIcon className="h-4 w-4" />
            </span>
            <p className="text-sm text-white/75">
              <span className="font-semibold text-white">We&rsquo;re hiring.</span> Doctors, nurses,
              pharmacists, and more.
            </p>
          </div>
          <Link
            href="/careers"
            className="inline-flex h-9 shrink-0 items-center rounded-full border border-white/20 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            View openings
          </Link>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            {footerNav.legal.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white/80">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
