import { cn } from "@/lib/utils";

/** PubMax mark (vector redraw of the official logo) + wordmark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={cn("size-7", className)}>
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M32 4h36l28 28v36L68 96H32L4 68V32L32 4Zm18 10c3 20 14 31 36 36-22 5-33 16-36 36-3-20-14-31-36-36 22-5 33-16 36-36Z"
      />
      <g fill="currentColor">
        <rect x="47.5" y="20" width="5" height="14" rx="2.5" />
        <rect x="47.5" y="66" width="5" height="14" rx="2.5" />
        <rect x="20" y="47.5" width="14" height="5" rx="2.5" />
        <rect x="66" y="47.5" width="14" height="5" rx="2.5" />
      </g>
    </svg>
  );
}

export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-sans text-[1.3rem] font-bold tracking-[-0.03em]",
        tone === "light" ? "text-white" : "text-ink",
        className,
      )}
    >
      <LogoMark />
      Pubmax
    </span>
  );
}
