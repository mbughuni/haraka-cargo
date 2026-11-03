import type { Metadata } from "next"
import Link from "next/link"
import { SearchXIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { DemoNotice } from "@/components/site/demo-notice"
import { ProductGrid } from "@/components/site/product-card"
import { ProductSearchForm } from "@/components/site/product-search-form"
import { Eyebrow, PageContainer } from "@/components/site/section-heading"
import { categories, getCategory, searchProducts } from "@/lib/catalog"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse products from suppliers in India with indicative prices, minimum orders and lead times.",
}

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function filterHref(query: string, category?: string) {
  const params = new URLSearchParams()
  if (query) params.set("q", query)
  if (category) params.set("category", category)
  const search = params.toString()
  return search ? `/products?${search}` : "/products"
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const query = (single(params.q) ?? "").trim()
  const activeCategory = getCategory(single(params.category) ?? "")
  const results = searchProducts({ query, category: activeCategory?.id })

  const chipClass =
    "inline-flex h-8 items-center rounded-md border px-3 text-sm whitespace-nowrap outline-none transition-colors duration-(--duration-fast) focus-visible:ring-3 focus-visible:ring-ring/50"

  return (
    <>
      <section aria-labelledby="catalogue-heading" className="border-b bg-card">
        <PageContainer className="flex flex-col gap-6 py-10 md:py-14">
          <Eyebrow>Products</Eyebrow>
          <div className="flex flex-col gap-3">
            <h1 id="catalogue-heading" className="text-title text-primary">
              {activeCategory ? activeCategory.name : "All products"}
            </h1>
            <p className="max-w-prose text-muted-foreground">
              Indicative prices in Tanzanian shillings from suppliers in India. Your quotation
              adds freight, estimated duties and delivery to your town.
            </p>
          </div>
          <ProductSearchForm
            defaultQuery={query}
            category={activeCategory?.id}
            className="max-w-xl"
          />
        </PageContainer>
      </section>

      <PageContainer className="flex flex-col gap-6 py-8 md:py-10">
        <nav
          aria-label="Filter by category"
          className="-mx-gutter overflow-x-auto px-gutter"
        >
          <ul className="flex gap-2 pb-1 md:flex-wrap [&>li]:shrink-0">
            <li>
              <Link
                href={filterHref(query)}
                aria-current={!activeCategory ? "page" : undefined}
                className={cn(
                  chipClass,
                  !activeCategory
                    ? "border-brand bg-brand text-brand-foreground"
                    : "bg-card hover:bg-muted"
                )}
              >
                All categories
              </Link>
            </li>
            {categories.map((category) => {
              const active = activeCategory?.id === category.id
              return (
                <li key={category.id}>
                  <Link
                    href={filterHref(query, category.id)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      chipClass,
                      active
                        ? "border-brand bg-brand text-brand-foreground"
                        : "bg-card hover:bg-muted"
                    )}
                  >
                    {category.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <DemoNotice>
          Sample listings for previewing the store. Prices, minimum orders
          and lead times are illustrative.
        </DemoNotice>

        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {results.length === 1 ? "1 product" : `${results.length} products`}
            {query ? (
              <>
                {" "}
                matching{" "}
                <span className="font-medium text-foreground">“{query}”</span>
              </>
            ) : null}
          </p>
          {query || activeCategory ? (
            <Link
              href="/products"
              className="rounded-sm text-sm font-medium text-primary outline-none hover:underline hover:underline-offset-4 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Clear search and filters
            </Link>
          ) : null}
        </div>

        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed bg-card px-6 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <SearchXIcon aria-hidden="true" className="size-6" />
            </span>
            <div className="flex max-w-md flex-col gap-1.5">
              <h2 className="text-subheading">Can&apos;t find this product?</h2>
              <p className="text-sm text-muted-foreground">
                {query
                  ? `We don't list “${query}”${activeCategory ? ` in ${activeCategory.name}` : ""}, but we can look for it. Send a sourcing request and we'll quote it.`
                  : "There are no products in this category yet. Send a sourcing request and we'll look for suppliers."}
              </p>
            </div>
            <Link
              href={
                query
                  ? `/sourcing?q=${encodeURIComponent(query)}${activeCategory ? `&category=${activeCategory.id}` : ""}`
                  : `/sourcing${activeCategory ? `?category=${activeCategory.id}` : ""}`
              }
              className={buttonVariants({ size: "xl" })}
            >
              Request this product
            </Link>
          </div>
        )}
      </PageContainer>
    </>
  )
}
