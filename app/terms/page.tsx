import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Westridge Medical Healthcare's website and appointment requests — draft, pending legal review.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "10 July 2026";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 sm:py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">Legal</p>
      <h1 className="mt-4 font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">Terms of Service</h1>

      <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-500/20 dark:bg-red-500/10 text-sm leading-relaxed text-navy-700 dark:text-white/75">
        <strong className="text-navy-900 dark:text-white">This is a draft, not a published policy.</strong>{" "}
        A lawyer should review these terms — particularly the medical disclaimer, the
        emergency-services disclaimer, and the liability language — before this page is
        published.
      </div>

      <p className="mt-6 text-xs text-navy-400 dark:text-white/40">Last updated: {LAST_UPDATED} (draft)</p>

      <div className="mt-8 flex flex-col gap-8 text-[0.9375rem] leading-relaxed text-navy-700 dark:text-white/75">
        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Not an emergency service</h2>
          <p className="mt-2">
            Westridge Medical Healthcare is a general physician&rsquo;s clinic, not an
            emergency department. This website, its forms, and its WhatsApp number are not
            monitored around the clock and do not provide emergency medical services. In a
            genuine medical emergency, call {siteConfig.emergency.number} (Rescue) or go
            directly to your nearest emergency department — do not wait for a reply here.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Medical disclaimer</h2>
          <p className="mt-2">
            Content on this website — including the AI Health Assistant, the symptom
            checker, and the health calculators — is provided for general information only
            and is not a substitute for a consultation with a qualified physician. None of
            these tools diagnose anything or prescribe treatment; the AI Assistant and
            symptom checker only suggest how soon something is worth being seen for. Always
            seek medical advice for your specific situation.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">AI Health Assistant</h2>
          <p className="mt-2">
            Currently runs in demo mode — fixed pattern matching, not a full language model —
            and its urgency classifications (Emergency, Urgent, Routine, Self-care) are a
            starting point for deciding how soon to seek care, not a clinical judgment.
            Treat any Emergency classification as real and act on it immediately; treat every
            other classification as a suggestion to confirm with an actual consultation, not
            a conclusion to rely on by itself. Content it generates, in demo mode or once a
            real AI provider is connected, may occasionally be wrong, incomplete, or fail to
            recognize something serious — this is a general limitation of the tool, not a
            promise it will always work correctly.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Appointments</h2>
          <p className="mt-2">
            A message sent through the appointment form, WhatsApp, or a phone call is a
            request for an appointment, not a confirmed booking, until Westridge staff reply
            to confirm the day and time.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Careers applications</h2>
          <p className="mt-2">
            Submitting the careers form is an expression of interest, not an offer of
            employment or a guarantee of a response by any particular date. Applications are
            kept on file and reviewed against roles as they become available.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Your responsibilities</h2>
          <p className="mt-2">
            Use this website, its forms, and its WhatsApp number for their intended purpose,
            and provide accurate information when you do. Don&rsquo;t attempt to
            interfere with the site&rsquo;s normal operation or use it to send unlawful,
            abusive, or fraudulent content.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Website use</h2>
          <p className="mt-2">
            This website is provided as-is. We aim to keep information about services, hours,
            and contact details accurate and current, but recommend confirming anything
            time-sensitive by phone or WhatsApp before visiting.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Third-party services</h2>
          <p className="mt-2">
            Booking via WhatsApp and viewing our location on Google Maps both hand you off to
            services run by Meta and Google respectively, each with their own terms and
            privacy practices that this site doesn&rsquo;t control.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Future online appointment booking</h2>
          <p className="mt-2">
            Booking currently works entirely through WhatsApp. If Westridge introduces a
            fully online booking or patient-account system later, these terms will be
            updated to cover it — including account use, cancellations, and any data that
            system stores — before it launches, not after.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Content ownership</h2>
          <p className="mt-2">
            Text, photos, and the Westridge name and logo on this site belong to Westridge
            Medical Healthcare and shouldn&rsquo;t be reused elsewhere without permission.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Limitation of liability</h2>
          <p className="mt-2">
            Westridge isn&rsquo;t liable for decisions made solely on the basis of this
            website&rsquo;s general information, as opposed to an actual consultation — this
            clause needs a lawyer&rsquo;s specific wording for Pakistani law before
            publishing, not the general placeholder here.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Changes to these terms</h2>
          <p className="mt-2">
            If these terms change in any meaningful way, the update date at the top of this
            page will change too.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Governing law</h2>
          <p className="mt-2">These terms are governed by the laws of Pakistan.</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Contact</h2>
          <p className="mt-2">
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-red-600 hover:underline dark:text-red-300">
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
