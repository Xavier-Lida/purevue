// Infos d'entreprise — modifie ici et tout le site se met à jour.
export const site = {
  name: "Pure Vue",
  legalName: "Nettoyage & Services",
  tagline: "Local · Jeune · Fiable",
  phone: "819-944-4661",
  phoneHref: "tel:+18199444661",
  email: "purevue64@gmail.com",
  emailHref: "mailto:purevue64@gmail.com",
  city: "Trois-Rivières",
  region: "Trois-Rivières et les environs",
  // Numéros d'enregistrement — REMPLACE par tes vrais numéros.
  neq: "0000000000",
  tps: "000000000 RT0001",
  tvq: "0000000000 TQ0001",
} as const;

export const services = [
  {
    icon: "Sparkles",
    title: "Lavage de vitres",
    description:
      "Intérieur et extérieur, sans trace. Fenêtres, portes-patio, puits de lumière et verrières.",
  },
  {
    icon: "SunMedium",
    title: "Pellicule teintée & solaire",
    description:
      "Pose de pellicule teintée et de protection solaire pour réduire la chaleur, les UV et l'éblouissement.",
  },
  {
    icon: "Droplets",
    title: "Nettoyage haute pression",
    description:
      "Entrées, patios, revêtements et trottoirs. On redonne de l'éclat à vos surfaces extérieures.",
  },
  {
    icon: "Waves",
    title: "Nettoyage de gouttières",
    description:
      "On vide et on rince vos gouttières pour éviter les blocages et protéger votre toiture.",
  },
  {
    icon: "Trash2",
    title: "Nettoyage de bacs",
    description:
      "Lavage et désinfection de vos bacs à ordures et de recyclage. Fini les odeurs.",
  },
  {
    icon: "Building2",
    title: "Résidentiel & commercial",
    description:
      "Maisons, commerces et copropriétés. Horaire flexible pour les entreprises.",
  },
] as const;

export const advantages = [
  {
    icon: "MapPin",
    title: "Local",
    description:
      "Une équipe d'ici, à Trois-Rivières, qui connaît la région et ses bâtiments.",
  },
  {
    icon: "Zap",
    title: "Rapide & personnalisé",
    description:
      "Service efficace et adapté à vos besoins, du résidentiel jusqu'au commercial.",
  },
  {
    icon: "BadgeDollarSign",
    title: "Prix transparents",
    description: "Une soumission claire, sans surprise ni frais cachés.",
  },
  {
    icon: "ShieldCheck",
    title: "Travail professionnel",
    description:
      "Équipement professionnel et résultats impeccables, à chaque visite.",
  },
] as const;

// Chiffres affichés dans la barre de stats (animés au défilement).
// REMPLACE par tes vrais chiffres.
export const stats = [
  { value: 350, suffix: "+", label: "Contrats réalisés" },
  { value: 5, suffix: ".0", label: "Étoiles sur Google", decimals: false },
  { value: 100, suffix: "%", label: "Satisfaction garantie" },
  { value: 24, suffix: "h", label: "Réponse rapide" },
] as const;

// Comparaisons avant / après (vraies photos dans /public/avant-apres/).
export const beforeAfter = [
  {
    before: "/avant-apres/fenetre-avant.jpg",
    after: "/avant-apres/fenetre-apres.jpg",
    label: "Lavage de fenêtre — rail et cadre",
  },
  {
    before: "/avant-apres/muret-avant.jpg",
    after: "/avant-apres/muret-apres.jpg",
    label: "Nettoyage haute pression — muret de pierre",
  },
] as const;

// Galerie de photos de contrats.
// Remplace les URLs par tes photos dans /public/galerie/ (ex: "/galerie/01.jpg").
export const gallery = [
  { src: "https://picsum.photos/seed/pv-job-1/800/800", caption: "Lavage de vitres résidentiel" },
  { src: "https://picsum.photos/seed/pv-job-2/800/800", caption: "Nettoyage haute pression" },
  { src: "https://picsum.photos/seed/pv-job-3/800/800", caption: "Vitrine de commerce" },
  { src: "https://picsum.photos/seed/pv-job-4/800/800", caption: "Pellicule teintée" },
  { src: "https://picsum.photos/seed/pv-job-5/800/800", caption: "Nettoyage de gouttières" },
  { src: "https://picsum.photos/seed/pv-job-6/800/800", caption: "Copropriété" },
  { src: "https://picsum.photos/seed/pv-job-7/800/800", caption: "Puits de lumière" },
  { src: "https://picsum.photos/seed/pv-job-8/800/800", caption: "Bacs nettoyés" },
] as const;

