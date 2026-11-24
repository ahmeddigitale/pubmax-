/** Global, non-secret site settings. Secrets live only in server env vars (see .env.example). */
export const site = {
  name: "PubMax",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://pubmaxagency.com").replace(/\/$/, ""),
  title: "PubMax — Le système d'acquisition des marques e-commerce",
  description:
    "PubMax construit le système d'acquisition des marques e-commerce : positionnement, messaging, stratégie créative et Meta Ads, pilotés par la donnée. Consultation stratégique avec Ahmed Amine : 600 DH / heure.",
  locale: "fr_FR",
  instagramUrl: "https://www.instagram.com/ahmed_amine.digital/",
  instagramHandle: "@ahmed_amine.digital",
  /** "Travailler avec PubMax" buttons open a WhatsApp chat with this pre-filled message. */
  whatsappUrl: `https://wa.me/212638938160?text=${encodeURIComponent("Bonjour PubMax, je souhaite travailler avec vous pour développer l'acquisition de ma marque.")}`,
  /** Free 30-min discovery call, opened after the agency form is submitted. */
  agencyCallUrl:
    "https://calendly.com/ahmeddigitale/30min?utm_source=ig&utm_medium=social&utm_content=link_in_bio&utm_id=97760_v0_s00_e0_tv3",
  routes: {
    agency: "/audit",
    consultation: "https://calendly.com/ahmeddigitale/30min?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAaeiTmsZOzObiRJtakjvuSqiS-3A6r-rhZ7yGDt_xdykAVF_wMGzUXcYHOHhqg_aem_fBckFNmmVXEUAraH_j99WA&utm_id=97760_v0_s00_e0_tv3",
  },
  consultation: {
    durationMinutes: 60,
    priceMad: 600,
    priceLabel: "600 DH",
  },
} as const;
