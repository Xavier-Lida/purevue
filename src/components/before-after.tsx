"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Avant / après AUTOMATIQUE : une « raclette » balaie l'image toute seule,
// en boucle, dès que la carte est à l'écran. Rien à glisser, marche pareil sur cell.
export default function BeforeAfter({
  before,
  after,
  label,
  aspectClass = "aspect-[3/2]",
}: {
  before: string;
  after: string;
  label: string;
  aspectClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setPlaying(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => setPlaying(e.isIntersecting),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl2 border border-black/5 bg-white shadow-soft">
      <div
        ref={ref}
        className={`pv-wipe relative ${aspectClass} w-full overflow-hidden ${playing ? "is-playing" : ""}`}
      >
        {/* APRÈS (dessous) */}
        <Image
          src={after}
          alt={`${label}, après`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-soft">
          Après
        </span>

        {/* AVANT (dessus, effacé par la raclette) */}
        <div className="pv-wipe__before absolute inset-0">
          <Image
            src={before}
            alt={`${label}, avant`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white">
            Avant
          </span>
        </div>

        {/* La raclette */}
        <div aria-hidden className="pv-wipe__line absolute inset-y-0 w-1 -translate-x-1/2">
          <div className="absolute inset-0 rounded-full bg-white shadow-[0_0_18px_6px_rgba(14,165,233,0.55)]" />
          <div className="absolute left-1/2 top-1/2 h-14 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-brand to-brand-dark shadow-lift" />
        </div>
      </div>
      <p className="px-5 py-4 text-center text-sm font-semibold text-ink">
        {label}
      </p>
    </div>
  );
}
