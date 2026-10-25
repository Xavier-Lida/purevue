// Neige douce en arrière-plan (désactivée si l'utilisateur réduit les animations).
export default function Snowfall({ flakes = 36 }: { flakes?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: flakes }).map((_, i) => {
        const left = (i * 37) % 100;
        const size = 2 + ((i * 7) % 4);
        const duration = 9 + ((i * 13) % 9);
        const delay = -((i * 1.7) % duration);
        return (
          <span
            key={i}
            className="pv-snow absolute -top-3 rounded-full bg-white"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              opacity: 0.35 + ((i * 3) % 5) / 10,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
