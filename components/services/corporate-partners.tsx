import Image from "next/image";
import { corporatePartners, whatsapp } from "@/lib/site-config";
import { WhatsappIcon } from "@/components/shared/icons";

export function CorporatePartners() {
  return (
    <div className="mx-auto mt-16 max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-navy-500 dark:text-white/50">
        Corporate &amp; Insurance Partners
      </p>

      {corporatePartners.length > 0 ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 grayscale">
          {corporatePartners.map((partner) => (
            <div key={partner.name} className="relative h-8 w-28 opacity-70">
              <Image src={partner.logoSrc} alt={partner.name} fill sizes="7rem" className="object-contain" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-500 dark:text-white/55">
            No formal partnerships yet — this section is ready to display them the
            moment there are some to show.
          </p>
          <a
            href={whatsapp.href("Hi, I'd like to discuss a corporate or insurance partnership.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 dark:border-white/15 dark:text-white/80 dark:hover:bg-white/10"
          >
            <WhatsappIcon className="h-3.5 w-3.5" />
            Discuss a partnership
          </a>
        </>
      )}
    </div>
  );
}
