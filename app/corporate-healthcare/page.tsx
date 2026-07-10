import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/services/service-detail-page";
import { CorporatePartners } from "@/components/services/corporate-partners";
import { getServiceDetail } from "@/lib/service-details";

export const metadata: Metadata = {
  title: "Corporate Healthcare",
  description: "Health packages and on-site services for local businesses, arranged by Westridge Medical Healthcare.",
  alternates: { canonical: "/corporate-healthcare" },
};

export default function CorporateHealthcarePage() {
  const service = getServiceDetail("corporate-healthcare")!;
  return (
    <>
      <ServiceDetailPage
        service={service}
        eyebrow="For Businesses"
        intro="Tell us your team size and what you're looking for, and we'll put together a package instead of asking you to pick from a generic list."
      />
      <div className="pb-24 sm:pb-28">
        <CorporatePartners />
      </div>
    </>
  );
}
