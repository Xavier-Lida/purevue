export function SectionResidentiel() {
  return (
    <section className="bg-sky-50/50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div>
            <span className="text-sm font-medium uppercase tracking-wider text-sky-600">
              Résidentiel
            </span>
            <h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
              Pour votre maison
            </h2>
            <p className="mt-4 text-slate-600">
              Vitres, désinfection, poubelles — on s&apos;occupe de tout. Une équipe
              jeune, fiable et de votre quartier. Des tarifs transparents, sans
              surprise.
            </p>
            <ul className="mt-6 space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-emerald-200 text-emerald-600">
                  ✓
                </span>
                Maisons et condos
              </li>
              <li className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-emerald-200 text-emerald-600">
                  ✓
                </span>
                Service rapide et personnalisé
              </li>
              <li className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-emerald-200 text-emerald-600">
                  ✓
                </span>
                Équipement professionnel
              </li>
            </ul>
        </div>
      </div>
    </section>
  );
}
