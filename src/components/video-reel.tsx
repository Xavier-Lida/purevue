"use client";

import { useEffect, useRef } from "react";
import type { Clip } from "@/lib/media";

// Vidéo qui joue seulement quand elle est à l'écran (économise la batterie et les données).
function ClipTile({ clip }: { clip: Clip }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative aspect-[9/16] w-[62vw] max-w-[260px] shrink-0 snap-center overflow-hidden rounded-3xl bg-black shadow-lift ring-1 ring-white/15 sm:w-auto sm:max-w-none">
      <video
        ref={ref}
        src={clip.src}
        poster={clip.poster}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

export default function VideoReel({ clips }: { clips: Clip[] }) {
  if (clips.length === 0) return null;
  return (
    <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
      {clips.map((c) => (
        <ClipTile key={c.src} clip={c} />
      ))}
    </div>
  );
}
