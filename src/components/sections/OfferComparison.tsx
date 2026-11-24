import Image from "next/image";
import { Check } from "lucide-react";
import { offers } from "@/data/content";
import { site } from "@/lib/site";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";

export function OfferComparison() {
  const a = offers.agency;
  const c = offers.consultation;
  return (
    <section id="offres" aria-labelledby="offres-title" className="section-y pt-10! sm:pt-14!">
      <div className="container-page">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-3 rounded-full bg-white py-1.5 pr-4 pl-1.5 shadow-[0_10px_30px_-12px_rgb(20_40_30/0.25)] ring-1 ring-line">
            <span className="flex -space-x-1.5" aria-hidden>
              <span className="size-6 rounded-full bg-[linear-gradient(135deg,#6a3fc4,#3a1585)] ring-2 ring-white" />
              <span className="size-6 rounded-full bg-[linear-gradient(135deg,#fcd34d,#f2b705)] ring-2 ring-white" />
            </span>
            <span className="text-[0.75rem] font-semibold tracking-[0.14em] text-ink uppercase">{offers.eyebrow}</span>
          </span>
        </div>
        <SectionHeading id="offres-title" title={offers.title} className="mt-6" titleClassName="max-w-[22ch]" />
        <div className="mx-auto mt-14 grid max-w-[1080px] gap-4 sm:mt-16 lg:grid-cols-2 lg:gap-5">
          {/* Agency */}
          <Reveal as="article" className="surface relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] p-7 sm:p-9">
            <div className="relative flex items-center justify-between">
              <span className="rounded-full bg-[linear-gradient(135deg,#6a3fc4,#3a1585)] px-3.5 py-1.5 text-[0.75rem] font-semibold tracking-[0.01em] text-white shadow-[0_6px_16px_-6px_rgb(74_31_160/0.6)]">{a.tag}</span>
              <span className="flex size-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#6a3fc4,#3a1585)] text-white" aria-hidden>
                <LogoMark className="size-5" />
              </span>
            </div>
            <div className="relative mt-8 flex w-fit flex-col items-center">
            <h3 className="font-display type-h3">{a.title}</h3>
            <Image
              src="/images/brand/google-digital-marketing-ecommerce-certificate.webp"
              alt="Google Digital Marketing & E-commerce Certificate — Certificate of Completion"
              width={480}
              height={403}
              sizes="160px"
              className="mt-6 h-auto w-[160px]"
            />
            </div>
            <p className="relative mt-4 text-ink-2">{a.text}</p>
            <p className="relative mt-8 text-[0.75rem] font-semibold tracking-[0.14em] text-muted uppercase">{a.includesLabel}</p>
            <ul className="relative mt-4 space-y-3">
              {a.includes.map((i) => (
                <li key={i} className="flex items-center gap-3 text-[0.9375rem] font-medium">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#6a3fc4,#3a1585)] text-white"><Check className="size-3" aria-hidden /></span>
                  {i}
                </li>
              ))}
            </ul>
            <div className="relative mt-auto pt-10">
              <div className="flex flex-col gap-1.5 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <p className="text-[0.875rem] text-muted">{a.target}</p>
                <p className="shrink-0 text-[0.875rem] font-semibold sm:text-right">{a.priceLabel}</p>
              </div>
              <CtaLink href={site.routes.agency} event="agency_cta_click" location="offers" className="offer-btn offer-btn-purple mt-6 w-full">
                {a.cta}
              </CtaLink>
            </div>
          </Reveal>

          {/* Consultation */}
          <Reveal as="article" delay={0.08} className="relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] bg-night p-7 text-white sm:p-9">
            <div className="relative flex items-center justify-between">
              <span className="rounded-full bg-[linear-gradient(135deg,#fcd34d,#f2b705)] px-3.5 py-1.5 text-[0.75rem] font-semibold tracking-[0.01em] text-[#2a1d00] shadow-[0_6px_16px_-6px_rgb(242_183_5/0.55)]">{c.tag}</span>
              <span aria-hidden className="flex size-11 items-center justify-center rounded-full bg-grad-green text-[0.875rem] font-bold text-white ring-2 ring-white/20">
                AA
              </span>
            </div>
            <h3 className="font-display type-h3 relative mt-8">{c.title}</h3>
            <div className="relative mt-5 flex flex-wrap items-center gap-4">
              <Image src="/images/brand/meta-media-buying-certification.webp" alt="Meta Certified Media Buying Professional" width={120} height={120} className="h-auto w-[104px] sm:w-[120px]" />
              <Image src="/images/brand/meta-creative-strategy-certification.webp" alt="Meta Certified Creative Strategy Professional" width={120} height={120} className="h-auto w-[104px] sm:w-[120px]" />
            </div>
            <p className="relative mt-4 flex items-baseline gap-1.5">
              <span className="font-display text-[3rem] leading-none">{c.price}</span>
              <span className="text-white">{c.unit}</span>
            </p>
            <p className="relative mt-4 text-white">{c.text}</p>
            <p className="relative mt-8 text-[0.75rem] font-semibold tracking-[0.14em] text-white/85 uppercase">{c.includesLabel}</p>
            <ul className="relative mt-4 flex flex-wrap gap-2">
              {c.includes.map((i) => (
                <li key={i} className="rounded-full bg-white/8 px-3 py-1.5 text-[0.8125rem] font-medium text-white ring-1 ring-white/10">
                  {i}
                </li>
              ))}
            </ul>
            <div className="relative mt-auto pt-10">
              <p className="border-t border-white/10 pt-6 text-[0.875rem] text-white/85">{c.target}</p>
              <CtaLink href={site.routes.consultation} variant="light" event="consultation_cta_click" location="offers" className="offer-btn offer-btn-yellow mt-6 w-full">
                {c.cta}
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
