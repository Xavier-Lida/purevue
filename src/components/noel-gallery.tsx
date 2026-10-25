import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

// Lit automatiquement toutes les photos et vidéos déposées dans public/noel/.
// Ajoute un fichier dans ce dossier et il apparaît dans la galerie.
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;
const VIDEO = /\.(mp4|webm|mov)$/i;

type Media = { src: string; kind: "image" | "video" };

function getNoelMedia(): Media[] {
  const dir = path.join(process.cwd(), "public", "noel");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE.test(f) || VIDEO.test(f))
      .sort()
      .map((f) => ({
        src: `/noel/${encodeURIComponent(f)}`,
        kind: VIDEO.test(f) ? "video" : "image",
      }));
  } catch {
    return [];
  }
}

export default function NoelGallery({ alt }: { alt: string }) {
  const media = getNoelMedia();
  if (media.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
      {media.map((m, i) => (
        <figure
          key={m.src}
          className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lift ${
            i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-[4/5]"
          }`}
        >
          {m.kind === "video" ? (
            <video
              src={m.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Image
              src={m.src}
              alt={alt}
              fill
              sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </figure>
      ))}
    </div>
  );
}
