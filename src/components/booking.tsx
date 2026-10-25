import { Phone, CalendarCheck } from "lucide-react";
import { site, booking, noelSeason } from "@/lib/site";
import ContactForm from "@/components/contact-form";
import LightString from "@/components/light-string";
import { Eyebrow } from "@/components/site-chrome";

// Section réservation : agenda en ligne (Cal.com) + appel pour ceux qui hésitent.
export default function Booking({ defaultPackage }: { defaultPackage?: string }) {
  const embed = booking.url
    ? `${booking.url}${booking.url.includes("?") ? "&" : "?"}embed=true&theme=light&layout=month_view`
    : "";

  return (
    <section id="reserver" className="relative overflow-hidden bg-night">
      <LightString count={18} />
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:px-5 md:pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow dark>Réservation</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Choisissez votre plage
          </h2>
          <p className="mt-3 text-white/70">
            {noelSeason.installWindow}. Pas sûr de votre choix? Appelez-nous, on
            vous conseille en deux minutes.
          </p>
          <a
            href={site.phoneHref}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-semibold text-white"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
        </div>

        <div className="mt-10">
          {embed ? (
            <div className="overflow-hidden rounded-xl2 bg-white shadow-lift">
              <iframe
                src={embed}
                title="Réserver une installation"
                className="h-[780px] w-full md:h-[720px]"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl2 border border-white/10 bg-white/5 p-6 text-white/80">
                <CalendarCheck className="h-8 w-8 text-gold" />
                <p className="mt-4 text-lg font-semibold text-white">
                  Réservez par téléphone ou par le formulaire
                </p>
                <p className="mt-2">
                  Dites-nous votre adresse, votre forfait et vos disponibilités.
                  On vous confirme votre plage rapidement.
                </p>
              </div>
              <ContactForm
                defaultService="Lumières de Noël"
                messagePlaceholder={`Votre adresse, vos disponibilités${defaultPackage ? "" : " et le forfait choisi (Essentiel, Signature, Prestige ou Sapin seulement)"}.`}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
