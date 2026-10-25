import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "purevue64@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let payload: Record<string, string>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Anti-pourriel : le honeypot doit être vide.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const phone = (payload.phone ?? "").trim();
  const service = (payload.service ?? "").trim();
  const message = (payload.message ?? "").trim();

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Veuillez remplir le nom, le courriel et le téléphone." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    // En dev / sans clé : on journalise au lieu d'envoyer, pour ne pas bloquer.
    console.warn(
      "[contact] RESEND_API_KEY manquant — demande reçue mais non envoyée par courriel :",
      { name, email, phone, service, message },
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = `
    <h2>Nouvelle demande de soumission — Pure Vue</h2>
    <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
    <p><strong>Courriel :</strong> ${escapeHtml(email)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>
    <p><strong>Service :</strong> ${escapeHtml(service || "Non précisé")}</p>
    <p><strong>Message :</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message || "—")}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: `Pure Vue <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Soumission — ${name}${service ? ` (${service})` : ""}`,
      html,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "L'envoi a échoué. Réessayez ou appelez-nous." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue. Réessayez plus tard." },
      { status: 500 },
    );
  }
}
