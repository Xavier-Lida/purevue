import { CalendarCheck, Check, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { rink } from "@/lib/patinoire";
import { Eyebrow } from "@/components/site-chrome";
import RinkForm from "@/components/patinoire/rink-form";

const NEXT_STEPS = [
  "On vous appelle pour confirmer la grandeur qui entre dans votre cour",
  "On fixe ensemble la date d'installation",
  "On arrive avec tout le matériel et on monte votre patinoire",
];

// Deux façons de réserver, comme pour nos autres services :
// 1) prendre rendez-vous tout de suite dans l'agenda (si rink.bookingUrl est rempli)
// 2) laisser son numéro et se faire rappeler.
export default function RinkBooking() {
  const embed = rink.bookingUrl
    ? `${rink.bookingUrl}${rink.bookingUrl.includes("?") ? "&" : "?"}embed=true&theme=light&layout=month_view`
    : "";

  return (
    <section id="reserver" className="relative overflow-hidden bg-night">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-5 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow dark>Réservation</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Réservez votre patinoire
          </h2>
          <p className="mt-3 text-white/70">
            {embed
              ? "Prenez rendez-vous tout de suite dans l'agenda, ou laissez votre numéro et on vous rappelle."
              : "Laissez votre numéro et on vous rappelle, ou appelez-nous tout de suite."}{" "}
            {rink.spotsNote}.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-semibold text-white">
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
            {embed && (
              <a href="#rappel" className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 font-semibold text-white">
                Me faire rappeler
              </a>
            )}
          </div>
        </div>

        {embed ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">Option 1 · Prenez rendez-vous tout de suite</p>
              <div className="overflow-hidden rounded-xl2 bg-white shadow-lift">
                <iframe src={embed} title="Prendre rendez-vous pour une patinoire" className="h-[760px] w-full lg:h-[700px]" loading="lazy" />
              </div>
            </div>
            <div id="rappel" className="scroll-mt-28">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">Option 2 · On vous rappelle</p>
              <RinkForm />
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="order-2 rounded-xl2 border border-white/10 bg-white/5 p-6 text-white/80 sm:p-8 lg:order-1">
              <CalendarCheck className="h-8 w-8 text-gold" />
              <p className="mt-4 text-lg font-semibold text-white">Ce qui se passe ensuite</p>
              <ol className="mt-4 space-y-3">
                {NEXT_STEPS.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-night">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <ul className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm">
                {rink.regions.map((r) => (
                  <li key={r} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold" strokeWidth={3} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div id="rappel" className="order-1 scroll-mt-28 lg:order-2">
              <RinkForm />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
