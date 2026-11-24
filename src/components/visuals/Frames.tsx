import { cn } from "@/lib/utils";

/** Browser chrome used to present real screenshots. */
export function BrowserFrame({
  children,
  url = "adsmanager.facebook.com",
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  url?: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)]",
        tone === "light" ? "surface" : "surface-dark",
        className,
      )}
    >
      <div className={cn("flex h-10 items-center gap-3 px-4", tone === "light" ? "border-b border-line bg-[#fafaf9]" : "border-b border-white/8")}>
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span
          className={cn(
            "mx-auto truncate rounded-md px-3 py-1 text-[0.6875rem] font-medium",
            tone === "light" ? "bg-paper text-muted" : "bg-white/6 text-white/85",
          )}
        >
          {url}
        </span>
        <span className="w-[42px]" aria-hidden />
      </div>
      {children}
    </div>
  );
}

/** Tiny round icon holder, as in the reference's card headers. */
export function IconBubble({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_6px_14px_-8px_rgb(5_5_5/0.35)]",
        className,
      )}
      aria-hidden
    >
      {children}
    </span>
  );
}

/** Small scope label used on every proof (Agrégé / Historique / Campagne spécifique). */
export function ScopeTag({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide uppercase",
        tone === "light" ? "bg-paper text-ink-2 ring-1 ring-line" : "bg-white/10 text-white",
      )}
    >
      <span className="size-1.5 rounded-full bg-green" aria-hidden />
      {children}
    </span>
  );
}
