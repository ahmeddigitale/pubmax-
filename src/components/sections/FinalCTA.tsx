import Image from "next/image";
import { TitleAccent } from "@/components/ui/TitleAccent";
import { finalCta } from "@/data/content";
import { site } from "@/lib/site";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section aria-labelledby="final-title" className="px-3 py-[var(--section-y)] sm:px-5">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[var(--radius-2xl)] bg-white px-5 py-[clamp(80px,10vw,150px)] ring-1 ring-line">
        <div aria-hidden className="glow-warm absolute inset-x-[10%] top-[30%] bottom-[-30%] opacity-80" />
        <Reveal className="relative mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <h2 id="final-title" className="font-display type-h2 text-ink"><TitleAccent text={finalCta.title} /></h2>
          <p className="type-lead mt-6 max-w-[38rem] text-ink-2">{finalCta.text}</p>
          <Image
            src="/images/cta/campagnes-en-perte.webp"
            alt="Produits cosmétiques entourés d'indicateurs publicitaires en baisse : ROAS 0,20, CPA +78 %, ventes Shopify -62 %"
            width={1600}
            height={900}
            sizes="(min-width: 860px) 416px, 50vw"
            className="mt-10 h-auto w-1/2 rounded-[var(--radius-xl)]"
          />
          <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <CtaLink href={site.whatsappUrl} external event="agency_cta_click" location="final_cta" className="w-full sm:w-auto">
              {finalCta.primary}
            </CtaLink>
            <CtaLink href={site.routes.consultation} variant="ghost" event="consultation_cta_click" location="final_cta" className="w-full sm:w-auto">
              {finalCta.secondary}
            </CtaLink>
          </div>
          <p className="mt-6 text-[0.8125rem] text-muted">Audit gratuit et sans engagement · Consultation confirmée après paiement</p>
        </Reveal>
      </div>
    </section>
  );
}
