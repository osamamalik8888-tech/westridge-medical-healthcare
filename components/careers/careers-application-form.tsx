"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WhatsappIcon } from "@/components/shared/icons";
import { whatsapp } from "@/lib/site-config";
import { formFieldClass, formLabelClass, formErrorClass, formTextareaClass } from "@/lib/utils";
import { applicationSchema, positions, type ApplicationFormValues } from "@/lib/careers-schema";

export function CareersApplicationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      position: positions[0],
      experience: "",
      message: "",
    },
  });

  const [blockedUrl, setBlockedUrl] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  function onSubmit(values: ApplicationFormValues) {
    if (honeypotRef.current?.value) return;
    const message = [
      `Hi Westridge Medical Healthcare, I'd like to apply for a position.`,
      ``,
      `Name: ${values.name.trim()}`,
      `Phone: ${values.phone.trim()}`,
      `Email: ${values.email.trim()}`,
      `Position: ${values.position}`,
      `Experience: ${values.experience.trim()}`,
      `Message: ${values.message?.trim() || "Not specified"}`,
    ].join("\n");

    const url = whatsapp.href(message);
    const opened = window.open(url, "_blank", "noopener,noreferrer");
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
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="applicant-name" className={formLabelClass}>
            Full name
          </label>
          <input
            id="applicant-name"
            type="text"
            placeholder="Your name"
            className={formFieldClass}
            {...register("name")}
          />
          {errors.name && <p className={formErrorClass}>{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="applicant-position" className={formLabelClass}>
            Position
          </label>
          <select id="applicant-position" className={formFieldClass} {...register("position")}>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="applicant-phone" className={formLabelClass}>
            Phone
          </label>
          <input
            id="applicant-phone"
            type="tel"
            placeholder="03XX XXXXXXX"
            className={formFieldClass}
            {...register("phone")}
          />
          {errors.phone && <p className={formErrorClass}>{errors.phone.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="applicant-email" className={formLabelClass}>
            Email
          </label>
          <input
            id="applicant-email"
            type="email"
            placeholder="you@email.com"
            className={formFieldClass}
            {...register("email")}
          />
          {errors.email && <p className={formErrorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="applicant-experience" className={formLabelClass}>
          Experience
        </label>
        <input
          id="applicant-experience"
          type="text"
          placeholder="e.g. 3 years as a pharmacist at a retail chain"
          className={formFieldClass}
          {...register("experience")}
        />
        {errors.experience && <p className={formErrorClass}>{errors.experience.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="applicant-message" className={formLabelClass}>
          Anything else{" "}
          <span className="font-normal text-navy-400 dark:text-white/40">(optional)</span>
        </label>
        <textarea
          id="applicant-message"
          rows={3}
          placeholder="Availability, certifications, why Westridge — whatever's relevant."
          className={formTextareaClass}
          {...register("message")}
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-red-600 px-6 text-[0.9375rem] font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navy-900"
      >
        <WhatsappIcon className="h-4 w-4" />
        Send Application via WhatsApp
      </button>

      {blockedUrl && (
        <p className="rounded-xl bg-red-50 p-3.5 text-sm text-navy-700 dark:bg-red-500/10 dark:text-white/80">
          Your browser blocked the WhatsApp popup.{" "}
          <a href={blockedUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-red-600 underline dark:text-red-300">
            Tap here to open it instead
          </a>
          .
        </p>
      )}
    </form>
  );
}
