import Image from "next/image";
import { ScanSearch, Layers3, ChartNoAxesCombined, Check } from "lucide-react";
import { assets } from "@/data/assets";
import { processSteps as steps } from "@/data/content";
import { SectionHeading } from "@/components/ui/Section";

export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="section-y">
      <div className="container-page">
        <SectionHeading id="process-title" eyebrow={steps.eyebrow} title={steps.title} />
        <div className="mt-8 flex justify-center">
          <Image
            src={assets.satisfactionSeal.src}
            alt={assets.satisfactionSeal.alt}
            width={assets.satisfactionSeal.width}
            height={assets.satisfactionSeal.height}
            sizes="140px"
            className="h-auto w-[112px] -rotate-6 drop-shadow-[0_14px_22px_rgb(120_80_0/0.35)] sm:w-[140px]"
          />
        </div>
        <ol className="process-cards mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {steps.steps.map((s, i) => {
            const Icon = [ScanSearch, Layers3, ChartNoAxesCombined][i];
            return (
              <li key={s.n} className="process-card relative flex flex-col overflow-hidden rounded-[28px] p-7 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="process-icon flex size-14 items-center justify-center rounded-[17px]">
                    <Icon className="size-6" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="process-number font-display text-[3.25rem] leading-none tracking-[-0.05em]" aria-label={`Étape ${s.n}`}>{s.n}</span>
                </div>
                <h3 className="mt-8 text-[1.5rem] leading-tight font-semibold tracking-tight">{s.title}</h3>
                <p className="process-description mt-4 text-[1rem] leading-relaxed">{s.text}</p>
                <ul className="process-deliverables mt-7 space-y-3 border-t pt-6">
                  {s.tags.map((t) => (
                    <li key={t} className="flex items-center gap-3 text-[0.875rem] font-medium">
                      <span className="process-check flex size-5 shrink-0 items-center justify-center rounded-full"><Check className="size-3" aria-hidden /></span>
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
