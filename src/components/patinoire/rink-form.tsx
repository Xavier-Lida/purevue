"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, PhoneCall, Send } from "lucide-react";
import { site } from "@/lib/site";
import { rink, rinkPackages } from "@/lib/patinoire";
import { UNDECIDED, track, useRink } from "@/components/patinoire/rink-context";
import { LAUNCH_PLAN } from "@/components/patinoire/rink-packages";

type Status = "idle" | "loading" | "success" | "error";

const MOMENTS = ["Dès que possible", "Ce soir", "Demain matin", "Demain soir", "Cette fin de semaine"];

const inputClass =
  "w-full rounded-xl border border-black/10 bg-mist px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20";

// « Laissez votre numéro, on vous rappelle. »
// La demande part par courriel (Formspree si configuré sur Vercel, sinon /api/patinoire)
// et une copie va dans le Google Sheet : une demande n'est jamais perdue.
export default function RinkForm() {
  const { plan, setPlan, yard } = useRink();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const plans = [
    ...rinkPackages.map((p) => p.name),
    ...(rink.launch.active ? [LAUNCH_PLAN] : []),
    UNDECIDED,
  ];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;

    // Anti-pourriel : champ caché qui doit rester vide.
    if (data.website) return;

    const name = (data.name ?? "").trim();
    const phone = (data.phone ?? "").trim();
    const email = (data.email ?? "").trim();
    if (phone.replace(/\D/g, "").length < 10) {
      setStatus("error");
      setErrorMsg("Entrez un numéro de téléphone à 10 chiffres pour qu'on puisse vous rappeler.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const yardText = yard ? `${yard.width} x ${yard.length} pi` : "non précisée";
    const message = [`Forfait : ${plan}`, `Région : ${data.region}`, `Cour : ${yardText}`, `Rappel : ${data.moment}`].join("\n");
    const payload = {
      name,
      phone,
      ...(email ? { email } : {}),
      service: "Patinoire de cour",
      plan,
      region: data.region,
      moment: data.moment,
      yard: yardText,
      message,
      _subject: `Patinoire : ${name} (${plan})`,
    };

    // Copie de sûreté dans le Google Sheet (ne bloque jamais l'envoi).
    const backup: Promise<boolean> = rink.sheet.url
      ? fetch(rink.sheet.url, {
          method: "POST",
          mode: "no-cors",
          body: new URLSearchParams({
            [rink.sheet.contactField]: `${email || "sans courriel"} | ${phone} | ${name}`,
            [rink.sheet.detailField]: `${rink.sheet.source} | ${data.region} | ${plan} | cour ${yardText} | rappel ${data.moment}`,
          }),
        })
          .then(() => true)
          .catch(() => false)
      : Promise.resolve(false);

    let sent = false;
    try {
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
      const endpoint = formspreeId ? `https://formspree.io/f/${formspreeId}` : "/api/patinoire";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { delivered?: boolean };
      sent = res.ok && body.delivered !== false;
    } catch {
      sent = false;
    }
    const saved = await backup;

    if (sent || saved) {
      setStatus("success");
      track("inscrit", "Lead");
    } else {
      setStatus("error");
      setErrorMsg(`L'envoi n'a pas fonctionné. Appelez-nous au ${site.phone}.`);
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-xl2 border border-black/5 bg-white p-10 text-center shadow-soft">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
          <Check className="h-7 w-7" strokeWidth={3} />
        </span>
        <h3 className="mt-5 text-xl font-bold text-ink">C&apos;est noté!</h3>
        <p className="mt-2 max-w-xs text-[15px] text-ink-soft">
          On vous rappelle rapidement pour confirmer la grandeur et la date de votre patinoire.
        </p>
        <a href={site.phoneHref} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark hover:underline">
          <PhoneCall className="h-4 w-4" />
          Pressé? Appelez-nous au {site.phone}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl2 border border-black/5 bg-white p-6 shadow-soft sm:p-8">
      {/* Honeypot anti-pourriel (invisible) */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Prénom et nom" name="name" required placeholder="Votre nom" autoComplete="name" />
        <Field label="Téléphone" name="phone" type="tel" required placeholder="819-000-0000" autoComplete="tel" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Select label="Votre région" name="region" required options={[...rink.regions, "Autre"]} placeholder="Choisir une région…" />
        <div>
          <label htmlFor="plan" className="mb-1.5 block text-sm font-semibold text-ink">
            Forfait
          </label>
          <select id="plan" name="plan" value={plan} onChange={(e) => setPlan(e.target.value)} className={inputClass}>
            {plans.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Select label="Quand vous appeler?" name="moment" options={MOMENTS} />
        <Field label="Courriel (facultatif)" name="email" type="email" placeholder="vous@exemple.com" autoComplete="email" />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-night shadow-lift transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Send className="h-4 w-4" />
        {status === "loading" ? "Envoi en cours…" : "Rappelez-moi"}
      </button>
      <p className="mt-3 text-center text-xs text-ink-soft">
        {rink.paymentNote}{" "}
        <Link href="/confidentialite" className="underline">
          Confidentialité
        </Link>
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} className={inputClass} />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      <select id={name} name={name} required={required} defaultValue={placeholder ? "" : options[0]} className={inputClass}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
