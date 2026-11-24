import { randomUUID } from "node:crypto";
import { leadSchema, budgetOptions } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { isLeadEmailConfigured, sendLeadEmail } from "@/lib/lead-email";

/**
 * Agency lead endpoint. Validates server-side, then e-mails the lead (Resend → LEAD_NOTIFY_EMAIL)
 * and/or forwards it to the CRM webhook configured in LEAD_WEBHOOK_URL. The URL/secret never reach the client.
 */
export async function POST(req: Request) {
  if (!rateLimit(`lead:${clientIp(req)}`)) {
    return Response.json({ ok: false, error: "Trop de demandes. Réessayez dans quelques minutes." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot filled → pretend success to bots without forwarding anything.
    if ((body as { company?: string })?.company) return Response.json({ ok: true, delivered: false });
    return Response.json(
      { ok: false, error: "Certains champs sont invalides.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const lead = parsed.data;
  const id = randomUUID();
  const payload = {
    id,
    type: "agency_lead",
    source: "pubmax-landing",
    submittedAt: new Date().toISOString(),
    fullName: lead.fullName,
    brandName: lead.brandName,
    website: lead.website,
    phone: lead.phone,
    email: lead.email,
    budget: budgetOptions.find((b) => b.value === lead.budget)?.label ?? "Non communiqué",
    challenge: lead.challenge,
    consent: true,
  };

  const url = process.env.LEAD_WEBHOOK_URL;
  const emailOn = isLeadEmailConfigured();

  if (!url && !emailOn) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead] DEVELOPMENT — no RESEND_API_KEY/LEAD_NOTIFY_EMAIL nor LEAD_WEBHOOK_URL, lead not forwarded:", payload);
      return Response.json({ ok: true, delivered: false, mode: "development", id });
    }
    console.error("[lead] no delivery channel configured in production (e-mail or webhook)");
    return Response.json(
      { ok: false, error: "Le formulaire est momentanément indisponible. Merci de réessayer plus tard." },
      { status: 503 },
    );
  }

  const tasks: Promise<unknown>[] = [];
  if (emailOn) tasks.push(sendLeadEmail(payload));
  if (url) {
    tasks.push(
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.LEAD_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.LEAD_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      }).then((res) => {
        if (!res.ok) throw new Error(`CRM responded ${res.status}`);
      }),
    );
  }

  const results = await Promise.allSettled(tasks);
  results.forEach((r) => r.status === "rejected" && console.error("[lead] delivery failed", r.reason));
  // The lead is kept as long as at least one channel (e-mail or CRM) received it.
  if (!results.some((r) => r.status === "fulfilled")) {
    return Response.json(
      { ok: false, error: "Votre demande n'a pas pu être transmise. Merci de réessayer dans un instant." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, delivered: true, id });
}
