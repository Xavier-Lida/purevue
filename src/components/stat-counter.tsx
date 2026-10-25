"use client";

import { useEffect, useRef, useState } from "react";

export default function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        // Petits chiffres (ex. note 5.0) : pas d'animation, sinon ça affiche « 2.0 » en cours de route.
        if (reduce || value < 10) {
          setCount(value);
          return;
        }

        const duration = 1400;
        let start: number | null = null;
        const step = (now: number) => {
          if (start === null) start = now;
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {count}
        <span className="text-brand">{suffix}</span>
      </p>
      <p className="mt-1.5 text-sm font-medium text-sky-100/70">{label}</p>
    </div>
  );
}
