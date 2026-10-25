import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Star } from "lucide-react";
import { site, googleRating, noelSeason, noelTeam, noelFaq } from "@/lib/site";
import { getMedia } from "@/lib/media";
import { SiteHeader, SiteFooter, MobileCta, Eyebrow } from "@/components/site-chrome";
import LightString from "@/components/light-string";
import Snowfall from "@/components/snowfall";
import HouseScene from "@/components/house-scene";
import TrustBar from "@/components/trust-bar";
import PackageCards from "@/components/package-cards";
import PhotoMarquee from "@/components/photo-marquee";
import VideoReel from "@/components/video-reel";
import StepsTimeline from "@/components/steps-timeline";
import Booking from "@/components/booking";

export default function Home() {
  const [sloganA, sloganB] = noelSeason.slogan.split(/(?<=\.)\s+/);
  const media = getMedia("contrats");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    telephone: site.phone,
    email: site.email,
    areaServed: site.region,
    address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: "QC", addressCountry: "CA" },
  };

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-20 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-night pb-10 text-white">
          <Snowfall flakes={26} />
          <LightString count={22} />
          <div className="relative mx-auto grid max-w-6xl items-center gap-4 px-4 pb-10 pt-6 md:grid-cols-2 md:px-5 md:pb-16 md:pt-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gold-soft">
                <span className="inline-flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </span>
                {googleRating.score} sur Google
              </span>
              <h1 className="mt-5 font-display text-[2.4rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                {sloganA}
                <span className="block text-gold">{sloganB}</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
                Installation de lumières de Noël à {site.city}
                {" "}et dans les environs, à prix fixe. On pose, on entretient,
                on démonte en janvier.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="#reserver" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-night">
                  Réserver ma date
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#forfaits" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-base font-semibold text-white">
                  Voir les forfaits
                </Link>
              </div>
              <p className="mt-5 text-sm text-white/60">À partir de 349 $ · {noelSeason.bookingNote}</p>
            </div>
            <HouseScene className="mx-auto w-full max-w-[420px] md:max-w-[540px]" />
          </div>
        </section>

        <TrustBar />

        {/* FORFAITS */}
        <section id="forfaits" className="mx-auto max-w-6xl px-4 py-16 md:px-5 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Nos forfaits</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Un prix fixe, tout est inclus
            </h2>
            <p className="mt-3 text-ink-soft">{noelSeason.priceNote}</p>
          </div>
          <div className="mt-10">
            <PackageCards />
          </div>
        </section>

        {/* CONTRATS */}
        <section id="contrats" className="relative overflow-hidden bg-night py-16 md:py-24">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <Eyebrow dark>Nos contrats</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              La même équipe, été comme hiver
            </h2>
            <p className="mt-3 text-white/70">
              {noelSeason.happyClients}+ clients satisfaits cette année. Voici quelques contrats récents.
            </p>
          </div>
          <div className="mt-10">
            <PhotoMarquee photos={media.photos} />
          </div>
          {media.clips.length > 0 && (
            <div className="mx-auto mt-12 max-w-6xl px-4 md:px-5">
              <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-gold">En action sur le terrain</p>
              <VideoReel clips={media.clips} />
            </div>
          )}
        </section>

        {/* ÉQUIPE */}
        <section id="equipe" className="mx-auto max-w-6xl px-4 py-16 md:px-5 md:py-24">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 shadow-lift md:aspect-[4/5]">
              <Image src={noelTeam.photo} alt="Notre équipe au travail" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
            <div>
              <Eyebrow>Notre équipe</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{noelTeam.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">{noelTeam.text}</p>
              <ul className="mt-6 space-y-2.5">
                {noelTeam.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 font-medium text-ink">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/20">
                      <Check className="h-3.5 w-3.5 text-gold-dark" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ÉTAPES */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-5 md:py-24">
            <div className="text-center">
              <Eyebrow>Comment ça marche</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Quatre étapes, zéro tracas
              </h2>
            </div>
            <StepsTimeline />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-4 py-16 md:px-5 md:py-24">
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Questions fréquentes
          </h2>
          <div className="mt-8 space-y-3">
            {noelFaq.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-black/5 bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                  {item.q}
                  <span className="text-xl leading-none text-gold-dark transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <Booking />
      </main>

      <SiteFooter />
      <MobileCta />
    </div>
  );
}
