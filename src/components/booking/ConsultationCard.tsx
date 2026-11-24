import Image from "next/image";
import { Check, Clock, Video } from "lucide-react";
import { consultation } from "@/data/content";
import { assets } from "@/data/assets";
import { site } from "@/lib/site";
import { CtaLink } from "@/components/ui/CtaLink";
import { cn } from "@/lib/utils";

/** Premium expert-service card. `withCta={false}` on the booking page itself. */
export function ConsultationCard({ withCta = true, className }: { withCta?: boolean; className?: string }) {
  const c = consultation.card;
  return (
    <div className={cn("consultation-card surface relative overflow-hidden rounded-[var(--radius-xl)] p-3", className)}>
      <div className="relative h-[320px] overflow-hidden rounded-[20px] bg-[#d9cbb8] sm:h-[360px]">
        <Image
          src={assets.ahmedSelfie.src}
          alt={assets.ahmedSelfie.alt}
          fill
          sizes="(min-width: 1024px) 480px, 92vw"
          className="object-cover object-[45%_36%]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3 text-white">
          <div>
            <p className="text-[0.75rem] font-semibold tracking-[0.14em] text-white uppercase">{c.subtitle}</p>
            <p className="font-display mt-1 text-[1.75rem] leading-none">{c.title}</p>
          </div>
        </div>
      </div>
      <div className="px-4 pt-6 pb-4 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 text-[0.8125rem] font-medium text-ink-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 ring-1 ring-line">
              <Clock className="size-3.5" aria-hidden /> {c.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 ring-1 ring-line">
              <Video className="size-3.5" aria-hidden /> {c.format}
            </span>
          </div>
          <p className="flex items-baseline gap-1">
            <span className="font-display text-[2.4rem] leading-none">{c.price}</span>
            <span className="text-[0.875rem] text-muted">/ séance</span>
          </p>
        </div>
        <ul className="mt-6 space-y-3">
          {c.benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 text-[0.9375rem] text-ink">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green text-white">
                <Check className="size-3" aria-hidden />
              </span>
              {b}
            </li>
          ))}
        </ul>
        {withCta && (
          <CtaLink href={site.routes.consultation} event="consultation_cta_click" location="consultation_card" className="mt-7 w-full">
            {c.cta}
          </CtaLink>
        )}
        <p className="mt-4 text-center text-[0.75rem] text-muted">{c.note}</p>
      </div>
    </div>
  );
}
