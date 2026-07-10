import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/services/service-detail-page";
import { getServiceDetail } from "@/lib/service-details";

export const metadata: Metadata = {
  title: "Diagnostic Laboratory",
  description: "On-site diagnostic laboratory at Westridge Medical Healthcare — blood tests, health screening, and sample collection.",
  alternates: { canonical: "/diagnostic-laboratory" },
};

export default function DiagnosticLaboratoryPage() {
  const service = getServiceDetail("diagnostic-laboratory")!;
  return (
    <ServiceDetailPage
      service={service}
      eyebrow="Diagnostics"
      intro="Ordered in the consultation room, drawn down the hall — so results come back to the same doctor who asked for them."
    />
  );
}
