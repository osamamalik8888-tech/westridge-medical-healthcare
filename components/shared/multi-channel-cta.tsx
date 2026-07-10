"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { WhatsappIcon, PhoneIcon, MailIcon, CopyIcon, CheckIcon } from "@/components/shared/icons";
import { whatsapp, primaryPhone, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface MultiChannelCtaProps {
  whatsappMessage: string;
  /** "full" shows three labeled buttons; "compact" shows WhatsApp as the
   *  primary button with Call/Email as smaller icon links beside it. */
  variant?: "full" | "compact";
  /** Adds "Copy number" / "Copy email" actions — for contexts where
   *  someone might want the details themselves rather than acting now.
   *  Only rendered when variant is "full" — the compact layout has no
   *  room for it and silently ignores this prop if set. */
  showCopy?: boolean;
  /** Set true when this renders on a dark/navy background (e.g. the
   *  footer or the always-dark CTA bands) so text stays legible. */
  onDark?: boolean;
  className?: string;
}

export function MultiChannelCta({
  whatsappMessage,
  variant = "full",
  showCopy = false,
  onDark = false,
  className,
}: MultiChannelCtaProps) {
  const [copiedField, setCopiedField] = useState<"phone" | "email" | null>(null);

  async function copy(value: string, field: "phone" | "email") {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard access can fail silently (permissions, insecure
      // context) — not worth surfacing an error for a convenience action.
    }
  }

  const secondaryLinkClass = onDark
    ? "inline-flex h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-white/10"
    : "inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-[0.9375rem] font-medium text-navy-800 transition-colors hover:bg-navy-50 dark:border-white/15 dark:text-white/85 dark:hover:bg-white/10";

  const copyButtonClass = onDark
    ? "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-white/60 transition-colors hover:text-white"
    : "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-navy-400 transition-colors hover:text-navy-700 dark:text-white/45 dark:hover:text-white";

  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap items-center gap-3", className)}>
        <ButtonLink href={whatsapp.href(whatsappMessage)}>
          <WhatsappIcon className="h-4 w-4" />
          WhatsApp
        </ButtonLink>
        <a href={primaryPhone.href} aria-label={`Call ${primaryPhone.display}`} className={secondaryLinkClass}>
          <PhoneIcon className="h-4 w-4" />
        </a>
        <a href={`mailto:${siteConfig.email}`} aria-label={`Email ${siteConfig.email}`} className={secondaryLinkClass}>
          <MailIcon className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <ButtonLink href={whatsapp.href(whatsappMessage)}>
          <WhatsappIcon className="h-4 w-4" />
          WhatsApp
        </ButtonLink>
        <a href={primaryPhone.href} className={secondaryLinkClass}>
          <PhoneIcon className="h-4 w-4" />
          Call
        </a>
        <a href={`mailto:${siteConfig.email}`} className={secondaryLinkClass}>
          <MailIcon className="h-4 w-4" />
          Email
        </a>
      </div>

      {showCopy && (
        <div className="flex flex-wrap items-center gap-1">
          <button type="button" onClick={() => copy(primaryPhone.display, "phone")} className={copyButtonClass}>
            {copiedField === "phone" ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
            {copiedField === "phone" ? "Copied" : `Copy ${primaryPhone.display}`}
          </button>
          <button type="button" onClick={() => copy(siteConfig.email, "email")} className={copyButtonClass}>
            {copiedField === "email" ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
            {copiedField === "email" ? "Copied" : `Copy ${siteConfig.email}`}
          </button>
        </div>
      )}
    </div>
  );
}
