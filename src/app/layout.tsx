import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const siteUrl = "https://www.pure-vue.ca";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Installation de lumières de Noël à Trois-Rivières · Pure Vue",
    template: "%s · Pure Vue",
  },
  description:
    "Installation et démontage de lumières de Noël à Trois-Rivières et les environs. Lumières DEL blanc chaud fournies, sapin installé et décoré. Soumission gratuite.",
  keywords: [
    "lavage de vitres",
    "nettoyage de vitres",
    "Trois-Rivières",
    "pellicule teintée",
    "nettoyage haute pression",
    "nettoyage de gouttières",
    "Pure Vue",
  ],
  authors: [{ name: "Pure Vue" }],
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: siteUrl,
    siteName: "Pure Vue",
    title: "Lumières de Noël installées pour vous · Trois-Rivières",
    description:
      "On pose, on entretient, on démonte. Forfaits à partir de 349 $. Places limitées.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-CA">
      <body className={`${geist.variable} ${fraunces.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
