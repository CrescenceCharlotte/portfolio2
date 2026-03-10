import { ContactClient } from "./contact-client"

export const metadata = {
  title: "Contact",
  description: "Envoyez-moi un message pour discuter de votre projet."
}

export default function ContactPage() {
  return <ContactClient />
}
