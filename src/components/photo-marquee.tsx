import Image from "next/image";
import type { Photo } from "@/lib/media";

// Bande de photos qui défile toute seule (s'arrête au survol).
function Row({
  photos,
  reverse = false,
  duration = 55,
}: {
  photos: Photo[];
  reverse?: boolean;
  duration?: number;
}) {
  const loop = [...photos, ...photos];
  return (
    <div className="pv-marquee-mask group relative overflow-hidden">
      <div
        className={`pv-marquee flex w-max gap-4 group-hover:[animation-play-state:paused] ${
          reverse ? "pv-marquee--reverse" : ""
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((p, i) => (
          <figure
            key={`${p.src}-${i}`}
            aria-hidden={i >= photos.length}
            className="relative h-64 w-52 shrink-0 overflow-hidden rounded-2xl shadow-lift ring-1 ring-white/10 sm:h-80 sm:w-64"
          >
            <Image
              src={p.src}
              alt={i >= photos.length ? "" : p.alt}
              fill
              sizes="(max-width: 640px) 208px, 256px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function PhotoMarquee({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) return null;
  const half = Math.ceil(photos.length / 2);
  const rowB = [...photos.slice(half), ...photos.slice(0, half)];
  return (
    <div className="space-y-4">
      <Row photos={photos} duration={60} />
      <Row photos={rowB} reverse duration={70} />
    </div>
  );
}
