"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight, Loader2, Lock, AlertTriangle } from "lucide-react";
import { bookingDetailsSchema } from "@/lib/validation";
import { track } from "@/lib/analytics";
import { site } from "@/lib/site";
import { Field, inputClass, describedBy } from "@/components/forms/Field";
import { cn } from "@/lib/utils";

type Details = z.output<typeof bookingDetailsSchema>;
type DetailsIn = z.input<typeof bookingDetailsSchema>;
type Availability = { configured: boolean; slots: { start: string }[]; error?: string };

const isDev = process.env.NODE_ENV !== "production";
const steps = ["Créneau", "Vos informations", "Paiement"] as const;

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function BookingInterface({ cancelled = false }: { cancelled?: boolean }) {
  const [step, setStep] = useState(0);
  const [weekOffset, setWeekOffset] = useState(0);
  const [data, setData] = useState<Availability | null>(null);
  const [loading, setLoading] = useState(true);
  const [slot, setSlot] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [details, setDetails] = useState<Details | null>(null);
  const [payState, setPayState] = useState<{ busy: boolean; error?: string }>({ busy: false });
  const [timezone, setTimezone] = useState("Africa/Casablanca");
  const mounted = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the visitor's timezone is only known in the browser
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone || "Africa/Casablanca");
  }, []);

  const from = useMemo(() => {
    const d = startOfDay(new Date());
    d.setDate(d.getDate() + weekOffset * 7);
    return d;
  }, [weekOffset]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/booking/availability?from=${encodeURIComponent(from.toISOString())}`, { cache: "no-store" });
      setData((await res.json()) as Availability);
    } catch {
      setData({ configured: true, slots: [], error: "Impossible de charger les créneaux pour le moment." });
    } finally {
      setLoading(false);
    }
  }, [from]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetching availability for the selected week
    void load();
  }, [load]);

  const goTo = (s: number) => setStep(s);

  // Move focus to the new step's heading (skip first render).
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    document.getElementById(`booking-step-${step}`)?.focus();
  }, [step]);

  const fmtDay = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: timezone });
  const fmtTime = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: timezone });
  const fmtFull = new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short", timeZone: timezone });

  const byDay = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const s of data?.slots ?? []) {
      const key = fmtDay.format(new Date(s.start));
      m.set(key, [...(m.get(key) ?? []), s.start]);
    }
    return [...m.entries()];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, timezone]);

  const form = useForm<DetailsIn, unknown, Details>({
    resolver: zodResolver(bookingDetailsSchema),
    defaultValues: { consent: false },
    mode: "onTouched",
  });
  const { register, handleSubmit, formState } = form;
  const e = formState.errors;

  const pay = async () => {
    if (!details) return;
    setPayState({ busy: true });
    if (slot) track("consultation_booking_started", { value: site.consultation.priceMad, currency: "MAD" });
    try {
      const res = await fetch("/api/booking/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...details, slotStart: slot, timezone }),
      });
      const json = (await res.json()) as { ok: boolean; url?: string; error?: string; code?: string };
      if (json.ok && json.url) {
        window.location.assign(json.url);
        return;
      }
      if (json.code === "slot_taken") {
        setSlot(null);
        void load();
        goTo(0);
      }
      setPayState({ busy: false, error: json.error ?? "Le paiement n'a pas pu être initialisé." });
    } catch {
      setPayState({ busy: false, error: "Connexion impossible. Vérifiez votre réseau et réessayez." });
    }
  };

  return (
    <div className="surface rounded-[var(--radius-xl)] p-5 sm:p-8">
      {/* Stepper */}
      <ol className="flex items-center gap-2" aria-label="Étapes de réservation">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2" aria-current={i === step ? "step" : undefined}>
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full text-[0.75rem] font-semibold tabular-nums",
                i < step ? "bg-ink text-white" : i === step ? "bg-green text-white" : "bg-paper text-muted ring-1 ring-line",
              )}
            >
              {i + 1}
            </span>
            <span className={cn("hidden text-[0.8125rem] font-semibold sm:inline", i === step ? "text-ink" : "text-muted")}>{s}</span>
            {i < steps.length - 1 && <span aria-hidden className="h-px flex-1 bg-line" />}
          </li>
        ))}
      </ol>

      {cancelled && step === 0 && (
        <p role="status" className="mt-6 rounded-[12px] bg-paper px-4 py-3 text-[0.9375rem] text-ink-2 ring-1 ring-line">
          Paiement annulé : aucun créneau n&apos;a été réservé et rien n&apos;a été débité.
        </p>
      )}

      {/* STEP 1 — slot */}
      {step === 0 && (
        <section className="mt-8" aria-labelledby="booking-step-0">
          <div className="flex items-center justify-between gap-3">
            <h2 id="booking-step-0" tabIndex={-1} className="text-[1.25rem] font-semibold tracking-tight outline-none">
              Choisissez un créneau
            </h2>
            {data?.configured && (
              <div className="flex gap-1.5">
                <button type="button" disabled={weekOffset === 0} onClick={() => setWeekOffset((w) => w - 1)} className="inline-flex size-10 items-center justify-center rounded-full ring-1 ring-line disabled:opacity-40" aria-label="Semaine précédente">
                  <ChevronLeft className="size-4" aria-hidden />
                </button>
                <button type="button" disabled={weekOffset >= 7} onClick={() => setWeekOffset((w) => w + 1)} className="inline-flex size-10 items-center justify-center rounded-full ring-1 ring-line disabled:opacity-40" aria-label="Semaine suivante">
                  <ChevronRight className="size-4" aria-hidden />
                </button>
              </div>
            )}
          </div>
          <p className="mt-1 text-[0.875rem] text-muted">Horaires affichés dans votre fuseau : {timezone}</p>

          <div className="mt-6 min-h-[220px]" aria-live="polite" aria-busy={loading}>
            {loading ? (
              <div className="flex h-[220px] items-center justify-center text-muted">
                <Loader2 className="size-5 animate-spin" aria-hidden />
                <span className="sr-only">Chargement des créneaux</span>
              </div>
            ) : !data?.configured ? (
              <div className="rounded-[16px] border-2 border-dashed border-orange/60 bg-orange/5 p-6">
                <p className="flex items-center gap-2 font-semibold text-[#7a4a12]">
                  <AlertTriangle className="size-4" aria-hidden />
                  {isDev ? "Mode développement — agenda non connecté" : "La réservation en ligne ouvre très bientôt"}
                </p>
                <p className="mt-2 text-[0.9375rem] text-ink-2">
                  {isDev
                    ? "Aucun créneau n'est affiché tant que CALENDLY_API_TOKEN et CALENDLY_EVENT_TYPE_URI ne sont pas configurés. Les disponibilités ne sont jamais inventées."
                    : "Les créneaux ne sont pas encore disponibles en ligne. Revenez dans quelques jours ou suivez Ahmed sur Instagram pour être informé."}
                </p>
                {isDev ? (
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(true);
                      goTo(1);
                    }}
                    className="mt-5 inline-flex h-11 items-center rounded-[12px] bg-ink px-5 text-[0.875rem] font-semibold text-white"
                  >
                    Continuer sans créneau (aperçu développement)
                  </button>
                ) : (
                  <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex h-11 items-center rounded-[12px] bg-ink px-5 text-[0.875rem] font-semibold text-white">
                    Suivre Ahmed sur Instagram
                  </a>
                )}
              </div>
            ) : data.error ? (
              <p role="alert" className="rounded-[12px] bg-terracotta/10 px-4 py-3 text-[#7d3a24]">
                {data.error}{" "}
                <button type="button" onClick={() => void load()} className="font-semibold underline">Réessayer</button>
              </p>
            ) : byDay.length === 0 ? (
              <div className="flex h-[220px] flex-col items-center justify-center gap-2 rounded-[16px] bg-paper text-center">
                <CalendarDays className="size-6 text-muted" aria-hidden />
                <p className="font-semibold">Aucun créneau disponible cette semaine.</p>
                <button type="button" onClick={() => setWeekOffset((w) => w + 1)} className="text-[0.9375rem] font-semibold text-green underline-offset-4 hover:underline">
                  Voir la semaine suivante
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {byDay.map(([day, times]) => (
                  <fieldset key={day}>
                    <legend className="text-[0.875rem] font-semibold capitalize text-ink">{day}</legend>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {times.map((t) => (
                        <label key={t} className="cursor-pointer">
                          <input type="radio" name="slot" value={t} checked={slot === t} onChange={() => setSlot(t)} className="peer sr-only" />
                          <span className="inline-flex h-11 min-w-[84px] items-center justify-center rounded-[12px] px-4 text-[0.9375rem] font-semibold ring-1 ring-line transition-colors peer-checked:bg-green peer-checked:text-white peer-checked:ring-green peer-focus-visible:outline-2 peer-focus-visible:outline-green hover:ring-ink/30">
                            {fmtTime.format(new Date(t))}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ))}
              </div>
            )}
          </div>

          {data?.configured && (
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                disabled={!slot}
                onClick={() => goTo(1)}
                className="inline-flex h-12 items-center rounded-[12px] bg-ink px-6 text-[0.9375rem] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continuer
              </button>
            </div>
          )}
        </section>
      )}

      {/* STEP 2 — details */}
      {step === 1 && (
        <section className="mt-8" aria-labelledby="booking-step-1">
          <h2 id="booking-step-1" tabIndex={-1} className="text-[1.25rem] font-semibold tracking-tight outline-none">
            Présentez votre marque
          </h2>
          <p className="mt-1 text-[0.875rem] text-muted">
            {slot ? `Créneau choisi : ${fmtFull.format(new Date(slot))}` : "Aperçu développement — aucun créneau sélectionné"}
          </p>
          <form
            noValidate
            onSubmit={handleSubmit((d) => {
              setDetails(d);
              goTo(2);
            })}
            className="mt-6 grid gap-5 sm:grid-cols-2"
          >
            <Field id="b-fullName" label="Nom complet" error={e.fullName?.message}>
              <input id="b-fullName" autoComplete="name" className={inputClass} aria-invalid={!!e.fullName} aria-describedby={describedBy("b-fullName", e.fullName?.message)} {...register("fullName")} />
            </Field>
            <Field id="b-email" label="E-mail" error={e.email?.message}>
              <input id="b-email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!e.email} aria-describedby={describedBy("b-email", e.email?.message)} {...register("email")} />
            </Field>
            <Field id="b-phone" label="Téléphone / WhatsApp" error={e.phone?.message}>
              <input id="b-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+212 6 00 00 00 00" className={inputClass} aria-invalid={!!e.phone} aria-describedby={describedBy("b-phone", e.phone?.message)} {...register("phone")} />
            </Field>
            <Field id="b-brand" label="Nom de la marque" error={e.brandName?.message}>
              <input id="b-brand" autoComplete="organization" className={inputClass} aria-invalid={!!e.brandName} aria-describedby={describedBy("b-brand", e.brandName?.message)} {...register("brandName")} />
            </Field>
            <Field id="b-website" label="Site web" className="sm:col-span-2" error={e.website?.message}>
              <input id="b-website" type="url" inputMode="url" autoComplete="url" placeholder="votremarque.com" className={inputClass} aria-invalid={!!e.website} aria-describedby={describedBy("b-website", e.website?.message)} {...register("website")} />
            </Field>
            <Field id="b-challenge" label="Votre problématique principale" className="sm:col-span-2" hint="Ce que vous aimeriez avoir clarifié à la fin de la séance." error={e.challenge?.message}>
              <textarea id="b-challenge" rows={4} maxLength={450} className={cn(inputClass, "resize-y")} aria-invalid={!!e.challenge} aria-describedby={describedBy("b-challenge", e.challenge?.message, "hint")} {...register("challenge")} />
            </Field>
            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] text-ink-2">
                <input type="checkbox" className="mt-1 size-5 shrink-0 accent-green" aria-invalid={!!e.consent} aria-describedby={e.consent ? "b-consent-error" : undefined} {...register("consent")} />
                J&apos;accepte que mes informations soient utilisées pour organiser la consultation et être contacté(e) à son sujet.
              </label>
              {e.consent && (
                <p id="b-consent-error" role="alert" className="mt-2 text-[0.8125rem] font-medium text-[#9b4a30]">
                  {e.consent.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between gap-3 sm:col-span-2">
              <button type="button" onClick={() => goTo(0)} className="inline-flex h-12 items-center gap-2 rounded-[12px] px-4 text-[0.9375rem] font-semibold text-ink-2 ring-1 ring-line">
                <ArrowLeft className="size-4" aria-hidden /> Retour
              </button>
              <button type="submit" className="inline-flex h-12 items-center rounded-[12px] bg-ink px-6 text-[0.9375rem] font-semibold text-white">
                Continuer vers le paiement
              </button>
            </div>
          </form>
        </section>
      )}

      {/* STEP 3 — payment */}
      {step === 2 && details && (
        <section className="mt-8" aria-labelledby="booking-step-2">
          <h2 id="booking-step-2" tabIndex={-1} className="text-[1.25rem] font-semibold tracking-tight outline-none">
            Récapitulatif et paiement
          </h2>
          <dl className="mt-6 divide-y divide-line rounded-[16px] bg-paper px-5 ring-1 ring-line">
            {[
              ["Séance", "Consultation stratégique avec Ahmed Amine"],
              ["Durée", "60 minutes · visioconférence"],
              ["Créneau", slot ? fmtFull.format(new Date(slot)) : "— (aperçu développement)"],
              ["Marque", `${details.brandName} · ${details.website.replace(/^https?:\/\//, "")}`],
              ["Contact", `${details.fullName} · ${details.email}`],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-0.5 py-3.5 sm:flex-row sm:justify-between sm:gap-6">
                <dt className="text-[0.875rem] text-muted">{k}</dt>
                <dd className="text-[0.9375rem] font-medium sm:text-right">{v}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between py-4">
              <dt className="font-semibold">Total</dt>
              <dd className="font-display text-[2rem] leading-none">600 DH</dd>
            </div>
          </dl>

          {payState.error && (
            <p role="alert" className="mt-5 rounded-[12px] border border-dashed border-orange bg-orange/8 px-4 py-3 text-[0.9375rem] text-[#7a4a12]">
              {payState.error}
            </p>
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={() => goTo(1)} className="inline-flex h-12 items-center justify-center gap-2 rounded-[12px] px-4 text-[0.9375rem] font-semibold text-ink-2 ring-1 ring-line">
              <ArrowLeft className="size-4" aria-hidden /> Modifier
            </button>
            <button
              type="button"
              onClick={pay}
              disabled={payState.busy || (!slot && !preview)}
              className="btn-3d inline-flex min-h-14 items-center justify-center gap-2 rounded-[14px] px-7 font-semibold"
            >
              {payState.busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Lock className="size-4" aria-hidden />}
              <span>Payer 600 DH et réserver</span>
            </button>
          </div>
          <p className="mt-4 text-[0.8125rem] text-muted">
            Vous êtes redirigé(e) vers une page de paiement sécurisée. Votre séance est confirmée uniquement après validation
            du paiement.
          </p>
        </section>
      )}
    </div>
  );
}
