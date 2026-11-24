import { ArrowUpRight, Check, Shuffle, Workflow, X } from "lucide-react";
import { transformation as t } from "@/data/content";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const dimensions = ["Positionnement", "Messages", "Créatives", "Pilotage", "Croissance"];

export function TransformationSection() {
  return (
    <section aria-labelledby="transfo-title" className="section-y relative overflow-hidden bg-canvas">
      <div className="container-page relative">
        <SectionHeading id="transfo-title" eyebrow={t.eyebrow} title={t.title} titleClassName="max-w-[42ch] mx-auto" />
        <div className="comparison-grid mx-auto mt-14 grid max-w-[1100px] grid-cols-1 gap-5 sm:mt-16 md:grid-cols-2 md:gap-6">
          <Reveal as="article" className="comparison-card comparison-before">
            <div className="comparison-header">
              <div className="flex items-center justify-between gap-4">
                <span className="comparison-label">{t.before.label}</span>
                <Shuffle className="size-6" strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className="mt-6 text-[1.75rem] leading-tight font-semibold tracking-tight sm:text-[2rem]">{t.before.caption}</h3>
              <p className="comparison-intro mt-3 text-[0.9375rem]">Des actions isolées, sans vision d’ensemble.</p>
            </div>
            <ul className="comparison-list">
              {t.before.items.map((item, i) => (
                <li key={item}>
                  <span className="comparison-status"><X className="size-3.5" aria-hidden /></span>
                  <div><p className="comparison-dimension">{dimensions[i]}</p><p className="comparison-detail">{item}</p></div>
                </li>
              ))}
            </ul>
            <div className="comparison-footer">Des décisions dans l’incertitude</div>
          </Reveal>
          <Reveal as="article" delay={0.08} className="comparison-card comparison-after">
            <div className="comparison-header">
              <div className="flex items-center justify-between gap-4">
                <span className="comparison-label">{t.after.label}</span>
                <Workflow className="size-6" strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className="mt-6 text-[1.75rem] leading-tight font-semibold tracking-tight sm:text-[2rem]">Une acquisition <span className="title-accent title-accent-dark">pilotée</span></h3>
              <p className="comparison-intro mt-3 text-[0.9375rem]">Une stratégie claire. Des leviers qui travaillent ensemble.</p>
            </div>
            <ul className="comparison-list">
              {t.after.items.map((item, i) => (
                <li key={item}>
                  <span className="comparison-status"><Check className="size-3.5" aria-hidden /></span>
                  <div><p className="comparison-dimension">{dimensions[i]}</p><p className="comparison-detail">{item}</p></div>
                </li>
              ))}
            </ul>
            <div className="comparison-footer flex items-center justify-between gap-4">Des décisions appuyées sur les données <ArrowUpRight className="size-5 shrink-0" aria-hidden /></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
