import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { StatsStrip } from "@/components/home/stats-strip";
import { ServicesOverview } from "@/components/home/services-overview";
import { PulseDivider } from "@/components/shared/pulse-divider";
import { DoctorSpotlight } from "@/components/home/doctor-spotlight";
import { WhyWestridge } from "@/components/home/why-westridge";
import { CeoMessage } from "@/components/home/ceo-message";
import { HiringBanner } from "@/components/home/hiring-banner";
import { Testimonials } from "@/components/home/testimonials";
import { AppointmentCta } from "@/components/home/appointment-cta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ServicesOverview />
      <PulseDivider className="mx-auto max-w-7xl px-6" />
      <DoctorSpotlight />
      <WhyWestridge />
      <CeoMessage />
      <HiringBanner />
      <Testimonials />
      <AppointmentCta />
    </>
  );
}
