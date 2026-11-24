import Image from "next/image";
import { problem } from "@/data/content";
import { assets, type AssetKey } from "@/data/assets";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Visual = (typeof problem.cards)[number]["visual"];

const images: Record<Visual, AssetKey> = {
  cost: "problemCost",
  creatives: "problemCreatives",
  position: "problemPositioning",
  volatile: "problemVolatile",
};

export function ProblemSection() {
  return (
    <section aria-labelledby="probleme-title" className="px-3 sm:px-5">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[var(--radius-2xl)] bg-night py-[clamp(72px,9vw,128px)]">
        <div className="container-page relative">
          <SectionHeading id="probleme-title" tone="dark" eyebrow={problem.eyebrow} title={problem.title} text={problem.text} textClassName="whitespace-pre-line max-w-[52rem]" />

          <ul className="mx-auto mt-14 grid max-w-[980px] gap-4 sm:mt-16 md:grid-cols-2 md:gap-5">
            {problem.cards.map((c, i) => {
              const img = assets[images[c.visual]];
              return (
                <Reveal as="li" key={c.n} delay={i * 0.06} className="group flex flex-col rounded-[var(--radius-lg)] bg-white p-3 shadow-[0_1px_0_rgb(255_255_255/0.6)_inset,0_24px_50px_-28px_rgb(22_163_74/0.55)] ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[14px] bg-grad-green-deep">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 470px, (min-width: 768px) 45vw, 92vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span aria-hidden className="absolute top-2.5 right-2.5 rounded-full bg-black/45 px-2 py-0.5 text-[0.5625rem] tracking-wider text-white uppercase backdrop-blur">
                      Illustration
                    </span>
                  </div>
                  <div className="flex items-start gap-3 px-3 pt-5 pb-4">
                    <span className="mt-0.5 rounded-full bg-grad-green px-2 py-0.5 text-[0.75rem] font-semibold text-white tabular-nums">{c.n}</span>
                    <h3 className="text-[1.0625rem] leading-snug font-semibold text-ink sm:text-[1.125rem]">{c.title}</h3>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <Reveal className="mx-auto mt-16 max-w-[44rem] text-center sm:mt-20">
            <p className="font-display type-h3 text-white/85">
              <span className="title-accent title-accent-dark">{problem.closing[0]}</span> <span className="text-white">{problem.closing[1]}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
