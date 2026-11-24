# PubMax — landing page

Site marketing en français pour **PubMax** (acquisition e-commerce) et la **consultation stratégique payante avec
Ahmed Amine Ssi Tayeb** (60 min · 600 MAD). Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion · Radix UI · React Hook Form + Zod.

Direction artistique : « Persona – Landing Page Design » (Yasir Noori / Landing Page Labs) — voir
`references/reference-analysis.md` (analyse + tokens) et `references/persona-reference.png`.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs
npm run dev                  # http://localhost:3000
```

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm start` | Build de production / serveur Node |
| `npm run lint` · `npm run typecheck` | Qualité |
| `npm run images` | Régénère `public/images/**` (WebP) depuis `raw/` |

Le site a besoin d'un serveur Node (routes API pour le formulaire, la réservation et le webhook Stripe) : Vercel,
Railway, Render, un VPS… Un export statique ne suffit pas.

## Deux parcours de conversion (séparés)

| | Agence PubMax | Consultation avec Ahmed |
|---|---|---|
| Page | `/audit` | `/consultation` |
| Formulaire | Qualification (nom, marque, site, WhatsApp, e-mail, budget facultatif, défi, consentement) | Créneau → informations → paiement |
| Serveur | `POST /api/lead` → `LEAD_WEBHOOK_URL` (ex. GoHighLevel) | `/api/booking/availability`, `/api/booking/checkout`, `/api/booking/webhook` |
| Succès | Redirection vers l'agenda Calendly (appel de 30 min) — `site.agencyCallUrl` | `/consultation/confirmation?session_id=…` |
| Événement | `agency_lead_submitted` (uniquement si le CRM a reçu la demande) | `consultation_payment_success` (uniquement si payé **et** réservé) |

### Formulaire agence
Validation Zod côté client **et** serveur, honeypot anti-spam, limitation de débit. Sans `LEAD_WEBHOOK_URL` :
en développement la demande est seulement journalisée (bandeau « Mode développement » sur `/merci`) ; en production
l'API répond 503 — aucun faux succès. Après un envoi réussi, le visiteur est redirigé vers
`calendly.com/ahmeddigitale/30min` (lien modifiable dans `src/lib/site.ts`, sans le `fbclid` ni le `month` du lien
Instagram).

### Vidéo VSL (hero)
Renseigner `NEXT_PUBLIC_VSL_URL` (YouTube, Vimeo ou .mp4). Sans URL, le lecteur affiche « Vidéo · bientôt disponible ».

### Guide ebook
Section `#guide` : prénom + e-mail → `POST /api/ebook` → `EBOOK_WEBHOOK_URL` (ou `LEAD_WEBHOOK_URL`). Le bouton de
téléchargement pointe vers `EBOOK_FILE_URL`, sinon `public/guides/guide-acquisition-ecommerce.pdf` s'il existe, sinon
vers le guide en ligne sur pubmaxagency.com. Événement : `ebook_lead_submitted`.

### Identité visuelle
Accent vert dégradé (`bg-grad-green`, `bg-grad-green-deep`), boutons 3D noir/vert (`.btn-3d`) et blancs
(`.btn-3d-light`) dans `src/app/globals.css`. Typographies : Roboto (titres) et Red Hat Text (textes).

### Réservation de la consultation
1. **Créneaux** : lus en direct dans Calendly (`event_type_available_times`). Jamais inventés. Sans configuration, la
   page affiche un état « agenda non connecté » (en développement, un bouton d'aperçu permet de tester les étapes).
2. **Informations** : nom, e-mail, téléphone/WhatsApp, marque, site, problématique.
3. **Paiement** : session Stripe Checkout de 600 MAD créée côté serveur (aucune clé dans le navigateur), créneau
   revérifié juste avant.
4. **Confirmation** : le webhook Stripe (signature vérifiée) crée la réservation via l'API Scheduling de Calendly
   (`POST /invitees`) puis enregistre `booking_status=confirmed` sur le PaymentIntent. La page de confirmation relit
   Stripe côté serveur et n'affiche « confirmée » que si le paiement est payé **et** la réservation créée.
   Si la réservation échoue après paiement : statut `needs_attention` + notification (`BOOKING_NOTIFY_WEBHOOK_URL`)
   pour reprogrammer ou rembourser manuellement.

**Mise en place**
1. Calendly : créer un type d'événement « Consultation stratégique » de 60 min, copier son URI (API
   `GET /event_types`), créer un token personnel. Vérifier que votre offre Calendly inclut l'API Scheduling.
