import { verifiedTestimonials, testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Renders only verified quotes. With none verified, the section is omitted in production and shows a
 * clearly labelled placeholder in development (see data/testimonials.ts).
 */
export function TestimonialSection() {
  if (verifiedTestimonials.length === 0) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <section aria-label="Témoignages (en attente)" className="container-page pb-[var(--section-y)]">
        <div className="rounded-[var(--radius-xl)] border-2 border-dashed border-orange/60 bg-orange/5 p-8 text-center">
          <p className="eyebrow text-[#9a5f1d]">Développement uniquement · section masquée en production</p>
          <p className="mx-auto mt-3 max-w-2xl text-ink-2">
            Aucun témoignage vérifié n&apos;a été trouvé sur pubmaxagency.com. Ajoutez les citations exactes de{" "}
            {testimonials.map((t) => t.name).join(", ")} dans <code className="font-mono text-[0.875em]">src/data/testimonials.ts</code>{" "}
            avec <code className="font-mono text-[0.875em]">verified: true</code> pour afficher cette section.
          </p>
        </div>
      </section>
    );
  }

  const [lead, ...rest] = verifiedTestimonials;
  return (
    <section aria-labelledby="temoignages-title" className="section-y">
      <div className="container-page">
        <SectionHeading id="temoignages-title" eyebrow="Ils nous ont fait confiance" title="Ce que disent les marques accompagnées." />
        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Reveal as="article" className="surface rounded-[var(--radius-xl)] p-8 sm:p-10">
            <blockquote className="font-display type-h3">« {lead.quote} »</blockquote>
            <p className="mt-8 font-semibold">{lead.name}</p>
            {(lead.role || lead.brand) && <p className="text-[0.875rem] text-muted">{[lead.role, lead.brand].filter(Boolean).join(" · ")}</p>}
          </Reveal>
          <div className="grid gap-4">
            {rest.map((t, i) => (
              <Reveal as="article" key={t.name} delay={i * 0.06} className="surface rounded-[var(--radius-lg)] p-6">
                <blockquote className="text-ink">« {t.quote} »</blockquote>
                <p className="mt-4 text-[0.9375rem] font-semibold">{t.name}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
