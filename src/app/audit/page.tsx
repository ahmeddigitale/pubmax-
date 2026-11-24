import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AgencyLeadForm } from "@/components/forms/AgencyLeadForm";
import { Eyebrow } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Demander un audit gratuit",
  description:
    "Travaillez avec PubMax : décrivez votre marque et votre acquisition actuelle. Audit gratuit, réponse sous 48 heures ouvrées.",
  alternates: { canonical: "/audit" },
};

const steps = [
  ["Le formulaire", "Votre marque, votre budget média et votre situation en deux minutes."],
  ["Votre créneau", "Juste après l'envoi, vous choisissez votre appel de 30 minutes dans l'agenda."],
  ["L'échange", "Nous cadrons votre projet et identifions le premier levier de votre acquisition."],
];

export default function AuditPage() {
  return (
    <>
      <Navbar />
      <main id="contenu" className="relative overflow-x-clip pt-32 pb-24 sm:pt-40">
        <div aria-hidden className="glow-warm absolute inset-x-0 top-0 -z-10 h-[520px] opacity-50" />
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Travailler avec PubMax</Eyebrow>
            <h1 className="font-display type-h2 mt-6">Demandez votre audit gratuit.</h1>
            <p className="type-lead mt-5 text-ink-2">
              Une marque, un produit qui se vend déjà, une envie de passer un palier ? Présentez-nous votre situation : nous
              identifions les blocages de votre acquisition et les prochaines étapes.
            </p>
            <ol className="mt-10 space-y-3">
              {steps.map(([t, d], i) => (
                <li key={t} className="flex gap-4 rounded-[16px] bg-white/70 p-4 ring-1 ring-line">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-[0.8125rem] font-semibold text-white">{i + 1}</span>
                  <span>
                    <span className="block font-semibold">{t}</span>
                    <span className="block text-[0.9375rem] text-ink-2">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex items-center gap-2 text-[0.875rem] text-muted">
              <Check className="size-4 shrink-0 text-green" aria-hidden /> <span>Vous cherchez plutôt un avis ponctuel ? <Link href="/consultation" className="font-semibold text-ink underline underline-offset-4">La consultation avec Ahmed</Link> est faite pour ça.</span>
            </p>
          </div>
          <div className="surface rounded-[var(--radius-xl)] p-6 sm:p-10">
            <AgencyLeadForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
