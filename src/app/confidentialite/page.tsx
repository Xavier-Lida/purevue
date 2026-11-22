import type { Metadata } from "next";
import { site } from "@/lib/site";
import { RinkHeader, RinkFooter } from "@/components/patinoire/rink-chrome";

// Politique de confidentialité (Loi 25). À relire et ajuster au besoin.
export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Comment ${site.name} recueille, utilise et protège vos renseignements personnels.`,
  alternates: { canonical: "/confidentialite" },
};

const sections = [
  {
    title: "Ce qu'on recueille",
    body: [
      "Quand vous remplissez un formulaire ou prenez rendez-vous : votre nom, votre numéro de téléphone, votre courriel si vous le donnez, votre région, le forfait qui vous intéresse et les dimensions approximatives de votre cour.",
      "Si vous l'acceptez dans la fenêtre de consentement : des données de navigation (pages vues, clics, défilement) servant à mesurer l'achalandage et à améliorer le site.",
    ],
  },
  {
    title: "Pourquoi on le recueille",
    body: [
      "Pour vous rappeler, préparer votre prix, fixer une date et réaliser le service demandé.",
      "Pour comprendre comment le site est utilisé et mesurer le résultat de nos publicités, seulement si vous y avez consenti.",
    ],
  },
  {
    title: "Avec qui c'est partagé",
    body: [
      "On ne vend pas vos renseignements. Ils sont traités par les fournisseurs qui font fonctionner le site : l'hébergement (Vercel), l'envoi de courriels de formulaire (Formspree ou Resend), le tableur où les demandes sont notées (Google) et l'agenda en ligne (Cal.com).",
      "Avec votre consentement seulement : Microsoft Clarity (mesure d'audience) et Meta (mesure des publicités).",
      "Ces fournisseurs peuvent conserver des données à l'extérieur du Québec.",
    ],
  },
  {
    title: "Combien de temps on les garde",
    body: [
      "Le temps nécessaire pour répondre à votre demande et réaliser le service, puis le temps exigé par nos obligations fiscales et légales. Vous pouvez demander leur suppression en tout temps.",
    ],
  },
  {
    title: "Vos droits",
    body: [
      "Vous pouvez demander à consulter vos renseignements, à les faire corriger ou à les faire supprimer, et retirer votre consentement en tout temps.",
      "Pour retirer votre consentement à la mesure d'audience, effacez les données de ce site dans votre navigateur : la fenêtre de consentement réapparaîtra.",
    ],
  },
];

export default function ConfidentialitePage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <RinkHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-14 md:px-5 md:py-20">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Politique de confidentialité</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          {site.name} respecte votre vie privée. Voici, en clair, ce qu&apos;on fait de vos renseignements
          personnels.
        </p>

        {sections.map((s) => (
          <section key={s.title} className="mt-10">
            <h2 className="font-display text-2xl font-semibold text-ink">{s.title}</h2>
            {s.body.map((p) => (
              <p key={p} className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </section>
        ))}

        <section className="mt-10 rounded-xl2 border border-black/5 bg-white p-6">
          <h2 className="font-display text-2xl font-semibold text-ink">Responsable de la protection des renseignements personnels</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            La personne responsable est le propriétaire de {site.name}. Pour toute question ou demande :{" "}
            <a href={site.emailHref} className="font-semibold text-ink underline">
              {site.email}
            </a>{" "}
            ou{" "}
            <a href={site.phoneHref} className="font-semibold text-ink underline">
              {site.phone}
            </a>
            .
          </p>
        </section>
      </main>
      <RinkFooter />
    </div>
  );
}
