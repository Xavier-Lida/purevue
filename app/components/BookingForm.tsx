"use client";

import { useState } from "react";

const SERVICES = [
  "Nettoyage vitres intérieur",
  "Nettoyage vitres extérieur",
  "Désinfection",
  "Poubelles",
  "Installation film teinté",
  "Autre",
] as const;

function getFormspreeEndpoint() {
  const id = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
  return id ? `https://formspree.io/f/${id}` : null;
}

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const endpoint = getFormspreeEndpoint();
    if (!endpoint) {
      setError(
        "NEXT_PUBLIC_FORMSPREE_FORM_ID manquant. Ajoutez-le dans .env.local et redémarrez le serveur (npm run dev)."
      );
      return;
    }

    setPending(true);

    const body = JSON.stringify({
      service,
      date,
      time,
      address,
      phone,
    });

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    setPending(false);

    if (res.ok) {
      setSubmitted(true);
      return;
    }
    setError("Erreur lors de l'envoi. Réessayez ou contactez-nous par téléphone.");
  };

  const isValid =
    service &&
    date &&
    time &&
    address &&
    phone.replace(/\D/g, "").length >= 10;

  return (
    <section
      id="reserver"
      className="scroll-mt-24 bg-slate-50/80 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-2 text-center text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          Réservez votre rendez-vous
        </h2>
        <p className="mb-10 text-center text-slate-600">
          Choisissez votre service, date et heure. On vous recontacte pour
          confirmer.
        </p>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-8 text-center">
            <p className="text-lg font-medium text-emerald-800">
              Demande envoyée avec succès !
            </p>
            <p className="mt-2 text-emerald-700">
              Nous vous contacterons au {phone} pour confirmer votre rendez-vous.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8"
          >
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <div>
              <label
                htmlFor="service"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Type de service
              </label>
              <select
                id="service"
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              >
                <option value="">Sélectionnez un service</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="date"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Date souhaitée
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Heure préférée
                </label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Adresse
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="123 rue Example, Ville"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Numéro de cellulaire
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                minLength={10}
                placeholder="514 555 1234"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
              {phone && phone.replace(/\D/g, "").length < 10 && (
                <p className="mt-1 text-sm text-amber-600">
                  Entrez un numéro valide (10 chiffres)
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || pending}
              className="w-full rounded-xl bg-sky-500 px-6 py-4 font-semibold text-white shadow-md transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? "Envoi en cours…" : "Obtenir une soumission"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
