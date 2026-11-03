import Link from "next/link"

import { BrandMark } from "@/components/site/brand-mark"
import { PageContainer } from "@/components/site/section-heading"
import { categories } from "@/lib/catalog"
import { siteConfig } from "@/lib/site"
import { getLocation, laneStatusLabel, tradeLanes } from "@/lib/trade-routes"

const footerLinkClass =
  "rounded-sm text-sm text-muted-foreground outline-none transition-colors duration-(--duration-fast) hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"

function FooterNav({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <nav aria-label={title}>
      <h2 className="text-eyebrow text-primary uppercase">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={footerLinkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div aria-hidden="true" className="flex h-1">
        <span className="flex-1 bg-brand" />
        <span className="w-1/3 bg-brand-green" />
      </div>
      <PageContainer className="grid gap-12 py-14 md:grid-cols-12 md:gap-8">
        <div className="flex flex-col gap-5 md:col-span-4">
          <BrandMark size="large" className="self-start" />
          <p className="max-w-sm text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
          <ul aria-label="Trade lanes" className="flex flex-col gap-1.5">
            {tradeLanes.map((lane) => (
              <li
                key={lane.id}
                className="flex items-center gap-2 text-meta text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className={
                    lane.status === "active"
                      ? "h-0.5 w-4 rounded-full bg-map-route-active"
                      : "w-4 border-t-2 border-dashed border-map-route-planned"
                  }
                />
                <span className="font-medium text-foreground">
                  {getLocation(lane.from)?.name} → {getLocation(lane.to)?.name}
                </span>
                {laneStatusLabel[lane.status]}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 md:col-span-8">
          <FooterNav title="Company" links={siteConfig.footer.company} />
          <FooterNav
            title="Products"
            links={categories.slice(0, 5).map((category) => ({
              label: category.name,
              href: `/products?category=${category.id}`,
            }))}
          />
          <FooterNav title="Legal" links={siteConfig.footer.policies} />
        </div>
      </PageContainer>
      <div className="border-t bg-background">
        <PageContainer className="flex flex-col gap-2 py-6 text-meta text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} Haraka Cargo. Preview build: products
            and schedules shown are demonstration data.
          </p>
          <p>Prices are indicative until confirmed in a written quotation.</p>
        </PageContainer>
      </div>
    </footer>
  )
}

export { SiteFooter }
