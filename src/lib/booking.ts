/**
 * Consultation booking integration layer — SERVER ONLY (reads secrets from process.env).
 * Import it only from route handlers and server components.
 *
 * Flow
 *  1. GET  /api/booking/availability  → real open slots from Calendly (never invented).
 *  2. POST /api/booking/checkout      → validates details, re-checks the slot, creates a Stripe Checkout
 *                                       Session (600 MAD) carrying the booking in metadata.
 *  3. POST /api/booking/webhook       → Stripe signature verified; on a *paid* session, books the slot in
 *                                       Calendly (Scheduling API) and stores the result on the PaymentIntent.
 *  4. /consultation/confirmation      → reads the session server-side; shows "confirmée" only when payment is
 *                                       paid AND the reservation was created.
 *
 * Providers are swappable: keep the exported function signatures and replace the implementations
 * (e.g. GoHighLevel calendars, CMI payments).
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { site } from "./site";

export type Slot = { start: string };

export type BookingRecord = {
  fullName: string;
  email: string;
  phone: string;
  brandName: string;
  website: string;
  challenge: string;
  slotStart: string;
  timezone: string;
};

export type BookingStatus = "pending" | "confirmed" | "needs_attention";

const env = {
  calendlyToken: process.env.CALENDLY_API_TOKEN,
  calendlyEventType: process.env.CALENDLY_EVENT_TYPE_URI,
  stripeSecret: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  opsWebhook: process.env.BOOKING_NOTIFY_WEBHOOK_URL,
};

export function integrationStatus() {
  return {
    scheduling: Boolean(env.calendlyToken && env.calendlyEventType),
    payment: Boolean(env.stripeSecret && env.stripeWebhookSecret),
  };
}

export class IntegrationError extends Error {
  constructor(
    message: string,
    public status = 503,
  ) {
    super(message);
  }
}

/* ───────────────────────── Scheduling — Calendly ───────────────────────── */

