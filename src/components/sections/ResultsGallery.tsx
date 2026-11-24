"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Eye, Maximize2, ShoppingBag, Target, X } from "lucide-react";
import { results, type ResultItem } from "@/data/content";
import { assets } from "@/data/assets";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BrowserFrame, ScopeTag } from "@/components/visuals/Frames";

const statStyles = [
  { Icon: ShoppingBag, tile: "bg-[linear-gradient(145deg,#22c55e,#0f7a3d)] text-white", bar: "bg-[linear-gradient(90deg,#22c55e,#0f7a3d)]" },
  { Icon: Eye, tile: "bg-[linear-gradient(135deg,#6a3fc4,#3a1585)] text-white", bar: "bg-[linear-gradient(90deg,#6a3fc4,#3a1585)]" },
  { Icon: Target, tile: "bg-[linear-gradient(145deg,#fcd34d,#f2b705)] text-[#2a1d00]", bar: "bg-[linear-gradient(90deg,#fcd34d,#f2b705)]" },
];

const all: ResultItem[] = [results.featured, ...results.gallery];

/** Thumbnail focal points: keep the key figures visible in the cropped preview. */
const focus: Partial<Record<ResultItem["asset"], string>> = {
  resultRoas: "50% 38%",
  resultCampaigns: "50% 0%",
  result45: "62% 100%",
  result301: "40% 100%",
  result75: "50% 20%",
  result63: "50% 30%",
};

function Caption({ item }: { item: ResultItem }) {
  return (
    <div className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <ScopeTag>{item.scope}</ScopeTag>
        <p className="mt-2.5 text-[0.9375rem] font-semibold text-ink">{item.title}</p>
        <p className="mt-0.5 text-[0.8125rem] text-muted">{item.detail}</p>
      </div>
      <span className="hidden items-center gap-1.5 text-[0.8125rem] font-medium text-ink-2 sm:inline-flex">
        <Maximize2 className="size-3.5" aria-hidden /> Agrandir
      </span>
    </div>
  );
}

