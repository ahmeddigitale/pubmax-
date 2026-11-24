/**
 * Asset manifest. Every image on the site is referenced from here.
 * status: "real" = authentic asset stored locally · "missing" = needed, rendered as a labelled placeholder (or not rendered).
 * Masters are produced from raw/ by `npm run images` (scripts/prepare-images.mjs).
 */
export type Asset = {
  src: string;
  width: number;
  height: number;
  alt: string;
  source: string;
  status: "real" | "missing";
};

const pubmax = "pubmaxagency.com (captures publiées par PubMax)";
const ig = "instagram.com/ahmed_amine.digital";

export const assets = {
  ahmedPortrait: {
    src: "/images/ahmed/ahmed-portrait.webp",
    width: 1024,
    height: 1024,
    alt: "Portrait d'Ahmed Amine Ssi Tayeb, fondateur de PubMax, casquette et lunettes, en intérieur.",
    source: `${ig} — photo de profil`,
    status: "real",
  },

  ahmedCar: {
    src: "/images/ahmed/ahmed-voiture.webp",
    width: 1200,
    height: 1600,
    alt: "Ahmed Amine Ssi Tayeb, lunettes de soleil, boit un café appuyé sur la portière de sa voiture.",
    source: "Photo fournie par PubMax",
    status: "real",
  },
  ahmedSelfie: {
    src: "/images/ahmed/ahmed-selfie.webp",
    width: 1200,
    height: 1600,
    alt: "Ahmed Amine Ssi Tayeb souriant, lunettes rondes et pull blanc, en ville au coucher du soleil.",
    source: "Photo fournie par PubMax",
    status: "real",
  },
  satisfactionSeal: {
    src: "/images/brand/satisfaction-guarantee.webp",
    width: 520,
    height: 519,
    alt: "Label doré « Satisfaction Guarantee ».",
    source: "Fourni par PubMax",
    status: "real",
  },

  // ── Problem section illustrations (provided by PubMax) ──
  problemCost: {
    src: "/images/problem/couts-publicitaires.webp",
    width: 960,
    height: 540,
    alt: "Illustration : tableau de bord publicitaire où le coût par achat grimpe de 42,3 % sur le mois.",
    source: "Fourni par PubMax (illustration)",
    status: "real",
  },
  problemCreatives: {
    src: "/images/problem/creatives-instagram.webp",
    width: 960,
    height: 540,
    alt: "Illustration : profil Instagram de marque avec des publications peu vues, annoté « Faible engagement », « Peu de vues » et « -62 % de portée ».",
    source: "Fourni par PubMax (illustration)",
    status: "real",
  },
  problemPositioning: {
    src: "/images/problem/positionnement.webp",
    width: 960,
    height: 520,
    alt: "Illustration : diagramme où « Votre marque » et « Concurrents » se chevauchent, annoté « Pas de différenciation ! ».",
    source: "Fourni par PubMax (illustration)",
    status: "real",
  },
  problemVolatile: {
    src: "/images/problem/campagnes-instables.webp",
    width: 960,
    height: 540,
    alt: "Illustration : performances de campagnes sur une semaine, en hausse puis en forte baisse le vendredi.",
    source: "Fourni par PubMax (illustration)",
    status: "real",
  },

  resultStoreOrders: {
    src: "/images/results/boutique-commandes.webp",
    width: 2356,
    height: 1012,
    alt: "Liste de commandes e-commerce avec montants en MAD et statuts de paiement en attente.",
    source: "Capture fournie par PubMax",
    status: "real",
  },
  resultStoreSales: {
    src: "/images/results/boutique-ventes.webp",
    width: 1200,
    height: 852,
    alt: "Ventes du 13 octobre au 12 novembre 2026 : 2 483 382 MAD, en hausse de 140 %.",
    source: "Capture fournie par PubMax",
    status: "real",
  },
  resultStoreVolume: {
    src: "/images/results/boutique-volume.webp",
    width: 1200,
    height: 852,
    alt: "7 987 commandes du 13 octobre au 12 novembre 2026, en hausse de 123 %.",
    source: "Capture fournie par PubMax",
    status: "real",
  },

  // ── Meta Ads Manager screenshots ──
  resultAggregate: {
    src: "/images/results/meta-agrege-112-ensembles.webp",
    width: 1789,
    height: 490,
    alt: "Capture Meta Ads Manager — résultats de 112 ensembles de publicités : 40 147 achats sur site Web, 1,27 $ par achat, 50 952,67 $ dépensés, 54 098 455 impressions.",
    source: pubmax,
    status: "real",
  },
  result45: {
    src: "/images/results/meta-45-ensembles.webp",
    width: 1806,
    height: 499,
    alt: "Capture Meta Ads Manager — totaux de 45 ensembles de publicités : 2 918 achats sur site Web, 1,55 $ par achat, 4 536,12 $ dépensés, 4 767 071 impressions.",
    source: pubmax,
    status: "real",
  },
  result301: {
    src: "/images/results/meta-301-achats.webp",
    width: 1308,
    height: 499,
    alt: "Capture Meta Ads Manager — totaux : 301 achats sur site Web, 1,70 $ par achat, 511,06 $ dépensés, 533 009 impressions.",
    source: pubmax,
    status: "real",
  },
  resultRoas: {
    src: "/images/results/meta-mobile-5-6k-achats.webp",
    width: 1010,
    height: 1280,
    alt: "Capture Meta Ads Manager mobile — 5,6 K achats sur site Web, 1,49 $ par résultat, 8,44 K$ dépensés, ROAS d'achat de 36,26 sur 30 jours.",
    source: pubmax,
    status: "real",
  },
  resultCampaigns: {
    src: "/images/results/meta-mobile-campagnes.webp",
    width: 770,
    height: 1280,
    alt: "Capture Meta Ads Manager mobile — liste de campagnes : 2,8 K, 2,2 K et 6,8 K achats sur site Web, entre 1,31 $ et 1,49 $ par résultat.",
    source: pubmax,
    status: "real",
  },
  result75: {
    src: "/images/results/meta-mobile-75-achats.webp",
    width: 1242,
    height: 1002,
    alt: "Capture Meta Ads Manager mobile — 75 achats sur site Web, 0,52 $ par achat sur site Web, 19 506 personnes touchées, 42 386 impressions.",
    source: pubmax,
    status: "real",
  },
  result63: {
    src: "/images/results/meta-mobile-63-achats.webp",
    width: 1242,
    height: 819,
    alt: "Capture Meta Ads Manager mobile — 63 achats sur site Web, 1,04 $ par achat et 65,29 $ dépensés.",
    source: pubmax,
    status: "real",
  },

  // ── Instagram post covers (each links to its original post) ──
  igCpa: {
    src: "/images/instagram/ig-cpa-probleme.webp",
    width: 640,
    height: 1136,
    alt: "Couverture de reel d'Ahmed Amine : comment faire baisser votre coût et trouver où se situe le problème.",
    source: `${ig}/reel/DfGbsv4opZ3/`,
    status: "real",
  },
  igCreative: {
    src: "/images/instagram/ig-creative-template.webp",
    width: 1080,
    height: 1350,
    alt: "Carrousel d'Ahmed Amine : « Votre publicité n'a pas marché ? Ne changez pas la vidéo. »",
    source: `${ig}/p/DfJMeRRiPAG/`,
    status: "real",
  },
  igMeta: {
    src: "/images/instagram/ig-strategie-meta.webp",
    width: 640,
    height: 1136,
    alt: "Couverture de reel d'Ahmed Amine : la meilleure stratégie de campagnes après les nouvelles mises à jour de Meta.",
    source: `${ig}/reel/DfBCRj5Na_6/`,
    status: "real",
  },
  igOrders: {
    src: "/images/instagram/ig-5-a-47-commandes.webp",
    width: 640,
    height: 1136,
    alt: "Couverture de reel d'Ahmed Amine : comment passer de 5 commandes à plus de 47 commandes.",
    source: `${ig}/reel/DcMhKLPtZwS/`,
    status: "real",
  },

  // ── Wanted, not yet available (not rendered until provided) ──
  clientProductPhotos: {
    src: "/images/hero/client-product.webp",
    width: 1600,
    height: 2000,
    alt: "Photographie produit d'une marque accompagnée par PubMax (à fournir, avec l'accord de la marque).",
    source: "À fournir par PubMax",
    status: "missing",
  },
} satisfies Record<string, Asset>;

export type AssetKey = keyof typeof assets;
