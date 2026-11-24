"use client";

import Link from "next/link";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** primary/dark = black 3D with green gradient · ghost/light = white 3D */
export type CtaVariant = "primary" | "dark" | "ghost" | "light";
type Size = "md" | "lg";

const sizes: Record<Size, string> = {
  md: "min-h-11 py-2 px-5 text-[0.9375rem] rounded-[12px]",
  lg: "min-h-14 py-3 px-7 sm:px-8 text-base sm:text-[1.0625rem] rounded-[14px]",
};

export function ctaClasses(variant: CtaVariant = "primary", size: Size = "lg", className?: string) {
  const dark = variant === "primary" || variant === "dark";
  return cn(
    "group inline-flex items-center justify-center gap-3 text-center font-semibold whitespace-normal sm:whitespace-nowrap",
    dark ? "btn-3d" : "btn-3d-light",
    sizes[size],
    className,
  );
}

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: CtaVariant;
  size?: Size;
  className?: string;
  /** Analytics event fired on click. */
  event?: AnalyticsEvent;
  location?: string;
  external?: boolean;
};

export function CtaLink({ href, children, variant = "primary", size = "lg", className, event, location, external }: Props) {
  const onClick = event ? () => track(event, { location }) : undefined;
  const cls = cn(ctaClasses(variant, size, className), event === "consultation_cta_click" && "btn-consultation");
  const content = <span>{children}</span>;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={cls}>
      {content}
    </Link>
  );
}
