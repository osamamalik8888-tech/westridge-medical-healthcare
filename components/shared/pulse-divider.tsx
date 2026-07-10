import { cn } from "@/lib/utils";
import { EcgLine } from "@/components/shared/ecg-line";

export function PulseDivider({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "relative h-px w-full",
        tone === "light" ? "bg-line dark:bg-white/10" : "bg-white/10",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 -top-3 h-6 opacity-80">
        <EcgLine
          className="h-full"
          strokeClassName={tone === "light" ? "stroke-red-500/70" : "stroke-red-400/70"}
        />
      </div>
    </div>
  );
}
