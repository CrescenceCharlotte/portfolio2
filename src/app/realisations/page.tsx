import { getAllProjects } from "@/lib/content"
import { RealisationsClient } from "./realisations-client"

export const metadata = {
  title: "Réalisations",
  description: "Sélection de projets et créations."
}

export default function RealisationsPage() {
  const projects = getAllProjects()

  const projectsData = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    featured_image: p.featured_image,
    project_type: p.project_type,
    date: p.date,
    annonceur: p.annonceur,
    tools: p.tools,
  }))

  return <RealisationsClient projects={projectsData} />
}
