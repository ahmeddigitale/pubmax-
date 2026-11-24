import { checkoutSchema } from "@/lib/validation";
import { createCheckoutSession, integrationStatus, isSlotAvailable, IntegrationError } from "@/lib/booking";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

/** POST /api/booking/checkout — validates the booking, re-checks the slot, then opens a Stripe Checkout (600 MAD). */
export async function POST(req: Request) {
  if (!rateLimit(`checkout:${clientIp(req)}`, 8)) {
    return Response.json({ ok: false, error: "Trop de tentatives. Réessayez dans quelques minutes." }, { status: 429 });
  }
  const status = integrationStatus();
  if (!status.scheduling || !status.payment) {
    return Response.json(
      {
        ok: false,
        code: "not_configured",
        status,
        error:
          process.env.NODE_ENV === "production"
            ? "La réservation en ligne est momentanément indisponible."
            : "Mode développement : agenda et/ou paiement non configurés (voir .env.example). Aucun paiement ni réservation n'a été créé.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Certaines informations sont invalides.", fields: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const d = parsed.data;
  try {
    if (!(await isSlotAvailable(d.slotStart))) {
      return Response.json({ ok: false, code: "slot_taken", error: "Ce créneau vient d'être réservé. Choisissez-en un autre." }, { status: 409 });
    }
    const origin = process.env.NODE_ENV === "production" ? site.url : new URL(req.url).origin;
    const session = await createCheckoutSession(
      {
        fullName: d.fullName,
        email: d.email,
        phone: d.phone,
        brandName: d.brandName,
        website: d.website,
        challenge: d.challenge,
        slotStart: d.slotStart,
        timezone: d.timezone,
      },
      origin,
    );
    return Response.json({ ok: true, url: session.url, sessionId: session.id });
  } catch (e) {
    console.error("[checkout]", e);
    const code = e instanceof IntegrationError ? e.status : 500;
    return Response.json({ ok: false, error: "Le paiement n'a pas pu être initialisé. Merci de réessayer." }, { status: code });
  }
}
