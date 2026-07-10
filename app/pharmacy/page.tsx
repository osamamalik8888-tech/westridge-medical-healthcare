import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/services/service-detail-page";
import { getServiceDetail } from "@/lib/service-details";

export const metadata: Metadata = {
  title: "Westridge Plus Pharmacy",
  description: "In-house and outpatient pharmacy at Westridge Medical Healthcare, open 24/7 — genuine branded and generic medicines, OTC, and wellness essentials.",
  alternates: { canonical: "/pharmacy" },
};

export default function PharmacyPage() {
  const service = getServiceDetail("pharmacy")!;
  return (
    <ServiceDetailPage
      service={service}
      eyebrow="Open 24/7"
      intro="Prescriptions from Dr. Ahmed are filled right next door. Everyone else is just as welcome at the counter, any hour."
    />
  );
}
