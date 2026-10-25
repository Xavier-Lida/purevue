import Image from "next/image";
import PackagePreview from "@/components/package-preview";
import type { NoelPackage } from "@/lib/site";

// Image d'exemple du forfait (avec mention), ou dessin si pas d'image.
export default function PackageVisual({ pkg, sizes, priority = false }: { pkg: NoelPackage; sizes: string; priority?: boolean }) {
  if (!pkg.image) {
    return <PackagePreview variant={pkg.slug as "essentiel" | "signature" | "prestige" | "sapin"} className="block h-auto w-full" />;
  }
  return (
    <div className="relative aspect-[2/1] w-full">
      <Image src={pkg.image} alt={`Exemple du résultat, forfait ${pkg.name}`} fill sizes={sizes} priority={priority} className="object-cover" />
      <span className="absolute bottom-1.5 right-1.5 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white/85">
        Image d&apos;exemple
      </span>
    </div>
  );
}
