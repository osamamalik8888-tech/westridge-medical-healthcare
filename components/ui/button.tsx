import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";
type Size = "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-900/10",
  secondary:
    "bg-navy-900 text-white hover:bg-navy-800 dark:bg-white dark:text-navy-900 dark:hover:bg-navy-100",
  ghost:
    "bg-transparent text-navy-900 hover:bg-navy-50 dark:text-white dark:hover:bg-white/10",
  "outline-light":
    "bg-transparent text-white border border-white/35 hover:bg-white/10 hover:border-white/60",
};

const sizeStyles: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-navy-950 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

interface ButtonOwnProps {
  variant?: Variant;
  size?: Size;
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonOwnProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

interface ButtonLinkProps extends ButtonOwnProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  "aria-label"?: string;
}

/** Same visual system as Button, for when the action is really a navigation. */
export function ButtonLink({
  href,
  className,
  variant = "primary",
  size = "md",
  external = false,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
