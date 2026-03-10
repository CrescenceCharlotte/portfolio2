import Link from "next/link"

type Props = {
  slug: string
  title: string
  image?: string
  projectType?: string
  annonceur?: string
  hrefBase?: string
}

export function EditorialCardWork({ slug, title, image, projectType, annonceur, hrefBase = "/realisations" }: Props) {
  return (
    <Link href={`${hrefBase}/${encodeURIComponent(slug)}`} className="group block">
      <div className="rounded-2xl border border-[color:var(--beige)] bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition hover:-translate-y-1">
        <div className="p-2">
          {/* Cadre beige (look éditorial) */}
          <div className="rounded-xl overflow-hidden bg-[color:var(--beige)]/40 border border-[color:var(--beige)]">
            <div className="aspect-[3/4] relative overflow-hidden">
              {image ? (
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[color:var(--muted-text)]">
                  {title}
                </div>
              )}
              {/* Veil framboise au survol */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-200" style={{ backgroundColor: 'var(--framboise)' }} />
            </div>
          </div>
        </div>
        <div className="px-4 pb-5">
          <h3 className="mt-2 text-xl font-serif font-semibold tracking-tight transition-colors group-hover:text-[color:var(--framboise)]">
            {title}
          </h3>
          <div className="mt-2 flex flex-wrap gap-2 items-center">
            {projectType && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-[color:var(--vert)]/10 text-[color:var(--vert)]">
                {projectType}
              </span>
            )}
            {annonceur && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs border border-[color:var(--beige)] text-[color:var(--muted-text)]">
                {annonceur}
              </span>
            )}
          </div>
          {/* Soulignement framboise discret au hover */}
          <span className="block h-[2px] w-0 bg-[color:var(--framboise)] mt-3 transition-all duration-200 group-hover:w-16" />
        </div>
      </div>
    </Link>
  )
}




