import { redirect } from "next/navigation";

// L'offre patinoire est maintenant sur la page d'accueil.
// On garde /patinoire pour les liens déjà partagés : il renvoie à l'accueil
// en gardant ce qui suit le « ? » (suivi des pubs : utm, fbclid).
export default async function PatinoireRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(await searchParams)) {
    for (const v of Array.isArray(value) ? value : value === undefined ? [] : [value]) query.append(key, v);
  }
  const suffix = query.toString();
  redirect(suffix ? `/?${suffix}` : "/");
}
