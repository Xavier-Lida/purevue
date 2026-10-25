"use client";

import { useEffect, useRef, useState } from "react";
import { MousePointerClick, CalendarCheck, Lightbulb, Snowflake } from "lucide-react";
import { noelSteps } from "@/lib/site";
import "./steps-timeline.css";

const ICONS = [MousePointerClick, CalendarCheck, Lightbulb, Snowflake];

// Grosses cartes suspendues à une guirlande : chaque ampoule s'allume quand
// sa carte arrive à l'écran, puis la carte s'illumine.
function Step({ i, title, description }: { i: number; title: string; description: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const [lit, setLit] = useState(false);
  const Icon = ICONS[i] ?? Lightbulb;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setLit(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLit(true);
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      className={`pv-step relative pl-16 md:pl-0 md:pt-16 ${lit ? "is-lit" : ""}`}
      style={{ ["--d" as string]: `${i * 0.35}s` }}
    >
      {/* ampoule */}
      <span className="pv-step-socket absolute left-[18px] top-7 md:left-1/2 md:top-0 md:-translate-x-1/2" />
      <span className="pv-step-bulb2 absolute left-[13px] top-[42px] md:left-1/2 md:top-[14px] md:-translate-x-1/2" />

      <div className="pv-step-card relative overflow-hidden rounded-xl2 border border-black/5 bg-cream p-6 md:min-h-[250px] md:p-7">
        <span className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[7rem] font-semibold leading-none text-ink/[0.05]">
          {i + 1}
        </span>
        <span className="pv-step-icon flex h-14 w-14 items-center justify-center rounded-2xl">
          <Icon className="h-7 w-7" strokeWidth={1.8} />
        </span>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">Étape {i + 1}</p>
        <h3 className="mt-1 font-display text-2xl font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{description}</p>
      </div>
    </li>
  );
}

export default function StepsTimeline() {
  return (
    <div className="relative mt-12">
      {/* le fil : vertical sur cell, en festons sur ordi */}
      <span aria-hidden className="absolute bottom-8 left-[22px] top-0 w-[2px] bg-ink/15 md:hidden" />
      <svg aria-hidden className="absolute inset-x-0 top-0 hidden h-8 w-full md:block" viewBox="0 0 400 20" preserveAspectRatio="none">
        <path d="M0 2 Q25 22 50 2 T100 2 T150 2 T200 2 T250 2 T300 2 T350 2 T400 2" fill="none" stroke="rgba(19,32,43,0.22)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <ol className="relative grid gap-6 md:grid-cols-4 md:gap-5">
        {noelSteps.map((s, i) => (
          <Step key={s.title} i={i} title={s.title} description={s.description} />
        ))}
      </ol>
    </div>
  );
}
