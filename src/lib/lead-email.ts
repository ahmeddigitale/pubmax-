/**
 * Sends an "new audit request" notification e-mail through the Resend API (https://resend.com).
 * No SDK needed — a single HTTPS call. Server only: RESEND_API_KEY must never reach the browser.
 *
 * Deliverability (Gmail inbox, not spam):
 *  - verify your domain in Resend (SPF + DKIM DNS records) and send from an address on it;
 *  - until then, "onboarding@resend.dev" works but can only deliver to the e-mail of your Resend account;
 *  - the visitor's address is set as Reply-To, so "Répondre" in Gmail answers the prospect directly.
 */

export type LeadEmailPayload = {
  id: string;
  submittedAt: string;
  fullName: string;
  brandName: string;
  website: string;
  phone: string;
  email: string;
  budget: string;
  challenge: string;
};

export function isLeadEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL);
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Header fields can't contain line breaks (header injection). */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function sendLeadEmail(lead: LeadEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) throw new Error("RESEND_API_KEY or LEAD_NOTIFY_EMAIL missing");

  const from = process.env.LEAD_FROM_EMAIL || "PubMax <onboarding@resend.dev>";
  const date = new Date(lead.submittedAt).toLocaleString("fr-MA", { timeZone: "Africa/Casablanca" });
  const whatsapp = `https://wa.me/${lead.phone.replace(/[^\d]/g, "")}`;

  const rows: [string, string][] = [
    ["Nom complet", lead.fullName],
    ["Marque", lead.brandName],
    ["Site web", lead.website],
    ["Téléphone / WhatsApp", lead.phone],
    ["E-mail", lead.email],
    ["Budget pub mensuel", lead.budget],
  ];

  const text = [
    `Nouvelle demande d'audit gratuit — ${date}`,
    "",
    ...rows.map(([k, v]) => `${k} : ${v}`),
    "",
    "Principal défi actuel :",
    lead.challenge,
    "",
    `WhatsApp : ${whatsapp}`,
    `Réf. ${lead.id}`,
  ].join("\n");

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#1a1a1a;line-height:1.5">
<h2 style="margin:0 0 4px">Nouvelle demande d'audit gratuit</h2>
<p style="margin:0 0 16px;color:#666">${escapeHtml(date)}</p>
<table cellpadding="6" style="border-collapse:collapse">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="color:#666;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`,
  )
  .join("\n")}
</table>
<h3 style="margin:20px 0 6px">Principal défi actuel</h3>
<p style="margin:0;white-space:pre-wrap">${escapeHtml(lead.challenge)}</p>
<p style="margin:20px 0 0"><a href="${escapeHtml(whatsapp)}">Contacter sur WhatsApp</a> · <a href="mailto:${escapeHtml(lead.email)}">Répondre par e-mail</a></p>
<p style="margin:16px 0 0;color:#999;font-size:12px">Réf. ${escapeHtml(lead.id)}</p>
</body></html>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      reply_to: lead.email,
      subject: oneLine(`Demande d'audit — ${lead.brandName} (${lead.fullName})`),
      text,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}
