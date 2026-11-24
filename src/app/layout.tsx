import type { Metadata, Viewport } from "next";
import { Manrope, Red_Hat_Text } from "next/font/google";
import { site } from "@/lib/site";
import { Analytics } from "@/components/layout/Analytics";
import { MotionProvider } from "@/components/ui/Reveal";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const redHat = Red_Hat_Text({
  subsets: ["latin", "latin-ext"],
  variable: "--font-redhat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s · PubMax" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#f4f4f2", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#org`,
      name: "PubMax",
      url: site.url,
      description: site.description,
      founder: { "@id": `${site.url}/#ahmed` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#ahmed`,
      name: "Ahmed Amine Ssi Tayeb",
      jobTitle: "Fondateur de PubMax",
      sameAs: [site.instagramUrl],
      image: `${site.url}/images/ahmed/ahmed-portrait.webp`,
    },
    {
      "@type": "Service",
      name: "Consultation stratégique avec Ahmed Amine",
      provider: { "@id": `${site.url}/#ahmed` },
      offers: { "@type": "Offer", price: site.consultation.priceMad, priceCurrency: "MAD", url: `${site.url}/consultation` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${manrope.variable} ${redHat.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu
        </a>
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
