import { consultation } from "@/data/content";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ConsultationCard } from "@/components/booking/ConsultationCard";

const steps = ["Choisissez un créneau", "Présentez votre marque", "Réglez 600 DH en ligne", "Recevez la confirmation"];

export function ConsultationSection() {
  return (
    <section aria-labelledby="consult-title" className="consultation-refined section-y relative overflow-hidden bg-canvas">
      <div className="container-page relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_480px] lg:gap-20">
        <Reveal>
          <Eyebrow>{consultation.eyebrow}</Eyebrow>
          <h2 id="consult-title" className="font-display type-h2 mt-6">{consultation.title}</h2>
          <p className="type-lead mt-6 max-w-xl text-ink-2">{consultation.text}</p>
          <ol className="mt-10 grid max-w-xl gap-3 sm:grid-cols-2">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 rounded-[16px] bg-white p-4 shadow-[var(--shadow-card)] ring-1 ring-line">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-grad-green text-[0.8125rem] font-semibold text-white tabular-nums shadow-[0_8px_16px_-8px_rgb(18_137_74/0.8)]">{i + 1}</span>
                <span className="text-[0.9375rem] font-medium">{s}</span>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.08}>
          <ConsultationCard />
        </Reveal>
      </div>
    </section>
  );
}
