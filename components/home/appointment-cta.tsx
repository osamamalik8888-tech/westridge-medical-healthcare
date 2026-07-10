import dynamic from "next/dynamic";
import { ButtonLink } from "@/components/ui/button";
import { PulseDivider } from "@/components/shared/pulse-divider";
import { WhatsappIcon, MapPinIcon } from "@/components/shared/icons";
import { siteConfig, whatsapp, primaryPhone, defaultWhatsappMessage } from "@/lib/site-config";

// Dynamic: Three.js is the single heaviest dependency in this project for
// a purely decorative particle field. Loading it as its own chunk keeps it
// out of the homepage's initial JS entirely — see AUDIT_REPORT.md.
const AmbientParticles = dynamic(() =>
  import("@/components/shared/ambient-particles").then((mod) => mod.AmbientParticles)
);

export function AppointmentCta() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-28">
      <AmbientParticles className="pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-400">
          Book a Visit
        </p>
        <h2 className="mt-4 text-balance font-serif text-3xl text-white sm:text-4xl">
          Ready when you are.
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-white/60">
          Send us your preferred day and time on WhatsApp, or call the clinic
          directly — whichever is faster for you.
        </p>

        <div className="mx-auto mt-10 max-w-[8rem]">
          <PulseDivider tone="dark" />
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <ButtonLink href={whatsapp.href(defaultWhatsappMessage)} size="lg">
            <WhatsappIcon className="h-4 w-4" />
            Book on WhatsApp
          </ButtonLink>
          <ButtonLink href={primaryPhone.href} variant="outline-light" size="lg">
            Call {primaryPhone.display}
          </ButtonLink>
        </div>

        <p className="mt-8 inline-flex items-center gap-2 text-sm text-white/50">
          <MapPinIcon className="h-4 w-4 shrink-0" />
          {siteConfig.address.lines.join(", ")}
        </p>
      </div>
    </section>
  );
}
