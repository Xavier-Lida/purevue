import { redirect } from "next/navigation";

// L'offre de Noël est maintenant sur la page d'accueil.
// On garde /noel pour les liens déjà partagés et les pubs.
export default function NoelRedirect() {
  redirect("/");
}
