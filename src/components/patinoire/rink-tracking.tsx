"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { rink } from "@/lib/patinoire";

const KEY = "pv-temoins";

// Outils de mesure (Microsoft Clarity et pixel Meta).
// Rien n'est chargé tant que le visiteur n'a pas accepté (Loi 25).
export default function RinkTracking() {
  const [consent, setConsent] = useState<"oui" | "non" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === "oui" || saved === "non") setConsent(saved);
    } catch {
      // stockage indisponible : on redemandera
    }
    setReady(true);
  }, []);

  if (!rink.clarityId && !rink.metaPixelId) return null;

  function choose(value: "oui" | "non") {
    setConsent(value);
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      // rien à faire
    }
  }

  return (
    <>
      {consent === "oui" && rink.clarityId && (
        <Script id="pv-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${rink.clarityId}");clarity("set","page","patinoire");`}
        </Script>
      )}
      {consent === "oui" && rink.metaPixelId && (
        <Script id="pv-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${rink.metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}

      {ready && consent === null && (
        <div
          role="dialog"
          aria-label="Témoins de mesure"
          className="fixed inset-x-3 bottom-[84px] z-[60] rounded-2xl border border-black/10 bg-white p-4 shadow-lift md:inset-x-auto md:bottom-4 md:right-4 md:max-w-sm"
        >
          <p className="text-sm leading-relaxed text-ink-soft">
            On aimerait mesurer l&apos;achalandage pour améliorer cette page.{" "}
            <Link href="/confidentialite" className="underline">
              En savoir plus
            </Link>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => choose("non")} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink">
              Refuser
            </button>
            <button type="button" onClick={() => choose("oui")} className="rounded-full bg-night px-4 py-2 text-sm font-semibold text-white">
              Accepter
            </button>
          </div>
        </div>
      )}
    </>
  );
}
