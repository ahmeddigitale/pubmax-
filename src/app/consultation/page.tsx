import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingInterface } from "@/components/booking/BookingInterface";
import { ConsultationCard } from "@/components/booking/ConsultationCard";
import { Eyebrow } from "@/components/ui/Section";
import { offers } from "@/data/content";

export const metadata: Metadata = {
  title: "Consultation stratégique avec Ahmed Amine — 600 DH",
  description:
    "Réservez une séance individuelle de 60 minutes avec Ahmed Amine Ssi Tayeb pour analyser votre marque, vos campagnes et vos prochaines décisions stratégiques. 600 MAD.",
  alternates: { canonical: "/consultation" },
};

export default async function ConsultationPage({ searchParams }: { searchParams: Promise<{ annule?: string }> }) {
  const { annule } = await searchParams;
  return (
    <>
      <Navbar />
      <main id="contenu" className="relative overflow-x-clip pt-32 pb-24 sm:pt-40">
        <div aria-hidden className="glow-warm absolute inset-x-0 top-0 -z-10 h-[560px] opacity-50" />
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Consultation individuelle · 60 min · 600 DH</Eyebrow>
            <h1 className="font-display type-h2 mt-6">Consultation stratégique avec Ahmed.</h1>
            <p className="type-lead mx-auto mt-5 max-w-2xl text-ink-2">{offers.consultation.text}</p>
          </div>

          <div className="mt-14 grid grid-cols-1 items-start gap-6 lg:grid-cols-[420px_1fr] lg:gap-8">
            <aside className="lg:sticky lg:top-28">
              <ConsultationCard withCta={false} />
              <div className="mt-4 rounded-[18px] bg-white/70 p-5 ring-1 ring-line">
                <p className="text-[0.75rem] font-semibold tracking-[0.14em] text-muted uppercase">Sujets possibles</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {offers.consultation.includes.map((t) => (
                    <li key={t} className="rounded-full bg-paper px-3 py-1.5 text-[0.8125rem] font-medium ring-1 ring-line">{t}</li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.8125rem] text-muted">
                  La consultation n&apos;inclut pas la gestion de vos campagnes. Pour un accompagnement continu, demandez un audit
                  PubMax.
                </p>
              </div>
            </aside>
            <BookingInterface cancelled={annule === "1"} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
