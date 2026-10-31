import Link from "next/link";
import { Check, TreePine, ArrowRight } from "lucide-react";
import { noelPackages } from "@/lib/site";
import PackageVisual from "@/components/package-visual";

function money(n: number) {
  return `${n.toLocaleString("fr-CA")} $`;
}

export default function PackageCards({ exclude }: { exclude?: string }) {
  const list = noelPackages.filter((p) => p.slug !== exclude);
  return (
    <div className={`grid gap-5 sm:grid-cols-2 ${list.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {list.map((pkg) => {
        const isTree = pkg.slug === "sapin";
        const dark = pkg.highlight;
        return (
          <article
            key={pkg.slug}
            className={`relative flex flex-col rounded-xl2 border p-6 transition-transform duration-300 hover:-translate-y-1 ${
              dark ? "border-gold bg-night text-white shadow-lift" : isTree ? "border-pine/20 bg-pine/5" : "border-black/5 bg-white shadow-soft"
            }`}
          >
            {dark && (
              <span className="absolute -top-3 left-6 z-10 rounded-full bg-gold px-3 py-1 text-xs font-bold text-night">
                Le plus choisi
              </span>
            )}
            <Link href={`/forfaits/${pkg.slug}`} className="-mx-2 -mt-2 mb-5 block overflow-hidden rounded-2xl ring-1 ring-black/10">
              <PackageVisual pkg={pkg} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
            </Link>
            <div className="flex items-center gap-2">
              {isTree && <TreePine className="h-5 w-5 text-pine" />}
              <h3 className="text-lg font-bold">{pkg.name}</h3>
            </div>
            <p className={`mt-1 text-sm ${dark ? "text-white/70" : "text-ink-soft"}`}>{pkg.tagline}</p>
            <p className="mt-5 flex items-baseline gap-2">
              <span className={`font-display text-4xl font-semibold ${dark ? "text-gold" : "text-ink"}`}>{money(pkg.price)}</span>
              <span className={`text-xs ${dark ? "text-white/60" : "text-ink-soft"}`}>prix fixe</span>
            </p>
            {pkg.renewal && (
              <p className={`mt-3 inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold ${dark ? "bg-white/10 text-gold-soft" : "bg-gold/15 text-gold-dark"}`}>
                Dès la 2e année : {money(pkg.renewal)}
              </p>
            )}
            <ul className="mt-5 flex-1 space-y-2.5">
              {pkg.includes.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[15px]">
                  <Check className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-gold" : isTree ? "text-pine" : "text-gold-dark"}`} strokeWidth={3} />
                  <span className={dark ? "text-white/90" : "text-ink-soft"}>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-2">
              <Link
                href="/#reserver"
                className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold ${
                  dark ? "bg-gold text-night" : isTree ? "bg-pine text-white" : "bg-night text-white"
                }`}
              >
                Réserver {pkg.name === "Sapin seulement" ? "mon sapin" : pkg.name}
              </Link>
              <Link
                href={`/forfaits/${pkg.slug}`}
                className={`inline-flex items-center justify-center gap-1 py-1 text-sm font-medium ${dark ? "text-white/70" : "text-ink-soft"} hover:underline`}
              >
                Tout le détail <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
