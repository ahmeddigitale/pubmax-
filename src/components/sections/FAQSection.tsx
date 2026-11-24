"use client";

import { TitleAccent } from "@/components/ui/TitleAccent";
import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { faq } from "@/data/content";
import { site } from "@/lib/site";
import { Eyebrow } from "@/components/ui/Section";
import { CtaLink } from "@/components/ui/CtaLink";

export function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y relative overflow-clip bg-canvas">
      <div className="container-page relative grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <h2 id="faq-title" className="font-display type-h2 mt-6"><TitleAccent text={faq.title} /></h2>
          <div className="relative mt-10 hidden overflow-hidden rounded-[var(--radius-lg)] bg-grad-green-deep p-6 text-white lg:block">
            <div aria-hidden className="absolute -top-16 -right-16 size-44 rounded-full bg-[radial-gradient(circle,rgb(126_224_143/0.4),transparent_65%)]" />
            <p className="relative font-semibold">Une autre question ?</p>
            <p className="relative mt-1 text-[0.9375rem] text-white">Décrivez votre situation, nous revenons vers vous avec les prochaines étapes.</p>
            <CtaLink href={site.routes.agency} variant="light" size="md" event="agency_cta_click" location="faq" className="mt-5">
              Demander un audit gratuit
            </CtaLink>
          </div>
        </div>
        <Accordion.Root type="single" collapsible className="space-y-3">
          {faq.items.map((item, i) => (
            <Accordion.Item key={item.q} value={`q${i}`} className="rounded-[18px] bg-white px-5 ring-1 ring-line transition-shadow data-[state=open]:shadow-[0_24px_50px_-30px_rgb(18_137_74/0.55)] data-[state=open]:ring-green/30 sm:px-6">
              <Accordion.Header asChild>
                <h3>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-5 text-left text-[1.0625rem] font-semibold tracking-tight sm:text-[1.125rem]">
                    {item.q}
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-line transition-transform duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-grad-green group-data-[state=open]:text-white group-data-[state=open]:ring-0">
                      <Plus className="size-4" aria-hidden />
                    </span>
                  </Accordion.Trigger>
                </h3>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[collapse_0.25s_ease-out] data-[state=open]:animate-[expand_0.3s_ease-out]">
                <p className="max-w-[40rem] pb-5 text-ink-2">{item.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
