import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/services/service-detail-page";
import { getServiceDetail } from "@/lib/service-details";

export const metadata: Metadata = {
  title: "Vaccination Services",
  description: "Routine and travel vaccinations at Westridge Medical Healthcare, administered by clinical staff.",
  alternates: { canonical: "/vaccination" },
};

export default function VaccinationPage() {
  const service = getServiceDetail("vaccination")!;
  return (
    <ServiceDetailPage
      service={service}
      eyebrow="Vaccination"
      intro="Message us what you need before you come in — stock varies, and we'd rather confirm than have you make a second trip."
    />
  );
}