2. Stripe : vérifier que le compte peut encaisser en **MAD** (sinon adapter `currency` dans `src/lib/booking.ts`,
   ou remplacer l'adaptateur par CMI / un autre PSP marocain — les fonctions exportées restent les mêmes).
3. Stripe → Webhooks : endpoint `https://<domaine>/api/booking/webhook`, événements
   `checkout.session.completed` et `checkout.session.async_payment_succeeded`, copier le `whsec_…`.
4. Test local : `stripe listen --forward-to localhost:3000/api/booking/webhook` avec une clé `sk_test_…`.

Alternative GoHighLevel (calendriers + paiements) : réimplémenter `getAvailability`, `createReservation` et
`createCheckoutSession` dans `src/lib/booking.ts`.

## Analytics
`src/lib/analytics.ts` pousse les événements vers `dataLayer` (GTM), `gtag` (GA4) et `fbq` (Meta Pixel : `Lead`,
`InitiateCheckout`, `Purchase`). Les scripts ne sont chargés qu'après acceptation dans le bandeau de consentement,
et le bandeau n'apparaît que si au moins un ID est configuré. Les conversions sont dédupliquées (`trackOnce`, `event_id`).

Événements : `agency_cta_click`, `consultation_cta_click`, `agency_lead_submitted`, `consultation_booking_started`,
`consultation_payment_success`.

## Contenus et images
- Textes : `src/data/content.ts` · Images : `src/data/assets.ts` (manifeste, source et statut de chaque image) ·
  Témoignages : `src/data/testimonials.ts`.
- Captures Meta Ads Manager : issues de pubmaxagency.com, chiffres non modifiés, chaque preuve est étiquetée
  *Agrégé* / *Historique* / *Campagne spécifique*.
- Photos d'Ahmed et couvertures Instagram : issues de instagram.com/ahmed_amine.digital (chaque carte renvoie au post).
- Les originaux sont dans `raw/` ; `npm run images` produit les WebP dans `public/images/`.

## À fournir / à vérifier avant publication
- [ ] **Témoignages** : aucune citation de Soufiane, Soukaina, Fatim Zahra ou Kawtar n'a été trouvée sur
      pubmaxagency.com (le site indique ne publier aucun témoignage inventé). La section est masquée en production
      tant qu'aucune entrée n'a `verified: true`.
- [ ] **Titre d'Ahmed** : « Fondateur de PubMax » (`founder.role`) à confirmer. Instagram affiche le nom
      « Ahmed Sitayeb » ; le site utilise « Ahmed Amine Ssi Tayeb » comme demandé — confirmer l'orthographe.
- [ ] **Portrait HD** d'Ahmed (≥ 2000 px) : l'actuel est la photo de profil Instagram en 1024 × 1024.
- [ ] **Photos produits** de marques clientes (avec leur accord) pour enrichir le hero.
- [ ] **Logo vectoriel officiel** : `src/components/ui/Logo.tsx` est une reproduction SVG du logo PNG.
- [ ] Autorisation de réutiliser les captures et contenus Instagram sur ce site.
- [ ] **Vidéo VSL** et **PDF du guide** à fournir (le contenu des puces du guide est à confirmer).
- [ ] Variables d'environnement (CRM, Calendly, Stripe, analytics) et mentions légales / politique de
      confidentialité (non incluses).
- [ ] Le lien Calendly 30 min (appel agence) n'est pas utilisé pour la consultation payante de 60 min.

## Structure
```
src/app/            page d'accueil, /audit, /consultation, /consultation/confirmation, /merci, API, SEO
src/components/     layout/ sections/ visuals/ ui/ forms/ booking/
src/data/           content.ts, assets.ts, testimonials.ts
src/lib/            analytics, validation (Zod), booking (Calendly + Stripe), site, rate-limit
public/images/      ahmed/ instagram/ results/
raw/                originaux des images
references/         capture de référence + analyse
scripts/            prepare-images.mjs
```
