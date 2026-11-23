"use client";

import { createContext, useContext, useMemo, useState } from "react";

// Le forfait choisi par le visiteur, partagé entre les forfaits et le formulaire.
type RinkState = {
  plan: string;
  setPlan: (plan: string) => void;
};

const RinkContext = createContext<RinkState | null>(null);

export const UNDECIDED = "Je ne sais pas encore";

export function RinkProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState(UNDECIDED);
  const value = useMemo(() => ({ plan, setPlan }), [plan]);
  return <RinkContext.Provider value={value}>{children}</RinkContext.Provider>;
}

export function useRink() {
  const ctx = useContext(RinkContext);
  if (!ctx) throw new Error("useRink doit être utilisé dans <RinkProvider>");
  return ctx;
}

type Tracker = (...args: unknown[]) => void;

// Événements de suivi (Clarity et pixel Meta), seulement s'ils sont chargés.
export function track(event: string, metaEvent?: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { clarity?: Tracker; fbq?: Tracker };
  try {
    w.clarity?.("event", event);
    if (metaEvent) w.fbq?.("track", metaEvent);
  } catch {
    // le suivi ne doit jamais bloquer la page
  }
}
