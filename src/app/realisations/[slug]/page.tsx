import { getProjectData, getProjectSlugs, getAllProjects } from "@/lib/content"
import { notFound } from "next/navigation"
import { RealisationDetailClient } from "./realisation-detail-client"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    const slugs = getProjectSlugs()
    return slugs.map((slug) => ({ slug: encodeURIComponent(slug) }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const project = getProjectData(decodedSlug)
  if (!project) return { title: "Projet non trouvé" }
  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: project.featured_image ? [project.featured_image] : [],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const project = getProjectData(decodedSlug)
  if (!project) notFound()

  const allProjects = getAllProjects()
  const currentIndex = allProjects.findIndex(p => p.slug === decodedSlug)
  const previousProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  return (
    <RealisationDetailClient
      project={{
        slug: project.slug,
        title: project.title,
        excerpt: project.excerpt,
        date: project.date,
        annonceur: project.annonceur,
        contexte: project.contexte,
        contexte_autre: project.contexte_autre,
        project_type: project.project_type,
        tools: project.tools,
        featured_image: project.featured_image,
        gallery: project.gallery,
        duration: project.duration,
        status: project.status,
        pdf_portfolio: project.pdf_portfolio,
        project_url: project.project_url,
        cibles: project.cibles,
        strategie_creative: project.strategie_creative,
        objectifs_cognitifs: project.objectifs_cognitifs,
        objectifs_affectifs: project.objectifs_affectifs,
        objectifs_conatifs: project.objectifs_conatifs,
        preuves: project.preuves,
        body: project.body,
      }}
      previousProject={previousProject ? { slug: previousProject.slug, title: previousProject.title } : null}
      nextProject={nextProject ? { slug: nextProject.slug, title: nextProject.title } : null}
    />
  )
}
