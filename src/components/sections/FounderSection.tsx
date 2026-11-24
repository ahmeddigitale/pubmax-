import { TitleAccent } from "@/components/ui/TitleAccent";
import Image from "next/image";
import { founder } from "@/data/content";
import { assets } from "@/data/assets";
import { site } from "@/lib/site";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";

export function FounderSection() {
  return (
    <section id="ahmed" aria-labelledby="ahmed-title" className="founder-refined px-3 sm:px-5">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[var(--radius-2xl)] bg-sand">
        <div className="container-page relative grid grid-cols-1 items-center gap-12 py-[clamp(48px,6vw,88px)] lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Portrait */}
          <Reveal className="relative mx-auto w-full max-w-[520px]">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] bg-[#d9cbb8] shadow-[var(--shadow-float)]">
                <Image
                  src={assets.ahmedCar.src}
                  alt={assets.ahmedCar.alt}
                  fill
                  sizes="(min-width: 1024px) 520px, 92vw"
                  className="object-cover object-[62%_30%]"
                />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-[55%] bg-[linear-gradient(to_top,rgb(21_128_61/0.85),rgb(21_128_61/0.4)_40%,transparent)]" />
                <figcaption className="absolute bottom-5 left-5 text-white">
                  <span className="block text-[1.0625rem] font-semibold">{founder.name}</span>
                  <span className="block text-[0.875rem] text-white">{founder.role}</span>
                </figcaption>
              </div>
            </figure>
          </Reveal>

          {/* Story */}
          <Reveal delay={0.08} className="min-w-0">
            <h2 id="ahmed-title" className="font-display type-h2"><TitleAccent text={founder.title} dark /></h2>
            <p className="mt-6 text-[1.25rem] leading-relaxed font-medium text-white">{founder.subtitle}</p>
            <div className="mt-6 space-y-4 border-l-2 border-[#22c55e]/60 pl-5 text-[1.0625rem] leading-relaxed text-ink-2">
              {founder.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-10">
              <CtaLink href={site.routes.consultation} variant="light" event="consultation_cta_click" location="founder">
                {founder.consultationCta}
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
