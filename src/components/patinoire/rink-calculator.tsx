"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { money, recommendRink, rinkPackages } from "@/lib/patinoire";
import { UNDECIDED, track, useRink } from "@/components/patinoire/rink-context";

const NOTES: Record<string, string> = {
  classique: "Assez grand pour du hockey à 3 contre 3.",
  compact: "Parfait pour patiner en famille et pratiquer le coup de patin.",
};

// Le visiteur glisse les dimensions de sa cour : on lui montre la patinoire qui entre.
export default function RinkCalculator() {
  const { setPlan, setYard } = useRink();
  const [width, setWidth] = useState(35);
  const [length, setLength] = useState(55);
  const moved = useRef(false);

  const rec = recommendRink(width, length);

  function update(nextWidth: number, nextLength: number) {
    setWidth(nextWidth);
    setLength(nextLength);
    setYard({ width: nextWidth, length: nextLength });
    setPlan(recommendRink(nextWidth, nextLength)?.name ?? UNDECIDED);
    if (!moved.current) {
      moved.current = true;
      track("calculateur");
    }
  }

  // Dessin vu de haut, à l'échelle.
  const scale = Math.min(236 / width, 236 / length);
  const lotW = width * scale;
  const lotH = length * scale;
  const lotX = (320 - lotW) / 2;
  const lotY = 62 + (236 - lotH) / 2;
  const rinkW = (rec ? rec.width : Math.max(8, width - 4)) * scale;
  const rinkH = (rec ? rec.length : Math.max(12, length - 4)) * scale;
  const rinkX = 160 - rinkW / 2;
  const rinkY = lotY + (lotH - rinkH) / 2;
  const minPrice = Math.min(...rinkPackages.map((p) => p.price));

  return (
    <div className="mx-auto grid max-w-5xl overflow-hidden rounded-xl2 bg-white shadow-lift md:grid-cols-2">
      <div className="p-6 sm:p-8">
        <Slider label="Largeur de la cour" value={width} min={15} max={80} onChange={(v) => update(v, length)} />
        <Slider label="Profondeur de la cour" value={length} min={20} max={120} onChange={(v) => update(width, v)} />

        <div className="mt-6 rounded-2xl bg-cream p-5" aria-live="polite">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">On vous recommande</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">
            {rec ? `Patinoire ${rec.size}` : "Format sur mesure"}
          </p>
          <p className="mt-3 text-sm text-ink-soft">{rec ? "À partir de" : "Prix"}</p>
          <p className="font-display text-4xl font-semibold text-ink">{rec ? money(rec.price) : "Sur appel"}</p>
          <p className="mt-2 text-[15px] text-ink-soft">
            {rec
              ? NOTES[rec.slug]
              : `Votre cour est plus petite : envoyez-nous une photo, on trouve une solution. Nos patinoires commencent à ${money(minPrice)}.`}
          </p>
        </div>

        <a
          href="#reserver"
          onClick={() => track("clic_calculateur")}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-night"
        >
          {rec ? "Réserver cette patinoire" : "Demander un prix sur mesure"}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="flex items-center justify-center bg-night p-4 sm:p-6">
        <svg viewBox="0 0 320 320" className="h-auto w-full max-w-[380px]" role="img" aria-label="Plan de votre cour vue de haut">
          {/* maison */}
          <rect x={lotX + lotW * 0.2} y={lotY - 40} width={lotW * 0.6} height={34} rx={5} fill="#22384a" />
          <text x={160} y={lotY - 18} textAnchor="middle" fontSize="12" fontWeight="600" fill="#f6dfae">
            Maison
          </text>
          {/* terrain */}
          <rect x={lotX} y={lotY} width={lotW} height={lotH} rx={8} fill="#16293a" stroke="rgba(255,255,255,0.28)" strokeWidth={1.5} strokeDasharray="6 5" />
          {/* patinoire */}
          <g style={{ transition: "all 0.25s ease" }}>
            <rect
              x={rinkX}
              y={rinkY}
              width={rinkW}
              height={rinkH}
              rx={Math.min(10, rinkW / 5)}
              fill={rec ? "#eaf5ff" : "rgba(234,245,255,0.25)"}
              stroke="#ffffff"
              strokeWidth={rec ? 4 : 2}
              strokeDasharray={rec ? undefined : "5 4"}
            />
            {rec && (
              <>
                <line x1={rinkX + 4} x2={rinkX + rinkW - 4} y1={rinkY + rinkH / 2} y2={rinkY + rinkH / 2} stroke="#d9433f" strokeWidth={2} opacity={0.8} />
                <line x1={rinkX + 4} x2={rinkX + rinkW - 4} y1={rinkY + rinkH * 0.3} y2={rinkY + rinkH * 0.3} stroke="#3e85bd" strokeWidth={1.5} opacity={0.7} />
                <line x1={rinkX + 4} x2={rinkX + rinkW - 4} y1={rinkY + rinkH * 0.7} y2={rinkY + rinkH * 0.7} stroke="#3e85bd" strokeWidth={1.5} opacity={0.7} />
                <circle cx={160} cy={rinkY + rinkH / 2} r={Math.min(rinkW, rinkH) * 0.12} fill="none" stroke="#3e85bd" strokeWidth={1.5} opacity={0.7} />
              </>
            )}
          </g>
          <text x={160} y={lotY + lotH + 18} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.65)">
            Cour de {width} x {length} pi
          </text>
        </svg>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="mb-5 block">
      <span className="flex items-baseline justify-between text-sm font-semibold text-ink">
        {label}
        <span className="font-display text-xl text-gold-dark">{value} pi</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-7 w-full accent-gold-dark"
      />
    </label>
  );
}
