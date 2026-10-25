// Logo texte net, mêmes couleurs que le logo d'origine.
// Bonnet de Noël sur le « P » pour la saison (mettre hat={false} pour l'enlever).
export default function Logo({
  height = 34,
  className = "",
  hat = true,
}: {
  height?: number;
  priority?: boolean;
  className?: string;
  hat?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center font-sans font-extrabold leading-none tracking-[-0.02em] ${className}`}
      style={{ fontSize: Math.round(height * 0.62), height }}
      aria-label="Pure Vue"
    >
      <span className="relative">
        {hat && (
          <svg
            aria-hidden
            viewBox="0 0 40 32"
            className="pointer-events-none absolute"
            style={{ left: "-0.24em", top: "-0.45em", width: "1.05em", transform: "rotate(-18deg)" }}
          >
            <path d="M5 23 C8 10 18 2 30 5 C35 6 36 11 34 15 C27 12 21 15 26 23 Z" fill="#c0392b" />
            <path d="M12 12 C17 7 23 5 29 6" fill="none" stroke="#e05a4a" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            <rect x="1.5" y="21" width="28" height="9" rx="4.5" fill="#fff" stroke="#e6e6e6" strokeWidth="0.8" />
            <circle cx="34.5" cy="16" r="4.6" fill="#fff" stroke="#e6e6e6" strokeWidth="0.8" />
          </svg>
        )}
        <span style={{ color: "#22466a" }}>PURE</span>
        <span style={{ color: "#3e85bd" }}>VUE</span>
      </span>
    </span>
  );
}
