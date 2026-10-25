// Illustration : une maison la nuit, toiture illuminée en blanc chaud.
// Les lumières suivent des lignes droites, comme une vraie installation pro.

type Pt = [number, number];

function along(a: Pt, b: Pt, n: number): Pt[] {
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  });
}

const ROOF_L: Pt = [52, 150];
const PEAK: Pt = [200, 52];
const ROOF_R: Pt = [348, 150];

const bulbs: Pt[] = [
  ...along(ROOF_L, PEAK, 12),
  ...along(PEAK, ROOF_R, 12).slice(1),
  ...along([78, 150], [322, 150], 15).slice(1, -1),
];

// petit sapin à droite
const TREE_TOP: Pt = [372, 168];
const treeBulbs: Pt[] = [
  [372, 182], [364, 196], [380, 200], [358, 214], [372, 218], [386, 222],
  [352, 236], [366, 240], [380, 242], [392, 238],
];

export default function HouseLights({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 300"
      className={className}
      role="img"
      aria-label="Maison illuminée de lumières de Noël blanc chaud"
    >
      <defs>
        <filter id="pv-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="pv-window" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#ffe2a0" />
          <stop offset="100%" stopColor="#e6a94a" />
        </radialGradient>
      </defs>

      {/* neige au sol */}
      <ellipse cx="210" cy="276" rx="210" ry="22" fill="#e8eef3" opacity="0.92" />

      {/* maison */}
      <polygon points="52,150 200,52 348,150" fill="#13283a" />
      <rect x="78" y="148" width="244" height="122" fill="#172f42" />
      <rect x="78" y="148" width="244" height="122" fill="none" stroke="#24415a" />
      {/* fenêtres */}
      <rect x="104" y="180" width="52" height="44" rx="3" fill="url(#pv-window)" opacity="0.9" />
      <rect x="244" y="180" width="52" height="44" rx="3" fill="url(#pv-window)" opacity="0.9" />
      <line x1="130" y1="180" x2="130" y2="224" stroke="#172f42" strokeWidth="3" />
      <line x1="270" y1="180" x2="270" y2="224" stroke="#172f42" strokeWidth="3" />
      <circle cx="200" cy="112" r="14" fill="url(#pv-window)" opacity="0.85" />
      {/* porte + couronne */}
      <rect x="182" y="208" width="36" height="62" rx="2" fill="#0d1b26" />
      <circle cx="200" cy="226" r="9" fill="none" stroke="#2f6b52" strokeWidth="4" />
      <circle cx="200" cy="217" r="2" fill="#c0392b" />

      {/* sapin */}
      <polygon points="372,168 344,250 400,250" fill="#1f4a3a" />
      <rect x="368" y="250" width="8" height="12" fill="#3b2a1d" />

      {/* fils */}
      <polyline
        points={`${ROOF_L.join(",")} ${PEAK.join(",")} ${ROOF_R.join(",")}`}
        fill="none"
        stroke="#3a4a55"
        strokeWidth="1.2"
      />
      <line x1="78" y1="150" x2="322" y2="150" stroke="#3a4a55" strokeWidth="1.2" />

      {/* ampoules */}
      <g filter="url(#pv-glow)">
        {[...bulbs, ...treeBulbs].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y + (i < bulbs.length ? 3 : 0)}
            r={i < bulbs.length ? 3.4 : 2.6}
            fill={i % 3 === 0 ? "#ffe3a3" : "#fff1cf"}
            className="pv-twinkle"
            style={{ animationDelay: `${(i * 290) % 2400}ms` }}
          />
        ))}
        <circle cx={TREE_TOP[0]} cy={TREE_TOP[1] - 4} r="4" fill="#ffd77a" />
      </g>
    </svg>
  );
}
