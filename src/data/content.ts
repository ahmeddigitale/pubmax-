/** All landing page copy. Edit text here; components only handle layout. */
import { assets } from "./assets";
import { site } from "@/lib/site";

export const nav = {
  links: [
    { label: "Notre système", href: "/#systeme" },
    { label: "Résultats", href: "/#resultats" },
    { label: "Ahmed Amine", href: "/#ahmed" },
    { label: "Nos offres", href: "/#offres" },
  ],
  primary: { label: "Travailler avec PubMax", href: site.routes.agency },
  secondary: { label: "Consultation avec Ahmed", href: site.routes.consultation },
};

export const hero = {
  eyebrow: "Pour les marques e-commerce",
  title: "Vous avez une marque e-commerce, mais vous n’arrivez pas à attirer des clients et à générer des ventes régulières ?",
  text: "Nous vous aidons à construire un véritable système d'acquisition pour attirer les bons clients, générer des ventes régulières et développer votre marque grâce à une stratégie claire, mesurable et évolutive.",
  trust: "40 147 achats enregistrés · Plus de 54 millions d'impressions",
  primary: "Travailler avec PubMax",
  secondary: "Réserver une consultation",
  note: "Stratégie, créatives et performance réunies dans un seul système.",
  vsl: {
    /** YouTube, Vimeo or .mp4 URL. Set NEXT_PUBLIC_VSL_URL or paste it here. Empty = "bientôt disponible" state. */
    url: process.env.NEXT_PUBLIC_VSL_URL ?? "",
    title: "Comment PubMax transforme vos Ads en système d'acquisition",
    label: "Regardez la présentation",
  },
};

export const proofStrip = {
  label: "Résultats agrégés · 112 ensembles de publicités Meta accompagnés par PubMax",
  stats: [
    { value: "40 147", label: "achats sur site enregistrés" },
    { value: "54 M+", label: "impressions (54 098 455)" },
    { value: "1,27 $", label: "coût par achat moyen" },
    { value: "50 952 $", label: "investis en Meta Ads" },
  ],
  footnote: "Données historiques issues du tableau Meta Ads Manager présenté plus bas. Elles ne constituent pas une promesse de résultats futurs.",
};

export const problem = {
  eyebrow: "Le vrai problème",
  title: "Vous avez une belle marque. De bons produits. Mais toujours pas assez de ventes ?",
  text: "Il est temps d’arrêter de compter sur la chance et de mettre en place un véritable système d’acquisition qui transforme vos publicités en ventes.\n\nLe problème ne vient pas forcément de vos produits. Voici quelques exemples de ce qui peut freiner la croissance de votre marque.",
  cards: [
    { n: "01", title: "Des publicités de plus en plus coûteuses.", visual: "cost" },
    { n: "02", title: "Des créatives sans véritable direction.", visual: "creatives" },
    { n: "03", title: "Un positionnement qui ne différencie pas votre marque.", visual: "position" },
    { n: "04", title: "Des campagnes qui fonctionnent un jour et déçoivent le lendemain.", visual: "volatile" },
  ] as const,
  closing: ["Le problème n'est pas toujours votre budget.", "C'est le système derrière vos Ads."],
};

export const system = {
  eyebrow: "Le système PubMax",
  title: "Arrêtez de chercher la publicité gagnante. Construisez le système qui permet d'en créer.",
  text: "Nous alignons les éléments essentiels de votre acquisition pour transformer des campagnes isolées en une stratégie cohérente et optimisable.",
  stages: [
    {
      n: "01",
      key: "position",
      title: "Positionnement",
      text: "Clarifier votre différenciation et la raison pour laquelle vos clients devraient vous choisir.",
      outputs: ["Différenciation", "Client idéal", "Promesse"],
    },
    {
      n: "02",
      key: "messaging",
      title: "Messaging",
      text: "Transformer votre valeur en messages clairs qui parlent aux bons clients.",
      outputs: ["Proposition de valeur", "Objections", "Preuves"],
    },
    {
      n: "03",
      key: "creative",
      title: "Creative Strategy",
      text: "Développer des angles, hooks et scripts publicitaires conçus pour tester des hypothèses précises.",
      outputs: ["Angles", "Hooks", "Scripts"],
    },
    {
      n: "04",
      key: "ads",
      title: "Meta Ads",
      text: "Structurer, piloter et analyser les campagnes pour comprendre ce qui génère réellement des achats.",
      outputs: ["Structure", "Tests", "Lecture des données"],
    },
    {
      n: "05",
      key: "scale",
      title: "Optimization & Scaling",
      text: "Améliorer les performances et augmenter progressivement les investissements lorsque les données le justifient.",
      outputs: ["Optimisation", "Réallocation", "Scaling progressif"],
    },
  ] as const,
};

