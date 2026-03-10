import { MetadataRoute } from "next"
import { getProjectSlugs } from "@/lib/content"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://crescencecharlotte.netlify.app"
  const slugs = getProjectSlugs()
  const now = new Date()
  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/a-propos/`, lastModified: now },
    { url: `${base}/realisations/`, lastModified: now },
    { url: `${base}/contact/`, lastModified: now },
    { url: `${base}/mentions-legales/`, lastModified: now },
  ]
  slugs.forEach((slug) => {
    urls.push({ url: `${base}/realisations/${encodeURIComponent(slug)}/`, lastModified: now })
  })
  return urls
}




