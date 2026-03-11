export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50/50 to-emerald-50/30 px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-sky-600">
          Local · Jeune · Fiable
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
          Nettoyage & services
          <span className="block text-sky-600">pour votre quartier</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl">
          Vitres, désinfection, poubelles, film teinté. Une équipe jeune et
          passionnée à votre service à Trois-Rivières et environs — résidentiel,
          commercial et copropriété.
        </p>
        <a
          href="#reserver"
          className="mt-10 inline-flex items-center justify-center rounded-xl bg-sky-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
        >
          Réserver un nettoyage
        </a>
      </div>
    </section>
  );
}
