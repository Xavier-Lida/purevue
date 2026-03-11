import { ServiceCard } from "./ServiceCard";

const services = [
  {
    title: "Nettoyage de vitres",
    description:
      "Intérieur et extérieur. Résultats impeccables pour maisons, commerces et immeubles.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6L12 2z" />
      </svg>
    ),
  },
  {
    title: "Film teinté & pellicule polaire",
    description:
      "Pose de film teinté ou pellicule polaire sur vos vitres. Intimité, confort et protection.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Nettoyage et désinfection des poubelles",
    description:
      "Nettoyage et désinfection professionnelle de vos poubelles. Élimination des odeurs, hygiène et espaces sains — résidentiel et commercial.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    ),
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          Ce qu&apos;on fait
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-slate-600">
          Des services professionnels, une équipe locale et passionnée.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard
              key={s.title}
              title={s.title}
              description={s.description}
              icon={s.icon}
            />
          ))}
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-emerald-50/40 shadow-lg ring-1 ring-slate-200/60">
          <div className="px-6 pt-10 pb-2 sm:px-10 sm:pt-12">
            <p className="text-center text-sm font-medium uppercase tracking-wider text-sky-600">
              Film teinté & pellicule polaire
            </p>
            <h3 className="mt-2 text-center text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              Les bienfaits des vitres teintées
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-center text-slate-600">
              Nos films teintés et pellicules polaires offrent bien plus qu&apos;une meilleure intimité.
            </p>
          </div>
          <div className="grid gap-6 px-6 pb-10 sm:grid-cols-3 sm:px-10 sm:gap-8 sm:pb-12">
            <div className="group relative flex flex-col rounded-2xl bg-white/90 p-6 shadow-md ring-1 ring-slate-100 transition hover:shadow-xl hover:ring-sky-100 sm:p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-sky-50 text-sky-600 transition group-hover:from-sky-200 group-hover:to-sky-100">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-slate-800">Réduction de chaleur</h4>
              <p className="mt-2 text-slate-600 leading-relaxed">
                Moins de rayonnement solaire, intérieur plus frais et confortable.
              </p>
            </div>
            <div className="group relative flex flex-col rounded-2xl bg-white/90 p-6 shadow-md ring-1 ring-slate-100 transition hover:shadow-xl hover:ring-sky-100 sm:p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-sky-50 text-sky-600 transition group-hover:from-sky-200 group-hover:to-sky-100">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-slate-800">Anti-éblouissement</h4>
              <p className="mt-2 text-slate-600 leading-relaxed">
                Lumière filtrée, moins de reflets et de fatigue oculaire.
              </p>
            </div>
            <div className="group relative flex flex-col rounded-2xl bg-white/90 p-6 shadow-md ring-1 ring-slate-100 transition hover:shadow-xl hover:ring-sky-100 sm:p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-sky-50 text-sky-600 transition group-hover:from-sky-200 group-hover:to-sky-100">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-slate-800">Protection UV</h4>
              <p className="mt-2 text-slate-600 leading-relaxed">
                Réduction des UV pour protéger votre peau, vos meubles et vos planchers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
