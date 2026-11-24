import Image from "next/image";
import { hero } from "@/data/content";
import { site } from "@/lib/site";
import { CtaLink } from "@/components/ui/CtaLink";
import { VslVideo } from "@/components/visuals/VslVideo";

const platforms = [
  {
    "name": "Meta",
    "src": "/images/platforms/meta.webp",
    "width": 110,
    "height": 25
  },
  {
    "name": "Facebook",
    "src": "/images/platforms/facebook.webp",
    "width": 120,
    "height": 24
  },
  {
    "name": "Instagram",
    "src": "/images/platforms/instagram.webp",
    "width": 36,
    "height": 36
  },
  {
    "name": "TikTok Ads",
    "src": "/images/platforms/tiktok-ads.webp",
    "width": 130,
    "height": 26
  },
  {
    "name": "Shopify",
    "src": "/images/platforms/shopify.webp",
    "width": 120,
    "height": 34
  }
];

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-x-clip pt-[118px] pb-16 sm:pt-[150px] sm:pb-20">
      <div className="container-page flex flex-col items-center text-center">
        <span className="rise inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-[0.75rem] font-semibold tracking-[0.14em] text-ink uppercase shadow-[0_10px_30px_-12px_rgb(20_40_30/0.25)] ring-1 ring-line">
          <span className="rounded-full bg-grad-green px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.1em] text-white uppercase shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]">PubMax</span>
          {hero.eyebrow}
        </span>
        <h1 id="hero-title" className="rise font-display mt-7 max-w-[1100px] text-[clamp(2rem,4.3vw,3.75rem)] leading-[1.12] font-semibold tracking-[-0.04em] text-balance text-ink" style={{ animationDelay: "0.05s" }}>
          Vous avez une marque <span className="whitespace-nowrap">e-commerce,</span> mais vous n’arrivez pas à attirer des clients et à <span className="text-grad-green">générer des ventes régulières ?</span>
        </h1>
        <p className="rise mt-6 max-w-[60rem] text-[1.0625rem] leading-relaxed text-balance text-black sm:text-[1.125rem]" style={{ animationDelay: "0.12s" }}>
          {hero.text.split(/(système d'acquisition pour attirer les bons clients|développer votre marque)/).map((part, index) =>
            index % 2 === 1 ? <strong key={index} className="font-bold">{part}</strong> : part
          )}
        </p>

        <div className="rise mt-10 w-full max-w-[860px]" style={{ animationDelay: "0.16s" }}>
          <VslVideo url={hero.vsl.url} title={hero.vsl.title} label={hero.vsl.label} />
        </div>

        <div className="rise mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row" style={{ animationDelay: "0.2s" }}>
          <CtaLink href={site.whatsappUrl} external event="agency_cta_click" location="hero" className="w-full sm:w-auto">
            {hero.primary}
          </CtaLink>
          <CtaLink href={site.routes.consultation} variant="ghost" event="consultation_cta_click" location="hero" className="w-full sm:w-auto">
            {hero.secondary}
          </CtaLink>
        </div>
        <p className="rise mt-7 flex items-center gap-2 text-[0.9375rem] font-medium text-ink" style={{ animationDelay: "0.22s" }}>
          <span className="size-2 rounded-full bg-grad-green" aria-hidden />
          {hero.trust}
        </p>
        <p className="rise mt-1.5 text-[0.875rem] text-muted" style={{ animationDelay: "0.24s" }}>
          {hero.note}
        </p>
        <div className="mt-16 w-full max-w-[960px] border-t border-line pt-8 sm:mt-20" aria-labelledby="platforms-title">
          <p id="platforms-title" className="text-balance text-[0.875rem] font-medium text-ink-2">
            Notre expertise au service de votre croissance sur ces plateformes
          </p>
          <div className="logo-marquee relative mt-10 overflow-hidden sm:mt-12">
            <div className="logo-marquee-track flex w-max items-center">
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center gap-x-14 pr-14 sm:gap-x-20 sm:pr-20">
                  {platforms.map((platform) => (
                    <li key={platform.name} className="flex h-16 shrink-0 items-center justify-center">
                      <Image src={platform.src} alt={copy === 1 ? "" : platform.name} width={platform.width} height={platform.height} style={{ "--logo-w": `${platform.width}px` } as React.CSSProperties} className="h-auto w-[calc(var(--logo-w)*1.2)] max-w-none object-contain sm:w-[calc(var(--logo-w)*1.4)]" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-[linear-gradient(90deg,var(--color-paper),transparent)] sm:w-28" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-[linear-gradient(270deg,var(--color-paper),transparent)] sm:w-28" />
          </div>
        </div>
      </div>
    </section>
  );
}
