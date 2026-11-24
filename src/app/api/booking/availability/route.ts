import { getAvailability, integrationStatus, IntegrationError } from "@/lib/booking";

export const dynamic = "force-dynamic";

/** GET /api/booking/availability?from=ISO — real open slots for the 7 days starting at `from`. */
export async function GET(req: Request) {
  const status = integrationStatus();
  if (!status.scheduling) {
    return Response.json({ configured: false, slots: [], status });
  }
  const fromParam = new URL(req.url).searchParams.get("from");
  const from = fromParam ? new Date(fromParam) : new Date();
  if (Number.isNaN(from.getTime())) return Response.json({ error: "Paramètre « from » invalide." }, { status: 400 });
  const to = new Date(from.getTime() + 7 * 24 * 3600_000);
  try {
    const slots = await getAvailability(from, to);
    return Response.json({ configured: true, slots, status }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("[availability]", e);
    const code = e instanceof IntegrationError ? e.status : 500;
    return Response.json({ configured: true, slots: [], error: "Impossible de charger les créneaux pour le moment." }, { status: code });
  }
}
