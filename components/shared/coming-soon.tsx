import { ButtonLink } from "@/components/ui/button";
import { PulseDivider } from "@/components/shared/pulse-divider";
import { primaryPhone, whatsapp, defaultWhatsappMessage } from "@/lib/site-config";

export function ComingSoonPage({
  eyebrow,
  title,
  description,
  contactPrompt = "In the meantime, the fastest way to reach us is directly:",
}: {
  eyebrow: string;
  title: string;
  description: string;
  contactPrompt?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-28 text-center sm:py-36">
      <p className="font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300 text-xs">
        {eyebrow}
      </p>
      <h1 className="mt-4 font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">{title}</h1>
      <p className="mt-5 text-balance text-[1.0625rem] leading-relaxed text-navy-600 dark:text-white/65">
        {description}
      </p>

      <div className="mx-auto mt-10 max-w-[10rem]">
        <PulseDivider />
      </div>

      <p className="mt-10 text-sm text-navy-500 dark:text-white/55">{contactPrompt}</p>
      <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href={whatsapp.href(defaultWhatsappMessage)} variant="primary">
          WhatsApp Us
        </ButtonLink>
        <ButtonLink href={primaryPhone.href} variant="ghost">
          Call {primaryPhone.display}
        </ButtonLink>
      </div>
    </div>
  );
}
