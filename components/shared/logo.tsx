import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Real mark (public/images/logo.png, sampled from WMH_LOGO.png) — navy
 * transitioning to red on a transparent background. It always sits on a
 * small light chip so it stays legible regardless of what's behind it
 * (white header, dark header in dark mode, or the permanently-dark
 * footer) — simpler and more robust than trying to theme the mark itself.
 */
export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const textColor = variant === "dark" ? "text-navy-900 dark:text-white" : "text-white";
  const subColor = variant === "dark" ? "text-navy-500 dark:text-white/65" : "text-white/65";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.6rem] bg-white/95 p-1.5 shadow-sm shadow-navy-900/5">
        <Image
          src="/images/logo.png"
          alt=""
          width={30}
          height={30}
          priority
          className="h-full w-full object-contain"
        />
      </span>
      <span className="flex flex-col leading-[1.05]">
        <span className={cn("font-serif text-[1.05rem] tracking-[-0.01em]", textColor)}>
          Westridge
        </span>
        <span className={cn("text-[0.6rem] font-semibold uppercase tracking-[0.16em]", subColor)}>
          Medical Healthcare
        </span>
      </span>
    </span>
  );
}
