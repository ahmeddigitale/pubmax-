/**
 * Analytics integration points (GTM, GA4, Meta Pixel). Scripts are only loaded after consent
 * (see components/layout/Analytics.tsx). `track` is safe to call before consent: it no-ops on
 * missing globals, and GTM receives events through dataLayer once loaded.
 */
export type AnalyticsEvent =
  | "agency_cta_click"
  | "consultation_cta_click"
  | "agency_lead_submitted"
  | "consultation_booking_started"
  | "consultation_payment_success"
  | "ebook_lead_submitted";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Meta Pixel standard events mapped from our event names. */
const pixelMap: Partial<Record<AnalyticsEvent, string>> = {
  agency_lead_submitted: "Lead",
  consultation_booking_started: "InitiateCheckout",
  consultation_payment_success: "Purchase",
  ebook_lead_submitted: "CompleteRegistration",
};

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  window.gtag?.("event", event, params);
  const pixelEvent = pixelMap[event];
  if (pixelEvent && window.fbq) {
    const { event_id, ...rest } = params;
    window.fbq("track", pixelEvent, rest, event_id ? { eventID: String(event_id) } : undefined);
  }
}

/**
 * Fire a conversion at most once per id (e.g. per Stripe session or per lead submission),
 * even across reloads of a confirmation page.
 */
export function trackOnce(event: AnalyticsEvent, id: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const key = `pm_evt_${event}_${id}`;
  try {
    if (window.localStorage.getItem(key)) return;
    window.localStorage.setItem(key, "1");
  } catch {
    // Storage blocked: still fire, de-duplication then relies on event_id.
  }
  track(event, { ...params, event_id: id });
}
