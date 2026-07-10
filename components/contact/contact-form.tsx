"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WhatsappIcon, MailIcon } from "@/components/shared/icons";
import { whatsapp, siteConfig } from "@/lib/site-config";
import { formFieldClass, formLabelClass, formErrorClass, formTextareaClass } from "@/lib/utils";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const [blockedUrl, setBlockedUrl] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const pendingChannel = useRef<"whatsapp" | "email">("whatsapp");

  function buildMessage(values: ContactFormValues) {
    return [
      `Hi Westridge Medical Healthcare, I have a question.`,
      ``,
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Phone: ${values.phone?.trim() || "Not provided"}`,
      ``,
      values.message.trim(),
    ].join("\n");
  }

  function onSubmit(values: ContactFormValues) {
    if (honeypotRef.current?.value) return;

    const message = buildMessage(values);

    if (pendingChannel.current === "email") {
      const subject = `Website enquiry — ${values.name.trim()}`;
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      setBlockedUrl(null);
      return;
    }

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
          <label htmlFor="contact-name" className={formLabelClass}>
            Full name
          </label>
          <input id="contact-name" type="text" placeholder="Your name" className={formFieldClass} {...register("name")} />
          {errors.name && <p className={formErrorClass}>{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-phone" className={formLabelClass}>
            Phone{" "}
            <span className="font-normal text-navy-400 dark:text-white/40">(optional)</span>
          </label>
          <input id="contact-phone" type="tel" placeholder="03XX XXXXXXX" className={formFieldClass} {...register("phone")} />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="contact-email" className={formLabelClass}>
            Email
          </label>
          <input id="contact-email" type="email" placeholder="you@email.com" className={formFieldClass} {...register("email")} />
          {errors.email && <p className={formErrorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className={formLabelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="How can we help?"
          className={formTextareaClass}
          {...register("message")}
        />
        {errors.message && <p className={formErrorClass}>{errors.message.message}</p>}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          onClick={() => {
            pendingChannel.current = "whatsapp";
          }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red-600 px-6 text-[0.9375rem] font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navy-900"
        >
          <WhatsappIcon className="h-4 w-4" />
          Send via WhatsApp
        </button>
        <button
          type="submit"
          onClick={() => {
            pendingChannel.current = "email";
          }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line px-6 text-[0.9375rem] font-medium text-navy-800 transition-colors hover:bg-navy-50 dark:border-white/15 dark:text-white/85 dark:hover:bg-white/10"
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
    </form>
  );
}
