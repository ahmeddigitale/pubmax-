import { Check, Compass, Info, PenTool, TrendingUp } from "lucide-react";
import { services } from "@/data/content";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";

const photos = {
  strategy: "06-strategie-acquisition",
  creative: "07-strategie-creative",
  performance: "08-performance-scaling",
};
const icons = { strategy: Compass, creative: PenTool, performance: TrendingUp };

export function ServicesSection() {
  return (
    <section id="systeme" aria-labelledby="services-title" className="section-y relative">
      <div className="container-page relative">
        <SectionHeading id="services-title" eyebrow={services.eyebrow} title={services.title} text={services.text} />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-3">
          {services.groups.map((g, i) => {
            const Icon = icons[g.visual];
            return (
              <Reveal
                as="article"
                key={g.letter}
                delay={i * 0.07}
                className={`service-card service-card--${g.visual} group relative flex flex-col overflow-hidden rounded-[28px]`}
              >
                <div className="service-card-photo relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={`/images/services/${photos[g.visual]}.webp`}
                    alt=""
                    fill
                    sizes="(max-width: 1023px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                  />
                  <div aria-hidden className={`absolute inset-x-0 bottom-0 h-[80%] ${g.visual === "creative" ? "bg-[linear-gradient(to_top,rgb(242_183_5/0.6),rgb(242_183_5/0.3)_45%,transparent)]" : "bg-[linear-gradient(to_top,rgb(21_128_61/0.6),rgb(21_128_61/0.3)_45%,transparent)]"}`} />
                </div>
                <div className="service-card-body relative flex flex-1 flex-col px-7 pb-7 pt-8">
                  <span className="service-card-icon absolute -top-7 right-6 flex size-14 items-center justify-center rounded-[18px]">
                    <Icon className="size-6" strokeWidth={1.6} aria-hidden />
                  </span>
                  <h3 className="service-card-title mt-1 max-w-[15ch] text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.035em]">{g.title}</h3>
                  <ul className="service-card-list mt-6 border-t pt-3">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-center gap-3 py-2.5 text-[0.9375rem]">
                        <span className="service-card-check flex size-5 shrink-0 items-center justify-center rounded-full">
                          <Check className="size-3" aria-hidden />
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mx-auto mt-10 flex max-w-3xl items-center gap-4 rounded-[22px] border-2 border-[#f2b705] bg-[linear-gradient(120deg,#ffe98a_0%,#ffd84a_50%,#fcc419_100%)] px-5 py-4 shadow-[0_18px_40px_-22px_rgb(214_158_0/0.8)] sm:px-6 sm:py-5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-[#2a1d00] text-[#ffd84a]">
            <Info className="size-5" strokeWidth={2} aria-hidden />
          </span>
          <p className="text-left text-[0.9375rem] leading-relaxed font-semibold text-[#2a1d00] sm:text-[1rem]">{services.scope}</p>
        </div>
      </div>
    </section>
  );
}
