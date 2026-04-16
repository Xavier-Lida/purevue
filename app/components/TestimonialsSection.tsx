const TESTIMONIALS = [
  {
    name: "Simon T.",
    rating: 5,
    text: "Franchement les gars m’ont impressionné le travail était impeccable et en 2 heures ils avaient finis.",
  },
  {
    name: "Jacinthe T.",
    rating: 5,
    text: "De jeunes entrepreneurs rigoureux et professionnels qui se sont mobilisés rapidement pour nous offrir des services de qualité! Nous recommandons cette entreprise.Le Centre de psychologie Laviolette",
  },
  {
    name: "Sophie M.",
    rating: 5,
    text: "Jeune équipe pro et locale. Prix corrects, travail soigné. On reviendra.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-amber-400" : "text-slate-200"}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-sky-50/50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          Ce que nos clients disent
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-slate-600">
          Des avis authentiques de clients satisfaits.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <StarRating rating={t.rating} />
              <p className="mt-4 text-slate-600">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-4 font-medium text-slate-800">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
