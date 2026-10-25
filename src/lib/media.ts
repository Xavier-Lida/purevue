import fs from "node:fs";
import path from "node:path";

// Lit les photos et vidéos d'un dossier de public/ (ex. public/contrats).
// Photos : 01-nom.jpg, 02-nom.jpg... (l'ordre suit le nom du fichier)
// Vidéos : v1-nom.mp4 + v1-nom.poster.jpg (image affichée avant la lecture)
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;
const VIDEO = /\.(mp4|webm)$/i;
const POSTER = /\.poster\.(jpe?g|png|webp)$/i;

export type Photo = { src: string; alt: string };
export type Clip = { src: string; poster?: string };

function prettyName(file: string) {
  return file
    .replace(/\.[^.]+$/, "")
    .replace(/^(v?\d+)-/, "")
    .replace(/-/g, " ");
}

export function getMedia(folder: string) {
  const dir = path.join(process.cwd(), "public", folder);
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).sort();
  } catch {
    return { photos: [] as Photo[], clips: [] as Clip[] };
  }
  const url = (f: string) => `/${folder}/${encodeURIComponent(f)}`;

  const photos: Photo[] = files
    .filter((f) => IMAGE.test(f) && !POSTER.test(f))
    .map((f) => ({ src: url(f), alt: `Contrat : ${prettyName(f)}` }));

  const clips: Clip[] = files
    .filter((f) => VIDEO.test(f))
    .map((f) => {
      const base = f.replace(/\.[^.]+$/, "");
      const poster = files.find((p) => p.startsWith(`${base}.poster.`));
      return { src: url(f), poster: poster ? url(poster) : undefined };
    });

  return { photos, clips };
}
