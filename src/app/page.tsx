import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CalendarCheck, Check, Droplets, Hammer, ShieldCheck, Snowflake, Star, X } from "lucide-react";
import { site, googleRating, noelSeason, noelTeam } from "@/lib/site";
import { rink, rinkPackages, rinkSteps, rinkGuarantees, rinkCompare, rinkFaq, money } from "@/lib/patinoire";
import { getMedia } from "@/lib/media";
import { getRinkPackageImages } from "@/lib/patinoire-images";
import { Eyebrow } from "@/components/site-chrome";
import Snowfall from "@/components/snowfall";
import TrustBar from "@/components/trust-bar";
import PhotoMarquee from "@/components/photo-marquee";
import VideoReel from "@/components/video-reel";
import { RinkProvider } from "@/components/patinoire/rink-context";
import { RinkHeader, RinkFooter, RinkMobileCta } from "@/components/patinoire/rink-chrome";
import RinkIllustration from "@/components/patinoire/rink-illustration";
import RinkPackages, { RinkLaunchOffer } from "@/components/patinoire/rink-packages";
import RinkBooking from "@/components/patinoire/rink-booking";
import RinkTracking from "@/components/patinoire/rink-tracking";

// Page d'accueil : l'offre des patinoires de cour. Tout le contenu se modifie dans src/lib/patinoire.ts.
// (Les lumières de Noël, qui étaient ici, sont maintenant à /noel.)
// Photos et vidéos : dépose-les dans public/patinoire/ (01-nom.jpg, v1-nom.mp4 + v1-nom.poster.jpg)
// et elles apparaissent toutes seules, la première photo en haut de page.
// Images des forfaits : public/patinoire/forfaits/ (voir src/lib/patinoire-images.ts).

const minPrice = Math.min(...rinkPackages.map((p) => p.price));
const title = "Patinoire de cour clé en main, installée pour vous";
const description = `Une vraie patinoire dans votre cour, montée en ${rink.installTime} : bandes, toile et premier arrosage inclus. À partir de ${money(minPrice)}. ${rink.regions.join(", ")}.`;

export const metadata: Metadata = {
  // Sur la page d'accueil, le gabarit de titre du layout ne s'applique pas : on ajoute le nom ici.
  title: { absolute: `${title} · ${site.name}` },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: site.name, locale: "fr_CA", type: "website" },
};

const STEP_ICONS = [CalendarCheck, Hammer, Droplets, Snowflake];
const HERO_POINTS = ["Clé en main", `Installée en ${rink.installTime}`, "Le matériel reste à vous", "Dépôt remboursé si on manque la date"];
const TEAM_POINTS = ["Ponctuels et respectueux de votre terrain", "Matériel de qualité, posé proprement", "Une vraie personne répond au téléphone"];

