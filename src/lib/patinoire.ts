// ===== Patinoires de cour clé en main =====
// Tout le contenu de la page d'accueil (offre patinoire) est ici.
// Change un prix, un texte ou un lien : la page se met à jour partout.

type RinkConfig = {
  bookingUrl: string;
  sheet: { url: string; contactField: string; detailField: string; source: string };
  clarityId: string;
  metaPixelId: string;
  regions: string[];
  installTime: string;
  spotsNote: string;
  priceNote: string;
  sizesNote: string;
  paymentNote: string;
  launch: { active: boolean; spots: number; slug: string; price: number };
  teardownPrice: number;
};

export const rink: RinkConfig = {
  // 1) AGENDA EN LIGNE : « prendre rendez-vous tout de suite ».
  //    Colle ici le lien de ton type d'événement Cal.com
  //    (ex. "https://cal.com/ton-compte/patinoire").
  //    Vide = la page affiche « on vous rappelle » et le téléphone seulement.
  bookingUrl: "",

  // 2) COPIE DE CHAQUE DEMANDE dans le Google Sheet, en plus du courriel.
  //    Mets url: "" pour désactiver.
  sheet: {
    url: "https://docs.google.com/forms/d/e/1FAIpQLSes2BmyLyCAxtvsh4j5pL2kYExfxDhg5Uu03XM6_PvB1aWtuQ/formResponse",
    contactField: "entry.1941387221",
    detailField: "entry.1904131408",
    source: "patino",
  },

  // 3) SUIVI : chargé seulement si le visiteur accepte les témoins. Vide = désactivé.
  clarityId: "zhcgpe9s6x",
  metaPixelId: "",

  // 4) OFFRE
  regions: ["Trois-Rivières et la Mauricie", "Grande région de Québec", "Grande région de Montréal"],
  // Durée annoncée : à ajuster quand tu auras chronométré tes premières installations.
  installTime: "une demi-journée",
  spotsNote: "Places limitées avant Noël",
  priceNote: "Prix fixe, taxes en sus. Matériel, installation et premier arrosage inclus.",
  sizesNote: "Deux tailles de base : 16 x 28 pi et 20 x 40 pi. Une autre grandeur? Appelez-nous.",
  paymentNote:
    "Aucun paiement en ligne. On confirme la grandeur, la date et le dépôt avec vous par téléphone.",

  // Places de lancement : mets active: false quand elles sont parties.
  launch: { active: true, spots: 3, slug: "classique", price: 2497 },

  // Démontage au printemps, facturé au moment du service.
  teardownPrice: 297,
};

export type RinkPackage = {
  slug: string;
  name: string;
  size: string;
  width: number; // pieds
  length: number; // pieds
  price: number;
  tagline: string;
  badge?: string;
  includes: readonly string[];
  highlight: boolean;
};

export const rinkPackages: readonly RinkPackage[] = [
  {
    slug: "compact",
    name: "Compact",
    size: "16 x 28 pi",
    width: 16,
    length: 28,
    price: 2697,
    tagline: "Pour les petites cours",
    includes: [
      "Patinoire de 16 x 28 pieds",
      "Bandes de bois tout le tour",
      "Toile blanche et supports",
      "Installation complète par notre équipe",
      "Premier arrosage dès qu'il fait assez froid",
      "Guide d'entretien simple",
    ],
    highlight: false,
  },
  {
    slug: "classique",
    name: "Classique",
    size: "20 x 40 pi",
    width: 20,
    length: 40,
    price: 2997,
    tagline: "Du hockey à 3 contre 3",
    badge: "Notre recommandation",
    includes: [
      "Patinoire de 20 x 40 pieds",
      "Bandes de bois tout le tour",
      "Toile blanche et supports",
      "Installation complète par notre équipe",
      "Premier arrosage dès qu'il fait assez froid",
      "Guide d'entretien simple",
    ],
    highlight: true,
  },
  {
    slug: "pro",
    name: "Pro",
    size: "20 x 40 pi",
    width: 20,
    length: 40,
    price: 3997,
    tagline: "Pour patiner le soir",
    includes: [
      "Tout le forfait Classique",
      "Lumières tout le tour pour patiner le soir",
      "2 filets de hockey",
      "Trousse d'entretien pour garder la glace lisse",
    ],
    highlight: false,
  },
];

