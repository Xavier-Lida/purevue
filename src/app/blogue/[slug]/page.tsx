import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";
import { SiteHeader, SiteFooter, MobileCta } from "@/components/site-chrome";
import PackageCards from "@/components/package-cards";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blogue/${post.slug}` },
    openGraph: { title: post.title, description: post.description, type: "article", locale: "fr_CA", url: `/blogue/${post.slug}` },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
  };

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-20 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-4 py-14 md:px-5 md:py-20">
          <Link href="/blogue" className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Blogue
          </Link>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-ink">{post.title}</h1>
          <p className="mt-4 text-lg text-ink-soft">{post.description}</p>
          <div className="mt-10 space-y-8">
            {post.sections.map((s, i) => (
              <section key={i}>
                {s.heading && <h2 className="font-display text-2xl font-semibold text-ink">{s.heading}</h2>}
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="mt-3 text-[17px] leading-relaxed text-ink/85">{p}</p>
                ))}
              </section>
            ))}
          </div>
          <div className="mt-12 rounded-xl2 bg-night p-6 text-white">
            <p className="font-display text-2xl">Pas envie de monter dans l&apos;échelle?</p>
            <p className="mt-2 text-white/70">On installe vos lumières à prix fixe, démontage en janvier inclus.</p>
            <Link href="/#reserver" className="mt-5 inline-flex rounded-full bg-gold px-5 py-3 font-semibold text-night">
              Réserver ma date
            </Link>
          </div>
        </article>
        <section className="mx-auto max-w-6xl px-4 pb-16 md:px-5">
          <h2 className="text-center font-display text-3xl font-semibold text-ink">Nos forfaits</h2>
          <div className="mt-8"><PackageCards /></div>
        </section>
      </main>
      <SiteFooter />
      <MobileCta />
    </div>
  );
}
