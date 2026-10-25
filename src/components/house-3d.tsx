// Maison 3D en CSS pur : elle tourne lentement, ses lumières blanc chaud scintillent.
// Aucune librairie, léger et fluide sur cell.

const W = 220; // largeur façade
const D = 150; // profondeur
const H = 110; // hauteur des murs
const R = 78; // hauteur du toit
const L = Math.sqrt((D / 2) ** 2 + R ** 2); // longueur d'un pan de toit
const ANGLE = (Math.atan(D / 2 / R) * 180) / Math.PI;

function Bulbs({ count, className = "", offset = 0 }: { count: number; className?: string; offset?: number }) {
  return (
    <div className={`absolute flex justify-between ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="pv-3d-bulb"
          style={{ animationDelay: `${((i + offset) * 330) % 2600}ms` }}
        />
      ))}
    </div>
  );
}

function Window({ x, y, w = 46, h = 40 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <div
      className="pv-3d-window absolute"
      style={{ left: x, top: y, width: w, height: h }}
    />
  );
}

export default function House3D({ className = "" }: { className?: string }) {
  const face = "absolute pv-3d-face";
  return (
    <div className={`pv-3d-stage ${className}`} aria-hidden>
      <div className="pv-3d-scene" style={{ width: W, height: H }}>
        {/* sol enneigé */}
        <div
          className="pv-3d-ground absolute"
          style={{
            width: 460,
            height: 460,
            left: (W - 460) / 2,
            top: H - 230,
            transform: "rotateX(90deg)",
          }}
        />

        {/* façade */}
        <div className={`${face} pv-3d-wall-front`} style={{ width: W, height: H, transform: `translateZ(${D / 2}px)` }}>
          <Window x={24} y={30} />
          <Window x={W - 70} y={30} />
          <div className="pv-3d-door absolute" style={{ left: W / 2 - 17, top: H - 62, width: 34, height: 62 }}>
            <span className="pv-3d-wreath" />
          </div>
          <Bulbs count={14} className="-top-1.5 left-1 right-1" />
        </div>
        {/* arrière */}
        <div className={`${face} pv-3d-wall-side`} style={{ width: W, height: H, transform: `rotateY(180deg) translateZ(${D / 2}px)` }} />
        {/* côtés */}
        <div className={`${face} pv-3d-wall-side`} style={{ width: D, height: H, left: (W - D) / 2, transform: `rotateY(90deg) translateZ(${W / 2}px)` }}>
          <Window x={D / 2 - 22} y={30} w={44} />
        </div>
        <div className={`${face} pv-3d-wall-side`} style={{ width: D, height: H, left: (W - D) / 2, transform: `rotateY(-90deg) translateZ(${W / 2}px)` }}>
          <Window x={D / 2 - 22} y={30} w={44} />
        </div>

        {/* pignons (triangles) avec lumières sur les rives */}
        {[90, -90].map((deg) => (
          <div
            key={deg}
            className="absolute"
            style={{ width: D, height: R, left: (W - D) / 2, top: -R, transform: `rotateY(${deg}deg) translateZ(${W / 2}px)`, transformStyle: "preserve-3d" }}
          >
            <div className="pv-3d-gable absolute inset-0" />
          </div>
        ))}

        {/* pans de toit */}
        <div
          className={`${face} pv-3d-roof`}
          style={{ width: W + 24, height: L + 6, left: -12, top: -(L + 6), transformOrigin: "bottom center", transform: `translateZ(${D / 2 + 4}px) rotateX(${ANGLE}deg)` }}
        >
          <Bulbs count={14} className="-top-1.5 left-3 right-3" offset={3} />
          <Bulbs count={14} className="-bottom-1.5 left-3 right-3" offset={7} />
        </div>
        <div
          className={`${face} pv-3d-roof`}
          style={{ width: W + 24, height: L + 6, left: -12, top: -(L + 6), transformOrigin: "bottom center", transform: `rotateY(180deg) translateZ(${D / 2 + 4}px) rotateX(${ANGLE}deg)` }}
        />

        {/* sapin (deux plans croisés) */}
        {[0, 90].map((deg) => (
          <div
            key={deg}
            className="absolute"
            style={{ width: 70, height: 110, left: W + 34, top: H - 110, transform: `translateZ(${D / 2 - 10}px) rotateY(${deg}deg)`, transformStyle: "preserve-3d" }}
          >
            <div className="pv-3d-tree absolute inset-0" />
            {deg === 0 &&
              [
                [33, 22], [26, 40], [42, 44], [20, 60], [36, 64], [50, 66], [14, 84], [28, 88], [44, 90], [58, 86],
              ].map(([x, y], i) => (
                <span key={i} className="pv-3d-bulb pv-3d-bulb--sm absolute" style={{ left: x, top: y, animationDelay: `${i * 260}ms` }} />
              ))}
            {deg === 0 && <span className="pv-3d-star absolute" style={{ left: 29, top: -6 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