export function ResultsGallery() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const go = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + all.length) % all.length)), []);
  const current = index !== null ? all[index] : null;
  const a = current ? assets[current.asset] : null;

  return (
    <section id="resultats" aria-labelledby="resultats-title" className="section-y">
      <div className="container-page">
        <SectionHeading id="resultats-title" eyebrow={results.eyebrow} title={results.title} text={results.text} />

        <dl className="mx-auto mt-12 grid max-w-[860px] grid-cols-3 gap-3 sm:mt-14 sm:gap-4">
          {results.headline.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              className="group relative flex flex-col items-center overflow-hidden rounded-[22px] bg-white px-3 pt-6 pb-5 text-center ring-1 ring-line transition-transform duration-300 hover:-translate-y-1 sm:px-6 sm:pt-7 sm:pb-6"
            >
              <span aria-hidden className={`relative flex size-10 items-center justify-center rounded-[13px] sm:size-12 sm:rounded-[15px] ${statStyles[i % 3].tile}`}>
                {(() => { const Icon = statStyles[i % 3].Icon; return <Icon className="size-5 sm:size-[22px]" strokeWidth={2} />; })()}
              </span>
              <dt className="sr-only">{s.label}</dt>
              <dd className="relative mt-4 sm:mt-5">
                <span className="block font-display text-[1.6rem] leading-none font-semibold tracking-[-0.03em] text-ink sm:text-[2.6rem]">{s.value}</span>
                <span className="mt-2 block text-[0.8125rem] font-semibold text-ink-2 sm:text-[0.9375rem]">{s.label}</span>
                <span className="mt-3 hidden rounded-full bg-paper px-2.5 py-1 text-[0.6875rem] font-medium text-muted ring-1 ring-line sm:inline-block">{s.scope}</span>
              </dd>
              <span aria-hidden className={`absolute inset-x-0 bottom-0 h-1 ${statStyles[i % 3].bar}`} />
            </Reveal>
          ))}
        </dl>

        <div className="mx-auto mt-8 max-w-[1040px]">
          {/* Featured aggregate screenshot */}
          <Reveal>
            <figure aria-label={results.featured.title}>
              <BrowserFrame>
                <div className="rail overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setIndex(0)}
                    className="relative block w-full min-w-[720px] cursor-zoom-in"
                    aria-label={`Agrandir : ${results.featured.title}`}
                  >
                    <Image
                      src={assets.resultAggregate.src}
                      alt={assets.resultAggregate.alt}
                      width={assets.resultAggregate.width}
                      height={assets.resultAggregate.height}
                      quality={90}
                      sizes="(min-width: 1080px) 1040px, 100vw"
                      className="h-auto w-full"
                    />
                  </button>
                </div>
                <Caption item={results.featured} />
              </BrowserFrame>
            </figure>
            <p className="mt-2 text-center text-[0.75rem] text-muted sm:hidden">Faites défiler la capture horizontalement →</p>
          </Reveal>

          {/* Proof grid */}
          <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.gallery.map((item, i) => {
              const img = assets[item.asset];
              return (
                <Reveal as="li" key={item.asset} delay={(i % 3) * 0.06}>
                  <figure className="group flex h-full flex-col overflow-hidden rounded-[18px] bg-white ring-1 ring-line transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgb(18_137_74/0.5)]">
                    <button
                      type="button"
                      onClick={() => setIndex(all.indexOf(item))}
                      className="relative block h-[190px] w-full cursor-zoom-in overflow-hidden bg-night"
                      aria-label={`Agrandir : ${item.title}`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        quality={90}
                        sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
                        className={`${item.asset.startsWith("resultStore") ? "object-contain bg-white" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.03]`}
                        style={{ objectPosition: focus[item.asset] ?? "50% 0%" }}
                      />
                      <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[0.6875rem] font-semibold text-ink backdrop-blur">
                        <Maximize2 className="size-3" aria-hidden /> Agrandir
                      </span>
                    </button>
                    <figcaption className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
                      <ScopeTag>{item.scope}</ScopeTag>
                      <p className="mt-2 text-[0.875rem] font-semibold text-ink">{item.title}</p>
                      <p className="mt-0.5 text-[0.8125rem] text-muted">{item.detail}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-[0.8125rem] leading-relaxed text-muted">{results.disclaimer}</p>
      </div>

      <Dialog.Root open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] bg-ink/85 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed inset-0 z-[71] flex flex-col p-3 outline-none sm:p-6"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
          >
            {current && a && (
              <>
                <div className="flex items-start justify-between gap-4 text-white">
                  <div>
                    <Dialog.Title className="text-[1rem] font-semibold">{current.title}</Dialog.Title>
                    <Dialog.Description className="mt-0.5 text-[0.8125rem] text-white">
                      {current.scope} · {current.detail}
                    </Dialog.Description>
                  </div>
                  <Dialog.Close className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Fermer">
                    <X className="size-5" aria-hidden />
                  </Dialog.Close>
                </div>
                <div className="relative mt-4 flex min-h-0 flex-1 items-center justify-center overflow-auto">
                  <Image
                    key={a.src}
                    src={a.src}
                    alt={a.alt}
                    width={a.width}
                    height={a.height}
                    quality={90}
                    sizes="100vw"
                    className="h-auto max-h-full w-auto max-w-full rounded-[12px] object-contain"
                  />
                </div>
                <div className="mt-4 flex items-center justify-center gap-3 text-white">
                  <button type="button" onClick={() => go(-1)} className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Capture précédente">
                    <ChevronLeft className="size-5" aria-hidden />
                  </button>
                  <span className="min-w-16 text-center text-[0.8125rem] text-white tabular-nums">
                    {(index ?? 0) + 1} / {all.length}
                  </span>
                  <button type="button" onClick={() => go(1)} className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Capture suivante">
                    <ChevronRight className="size-5" aria-hidden />
                  </button>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
