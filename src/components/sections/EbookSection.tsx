"use client";

import Image from "next/image";
import { TitleAccent } from "@/components/ui/TitleAccent";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { BookOpen, Download, ExternalLink, Loader2 } from "lucide-react";
import { ebook } from "@/data/content";
import { ebookSchema } from "@/lib/validation";
import { trackOnce } from "@/lib/analytics";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Field, inputClass, describedBy } from "@/components/forms/Field";

type In = z.input<typeof ebookSchema>;
type Out = z.output<typeof ebookSchema>;
type Done = { downloadUrl: string | null; delivered: boolean };

export function EbookSection() {
  const [done, setDone] = useState<Done | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<In, unknown, Out>({ resolver: zodResolver(ebookSchema), defaultValues: { consent: false, company: "" }, mode: "onTouched" });

  const onSubmit = async (data: Out) => {
    setError(null);
    try {
      const res = await fetch("/api/ebook", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = (await res.json()) as { ok: boolean; delivered?: boolean; id?: string; downloadUrl?: string | null; error?: string };
      if (!res.ok || !json.ok) return setError(json.error ?? "Une erreur est survenue. Merci de réessayer.");
      if (json.delivered && json.id) trackOnce("ebook_lead_submitted", json.id);
      setDone({ downloadUrl: json.downloadUrl ?? null, delivered: Boolean(json.delivered) });
    } catch {
      setError("Connexion impossible. Vérifiez votre réseau et réessayez.");
    }
  };

  return (
    <section id="guide" aria-labelledby="guide-title" className="px-3 sm:px-5">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[var(--radius-2xl)] bg-[linear-gradient(135deg,#eef8f0_0%,#ffffff_45%,#fffaea_100%)] ring-1 ring-line">
        <div className="container-page relative grid grid-cols-1 items-center gap-12 py-[clamp(64px,8vw,112px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="relative">
            <div className="relative mx-auto max-w-[460px] py-10 sm:py-14">
              <div aria-hidden className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_50%_45%,rgb(34_197_94/0.22),rgb(34_197_94/0.06)_45%,transparent_70%)]" />
              <Image
                src="/images/ebook/guide-acquisition-ecommerce.webp"
                alt="Couverture du guide « Le guide de l'acquisition e-commerce » by PubMax"
                width={900}
                height={1313}
                sizes="(min-width: 1024px) 340px, 70vw"
                className="relative mx-auto h-auto w-[min(78%,340px)] drop-shadow-[0_30px_40px_rgb(6_40_26/0.35)]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            <Eyebrow>{ebook.eyebrow}</Eyebrow>
            <h2 id="guide-title" className="font-display type-h2 mt-6">
              <TitleAccent text={ebook.title} />
            </h2>
            <p className="type-lead mt-5 max-w-xl text-ink-2">{ebook.text}</p>
            <ol className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
              {ebook.bullets.map((b, i) => (
                <li key={b} className="flex items-start gap-3 rounded-[16px] bg-white/85 p-4 text-[0.9375rem] leading-snug font-medium text-ink ring-1 ring-line">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-grad-green text-[0.75rem] font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1">{b}</span>
                </li>
              ))}
            </ol>

            <div className="mt-9 max-w-xl rounded-[22px] bg-white p-5 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-6">
              {done ? (
                <div role="status">
                  <p className="flex items-center gap-2 font-semibold">
                    <BookOpen className="size-5 text-green" aria-hidden /> Merci, votre guide est prêt.
                  </p>
                  {!done.delivered && (
                    <p className="mt-3 rounded-[12px] border border-dashed border-orange bg-orange/8 px-3 py-2 text-[0.8125rem] text-[#7a4a12]">
                      Mode développement : aucun CRM configuré (EBOOK_WEBHOOK_URL / LEAD_WEBHOOK_URL).
                    </p>
                  )}
                  <div className="mt-5">
                    {done.downloadUrl ? (
                      <a href={done.downloadUrl} download className="btn-3d inline-flex min-h-12 items-center gap-2 rounded-[12px] px-6 font-semibold">
                        <Download className="size-4" aria-hidden /> <span>Télécharger le PDF</span>
                      </a>
                    ) : (
                      <a href={ebook.onlineUrl} target="_blank" rel="noopener noreferrer" className="btn-3d inline-flex min-h-12 items-center gap-2 rounded-[12px] px-6 font-semibold">
                        <ExternalLink className="size-4" aria-hidden /> <span>Lire le guide en ligne</span>
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="eb-first" label="Prénom" error={errors.firstName?.message}>
                    <input id="eb-first" autoComplete="given-name" className={inputClass} aria-invalid={!!errors.firstName} aria-describedby={describedBy("eb-first", errors.firstName?.message)} {...register("firstName")} />
                  </Field>
                  <Field id="eb-email" label="E-mail" error={errors.email?.message}>
                    <input id="eb-email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} aria-describedby={describedBy("eb-email", errors.email?.message)} {...register("email")} />
                  </Field>
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="eb-company">Société</label>
                    <input id="eb-company" tabIndex={-1} autoComplete="off" {...register("company")} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3 text-[0.875rem] text-ink-2">
                      <input type="checkbox" className="mt-0.5 size-5 shrink-0 accent-green" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "eb-consent-error" : undefined} {...register("consent")} />
                      J&apos;accepte de recevoir le guide et des contenus de PubMax par e-mail (désinscription à tout moment).
                    </label>
                    {errors.consent && (
                      <p id="eb-consent-error" role="alert" className="mt-2 text-[0.8125rem] font-medium text-[#9b4a30]">
                        {errors.consent.message}
                      </p>
                    )}
                  </div>
                  {error && (
                    <p role="alert" className="rounded-[12px] bg-terracotta/10 px-4 py-3 text-[0.875rem] text-[#7d3a24] sm:col-span-2">
                      {error}
                    </p>
                  )}
                  <button type="submit" disabled={isSubmitting} className="btn-3d inline-flex min-h-13 items-center justify-center gap-2 rounded-[14px] px-6 font-semibold sm:col-span-2">
                    {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Download className="size-4" aria-hidden />}
                    <span>{isSubmitting ? "Envoi en cours…" : ebook.cta}</span>
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
