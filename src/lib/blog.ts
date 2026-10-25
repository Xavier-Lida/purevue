// Articles du blogue. Pour en ajouter un : copie un bloc, change le slug, le titre et le texte.
export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // AAAA-MM-JJ
  sections: { heading?: string; paragraphs: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "quand-installer-lumieres-de-noel-quebec",
    title: "Quand installer ses lumières de Noël au Québec?",
    description:
      "Le meilleur moment pour poser vos lumières de Noël au Québec, et pourquoi novembre est plus simple que décembre.",
    date: "2026-10-22",
    sections: [
      {
        paragraphs: [
          "Au Québec, la vraie question n'est pas quand les allumer, mais quand les poser. Une fois la neige et la glace sur le toit, l'installation devient plus longue et plus risquée.",
        ],
      },
      {
        heading: "Novembre : le meilleur moment",
        paragraphs: [
          "En novembre, les toitures sont souvent encore sèches et les journées plus douces. C'est le moment idéal pour installer les lumières, même si vous attendez décembre pour les allumer.",
          "Rien ne vous oblige à les allumer tout de suite : une minuterie ou un simple interrupteur vous laisse choisir le moment.",
        ],
      },
      {
        heading: "Et le démontage?",
        paragraphs: [
          "Le démontage se fait en janvier, quand les Fêtes sont passées. C'est souvent la partie que les gens repoussent, parce qu'il fait froid et que la toiture est glacée.",
        ],
      },
      {
        heading: "En résumé",
        paragraphs: [
          "Posez en novembre, allumez quand vous voulez, démontez en janvier. Et si vous préférez ne pas monter dans l'échelle, on s'en occupe à prix fixe.",
        ],
      },
    ],
  },
  {
    slug: "installer-ses-lumieres-soi-meme-ou-engager",
    title: "Installer ses lumières de Noël soi-même ou engager quelqu'un?",
    description:
      "Temps, sécurité, équipement : ce qu'il faut considérer avant de monter dans l'échelle cet automne.",
    date: "2026-10-22",
    sections: [
      {
        paragraphs: [
          "Poser des lumières de Noël a l'air simple. En pratique, ça veut dire passer plusieurs heures dans une échelle, souvent dans le froid, avec des rallonges et des attaches à gérer.",
        ],
      },
      {
        heading: "La sécurité d'abord",
        paragraphs: [
          "Les chutes d'échelle font partie des accidents domestiques les plus fréquents. Le risque augmente avec le froid, le vent et une toiture humide. Pour une personne âgée ou quelqu'un qui n'est pas à l'aise en hauteur, c'est la raison principale de déléguer.",
        ],
      },
      {
        heading: "Le temps",
        paragraphs: [
          "Entre sortir les boîtes, démêler les fils, tester les lumières, les poser et les enlever en janvier, on parle facilement d'une fin de semaine complète.",
        ],
      },
      {
        heading: "Le coût",
        paragraphs: [
          "Avec un prix fixe, vous savez d'avance ce que vous payez. Notre forfait Essentiel installe vos propres lumières pour 349 $, démontage inclus. Le forfait Signature fournit les lumières DEL et la minuterie pour 749 $.",
        ],
      },
    ],
  },
  {
    slug: "lumieres-del-blanc-chaud-ou-multicolores",
    title: "Lumières DEL blanc chaud ou multicolores : lesquelles choisir?",
    description:
      "Le style, la consommation et la durée de vie : comment choisir les bonnes lumières pour votre maison.",
    date: "2026-10-22",
    sections: [
      {
        heading: "Pourquoi les DEL",
        paragraphs: [
          "Les lumières DEL consomment beaucoup moins d'électricité que les anciennes ampoules incandescentes et durent beaucoup plus longtemps. Elles chauffent aussi très peu, ce qui est plus sécuritaire.",
        ],
      },
      {
        heading: "Blanc chaud : le choix élégant",
        paragraphs: [
          "Le blanc chaud donne un look classique et chaleureux, qui met en valeur l'architecture de la maison. C'est le style qu'on installe avec le forfait Signature.",
        ],
      },
      {
        heading: "Multicolores : plus festif",
        paragraphs: [
          "Les lumières multicolores donnent un look plus ludique, souvent apprécié des familles avec des enfants. Si vous les avez déjà, notre forfait Essentiel les installe pour vous.",
        ],
      },
    ],
  },
];
