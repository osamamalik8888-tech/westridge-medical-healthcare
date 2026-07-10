"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { WhatsappIcon } from "@/components/shared/icons";
import { whatsapp, defaultWhatsappMessage } from "@/lib/site-config";

/**
 * Hidden on /appointments and /careers specifically — both pages already
 * are a WhatsApp-ending form, so a floating duplicate right on top of the
 * submit button would be redundant rather than helpful. Present
 * everywhere else, since WhatsApp is the site's primary contact channel.
 */
export function WhatsappFloat() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  if (pathname === "/appointments" || pathname === "/careers") return null;

  return (
    <motion.a
      href={whatsapp.href(defaultWhatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Westridge Medical Healthcare on WhatsApp"
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-900/25 transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navy-950 sm:bottom-7 sm:right-7"
    >
      <WhatsappIcon className="h-6 w-6" />
    </motion.a>
  );
}
