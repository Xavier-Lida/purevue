// Dessin de la patinoire (affiché tant qu'il n'y a pas de vraie photo dans public/patinoire/).
// Vue de haut inclinée, avec les lumières du forfait Pro qui scintillent.

function perimeter(x: number, y: number, w: number, h: number, r: number, count: number) {
  const sw = w - 2 * r;
  const sh = h - 2 * r;
  const arc = (Math.PI * r) / 2;
  const total = 2 * sw + 2 * sh + 4 * arc;
  const pts: Array<[number, number]> = [];
  const round = (n: number) => Math.round(n * 10) / 10;
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
    pts.push([round(p[0]), round(p[1])]);
  }
  return pts;
}

export default function RinkIllustration({ className = "" }: { className?: string }) {
  const bulbs = perimeter(34, 24, 332, 512, 92, 30);
  return (
    <div className={className} aria-hidden>
      <div style={{ perspective: "1100px" }}>
        <svg
          viewBox="0 0 400 560"
          className="h-auto w-full"
          style={{ transform: "rotateX(46deg) rotateZ(-8deg)", transformOrigin: "50% 60%", filter: "drop-shadow(0 40px 40px rgba(0,0,0,0.45))" }}
        >
          <defs>
            <linearGradient id="pv-ice" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f8fcff" />
              <stop offset="1" stopColor="#c9e2f8" />
            </linearGradient>
            <radialGradient id="pv-yard" cx="50%" cy="50%" r="65%">
              <stop offset="0" stopColor="#21384b" />
              <stop offset="1" stopColor="#12222f" />
            </radialGradient>
            <filter id="pv-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* cour enneigée */}
          <rect x="0" y="0" width="400" height="560" rx="36" fill="url(#pv-yard)" />

          {/* glace et bandes */}
          <rect x="60" y="50" width="280" height="460" rx="68" fill="url(#pv-ice)" stroke="#ffffff" strokeWidth="11" />
          <rect x="60" y="50" width="280" height="460" rx="68" fill="none" stroke="#b9c9d6" strokeWidth="1.5" />

          {/* lignes */}
          <line x1="68" x2="332" y1="280" y2="280" stroke="#d9433f" strokeWidth="5" opacity="0.85" />
          <line x1="68" x2="332" y1="196" y2="196" stroke="#3e85bd" strokeWidth="4" opacity="0.75" />
          <line x1="68" x2="332" y1="364" y2="364" stroke="#3e85bd" strokeWidth="4" opacity="0.75" />
          <circle cx="200" cy="280" r="40" fill="none" stroke="#3e85bd" strokeWidth="3" opacity="0.7" />
          <circle cx="200" cy="280" r="4" fill="#3e85bd" />
          <line x1="100" x2="300" y1="96" y2="96" stroke="#d9433f" strokeWidth="2.5" opacity="0.7" />
          <line x1="100" x2="300" y1="464" y2="464" stroke="#d9433f" strokeWidth="2.5" opacity="0.7" />
          <path d="M172 96 a28 28 0 0 0 56 0" fill="rgba(62,133,189,0.18)" stroke="#d9433f" strokeWidth="2" />
          <path d="M172 464 a28 28 0 0 1 56 0" fill="rgba(62,133,189,0.18)" stroke="#d9433f" strokeWidth="2" />

          {/* filets */}
          <rect x="180" y="78" width="40" height="18" rx="4" fill="none" stroke="#c0392b" strokeWidth="3" />
          <rect x="180" y="464" width="40" height="18" rx="4" fill="none" stroke="#c0392b" strokeWidth="3" />

          {/* traces de patins */}
          <path d="M110 420 C150 360 120 300 190 250 S260 160 290 130" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
          <path d="M280 430 C240 380 290 330 230 300 S150 220 120 150" fill="none" stroke="#9fc4e4" strokeWidth="1.5" opacity="0.6" />

          {/* fil et lumières */}
          <rect x="34" y="24" width="332" height="512" rx="92" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          {bulbs.map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="5.5"
              fill="#ffe3a3"
              filter="url(#pv-glow)"
              className="pv-twinkle"
              style={{ animationDelay: `${(i % 6) * 0.4}s` }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
