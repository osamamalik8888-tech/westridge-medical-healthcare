"use client";

import { useEffect, useState } from "react";
import { cn, formatHour12 } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

interface Status {
  isOpen: boolean;
  label: string;
}

function computeStatus(): Status {
  const pktHour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Karachi",
      hour: "numeric",
      hour12: false,
    }).format(new Date())
  );

  const session = siteConfig.hours.opd.sessions.find(
    (s) => pktHour >= s.startHour && pktHour < s.endHour
  );

  if (session) {
    return {
      isOpen: true,
      label: `Doctor available now · until ${formatHour12(session.endHour)}`,
    };
  }

  const next = siteConfig.hours.opd.sessions.find((s) => s.startHour > pktHour);
  const nextLabel = next ? formatHour12(next.startHour) : formatHour12(10);

  return { isOpen: false, label: `Doctor back at ${nextLabel} · pharmacy open now` };
}

/**
 * Renders nothing on the server and on first client paint, then fills in
 * once mounted — avoids a server/client hydration mismatch, since "now"
 * can only be known in the browser. Reflects the doctor's two OPD
 * sessions specifically; the pharmacy runs 24/7 regardless.
 */
export function OpenStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    setStatus(computeStatus());
    const id = setInterval(() => setStatus(computeStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) {
    return <span className={cn("inline-block h-[1.125rem]", className)} />;
  }

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status.isOpen ? "animate-pulse-dot bg-red-500" : "bg-navy-300"
        )}
      />
      {status.label}
    </span>
  );
}
