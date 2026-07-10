import type { Metadata } from "next";
import { AppointmentForm } from "@/components/appointments/appointment-form";
import { PulseDivider } from "@/components/shared/pulse-divider";
import { primaryPhone, siteConfig, doctors } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Book an appointment at Westridge Medical Healthcare — choose a doctor, date, time, and visit type.",
  alternates: { canonical: "/appointments" },
};

export default function AppointmentsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 sm:py-28">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
          Appointments
        </p>
        <h1 className="mt-4 font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">
          Book your visit
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-balance text-[1.0625rem] leading-relaxed text-navy-600 dark:text-white/65">
          Fill this in and it opens WhatsApp with everything already written
          out — nothing is sent until you hit send there. We&rsquo;ll confirm
          the exact time back to you on WhatsApp.
        </p>
      </div>

      <div className="mx-auto my-10 max-w-[8rem]">
        <PulseDivider />
      </div>

      {doctors[0] && (
        <div className="mb-8 flex items-center gap-4 rounded-2xl border border-line bg-white p-4 dark:border-white/10 dark:bg-navy-900">
          <div>
            <p className="font-medium text-navy-900 dark:text-white">{doctors[0].name}</p>
            <p className="text-sm text-navy-500 dark:text-white/55">{doctors[0].role}</p>
          </div>
        </div>
      )}

      <div className="rounded-[1.75rem] border border-line bg-white p-6 shadow-sm shadow-navy-900/[0.03] dark:border-white/10 dark:bg-navy-900 sm:p-8">
        <AppointmentForm />
      </div>

      <p className="mt-8 text-center text-sm text-navy-500 dark:text-white/55">
        Prefer to talk it through? Call{" "}
        <a
          href={primaryPhone.href}
          className="font-medium text-red-600 hover:underline dark:text-red-300"
        >
          {primaryPhone.display}
        </a>{" "}
        — OPD hours are {siteConfig.hours.opdDisplay}.
      </p>
    </div>
  );
}