// Notre équipe.
// REMPLACE les noms, rôles et photos (mets tes photos dans /public/equipe/).
export const team = [
  { name: "Prénom Nom", role: "Fondateur", photo: "https://i.pravatar.cc/400?img=12" },
  { name: "Prénom Nom", role: "Technicien", photo: "https://i.pravatar.cc/400?img=33" },
  { name: "Prénom Nom", role: "Technicienne", photo: "https://i.pravatar.cc/400?img=45" },
] as const;

// Avis clients.
// REMPLACE par tes vrais avis Google.
export const reviews = [
  {
    name: "Marie-Claude L.",
    text: "Service impeccable et rapide. Mes fenêtres n'ont jamais été aussi propres, aucune trace. Je recommande à 100 %.",
    date: "Mai 2026",
  },
  {
    name: "Sébastien G.",
    text: "Équipe jeune, ponctuelle et professionnelle. Bon prix, travail soigné. On va les reprendre chaque année.",
    date: "Avril 2026",
  },
  {
    name: "Julie T.",
    text: "Très satisfaite du nettoyage haute pression de mon entrée. Résultat comme neuf et soumission claire dès le départ.",
    date: "Avril 2026",
  },
  {
    name: "Marc-André D.",
    text: "Vitrine de mon commerce nickel. Horaire flexible, ils se sont adaptés à mes heures d'ouverture. Merci !",
    date: "Mars 2026",
  },
] as const;

export const googleRating = { score: "5.0" } as const;

// ===== Lumières de Noël =====
// Modifie les prix et les textes ici, tout le site se met à jour.

// Agenda en ligne : colle ici le lien de ta page de réservation Cal.com
// (ex. "https://cal.com/purevue/installation"). Vide = on affiche le téléphone et le formulaire.
export const booking: { url: string } = {
  url: "https://cal.com/pure-vue-csu9ta/installation-de-lumieres-de-noel",
};

export const noelSeason = {
  slogan: "On lave vos vitres l'été. On les illumine l'hiver.",
  happyClients: 225, // clients satisfaits cette année (affiché « 225+ »)
  bookingNote: "Places limitées pour la saison",
  installWindow: "Installation de début novembre à la mi-décembre",
  removalWindow: "Démontage en janvier inclus",
  priceNote: "Prix fixe, taxes en sus. Maison de 1 ou 2 étages.",
} as const;

export type NoelPackage = {
  slug: string;
  name: string;
  price: number;
  tagline: string;
  idealFor: string;
  summary: string;
  includes: readonly string[];
  goodToKnow: readonly string[];
  highlight: boolean;
  image?: string; // image d'exemple (public/forfaits/...). Sans image = dessin.
  renewal?: number; // prix de réinstallation dès la 2e année (lumières déjà fournies)
};

export const noelPackages: readonly NoelPackage[] = [
  {
    slug: "essentiel",
    image: "/forfaits/essentiel.jpg",
    name: "Essentiel",
    price: 349,
    tagline: "Vos lumières, notre échelle",
    idealFor: "Vous avez déjà vos lumières",
    summary:
      "On installe les lumières que vous avez déjà sur la bordure du toit de votre façade avant, puis on revient tout enlever en janvier.",
    includes: [
      "Installation de vos lumières sur la bordure du toit, façade avant",
      "Pose avec attaches (aucun clou, aucun trou dans la toiture)",
      "Vérification des lumières et des rallonges avant la pose",
      "Démontage en janvier, lumières rangées dans vos boîtes",
    ],
    goodToKnow: [
      "Vos lumières doivent être fonctionnelles et en quantité suffisante",
      "Maison de 1 ou 2 étages",
    ],
    highlight: false,
  },
  {
    slug: "signature",
    image: "/forfaits/signature-2.jpg",
    renewal: 449,
    name: "Signature",
    price: 749,
    tagline: "Clé en main, rien à acheter",
    idealFor: "Le plus choisi",
    summary:
      "On fournit des lumières DEL blanc chaud de qualité commerciale, on les installe sur votre façade avant et sur un arbre ou une haie, et on s'occupe de tout jusqu'au démontage.",
    includes: [
      "Lumières DEL blanc chaud de qualité commerciale fournies",
      "Bordure du toit, façade avant",
      "Un arbre ou une haie devant la maison",
      "Minuterie fournie : ça s'allume et s'éteint tout seul",
      "Réparation sans frais pendant la saison",
      "Démontage en janvier et entreposage des lumières",
    ],
    goodToKnow: [
      "Dès la 2e année : 449 $ seulement. Les lumières sont déjà payées, vous payez juste le service",
      "Les lumières restent à nous : on les entrepose et on les entretient pour vous",
      "Maison de 1 ou 2 étages",
    ],
    highlight: true,
  },
  {
    slug: "prestige",
    image: "/forfaits/prestige-3.jpg",
    renewal: 899,
    name: "Prestige",
    price: 1199,
    tagline: "Dedans comme dehors",
    idealFor: "L'expérience complète",
    summary:
      "Tout le forfait Signature, plus un sapin naturel livré, installé et décoré dans votre salon, et une couronne pour la porte d'entrée.",
    includes: [
      "Tout ce qui est inclus dans le forfait Signature",
      "Sapin naturel de 6 à 7 pieds inclus, livré et installé",
      "Décoration du sapin avec vos décorations",
      "Couronne de porte d'entrée incluse",
      "Ramassage du sapin en janvier",
    ],
    goodToKnow: [
      "Dès la 2e année : 899 $. Les lumières sont déjà fournies",
      "Maison de 1 ou 2 étages",
    ],
    highlight: false,
  },
  {
    slug: "sapin",
    image: "/forfaits/sapin.jpg",
    name: "Sapin seulement",
    price: 349,
    tagline: "Juste un beau sapin",
    idealFor: "Pas de lumières extérieures",
    summary:
      "On livre un sapin naturel, on l'installe dans votre salon et on le décore avec vos décorations. En janvier, on revient le chercher.",
    includes: [
      "Sapin naturel de 6 à 7 pieds inclus",
      "Livraison et installation sur pied",
      "Décoration avec vos décorations",
      "Ramassage du sapin en janvier",
    ],
    goodToKnow: ["S'ajoute aussi aux forfaits Essentiel et Signature"],
    highlight: false,
  },
];

