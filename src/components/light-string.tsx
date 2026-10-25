// Guirlande de lumières de Noël : fil qui pend entre chaque ampoule.
// tone="dark" sur fond foncé, tone="light" sur fond pâle.
// Blanc chaud seulement : plus chic que les couleurs arc-en-ciel.
const COLORS = [
  { bulb: "#fff1cf", glow: "rgba(255,214,140,0.8)" },
  { bulb: "#ffe3a3", glow: "rgba(255,200,110,0.75)" },
];

export default function LightString({
  count = 18,
  tone = "dark",
  className = "",
}: {
  count?: number;
  tone?: "dark" | "light";
  className?: string;
}) {
  const wire = tone === "dark" ? "rgba(255,255,255,0.35)" : "rgba(8,47,73,0.4)";
  const socket = tone === "dark" ? "#cbd5e1" : "#1e293b";
  const mobileCount = Math.ceil(count / 2);

  return (
    <div
      aria-hidden
      className={`pointer-events-none relative z-10 flex w-full ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => {
        const c = COLORS[i % COLORS.length];
        const tilt = i % 2 === 0 ? -9 : 9;
        return (
          <div
            key={i}
            className={`relative h-12 flex-1 ${i >= mobileCount ? "hidden md:block" : ""}`}
          >
            <svg
              className="absolute inset-x-0 top-0 h-6 w-full overflow-visible"
              viewBox="0 0 100 24"
              preserveAspectRatio="none"
            >
              <path
                d="M0 2 Q50 30 100 2"
                fill="none"
                stroke={wire}
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span
              className="absolute left-1/2 top-[14px] flex flex-col items-center"
              style={{ transform: `translateX(-50%) rotate(${tilt}deg)` }}
            >
              <span
                className="h-1.5 w-2 rounded-[2px]"
                style={{ background: socket }}
              />
              <span
                className="pv-twinkle h-4 w-2.5 rounded-b-full rounded-t-[45%]"
                style={{
                  background: c.bulb,
                  boxShadow: `0 0 14px 4px ${c.glow}`,
                  animationDelay: `${(i * 430) % 2600}ms`,
                }}
              />
            </span>
          </div>
        );
      })}
    </div>
  );
}
