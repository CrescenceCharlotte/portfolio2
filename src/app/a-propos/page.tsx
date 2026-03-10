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
      "Adobe Creative Suite",
      "Figma",
      "Photographie",
      "Illustration",
      "Branding",
      "Web Design",
      "Print Design"
    ],
    body: `## Qui suis-je ?

Étudiante en deuxième année de BTS Communication, je construis une approche où stratégie et imagination avancent ensemble.

Passionnée par le digital, la création de contenu et l'événementiel, je conçois des projets qui ont du sens, qui engagent et qui racontent une histoire. Pour moi, une communication réussie ne se limite pas à être vue : elle doit être ressentie.

Douce dans mon approche et ambitieuse dans mes objectifs, je cherche à transformer chaque idée en expérience mémorable.

## Ma philosophie

Actuellement en deuxième année de BTS, je développe une approche où stratégie et imagination avancent ensemble.

Attirée par le digital, la création de contenu et l'événementiel, j'aime concevoir des projets qui ont du sens, qui engagent et qui racontent une histoire. Pour moi, une bonne communication ne se limite pas à être vue : elle doit être ressentie. Douce dans mon approche et ambitieuse dans mes objectifs, je cherche toujours à transformer une idée en expérience mémorable.

## Mon processus créatif

1. **Écoute et analyse** : Comprendre les objectifs du projet, la cible et les attentes pour poser une base stratégique solide.
2. **Recherche et inspiration** : Explorer les tendances digitales, les références créatives et les insights afin de nourrir une idée pertinente et porteuse de sens.
3. **Conception** : Imaginer et développer des concepts créatifs qui racontent une histoire, engagent le public et traduisent l'identité du projet.
4. **Itération** : Ajuster, affiner et optimiser les propositions pour renforcer l'impact émotionnel et l'efficacité du message.
5. **Livraison** : Finaliser une expérience cohérente et mémorable, prête à être déployée sur les supports adaptés.`
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
