import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 })
  }

  // Pour activer l'envoi d'email, ajouter CONTACT_EMAIL dans les variables d'environnement
  // et configurer un service d'envoi (ex: Resend, Brevo, Nodemailer)
  console.log("Nouveau message de contact:", { name, email, message })

  return NextResponse.json({ success: true })
}