export const transformation = {
  eyebrow: "Avant / Après",
  title: "Passez d'une acquisition qui fonctionne au hasard à un système que vous pouvez comprendre et optimiser.",
  before: {
    label: "Avant",
    caption: "Une acquisition subie",
    items: [
      "Positionnement flou.",
      "Messages incohérents.",
      "Créatives sans stratégie.",
      "Campagnes difficiles à analyser.",
      "Croissance imprévisible.",
    ],
  },
  after: {
    label: "Avec PubMax",
    caption: "Une acquisition pilotée",
    items: [
      "Positionnement clair.",
      "Messages stratégiques.",
      "Tests créatifs structurés.",
      "Décisions basées sur les données.",
      "Acquisition plus maîtrisée.",
    ],
  },
};

export const services = {
  eyebrow: "Ce que vous obtenez",
  title: "Bien plus que de la gestion publicitaire.",
  text: "Un accompagnement qui réunit les éléments nécessaires pour structurer, tester et améliorer l'acquisition de votre marque.",
  groups: [
    {
      letter: "A",
      title: "Stratégie d'acquisition",
      items: ["Positionnement", "Proposition de valeur", "Messaging", "Angles marketing", "Structure de test"],
      visual: "strategy",
    },
    {
      letter: "B",
      title: "Stratégie créative",
      items: ["Hooks", "Scripts", "Concepts créatifs", "Directions de tests", "Messages publicitaires"],
      visual: "creative",
    },
    {
      letter: "C",
      title: "Performance & Scaling",
      items: ["Meta Ads", "Analyse des données", "Optimisation", "Réallocation du budget", "Scaling progressif"],
      visual: "performance",
    },
  ] as const,
  scope:
    "PubMax définit la stratégie et la direction créative. La production finale des contenus reste assurée par la marque.",
};

export type ResultItem = {
  asset: keyof typeof assets;
  scope: "Agrégé" | "Historique" | "Campagne spécifique";
  title: string;
  detail: string;
};

