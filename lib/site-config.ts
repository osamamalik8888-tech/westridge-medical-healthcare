// Single source of truth for real business data.
// Every page pulls contact info, hours, and nav structure from here —
// update it in one place and the whole site stays in sync.
//
// Hours/credentials/phones below come from the client's own printed
// materials (WMH_LOGO.png, OPD-timings graphic, doctor credentials card),
// not guesses.

// No custom domain is assumed. Resolution order:
//   1. NEXT_PUBLIC_SITE_URL — set this once a real domain is connected.
//   2. NEXT_PUBLIC_VERCEL_URL — Vercel sets this automatically on every
//      deploy to the actual *.vercel.app address, so the site works
//      correctly on the free tier with zero configuration.
//   3. localhost, for local development.
const resolvedSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : null) ||
  "http://localhost:3000";

export const siteConfig = {
  name: "Westridge Medical Healthcare",
  shortName: "Westridge Medical",
  tagline: "Your Health, Our Priority",
  positioning: "Complete Healthcare Under One Roof",
  description:
    "A general physician's clinic on Main GT Road, Rawalpindi, with its own diagnostic laboratory and Westridge Plus Pharmacy on site.",
  url: resolvedSiteUrl,
  phones: [
    { display: "+92 321 7295474", href: "tel:+923217295474", primary: true },
    { display: "+92 335 5712347", href: "tel:+923355712347", primary: false },
    { display: "+92 315 9900999", href: "tel:+923159900999", primary: false },
  ],
  email: "westridgemedicalhealthcare@gmail.com",
  address: {
    lines: [
      "Street No. 7, Muhalla Kashmirian",
      "Main GT Road, Near Chourh Chowk / Bohr Masjid",
      "Chour Harpal, Rawalpindi",
    ],
    // Real Plus Code, given directly by the client — Google resolves this
    // itself (authoritatively) when passed straight through, which is far
    // more precise and reliable than a text address search, and doesn't
    // depend on anyone (including this codebase) decoding it by hand.
    plusCode: "J264+2C Rawalpindi",
    mapsQuery: "J264+2C Rawalpindi",
  },
  // The doctor's OPD runs two sessions; Westridge Plus Pharmacy (the
  // in-house/outpatient pharmacy) runs 24/7 — these are genuinely
  // different hours for different parts of the building, not a typo.
  hours: {
    opdDisplay: "Mon–Sun, 10:00 AM–3:00 PM & 6:00 PM–12:00 AM",
    pharmacyDisplay: "Pharmacy open 24/7",
    opd: {
      sessions: [
        { startHour: 10, endHour: 15 },
        { startHour: 18, endHour: 24 },
      ],
    },
  },
  emergency: {
    note: "For a life-threatening emergency, call Rescue 1122 or go directly to your nearest hospital emergency department. Westridge is a general physician's clinic, not an emergency trauma centre.",
    number: "1122",
  },
} as const;

export const primaryPhone = siteConfig.phones[0];

export const whatsapp = {
  number: "923217295474",
  href: (message: string) => `https://wa.me/923217295474?text=${encodeURIComponent(message)}`,
};

export const defaultWhatsappMessage =
  "Hi Westridge Medical Healthcare, I'd like to book an appointment.";

export type ServiceStatus = "active" | "upcoming";

export interface ServiceItem {
  slug: string;
  name: string;
  shortDescription: string;
  href: string;
  status: ServiceStatus;
}

export const services: ServiceItem[] = [
  {
    slug: "general-physician",
    name: "General Physician",
    shortDescription:
      "Walk-in and scheduled consultations for everyday illness, ongoing conditions, and check-ups.",
    href: "/services#general-physician",
    status: "active",
  },
  {
    slug: "diagnostic-laboratory",
    name: "Diagnostic Laboratory",
    shortDescription:
      "Lab tests, blood tests, and sample collection on site, with results that feed straight back into your consultation.",
    href: "/diagnostic-laboratory",
    status: "active",
  },
  {
    slug: "pharmacy",
    name: "Westridge Plus Pharmacy",
    shortDescription:
      "Genuine branded and generic medicines, OTC, and wellness essentials — open 24 hours, prescription or not.",
    href: "/pharmacy",
    status: "active",
  },
  {
    slug: "vaccination",
    name: "Vaccination Services",
    shortDescription: "Routine and travel vaccinations administered by clinical staff.",
    href: "/vaccination",
    status: "active",
  },
  {
    slug: "ecg",
    name: "ECG",
    shortDescription: "On-site electrocardiogram testing, reviewed by the attending physician.",
    href: "/services#ecg",
    status: "active",
  },
  {
    slug: "corporate-healthcare",
    name: "Corporate Healthcare",
    shortDescription:
      "Health packages and on-site services arranged for local businesses and their staff.",
    href: "/corporate-healthcare",
    status: "active",
  },
];

export const futureServices = ["Dentistry", "ENT", "Gynecology", "Physiotherapy"];

// Trust badges as the clinic already states them on its own printed
// materials — kept as their claims, not upgraded into anything stronger.
export const trustBadges = [
  "Qualified Doctor",
  "Quality Medicines",
  "Reliable Diagnostics",
  "Affordable Healthcare",
  "Patient-Centered Care",
];

export interface HealthPackage {
  slug: string;
  name: string;
  description: string;
  includes: string[];
  /** Intentionally left unset until pricing is confirmed — add a value
   *  here (e.g. "PKR 3,500") and it'll display automatically; no other
   *  change needed. */
  price?: string;
}

