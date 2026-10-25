import { Star, Users, BadgeCheck } from "lucide-react";
import { googleRating, noelSeason } from "@/lib/site";

export default function TrustBar() {
  const items = [
    {
      icon: (
        <span className="inline-flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-gold text-gold" />
          ))}
        </span>
      ),
      title: `${googleRating.score} sur Google`,
      text: "par nos clients",
    },
    {
      icon: <Users className="h-5 w-5 text-gold-dark" />,
      title: `${noelSeason.happyClients}+ clients`,
      text: "satisfaits cette année",
    },
    {
      icon: <BadgeCheck className="h-5 w-5 text-gold-dark" />,
      title: "Prix fixe",
      text: "affiché, sans surprise",
    },
  ];
  return (
    <section className="relative z-10 -mt-8 px-4 md:-mt-10 md:px-5">
      <div className="mx-auto grid max-w-4xl gap-3 rounded-xl2 bg-white p-4 shadow-lift sm:grid-cols-3 sm:p-2">
        {items.map((it) => (
          <div key={it.title} className="flex items-center gap-3 rounded-2xl px-3 py-2 sm:flex-col sm:gap-1.5 sm:py-4 sm:text-center">
            <div className="flex h-9 shrink-0 items-center">{it.icon}</div>
            <div>
              <p className="font-display text-lg font-semibold leading-tight text-ink">{it.title}</p>
              <p className="text-sm text-ink-soft">{it.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
