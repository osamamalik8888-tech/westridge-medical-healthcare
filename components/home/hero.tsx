"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { ButtonLink } from "@/components/ui/button";
import { EcgLine } from "@/components/shared/ecg-line";
import { OpenStatus } from "@/components/shared/open-status";
import { WhatsappIcon } from "@/components/shared/icons";
import { siteConfig, whatsapp, primaryPhone, defaultWhatsappMessage } from "@/lib/site-config";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const trustRow = ["General Physician", "Diagnostic Lab", "Westridge Plus Pharmacy", "Vaccination"];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Subtle only — the photo drifts ~40px over the section's own scroll
  // range, not a dramatic effect. Disabled outright for reduced motion
  // rather than just made smaller, since scroll-linked movement is
  // exactly the category that preference is meant to switch off.
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const photoY = shouldReduceMotion ? 0 : rawY;
  const initialState = shouldReduceMotion ? false : "hidden";

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-mist dark:bg-navy-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-14 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-12 lg:gap-16 lg:pb-24 lg:pt-20">
        <div>
          <motion.p
            custom={0}
            initial={initialState}
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-navy-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Rawalpindi · Main GT Road ·{" "}
            <OpenStatus className="font-medium text-navy-600 dark:text-white/70" />
          </motion.p>

          <motion.h1
            custom={1}
            initial={initialState}
            animate="visible"
            variants={fadeUp}
            className="mt-6 text-balance font-serif text-[2.6rem] leading-[1.08] text-navy-950 dark:text-white sm:text-[3.4rem] lg:text-[3.75rem]"
          >
            {siteConfig.tagline}
          </motion.h1>

          <motion.p
            custom={2}
            initial={initialState}
            animate="visible"
            variants={fadeUp}
            className="mt-6 max-w-lg text-lg leading-relaxed text-navy-600 dark:text-white/65"
          >
            {siteConfig.positioning} — Westridge brings the physician, the
            diagnostic laboratory, and Westridge Plus Pharmacy into the same
            building on Main GT Road, so a visit here is rarely just the
            doctor.
          </motion.p>

          <motion.div
            custom={3}
            initial={initialState}
            animate="visible"
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3.5 sm:flex-row"
          >
            <ButtonLink href={whatsapp.href(defaultWhatsappMessage)} size="lg">
              <WhatsappIcon className="h-4 w-4" />
              Book on WhatsApp
            </ButtonLink>
            <ButtonLink href={primaryPhone.href} variant="secondary" size="lg">
              Call {primaryPhone.display}
            </ButtonLink>
          </motion.div>

          <motion.div
            custom={4}
            initial={initialState}
            animate="visible"
            variants={fadeUp}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-7 text-sm text-navy-600 dark:border-white/10 dark:text-white/60"
          >
            {trustRow.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-navy-300 dark:bg-white/30" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-navy-950 md:aspect-[4/5]"
        >
          <motion.div style={{ y: photoY }} className="absolute -inset-y-6 inset-x-0">
            <Image
              src="/images/gallery/building-nighttime.jpg"
              alt="Westridge Medical Healthcare and Westridge Plus Pharmacy, Main GT Road, Rawalpindi, at night"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-top"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-navy-950/10" />
          <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-10">
            <span className="font-serif text-2xl text-white/90">Westridge</span>
            <div>
              <EcgLine className="h-16 w-full sm:h-20" strokeClassName="stroke-red-400" />
              <p className="mt-4 text-sm text-white/70">{siteConfig.hours.opdDisplay}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
