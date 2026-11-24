import { TitleAccent } from "@/components/ui/TitleAccent";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, tone = "light", className }: { children: React.ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 text-[0.75rem] font-semibold tracking-[0.14em] uppercase",
        tone === "dark"
          ? "bg-white/[0.07] text-white ring-1 ring-white/15 shadow-[0_10px_30px_-14px_rgb(0_0_0/0.6)] backdrop-blur-sm"
          : "bg-white text-ink ring-1 ring-line shadow-[0_10px_30px_-12px_rgb(20_40_30/0.25)]",
        className,
      )}
    >
      <span className="relative flex size-6 items-center justify-center rounded-full bg-grad-green shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]" aria-hidden>
        <span className="size-2 rounded-full bg-white" />
      </span>
      {children}
    </span>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  tone?: "light" | "dark";
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
  textClassName?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, text, tone = "light", align = "center", className, titleClassName, textClassName, id }: HeadingProps) {
  return (
    <div className={cn("flex flex-col gap-6", align === "center" ? "mx-auto items-center text-center" : "items-start", "section-heading max-w-[68rem]", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={cn("font-display type-h2", tone === "dark" ? "text-white" : "text-ink", titleClassName)}>
        <TitleAccent text={title} dark={tone === "dark"} />
      </h2>
      {text && (
        <p className={cn("type-lead max-w-[40rem]", tone === "dark" ? "text-white" : "text-ink-2", textClassName)}>{text}</p>
      )}
    </div>
  );
}