export const results = {
  eyebrow: "Des résultats réels",
  title: "Des campagnes. Des données. Des décisions.",
  text: "Captures Meta Ads Manager et tableaux de bord e-commerce fournis par PubMax. Les chiffres sont présentés tels qu'ils apparaissent dans les tableaux, sans arrondi flatteur.",
  headline: [
    { value: "40 147", label: "achats enregistrés", scope: "Agrégé · 112 ensembles" },
    { value: "54 M+", label: "impressions", scope: "Agrégé · 54 098 455" },
    { value: "1,27 $", label: "coût par achat", scope: "Dans le tableau agrégé présenté" },
  ],
  featured: {
    asset: "resultAggregate",
    scope: "Agrégé",
    title: "Résultats de 112 ensembles de publicités",
    detail: "40 147 achats sur site · 1,27 $ par achat · 50 952,67 $ dépensés · 54 098 455 impressions",
  } satisfies ResultItem,
  gallery: [
    { asset: "resultStoreSales", scope: "Historique", title: "2 483 382 MAD de ventes", detail: "13 oct. – 12 nov. 2026 · +140 % par rapport à la période précédente" },
    { asset: "resultStoreVolume", scope: "Historique", title: "7 987 commandes enregistrées", detail: "13 oct. – 12 nov. 2026 · +123 % par rapport à la période précédente" },
    { asset: "resultStoreOrders", scope: "Historique", title: "Commandes reçues en boutique", detail: "Extrait du suivi des commandes · Montants en MAD · Paiements en attente" },
    {
      asset: "resultRoas",
      scope: "Campagne spécifique",
      title: "Vue 30 jours d'une campagne",
      detail: "5,6 K achats · 1,49 $ par résultat · ROAS d'achat 36,26",
    },
    {
      asset: "result45",
      scope: "Historique",
      title: "Totaux de 45 ensembles de publicités",
      detail: "2 918 achats · 1,55 $ par achat · 4 536,12 $ dépensés",
    },
    {
      asset: "resultCampaigns",
      scope: "Campagne spécifique",
      title: "Plusieurs campagnes de vente actives",
      detail: "2,8 K · 2,2 K · 6,8 K achats sur site Web",
    },
    {
      asset: "result301",
      scope: "Historique",
      title: "Totaux d'un compte publicitaire",
      detail: "301 achats · 1,70 $ par achat · 511,06 $ dépensés",
    },
    {
      asset: "result75",
      scope: "Campagne spécifique",
      title: "Lancement d'une campagne",
      detail: "75 achats · 0,52 $ par achat sur site Web",
    },
    {
      asset: "result63",
      scope: "Campagne spécifique",
      title: "Test d'une nouvelle offre",
      detail: "63 achats · 1,04 $ par achat · 65,29 $ dépensés",
    },
  ] satisfies ResultItem[],
  disclaimer:
    "Les performances passées ne garantissent ni un ROAS, ni un volume de ventes, ni une rentabilité futurs. Chaque marque dépend de son offre, de son marché, de ses marges et de ses créatives.",
};

export const founder = {
  eyebrow: "Le fondateur",
  title: "Rencontrez Ahmed Amine Ssi Tayeb.",
  subtitle: "Derrière PubMax, une vision de l'acquisition qui va bien au-delà des publicités.",
  name: "Ahmed Amine Ssi Tayeb",
  // À vérifier avant publication (titre exact souhaité par Ahmed).
  role: "Fondateur de PubMax",
  bio: [
    "Ahmed Amine Ssi Tayeb est entrepreneur, créateur de contenu et spécialiste de l'acquisition e-commerce.",
    "À travers PubMax, il défend une approche qui relie le positionnement des marques, les messages publicitaires, la stratégie créative et l'analyse des performances.",
  ],
  conviction:
    "Une croissance mieux maîtrisée commence par une stratégie cohérente, pas par l'accumulation de campagnes.",
  tags: ["Entrepreneur", "Créateur de contenu", "Acquisition e-commerce"],
  instagramCta: "Découvrir mon Instagram",
  consultationCta: "Réserver une consultation avec Ahmed",
};

export type InstagramPost = {
  asset: keyof typeof assets;
  href: string;
  kind: "Reel" | "Carrousel";
  title: string;
};

export const instagram = {
  eyebrow: "Contenu",
  title: "Des stratégies partagées. Des idées à appliquer.",
  text: "Ahmed partage également du contenu autour du marketing digital, de l'acquisition et des stratégies publicitaires pour aider les entrepreneurs à mieux comprendre les leviers de croissance de leur marque.",
  note: "Contenus publiés en darija marocaine.",
  cta: "Suivre Ahmed sur Instagram",
  posts: [
    {
      asset: "igCreative",
      href: "https://www.instagram.com/ahmed_amine.digital/p/DfJMeRRiPAG/",
      kind: "Carrousel",
      title: "Votre publicité n'a pas marché ? Ne changez pas (tout de suite) la vidéo.",
    },
    {
      asset: "igCpa",
      href: "https://www.instagram.com/ahmed_amine.digital/reel/DfGbsv4opZ3/",
      kind: "Reel",
      title: "Faire baisser votre coût et trouver où se situe vraiment le problème.",
    },
    {
      asset: "igMeta",
      href: "https://www.instagram.com/ahmed_amine.digital/reel/DfBCRj5Na_6/",
      kind: "Reel",
      title: "La stratégie de campagnes après les dernières mises à jour de Meta.",
    },
    {
      asset: "igOrders",
      href: "https://www.instagram.com/ahmed_amine.digital/reel/DcMhKLPtZwS/",
      kind: "Reel",
      title: "Comment passer de 5 commandes à plus de 47.",
    },
  ] satisfies InstagramPost[],
};

