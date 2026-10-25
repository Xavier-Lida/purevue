"use client";

import { useState } from "react";
import { Send, Check, Loader2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const serviceOptions = [
  "Lavage de vitres",
  "Pellicule teintée / solaire",
  "Nettoyage haute pression",
  "Nettoyage de gouttières",
  "Nettoyage de bacs",
  "Lumières de Noël",
  "Décoration de sapin",
  "Autre / plusieurs services",
];

export default function ContactForm({
  defaultService = "",
  messagePlaceholder = "Votre adresse et le forfait qui vous intéresse.",
}: {
  defaultService?: string;
  messagePlaceholder?: string;
} = {}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Anti-pourriel : champ caché qui doit rester vide.
    if (data.website) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      // Formspree si configuré sur Vercel (NEXT_PUBLIC_FORMSPREE_FORM_ID), sinon notre route /api/contact.
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
      const endpoint = formspreeId ? `https://formspree.io/f/${formspreeId}` : "/api/contact";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(body.error ?? "Une erreur est survenue.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Une erreur est survenue.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl2 border border-black/5 bg-white p-10 text-center shadow-soft">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
          <Check className="h-7 w-7" strokeWidth={3} />
        </span>
        <h3 className="mt-5 text-xl font-bold text-ink">Demande envoyée !</h3>
        <p className="mt-2 max-w-xs text-[15px] text-ink-soft">
          Merci, on a bien reçu votre demande. On vous revient rapidement avec
          votre soumission gratuite.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-brand-dark hover:underline"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl2 border border-black/5 bg-white p-6 shadow-soft sm:p-8"
    >
      {/* Honeypot anti-pourriel (invisible) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nom" name="name" required placeholder="Votre nom" />
        <Field
          label="Téléphone"
          name="phone"
          type="tel"
          required
          placeholder="819-000-0000"
        />
      </div>

      <div className="mt-4">
        <Field
          label="Courriel"
          name="email"
          type="email"
          required
          placeholder="vous@exemple.com"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="service"
          className="mb-1.5 block text-sm font-semibold text-ink"
        >
          Service souhaité
        </label>
        <select
          id="service"
          name="service"
          defaultValue={defaultService}
          className="w-full rounded-xl border border-black/10 bg-mist px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
        >
          <option value="" disabled>
            Choisir un service…
          </option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-semibold text-ink"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={messagePlaceholder}
          className="w-full resize-none rounded-xl border border-black/10 bg-mist px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
        />
      </div>

      {status === "error" && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-night shadow-lift transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Envoi en cours…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Obtenir ma soumission
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-ink-soft">
        On vous répond généralement en moins de 24 h.
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-semibold text-ink"
      >
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-black/10 bg-mist px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
      />
    </div>
  );
}
