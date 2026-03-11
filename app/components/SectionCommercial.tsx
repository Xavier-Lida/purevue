export function SectionCommercial() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div>
            <span className="text-sm font-medium uppercase tracking-wider text-sky-600">
              Commercial
            </span>
            <h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
              Pour vos commerces et bureaux
            </h2>
            <p className="mt-4 text-slate-600">
              Vitrines, locaux, espaces communs — on s&apos;adapte à vos horaires et
              à vos besoins. Des contrats réguliers ou des interventions ponctuelles.
            </p>
            <ul className="mt-6 space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-emerald-200 text-emerald-600">
                  ✓
                </span>
                Commerces et bureaux
              </li>
              <li className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-emerald-200 text-emerald-600">
                  ✓
                </span>
                Horaires flexibles
              </li>
              <li className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-emerald-200 text-emerald-600">
                  ✓
                </span>
                Service professionnel et discret
              </li>
            </ul>
        </div>
      </div>
    </section>
  );
}
