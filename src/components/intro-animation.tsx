"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/logo";

// Générateur déterministe (Park-Miller) — mêmes positions côté serveur et client.
function makeBubbles(seed: number, count: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  const next = () => (s = (s * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: count }, () => ({
    l: 1 + next() * 96,
    t: 3 + next() * 94,
    // biais vers les petites bulles => effet mousseux (beaucoup de petites, quelques grosses)
    s: 7 + Math.pow(next(), 1.7) * 46,
  }));
}
// Mousse dense : un jeu de bulles par bande (graines distinctes => pas de répétition).
const BAND_BUBBLES = [101, 277, 433].map((seed) => makeBubbles(seed, 110));

const BUBBLE_BG =
  "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), rgba(255,255,255,0.3) 46%, rgba(186,230,253,0.18) 72%)";
const BUBBLE_SHADOW =
  "inset 0 0 7px rgba(255,255,255,0.85), 0 1px 5px rgba(8,47,73,0.08)";

function Bubble({
  left,
  top,
  size,
  delay = 0,
}: {
  left: number | string;
  top: number | string;
  size: number;
  delay?: number;
}) {
  return (
    <span
      className="pv-bubble absolute rounded-full"
      style={{
        left: typeof left === "number" ? `${left}%` : left,
        top: typeof top === "number" ? `${top}%` : top,
        width: size,
        height: size,
        background: BUBBLE_BG,
        boxShadow: BUBBLE_SHADOW,
        border: "1px solid rgba(255,255,255,0.7)",
        animationDelay: `${delay}ms`,
      }}
    />
  );
}

// 3 bandes (3 coups) : pair => gauche->droite, impair => droite->gauche.
const BANDS = [
  { dir: "ltr", delay: 0 },
  { dir: "rtl", delay: 700 },
  { dir: "ltr", delay: 1400 },
] as const;
const BAND_H = 100 / BANDS.length; // hauteur d'une bande en %

export default function IntroAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const seen = sessionStorage.getItem("pv-intro-seen");

    if (reduce || seen) {
      setShow(false);
      return;
    }

    sessionStorage.setItem("pv-intro-seen", "1");
    document.documentElement.style.overflow = "hidden";
    const timer = setTimeout(() => setShow(false), 2600);
    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!show) document.documentElement.style.overflow = "";
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="pv-intro pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      aria-hidden
    >
      {/* Vitre savonneuse découpée en bandes, essuyées en zig-zag courbé */}
      {BANDS.map((band, b) => (
        <div
          key={b}
          className={`absolute inset-x-0 overflow-hidden ${
            band.dir === "ltr" ? "pv-band-ltr" : "pv-band-rtl"
          }`}
          style={{
            top: `${b * BAND_H}%`,
            height: `${BAND_H + 0.5}%`,
            animationDelay: `${band.delay}ms`,
          }}
        >
          {/* vitre savonneuse (givrée, masque la page) */}
          <div className="absolute inset-0 bg-white/75 backdrop-blur-lg" />
          {/* bulles de savon (mousse organique, dense) */}
          {BAND_BUBBLES[b].map((bubble, i) => (
            <Bubble
              key={i}
              left={bubble.l}
              top={bubble.t}
              size={bubble.s}
              delay={(i * 97 + b * 211) % 1400}
            />
          ))}
        </div>
      ))}

      {/* Marque au centre (se dissipe pendant l'essuyage) */}
      <div className="pv-intro__logowrap absolute inset-0 flex items-center justify-center">
        <div className="pv-intro__logo flex flex-col items-center gap-4">
          <Logo height={76} priority />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
            Local · Jeune · Fiable
          </span>
        </div>
      </div>

      {/* La raclette (squeegee) — suit le zig-zag, hauteur d'une bande */}
      <div
        className="pv-intro__squeegee absolute left-0 top-0 w-28"
        style={{ height: `${BAND_H}%`, transform: "translateX(-50%)" }}
      >
        {/* sillage humide autour de la lame */}
        <div className="absolute inset-y-0 left-1/2 w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-200/40 to-transparent" />
        {/* canal chromé */}
        <div className="absolute inset-y-1 left-1/2 w-2.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 shadow-soft" />
        {/* lame brillante (bord d'essuyage) */}
        <div className="absolute inset-y-0 left-1/2 w-[5px] -translate-x-1/2 bg-gradient-to-b from-white via-sky-100 to-white shadow-[0_0_16px_4px_rgba(14,165,233,0.55)]" />
        {/* poignée au centre de la lame */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-0.5">
          <div className="h-3.5 w-7 rounded-full bg-slate-300 shadow-soft" />
          <div className="h-8 w-14 rounded-full bg-gradient-to-l from-brand-dark to-brand shadow-lift" />
        </div>
        {/* amas de mousse poussé par la raclette */}
        <Bubble left="38%" top="18%" size={14} delay={120} />
        <Bubble left="30%" top="44%" size={20} delay={300} />
        <Bubble left="44%" top="66%" size={12} delay={80} />
        <Bubble left="58%" top="30%" size={16} delay={420} />
        <Bubble left="62%" top="72%" size={13} delay={220} />
      </div>
    </div>
  );
}
