// Aperçu illustré de chaque forfait (dessin, pas une photo) :
// on voit exactement ce qui est inclus.
type Variant = "essentiel" | "signature" | "prestige" | "sapin";
type Pt = [number, number];

function along(a: Pt, b: Pt, n: number): Pt[] {
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  });
}

const ROOF: Pt[] = [
  ...along([62, 74], [120, 34], 7),
  ...along([120, 34], [178, 74], 7).slice(1),
  ...along([74, 78], [166, 78], 9),
];
const MULTI = ["#ff6b6b", "#ffd166", "#4fd1c5", "#63b3ed", "#f687b3"];
const WARM = ["#fff1cf", "#ffe3a3"];

export default function PackagePreview({ variant, className = "" }: { variant: Variant; className?: string }) {
  const roofLights = variant !== "sapin";
  const colors = variant === "essentiel" ? MULTI : WARM;
  const shrub = variant === "signature" || variant === "prestige";
  const wreath = variant === "prestige";
  const treeInside = variant === "prestige" || variant === "sapin";

  return (
    <svg viewBox="0 0 240 130" className={className} role="img" aria-label={`Aperçu illustré du forfait ${variant}`}>
      <defs>
        <filter id={`pp-glow-${variant}`} x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={`pp-win-${variant}`} cx="50%" cy="55%" r="65%">
          <stop offset="0%" stopColor="#ffe9b5" />
          <stop offset="100%" stopColor="#e9a849" />
        </radialGradient>
      </defs>
      <rect width="240" height="130" fill="#0d1b26" />
      {[[20, 18], [44, 40], [200, 22], [222, 50], [170, 12], [92, 14]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.9" fill="#fff" opacity="0.7" />
      ))}
      <ellipse cx="120" cy="124" rx="130" ry="16" fill="#e8eef3" />

      {/* maison */}
      <rect x="74" y="76" width="92" height="46" fill="#1e3a50" />
      <polygon points="60,78 120,32 180,78" fill="#10222f" />
      <polyline points="60,78 120,32 180,78" fill="none" stroke="#f4f7fa" strokeWidth="2.5" strokeLinejoin="round" />

      {/* fenêtres */}
      <rect x="84" y="86" width="22" height="18" rx="1.5" fill={`url(#pp-win-${variant})`} />
      <rect x={variant === "sapin" ? 126 : 134} y="86" width={variant === "sapin" ? 32 : 22} height="18" rx="1.5" fill={`url(#pp-win-${variant})`} />
      {treeInside && (
        <g>
          <polygon points={variant === "sapin" ? "142,87 133,103 151,103" : "145,88 138,103 152,103"} fill="#1f5a43" />
          {(variant === "sapin" ? [[142, 92], [139, 97], [145, 98], [137, 101], [147, 101]] : [[145, 93], [142, 98], [148, 99]]).map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="0.9" fill="#ffe3a3" />
          ))}
          <circle cx={variant === "sapin" ? 142 : 145} cy={variant === "sapin" ? 86.5 : 87.5} r="1.3" fill="#ffd77a" />
        </g>
      )}

      {/* porte */}
      <rect x="112" y="98" width="16" height="24" rx="1.5" fill="#0b1722" />
      {wreath && <circle cx="120" cy="106" r="4" fill="none" stroke="#2f6b52" strokeWidth="2.2" />}

      {/* haie illuminée */}
      {shrub && (
        <g>
          <ellipse cx="190" cy="114" rx="20" ry="10" fill="#1f4a3a" />
          <g filter={`url(#pp-glow-${variant})`}>
            {[[176, 112], [184, 107], [192, 106], [200, 109], [206, 114], [182, 117], [196, 117]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.5" fill={WARM[i % 2]} className="pv-twinkle" style={{ animationDelay: `${i * 300}ms` }} />
            ))}
          </g>
        </g>
      )}

      {/* lumières du toit */}
      {roofLights && (
        <g filter={`url(#pp-glow-${variant})`}>
          {ROOF.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y + 2} r="2" fill={colors[i % colors.length]} className="pv-twinkle" style={{ animationDelay: `${(i * 230) % 2400}ms` }} />
          ))}
        </g>
      )}
    </svg>
  );
}
