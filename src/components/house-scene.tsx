// Scène animée : deux petits bonshommes installent les lumières.
// Les ampoules s'allument une à une derrière l'installateur, puis la maison s'illumine.
// SVG + CSS seulement : léger et fluide sur cell.

import "./house-scene.css";

type Pt = [number, number];

function along(a: Pt, b: Pt, n: number): Pt[] {
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  });
}

// ordre d'allumage : bordure du toit (gauche à droite), rive droite (bas vers haut), rive gauche (haut vers bas)
const roofBulbs: Pt[] = [
  ...along([118, 188], [342, 188], 15),
  ...along([344, 182], [234, 104], 9).slice(1),
  ...along([226, 104], [116, 182], 9).slice(1),
];
const treeBulbs: Pt[] = [
  [398, 214], [390, 232], [406, 236], [382, 252], [398, 256], [414, 252],
  [374, 274], [390, 278], [406, 278], [420, 272],
];

function Person({
  x,
  y,
  scale = 1,
  jacket = "#e3b45a",
  tuque = "#c0392b",
  armClass,
  armLength = 16,
}: {
  x: number;
  y: number;
  scale?: number;
  jacket?: string;
  tuque?: string;
  armClass: string;
  armLength?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* jambes et bottes */}
      <rect x="9" y="42" width="5.5" height="12" rx="2" fill="#24323e" />
      <rect x="16" y="42" width="5.5" height="12" rx="2" fill="#24323e" />
      <rect x="7.5" y="51" width="8" height="5" rx="2" fill="#3b2a1d" />
      <rect x="15.5" y="51" width="8" height="5" rx="2" fill="#3b2a1d" />
      {/* bras fixe */}
      <rect x="2.5" y="23" width="5.5" height="15" rx="2.75" fill={jacket} />
      <circle cx="5.2" cy="38.5" r="3" fill="#2f6b52" />
      {/* manteau avec bande réfléchissante */}
      <rect x="6" y="21" width="19" height="23" rx="6" fill={jacket} />
      <rect x="6" y="33" width="19" height="2.6" fill="#f6f1e4" opacity="0.95" />
      {/* foulard */}
      <rect x="8.5" y="18.5" width="14" height="4.5" rx="2.2" fill="#2f6b52" />
      {/* tête */}
      <circle cx="15.5" cy="12.5" r="7" fill="#f2c9a5" />
      <circle cx="13" cy="13" r="0.95" fill="#13202b" />
      <circle cx="18" cy="13" r="0.95" fill="#13202b" />
      <circle cx="11.6" cy="15.4" r="1.4" fill="#f09a8a" opacity="0.6" />
      <circle cx="19.4" cy="15.4" r="1.4" fill="#f09a8a" opacity="0.6" />
      {/* tuque */}
      <path d="M8.2 10 Q15.5 -3.5 22.8 10 Z" fill={tuque} />
      <rect x="7.5" y="8" width="16" height="4" rx="2" fill="#f6f1e4" />
      <circle cx="15.5" cy="-0.5" r="3.2" fill="#f6f1e4" />
      {/* bras animé (avec mitaine) */}
      <g className={armClass} style={{ transformBox: "fill-box", transformOrigin: "50% 8%" }}>
        <rect x="21" y="23" width="5.5" height={armLength} rx="2.75" fill={jacket} />
        <circle cx="23.75" cy={23 + armLength} r="3" fill="#2f6b52" />
      </g>
    </g>
  );
}

