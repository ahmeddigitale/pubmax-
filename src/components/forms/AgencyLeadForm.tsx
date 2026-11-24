"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Loader2 } from "lucide-react";
import { leadSchema, budgetOptions } from "@/lib/validation";
import { trackOnce } from "@/lib/analytics";
import { site } from "@/lib/site";
import { Field, inputClass, describedBy } from "./Field";
import { cn } from "@/lib/utils";

type In = z.input<typeof leadSchema>;
type Out = z.output<typeof leadSchema>;

type Result = { state: "idle" } | { state: "error"; message: string };

export function AgencyLeadForm() {
  const [result, setResult] = useState<Result>({ state: "idle" });
  const [redirecting, setRedirecting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<In, unknown, Out>({
    resolver: zodResolver(leadSchema),
    defaultValues: { budget: "", consent: false, company: "" },
    mode: "onTouched",
  });

  const onSubmit = async (data: Out) => {
    setResult({ state: "idle" });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; delivered?: boolean; id?: string; error?: string };
      if (!res.ok || !json.ok) {
        setResult({ state: "error", message: json.error ?? "Une erreur est survenue. Merci de réessayer." });
        return;
      }
      // Conversion only when the CRM actually received the lead.
      if (json.delivered && json.id) trackOnce("agency_lead_submitted", json.id, { budget: data.budget || "na" });
      setRedirecting(true);
      // After a successful submission the visitor books the 30-min call directly in Calendly.
      window.location.assign(site.agencyCallUrl);
    } catch {
      setResult({ state: "error", message: "Connexion impossible. Vérifiez votre réseau et réessayez." });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2" aria-describedby="lead-form-note">
      <Field id="fullName" label="Nom complet" error={errors.fullName?.message}>
        <input id="fullName" autoComplete="name" className={inputClass} aria-invalid={!!errors.fullName} aria-describedby={describedBy("fullName", errors.fullName?.message)} {...register("fullName")} />
      </Field>
      <Field id="brandName" label="Nom de la marque" error={errors.brandName?.message}>
        <input id="brandName" autoComplete="organization" className={inputClass} aria-invalid={!!errors.brandName} aria-describedby={describedBy("brandName", errors.brandName?.message)} {...register("brandName")} />
      </Field>
      <Field id="website" label="Site web" error={errors.website?.message}>
        <input id="website" type="url" inputMode="url" autoComplete="url" placeholder="votremarque.com" className={inputClass} aria-invalid={!!errors.website} aria-describedby={describedBy("website", errors.website?.message)} {...register("website")} />
      </Field>
      <Field id="phone" label="Téléphone / WhatsApp" error={errors.phone?.message}>
        <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+212 6 00 00 00 00" className={inputClass} aria-invalid={!!errors.phone} aria-describedby={describedBy("phone", errors.phone?.message)} {...register("phone")} />
      </Field>
      <Field id="email" label="E-mail" error={errors.email?.message}>
        <input id="email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} aria-describedby={describedBy("email", errors.email?.message)} {...register("email")} />
      </Field>
      <Field id="budget" label="Budget publicitaire mensuel" optional>
        <select id="budget" className={cn(inputClass, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22%2350545B%22><path d=%22M5.5 7.5 10 12l4.5-4.5%22 stroke=%22%2350545B%22 stroke-width=%221.6%22 fill=%22none%22/></svg>')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-10")} {...register("budget")}>
          {budgetOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>
      <Field id="challenge" label="Votre principal défi actuel" className="sm:col-span-2" hint="Votre offre, vos campagnes actuelles, ce qui bloque." error={errors.challenge?.message}>
        <textarea id="challenge" rows={5} className={cn(inputClass, "resize-y")} aria-invalid={!!errors.challenge} aria-describedby={describedBy("challenge", errors.challenge?.message, "x")} {...register("challenge")} />
      </Field>

      {/* Honeypot (hidden from humans and assistive tech) */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Société</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] text-ink-2">
          <input type="checkbox" className="mt-1 size-5 shrink-0 accent-green" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-error" : undefined} {...register("consent")} />
          J&apos;accepte d&apos;être recontacté(e) par PubMax par e-mail, téléphone ou WhatsApp au sujet de ma demande.
        </label>
        {errors.consent && (
          <p id="consent-error" role="alert" className="mt-2 text-[0.8125rem] font-medium text-[#9b4a30]">
            {errors.consent.message}
          </p>
        )}
      </div>

      {result.state === "error" && (
        <p role="alert" className="rounded-[12px] bg-terracotta/10 px-4 py-3 text-[0.9375rem] text-[#7d3a24] sm:col-span-2">
          {result.message}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="lead-form-note" className="text-[0.8125rem] text-muted">
          Audit gratuit et sans engagement · Vous choisissez ensuite votre créneau d&apos;appel (30 min).
        </p>
        <button
          type="submit"
          disabled={isSubmitting || redirecting}
          className="btn-3d inline-flex min-h-14 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[14px] px-7 font-semibold"
        >
          {(isSubmitting || redirecting) && <Loader2 className="size-4 animate-spin" aria-hidden />}
          <span>{redirecting ? "Ouverture de l'agenda…" : isSubmitting ? "Envoi en cours…" : "Demander mon audit"}</span>
        </button>
      </div>
    </form>
  );
}
