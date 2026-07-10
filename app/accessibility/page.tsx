import type { Metadata } from "next";
import { siteConfig, whatsapp } from "@/lib/site-config";
import { CheckIcon } from "@/components/shared/icons";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "How Westridge Medical Healthcare's website approaches accessibility, and how to report a problem.",
  alternates: { canonical: "/accessibility" },
};

const commitments = [
  "Every icon-only button has a real label a screen reader can announce, not just a visual icon.",
  "The whole site can be operated by keyboard alone — including the navigation menu, which closes on Escape like any dropdown should.",
  "Text and background color combinations were checked against WCAG AA contrast requirements with actual contrast-ratio math, not just eyeballed — and two real failures found that way were fixed.",
  "A large-text toggle is available site-wide (next to the dark mode toggle in the header) for anyone who prefers bigger type.",
  "Motion respects your system's reduced-motion setting — scroll animations, page transitions, and the ambient background effect all turn off automatically if you've asked your device to limit motion.",
  "Moving between pages moves keyboard focus to the new page's content, the same way a full page load would.",
];

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 sm:py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
        Accessibility
      </p>
      <h1 className="mt-4 font-serif text-4xl text-navy-900 dark:text-white sm:text-5xl">
        Accessibility Statement
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-navy-600 dark:text-white/65">
        This is meant to be a working record of what&rsquo;s actually been done, not a
        general promise. If something below doesn&rsquo;t match what you&rsquo;re
        experiencing, that&rsquo;s exactly what the contact section at the bottom is for.
      </p>

      <div className="mt-10 flex flex-col gap-3">
        {commitments.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-red-600 dark:text-red-300" />
            <p className="text-[0.9375rem] leading-relaxed text-navy-700 dark:text-white/75">
              {item}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-8 text-[0.9375rem] leading-relaxed text-navy-700 dark:text-white/75">
        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Where this falls short</h2>
          <p className="mt-2">
            This has been checked carefully in code and with automated contrast math, but not
            yet by an actual screen reader user on real assistive technology, or against the
            full WCAG 2.1 checklist by a dedicated accessibility auditor. Both are worth doing
            before treating this as a finished, certified effort rather than a genuinely
            careful one.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-navy-900 dark:text-white">Report a problem</h2>
          <p className="mt-2">
            If any page, form, or feature on this site is hard to use with a screen reader,
            keyboard alone, or any other assistive technology, tell us directly — this gets
            fixed, not filed away.
          </p>
          <p className="mt-3">
            <a
              href={whatsapp.href("Hi, I ran into an accessibility problem on your website.")}
              className="font-medium text-red-600 hover:underline dark:text-red-300"
            >
              Message us on WhatsApp
            </a>{" "}
            or email{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-red-600 hover:underline dark:text-red-300"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
