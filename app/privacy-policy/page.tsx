import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Westridge Medical Healthcare handles patient information — draft policy, pending legal review.",
  alternates: { canonical: "/privacy-policy" },
};

const LAST_UPDATED = "10 July 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 sm:py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">Legal</p>
      <h1 className="mt-4 font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">Privacy Policy</h1>

      <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-500/20 dark:bg-red-500/10 text-sm leading-relaxed text-navy-700 dark:text-white/75">
        <strong className="text-navy-900 dark:text-white">This is a draft, not a published policy.</strong>{" "}
        Because Westridge handles patient health information, this text should be reviewed
        by a lawyer familiar with Pakistani data-protection and healthcare-privacy
        practice before this page goes live — thorough as this draft is, it isn&rsquo;t
        legal advice and shouldn&rsquo;t be treated as a substitute for that review.
      </div>

      <p className="mt-6 text-xs text-navy-400 dark:text-white/40">Last updated: {LAST_UPDATED} (draft)</p>

      <div className="mt-8 flex flex-col gap-8 text-[0.9375rem] leading-relaxed text-navy-700 dark:text-white/75">
        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Information we collect</h2>
          <p className="mt-2">
            When you contact Westridge Medical Healthcare — by WhatsApp, phone, email, or in
            person — we collect the information you choose to share, which may include your
            name, contact details, and information about your health relevant to your visit.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Appointment requests</h2>
          <p className="mt-2">
            The appointment form on this site collects your name, preferred doctor, date,
            time, visit type, and an optional description of why you&rsquo;re coming in. This
            builds a WhatsApp message that only sends when you press send yourself — nothing
            is transmitted to us directly from the form. The same applies to the careers
            application form, which collects name, phone, email, desired position,
            experience, and an optional message.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">AI Health Assistant</h2>
          <p className="mt-2">
            Whatever you type into the AI Health Assistant is sent to our server to generate
            a reply — unlike the forms above, this one does transmit what you type. Right
            now it&rsquo;s running in demo mode: your message is matched against a fixed set
            of patterns entirely on our own server, nothing is sent to any outside AI
            company, and nothing is stored afterward — each message is processed and then
            forgotten, not saved to a database. If a real AI provider (OpenAI or Anthropic)
            is connected later, that will change: your messages would then be sent to that
            provider to generate a response, subject to their own data practices in addition
            to ours, and this section will be updated to say so plainly before that happens,
            not after. Avoid typing anything you wouldn&rsquo;t want processed this way — for
            genuinely sensitive detail, a real conversation with the doctor is the right
            place for it, not this tool.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">How we use it</h2>
          <p className="mt-2">
            We use this information to schedule and provide care, to fill prescriptions
            through Westridge Plus Pharmacy, to process laboratory tests, to consider job
            applications, and to respond to your enquiries. We do not sell patient
            information.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Sharing with labs and specialists</h2>
          <p className="mt-2">
            Some tests are sent to external laboratories, and some concerns are referred to
            specialists outside Westridge. In those cases, only the information relevant to
            that test or referral is shared, and only with your knowledge that a referral is
            being made.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">How long we keep it</h2>
          <p className="mt-2">
            Medical records are kept for as long as relevant care or Pakistani record-keeping
            requirements require — a lawyer should confirm the specific retention period
            appropriate for a general physician&rsquo;s practice before this is published.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Keeping it secure</h2>
          <p className="mt-2">
            We take reasonable steps to protect patient information from unauthorised
            access. No system is perfectly secure, and this section should be made specific
            to whatever record-keeping system Westridge actually uses before publishing.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">WhatsApp &amp; phone contact</h2>
          <p className="mt-2">
            Messages sent to our WhatsApp number are subject to WhatsApp&rsquo;s own privacy
            practices in addition to ours. Avoid sending sensitive details you&rsquo;re not
            comfortable sharing over messaging apps; call or visit in person instead.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Cookies &amp; analytics</h2>
          <p className="mt-2">
            This website does not currently use analytics or advertising cookies. If that
            changes, this section will be updated to say what&rsquo;s collected and why
            before any such tool goes live, not after.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Children&rsquo;s information</h2>
          <p className="mt-2">
            Westridge treats patients of all ages, including children brought in by a parent
            or guardian. Information about a child patient is handled the same way as any
            other patient&rsquo;s, and is shared with or requested by the accompanying parent
            or guardian.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Your responsibilities</h2>
          <p className="mt-2">
            Please give accurate information when booking or filling out any form on this
            site — an appointment request with the wrong date, contact number, or complaint
            makes it harder for us to help you, not easier. Please don&rsquo;t use the
            appointment or careers forms for anything other than their stated purpose.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Not an emergency service</h2>
          <p className="mt-2">
            This website, its forms, and its WhatsApp number are not monitored for
            emergencies and do not provide emergency medical services. In a genuine medical
            emergency, call {siteConfig.emergency.number} (Rescue) or go directly to your
            nearest emergency department.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Future online appointment booking</h2>
          <p className="mt-2">
            Appointments currently route through WhatsApp by design — nothing is stored on a
            server today. If Westridge later adds a fully online booking system with its own
            account creation or stored booking history, this policy will be updated first to
            describe exactly what that system collects, before it goes live.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Your rights</h2>
          <p className="mt-2">
            You can ask to see, correct, or request deletion of the personal information we
            hold about you by contacting us using the details below.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Changes to this policy</h2>
          <p className="mt-2">
            If this policy changes in any meaningful way, the update date at the top of this
            page will change too — there won&rsquo;t be silent edits to what we&rsquo;ve told
            patients we do with their information.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Contact</h2>
          <p className="mt-2">
            Questions about this policy can be sent to{" "}
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
