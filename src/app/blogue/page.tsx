import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/blog";
import { SiteHeader, SiteFooter, MobileCta, Eyebrow } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Blogue : conseils lumières de Noël",
  description: "Conseils pour l'installation de lumières de Noël au Québec : quand les poser, sécurité, choix des lumières.",
  alternates: { canonical: "/blogue" },
};

function frDate(d: string) {
  return new Date(`${d}T12:00:00`).toLocaleDateString("fr-CA", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogIndex() {
  return (
    <div className="flex min-h-screen flex-col bg-cream pb-20 md:pb-0">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-14 md:px-5 md:py-20">
        <Eyebrow>Blogue</Eyebrow>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">Conseils lumières de Noël</h1>
        <div className="mt-10 grid gap-5">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blogue/${p.slug}`} className="group rounded-xl2 bg-white p-6 shadow-soft transition-transform hover:-translate-y-1">
              <p className="text-xs text-ink-soft">{frDate(p.date)}</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink group-hover:text-gold-dark">{p.title}</h2>
              <p className="mt-2 text-ink-soft">{p.description}</p>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
      <MobileCta />
    </div>
  );
}
