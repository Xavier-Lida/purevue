const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2792.0!2d-72.5789!3d46.3432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc5c711fc9c834f%3A0x0!2sTrois-Rivi%C3%A8res%2C%20QC!5e0!3m2!1sfr!2sca!4v1234567890";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          Nous joindre
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-slate-600">
          Basés à Trois-Rivières, QC. On dessert la région et les environs.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-slate-800">Adresse</h3>
              <p className="mt-1 text-slate-600">
                Trois-Rivières, QC
                <br />
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Réserver</h3>
              <p className="mt-1 text-slate-600">
                Utilisez le formulaire ci-dessus pour réserver un rendez-vous. On
                vous recontacte rapidement.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md">
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte - Trois-Rivières, QC"
              className="h-64 w-full sm:h-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
