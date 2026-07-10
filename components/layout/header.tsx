"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/shared/logo";
import { OpenStatus } from "@/components/shared/open-status";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { TextSizeToggle } from "@/components/shared/text-size-toggle";
import { LanguageSelector } from "@/components/shared/language-selector";
import { ButtonLink } from "@/components/ui/button";
import {
  MenuIcon,
  CloseIcon,
  ChevronDownIcon,
  PhoneIcon,
  BriefcaseIcon,
  MapPinIcon,
  MailIcon,
  WhatsappIcon,
} from "@/components/shared/icons";
import { primaryNav, primaryPhone, siteConfig, whatsapp, defaultWhatsappMessage } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!mobileOpen && !servicesOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setServicesOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, servicesOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-navy-950/90">
      <div className="hidden border-b border-white/10 bg-navy-950 text-white/75 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 text-xs">
          <div className="flex min-w-0 items-center gap-4">
            <OpenStatus className="shrink-0" />
            <a
              href={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address.mapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 items-center gap-1.5 transition-colors hover:text-white xl:inline-flex"
            >
              <MapPinIcon className="h-3.5 w-3.5" />
              Rawalpindi
            </a>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-white xl:inline-flex"
            >
              <MailIcon className="h-3.5 w-3.5" />
              {siteConfig.email}
            </a>
            <a
              href={whatsapp.href(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 transition-colors hover:text-white lg:inline-flex"
            >
              <WhatsappIcon className="h-3.5 w-3.5" />
              WhatsApp
            </a>
            <a
              href={primaryPhone.href}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              {primaryPhone.display}
            </a>
            <Link
              href="/careers"
              className="hidden items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 font-semibold text-white shadow-[0_0_0_0_rgba(252,1,0,0.35)] transition-colors hover:bg-red-700 motion-safe:animate-glow-pulse md:inline-flex"
            >
              <BriefcaseIcon className="h-3.5 w-3.5" />
              We&rsquo;re Hiring
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Link href="/" onClick={() => setMobileOpen(false)} aria-label={`${siteConfig.name} — home`}>
          <Logo />
        </Link>

        <nav
          className="hidden items-center gap-0.5 overflow-x-auto xl:flex"
          aria-label="Primary"
        >
          {primaryNav.map((item) =>
            item.children ? (
              <div key={item.label} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  onBlur={(e) => {
                    if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                      setServicesOpen(false);
                    }
                  }}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-2 text-[0.875rem] font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {item.label}
                  <ChevronDownIcon
                    className={cn("h-3.5 w-3.5 transition-transform", servicesOpen && "rotate-180")}
                  />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-1 w-64 rounded-2xl border border-line bg-white p-2 shadow-lg shadow-navy-900/5 dark:border-white/10 dark:bg-navy-900"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setServicesOpen(false)}
                          className="block rounded-xl px-3.5 py-2.5 text-sm text-navy-700 hover:bg-navy-50 hover:text-navy-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full px-2 py-2 text-[0.875rem] font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white",
                  pathname === item.href && "bg-navy-50 text-navy-900 dark:bg-white/10 dark:text-white"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageSelector className="hidden md:block" />
          <TextSizeToggle className="hidden sm:inline-flex" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <ButtonLink href="/appointments" className="hidden sm:inline-flex">
            Book Appointment
          </ButtonLink>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-navy-50 dark:text-white dark:hover:bg-white/10 xl:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-line bg-white dark:border-white/10 dark:bg-navy-950 xl:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4" aria-label="Mobile">
              {primaryNav.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-3 py-3 text-[0.95rem] font-medium text-navy-800 hover:bg-navy-50 dark:text-white/85 dark:hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-3 flex flex-col border-l border-line pl-3 dark:border-white/10">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm text-navy-600 hover:bg-navy-50 dark:text-white/65 dark:hover:bg-white/10"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/careers"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-3 py-3 text-[0.95rem] font-semibold text-white shadow-[0_0_0_0_rgba(252,1,0,0.35)] motion-safe:animate-glow-pulse"
              >
                <BriefcaseIcon className="h-4 w-4" />
                We&rsquo;re Hiring — View Openings
              </Link>
              <div className="mt-3 flex items-center justify-between gap-3">
                <ButtonLink href="/appointments" className="flex-1">
                  Book Appointment
                </ButtonLink>
                <TextSizeToggle className="border border-line dark:border-white/10" />
                <ThemeToggle className="border border-line dark:border-white/10" />
                <LanguageSelector />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