export const offers = {
  eyebrow: "Deux façons d'avancer",
  title: "Vous voulez déléguer votre acquisition ou bénéficier d'un regard stratégique ?",
  agency: {
    tag: "Accompagnement agence",
    title: "Travailler avec PubMax",
    text: "Confiez la stratégie et le pilotage de votre acquisition à une équipe qui travaille sur votre positionnement, vos messages, vos créatives et vos campagnes Meta Ads.",
    includesLabel: "Inclus",
    includes: [
      "Stratégie d'acquisition",
      "Direction créative",
      "Gestion publicitaire",
      "Analyse et optimisation",
      "Accompagnement stratégique",
    ],
    target: "Pour les marques qui cherchent un accompagnement continu.",
    priceLabel: "Sur devis, après audit",
    cta: "Demander un audit gratuit",
  },
  consultation: {
    tag: "Séance individuelle",
    title: "Consultation stratégique avec Ahmed",
    price: "600 DH",
    unit: "/ heure",
    text: "Une séance individuelle pour prendre du recul sur votre marque, analyser vos problématiques marketing et identifier les prochaines décisions stratégiques à considérer.",
    includesLabel: "Sujets possibles",
    includes: [
      "Positionnement de marque",
      "Stratégie publicitaire",
      "Acquisition clients",
      "Stratégie créative",
      "Analyse des campagnes",
    ],
    target: "Pour les fondateurs qui veulent un avis stratégique direct.",
    cta: "Réserver ma consultation",
  },
};

export const consultation = {
  eyebrow: "Consultation individuelle",
  title: "Une heure avec Ahmed pour clarifier vos prochaines décisions.",
  text: "Vous arrivez avec votre marque, vos chiffres et vos questions. Vous repartez avec une lecture claire de vos blocages et des pistes concrètes à considérer.",
  card: {
    title: "Consultation stratégique",
    subtitle: "avec Ahmed Amine Ssi Tayeb",
    duration: "60 minutes",
    format: "Visioconférence",
    price: "600 DH",
    benefits: [
      "Analyse de votre positionnement et de votre offre",
      "Lecture de vos campagnes et de vos créatives",
      "Identification des principaux points de blocage",
      "Pistes stratégiques priorisées",
    ],
    cta: "Réserver ma consultation",
    note: "Paiement sécurisé · Réservation confirmée après paiement",
  },
};

export const processSteps = {
  eyebrow: "Comment l'agence travaille",
  title: "Une méthode claire. Des décisions appuyées sur les données.",
  steps: [
    {
      n: "01",
      title: "Diagnostiquer",
      text: "Comprendre votre marque, votre offre, vos clients et vos campagnes.",
      tags: ["Audit du compte", "Offre & marges", "Audience"],
    },
    {
      n: "02",
      title: "Construire",
      text: "Définir le positionnement, les messages, les créatives et la structure publicitaire.",
      tags: ["Positionnement", "Angles & scripts", "Structure de campagnes"],
    },
    {
      n: "03",
      title: "Piloter & optimiser",
      text: "Analyser les résultats, tester et améliorer progressivement l'acquisition.",
      tags: ["Lecture hebdomadaire", "Tests créatifs", "Réallocation"],
    },
  ],
};

export const ebook = {
  eyebrow: "Guide gratuit",
  title: "Le guide de l'acquisition e-commerce.",
  text: "Les fondations du système PubMax, réunies dans un guide à lire à votre rythme : comment aligner positionnement, messages, créatives et Meta Ads avant d'augmenter votre budget.",
  bullets: [
    "Pourquoi vos Ads ne sont pas toujours le vrai problème",
    "Clarifier votre positionnement et votre promesse",
    "Construire des angles, des hooks et des scripts à tester",
    "Structurer et lire vos campagnes Meta Ads",
  ],
  cta: "Recevoir le guide",
  coverTitle: ["Le guide de", "l'acquisition", "e-commerce"],
  /** Online version already published on the agency website (used when no PDF is configured). */
  onlineUrl: "https://pubmaxagency.com/guide-acquisition-ecommerce",
};

