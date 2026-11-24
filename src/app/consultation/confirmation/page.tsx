import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, AlertTriangle, XCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getCheckoutSession, integrationStatus } from "@/lib/booking";
import { PaymentSuccessTracker } from "@/components/booking/PaymentSuccessTracker";
import { AutoRefresh } from "@/components/booking/AutoRefresh";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Confirmation de réservation", robots: { index: false, follow: false } };

type State =
  | { kind: "confirmed"; sessionId: string; when: string; email: string }
  | { kind: "finalising" }
  | { kind: "attention"; email: string }
  | { kind: "unpaid" }
  | { kind: "invalid"; reason: string };

async function resolve(sessionId?: string): Promise<State> {
  if (!sessionId) return { kind: "invalid", reason: "Aucune session de paiement fournie." };
  if (!integrationStatus().payment) return { kind: "invalid", reason: "Paiement non configuré sur ce serveur." };
  try {
    const s = await getCheckoutSession(sessionId);
    if (s.metadata.kind !== "consultation") return { kind: "invalid", reason: "Session inconnue." };
    if (s.payment_status !== "paid") return { kind: "unpaid" };
    const pi = typeof s.payment_intent === "object" ? s.payment_intent : null;
    const status = pi?.metadata.booking_status;
    if (status === "confirmed") {
      const when = new Date(s.metadata.slotStart).toLocaleString("fr-FR", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: s.metadata.timezone || "Africa/Casablanca",
      });
      return { kind: "confirmed", sessionId: s.id, when, email: s.metadata.email };
    }
    if (status === "needs_attention") return { kind: "attention", email: s.metadata.email };
    return { kind: "finalising" };
  } catch {
    return { kind: "invalid", reason: "Impossible de vérifier cette session." };
  }
}

export default async function ConfirmationPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const state = await resolve(session_id);

  const view = {
    confirmed: {
      icon: <CheckCircle2 className="size-7" aria-hidden />,
      tone: "bg-green",
      title: "Votre consultation est confirmée.",
      text: state.kind === "confirmed" ? `Rendez-vous le ${state.when}. L'invitation et le lien de visioconférence ont été envoyés à ${state.email}.` : "",
    },
    finalising: {
      icon: <Clock className="size-7" aria-hidden />,
      tone: "bg-ink",
      title: "Paiement reçu — réservation en cours de finalisation.",
      text: "Nous enregistrons votre créneau. Cette page se met à jour automatiquement dans quelques secondes.",
    },
    attention: {
      icon: <AlertTriangle className="size-7" aria-hidden />,
      tone: "bg-orange",
      title: "Paiement reçu — nous finalisons votre créneau manuellement.",
      text: state.kind === "attention" ? `Le créneau n'a pas pu être enregistré automatiquement. L'équipe vous contacte à ${state.email} pour le confirmer ou vous rembourser.` : "",
    },
    unpaid: {
      icon: <XCircle className="size-7" aria-hidden />,
      tone: "bg-terracotta",
      title: "Le paiement n'a pas été validé.",
      text: "Aucune réservation n'a été confirmée. Vous pouvez reprendre la réservation à tout moment.",
    },
    invalid: {
      icon: <XCircle className="size-7" aria-hidden />,
      tone: "bg-stone",
      title: "Réservation introuvable.",
      text: state.kind === "invalid" ? `${state.reason} Aucune réservation n'est confirmée sur cette page.` : "",
    },
  }[state.kind];

  return (
    <>
      <Navbar />
      <main id="contenu" className="container-page flex min-h-[80vh] items-center justify-center pt-32 pb-24">
        <div className="surface w-full max-w-2xl rounded-[var(--radius-xl)] p-8 sm:p-12" role="status">
          <span className={`flex size-14 items-center justify-center rounded-full text-white ${view.tone}`}>{view.icon}</span>
          <h1 className="font-display type-h3 mt-7">{view.title}</h1>
          <p className="mt-4 text-ink-2">{view.text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {(state.kind === "unpaid" || state.kind === "invalid") && (
              <Link href={site.routes.consultation} className="inline-flex h-12 items-center rounded-[12px] bg-green px-5 font-semibold text-white">
                Reprendre la réservation
              </Link>
            )}
            <Link href="/" className="inline-flex h-12 items-center rounded-[12px] border border-line bg-white px-5 font-semibold">
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
        {state.kind === "confirmed" && <PaymentSuccessTracker sessionId={state.sessionId} value={site.consultation.priceMad} />}
        {state.kind === "finalising" && <AutoRefresh />}
      </main>
      <Footer />
    </>
  );
}
