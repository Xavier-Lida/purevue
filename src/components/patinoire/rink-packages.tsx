"use client";

import Image from "next/image";
import { Camera, Check } from "lucide-react";
import { money, rink, rinkPackages } from "@/lib/patinoire";
import type { RinkPackageImage } from "@/lib/patinoire-images";
import { track, useRink } from "@/components/patinoire/rink-context";
import RinkPackageArt from "@/components/patinoire/rink-package-art";

export const LAUNCH_PLAN = "Place de lancement (Classique)";

// Les forfaits, chacun avec sa taille de base. Cliquer « Choisir » préremplit le formulaire en bas de page.
// images : photos trouvées dans public/patinoire/forfaits/ (sinon, un dessin).
export default function RinkPackages({ images = {} }: { images?: Record<string, RinkPackageImage> }) {
  const { setPlan } = useRink();
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {rinkPackages.map((pkg) => {
        const dark = pkg.highlight;
        const image = images[pkg.slug];
        return (
          <article
            key={pkg.slug}
            className={`relative flex flex-col rounded-xl2 border p-6 transition-transform duration-300 hover:-translate-y-1 ${
              dark ? "border-gold bg-night text-white shadow-lift" : "border-black/5 bg-white shadow-soft"
            }`}
          >
            {pkg.badge && (
              <span className="absolute -top-3 left-6 z-10 rounded-full bg-gold px-3 py-1 text-xs font-bold text-night">
                {pkg.badge}
              </span>
            )}
            <div className="-mx-2 -mt-2 mb-5 overflow-hidden rounded-2xl ring-1 ring-black/10">
              {image ? (
                <div className="relative aspect-[2/1] w-full">
                  <Image src={image.src} alt={`Patinoire de ${pkg.size}, forfait ${pkg.name}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  {image.example && (
                    <span className="absolute bottom-1.5 right-1.5 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white/85">
                      Image d&apos;exemple
                    </span>
                  )}
                </div>
              ) : (
                <RinkPackageArt variant={pkg.slug} label={pkg.size} />
              )}
            </div>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold">{pkg.name}</h3>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${dark ? "bg-white/10 text-gold-soft" : "bg-gold/15 text-gold-dark"}`}>
                {pkg.size}
              </span>
            </div>
            <p className={`mt-1 text-sm ${dark ? "text-white/70" : "text-ink-soft"}`}>{pkg.tagline}</p>
            <p className="mt-5 flex items-baseline gap-2">
              <span className={`font-display text-4xl font-semibold ${dark ? "text-gold" : "text-ink"}`}>{money(pkg.price)}</span>
              <span className={`text-xs ${dark ? "text-white/60" : "text-ink-soft"}`}>prix fixe</span>
            </p>
            <ul className="mt-5 flex-1 space-y-2.5">
              {pkg.includes.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[15px]">
                  <Check className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-gold" : "text-gold-dark"}`} strokeWidth={3} />
                  <span className={dark ? "text-white/90" : "text-ink-soft"}>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#reserver"
              onClick={() => {
                setPlan(pkg.name);
                track(`choix_${pkg.slug}`);
              }}
              className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold ${
                dark ? "bg-gold text-night" : "bg-night text-white"
              }`}
            >
              Choisir {pkg.name}
            </a>
          </article>
        );
      })}
    </div>
  );
}

// Places de lancement à prix réduit, en échange du droit de filmer.
export function RinkLaunchOffer() {
  const { setPlan } = useRink();
  if (!rink.launch.active) return null;
  const pkg = rinkPackages.find((p) => p.slug === rink.launch.slug);
  if (!pkg) return null;
  return (
    <div className="mx-auto mt-8 flex max-w-4xl flex-col items-start gap-4 rounded-xl2 border border-gold/60 bg-gold/10 p-5 sm:flex-row sm:items-center sm:p-6">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold text-night">
        <Camera className="h-6 w-6" strokeWidth={1.8} />
      </span>
      <div className="flex-1">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">
          Offre de lancement · {rink.launch.spots} places
        </p>
        <p className="mt-1 text-[15px] leading-relaxed text-ink">
          Le forfait {pkg.name} à <strong>{money(rink.launch.price)}</strong> au lieu de {money(pkg.price)}, en
          échange du droit de filmer l&apos;installation et de poser une pancarte sur votre terrain.
        </p>
      </div>
      <a
        href="#reserver"
        onClick={() => {
          setPlan(LAUNCH_PLAN);
          track("choix_lancement");
        }}
        className="inline-flex shrink-0 items-center justify-center rounded-full bg-night px-5 py-3 text-sm font-semibold text-white"
      >
        Je veux une place
      </a>
    </div>
  );
}