export const rinkSteps = [
  {
    title: "Vous réservez",
    description:
      "Laissez votre numéro : on vous rappelle pour confirmer la grandeur et la date.",
    descriptionWithAgenda:
      "Choisissez une plage dans l'agenda, ou laissez votre numéro et on vous rappelle.",
  },
  {
    title: "On installe",
    description: `On arrive avec tout le matériel. Bandes et toile montées en ${rink.installTime}.`,
  },
  {
    title: "On arrose",
    description: "Dès que les nuits sont assez froides, on revient faire le premier arrosage.",
  },
  {
    title: "Vous patinez",
    description: "Tout l'hiver, à dix pas de votre porte. Le soir, la fin de semaine, quand vous voulez.",
  },
];

export const rinkGuarantees = [
  {
    title: "Installée à la date convenue",
    description:
      "Si on ne peut pas installer à la date réservée, votre dépôt vous est remboursé au complet.",
  },
  {
    title: "Toile garantie tout l'hiver",
    description: "Une fuite dans la toile cet hiver? On vient la réparer, sans frais.",
  },
  {
    title: "Premier arrosage inclus",
    description: "On revient quand il fait assez froid. Vous n'avez pas à deviner le bon moment.",
  },
];

export const rinkCompare = {
  diy: [
    "Magasiner la toile, le bois, les supports et les vis",
    "Couper et monter les bandes au froid",
    "Le risque d'une toile mal posée qui fuit au premier arrosage",
    "Une ou deux fins de semaine de travail",
  ],
  us: [
    "On arrive avec tout le matériel",
    `Installée en ${rink.installTime}`,
    "Toile posée bien à plat, bandes solides",
    "Premier arrosage fait par nous",
    "Le matériel reste à vous pour les prochains hivers",
  ],
};

export const rinkFaq = [
  {
    q: "Il fait encore doux. On peut installer quand même?",
    a: "Oui, c'est même le meilleur moment : le sol n'est pas encore gelé. On monte tout maintenant, puis on revient faire le premier arrosage dès que les nuits sont assez froides, autour de −5 °C et moins pendant quelques jours.",
  },
  {
    q: "Et si l'hiver est doux?",
    a: "La glace dépend du froid, comme pour toutes les patinoires extérieures : certains hivers donnent plus de jours de patin que d'autres. En installant tôt, vous êtes prêts dès les premières nuits froides. Et le matériel reste à vous pour les hivers suivants.",
  },
  {
    q: "Comment se passe le paiement?",
    a: "Aucun paiement en ligne sur ce site. On vous appelle pour confirmer la grandeur et la date, puis le dépôt se paie par carte de crédit. S'il nous est impossible d'installer à la date convenue, le dépôt vous est remboursé au complet.",
  },
  {
    q: "J'ai besoin de quoi?",
    a: "Une cour assez grande pour la patinoire choisie, avec environ 2 pieds libres de chaque côté, et un robinet extérieur ou un accès à l'eau. C'est tout.",
  },
  {
    q: "Ma cour est en pente, ça marche?",
    a: "Une légère pente, oui : on ajuste la hauteur des bandes. Pour une pente plus marquée, envoyez-nous une photo de votre cour et on vous dit si c'est faisable.",
  },
  {
    q: "Est-ce que ça abîme le gazon?",
    a: "Sous une toile blanche, le gazon s'en sort habituellement bien. Il peut jaunir un peu au printemps et reprend en quelques semaines. Démonter tôt au printemps aide à le protéger.",
  },
  {
    q: "Le matériel m'appartient?",
    a: "Oui. Les bandes, les supports et la toile restent à vous. L'automne prochain, vous pouvez remonter la patinoire vous-même ou nous rappeler.",
  },
  {
    q: "Et au printemps?",
    a: `Vous pouvez démonter vous-même ou nous le confier : ${rink.teardownPrice} $, facturé au moment du démontage.`,
  },
  {
    q: "Vous allez où?",
    a: `${rink.regions.join(", ")}. Ailleurs? Écrivez-nous, on regarde ça avec vous.`,
  },
  {
    q: "Et l'assurance?",
    a: "On vous conseille d'aviser votre assureur habitation que vous aurez une patinoire dans la cour. C'est rapide et ça évite les mauvaises surprises.",
  },
];

// Même résultat sur le serveur et dans le navigateur (pas de toLocaleString).
export function money(n: number) {
  return `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0")}\u00a0$`;
}
