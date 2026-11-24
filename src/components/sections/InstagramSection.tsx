import { TitleAccent } from "@/components/ui/TitleAccent";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { instagram } from "@/data/content";
import { assets } from "@/data/assets";
import { site } from "@/lib/site";
import { CtaLink } from "@/components/ui/CtaLink";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramGlyph } from "@/components/ui/InstagramGlyph";

export function InstagramSection() {
  return (
    <section aria-labelledby="ig-title" className="section-y pb-10! sm:pb-14!">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[40rem]">
            <Eyebrow>{instagram.eyebrow}</Eyebrow>
            <h2 id="ig-title" className="font-display type-h2 mt-6"><TitleAccent text={instagram.title} /></h2>
            <p className="type-lead mt-5 text-ink-2">{instagram.text}</p>
          </div>
          <div className="flex flex-col items-start gap-2 lg:items-end">
            <CtaLink href={site.instagramUrl} external variant="dark">
              {instagram.cta}
            </CtaLink>
            <span className="text-[0.8125rem] text-muted">{instagram.note}</span>
          </div>
        </div>

        <ul className="rail -mx-[var(--gutter)] mt-12 gap-4 px-[var(--gutter)] pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
          {instagram.posts.map((p, i) => {
            const img = assets[p.asset];
            return (
              <Reveal as="li" key={p.href} delay={i * 0.06} className="w-[72%] shrink-0 sm:w-[44%] md:w-auto">
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="group surface block rounded-[var(--radius-lg)] p-2">
                  <div className="relative aspect-[9/14] overflow-hidden rounded-[16px] bg-night">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 768px) 280px, 72vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[0.6875rem] font-semibold text-ink backdrop-blur">
                      <InstagramGlyph className="size-3.5" /> {p.kind}
                    </span>
                  </div>
                  <div className="px-2.5 pt-4 pb-3">
                    <p className="text-[0.9375rem] leading-snug font-semibold text-ink">{p.title}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[0.8125rem] font-medium text-ink-2 group-hover:text-green">
                      Voir sur Instagram <ArrowUpRight className="size-3.5" aria-hidden />
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
