"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { system } from "@/data/content";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const photos = {
  position: "01-positionnement",
  messaging: "02-messaging",
  creative: "03-creative-strategy",
  ads: "04-meta-ads",
  scale: "05-optimization-scaling",
} as const;

export function AcquisitionSystem() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = system.stages[active];

  const onKey = (e: React.KeyboardEvent) => {
    const n = system.stages.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      tabs.current[next]?.focus();
    }
  };

  return (
    <section id="systeme" aria-labelledby="systeme-title" className="section-y">
      <div className="container-page">
        <h2 id="systeme-title" className="sr-only">{system.eyebrow}</h2>
        <Reveal className="relative">
          {/* Connector line (desktop) */}
          <svg aria-hidden className="pointer-events-none absolute top-[38px] right-[10%] left-[10%] hidden h-2 w-[80%] lg:block" preserveAspectRatio="none" viewBox="0 0 100 2">
            <line x1="0" y1="1" x2="100" y2="1" stroke="#050505" strokeOpacity="0.12" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <line className="flow-dash" x1="0" y1="1" x2={(active / 4) * 100} y2="1" stroke="#12894A" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>

          <div role="tablist" aria-label="Étapes du système PubMax" aria-orientation="horizontal" onKeyDown={onKey} className="relative grid grid-cols-1 gap-2 lg:grid-cols-5 lg:gap-4">
            {/* Vertical connector (mobile) */}
            <span aria-hidden className="absolute top-6 bottom-6 left-[27px] w-px bg-ink/12 lg:hidden" />
            {system.stages.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.key}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${s.key}`}
                  aria-selected={on}
                  aria-controls={`panel-${s.key}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative flex items-center gap-4 rounded-[18px] p-2 text-left transition-colors lg:flex-col lg:items-center lg:p-0 lg:text-center",
                    on ? "bg-white shadow-[var(--shadow-card)] lg:bg-transparent lg:shadow-none" : "hover:bg-white/60 lg:hover:bg-transparent",
                  )}
                >
                  <span
                    className={cn(
                      "relative z-10 flex size-[40px] shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-semibold tabular-nums transition-all duration-300 lg:size-[76px] lg:text-base",
                      on
                        ? "bg-green text-white shadow-[var(--shadow-green)]"
                        : i < active
                          ? "bg-ink text-white"
                          : "border border-line bg-white text-ink-2 group-hover:border-ink/25",
                    )}
                  >
                    {s.n}
                  </span>
                  <span className="lg:mt-4">
                    <span className={cn("block text-[1rem] font-semibold tracking-tight lg:text-[1.0625rem]", on ? "text-ink" : "text-ink-2")}>{s.title}</span>
                    <span className="hidden text-[0.8125rem] text-muted lg:mt-1 lg:block">{s.outputs[0]}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`panel-${stage.key}`}
            aria-labelledby={`tab-${stage.key}`}
            className="surface mt-6 overflow-hidden rounded-[var(--radius-xl)] p-3 sm:p-4 lg:mt-12"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={stage.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_1.05fr] md:gap-10"
              >
                <div className="p-3 sm:p-6 lg:p-8">
                  <p className="eyebrow text-green">Étape {stage.n} / 05</p>
                  <h3 className="font-display type-h3 mt-3">{stage.title}</h3>
                  <p className="mt-4 max-w-md text-ink-2">{stage.text}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Livrables de l'étape">
                    {stage.outputs.map((o) => (
                      <li key={o} className="rounded-full bg-paper px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink ring-1 ring-line">
                        {o}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActive((active + 1) % system.stages.length)}
                      className="inline-flex h-11 items-center gap-2 rounded-[12px] bg-ink px-5 text-[0.875rem] font-semibold text-white transition-colors hover:bg-[#1c1c1c]"
                    >
                      {active === system.stages.length - 1 ? "Revenir au début" : `Étape suivante : ${system.stages[active + 1].title}`}
                    </button>
                  </div>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                  <Image
                    src={`/images/services/${photos[stage.key]}.webp`}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
