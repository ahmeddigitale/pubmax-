// Converts the original assets in raw/ into clean, named WebP masters in public/images/.
// next/image then serves responsive AVIF/WebP sizes from these masters.
// Run: npm run images
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const jobs = [
  // Meta Ads Manager screenshots — source: pubmaxagency.com (kept at full resolution so figures stay readable)
  ["raw/results/1dae68daf_sfsfdfs.png", "results/meta-agrege-112-ensembles.webp"],
  ["raw/results/a261810a4_sccsc.png", "results/meta-45-ensembles.webp"],
  ["raw/results/a4818a07e_ggrt.png", "results/meta-301-achats.webp"],
  ["raw/results/d81dae01d_WhatsAppImage2026-09-26at204046.jpeg", "results/meta-mobile-5-6k-achats.webp"],
  ["raw/results/bdcda47c5_utyf.jpeg", "results/meta-mobile-campagnes.webp"],
  ["raw/results/5bc008a71_WhatsAppImage2026-09-26atdfgfg.jpeg", "results/meta-mobile-75-achats.webp"],
  ["raw/results/d078b2ce9_wwwww.jpeg", "results/meta-mobile-63-achats.webp"],
  // Ahmed Amine — source: instagram.com/ahmed_amine.digital (profile photo + post covers)
  ["raw/instagram/ahmed-portrait.jpg", "ahmed/ahmed-portrait.webp"],
  ["raw/ahmed/ahmed-voiture.jpg", "ahmed/ahmed-voiture.webp"],
  ["raw/ahmed/ahmed-selfie.jpg", "ahmed/ahmed-selfie.webp"],
  ["raw/instagram/ig-cpa-probleme.jpg", "instagram/ig-cpa-probleme.webp"],
  ["raw/instagram/ig-creative-template.jpg", "instagram/ig-creative-template.webp"],
  ["raw/instagram/ig-strategie-meta.jpg", "instagram/ig-strategie-meta.webp"],
  ["raw/instagram/ig-5-a-47-commandes.jpg", "instagram/ig-5-a-47-commandes.webp"],
];

for (const [from, to] of jobs) {
  const out = join(root, "public/images", to);
  mkdirSync(dirname(out), { recursive: true });
  const info = await sharp(join(root, from)).webp({ quality: 90, effort: 5 }).toFile(out);
  console.log(`${to}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
