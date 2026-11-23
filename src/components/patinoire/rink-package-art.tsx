// Illustration d'un forfait (affichée tant qu'il n'y a pas d'image dans public/patinoire/forfaits/).
// compact : petite patinoire · classique : grande patinoire · pro : grande patinoire, lumières et filets.

const TILT = (-18 * Math.PI) / 180;
const round = (n: number) => Math.round(n * 10) / 10;

// Point de la patinoire (vue de haut, centrée sur 0,0) vers l'écran, en perspective.
function toScreen(x: number, y: number, cx: number, cy: number): [number, number] {
  return [round(cx + x * Math.cos(TILT) - y * Math.sin(TILT)), round(cy + 0.5 * (x * Math.sin(TILT) + y * Math.cos(TILT)))];
}

// Points répartis sur le tour d'un rectangle arrondi centré sur 0,0.
function perimeter(w: number, h: number, r: number, count: number) {
  const sw = w - 2 * r;
  const sh = h - 2 * r;
  const arc = (Math.PI * r) / 2;
  const total = 2 * sw + 2 * sh + 4 * arc;
  const x = -w / 2;
  const y = -h / 2;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < count; i++) {
    let d = (i / count) * total;
    let p: [number, number];
    if (d < sw) p = [x + r + d, y];
    else if ((d -= sw) < arc) {
      const a = -Math.PI / 2 + (d / arc) * (Math.PI / 2);
      p = [x + w - r + r * Math.cos(a), y + r + r * Math.sin(a)];
    } else if ((d -= arc) < sh) p = [x + w, y + r + d];
    else if ((d -= sh) < arc) {
      const a = (d / arc) * (Math.PI / 2);
      p = [x + w - r + r * Math.cos(a), y + h - r + r * Math.sin(a)];
    } else if ((d -= arc) < sw) p = [x + w - r - d, y + h];
    else if ((d -= sw) < arc) {
      const a = Math.PI / 2 + (d / arc) * (Math.PI / 2);
      p = [x + r + r * Math.cos(a), y + h - r + r * Math.sin(a)];
    } else if ((d -= arc) < sh) p = [x, y + h - r - d];
    else {
      d -= sh;
      const a = Math.PI + (d / arc) * (Math.PI / 2);
      p = [x + r + r * Math.cos(a), y + r + r * Math.sin(a)];
    }
    pts.push(p);
  }
  return pts;
}

