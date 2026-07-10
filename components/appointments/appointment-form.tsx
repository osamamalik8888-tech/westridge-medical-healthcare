"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WhatsappIcon, MailIcon } from "@/components/shared/icons";
import { MultiChannelCta } from "@/components/shared/multi-channel-cta";
import { doctors, whatsapp, siteConfig, defaultWhatsappMessage } from "@/lib/site-config";
import { to12Hour, formFieldClass, formLabelClass, formErrorClass, formTextareaClass } from "@/lib/utils";
import { appointmentSchema, type AppointmentFormValues } from "@/lib/appointment-schema";

const visitTypes = [
  "New Patient Consultation",
  "Follow-up Visit",
  "Lab Test / Sample Collection",
  "Vaccination",
  "ECG",
  "Corporate Health Package Enquiry",
];

/** 30-minute slots inside each real OPD session, ending 30 min before close. */
function buildTimeSlots() {
  const slots: string[] = [];
  for (const session of siteConfig.hours.opd.sessions) {
    for (let mins = session.startHour * 60; mins < session.endHour * 60 - 15; mins += 30) {
      const h24 = Math.floor(mins / 60) % 24;
      const m = mins % 60;
      const { hour12, period } = to12Hour(h24);
      slots.push(`${hour12}:${m.toString().padStart(2, "0")} ${period}`);
    }
  }
  return slots;
}

function todayInKarachi() {
  // en-CA gives YYYY-MM-DD directly, which is exactly what <input type="date"> needs.
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Karachi" }).format(new Date());
}

export function AppointmentForm() {
  const timeSlots = useMemo(buildTimeSlots, []);
  const [minDate, setMinDate] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMinDate(todayInKarachi());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      doctorSlug: doctors[0]?.slug ?? "",
      date: "",
      time: "",
      visitType: visitTypes[0],
      complaint: "",
    },
  });

  const [blockedUrl, setBlockedUrl] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const pendingChannel = useRef<"whatsapp" | "email">("whatsapp");

  function buildMessage(values: AppointmentFormValues) {
    const doctor = doctors.find((d) => d.slug === values.doctorSlug);
    const dateLabel = new Date(`${values.date}T00:00:00`).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return [
      `Hi Westridge Medical Healthcare, I'd like to book an appointment.`,
      ``,
      `Name: ${values.name.trim()}`,
      `Doctor: ${doctor?.name ?? "Any available"}`,
      `Date: ${dateLabel}`,
      `Time: ${values.time}`,
      `Visit type: ${values.visitType}`,
      `Complaint: ${values.complaint?.trim() || "Not specified"}`,
    ].join("\n");
  }

  function onSubmit(values: AppointmentFormValues) {
    // Basic spam deterrent: a hidden field no real visitor can see or
    // tab to, but a bot that blindly fills every input on the page will.
    // Silently no-ops instead of showing an error, so it doesn't tip off
    // anything smart enough to check for a rejection message.
    if (honeypotRef.current?.value) return;

    const message = buildMessage(values);

    if (pendingChannel.current === "email") {
      const subject = `Appointment request — ${values.name.trim()}`;
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      setBlockedUrl(null);
      return;
    }

    const url = whatsapp.href(message);
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    // A popup blocker returns null (or a closed/null-ish window) instead
    // of throwing — the form would otherwise look like it silently did
    // nothing. Surface a real fallback link instead of failing quietly.
    if (!opened || opened.closed) {
      setBlockedUrl(url);
    } else {
      setBlockedUrl(null);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5 text-left">
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className={formLabelClass}>
          Full name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          className={formFieldClass}
          {...register("name")}
        />
        {errors.name && <p className={formErrorClass}>{errors.name.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="doctor" className={formLabelClass}>
            Doctor
          </label>
          <select id="doctor" className={formFieldClass} {...register("doctorSlug")}>
            {doctors.map((doctor) => (
              <option key={doctor.slug} value={doctor.slug}>
                {doctor.name} — {doctor.role}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="visitType" className={formLabelClass}>
            Visit type
          </label>
          <select id="visitType" className={formFieldClass} {...register("visitType")}>
            {visitTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="date" className={formLabelClass}>
            Preferred date
          </label>
          <input
            id="date"
            type="date"
            min={minDate}
            className={formFieldClass}
            {...register("date")}
          />
          {errors.date && <p className={formErrorClass}>{errors.date.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="time" className={formLabelClass}>
            Preferred time
          </label>
          <select id="time" defaultValue="" className={formFieldClass} {...register("time")}>
            <option value="" disabled>
              Select a time
            </option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time && <p className={formErrorClass}>{errors.time.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="complaint" className={formLabelClass}>
          Reason for visit{" "}
          <span className="font-normal text-navy-400 dark:text-white/40">
            (optional, keep it brief)
          </span>
        </label>
        <textarea
          id="complaint"
          rows={3}
          placeholder="e.g. fever for 2 days, routine check-up, blood test..."
          className={formTextareaClass}
          {...register("complaint")}
        />
        <p className="text-xs text-navy-400 dark:text-white/40">
          Sent directly through whichever channel you choose below — keep sensitive detail for
          your actual consultation either way.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          onClick={() => {
            pendingChannel.current = "whatsapp";
          }}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-red-600 px-6 text-[0.9375rem] font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navy-900"
        >
          <WhatsappIcon className="h-4 w-4" />
          Send via WhatsApp
        </button>
        <button
          type="submit"
          onClick={() => {
            pendingChannel.current = "email";
          }}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-line px-6 text-[0.9375rem] font-medium text-navy-800 transition-colors hover:bg-navy-50 dark:border-white/15 dark:text-white/85 dark:hover:bg-white/10"
        >
          <MailIcon className="h-4 w-4" />
          Send via Email
        </button>
      </div>

      {blockedUrl && (
        <p className="rounded-xl bg-red-50 p-3.5 text-sm text-navy-700 dark:bg-red-500/10 dark:text-white/80">
          Your browser blocked the WhatsApp popup.{" "}
          <a href={blockedUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-red-600 underline dark:text-red-300">
            Tap here to open it instead
          </a>
          .
        </p>
      )}

      <div className="border-t border-line pt-5 dark:border-white/10">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-navy-400 dark:text-white/40">
          Prefer to just call, or grab our details for later?
        </p>
        <MultiChannelCta whatsappMessage={defaultWhatsappMessage} showCopy />
      </div>
    </form>
  );
}
