import Link from "next/link";
import { Phone } from "lucide-react";
import { site, noelPackages } from "@/lib/site";
import Logo from "@/components/logo";

const nav = [
  { href: "/#forfaits", label: "Forfaits" },
  { href: "/#contrats", label: "Nos contrats" },
  { href: "/#equipe", label: "Équipe" },
  { href: "/blogue", label: "Blogue" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white shadow-[0_6px_24px_-16px_rgba(13,27,38,0.35)]">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 md:h-24 md:px-5">
        <Link href="/" aria-label={`${site.name} : accueil`} className="flex items-center py-2">
          <span className="md:hidden"><Logo height={44} priority /></span>
          <span className="hidden md:block"><Logo height={60} priority /></span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-ink-soft transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <Link href="/#reserver" className="rounded-full bg-night px-4 py-2 text-sm font-semibold text-white">
            Réserver
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const showLegal = !/^0+$/.test(site.neq);
  return (
    <footer className="bg-night text-white/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-sm md:grid-cols-3 md:px-5">
        <div>
          <p className="font-display text-lg text-white">{site.name}</p>
          <p className="mt-2">Installation de lumières de Noël à {site.region}.</p>
          <p className="mt-3">
            <a href={site.phoneHref} className="hover:text-white">{site.phone}</a>
            <br />
            <a href={site.emailHref} className="hover:text-white">{site.email}</a>
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Forfaits</p>
          <ul className="mt-2 space-y-1.5">
            {noelPackages.map((p) => (
              <li key={p.slug}>
                <Link href={`/forfaits/${p.slug}`} className="hover:text-white">
                  {p.name} · {p.price} $
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Ressources</p>
          <ul className="mt-2 space-y-1.5">
            <li><Link href="/blogue" className="hover:text-white">Blogue</Link></li>
            <li><Link href="/#faq" className="hover:text-white">Questions fréquentes</Link></li>
            <li><Link href="/#reserver" className="hover:text-white">Réserver</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs">
        © {new Date().getFullYear()} {site.name}
        {showLegal && ` · NEQ : ${site.neq} · TPS : ${site.tps} · TVQ : ${site.tvq}`}
      </div>
    </footer>
  );
}

// Barre d'action fixe en bas de l'écran sur cell.
export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-white/10 bg-night/95 p-3 backdrop-blur md:hidden">
      <a
        href={site.phoneHref}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 py-3 text-sm font-semibold text-white"
      >
        <Phone className="h-4 w-4" />
        Appeler
      </a>
      <Link href="/#reserver" className="inline-flex items-center justify-center rounded-full bg-gold py-3 text-sm font-semibold text-night">
        Réserver ma date
      </Link>
    </div>
  );
}

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span className={`text-xs font-bold uppercase tracking-[0.2em] ${dark ? "text-gold" : "text-gold-dark"}`}>
      {children}
    </span>
  );
}
