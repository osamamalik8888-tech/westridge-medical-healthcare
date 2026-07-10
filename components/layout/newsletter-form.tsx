"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

/**
 * No email service (Mailchimp/Beehiiv/etc.) is wired up yet, so rather than
 * ship a form that silently goes nowhere, this opens a pre-filled email to
 * the clinic's own inbox. It's a real, working action today; swap the
 * handleSubmit body for a real API call once a provider is chosen.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    const subject = "Add me to Westridge health updates";
    const body = `Please add ${email} to the health tips list.`;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <p className="text-sm text-white/70">
        Opening your email app — send it through and we&rsquo;ll add you.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="h-11 min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
      />
      <Button type="submit" size="md" className="shrink-0">
        Subscribe
      </Button>
    </form>
  );
}
