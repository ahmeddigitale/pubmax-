"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

/**
 * Consent-aware analytics loader.
 * Nothing is loaded until the visitor accepts; if no IDs are configured, no banner is shown at all.
 * Configure via NEXT_PUBLIC_GTM_ID, NEXT_PUBLIC_GA4_ID, NEXT_PUBLIC_META_PIXEL_ID.
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const STORAGE_KEY = "pm_consent_v1";

type Consent = "granted" | "denied" | null;

export function Analytics() {
  const configured = Boolean(GTM_ID || GA4_ID || PIXEL_ID);
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading persisted consent after mount avoids a hydration mismatch
      if (v === "granted" || v === "denied") setConsent(v);
    } catch {}
    setReady(true);
  }, []);

  const choose = (v: "granted" | "denied") => {
    setConsent(v);
    try {
      window.localStorage.setItem(STORAGE_KEY, v);
    } catch {}
  };

  if (!configured) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          {GTM_ID && (
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
          )}
          {GA4_ID && !GTM_ID && (
            <>
              <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
              <Script id="ga4" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA4_ID}');`}
              </Script>
            </>
          )}
          {PIXEL_ID && (
            <Script id="meta-pixel" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
            </Script>
          )}
        </>
      )}

      {ready && consent === null && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Préférences de mesure d'audience"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-[18px] border border-line bg-white p-5 shadow-[var(--shadow-float)] sm:bottom-5"
        >
          <p className="text-[0.9375rem] leading-relaxed text-ink-2">
            Nous utilisons des outils de mesure (Google, Meta) pour comprendre l&apos;efficacité de nos pages. Ils ne
            sont activés qu&apos;avec votre accord.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => choose("granted")} className="h-11 rounded-[12px] bg-ink px-5 text-[0.9375rem] font-semibold text-white">
              Accepter
            </button>
            <button type="button" onClick={() => choose("denied")} className="h-11 rounded-[12px] border border-line px-5 text-[0.9375rem] font-semibold text-ink">
              Refuser
            </button>
          </div>
        </div>
      )}
    </>
  );
}