export default function Home() {
  const contracts = getMedia("contrats");
  const rinkMedia = getMedia("patinoire");
  const heroPhoto = rinkMedia.photos[0];
  const gallery = rinkMedia.photos.slice(1);
  const packageImages = getRinkPackageImages();

  const steps = rinkSteps.map((s, i) => ({
    title: s.title,
    description: (i === 0 && rink.bookingUrl && s.descriptionWithAgenda) || s.description,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Installation de patinoire de cour clé en main",
    description,
    areaServed: rink.regions,
    provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phone, email: site.email },
    offers: rinkPackages.map((p) => ({
      "@type": "Offer",
      name: `Forfait ${p.name} (${p.size})`,
      price: p.price,
      priceCurrency: "CAD",
    })),
  };

  return (
    <RinkProvider>
      <div className="flex min-h-screen flex-col bg-cream pb-20 md:pb-0">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <RinkHeader />

        <main className="flex-1">
          {/* HERO */}
          <section className="relative overflow-hidden bg-night pb-10 text-white">
            <Snowfall flakes={26} />
            <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-4 pb-10 pt-8 md:grid-cols-2 md:px-5 md:pb-16 md:pt-12">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gold-soft">
                    <span className="inline-flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                      ))}
                    </span>
                    {googleRating.score} sur Google
                  </span>
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80">
                    Nouveau cet hiver
                  </span>
                </div>
                <h1 className="mt-5 font-display text-[2.4rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                  Une patinoire dans votre cour.
                  <span className="block text-gold">Installée en un après-midi.</span>
                </h1>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
                  On monte les bandes, on pose la toile et on revient faire le premier arrosage dès qu&apos;il
                  fait assez froid. Vous, vous sortez les patins.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a href="#reserver" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-night">
                    Réserver ma date
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#forfaits" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-base font-semibold text-white">
                    Voir les forfaits
                  </a>
                </div>
                <p className="mt-5 text-sm text-white/60">
                  À partir de {money(minPrice)} · {rink.spotsNote}
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-white/85">
                  {HERO_POINTS.map((p) => (
                    <li key={p} className="flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-gold" strokeWidth={3} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              {heroPhoto ? (
                <div className="relative mx-auto aspect-[4/3] w-full max-w-[540px] overflow-hidden rounded-xl2 shadow-lift ring-1 ring-white/10">
                  <Image src={heroPhoto.src} alt="Patinoire de cour installée par notre équipe" fill priority sizes="(max-width: 768px) 100vw, 540px" className="object-cover" />
                </div>
              ) : (
                <RinkIllustration className="mx-auto w-full max-w-[300px] md:max-w-[400px]" />
              )}
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
              <p className="mt-3 text-ink-soft">{rink.priceNote}</p>
              <p className="mt-2 text-sm font-semibold text-ink">{rink.sizesNote}</p>
            </div>
            <div className="mt-10">
              <RinkPackages images={packageImages} />
            </div>
            <RinkLaunchOffer />
            <p className="mt-6 text-center text-sm text-ink-soft">
              Démontage au printemps sur demande : {money(rink.teardownPrice)}, facturé au moment du service.
            </p>
          </section>

          {/* ÉTAPES */}
          <section className="bg-white">
            <div className="mx-auto max-w-6xl px-4 py-16 md:px-5 md:py-24">
              <div className="text-center">
                <Eyebrow>Comment ça marche</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  Rien à acheter, rien à couper, rien à monter
                </h2>
              </div>
              <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((s, i) => {
                  const Icon = STEP_ICONS[i] ?? Snowflake;
                  return (
                    <li key={s.title} className="relative overflow-hidden rounded-xl2 border border-black/5 bg-cream p-6">
                      <span className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[7rem] font-semibold leading-none text-ink/[0.05]">
                        {i + 1}
                      </span>
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-night text-gold">
                        <Icon className="h-7 w-7" strokeWidth={1.8} />
                      </span>
                      <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">Étape {i + 1}</p>
                      <h3 className="mt-1 font-display text-2xl font-semibold text-ink">{s.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{s.description}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>

          {/* COMPARATIF */}
          <section className="bg-white">
            <div className="mx-auto max-w-5xl px-4 py-16 md:px-5 md:py-24">
              <div className="mx-auto max-w-2xl text-center">
                <Eyebrow>Le faire soi-même ou nous appeler</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  Vos fins de semaine, ou notre après-midi
                </h2>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                <div className="rounded-xl2 border border-black/5 bg-cream p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-ink">Vous-même</h3>
                  <ul className="mt-4 space-y-3">
                    {rinkCompare.diy.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink-soft">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-red-600" strokeWidth={3} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl2 border border-gold bg-night p-6 text-white shadow-lift sm:p-8">
                  <h3 className="text-lg font-bold">Avec {site.name}</h3>
                  <ul className="mt-4 space-y-3">
                    {rinkCompare.us.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] text-white/90">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={3} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* GARANTIES */}
          <section id="garanties" className="mx-auto max-w-6xl px-4 py-16 md:px-5 md:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Nos garanties</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                On prend le risque à votre place
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {rinkGuarantees.map((g) => (
                <div key={g.title} className="rounded-xl2 border border-gold/50 bg-white p-6 shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold-dark">
                    <ShieldCheck className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">{g.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{g.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* NOS PATINOIRES (apparaît dès qu'il y a des photos dans public/patinoire/) */}
          {(gallery.length > 0 || rinkMedia.clips.length > 0) && (
            <section className="bg-white">
              <div className="mx-auto max-w-6xl px-4 py-16 md:px-5 md:py-24">
                <div className="mx-auto max-w-2xl text-center">
                  <Eyebrow>Nos patinoires</Eyebrow>
                  <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                    Installées par notre équipe
                  </h2>
                </div>
                {gallery.length > 0 && (
                  <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {gallery.map((p) => (
                      <figure key={p.src} className="relative aspect-[4/3] overflow-hidden rounded-xl2 shadow-soft">
                        <Image src={p.src} alt="Patinoire de cour installée par notre équipe" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                      </figure>
                    ))}
                  </div>
                )}
                {rinkMedia.clips.length > 0 && (
                  <div className="mt-10">
                    <VideoReel clips={rinkMedia.clips} />
                  </div>
                )}
              </div>
            </section>
          )}

          {/* QUI ON EST */}
          <section className="relative overflow-hidden bg-night py-16 md:py-24">
            <div className="mx-auto max-w-2xl px-4 text-center">
              <Eyebrow dark>Qui on est</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Une vraie équipe d&apos;ici
              </h2>
              <p className="mt-3 text-white/70">
                {noelSeason.happyClients}+ clients satisfaits cette année pour l&apos;entretien extérieur de leur
                maison. Voici quelques contrats récents.
              </p>
            </div>
            <div className="mt-10">
              <PhotoMarquee photos={contracts.photos} />
            </div>
            {contracts.clips.length > 0 && (
              <div className="mx-auto mt-12 max-w-6xl px-4 md:px-5">
                <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-gold">En action sur le terrain</p>
                <VideoReel clips={contracts.clips} />
              </div>
            )}
          </section>

          {/* ÉQUIPE */}
          <section className="mx-auto max-w-6xl px-4 py-16 md:px-5 md:py-24">
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 shadow-lift md:aspect-[4/5]">
                <Image src={noelTeam.photo} alt="Notre équipe au travail" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div>
                <Eyebrow>Notre équipe</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  La même équipe, été comme hiver
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                  On est une équipe de {site.city}. L&apos;été, on lave des vitres, on vide des gouttières et on
                  nettoie à pression. Cet hiver, on met le même soin sur votre patinoire.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {TEAM_POINTS.map((p) => (
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

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-3xl px-4 pb-16 md:px-5 md:pb-24">
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Questions fréquentes
            </h2>
            <div className="mt-8 space-y-3">
              {rinkFaq.map((item) => (
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

          <RinkBooking />
        </main>

        <RinkFooter />
        <RinkMobileCta />
        <RinkTracking />
      </div>
    </RinkProvider>
  );
}
