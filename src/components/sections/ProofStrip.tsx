import { proofStrip } from "@/data/content";

export function ProofStrip() {
  return (
    <section aria-label="Résultats agrégés" className="container-page pb-[var(--section-y)]">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-10">
        <p className="max-w-[17rem] text-center text-[0.9375rem] font-medium text-ink lg:text-left">{proofStrip.label}</p>
        <dl className="grid w-full grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 lg:w-auto lg:gap-x-0">
          {proofStrip.stats.map((s, i) => (
            <div key={s.label} className={`text-center lg:px-9 lg:text-left ${i > 0 ? "lg:border-l lg:border-line" : ""}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-[2.1rem] leading-none tracking-tight text-ink sm:text-[2.4rem]">{s.value}</span>
                <span className="mt-2 block text-[0.8125rem] text-muted">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-[0.75rem] text-muted lg:mx-0 lg:text-left">{proofStrip.footnote}</p>
    </section>
  );
}
