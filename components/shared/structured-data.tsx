import { siteConfig, doctors } from "@/lib/site-config";

/**
 * Renders once, site-wide, from the root layout. Deliberately conservative:
 * fields we don't have real data for (priceRange, founding date) are left
 * out rather than guessed, since bad structured data is worse than none —
 * it can get flagged by Search Console. Geo coordinates ARE included now:
 * they're decoded from the real Plus Code the client provided
 * (J264+2C Rawalpindi), not estimated. The decode was validated against a
 * published worked example before being trusted here — see PROGRESS.md.
 */
export function StructuredData() {
  const clinic = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/gallery/storefront.jpeg`,
    telephone: siteConfig.phones.map((p) => p.href.replace("tel:", "")),
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.lines.slice(0, 2).join(", "),
      addressLocality: "Rawalpindi",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.610062,
      longitude: 73.006062,
    },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address.mapsQuery)}`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "15:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "18:00",
        closes: "23:59",
      },
    ],
    medicalSpecialty: "PrimaryCare",
    availableService: siteConfig.hours.pharmacyDisplay,
    employee: doctors.map((doctor) => ({
      "@type": "Physician",
      name: doctor.name,
      medicalSpecialty: "PrimaryCare",
      ...(doctor.registration ? { identifier: doctor.registration } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Escaping "<" prevents a "</script>"-breakout if any string value
      // here ever contains it — defense-in-depth. Current data is all
      // internal (site-config.ts), not user input, but this is cheap
      // insurance against a mistake if that ever changes.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(clinic).replace(/</g, "\\u003c") }}
    />
  );
}
