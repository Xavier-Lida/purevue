import fs from "node:fs";
import path from "node:path";
import { rinkPackages } from "@/lib/patinoire";

// Images des forfaits patinoire, lues dans public/patinoire/forfaits/.
//   compact.jpg          → vraie photo d'une de tes installations
//   compact-exemple.jpg  → image générée : affichée avec la mention « Image d'exemple »
// Même chose pour classique et pro. Sans image, le forfait affiche un dessin.
export type RinkPackageImage = { src: string; example: boolean };

export function getRinkPackageImages() {
  const folder = "patinoire/forfaits";
  let files: string[] = [];
  try {
    files = fs.readdirSync(path.join(process.cwd(), "public", folder)).sort();
  } catch {
    return {} as Record<string, RinkPackageImage>;
  }
  const images: Record<string, RinkPackageImage> = {};
  for (const pkg of rinkPackages) {
    const match = new RegExp(`^${pkg.slug}(-exemple)?\\.(jpe?g|png|webp|avif)$`, "i");
    // Une vraie photo passe avant une image d'exemple.
    const file = files.find((f) => match.test(f) && !/-exemple\./i.test(f)) ?? files.find((f) => match.test(f));
    if (file) images[pkg.slug] = { src: `/${folder}/${encodeURIComponent(file)}`, example: /-exemple\./i.test(file) };
  }
  return images;
}