export default function HouseScene({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 360" className={className} role="img" aria-label="Deux installateurs posent des lumières de Noël blanc chaud sur une maison enneigée">
      <defs>
        <filter id="pvs-glow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="pvs-blur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
        <filter id="pvs-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <pattern id="pvs-shingles" width="18" height="10" patternUnits="userSpaceOnUse">
          <rect width="18" height="10" fill="#10222f" />
          <path d="M0 10 Q4.5 3 9 10 Q13.5 3 18 10" fill="none" stroke="#1b3445" strokeWidth="1.4" />
        </pattern>
        <pattern id="pvs-siding" width="10" height="9" patternUnits="userSpaceOnUse">
          <rect width="10" height="9" fill="#1e3a50" />
          <line x1="0" y1="8.5" x2="10" y2="8.5" stroke="#18304a" strokeWidth="1" />
        </pattern>
        <radialGradient id="pvs-fade" cx="50%" cy="25%" r="62%">
          <stop offset="55%" stopColor="#fff" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <mask id="pvs-ground-mask" maskUnits="userSpaceOnUse" x="0" y="250" width="480" height="110">
          <rect x="0" y="250" width="480" height="110" fill="url(#pvs-fade)" />
        </mask>
        <radialGradient id="pvs-window" cx="50%" cy="55%" r="65%">
          <stop offset="0%" stopColor="#ffe9b5" />
          <stop offset="100%" stopColor="#e9a849" />
        </radialGradient>
      </defs>

      {/* lune et étoiles */}
      <circle cx="430" cy="48" r="26" fill="#f6e7c1" opacity="0.18" filter="url(#pvs-soft)" />
      <circle cx="430" cy="48" r="15" fill="#f6e7c1" opacity="0.9" />
      {[[40, 40], [110, 22], [190, 50], [300, 28], [370, 80], [60, 120]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.3" fill="#fff" className="pv-twinkle" style={{ animationDelay: `${i * 400}ms` }} />
      ))}

      {/* sol enneigé */}
      <g mask="url(#pvs-ground-mask)">
        <path d="M0 296 Q120 280 240 290 T480 284 L480 360 L0 360 Z" fill="#eef3f7" />
        <path d="M0 318 Q220 304 480 320 L480 360 L0 360 Z" fill="#dde6ee" />
      </g>

      {/* cheminée + fumée */}
      <rect x="286" y="112" width="20" height="50" fill="#7a3e30" />
      <rect x="282" y="107" width="28" height="7" rx="1.5" fill="#5b2d23" />
      <rect x="282" y="104" width="28" height="4" rx="2" fill="#f4f7fa" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="296" cy="96" r="6" fill="#eef3f7" filter="url(#pvs-blur)" className="pv-smoke" style={{ animationDelay: `${i * 1.3}s` }} />
      ))}

      {/* maison */}
      <rect x="130" y="180" width="200" height="118" fill="url(#pvs-siding)" />
      <polygon points="108,184 230,96 352,184" fill="url(#pvs-shingles)" />
      <polyline points="108,184 230,96 352,184" fill="none" stroke="#f4f7fa" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
      <rect x="106" y="182" width="248" height="5" rx="2.5" fill="#0c1a25" />

      {/* fenêtre ronde du grenier */}
      <circle cx="230" cy="148" r="12" fill="#22384b" />
      <circle cx="230" cy="148" r="12" fill="url(#pvs-window)" />

      {/* fenêtres + famille qui regarde */}
      {[152, 268].map((x, i) => (
        <g key={x}>
          <rect x={x} y="206" width="40" height="36" rx="3" fill="#22384b" />
          <rect x={x} y="206" width="40" height="36" rx="3" fill="url(#pvs-window)" />
          {i === 0 && (
            <g fill="#0d1b26" opacity="0.85">
              <circle cx={x + 13} cy="226" r="5.5" />
              <rect x={x + 6} y="231" width="14" height="11" rx="5" />
              <circle cx={x + 28} cy="230" r="4" />
              <rect x={x + 23} y="234" width="10" height="8" rx="4" />
            </g>
          )}
          <line x1={x + 20} y1="206" x2={x + 20} y2="242" stroke="#132634" strokeWidth="3" />
          <line x1={x} y1="224" x2={x + 40} y2="224" stroke="#132634" strokeWidth="3" />
          <rect x={x - 3} y="242" width="46" height="4" rx="2" fill="#f4f7fa" />
        </g>
      ))}

      {/* porte + couronne */}
      <rect x="212" y="236" width="36" height="62" rx="3" fill="#0b1722" />
      <circle cx="230" cy="254" r="9" fill="none" stroke="#2f6b52" strokeWidth="4.5" />
      <circle cx="230" cy="245.5" r="2.2" fill="#c0392b" />
      <circle cx="242" cy="270" r="1.6" fill="#e3b45a" />

      {/* sapin */}
      <polygon points="398,196 372,246 424,246" fill="#245a45" />
      <polygon points="398,214 364,270 432,270" fill="#1f4f3c" />
      <polygon points="398,236 356,298 440,298" fill="#1a4535" />
      <rect x="393" y="298" width="10" height="8" fill="#3b2a1d" />
      <path d="M398 186 l3 7 7 0 -5.5 4.5 2 7 -6.5 -4 -6.5 4 2 -7 -5.5 -4.5 7 0 z" fill="#ffd77a" className="pv-twinkle" filter="url(#pvs-glow)" />

      {/* bonhomme de neige */}
      <circle cx="458" cy="300" r="13" fill="#f4f7fa" />
      <circle cx="458" cy="279" r="9.5" fill="#f4f7fa" />
      <circle cx="458" cy="263" r="7" fill="#f4f7fa" />
      <circle cx="455.5" cy="262" r="1" fill="#13202b" />
      <circle cx="460.5" cy="262" r="1" fill="#13202b" />
      <path d="M458 264.5 l7 1.5 -7 1.5 z" fill="#e67e22" />
      <rect x="450" y="268" width="16" height="3.5" rx="1.7" fill="#c0392b" />

      {/* fil + boîte de lumières */}
      <path d="M78 286 Q100 250 122 190" fill="none" stroke="#3a4a55" strokeWidth="1.3" />
      <polyline points="116,182 230,100 344,182" fill="none" stroke="#3a4a55" strokeWidth="1.1" opacity="0.8" />
      <line x1="118" y1="188" x2="342" y2="188" stroke="#3a4a55" strokeWidth="1.1" opacity="0.8" />
      <rect x="66" y="284" width="24" height="14" rx="2" fill="#8a5a33" />
      <rect x="66" y="284" width="24" height="4" fill="#a8703f" />

      {/* échelle */}
      <g stroke="#b8c2ca" strokeWidth="3" strokeLinecap="round">
        <line x1="92" y1="302" x2="118" y2="186" />
        <line x1="106" y1="304" x2="132" y2="188" />
        {Array.from({ length: 8 }).map((_, i) => {
          const t = (i + 0.6) / 8.6;
          return <line key={i} x1={92 + 26 * t} y1={302 - 116 * t} x2={106 + 26 * t} y2={304 - 116 * t} strokeWidth="2.2" />;
        })}
      </g>

      {/* les deux installateurs */}
      <Person x={94} y={196} scale={0.9} armClass="pv-arm-reach" armLength={22} />
      <Person x={30} y={244} jacket="#e3b45a" tuque="#1f4a3a" armClass="pv-arm-wave" />

      {/* ampoules */}
      <g filter="url(#pvs-glow)">
        {roofBulbs.map(([x, y], i) => (
          <circle key={`r${i}`} cx={x} cy={y} r="3.4" className="pv-sbulb" style={{ animationDelay: `${0.6 + i * 0.13}s, ${i * 0.21}s` }} />
        ))}
        {treeBulbs.map(([x, y], i) => (
          <circle key={`t${i}`} cx={x} cy={y} r="2.6" className="pv-sbulb" style={{ animationDelay: `${5 + i * 0.12}s, ${i * 0.25}s` }} />
        ))}
      </g>
    </svg>
  );
}
