import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Info, ArrowLeft } from "lucide-react";
import { site, noelPackages, noelSeason } from "@/lib/site";
import { SiteHeader, SiteFooter, MobileCta, Eyebrow } from "@/components/site-chrome";
import LightString from "@/components/light-string";
import PackageVisual from "@/components/package-visual";
import PackageCards from "@/components/package-cards";
import StepsTimeline from "@/components/steps-timeline";
import Booking from "@/components/booking";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return noelPackages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = noelPackages.find((p) => p.slug === slug);
  if (!pkg) return {};
  const title = `Forfait ${pkg.name} à ${pkg.price} $ : lumières de Noël à ${site.city}`;
  return {
    title,
    description: `${pkg.summary} Prix fixe de ${pkg.price} $, taxes en sus.`,
    alternates: { canonical: `/forfaits/${pkg.slug}` },
    openGraph: { title, description: pkg.summary, url: `/forfaits/${pkg.slug}`, locale: "fr_CA", type: "website" },
  };
}

export default async function PackagePage({ params }: Props) {
  const { slug } = await params;
  const pkg = noelPackages.find((p) => p.slug === slug);
  if (!pkg) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Forfait ${pkg.name}`,
    description: pkg.summary,
    areaServed: site.region,
    provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phone },
    offers: { "@type": "Offer", price: pkg.price, priceCurrency: "CAD" },
  };

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-20 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-night text-white">
          <LightString count={22} />
          <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 pb-14 pt-6 md:grid-cols-[1.2fr_1fr] md:px-5 md:pb-20">
            <div>
            <Link href="/#forfaits" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Tous les forfaits
            </Link>
            <p className="mt-6"><Eyebrow dark>Forfait {pkg.idealFor.toLowerCase()}</Eyebrow></p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {pkg.name} <span className="text-gold">· {pkg.price} $</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">{pkg.summary}</p>
            <p className="mt-3 text-sm text-white/50">{noelSeason.priceNote}</p>
            <Link href="#reserver" className="mt-7 inline-flex rounded-full bg-gold px-6 py-3.5 font-semibold text-night">
              Réserver le forfait {pkg.name}
            </Link>
            </div>
            <figure>
              <div className="overflow-hidden rounded-xl2 ring-1 ring-white/10 shadow-lift">
                <PackageVisual pkg={pkg} sizes="(max-width: 768px) 100vw, 45vw" priority />
              </div>
            </figure>
          </div>
        </section>

        <section className="mx-auto grid max-w-4xl gap-6 px-4 py-14 md:grid-cols-[1.4fr_1fr] md:px-5 md:py-20">
          <div className="rounded-xl2 bg-white p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold text-ink">Ce qui est inclus</h2>
            <ul className="mt-5 space-y-3">
              {pkg.includes.map((f) => (
                <li key={f} className="flex items-start gap-3 text-ink">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl2 bg-cream-deep p-6">
            <h2 className="flex items-center gap-2 font-semibold text-ink">
              <Info className="h-5 w-5 text-gold-dark" /> Bon à savoir
            </h2>
            <ul className="mt-4 space-y-2.5 text-[15px] text-ink-soft">
              {pkg.goodToKnow.map((g) => (
                <li key={g}>{g}</li>
              ))}
              <li>Maison de 3 étages ou commerce : appelez-nous au {site.phone}.</li>
            </ul>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-5 md:py-20">
            <h2 className="text-center font-display text-3xl font-semibold text-ink">Comment ça marche</h2>
            <StepsTimeline />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 md:px-5 md:py-20">
          <h2 className="text-center font-display text-3xl font-semibold text-ink">Les autres forfaits</h2>
          <div className="mt-10">
            <PackageCards exclude={pkg.slug} />
          </div>
        </section>

        <Booking defaultPackage={pkg.name} />
      </main>
      <SiteFooter />
      <MobileCta />
    </div>
  );
}
