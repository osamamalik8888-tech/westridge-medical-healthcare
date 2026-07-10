import type { SVGProps } from "react";

/**
 * Small, dependency-free icon set in a consistent 24x24 / 1.75px stroke style.
 * Hand-drawn instead of pulling in an icon package, so there's no external
 * version to pin (or drift) in this environment.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 8.5l6.5 7 6.5-7" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 4h3l2 5-2.5 1.8a11 11 0 0 0 5.2 5.2L15 13.5l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 6.2 2 2 0 0 1 5.5 4Z" />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.47 14.38c-.29-.15-1.71-.84-1.98-.94-.27-.1-.46-.15-.66.15-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.5-.17 0-.37-.02-.56-.02-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.7.22 1.34.19 1.84.12.56-.08 1.71-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.34Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.02 2C6.5 2 2.03 6.44 2.03 11.92c0 1.8.48 3.52 1.38 5.04L2 22l5.2-1.36a10.05 10.05 0 0 0 4.82 1.23h.01c5.52 0 10-4.44 10-9.92C22.02 6.44 17.55 2 12.02 2Zm0 18.13h-.01a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-3.09.81.82-3-.2-.31a8.15 8.15 0 0 1-1.26-4.37c0-4.51 3.7-8.17 8.28-8.17 2.21 0 4.29.86 5.85 2.41a8.09 8.09 0 0 1 2.42 5.76c0 4.51-3.71 8.17-8.28 8.17Z"
      />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21.5s7-6.3 7-12A7 7 0 1 0 5 9.5c0 5.7 7 12 7 12Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12.5 9 17l10.5-10.5" />
    </svg>
  );
}

export function StethoscopeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3.5v6a4 4 0 0 0 8 0v-6" />
      <path d="M10 13.5v2.3a5.2 5.2 0 1 0 10.4 0v-1.3" />
      <circle cx="20.4" cy="12.5" r="1.5" />
    </svg>
  );
}

export function FlaskIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 3.5h4M10.5 3.5v5.6L6 17a2 2 0 0 0 1.8 2.9h8.4A2 2 0 0 0 18 17l-4.5-7.9V3.5" />
      <path d="M8.2 15h7.6" />
    </svg>
  );
}

export function PillIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="8.8" width="17" height="6.4" rx="3.2" transform="rotate(-40 12 12)" />
      <path d="M9.5 8 15 14.6" />
    </svg>
  );
}

export function SyringeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20.5 3.5 17 7M18 5.5l-9.5 9.5.2 3.3 3.3.2L21.5 9M11.5 12.5 15 16M9 15l2.5 2.5M4 20l3-3" />
    </svg>
  );
}

export function HeartPulseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 12.5h4l1.8-4 3 8 2-5.4 1.3 1.4h4.9" />
      <path d="M12 20.5S4 15.8 4 9.8A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8 2.8c0 .6-.08 1.2-.24 1.7" />
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="3.5" width="10.5" height="17" rx="1" />
      <path d="M15.5 10.5H19a1 1 0 0 1 1 1v9h-4.5M8.3 7.5h.01M11.8 7.5h.01M8.3 11h.01M11.8 11h.01M8.3 14.5h.01M11.8 14.5h.01M8.7 20.5v-3.2h2.9v3.2" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20.5 14.2a8.5 8.5 0 1 1-9.7-11 7 7 0 0 0 9.7 11Z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21.5v-8.2h2.75l.41-3.19h-3.16V8.09c0-.92.26-1.55 1.57-1.55h1.68V3.68A22.5 22.5 0 0 0 14.35 3.5c-2.42 0-4.08 1.48-4.08 4.19v2.34H7.5v3.19h2.77v8.2Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M16.7 7.3h.01" strokeLinecap="round" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5H3.56V20.5h3.38ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.5 20.5v-6.6c0-3.53-1.88-5.17-4.4-5.17a3.8 3.8 0 0 0-3.44 1.9V8.5H9.28c.04.96 0 12 0 12h3.38v-6.7c0-.36.02-.72.13-.98.28-.72.94-1.46 2.04-1.46 1.44 0 2.02 1.1 2.02 2.7v6.44Z" />
    </svg>
  );
}

export function SendIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12 20.5 4 15 20l-3.5-6.5L4 12Z" strokeLinejoin="round" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5c.4 3.4 1.2 5.6 2.4 6.8 1.2 1.2 3.4 2 6.8 2.4-3.4.4-5.6 1.2-6.8 2.4-1.2 1.2-2 3.4-2.4 6.8-.4-3.4-1.2-5.6-2.4-6.8-1.2-1.2-3.4-2-6.8-2.4 3.4-.4 5.6-1.2 6.8-2.4 1.2-1.2 2-3.4 2.4-6.8Z" />
    </svg>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="7.5" width="18" height="12" rx="2" />
      <path d="M8.5 7.5v-2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" />
      <path d="M3 12.5h18" />
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2" />
      <path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5" />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 6.5h15" />
      <path d="M8.5 6.5V5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 5v1.5" />
      <path d="M18 6.5 17.2 19a2 2 0 0 1-2 1.9H8.8a2 2 0 0 1-2-1.9L6 6.5" />
      <path d="M10 10.5v6M14 10.5v6" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.5 2.3 3.8 5.3 3.8 8.5s-1.3 6.2-3.8 8.5c-2.5-2.3-3.8-5.3-3.8-8.5S9.5 5.8 12 3.5Z" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7-5.4-4.7 7.1-.6L12 2.5Z" />
    </svg>
  );
}
