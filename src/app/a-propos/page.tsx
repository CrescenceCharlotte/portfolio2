import { getPageData } from "@/lib/content"
import { AProposClient } from "./a-propos-client"

export const metadata = {
  title: "À propos",
  description: "Découvrez mon parcours, mes valeurs et mon approche."
}

export default function AProposPage() {
  const pageData = getPageData('about') || {
    title: "À propos de moi",
    profile_image: undefined as string | undefined,
    skills: [
      "Photoshop",
      "Illustrator",
      "Canva",
      "CapCut",
      "Instagram",
      "TikTok",
      "Notion",
      "Création de contenu",
      "Événementiel",
    ],
    body: `## Qui suis-je ?

Étudiante en BTS Communication en alternance à La Réunion, je construis mon parcours à l'intersection de la stratégie, du digital et de la création visuelle. Passionnée par les réseaux sociaux, la production de contenu et l'événementiel, je conçois des projets qui engagent et qui racontent une histoire.

Pour moi, une communication réussie ne se limite pas à être vue — elle doit être ressentie.

## Mon approche

J'aborde chaque projet avec méthode et curiosité : comprendre les objectifs, identifier la cible, puis imaginer une réponse créative cohérente. Maîtrisant les outils Adobe (Photoshop, Illustrator), Canva et les plateformes digitales (Instagram, TikTok), je suis à l'aise aussi bien dans la production visuelle que dans la gestion de contenu.

Autonome, dynamique et force de proposition — je cherche à transformer chaque idée en expérience mémorable.

## Mon processus créatif

1. **Écoute et analyse** — Comprendre les objectifs, la cible, les contraintes du projet
2. **Recherche** — Explorer les tendances, nourrir l'idée de références pertinentes
3. **Conception** — Développer des concepts créatifs, visuellement et narrativement cohérents
4. **Itération** — Affiner, ajuster, optimiser l'impact du message
5. **Livraison** — Déployer une expérience cohérente sur les supports adaptés`
  }

  return (
    <AProposClient
      title={pageData.title}
      profileImage={pageData.profile_image}
      skills={pageData.skills}
      body={pageData.body}
    />
  )
}