export const noelSteps = [
  {
    title: "Choisissez votre forfait",
    description: "Prix fixe affiché. Vous savez exactement ce que vous payez.",
  },
  {
    title: "Réservez votre plage",
    description: "En ligne, en deux minutes. Pas sûr? Appelez-nous.",
  },
  {
    title: "On installe",
    description: "En hauteur et en sécurité. Vous rentrez le soir, c'est allumé.",
  },
  {
    title: "On démonte en janvier",
    description: "Pas besoin de geler dans l'échelle après les Fêtes.",
  },
] as const;

export const noelTeam = {
  photo: "/contrats/03-equipe.jpg",
  title: "Des étudiants d'ici, formés pour travailler en sécurité",
  text: "Notre équipe est formée d'étudiants de la région de Trois-Rivières. Chacun est formé au travail en hauteur et à l'utilisation sécuritaire de l'échelle avant sa première installation. Le même soin qu'on met sur vos vitres l'été, on le met sur vos lumières l'hiver.",
  points: [
    "Formés au travail en hauteur",
    "Équipement professionnel",
    "Ponctuels et respectueux de votre terrain",
  ],
} as const;

export const noelFaq = [
  {
    q: "Le prix est-il vraiment fixe?",
    a: "Oui. Le prix affiché est le prix que vous payez, taxes en sus, pour une maison de 1 ou 2 étages. Pas de soumission, pas de surprise.",
  },
  {
    q: "Qu'est-ce qui est inclus exactement?",
    a: "Chaque forfait a sa page avec la liste complète. En résumé : la pose, le démontage en janvier, et selon le forfait, les lumières, la minuterie, l'entretien ou le sapin.",
  },
  {
    q: "Comment je réserve?",
    a: "Choisissez votre forfait, puis une plage dans notre agenda en ligne. Si vous hésitez, appelez-nous et on vous conseille.",
  },
  {
    q: "Les lumières du forfait Signature sont-elles à moi?",
    a: "Non, elles restent à nous, et c'est à votre avantage : on les entrepose, on les entretient, et dès la 2e année vous payez seulement le service. Signature passe de 749 $ à 449 $, Prestige de 1 199 $ à 899 $.",
  },
  {
    q: "Qu'est-ce qui est décoré exactement?",
    a: "La bordure du toit de la façade avant, celle qu'on voit de la rue. Avec Signature et Prestige, on ajoute un arbre ou une haie devant la maison. Les côtés et l'arrière ne sont pas inclus : appelez-nous pour un prix sur mesure.",
  },
  {
    q: "Et si une lumière brûle pendant la saison?",
    a: "Avec Signature et Prestige, on revient la réparer sans frais.",
  },
  {
    q: "Ma maison a 3 étages, ou c'est un commerce.",
    a: "Appelez-nous : on vous fait un prix sur mesure pour les maisons de 3 étages et les commerces.",
  },
] as const;
