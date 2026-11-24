import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(8, "Indiquez un numéro valide (avec indicatif si possible).")
  .max(24, "Numéro trop long.")
  .regex(/^[+()\d\s.-]+$/, "Utilisez uniquement des chiffres, espaces et « + ».");

const website = z
  .string()
  .trim()
  .min(4, "Indiquez l'adresse de votre site.")
  .max(200)
  .transform((v) => (/^https?:\/\//i.test(v) ? v : `https://${v}`))
  .refine((v) => {
    try {
      const u = new URL(v);
      return u.hostname.includes(".");
    } catch {
      return false;
    }
  }, "Adresse de site invalide.");

export const budgetOptions = [
  { value: "", label: "Je préfère ne pas répondre" },
  { value: "none", label: "Je ne fais pas encore de publicité" },
  { value: "lt5k", label: "Moins de 5 000 DH / mois" },
  { value: "5-15k", label: "5 000 – 15 000 DH / mois" },
  { value: "15-30k", label: "15 000 – 30 000 DH / mois" },
  { value: "gt30k", label: "Plus de 30 000 DH / mois" },
] as const;

export const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Indiquez votre nom complet.").max(120),
  brandName: z.string().trim().min(1, "Indiquez le nom de votre marque.").max(120),
  website,
  phone,
  email: z.string().trim().toLowerCase().email("Adresse e-mail invalide.").max(160),
  budget: z.enum(["", "none", "lt5k", "5-15k", "15-30k", "gt30k"]).optional().default(""),
  challenge: z
    .string()
    .trim()
    .min(20, "Décrivez votre situation en quelques phrases (20 caractères minimum).")
    .max(2000, "2 000 caractères maximum."),
  consent: z.boolean().refine((v) => v, "Votre accord est nécessaire pour être recontacté."),
  /** Honeypot — must stay empty. */
  company: z.string().max(0).optional().default(""),
});
export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

export const bookingDetailsSchema = z.object({
  fullName: z.string().trim().min(2, "Indiquez votre nom complet.").max(120),
  email: z.string().trim().toLowerCase().email("Adresse e-mail invalide.").max(160),
  phone,
  brandName: z.string().trim().min(1, "Indiquez le nom de votre marque.").max(120),
  website,
  challenge: z
    .string()
    .trim()
    .min(20, "Décrivez votre problématique principale (20 caractères minimum).")
    .max(450, "450 caractères maximum."),
  consent: z.boolean().refine((v) => v, "Votre accord est nécessaire pour réserver."),
});
export type BookingDetailsInput = z.input<typeof bookingDetailsSchema>;

export const checkoutSchema = bookingDetailsSchema.extend({
  /** ISO start time of a slot returned by /api/booking/availability */
  slotStart: z.iso.datetime({ offset: true }),
  timezone: z.string().min(1).max(64),
});
export type CheckoutInput = z.input<typeof checkoutSchema>;

export const ebookSchema = z.object({
  firstName: z.string().trim().min(2, "Indiquez votre prénom.").max(80),
  email: z.string().trim().toLowerCase().email("Adresse e-mail invalide.").max(160),
  consent: z.boolean().refine((v) => v, "Votre accord est nécessaire pour recevoir le guide."),
  /** Honeypot — must stay empty. */
  company: z.string().max(0).optional().default(""),
});
