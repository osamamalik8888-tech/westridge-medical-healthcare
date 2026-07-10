import type { ComponentType } from "react";
import {
  StethoscopeIcon,
  FlaskIcon,
  PillIcon,
  SyringeIcon,
  HeartPulseIcon,
  BuildingIcon,
} from "@/components/shared/icons";

export interface ServiceDetail {
  slug: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
  description: string;
  points: string[];
  /** Only services with their own dedicated page (not a /services anchor) set this. */
  dedicatedPage?: boolean;
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "general-physician",
    name: "General Physician",
    icon: StethoscopeIcon,
    description:
      "Walk-in and scheduled consultations with Dr. Khalid Ahmed for everyday illness, ongoing conditions, and preventive check-ups.",
    points: [
      "Same-day consultations, most days",
      "Follow-up visits for ongoing conditions",
      "Referrals for specialist care when needed",
    ],
  },
  {
    slug: "diagnostic-laboratory",
    name: "Diagnostic Laboratory",
    icon: FlaskIcon,
    description:
      "Sample collection and lab testing on site, so results feed straight back into the same consultation instead of a separate lab visit.",
    points: [
      "Blood tests",
      "Routine health screening",
      "Sample collection for external labs on request",
    ],
    dedicatedPage: true,
  },
  {
    slug: "pharmacy",
    name: "Westridge Plus Pharmacy",
    icon: PillIcon,
    description:
      "Genuine branded and generic medicines, filled right after your consultation — or any time, since the pharmacy runs 24/7.",
    points: ["In-house prescriptions", "Walk-in outpatient counter", "OTC, wellness, and personal care"],
    dedicatedPage: true,
  },
  {
    slug: "vaccination",
    name: "Vaccination Services",
    icon: SyringeIcon,
    description: "Routine and travel vaccinations administered by clinical staff.",
    points: [
      "Routine immunisation",
      "Travel vaccination",
      "Ask us which vaccines are in stock before you come in",
    ],
    dedicatedPage: true,
  },
  {
    slug: "ecg",
    name: "ECG",
    icon: HeartPulseIcon,
    description: "On-site electrocardiogram testing, reviewed by the attending physician the same visit.",
    points: ["Same-visit results", "Reviewed directly by Dr. Ahmed"],
  },
  {
    slug: "corporate-healthcare",
    name: "Corporate Healthcare",
    icon: BuildingIcon,
    description: "Health packages and on-site services arranged for local businesses and their staff.",
    points: [
      "Custom packages by team size",
      "On-site or in-clinic options",
      "Message us your team's needs directly",
    ],
    dedicatedPage: true,
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((s) => s.slug === slug);
}
