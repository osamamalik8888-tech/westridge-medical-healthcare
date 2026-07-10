"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/shared/icons";
import { whatsapp, primaryPhone } from "@/lib/site-config";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // No error-monitoring service wired up yet (Sentry, or similar, needs
    // a real account + DSN to configure, which isn't something to invent
    // here) — this console.error is the only record of a production error
    // right now, visible solely in the affected visitor's own browser
    // console, not to anyone at Westridge. Swapping in a real service
    // later is a small, contained change: install it, then replace this
    // one line with its capture call (e.g. Sentry.captureException(error)).
    // Nothing else in this file needs to change.
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-300">
        Something went wrong
      </p>
      <h1 className="mt-4 font-serif text-3xl text-navy-900 dark:text-white sm:text-4xl">
        This page hit a snag.
      </h1>
      <p className="mt-4 text-[1.0625rem] leading-relaxed text-navy-600 dark:text-white/65">
        It&rsquo;s not you — something didn&rsquo;t load correctly. Try again, or reach us
        directly if it keeps happening.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 items-center justify-center rounded-full bg-navy-900 px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-navy-800 dark:bg-white dark:text-navy-900 dark:hover:bg-navy-100"
        >
          Try again
        </button>
        <ButtonLink href={whatsapp.href("Hi, I ran into an error on your website.")}>
          <WhatsappIcon className="h-4 w-4" />
          Message us
        </ButtonLink>
      </div>
      <p className="mt-6 text-sm text-navy-400 dark:text-white/40">
        Or call {primaryPhone.display}
      </p>
    </div>
  );
}