export default function RinkPackageArt({ variant, label }: { variant: string; label: string }) {
  const pro = variant === "pro";
  const small = variant === "compact";
  const w = small ? 172 : 232;
  const h = small ? 98 : 116;
  const r = small ? 26 : 30;
  const cx = 214;
  const cy = small ? 136 : 132;
  const id = `pv-art-${variant}`;
  const transform = `translate(${cx} ${cy}) scale(1 0.5) rotate(-18)`;

  const lights = pro ? perimeter(w + 22, h + 22, r + 10, 26).map(([x, y]) => toScreen(x, y, cx, cy)) : [];
  const posts = pro ? perimeter(w + 22, h + 22, r + 10, 8).map(([x, y]) => toScreen(x, y, cx, cy)) : [];
  const lift = 24;

  return (
    <svg viewBox="0 0 400 200" className="block h-auto w-full" role="img" aria-label={`Illustration du forfait : patinoire de ${label}`}>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1722" />
          <stop offset="1" stopColor="#1b3246" />
        </linearGradient>
        <linearGradient id={`${id}-snow`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2f7fb" />
          <stop offset="1" stopColor="#cfdce8" />
        </linearGradient>
        <linearGradient id={`${id}-ice`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbfdff" />
          <stop offset="1" stopColor="#c6e0f7" />
        </linearGradient>
        <radialGradient id={`${id}-warm`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffd98a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-glow`} x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ciel de soir */}
      <rect width="400" height="200" fill={`url(#${id}-sky)`} />
      {[[40, 22], [96, 40], [150, 16], [228, 30], [300, 14], [352, 44], [384, 20], [262, 52]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.4 : 1} fill="#ffffff" opacity={0.55} />
      ))}

      {/* maison et sapins au fond */}
      <path d="M12 78 L48 50 L84 78 Z" fill="#101f2b" />
      <path d="M14 76 L48 50 L82 76" fill="none" stroke="#eef4f9" strokeWidth="3" strokeLinecap="round" />
      <rect x="20" y="78" width="56" height="44" fill="#1a2f41" />
      <rect x="30" y="88" width="14" height="14" rx="1.5" fill="#ffd98a" filter={`url(#${id}-glow)`} />
      <rect x="54" y="94" width="12" height="28" rx="1.5" fill="#0d1b26" />
      {[[330, 60, 22], [356, 72, 17], [380, 56, 24]].map(([x, top, half], i) => (
        <g key={i}>
          <path d={`M${x - half} 112 L${x} ${top} L${x + half} 112 Z`} fill="#1f4a3a" />
          <path d={`M${x - half * 0.45} ${top + 22} L${x} ${top} L${x + half * 0.45} ${top + 22} Z`} fill="#eef4f9" opacity="0.9" />
        </g>
      ))}

      {/* cour enneigée */}
      <path d="M0 110 Q100 98 200 104 T400 102 V200 H0 Z" fill={`url(#${id}-snow)`} />
      {pro && <ellipse cx={cx} cy={cy + 4} rx={w * 0.72} ry={h * 0.48} fill={`url(#${id}-warm)`} />}

      {/* ombre, bandes et glace */}
      <g transform={`translate(0 9)`}>
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={r} fill="#9db2c4" opacity="0.55" transform={transform} />
      </g>
      <g transform={`translate(0 5)`}>
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={r} fill="#b9c8d6" stroke="#b9c8d6" strokeWidth="7" transform={transform} />
      </g>
      <g transform={transform}>
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={r} fill={`url(#${id}-ice)`} stroke="#ffffff" strokeWidth="7" />
        <line x1="0" x2="0" y1={-h / 2 + 5} y2={h / 2 - 5} stroke="#d9433f" strokeWidth="4" opacity="0.85" />
        <line x1={-w * 0.22} x2={-w * 0.22} y1={-h / 2 + 5} y2={h / 2 - 5} stroke="#3e85bd" strokeWidth="3" opacity="0.7" />
        <line x1={w * 0.22} x2={w * 0.22} y1={-h / 2 + 5} y2={h / 2 - 5} stroke="#3e85bd" strokeWidth="3" opacity="0.7" />
        <circle cx="0" cy="0" r={h * 0.17} fill="none" stroke="#3e85bd" strokeWidth="2.5" opacity="0.7" />
        {pro && (
          <>
            <rect x={-w / 2 + 12} y={-15} width="11" height="30" rx="3" fill="rgba(217,67,63,0.12)" stroke="#c0392b" strokeWidth="3.5" />
            <rect x={w / 2 - 23} y={-15} width="11" height="30" rx="3" fill="rgba(217,67,63,0.12)" stroke="#c0392b" strokeWidth="3.5" />
          </>
        )}
      </g>

      {/* forfait Pro : poteaux, fil et lumières */}
      {pro && (
        <>
          {posts.map(([x, y], i) => (
            <line key={i} x1={x} y1={y} x2={x} y2={y - lift} stroke="#22384a" strokeWidth="2" strokeLinecap="round" />
          ))}
          <polygon points={lights.map(([x, y]) => `${x},${round(y - lift)}`).join(" ")} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          {lights.map(([x, y], i) => (
            <circle key={i} cx={x} cy={round(y - lift)} r="3.1" fill="#ffe3a3" filter={`url(#${id}-glow)`} className="pv-twinkle" style={{ animationDelay: `${(i % 5) * 0.45}s` }} />
          ))}
        </>
      )}

      {/* taille de base */}
      <rect x="12" y="166" width={label.length * 6.6 + 24} height="23" rx="11.5" fill="rgba(13,27,38,0.85)" />
      <text x="24" y="181.5" fontSize="12" fontWeight="700" fill="#ffffff" fontFamily="inherit">
        {label}
      </text>
    </svg>
  );
}
