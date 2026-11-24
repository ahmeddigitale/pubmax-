import {
  createReservation,
  getCheckoutSession,
  notifyOps,
  recordFromMetadata,
  setPaymentIntentMetadata,
  verifyStripeSignature,
} from "@/lib/booking";

/**
 * Stripe webhook. Configure in Stripe → Developers → Webhooks with events:
 *   checkout.session.completed, checkout.session.async_payment_succeeded
 * The reservation is created ONLY here, after Stripe confirms the session is paid.
 */
export async function POST(req: Request) {
  const raw = await req.text();
  let valid = false;
  try {
    valid = verifyStripeSignature(raw, req.headers.get("stripe-signature"));
  } catch (e) {
    console.error("[webhook] not configured", e);
    return new Response("Webhook not configured", { status: 503 });
  }
  if (!valid) return new Response("Invalid signature", { status: 400 });

  const event = JSON.parse(raw) as { type: string; data: { object: { id: string } } };
  if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") {
    return Response.json({ received: true });
  }

  // Re-fetch from Stripe instead of trusting the payload.
  const session = await getCheckoutSession(event.data.object.id);
  if (session.metadata.kind !== "consultation" || session.payment_status !== "paid") {
    return Response.json({ received: true, skipped: "not paid" });
  }
  const pi = typeof session.payment_intent === "object" ? session.payment_intent : null;
  if (!pi) return Response.json({ received: true, skipped: "no payment intent" });

  // Idempotency: Stripe may deliver the same event more than once.
  if (pi.metadata.booking_status === "confirmed") return Response.json({ received: true, duplicate: true });

  const booking = recordFromMetadata(session.metadata);
  try {
    const eventUri = await createReservation(booking);
    await setPaymentIntentMetadata(pi.id, { booking_status: "confirmed", calendly_event: eventUri });
    await notifyOps({ type: "consultation_confirmed", sessionId: session.id, eventUri, ...booking });
  } catch (e) {
    console.error("[webhook] reservation failed after payment", e);
    await setPaymentIntentMetadata(pi.id, { booking_status: "needs_attention" });
    await notifyOps({ type: "consultation_needs_attention", sessionId: session.id, reason: String(e), ...booking });
  }
  return Response.json({ received: true });
}
