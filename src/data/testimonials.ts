/**
 * Client testimonials — ONLY verified quotes.
 *
 * The brief lists Soufiane, Soukaina, Fatim Zahra and Kawtar as names shown on the agency website, but on
 * 2026-11-06 no testimonial text could be found on pubmaxagency.com (home, /a-propos, /contact, /guide). The
 * site itself states: « Nous ne publions ni chiffre estimé, ni témoignage inventé. »
 *
 * To publish a testimonial: paste the client's exact words, set `verified: true`, and (optionally) attach a
 * proof asset key from data/assets.ts. The section stays hidden in production until at least one entry is
 * verified; in development it shows a labelled placeholder.
 */
import type { AssetKey } from "./assets";

export type Testimonial = {
  name: string;
  brand?: string;
  role?: string;
  quote: string | null;
  verified: boolean;
  proof?: AssetKey;
};

export const testimonials: Testimonial[] = [
  { name: "Soufiane", quote: null, verified: false },
  { name: "Soukaina", quote: null, verified: false },
  { name: "Fatim Zahra", quote: null, verified: false },
  { name: "Kawtar", quote: null, verified: false },
];

export const verifiedTestimonials = testimonials.filter(
  (t): t is Testimonial & { quote: string } => t.verified && Boolean(t.quote),
);
