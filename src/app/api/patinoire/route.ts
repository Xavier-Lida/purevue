import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

// Demandes de rappel de l'offre patinoire (page d'accueil).
// Même fonctionnement que /api/contact, mais le courriel du client est facultatif :
// on a surtout besoin de son numéro pour le rappeler.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? site.email;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Anti-pourriel : le honeypot doit être vide.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const text = (key: string) => String(payload[key] ?? "").trim().slice(0, 500);
  const name = text("name");
  const phone = text("phone");
  const email = text("email");
  const plan = text("plan");
  const region = text("region");
  const moment = text("moment");

  if (!name || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { error: "Veuillez indiquer votre nom et un numéro de téléphone à 10 chiffres." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    // Sans clé : on journalise au lieu d'envoyer. Le formulaire garde une copie dans le Google Sheet.
    console.warn("[patinoire] RESEND_API_KEY manquant : demande reçue mais non envoyée par courriel :", {
      name,
      phone,
      email,
      plan,
      region,
      moment,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = `
    <h2>Nouvelle demande de patinoire</h2>
    <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>
    <p><strong>Courriel :</strong> ${escapeHtml(email || "Non fourni")}</p>
    <p><strong>Forfait :</strong> ${escapeHtml(plan || "Non précisé")}</p>
    <p><strong>Région :</strong> ${escapeHtml(region || "Non précisée")}</p>
    <p><strong>Quand rappeler :</strong> ${escapeHtml(moment || "Dès que possible")}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: `${site.name} <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      ...(email ? { replyTo: email } : {}),
      subject: `Patinoire : ${name}${plan ? ` (${plan})` : ""}`,
      html,
    });

    if (error) {
      console.error("[patinoire] Resend error:", error);
      return NextResponse.json({ error: "L'envoi a échoué. Réessayez ou appelez-nous." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[patinoire] Unexpected error:", err);
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 500 });
  }
}