async function calendly<T>(path: string, init?: RequestInit): Promise<T> {
  if (!env.calendlyToken || !env.calendlyEventType) {
    throw new IntegrationError("Agenda non configuré (CALENDLY_API_TOKEN / CALENDLY_EVENT_TYPE_URI).");
  }
  const res = await fetch(`https://api.calendly.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${env.calendlyToken}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new IntegrationError(`Calendly ${res.status}: ${body.slice(0, 300)}`, 502);
  }
  return (await res.json()) as T;
}

/** Open slots between two instants (Calendly limits a query to 7 days). */
export async function getAvailability(start: Date, end: Date): Promise<Slot[]> {
  const now = Date.now() + 60_000;
  const from = new Date(Math.max(start.getTime(), now));
  const to = new Date(Math.min(end.getTime(), from.getTime() + 7 * 24 * 3600_000));
  if (to <= from) return [];
  const q = new URLSearchParams({
    event_type: env.calendlyEventType ?? "",
    start_time: from.toISOString(),
    end_time: to.toISOString(),
  });
  const data = await calendly<{ collection: { status: string; start_time: string }[] }>(
    `/event_type_available_times?${q}`,
  );
  return data.collection.filter((s) => s.status === "available").map((s) => ({ start: s.start_time }));
}

export async function isSlotAvailable(slotStart: string) {
  const t = new Date(slotStart);
  const slots = await getAvailability(new Date(t.getTime() - 3600_000), new Date(t.getTime() + 3600_000));
  return slots.some((s) => new Date(s.start).getTime() === t.getTime());
}

/** Books the slot through Calendly's Scheduling API. Returns the invitee/event URI. */
export async function createReservation(b: BookingRecord): Promise<string> {
  const data = await calendly<{ resource: { uri: string; event?: string } }>("/invitees", {
    method: "POST",
    body: JSON.stringify({
      event_type: env.calendlyEventType,
      start_time: new Date(b.slotStart).toISOString(),
      invitee: { name: b.fullName, email: b.email, timezone: b.timezone },
      text_reminder_number: b.phone,
      questions_and_answers: [
        { question: "Marque", answer: b.brandName, position: 0 },
        { question: "Site web", answer: b.website, position: 1 },
        { question: "Téléphone / WhatsApp", answer: b.phone, position: 2 },
        { question: "Problématique principale", answer: b.challenge, position: 3 },
      ],
    }),
  });
  return data.resource.event ?? data.resource.uri;
}

/* ───────────────────────── Payment — Stripe Checkout (MAD) ───────────────────────── */

function form(obj: Record<string, unknown>, prefix = "", out = new URLSearchParams()) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === "object") form(v as Record<string, unknown>, key, out);
    else out.append(key, String(v));
  }
  return out;
}

async function stripe<T>(path: string, init: { method?: string; body?: Record<string, unknown> } = {}) {
  if (!env.stripeSecret) throw new IntegrationError("Paiement non configuré (STRIPE_SECRET_KEY).");
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method: init.method ?? "GET",
    headers: {
      Authorization: `Bearer ${env.stripeSecret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: init.body ? form(init.body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new IntegrationError(`Stripe ${res.status}: ${body.slice(0, 300)}`, 502);
  }
  return (await res.json()) as T;
}

/** Stripe metadata values are limited to 500 characters. */
const md = (b: BookingRecord) => ({
  kind: "consultation",
  fullName: b.fullName,
  email: b.email,
  phone: b.phone,
  brandName: b.brandName,
  website: b.website.slice(0, 500),
  challenge: b.challenge.slice(0, 500),
  slotStart: b.slotStart,
  timezone: b.timezone,
  booking_status: "pending" satisfies BookingStatus,
});

export async function createCheckoutSession(b: BookingRecord, origin = site.url) {
  const session = await stripe<{ id: string; url: string }>("/checkout/sessions", {
    method: "POST",
    body: {
      mode: "payment",
      locale: "fr",
      customer_email: b.email,
      client_reference_id: `consultation-${Date.parse(b.slotStart)}`,
      // Short expiry so an unpaid session doesn't keep a slot "in flight" for long (Stripe minimum: 30 min).
      expires_at: Math.floor(Date.now() / 1000) + 31 * 60,
      line_items: {
        0: {
          quantity: 1,
          price_data: {
            currency: "mad",
            unit_amount: site.consultation.priceMad * 100,
            product_data: {
              name: "Consultation stratégique avec Ahmed Amine — 60 minutes",
              description: `Séance individuelle · ${new Date(b.slotStart).toLocaleString("fr-FR", {
                dateStyle: "full",
                timeStyle: "short",
                timeZone: b.timezone,
              })}`,
            },
          },
        },
      },
      metadata: md(b),
      payment_intent_data: { metadata: md(b) },
      success_url: `${origin}/consultation/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/consultation?annule=1`,
    },
  });
  return session;
}

type StripeSession = {
  id: string;
  status: "open" | "complete" | "expired";
  payment_status: "paid" | "unpaid" | "no_payment_required";
  amount_total: number | null;
  currency: string | null;
  metadata: Record<string, string>;
  payment_intent: { id: string; metadata: Record<string, string> } | string | null;
};

export async function getCheckoutSession(id: string) {
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(id)) throw new IntegrationError("Session invalide.", 400);
  return stripe<StripeSession>(`/checkout/sessions/${id}?expand[]=payment_intent`);
}

export async function setPaymentIntentMetadata(id: string, metadata: Record<string, string>) {
  await stripe(`/payment_intents/${id}`, { method: "POST", body: { metadata } });
}

/** Verifies the `Stripe-Signature` header (v1 scheme, 5-minute tolerance). */
export function verifyStripeSignature(rawBody: string, header: string | null) {
  if (!env.stripeWebhookSecret) throw new IntegrationError("STRIPE_WEBHOOK_SECRET manquant.");
  if (!header) return false;
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=") as [string, string]));
  const t = Number(parts.t);
  const signatures = header
    .split(",")
    .filter((p) => p.startsWith("v1="))
    .map((p) => p.slice(3));
  if (!t || !signatures.length || Math.abs(Date.now() / 1000 - t) > 300) return false;
  const expected = createHmac("sha256", env.stripeWebhookSecret).update(`${t}.${rawBody}`).digest("hex");
  return signatures.some((s) => {
    const a = Buffer.from(s, "hex");
    const b = Buffer.from(expected, "hex");
    return a.length === b.length && timingSafeEqual(a, b);
  });
}

/** Optional ops notification (e.g. GoHighLevel inbound webhook, Slack, Make). */
export async function notifyOps(payload: Record<string, unknown>) {
  if (!env.opsWebhook) return;
  try {
    await fetch(env.opsWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("[booking] ops notification failed", e);
  }
}

export function recordFromMetadata(m: Record<string, string>): BookingRecord {
  return {
    fullName: m.fullName,
    email: m.email,
    phone: m.phone,
    brandName: m.brandName,
    website: m.website,
    challenge: m.challenge,
    slotStart: m.slotStart,
    timezone: m.timezone,
  };
}
