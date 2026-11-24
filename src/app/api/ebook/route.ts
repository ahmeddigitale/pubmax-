import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ebookSchema } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const LOCAL_PDF = "/guides/guide-acquisition-ecommerce.pdf";

/** Download link: EBOOK_FILE_URL, else the PDF in public/guides if present, else null (→ online guide). */
function downloadUrl() {
  if (process.env.EBOOK_FILE_URL) return process.env.EBOOK_FILE_URL;
  return existsSync(join(process.cwd(), "public", LOCAL_PDF)) ? LOCAL_PDF : null;
}

export async function POST(req: Request) {
  if (!rateLimit(`ebook:${clientIp(req)}`, 6)) {
    return Response.json({ ok: false, error: "Trop de demandes. Réessayez dans quelques minutes." }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }
  const parsed = ebookSchema.safeParse(body);
  if (!parsed.success) {
    if ((body as { company?: string })?.company) return Response.json({ ok: true, delivered: false, downloadUrl: null });
    return Response.json({ ok: false, error: "Certains champs sont invalides.", fields: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const id = randomUUID();
  const payload = {
    id,
    type: "ebook_download",
    source: "pubmax-landing",
    submittedAt: new Date().toISOString(),
    firstName: parsed.data.firstName,
    email: parsed.data.email,
    consent: true,
  };

  const url = process.env.EBOOK_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;
  let delivered = false;
  if (url) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.LEAD_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.LEAD_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`CRM responded ${res.status}`);
      delivered = true;
    } catch (e) {
      console.error("[ebook] forwarding failed", e);
      return Response.json({ ok: false, error: "Votre demande n'a pas pu être enregistrée. Merci de réessayer." }, { status: 502 });
    }
  } else if (process.env.NODE_ENV === "production") {
    console.error("[ebook] no webhook configured in production");
    return Response.json({ ok: false, error: "Le téléchargement est momentanément indisponible." }, { status: 503 });
  } else {
    console.info("[ebook] DEVELOPMENT — no webhook configured, request not forwarded:", payload);
  }

  return Response.json({ ok: true, delivered, id, downloadUrl: downloadUrl() });
}
