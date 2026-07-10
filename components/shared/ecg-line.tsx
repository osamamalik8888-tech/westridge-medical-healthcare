import { cn } from "@/lib/utils";

const PULSE_PATH =
  "M0,30 L35,30 Q42,18 48,30 L88,30 L96,30 L102,40 L108,6 L114,46 L120,30 L160,30 Q170,16 180,30 L300,30";

/**
 * A continuously scrolling heartbeat waveform. Two identical copies sit
 * side by side inside a 200%-wide track that animates from 0 to -50%,
 * which loops seamlessly since the path returns to the same baseline
 * value (y=30) at both x=0 and x=300.
 *
 * Used across the site as the recurring "signature" motif — see
 * PulseDivider — rather than confined to a single hero decoration, to
 * echo the idea this clinic is meant to communicate: care that doesn't
 * stop at 5pm.
 */
export function EcgLine({
  className,
  strokeClassName = "stroke-red-500",
}: {
  className?: string;
  strokeClassName?: string;
}) {
  return (
    <div className={cn("overflow-hidden", className)} aria-hidden="true">
      <div className="animate-ecg-scroll flex h-full w-[200%]">
        {[0, 1].map((copy) => (
          <svg
            key={copy}
            viewBox="0 0 300 60"
            preserveAspectRatio="none"
            className="h-full w-1/2"
          >
            <path
              d={PULSE_PATH}
              fill="none"
              className={strokeClassName}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}