export const healthPackages: HealthPackage[] = [
  {
    slug: "consultation-plus-testing",
    name: "Consultation + Testing",
    description:
      "A physician visit paired with the specific lab work it points to, arranged as one visit instead of two.",
    includes: [
      "Physician consultation with Dr. Ahmed",
      "Same-visit lab work where relevant",
      "Results reviewed with you before you leave",
    ],
  },
  {
    slug: "routine-screening",
    name: "Routine Screening",
    description:
      "Periodic check-ups for people who want a baseline read on their health, not just a reaction to a symptom.",
    includes: [
      "General physical examination",
      "Baseline lab screening",
      "A plan for what to monitor going forward",
    ],
  },
  {
    slug: "family-corporate",
    name: "Family & Corporate",
    description:
      "The same idea, scaled up — a household or a workplace, arranged and scheduled together.",
    includes: [
      "Bundled scheduling for multiple people",
      "A consistent doctor across visits",
      "One point of contact for coordination",
    ],
  },
];

export interface Doctor {
  slug: string;
  name: string;
  role: string;
  bio: string;
  credentials?: string;
  pastRole?: string;
  registration?: string;
  image?: string;
  /** Areas of clinical focus, as the client has described them — not a
   *  claim of subspecialty board certification, which his credentials
   *  (FCPS Part-I, Medicine) don't state. */
  focusAreas?: string[];
}

export interface CeoProfile {
  name: string;
  title: string;
  /** Falls back to an initials placeholder if ever unset — same pattern
   *  as doctors without a photo. Currently set to the real photo. */
  image?: string;
  message: string[];
}

export const ceo: CeoProfile = {
  name: "Qaim Raza",
  title: "Chief Executive Officer, Westridge Medical Healthcare",
  image: "/images/ceo/qaim-raza.jpg",
  message: [
    "At Westridge Medical Healthcare, we believe that healthcare is not only about treating illness — it is about caring for people with compassion, respect, and excellence. Our vision is to build a healthcare environment where every patient feels safe, valued, and confident in the quality of care they receive.",
    "We are committed to providing accessible, modern, and reliable medical services for individuals and families in our community. Through our dedicated doctors, skilled staff, diagnostic facilities, pharmacy services, and patient-centered approach, we strive to make quality healthcare convenient and trustworthy.",
    "As Chief Executive Officer, I assure you that Westridge Medical Healthcare will continue to grow with integrity, innovation, and a deep commitment to patient well-being. Your health is our priority, and we remain devoted to serving you with professionalism, compassion, and excellence.",
    "Thank you for trusting Westridge Medical Healthcare with your care.",
  ],
};

export const doctors: Doctor[] = [
  {
    slug: "khalid-ahmed",
    // Spelling confirmed by the client as "Ahmed" (the source materials
    // had used both "Ahmed" and "Ahmad" across different graphics).
    name: "Dr. Khalid Ahmed",
    role: "Consultant General Physician",
    bio: "Dr. Khalid Ahmed leads general and family medicine at Westridge — same-day concerns, ongoing conditions, and preventive check-ups.",
    credentials: "MBBS, FCPS Part-I (Medicine)",
    pastRole: "Ex-Senior Medical Officer, Lady Reading Hospital, Peshawar",
    registration: "PM&DC: 12990-N",
    focusAreas: [
      "Cardiology-related conditions",
      "Diabetes management",
      "Hypertension",
      "General medicine",
      "Diagnosis of common and complex diseases",
      "Preventive healthcare",
      "Routine medical checkups",
      "Chronic disease management",
    ],
    image: "/images/doctors/khalid-ahmed.jpg",
  },
];

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const primaryNav: NavLink[] = [
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "General Physician", href: "/services#general-physician" },
      { label: "Diagnostic Laboratory", href: "/diagnostic-laboratory" },
      { label: "Westridge Plus Pharmacy", href: "/pharmacy" },
      { label: "Vaccination", href: "/vaccination" },
      { label: "Corporate Healthcare", href: "/corporate-healthcare" },
    ],
  },
  { label: "Health Packages", href: "/health-packages" },
  { label: "AI Health Assistant", href: "/ai-health-assistant" },
  { label: "Doctors", href: "/doctors" },
  { label: "Knowledge Center", href: "/knowledge-center" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Our Doctors", href: "/doctors" },
    { label: "Gallery", href: "/gallery" },
    { label: "Knowledge Center", href: "/knowledge-center" },
    { label: "Patient Resources", href: "/patient-resources" },
    { label: "Careers", href: "/careers" },
  ],
  services: [
    { label: "General Physician", href: "/services#general-physician" },
    { label: "Diagnostic Laboratory", href: "/diagnostic-laboratory" },
    { label: "Westridge Plus Pharmacy", href: "/pharmacy" },
    { label: "Vaccination", href: "/vaccination" },
    { label: "Corporate Healthcare", href: "/corporate-healthcare" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};

// WhatsApp is the only official channel today (confirmed by the client).
// Facebook/Instagram/LinkedIn are wired up structurally — add a real href
// below for any of them and it appears in the footer immediately, icon and
// all, with zero layout changes needed.
export interface SocialLink {
  platform: "facebook" | "instagram" | "linkedin";
  label: string;
  href: string;
}

export interface Partner {
  name: string;
  /** A local path under /public (e.g. "/images/partners/acme.png") — an
   *  external URL would need its domain added to next.config.ts first. */
  logoSrc: string;
}

// Empty until real corporate/insurance partners exist — same pattern as
// reviews and healthPackages pricing. Add entries here and the section on
// /corporate-healthcare renders them automatically.
export const corporatePartners: Partner[] = [];

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

// Empty until real reviews exist — same pattern as socialLinks and
// healthPackages pricing. Add real ones here (or wire up a Google
// Business Profile feed) and the homepage section renders them
// automatically; no component changes needed either way.
export const reviews: Review[] = [];

export const googleReviewsUrl: string | null = null; // set once a real Google Business Profile exists

export const socialLinks: SocialLink[] = [];