export const faq = {
  eyebrow: "Questions fréquentes",
  title: "Les réponses avant de faire le premier pas.",
  items: [
    {
      q: "PubMax travaille-t-elle uniquement avec les marques déjà lancées ?",
      a: "Nous travaillons principalement avec des e-commerces qui ont déjà une offre et souhaitent structurer ou améliorer leur acquisition. L'objectif est d'identifier ce qui bloque et de construire une logique d'acquisition plus cohérente.",
    },
    {
      q: "Quel budget publicitaire faut-il prévoir ?",
      a: "Le budget dépend de votre offre, de votre marché, de vos objectifs et de votre capacité à tester. Nous déterminons le niveau d'investissement adapté à votre situation plutôt que d'imposer un budget unique à chaque marque.",
    },
    {
      q: "Est-ce que PubMax crée les vidéos publicitaires ?",
      a: "Non. Notre rôle est stratégique : nous définissons les angles marketing, les concepts, les hooks et les scripts à tester afin de donner une direction claire à la production créative. La production finale des contenus reste assurée par la marque.",
    },
    {
      q: "Qu'est-ce qui différencie PubMax d'une agence Meta Ads classique ?",
      a: "Les Ads font partie du système, mais notre approche commence en amont : positionnement, messaging, angles marketing, hooks et scripts publicitaires, puis pilotage et optimisation des campagnes. Chaque compte est suivi directement par les personnes qui construisent la stratégie.",
    },
    {
      q: "Comment commence l'accompagnement ?",
      a: "Tout commence par un échange pour comprendre votre marque, votre offre et votre acquisition actuelle. Nous identifions ensuite les principaux blocages et déterminons les prochaines étapes. Pour démarrer, remplissez la demande d'audit gratuit.",
    },
    {
      q: "Quelle est la différence entre l'accompagnement PubMax et la consultation avec Ahmed ?",
      a: "L'accompagnement PubMax est un service d'agence continu : l'équipe construit et pilote votre acquisition. La consultation est une séance individuelle d'une heure avec Ahmed pour obtenir un regard stratégique direct sur votre marque — elle n'inclut pas la gestion de vos campagnes.",
    },
    {
      q: "Combien coûte la consultation individuelle ?",
      a: "La consultation stratégique avec Ahmed dure 60 minutes et coûte 600 DH (600 MAD), réglés en ligne au moment de la réservation.",
    },
    {
      q: "Comment réserver ma séance ?",
      a: "Sur la page Consultation : choisissez un créneau, renseignez quelques informations sur votre marque, puis réglez la séance en ligne. Votre réservation est confirmée uniquement après la validation du paiement.",
    },
  ],
};

export const finalCta = {
  title: "Votre marque a du potentiel. Donnez-lui un système d'acquisition à la hauteur.",
  text: "Que vous souhaitiez confier votre acquisition à PubMax ou travailler directement sur votre stratégie avec Ahmed, choisissez la prochaine étape adaptée à votre situation.",
  primary: "Travailler avec PubMax",
  secondary: "Consultation avec Ahmed",
};

export const footer = {
  statement: "Studio d'acquisition e-commerce. Positionnement, créatives et performance média réunis dans un seul système.",
  columns: [
    {
      title: "Navigation",
      links: [
        { label: "Notre système", href: "/#systeme" },
        { label: "Résultats", href: "/#resultats" },
        { label: "Ahmed Amine", href: "/#ahmed" },
        { label: "Guide gratuit", href: "/#guide" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Avancer",
      links: [
        { label: "Demander un audit gratuit", href: site.routes.agency },
        { label: "Consultation avec Ahmed", href: site.routes.consultation },
        { label: "Instagram d'Ahmed", href: site.instagramUrl, external: true },
      ],
    },
  ],
  legal: `© ${new Date().getFullYear()} PubMax. Acquisition e-commerce.`,
};
